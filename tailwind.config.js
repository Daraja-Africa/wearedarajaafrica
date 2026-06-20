/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
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
        },
        // Daraja Africa Brand Colors — PDF exact
        brand: {
          cream: '#F5EFE4',            // page background
          'cream-light': '#E8DCC8',    // surface / UI panels
          card: '#FDF8F0',             // pillar cards
          'icon-surface': '#EDE5D4',   // icon containers
          'cta-surface': '#FDE8D0',    // attention banner
          gold: '#B8671A',             // clay orange — CTAs
          'gold-dark': '#944F10',      // clay hover
          'gold-accent': '#8B6914',    // footer headings / logo ring
          charcoal: '#1C1A14',         // primary ink
          forest: '#4A7A3A',           // primary green
          leaf: '#2E5E22',             // dark green
          terracotta: '#B8671A',
          rust: '#B8671A',
          blush: '#F4A8B8',            // emotional accent
          'blush-hover': '#E08898',
          'blush-text': '#5A1A28',
          dark: '#1A1A0E',             // footer background
          'dark-mid': '#242318',       // footer emergency card
          body: '#4A4030',             // muted ink
          // Footer text scale
          'footer-text': '#C8BFB0',
          'footer-text-muted': '#7A7060',
          'footer-text-dark': '#5A5248',
          'footer-divider': '#2E2C1E',
        }
      },
      fontFamily: {
        heading: ['DM Serif Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
        mono: ['Courier New', 'Courier', 'monospace'],
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
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        floatUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '10%': { opacity: '0.12' },
          '85%': { opacity: '0.08' },
          '100%': { opacity: '0', transform: 'translateY(-80px)' }
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee': 'marquee 40s linear infinite',
        'float-up': 'floatUp linear infinite',
        'blink': 'blink 1s step-end infinite',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
  safelist: [
    'bg-brand-gold', 'bg-brand-forest', 'bg-brand-rust', 'bg-brand-blush',
    'bg-brand-card', 'bg-brand-icon-surface', 'bg-brand-cta-surface',
    'text-brand-gold', 'text-brand-forest', 'text-brand-rust', 'text-brand-blush',
    'text-brand-gold-accent', 'text-brand-blush-text', 'text-brand-leaf',
    'text-brand-footer-text', 'text-brand-footer-text-muted', 'text-brand-footer-text-dark',
    'border-brand-gold', 'border-brand-forest', 'border-brand-footer-divider',
  ]
}
