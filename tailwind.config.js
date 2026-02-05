/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Minimalist palette - softer, cleaner tones
                void: '#0A0A0B',
                'oi-primary': '#3B82F6', // Soft blue
                'oi-accent': '#6366F1',  // Indigo accent
                surface: {
                    DEFAULT: '#18181B',
                    light: '#27272A',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            backdropBlur: {
                xl: '24px',
            },
        },
    },
    plugins: [],
}
