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
    /* ======================================================================
       [方案 SUIT-001] 标准幽灵 (Standard)
       ----------------------------------------------------------------------
       说明: 下面这些配置是传给 BaseModal 的 props。
       如果只改文字/图片/位置，改这里即可。
       如果要改 CSS 样式，请去 components/base/BaseModal.vue 底部
       ====================================================================== */
    'suit-001': {
        id: 'suit-001',
        name: 'Classic Phantom',
        mascotImg: '/images/modal/pc/mascot_01.png', // 更新为新版吉祥物
        mascotPosition: 'bottom',
        variantClass: 'variant-standard',
        animation: 'mascot-rise',
        opacity: 0.85,
        duration: '1.4s'
    },

    /* ======================================================================
       [方案 SUIT-002] 柔光风格 (Soft Light)
       ----------------------------------------------------------------------
       修改样式请去 components/base/BaseModal.vue 底部
       ====================================================================== */
    'suit-002': {
        id: 'suit-002',
        name: 'Soft Light',
        mascotImg: '/images/phantom_color_v2.png',
        mascotPosition: 'left',
        variantClass: 'variant-phantom-light',
        animation: 'phantom-rise-soft',
        opacity: 1,
        duration: '0.6s'
    },

    /* ======================================================================
       [方案 SUIT-003] 赛博朋克 (Cyberpunk)
       ----------------------------------------------------------------------
       修改样式请去 components/base/BaseModal.vue 底部
       ====================================================================== */
    'suit-003': {
        id: 'suit-003',
        name: 'Cyberpunk',
        mascotImg: '/images/global/mascot_cyber.png',
        mascotPosition: 'right',
        variantClass: 'variant-cyber',
        animation: 'cyber-pop'
    },

    /* [新方案添加处] */
}

export const DEFAULT_THEME_ID = 'suit-001'

export function getTheme(id?: string): ModalTheme {
    // Graceful fallback to default if ID is missing or invalid
    return MODAL_THEMES[id || ''] || MODAL_THEMES[DEFAULT_THEME_ID]
}
