import type { Config } from "tailwindcss";
/*const { nextui } = require("@nextui-org/theme");
const colors = require("tailwindcss/colors");*/

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    /* // single component styles
     "./node_modules/@nextui-org/theme/dist/components/button.js",
     "./node_modules/@nextui-org/theme/dist/components/input.js",
     "./node_modules/@nextui-org/theme/dist/components/divider.js",
     "./node_modules/@nextui-org/theme/dist/components/checkbox.js",
     // or you can use a glob pattern (multiple component styles)
     './node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js'*/
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			DEFAULT: '15px',
  			sm: '15px',
  			lg: '15px',
  			xl: '0',
  			'2xl': '0'
  		},
  		screens: {
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1280px'
  		}
  	},
  	extend: {
  		colors: {
  			primary: {
  				'50': '#F6F8FF',
  				'100': '#EDF0FF',
  				'200': '#D1DAFE',
  				'300': '#B4C2FD',
  				'400': '#8092FF',
  				'500': '#4669FA',
  				'600': '#3F5EDF',
  				'700': '#2A3F96',
  				'800': '#203071',
  				'900': '#151F49',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#F9FAFB',
  				'100': '#F4F5F7',
  				'200': '#E5E7EB',
  				'300': '#D2D6DC',
  				'400': '#9FA6B2',
  				'500': '#A0AEC0',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1E293B',
  				'900': '#0F172A',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			danger: {
  				'50': '#FFF7F7',
  				'100': '#FEEFEF',
  				'200': '#FCD6D7',
  				'300': '#FABBBD',
  				'400': '#F68B8D',
  				'500': '#F1595C',
  				'600': '#D75052',
  				'700': '#913638',
  				'800': '#6D292A',
  				'900': '#461A1B'
  			},
  			black: {
  				'50': '#F9FAFB',
  				'100': '#F4F5F7',
  				'200': '#E5E7EB',
  				'300': '#D2D6DC',
  				'400': '#9FA6B2',
  				'500': '#111112',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1E293B',
  				'900': '#0F172A'
  			},
  			waiting: {
  				'50': '#ffc000',
  				'100': '#ffc000',
  				'200': '#ffc000',
  				'300': '#ffc000',
  				'400': '#ffc000',
  				'500': '#ffc000',
  				'600': '#ffc000',
  				'700': '#ffc000',
  				'800': '#ffc000',
  				'900': '#ffc000'
  			},
  			warning: {
  				'50': '#FFFAF8',
  				'100': '#FFF4F1',
  				'200': '#FEE4DA',
  				'300': '#FDD2C3',
  				'400': '#FCB298',
  				'500': '#FA916B',
  				'600': '#DF8260',
  				'700': '#965741',
  				'800': '#714231',
  				'900': '#492B20'
  			},
  			info: {
  				'50': '#F3FEFF',
  				'100': '#E7FEFF',
  				'200': '#C5FDFF',
  				'300': '#A3FCFF',
  				'400': '#5FF9FF',
  				'500': '#0CE7FA',
  				'600': '#00B8D4',
  				'700': '#007A8D',
  				'800': '#005E67',
  				'900': '#003F42'
  			},
  			success: {
  				'50': '#F3FEF8',
  				'100': '#E7FDF1',
  				'200': '#C5FBE3',
  				'300': '#A3F9D5',
  				'400': '#5FF5B1',
  				'500': '#1be19a',
  				'600': '#3F9A7A',
  				'700': '#198754',
  				'800': '#1F4B47',
  				'900': '#0F2A2E'
  			},
  			released: {
  				'50': '#F7F8F9',
  				'100': '#ECEEF1',
  				'200': '#DDE0E5',
  				'300': '#C8CED6',
  				'400': '#A6B0BF',
  				'500': '#7D8DA3',
  				'600': '#18181b',
  				'700': '#121215',
  				'800': '#0C0C0E',
  				'900': '#060607'
  			},
  			green: {
  				'50': '#F3FEF8',
  				'100': '#E7FDF1',
  				'200': '#C5FBE3',
  				'300': '#A3F9D5',
  				'400': '#5FF5B1',
  				'500': '#1be19a',
  				'600': '#3F9A7A',
  				'700': '#2E6D61',
  				'800': '#1F4B47',
  				'900': '#0F2A2E'
  			},
  			gray: {
  				'50': '#F9FAFB',
  				'100': '#F4F5F7',
  				'200': '#E5E7EB',
  				'300': '#D2D6DC',
  				'400': '#9FA6B2',
  				'500': '#68768A',
  				'600': '#475569',
  				'700': '#334155',
  				'800': '#1E293B',
  				'900': '#0F172A'
  			},
  			grafite: {
  				'50': '#F7F8F9',
  				'100': '#ECEEF1',
  				'200': '#DDE0E5',
  				'300': '#C8CED6',
  				'400': '#A6B0BF',
  				'500': '#7D8DA3',
  				'600': '#18181b',
  				'700': '#121215',
  				'800': '#0C0C0E',
  				'900': '#060607'
  			},
  			ametista: {
  				'50': '#F5F3FF',
  				'100': '#EDE9FE',
  				'200': '#DDD6FE',
  				'300': '#C4B5FD',
  				'400': '#A78BFA',
  				'500': '#8B5CF6',
  				'600': '#7c3aed',
  				'700': '#6D28D9',
  				'800': '#5B21B6',
  				'900': '#4C1D95'
  			},
  			lavanda: {
  				'50': '#FAF9FF',
  				'100': '#F4F1FE',
  				'200': '#EDE9FE',
  				'300': '#DAD4FD',
  				'400': '#C2B5FC',
  				'500': '#A899F8',
  				'600': '#8F7AF5',
  				'700': '#7A63EB',
  				'800': '#624DD7',
  				'900': '#4A3ABF'
  			},
  			cinzaClaro: {
  				'50': '#FFFFFF',
  				'100': '#FAFAFA',
  				'200': '#F7F7F8',
  				'300': '#F4F4F5',
  				'400': '#E5E5E5',
  				'500': '#D4D4D8',
  				'600': '#A1A1AA',
  				'700': '#71717A',
  				'800': '#52525B',
  				'900': '#3F3F46'
  			},
  			verde: {
  				'50': '#ECFDF5',
  				'100': '#D1FAE5',
  				'200': '#A7F3D0',
  				'300': '#6EE7B7',
  				'400': '#34D399',
  				'500': '#10B981',
  				'600': '#059669',
  				'700': '#047857',
  				'800': '#065F46',
  				'900': '#064E3B'
  			},
  			vermelho: {
  				'50': '#FEF2F2',
  				'100': '#FEE2E2',
  				'200': '#FECACA',
  				'300': '#FCA5A5',
  				'400': '#F87171',
  				'500': '#EF4444',
  				'600': '#DC2626',
  				'700': '#B91C1C',
  				'800': '#991B1B',
  				'900': '#7F1D1D'
  			},
  			'redasoni-primary': '#1E40AF',
  			'redasoni-accent': '#DC2626',
  			'redasoni-neutral': '#F9FAFB',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			poppins: [
  				'Poppins',
  				'Inter',
  				'sans-serif'
  			],
  			exo: [
  				'Exo 2',
  				'Inter',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			base: '0px 0px 1px rgba(40, 41, 61, 0.08), 0px 0.5px 2px rgba(96, 97, 112, 0.16)',
  			base2: '0px 2px 4px rgba(40, 41, 61, 0.04), 0px 8px 16px rgba(96, 97, 112, 0.16)',
  			base3: '16px 10px 40px rgba(15, 23, 42, 0.22)',
  			deep: '-2px 0px 8px rgba(0, 0, 0, 0.16)',
  			dropdown: '0px 4px 8px rgba(0, 0, 0, 0.08)',
  			testi: '0px 4px 24px rgba(0, 0, 0, 0.06)',
  			todo: 'rgba(235 233 241, 0.6) 0px 3px 10px 0px'
  		},
  		keyframes: {
  			zoom: {
  				'0%, 100%': {
  					transform: 'scale(0.5)'
  				},
  				'50%': {
  					transform: 'scale(1)'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'spin-slow': 'spin 3s linear infinite',
  			zoom: 'zoom 1s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  darkMode: ["class", "class"],
    plugins: [require("tailwindcss-animate")]
};
export default config;
