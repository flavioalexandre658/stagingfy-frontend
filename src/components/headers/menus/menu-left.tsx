"use client"
import Tabbar from "@/components/headers/tabs/tab-bar";

export const MenuLeft = ({ children, items, title }: { children: React.ReactNode, items: any[], title: string }) => {
    return (
        <div className="top-0 left-0">

            <div className="grid grid-cols-12 md:gap-8">
                <div className="col-span-12 md:col-span-3">
                    <Tabbar title={title} items={items} />
                </div>
                <main className="col-span-12 md:col-span-9">{children}</main>
            </div>
        </div>
    );
}