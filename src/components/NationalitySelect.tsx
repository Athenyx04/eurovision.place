import { useState } from 'react'
import { countries } from 'countries-list'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

function NationalitySelect({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue)
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

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger className='min-w-80 bg-eerie'>
        <SelectValue placeholder='Nationality' />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(alphabeticCountries).map(([, [code, country]]) => (
          <SelectItem key={code} value={code} className='truncate'>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default NationalitySelect
