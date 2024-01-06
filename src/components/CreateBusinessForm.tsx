'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Feature } from '@/types';

const newBusinessSchema = z.object({
  city: z.string().min(2).max(25),
  gps_lat: z.number().optional(),
  gps_long: z.number().optional(),
  name: z.string().min(2).max(50),
  region: z.string().min(2).max(25),
  street: z.string().min(2).max(50),
  type: z.string().min(2).max(25),
  website: z.string().url().or(z.literal('')),
  zipcode: z.string().min(5).max(5),
});

interface FormFields {
  fieldName: 'name'
  fieldLabel: string
  fieldDesc: string
}

const formFields = [
  { fieldName: 'name', fieldLabel: 'Name', fieldDesc: 'Name of the business' },
  { fieldName: 'type', fieldLabel: 'Type', fieldDesc: 'Type of business' },
  { fieldName: 'street', fieldLabel: 'Street', fieldDesc: 'Street of the business' },
  { fieldName: 'city', fieldLabel: 'City', fieldDesc: 'City of the business' },
  { fieldName: 'region', fieldLabel: 'State', fieldDesc: 'State of the business' },
  { fieldName: 'zipcode', fieldLabel: 'Zipcode', fieldDesc: 'Zipcode of the business' },
  { fieldName: 'website', fieldLabel: 'Website', fieldDesc: 'Business website' },
] as FormFields[];

interface props {
  place: Feature
  handleSubmitCreate: Function
  setPlace: Function
}

const resetValues = {
  name: '',
  type: '',
  street: '',
  city: '',
  region: '',
  zipcode: '',
  website: '',
};

// TODO: util to convert state to state abbrev

const CreateBusinessForm = ({ place, setPlace, handleSubmitCreate }: props) => {
  const form = useForm<z.infer<typeof newBusinessSchema>>({
    resolver: zodResolver(newBusinessSchema),
    defaultValues: {
      name: place.text || '',
      type: place.properties.category || '',
      street: place.properties.address || '',
      city: place.context.find(c => c.id.includes('place.'))?.text || '',
      region: place.context.find(c => c.id.includes('region.'))?.text || '',
      zipcode: place.context.find(c => c.id.includes('postcode.'))?.text || '',
      website: '',
    },
  });

  const onSubmit = (values: z.infer<typeof newBusinessSchema>) => {
    handleSubmitCreate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        {formFields.map((f) => (
          <FormField
            key={f.fieldName}
            control={form.control}
            name={f.fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{f.fieldLabel}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>{f.fieldDesc}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <Button type='submit'>Submit</Button>
      </form>
      <Button onClick={() => {
        setPlace();
        form.reset(resetValues);
        return;
      }}>Clear</Button>
    </Form>
  );
};

export default CreateBusinessForm;
