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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import TimePicker from 'react-time-picker';
import { Business } from '@/types';
import { dealsInsertSchema } from '@/zodschema';
import { useState } from 'react';

interface FormConfig {
  fieldType?: string;
  fieldName: any; //TODO: setting this as string breaks FormField name?
  fieldLabel: string;
  fieldDesc: string;
  fieldOptions?: { option: string; value: string | number }[];
}

interface props {
  businesses: Business[] | null;
  createDeal: Function;
}

const CreateDealForm = ({ businesses, createDeal }: props) => {
  const [formRes, setFormRes] = useState<string>();
  const form = useForm<z.infer<typeof dealsInsertSchema>>({
    resolver: zodResolver(dealsInsertSchema),
    defaultValues: {
      business: undefined,
      type: undefined,
      category: undefined,
      day: undefined,
      description: '',
      time_start: null,
      time_end: null,
    },
  });

  const businessSelectOptions = businesses?.map((b) => ({
    option: b.name,
    value: `${b.id}`,
  }));
  const typeOptions = [
    { option: 'Daily', value: 'daily' },
    { option: 'Everyday', value: 'everyday' },
    { option: 'Happy Hour', value: 'happyhour' },
  ];
  const catOptions = [
    { option: 'Food', value: 'food' },
    { option: 'Drink', value: 'drink' },
    { option: 'Food and Drink', value: 'food,drink' },
  ];
  const dayOptions = [
    { option: 'Monday', value: 'Monday' },
    { option: 'Tuesday', value: 'Tuesday' },
    { option: 'Wednesday', value: 'Wednesday' },
    { option: 'Thursday', value: 'Thursday' },
    { option: 'Friday', value: 'Friday' },
    { option: 'Saturday', value: 'Saturday' },
    { option: 'Sunday', value: 'Sunday' },
  ];

  const formFields: FormConfig[] = [
    {
      fieldName: 'business',
      fieldLabel: 'Business',
      fieldDesc: 'Business where the deal is',
      fieldType: 'select',
      fieldOptions: businessSelectOptions,
    },
    {
      fieldName: 'type',
      fieldLabel: 'Type',
      fieldDesc: 'Type of deal',
      fieldType: 'select',
      fieldOptions: typeOptions,
    },
    {
      fieldName: 'category',
      fieldLabel: 'Category',
      fieldDesc: 'Category of deal',
      fieldType: 'select',
      fieldOptions: catOptions,
    },
    {
      fieldName: 'day',
      fieldLabel: 'Day',
      fieldDesc: 'Day of the deal',
      fieldType: 'select',
      fieldOptions: dayOptions,
    },
    {
      fieldName: 'description',
      fieldLabel: 'Description',
      fieldDesc: 'Description of the deal in markdown format',
      fieldType: 'textarea',
    },
    {
      fieldName: 'time_start',
      fieldLabel: 'Time Start',
      fieldDesc: 'Time the deal starts',
      fieldType: 'time',
    },
    {
      fieldName: 'time_end',
      fieldLabel: 'Time End',
      fieldDesc: 'Time the deal ends',
      fieldType: 'time',
    },
  ] as const;

  const FORM_INPUTS: any = {
    input: ({ field, config }: any) => <Input {...field} />,
    select: ({ field, config }: any) => (
      <Select {...field} onValueChange={field.onChange}>
        <SelectTrigger className=''>
          <SelectValue placeholder={config.fieldLabel} />
        </SelectTrigger>
        <SelectContent>
          {config.fieldOptions.map((o: { option: string; value: string }) => (
            <SelectItem key={o.value} value={o.value}>
              {o.option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
    textarea: ({ field, config }: any) => <Textarea {...field} />,
    time: ({ field, config }: any) => (
      <div className='flex w-full'>
        <TimePicker
          onChange={field.onChange}
          value={field.value}
          disableClock={true}
          className={'w-full text-center'}
        />
      </div>
    ),
  } as const;

  const onSubmit = async (values: z.infer<typeof dealsInsertSchema>) => {
    const createRes = await createDeal(values);
    setFormRes(createRes?.message);
    console.log('LOG: createRes', createRes);
  };

  return (
    <Form {...form}>
      <form
        id='create-deal-form'
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-8'
      >
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {formFields.map((config: FormConfig) => (
          <div className='w-full' key={config.fieldName}>
            <FormField
            key={config.fieldName}
            control={form.control}
            name={config.fieldName}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{config.fieldLabel}</FormLabel>
                <FormControl>
                  {FORM_INPUTS[config.fieldType || 'input']({ field, config })}
                </FormControl>
                <FormDescription>{config.fieldDesc}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
        ))}
        </div>
      </form>
      <div className=''>Form RES: {formRes}</div>
      <div className='flex justify-between'>
        <Button form='create-deal-form' type='submit'>
          Submit
        </Button>
        <Button
          onClick={() => {
            form.reset();
            return;
          }}
        >
          Clear
        </Button>
      </div>
    </Form>
  );
};

export default CreateDealForm;
