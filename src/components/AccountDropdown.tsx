import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

function AccountDropdown({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <a href='/account/settings'>
          <DropdownMenuItem className='cursor-pointer'>
            Settings
          </DropdownMenuItem>
        </a>
        <form method='POST' action='/api/signout'>
          <button className='w-full'>
            <DropdownMenuItem className='cursor-pointer'>
              Sign out
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountDropdown
