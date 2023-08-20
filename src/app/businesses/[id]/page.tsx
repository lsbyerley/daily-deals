import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/db_types'

export const dynamic = 'force-dynamic'

interface DealsPageProps {
  params: {
    id: Number
  }
}

export default async function BusinessDeals({ params }: DealsPageProps) {
  const businessId = params?.id;
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: business } = await supabase.from('businesses').select().eq('id', businessId).maybeSingle();
  const { data: deals } = await supabase.from('deals').select().eq('business', businessId);

  return (
    <div className="w-full flex flex-col items-center">

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Deals for {business?.name} in {business?.city}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {deals?.map(({ type, day, description }) => (
            <p>{type} {day} {description}</p>
          ))}
          </div>
        </div>

      </div>
    </div>
  )
};