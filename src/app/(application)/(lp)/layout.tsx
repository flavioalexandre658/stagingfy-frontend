import '../globals.css'

export const metadata = {
  title: 'Stagingfy',
  description: 'Staging virtual com IA para interiores e exteriores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
