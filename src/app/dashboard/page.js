import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { PrismaClient } from '@prisma/client'

import Stripe from 'stripe'
import {
  createCheckoutLink,
  createCustomerIfNull,
  generateCustomerPortalLink,
  hasSubscription,
} from '../helpers/billing'
import Link from 'next/link'
export const stripe = new Stripe(String(process.env.STRIPE_SECRET), {
  apiVersion: '2024-02-15',
})
const prisma = new PrismaClient()

export default async function Page() {
  const session = await getServerSession(authOptions)

  await createCustomerIfNull()

  const user = await prisma.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  })
  const manage = await generateCustomerPortalLink('' + user?.stripe_customer_id)

  const hasSub = await hasSubscription()
  const checkout = await createCheckoutLink('' + user?.stripe_customer_id)
  return (
    <div className="max-w-4xl m-auto w-full px-4">
      <div className="flex flex-col">
        <p className="text-2xl font-medium"> Welcome {session?.user?.name}</p>
        <div className="py-4">
          <Link
            className="bg-black ml-auto text-white rounded-md px-2 py-1"
            href={'' + manage}
          >
            Manage billing{' '}
          </Link>
        </div>
        <div className="pb-6">
          {hasSub ? (
            <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium">
              Subcribed
            </div>
          ) : (
            <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium flex items-center gap-2">
              Free plan
              <Link
                className="bg-black ml-auto text-white rounded-md px-2 py-1"
                href={'' + checkout}
              >
                Upgrade
              </Link>
            </div>
          )}
        </div>
        <div className="">
          {hasSub ? (
            <img src="/dog.jpg" className="rounded-xl max-w-lg"></img>
          ) : (
            <div className="p-6 rounded-md border-emerald-400 border shadow-sm font-medium flex items-center gap-2">
              You dont have access to the dog image.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
