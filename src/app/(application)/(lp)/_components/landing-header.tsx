'use client'

import { motion } from 'framer-motion'
import { MenuIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { CustomLink } from '@/components/ui/router/custom-link'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useCustomRouter } from '@/lib/use-custom-router'

import Logo from '../../../../components/branding/logo'

interface Link {
  label: string
  href: string
}

interface LandingHeaderProps {
  isAuthenticated: boolean
}

export function LandingHeader({ isAuthenticated }: LandingHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useCustomRouter()

  const links: Link[] = [
    { label: 'Início', href: '/' },
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Planos', href: '#planos' },
  ]

  return (
    <header className="bg-gray-50 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-[70px] flex items-center justify-between">
          <Logo width={32} />

          {/* Desktop Links */}
          <div className="hidden sm:flex gap-6">
            {links.map((link) => (
              <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
                <CustomLink
                  href={link.href}
                  props={{
                    className: 'text-sm font-medium text-gray-700 hover:text-released-7 transition-all',
                  }}
                >
                  {link.label}
                </CustomLink>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex gap-4">
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={() => router.push('/agents')}
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => router.push('/entrar')}>
                  Entrar
                </Button>
                <Button
                  variant='default'
                  className="className='bg-released-800 transition-all"
                  onClick={() => router.push('/cadastro')}
                >
                  Comece agora
                </Button>
              </>
            )}
          </div>

          <div className="sm:hidden">
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Abrir menu">
                  {drawerOpen ? <XIcon size={20} /> : <MenuIcon size={20} />}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-full max-w-sm bg-white">
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-lg font-semibold mb-4">Navegação</h2>
                  <ScrollArea className="flex-1">
                    <div className="flex flex-col space-y-3">
                      {links.map((link) => (
                        <CustomLink
                          key={link.href}
                          href={link.href}
                          props={{
                            onClick: () => setDrawerOpen(false),
                            className:
                              'block text-md font-medium px-4 py-2 text-gray-800 hover:text-released-7',
                          }}
                        >
                          {link.label}
                        </CustomLink>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="mt-6 flex flex-col gap-3">
                    {isAuthenticated ? (
                      <Button
                        variant="outline"
                        onClick={() => {
                          setDrawerOpen(false)
                          router.push('/agents')
                        }}
                      >
                        Dashboard
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setDrawerOpen(false)
                            router.push('/entrar')
                          }}
                        >
                          Entrar
                        </Button>
                        <Button
                          variant='default'
                          className='bg-released-800'
                          onClick={() => {
                            setDrawerOpen(false)
                            router.push('/cadastro')
                          }}
                        >
                          Comece agora
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
