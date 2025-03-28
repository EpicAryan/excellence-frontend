
import type { Config } from "tailwindcss";
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			buttontag: 'hsl(var(--button-tag))',
  			gradient: {
  				'100': 'hsl(var(--gradient-100))',
  				'500': 'hsl(var(--gradient-500))',
  				'800': 'hsl(var(--gradient-800))',
  				DEFAULT: 'hsl(var(--gradient-default))'
  			},
  			cardbg: 'hsl(var(--card-bg))',
  			footer: 'hsl(var(--footer))',
  			subtext: 'hsl(var(--heading-subtext))',
  			bigbutton: 'hsl(var(--big-button))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			title: [
  				'Merienda',
  				'cursive'
  			],
  			sans: [
  				'Averia Serif Libre',
  				'serif'
  			]
  		},
  		backgroundImage: {
  			'custom-oval-gradient': 'linear-gradient(90deg, #9000FF 0%, #8D6CCB 23%,#8C85BE 45%, #8C85BE 85%, #8BA0B1 100%)',
  			'morph-card': 'linear-gradient(0deg, rgba(176,145,234, 0.3) 0%,rgba(176,145,234, 0.2) 100%)'
  		},
  		borderImageSource: {
  			'morph-card-line': 'linear-gradient(0deg,rgba(141,108,203,1) 0%,rgba(41,77,255,0.7) 57%, rgba(123,48,226,0.7) 100%)'
  		},
  		animation: {
  			scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite'
  		},
  		keyframes: {
  			scroll: {
  				to: {
  					transform: 'translate(calc(-50% - 0.5rem))'
  				}
  			}
  		}
  	}
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
