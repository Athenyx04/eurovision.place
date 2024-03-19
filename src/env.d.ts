/// <reference types="astro/client" />
import type { Session, User } from 'lucia'

declare namespace App {
  interface Locals {
    session: Session | null
    user: User | null
  }
}
