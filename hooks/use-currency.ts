'use client'

import { useState, useEffect } from 'react'

const DEFAULT_EXCHANGE_RATE = 18.0 // MXN to USD rate, can be updated with real API

export interface CurrencyConversion {
  amount: number
  from: 'MXN' | 'USD'
  to: 'MXN' | 'USD'
  convertedAmount: number
  exchangeRate: number
  formattedAmount: string
  formattedConverted: string
}

export function useCurrency() {
  const [exchangeRate, setExchangeRate] = useState<number>(DEFAULT_EXCHANGE_RATE)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Initialize with default rate and fetch real rate
  useEffect(() => {
    // Simulating API call - in real app this would fetch from Exchange Rate API
    const fetchExchangeRate = async () => {
      setIsLoading(true)
      // Simulated API delay
      setTimeout(() => {
        // For demo, keep the default rate
        setIsLoading(false)
      }, 1000)
    }

    fetchExchangeRate()
  }, [])

  const convert = (amount: number, from: 'MXN' | 'USD', to: 'MXN' | 'USD'): CurrencyConversion => {
    if (from === to) {
      return {
        amount,
        from,
        to,
        convertedAmount: amount,
        exchangeRate: 1.0,
        formattedAmount: formatCurrency(amount, from),
        formattedConverted: formatCurrency(amount, to)
      }
    }

    let convertedAmount: number

    if (from === 'MXN' && to === 'USD') {
      convertedAmount = amount / exchangeRate
    } else if (from === 'USD' && to === 'MXN') {
      convertedAmount = amount * exchangeRate
    } else {
      convertedAmount = amount // Same currency
    }

    return {
      amount,
      from,
      to,
      convertedAmount,
      exchangeRate,
      formattedAmount: formatCurrency(amount, from),
      formattedConverted: formatCurrency(convertedAmount, to)
    }
  }

  const formatCurrency = (amount: number, currency: 'MXN' | 'USD'): string => {
    const locale = currency === 'USD' ? 'en-US' : 'es-MX'
    const currencyCode = currency === 'USD' ? 'USD' : 'MXN'

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode
    }).format(amount)
  }

  const getUSDConversion = (amount: number, currency: 'MXN' | 'USD'): number => {
    if (currency === 'USD') return amount
    return amount / exchangeRate
  }

  const getMXNConversion = (amount: number, currency: 'MXN' | 'USD'): number => {
    if (currency === 'MXN') return amount
    return amount * exchangeRate
  }

  return {
    convert,
    formatCurrency,
    getUSDConversion,
    getMXNConversion,
    exchangeRate,
    isLoading,
    error
  }
}