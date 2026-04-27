import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				inter: ['Inter', 'sans-serif'],
				jakarta: ['Plus Jakarta Sans', 'sans-serif'],
				mono: ['Geist Mono', 'ui-monospace', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				},
				// Deep Infrastructure design system
				void: '#060A12',
				ink: '#0D1421',
				surface: '#111827',
				azure: '#0078D4',
				electric: '#00B4D8',
				platinum: '#E8EAED',
				silver: '#8892A4',
				gold: '#F5A623',
				// Legacy portfolio colors (preserved for gradual migration)
				portfolio: {
					blue: '#1E3A8A',
					lightBlue: '#3B82F6',
					accent: '#6366F1',
					gray: '#4B5563',
					lightGray: '#F3F4F6',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-azure': 'linear-gradient(135deg, #0078D4 0%, #00B4D8 50%, #7C3AED 100%)',
				'gradient-gold': 'linear-gradient(135deg, #F5A623, #FBBF24)',
				'gradient-ambient': 'radial-gradient(ellipse at top, rgba(0,120,212,0.15) 0%, transparent 70%)',
				'gradient-void': 'radial-gradient(ellipse at center, #0D1421 0%, #060A12 100%)',
			},
			boxShadow: {
				'glow-azure': '0 0 24px rgba(0,120,212,0.3)',
				'glow-electric': '0 0 24px rgba(0,180,216,0.3)',
				'glow-gold': '0 0 24px rgba(245,166,35,0.3)',
				'card-dark': '0 4px 24px rgba(0,0,0,0.4)',
				'card-hover': '0 16px 48px rgba(0,0,0,0.6)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'pulse-glow': {
					'0%, 100%': { boxShadow: '0 0 8px rgba(0,180,216,0.2)' },
					'50%': { boxShadow: '0 0 24px rgba(0,180,216,0.6)' }
				},
				'ping-slow': {
					'0%': { transform: 'scale(1)', opacity: '1' },
					'75%, 100%': { transform: 'scale(2)', opacity: '0' }
				},
				'marquee': {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% center' },
					'100%': { backgroundPosition: '200% center' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
				},
				'count-up': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(40px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'ping-slow': 'ping-slow 2s cubic-bezier(0,0,0.2,1) infinite',
				'marquee': 'marquee 30s linear infinite',
				'shimmer': 'shimmer 3s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'count-up': 'count-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
			},
			transitionTimingFunction: {
				'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
				'smooth': 'cubic-bezier(0.16, 1, 0.3, 1)',
				'sharp': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
