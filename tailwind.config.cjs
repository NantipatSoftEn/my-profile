function withOpacity(variableName) {
    return ({ opacityValue }) => {
        if (opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`
        }
        return `rgb(var(${variableName}))`
    }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['selector', "[data-theme='dark']"],
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        // Remove the following screen breakpoint or add other breakpoints
        // if one breakpoint is not enough for you
        screens: {
            sm: '640px',
        },

        extend: {
            textColor: {
                skin: {
                    base: withOpacity('--color-text-base'),
                    accent: withOpacity('--color-accent'),
                    inverted: withOpacity('--color-fill'),
                },
            },
            backgroundColor: {
                skin: {
                    fill: withOpacity('--color-fill'),
                    accent: withOpacity('--color-accent'),
                    inverted: withOpacity('--color-text-base'),
                    card: withOpacity('--color-card'),
                    'card-muted': withOpacity('--color-card-muted'),
                },
            },
            outlineColor: {
                skin: {
                    fill: withOpacity('--color-accent'),
                },
            },
            ringColor: {
                skin: {
                    accent: withOpacity('--color-accent'),
                    fill: withOpacity('--color-fill'),
                },
            },
            colors: {
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
            },
            borderColor: {
                skin: {
                    line: withOpacity('--color-border'),
                    fill: withOpacity('--color-text-base'),
                    accent: withOpacity('--color-accent'),
                },
            },
            fill: {
                skin: {
                    base: withOpacity('--color-text-base'),
                    accent: withOpacity('--color-accent'),
                },
                transparent: 'transparent',
            },
            fontFamily: {
                mono: ['IBM Plex Mono', 'IBM Plex Sans Thai Looped'],
                thai: ['IBM Plex Sans Thai Looped'],
            },

            typography: {
                DEFAULT: {
                    css: {
                        pre: {
                            color: false,
                        },
                        code: {
                            color: false,
                        },
                    },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}
