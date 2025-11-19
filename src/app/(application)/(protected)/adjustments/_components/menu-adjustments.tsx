"use client"
import { MenuLeft } from '@/components/headers/menus/menu-left';
import { menuAdjustments } from "@/utils/constants.util";

export const Menu = ({ children }: { children: React.ReactNode }) => {
    return (
        <MenuLeft items={menuAdjustments} title={'Menu'}>
            {children}
        </MenuLeft>
    );
} 