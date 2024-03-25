import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { Button } from './ui/button'

const formSchema = z.object({
  displayName: z.string().min(1).max(51),
  yearOfBirth: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  nationality: z.string().length(2).optional()
})

export function SettingsForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: '',
      yearOfBirth: undefined,
      nationality: undefined
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
        <FormField
          control={form.control}
          name='displayName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input
                  placeholder='Your name'
                  {...field}
                  className='bg-slate-200'
                />
              </FormControl>
              <FormDescription>
                How others will see you in the web
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='yearOfBirth'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year of birth (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Your year of birth'
                  {...field}
                  className='bg-slate-200'
                />
              </FormControl>
              <FormDescription>
                The year you were born, for age group global rankings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nationality'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality (optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder='Your country'
                  {...field}
                  className='bg-slate-200'
                />
              </FormControl>
              <FormDescription>
                The place you're from, for local rankings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Save</Button>
      </form>
    </Form>
  )
}
