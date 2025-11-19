'use client'

import { motion } from 'framer-motion'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { CustomLink } from '@/components/ui/router/custom-link'

import Logo from '../../../../components/branding/logo'

const footerData = [
    {
        title: 'PRODUTO',
        links: [
            { label: 'Agentes de IA', link: `${process.env.NEXT_PUBLIC_BASE_URL}/agents` },
            { label: 'Entrar', link: `${process.env.NEXT_PUBLIC_BASE_URL}/entrar` },
            { label: 'Cadastrar', link: `${process.env.NEXT_PUBLIC_BASE_URL}/cadastrar` },
        ],
    },
    {
        title: 'RECURSOS',
        links: [
            { label: 'Fale conosco', link: `${process.env.NEXT_PUBLIC_BASE_URL}/contato` },
            { label: 'Sobre nós', link: `${process.env.NEXT_PUBLIC_BASE_URL}/sobre-nos` },
        ],
    },
    {
        title: 'EMPRESA',
        links: [
            { label: 'Política de privacidade', link: 'https://chatagentes.com/politica-de-privacidade/' },
            { label: 'Termos de serviço', link: 'https://chatagentes.com/termos-de-uso/' },
        ],
    },
]

export function FooterLinks() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-released-800 text-white">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Logo e descrição */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-1"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Logo width={32} className='text-white'/>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed mb-6">
                            © {currentYear} ChatAgentes, Inc.
                        </p>
                        
                        {/* Botão de contato */}
                        <Button
                            variant="outline"
                            className="mb-6 bg-transparent border-gray-600 text-white hover:bg-gray-800"
                            onClick={() => window.open(`${process.env.NEXT_PUBLIC_BASE_URL}/contato`, '_self')}
                        >
                            Contato
                        </Button>

                        {/* Redes sociais */}
                        <div className="flex gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8"
                                onClick={() => window.open('https://linkedin.com/company/chatagentes', '_blank')}
                                aria-label="LinkedIn"
                            >
                                <FiLinkedin size={16} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8"
                                onClick={() => window.open('https://instagram.com/chatagentes', '_blank')}
                                aria-label="Instagram"
                            >
                                <FiInstagram size={16} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8"
                                onClick={() => window.open('https://twitter.com/chatagentes', '_blank')}
                                aria-label="Twitter"
                            >
                                <FiTwitter size={16} />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-gray-800 w-8 h-8"
                                onClick={() => window.open('https://facebook.com/chatagentes', '_blank')}
                                aria-label="Facebook"
                            >
                                <FiFacebook size={16} />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Links organizados em colunas */}
                    {footerData.map((section, index) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="md:col-span-1"
                        >
                            <h3 className="text-sm font-semibold text-gray-300 mb-4 tracking-wider">
                                {section.title}
                            </h3>
                            <div className="flex flex-col gap-3">
                                {section.links.map((link, linkIndex) => (
                                    <CustomLink
                                        key={linkIndex}
                                        href={link.link}
                                        props={{
                                            className: 'text-sm text-gray-400 hover:text-white transition-colors duration-200 block',
                                            target: link.link.startsWith('http') ? '_blank' : '_self',
                                            rel: link.link.startsWith('http') ? 'noopener noreferrer' : '',
                                        }}
                                    >
                                        {link.label}
                                    </CustomLink>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

            
            </div>
        </footer>
    )
}
