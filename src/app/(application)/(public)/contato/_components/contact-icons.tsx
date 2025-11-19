'use client'

import { IconAt, IconMapPin, IconPhone, IconSun } from '@tabler/icons-react'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const MOCKDATA = [
  {
    icon: IconAt,
    title: 'E-mail',
    description: 'sac@chatagentes.com',
  },
  {
    icon: IconPhone,
    title: 'Whatsapp',
    description: '+55 (73) 98212-7691',
  },
  {
    icon: IconMapPin,
    title: 'Endereço',
    description:
      'Estrada São Francisco, 2008, Parque Taboão, Taboão da Serra, SP, 06765-000',
  },
  {
    icon: IconSun,
    title: 'Horário de atendimento',
    description: 'Seg. a Sex. 9:00 – 17:00',
  },
]

function ContactIcon({
  icon: Icon,
  title,
  description,
}: {
  icon: any
  title: string
  description: string
}) {
  return (
    <div className="flex items-start space-x-4">
      <div className="pt-1">
        <Icon size={24} className="text-muted-foreground" />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground">{title}</p>
        <p className="text-sm text-foreground">{description}</p>
      </div>
    </div>
  )
}

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <div key={index}>
      <ContactIcon {...item} />
      {index !== MOCKDATA.length - 1 && (
        <Separator className="my-4" />
      )}
    </div>
  ))

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'ChatAgentes',
    image:
      'https://chatagentes.com/wp-content/uploads/2025/04/FT001.png.webp',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Estrada São Francisco, 2008',
      addressLocality: 'Taboão da Serra',
      addressRegion: 'SP',
      postalCode: '06765-000',
      addressCountry: 'BR',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'sac@chatagentes.com',
        availableLanguage: 'Portuguese',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+55 (73) 98212-7691',
        contactOption: 'WhatsApp',
        availableLanguage: 'Portuguese',
      },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    url: 'https://chatagentes.com/contato',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Card className="space-y-6 p-4 bg-transparent shadow-none border-none">
        {items}
      </Card>
    </>
  )
}
