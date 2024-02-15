import Link from 'next/link'
import { StripePricingTable } from './helpers/components'

export default function Home() {
  return (
    <main className="max-w-2xl m-auto px-4">
      <Link
        className="bg-black ml-auto text-white rounded-md px-2 py-1"
        href={'/sign-in'}
      >
        Sign In
      </Link>
      <div className="flex flex-col">
        <div className="flex flex-col my-4">
          <h1 className="text-5xl fonst">My awesome SaaS</h1>
          <p className="text-black/80 pb-2">Please subcribe to my SaaS</p>
          <StripePricingTable />
        </div>
      </div>
    </main>
  )
}
