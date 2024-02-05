'use client';

import { useState } from 'react';
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
import { Suggestion } from '@/types';
import { businessesInsertSchema } from '@/zodschema';

interface FormFieldsInterface {
  fieldName: string;
  fieldLabel: string;
  fieldDesc: string;
}

const formFields: FormFieldsInterface[] = [
  { fieldName: 'name', fieldLabel: 'Name', fieldDesc: 'Name of the business' },
  { fieldName: 'type', fieldLabel: 'Type', fieldDesc: 'Type of business' },
  {
    fieldName: 'street',
    fieldLabel: 'Street',
    fieldDesc: 'Street of the business',
  },
  { fieldName: 'city', fieldLabel: 'City', fieldDesc: 'City of the business' },
  {
    fieldName: 'region',
    fieldLabel: 'State',
    fieldDesc: 'State of the business',
  },
  {
    fieldName: 'zipcode',
    fieldLabel: 'Zipcode',
    fieldDesc: 'Zipcode of the business',
  },
  {
    fieldName: 'website',
    fieldLabel: 'Website',
    fieldDesc: 'Business website',
  },
] as const;

interface props {
  place: Suggestion;
  handleSubmitCreate: Function;
  setPlace: Function;
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
  const [formRes, setFormRes] = useState();
  const form = useForm<z.infer<typeof businessesInsertSchema>>({
    resolver: zodResolver(businessesInsertSchema),
    defaultValues: {
      name: place.name || '',
      type: place.maki || '',
      street: place.context.address.name || '',
      city: place.context.place.name || '',
      region: place.context.region.region_code || '',
      zipcode: place.context.postcode.name || '',
      website: place.metadata.website || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof businessesInsertSchema>) => {
    const formRes = await handleSubmitCreate(values);
    setFormRes(formRes?.message);
  };

  return (
    <Form {...form}>
      <form
        id='create-business-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        {formFields.map((f: any) => (
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
      </form>
      <div className=''>Form RES: {formRes}</div>
      <div className='flex justify-between'>
        <Button form='create-business-form' type='submit'>
          Submit
        </Button>
        <Button
          onClick={() => {
            setPlace();
            form.reset(resetValues);
            return;
          }}
        >
          Clear
        </Button>
      </div>
    </Form>
  );
};

export default CreateBusinessForm;
