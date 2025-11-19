'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Agent } from '@/interfaces/agent.interface'

const STORAGE_KEY = '@chatagentes:agent_creation'

export function useAgentCreation() {
  const [agent, setAgent] = useState<Agent | null>(null)
  const router = useRouter()

  // Load agent data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const data = JSON.parse(stored)
        setAgent(data)
      } catch (error) {
        console.error('Error parsing stored agent data:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  // Save agent data to localStorage
  const saveAgent = (data: Agent) => {
    setAgent(data)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // Clear agent data from localStorage
  const clearAgent = () => {
    setAgent(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Ensure agent exists or redirect to first step
  const ensureAgent = () => {
    if (!agent) {
      router.push('/agents/create')
      return false
    }
    return true
  }

  return {
    agent,
    saveAgent,
    clearAgent,
    ensureAgent,
  }
} 