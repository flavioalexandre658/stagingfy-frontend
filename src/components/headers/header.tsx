'use client'

import { IconCheck, IconChevronDown, IconMenu2, IconPlus } from '@tabler/icons-react'
import Image from 'next/image'
import { signOut } from 'next-auth/react'
import { Fragment, useState } from 'react'

import { AgentList, Tab } from '@/app/(application)/(protected)/_components/layout.types'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { EnhancedButton, EnhancedButtonLeft } from '@/components/ui/enhanced-button'
import { Input } from '@/components/ui/input'
import { CustomAnchor } from '@/components/ui/router/custom-anchor'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { User } from '@/interfaces/user.interface'
import { useCustomRouter } from '@/lib/use-custom-router'

import MobileMenu from './menus/mobile-menu'

const Header = ({
  user,
  agentsList,
  selectedAgent,
  onSelectAgent,
  tabs,
  activeTab,
  onTabChange,
}: {
  user: User
  agentsList: AgentList[]
  selectedAgent: string
  onSelectAgent: (agent: string | null) => void
  tabs: Tab[]
  activeTab: string | null
  onTabChange: (tab: string | null) => void
}) => {
  const router = useCustomRouter()
  const [search, setSearch] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const filteredAgents = agentsList.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  )

  const dropdownItems = [
    { label: 'Painel', divider: false },
    { label: 'Configurações', divider: false },
    {
      label: 'Sair',
      divider: true,
      action: async () => {
        await signOut({ callbackUrl: '/entrar' })
      },
    },
  ]

  const currentAgentName = agentsList.find((c) => c.slug === selectedAgent)?.label

  return (
    <header className="sticky top-0 z-30 flex flex-col border-b bg-white">
      <div className="flex items-center justify-between py-2  px-4">

        {/* Desktop Version */}
        <div className="flex items-center gap-2 sm:ml-4">
          <Image src="/assets/images/icon/icon.svg" alt="" width={30} height={30} className='rounded-[0.25rem]' />
          <span className="font-thin text-lg text-zinc-300">/</span>
          <CustomAnchor
            href="/agents"
            className='text-grafite-700 hover:text-grafite-800 text-sm font-medium line-clamp-1 writespace-normal break-all'
          >
            {user.userName}
          </CustomAnchor>

          {selectedAgent && (
            <>
              <span className="font-thin text-lg text-zinc-300">/</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-1 cursor-pointer ml-1">
                    <span className="text-grafite-700 text-sm font-medium line-clamp-1 writespace-normal break-all">
                      {currentAgentName}
                    </span>
                    <IconChevronDown size={14} className="text-grafite-700" />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-60 mt-2">
                  <div className="p-2">
                    <Input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar agente..."
                      className="h-8"
                    />
                  </div>
                  <DropdownMenuLabel>Agentes</DropdownMenuLabel>

                  <ScrollArea className="max-h-40 overflow-y-auto">
                    {filteredAgents.map((agent) => (
                      <DropdownMenuItem
                        key={agent.value}
                        onClick={() => onSelectAgent(agent.slug)}
                        className='cursor-pointer'
                      >
                        <div className="flex items-center gap-2">
                          {agent.slug === selectedAgent && <IconCheck size={14} />}
                          <span>{agent.label}</span>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </ScrollArea>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className='cursor-pointer text-ametista-600 bg-muted hover:bg-ametista-200' onClick={() => router.push(`/agents/create/source/document`)}>
                    <IconPlus size={14} className="mr-2" />
                    Criar agente
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-6 mr-2">
          <CustomAnchor
            href="#"
            className='text-grafite-700 text-sm hover:text-grafite-800'
          >
            Tutoriais
          </CustomAnchor>
          <CustomAnchor
            href="#"
            className='text-grafite-700 text-sm hover:text-grafite-800'
          >
            Ajuda
          </CustomAnchor>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="cursor-pointer rounded-full hover:bg-gray-100 p-1">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {user.userName
                      ?.split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 mt-2">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              {dropdownItems.map((item, idx) =>
                item.divider ? (
                  <Fragment key={idx}>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={item.action}>
                      {item.label}
                    </DropdownMenuItem>
                  </Fragment>
                ) : (
                  <DropdownMenuItem key={idx}>{item.label}</DropdownMenuItem>
                )
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Burger Menu */}
        <div className="flex md:hidden">
          <MobileMenu
            user={user}
            isOpen={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
            trigger={
              <EnhancedButton variant="ghost" size="icon" className="p-2">
                <IconMenu2 size={20} className="text-grafite-700" />
              </EnhancedButton>
            }
          />
        </div>
      </div>

      {/* Tabs Section - Always visible when tabs exist */}
      {tabs.length > 0 && (
        <div className="w-full overflow-x-auto scrollbar-hide">
          <Tabs value={activeTab || ''} onValueChange={onTabChange}>
            <TabsList className="ml-2 border-b bg-white p-0 h-auto flex justify-start sm:justify-center w-fit max-w-[350px] sm:max-w-full sm:mx-auto">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none shadow-none data-[state=active]:shadow-none text-agent-6 data-[state=active]:border-b-2 data-[state=active]:border-ametista-600 data-[state=active]:text-grafite whitespace-nowrap flex-shrink-0 px-3 sm:px-4 py-3"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      )}
    </header>
  )
}

export default Header
