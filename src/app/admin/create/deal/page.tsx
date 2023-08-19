import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const formEls = ['businessId', 'type', 'day', 'description', 'time_start', 'time_end']

const createDeal = async (formData: FormData) => {
  'use server'
  const title = formData.get('title')

  if (title) {
    // Create a Supabase client configured to use cookies
    const supabase = createServerActionClient({ cookies })

    // This assumes you have a `todos` table in Supabase. Check out
    // the `Create Table and seed with data` section of the README 👇
    // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
    await supabase.from('todos').insert({ title })
    revalidatePath('/admin/create/deal')
  }

  console.log('Form is invalid, redirecting..');
  redirect('/admin/create/deal');
}

export default async function CreateDeal() {
  console.log('LOG: create business page')
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log('LOG: not logged in, redirect');
    redirect('/login');
  }
  
  return (
    <div className="w-full flex flex-col items-center">

      <div className="animate-in flex flex-col gap-14 opacity-0 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

        <div className="flex flex-col gap-8 text-foreground">
          <h2 className="text-lg font-bold text-center">
            Create Deal
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          </div>

          <form
            className='flex-1 flex flex-col w-full justify-center gap-2 text-foreground'
            action={createDeal}
          >
            {formEls?.map((el) => (
              <>
                <label className='text-md' htmlFor={el}>
                  {el}
                </label>
                <input
                  className='rounded-md px-4 py-2 bg-inherit border mb-6'
                  name={el}
                  required
                />
              </>
            ))}
            <button
              type='submit'
              className='bg-green-700 rounded px-4 py-2 text-white mb-2'
            >
              Create
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}