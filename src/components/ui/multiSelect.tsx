import { Check, ChevronsUpDown, X } from 'lucide-react'
import * as React from 'react'

import { cn } from '../../lib/utils'
import { Badge } from './badge'
import { Button } from './button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from './command'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

export type OptionType = {
  label: string
  value: string
}

interface MultiSelectProps {
  options: OptionType[]
  selected: string[]
  onChange: (prevState: string[]) => void
  className?: string
}

function MultiSelect({
  options,
  selected,
  onChange,
  className,
  ...props
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item))
  }

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={`w-full justify-between ${selected.length > 1 ? 'h-full' : 'h-10'}`}
          onClick={() => setOpen(!open)}
        >
          <div className='flex flex-wrap gap-1'>
            <span className={`truncate ${selected.length > 0 ? 'hidden' : ''}`}>
              No selected entries
            </span>
            {selected.map((item) => (
              <Badge
                variant='secondary'
                key={item}
                className=''
                onClick={(e) => {
                  e.stopPropagation()
                  handleUnselect(item)
                }}
              >
                {options.find((option) => option.value === item)?.label}
                <X className='ml-1 size-3 text-eerie hover:text-eerie/80' />
              </Badge>
            ))}
          </div>
          <ChevronsUpDown className='size-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='w-full p-0'>
        <Command className={className}>
          <CommandInput placeholder='Search ...' />
          <CommandList className='max-h-48'>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(
                      selected.includes(option.value)
                        ? selected.filter((item) => item !== option.value)
                        : [...selected, option.value]
                    )
                    setOpen(true)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selected.includes(option.value)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { MultiSelect }
