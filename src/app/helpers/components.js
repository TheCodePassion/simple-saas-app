'use client'
import { useEffect } from 'react'

export const StripePricingTable = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/pricing-table.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return React.createElement('stripe-pricing-table', {
    'pricing-table-id': '',
    'publishable-key': '',
  })
}
