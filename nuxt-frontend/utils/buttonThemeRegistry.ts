export interface ButtonTheme {
    id: string
    variantClass: string
    animation?: string
}

export const BUTTON_THEMES: Record<string, ButtonTheme> = {
    // [Primary] Standard Blue Gradient (Modals, Forms)
    'primary': {
        id: 'primary',
        variantClass: 'btn-primary'
    },
    // [Suite 001] Classic Phantom - Neon Glass
    'suit-001-primary': {
        id: 'suit-001-primary',
        variantClass: 'btn-suit-001-primary'
    },
    'suit-001-secondary': {
        id: 'suit-001-secondary',
        variantClass: 'btn-suit-001-secondary'
    },
    // [Secondary] Ghost/Outline (Cancel, Back)
    'secondary': {
        id: 'secondary',
        variantClass: 'btn-secondary'
    },
    // [Destructive] Warning/Red (Delete, Logout)
    'destructive': {
        id: 'destructive',
        variantClass: 'btn-destructive'
    },
    // [Marketing] Product Cards (Buy Cart) - Special Interaction
    'marketing-buy': {
        id: 'marketing-buy',
        variantClass: 'btn-marketing-buy'
    },
    'marketing-cart': {
        id: 'marketing-cart',
        variantClass: 'btn-marketing-cart'
    },
    // [Social] OAuth Buttons
    'social-google': {
        id: 'social-google',
        variantClass: 'btn-social-google'
    },
    // [Tab] Login/Register Toggles
    'tab': {
        id: 'tab',
        variantClass: 'btn-tab'
    }
}

export const DEFAULT_BUTTON_THEME_ID = 'primary'

export function getButtonTheme(id?: string): ButtonTheme {
    return BUTTON_THEMES[id || ''] || BUTTON_THEMES[DEFAULT_BUTTON_THEME_ID]
}
