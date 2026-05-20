/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border:      'hsl(var(--border))',
        input:       'hsl(var(--input))',
        ring:        'hsl(var(--ring))',
        background:  'hsl(var(--background))',
        foreground:  'hsl(var(--foreground))',
        primary:     { DEFAULT: 'hsl(var(--primary))',     foreground: 'hsl(var(--primary-foreground))' },
        secondary:   { DEFAULT: 'hsl(var(--secondary))',   foreground: 'hsl(var(--secondary-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        muted:       { DEFAULT: 'hsl(var(--muted))',       foreground: 'hsl(var(--muted-foreground))' },
        accent:      { DEFAULT: 'hsl(var(--accent))',      foreground: 'hsl(var(--accent-foreground))' },
        popover:     { DEFAULT: 'hsl(var(--popover))',     foreground: 'hsl(var(--popover-foreground))' },
        card:        { DEFAULT: 'hsl(var(--card))',        foreground: 'hsl(var(--card-foreground))' },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        heading: ['Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs:   ['0.9375rem',  { lineHeight: '1.5' }],   // 15px
        sm:   ['1.0625rem',  { lineHeight: '1.6' }],   // 17px
        base: ['1.1875rem',  { lineHeight: '1.7' }],   // 19px
        lg:   ['1.3125rem',  { lineHeight: '1.6' }],   // 21px
        xl:   ['1.5rem',     { lineHeight: '1.5' }],   // 24px
        '2xl':['1.75rem',    { lineHeight: '1.4' }],   // 28px
        '3xl':['2.5rem',     { lineHeight: '1.2' }],   // 40px  ↑ was 34px
        '4xl':['3.25rem',    { lineHeight: '1.1' }],   // 52px  ↑ was 42px
        '5xl':['4rem',       { lineHeight: '1.05' }],  // 64px  ↑ was 54px
      },
      animation: {
        shimmer: 'shimmer 2s linear infinite',
        'pulse-blue': 'pulse-blue 2.5s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease forwards',
        float: 'float 6s ease-in-out infinite',
        gradient: 'gradient 8s linear infinite',
        scroll: 'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-blue': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(59,130,246,0.4)' },
          '50%': { boxShadow: '0 0 0 14px rgba(59,130,246,0)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          to: { backgroundPosition: 'var(--bg-size, 300%) 0' },
        },
        scroll: {
          to: { transform: 'translate(calc(-50% - 0.5rem))' },
        },
      },
      backgroundSize: { '300%': '300%' },
    },
  },
  plugins: [],
}

