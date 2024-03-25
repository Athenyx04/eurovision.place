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
import { countries } from 'countries-list'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { useTranslations } from '@/i18n/utils'
import { useEffect } from 'react'

const formSchema = z.object({
  displayName: z
    .string()
    .min(1, 'Display name cannot be empty')
    .max(50, 'Display name cannot be longer than 50 characters'),
  yearOfBirth: z.coerce
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
      nationality: 'XX'
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Post the new order to the server
    fetch('/api/userSettings.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        displayName: values.displayName,
        yearOfBirth: values.yearOfBirth ?? null,
        nationality: values.nationality ?? 'XX'
      })
    })
      .then((response) => {
        if (response.ok) {
          window.location.href = '/'
        } else {
          throw new Error('Failed to set settings.')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const t = useTranslations('en')

  const alphabeticCountries = Object.entries(countries).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  )

  // Add an empty option for selecting no country
  alphabeticCountries.unshift([
    'XX',
    {
      name: 'None',
      native: '',
      capital: '',
      languages: [],
      continent: 'EU',
      currency: [],
      phone: []
    }
  ])

  useEffect(() => {
    async function getUserSettings() {
      const response = await fetch('/api/userSettings.json')
      if (!response.ok) {
        return
      }
      const data = await response.json()
      form.setValue('displayName', data.result.displayName)
      form.setValue('yearOfBirth', data.result.yearOfBirth ?? undefined)
      form.setValue('nationality', data.result.nationality ?? 'XX')
    }

    getUserSettings()
  }, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='min-w-80'>
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
                  className='bg-slate-200 text-eerie'
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
            <FormItem className='mt-3'>
              <FormLabel>Year of birth (optional)</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={1900}
                  max={new Date().getFullYear()}
                  placeholder='Your year of birth'
                  {...field}
                  className='bg-slate-200 text-eerie'
                />
              </FormControl>
              <FormDescription>
                The year you were born, for age group leaderboards
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='nationality'
          render={({ field }) => (
            <FormItem className='mt-3'>
              <FormLabel>Nationality (optional)</FormLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className='text-eerie bg-slate-200'>
                    <SelectValue placeholder='Your nationality' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(alphabeticCountries).map(([, [code]]) => (
                    <SelectItem key={code} value={code}>
                      {/* @ts-expect-error - code value is in list */}
                      {t(`country.${code}`)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                The place you are from, for local leaderboards
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='mt-6 w-full'>
          Save
        </Button>
      </form>
    </Form>
  )
}
