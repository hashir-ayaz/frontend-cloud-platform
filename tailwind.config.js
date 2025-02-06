// tailwind.config.js
module.exports = {
	darkMode: 'class', // dark mode enabled via a 'dark' class on <html> or <body>
	content: [
	  "./index.html",
	  "./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  background: '#111827', // your dark grey background
		  primary: {
			DEFAULT: '#14B8A6', // rich teal
			light: '#5EEAD4',
			dark: '#0D9488',
		  },
		  secondary: '#233150', // new secondary color
		},
		fontFamily: {
		  sans: ['Lexend', 'ui-sans-serif', 'system-ui', 'sans-serif'],
		},
		keyframes: {
		  fadeInDown: {
			'0%': { opacity: '0', transform: 'translateY(-20px)' },
			'100%': { opacity: '1', transform: 'translateY(0)' },
		  },
		  fadeInUp: {
			'0%': { opacity: '0', transform: 'translateY(20px)' },
			'100%': { opacity: '1', transform: 'translateY(0)' },
		  },
		},
		animation: {
		  fadeInDown: 'fadeInDown 1.5s ease-out forwards',
		  fadeInUp: 'fadeInUp 1.5s ease-out forwards',
		},
	  },
	},
	plugins: [],
  };
  