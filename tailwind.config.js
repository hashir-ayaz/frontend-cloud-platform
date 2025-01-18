/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		colors: {
  			primary: '#000000',
  			secondary: '#1C1F26',
  			accent: '#7C3AED',
  			pinkishGlow: '#F472B6',
  			textLight: '#EDEDED',
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
  		fontFamily: {
  			custom: [
  				'Lexend',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			glow: '0 0 40px rgba(124, 58, 237, 0.7), 0 0 50px rgba(244, 114, 182, 0.7)'
  		},
  		animation: {
  			glowPulse: 'pulseGlow 3s infinite ease-in-out'
  		},
  		keyframes: {
  			pulseGlow: {
  				'0%, 100%': {
  					boxShadow: '0 0 30px rgba(124, 58, 237, 0.5), 0 0 40px rgba(244, 114, 182, 0.5)'
  				},
  				'50%': {
  					boxShadow: '0 0 50px rgba(124, 58, 237, 0.8), 0 0 60px rgba(244, 114, 182, 0.8)'
  				}
  			}
  		}
  	}
  },
  plugins: [],
};
