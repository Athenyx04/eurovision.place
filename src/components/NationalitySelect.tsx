import { countries } from 'countries-list'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'

function NationalitySelect({ value }: { value: string }) {
  const alphabeticCountries = Object.entries(countries).sort((a, b) =>
    a[1].name.localeCompare(b[1].name)
  )

  const countryCodes = Object.keys(countries)
  console.log(countryCodes)

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
    <Select value={value}>
      <SelectTrigger className='w-[360px] bg-eerie'>
        <SelectValue placeholder='Nationality' />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(alphabeticCountries).map(([_i, [code, country]]) => (
          <SelectItem key={code} value={code}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default NationalitySelect
