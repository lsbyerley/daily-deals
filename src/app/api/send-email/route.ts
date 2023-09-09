import { EmailTemplate } from '@/components/EmailTemplate';
import { NextResponse, NextRequest } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
import { zfd } from "zod-form-data";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  limiter: Ratelimit.slidingWindow(1, "10s"), // 2 requests every 10 seconds
});

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.RESEND_FROM_EMAIL;

const schema = zfd.formData({
  sendTo: zfd.text(),
  firstName: zfd.text(),
  // age: zfd.numeric(z.number().min(25).max(50)),
  // likesPizza: zfd.checkbox(),
});

export async function POST(request: NextRequest) {
  const id = request.ip || 'anon';
  const limit = await ratelimit.limit(id);

  if (!limit.success) return NextResponse.json(limit, { status: 429 });

  const { sendTo, firstName } = schema.parse(await request.formData());

  try {
    if (!sendTo || !firstName) throw new Error('Invalid form data');

    const data = await resend.emails.send({
      from: `Daily Dails <${fromEmail}>`,
      to: [sendTo],
      subject: 'Welcome to Daily Deals',
      react: EmailTemplate({ firstName }) as React.ReactElement,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}