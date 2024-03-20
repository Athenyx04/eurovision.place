/// <reference types="astro/client" />
declare namespace App {
  import type { Session, User } from 'lucia'
  interface Locals {
    user: User | null
    session: Session | null
  }
}
