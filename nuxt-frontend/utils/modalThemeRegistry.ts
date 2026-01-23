export interface ModalTheme {
    id: string
    name: string
    mascotImg: string | null
    mascotPosition: 'left' | 'right' | 'bottom'
    variantClass: string
    animation: string
    // New Visual Props for Optimization
    opacity?: number
    duration?: string
}

export const MODAL_THEMES: Record<string, ModalTheme> = {
    // Suit 001: Optimized Standard
    'suit-001': {
        id: 'suit-001',
        name: 'Classic Phantom',
        mascotImg: '/images/phantom_color_v2.png',
        mascotPosition: 'bottom',
        variantClass: 'variant-standard',
        animation: 'mascot-rise',
        // Optimized for user feedback: Less prominent, slower animation
        opacity: 0.9,
        duration: '0.8s'
    },

    // 预留位置 (未来可添加 suit-002: e.g. Future Theme)
    'suit-002': {
        id: 'suit-002',
        name: 'Future Theme',
        mascotImg: '',
        mascotPosition: 'left',
        variantClass: 'variant-future',
        animation: 'mascot-rise',
        opacity: 1,
        duration: '0.6s'
    }
}

export const DEFAULT_THEME_ID = 'suit-001'

export function getTheme(id?: string): ModalTheme {
    // Graceful fallback to default if ID is missing or invalid
    return MODAL_THEMES[id || ''] || MODAL_THEMES[DEFAULT_THEME_ID]
}
