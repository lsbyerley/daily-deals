'use server'

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function createBusiness(prevState: any, formData: FormData) {
  console.log('LOG: action createBusiness', formData);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  try {

    // check if business already exists
    const { data } = await supabase.from('businesses').select()
    .eq('street', formData.get('street'))
    .eq('city', formData.get('city')) 
    .eq('zipcode', formData.get('zipcode'))
    .single();

    if (data) return { message: 'Business Already Exists' };

    const { error} = await supabase
      .from('businesses')
      .insert(formData);
    
    if (error) {
      return { message: 'Business Creation Failed' }
    }

  } catch(err) {

  }
}