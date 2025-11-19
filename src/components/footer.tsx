import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <div className="py-[50px] flex justify-center">
            <div className="flex h-5 items-center space-x-4 text-small">
                <div className="text-default-400">&copy; {new Date().getFullYear()} - Todos os direitos Reservados.</div>
                <Separator orientation="vertical" />
                <div className="text-default-400">{process.env.NEXT_PUBLIC_NAME_PROJECT}</div>

            </div>
        </div>

    )
}