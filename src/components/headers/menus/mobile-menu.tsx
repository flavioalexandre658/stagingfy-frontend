'use client'

import { IconBook2, IconHelpCircle } from '@tabler/icons-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { FiCheck } from 'react-icons/fi'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { EnhancedButton, EnhancedButtonContent, EnhancedButtonLeft } from '@/components/ui/enhanced-button'
import { Sheet, SheetContent, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { User } from '@/interfaces/user.interface'

import { CustomAnchor } from '../../ui/router/custom-anchor'
import { Separator } from '../../ui/separator'

interface MobileMenuProps {
  user: User
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  trigger: React.ReactNode
}

const MobileMenu = ({ user, isOpen, onOpenChange, trigger }: MobileMenuProps) => {
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await signOut({ callbackUrl: '/entrar' })
    setLoading(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>

      {/* Custom Backdrop */}
      <SheetOverlay className="bg-released-800/50" />

      <SheetContent
        side="bottom"
        className="h-[calc(70vh-1rem)] mt-16 rounded-t-md border-0 shadow-md bg-white"
      >
        <SheetHeader className="text-left pb-6">
          <SheetTitle className="text-xl font-semibold">
            Menu
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-8 overflow-y-auto h-full pb-6">

          {/* User Info Section */}
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="text-md">
                {user.userName
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-md text-gray-900 truncate">{user.userName}</h3>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-left text-grafite-500 text-lg">Suporte</h3>
            <div className="space-y-4">
              <div>
                <CustomAnchor
                  href="#"
                  props={{
                    onClick: () => onOpenChange(false)
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <IconBook2 size={24} className="text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-md text-gray-900">Tutoriais</span>
                      <span className="text-sm text-gray-500">Aprenda a usar a plataforma</span>
                    </div>
                  </div>

                </CustomAnchor>
              </div>

              <div>
                <CustomAnchor
                  href="#"
                  props={{
                    onClick: () => onOpenChange(false)
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-gray-100 rounded-xl">
                      <IconHelpCircle size={24} className="text-muted-foreground" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-md text-gray-900">Ajuda</span>
                      <span className="text-sm text-gray-500">Central de ajuda e suporte</span>
                    </div>
                  </div>

                </CustomAnchor>
              </div>

            </div>
          </div>

          {/* Logout Button */}
          <div className="pt-6 border-t border-gray-200 mt-auto">
            <EnhancedButton
              type="submit"
              className="w-full"
              variant="destructive"
              loading={loading}
              loadingText="Saindo..."
              onClick={handleLogout}
            >
              <EnhancedButtonLeft>
                <FiCheck size={18} />
              </EnhancedButtonLeft>
              <EnhancedButtonContent>
                Sair da Conta
              </EnhancedButtonContent>
            </EnhancedButton>

          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileMenu 