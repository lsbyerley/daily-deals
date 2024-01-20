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
import { Deal, Business } from '@/types';
import { useState } from 'react';

interface FormFieldsInterface {
  fieldType?: string;
  fieldName: string;
  fieldLabel: string;
  fieldDesc: string;
  fieldOptions?: { option: string; value: string }[];
}

interface props {
  businesses: Business[] | null;
  createDeal: Function;
}

const newDealSchema = z.object({
  business: z.string().min(1),
  type: z.string().min(1),
  category: z.string().min(1),
  day: z.string().min(1),
  description: z.string().min(3),
  time_start: z.string().nullable(),
  time_end: z.string().nullable(),
});

const CreateDealForm = ({ businesses, createDeal }: props) => {
  const [formRes, setFormRes] = useState<string>();
  const form = useForm<z.infer<typeof newDealSchema>>({
    resolver: zodResolver(newDealSchema),
    defaultValues: {
      business: '',
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

  const formFields: FormFieldsInterface[] = [
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
        <SelectTrigger className='w-[50%]'>
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
      <div className='flex'>
        <TimePicker
          onChange={field.onChange}
          value={field.value}
          disableClock={true}
        />
      </div>
    ),
  } as const;

  const onSubmit = async (values: z.infer<typeof newDealSchema>) => {
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
        {formFields.map((config: any) => (
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
        ))}
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
