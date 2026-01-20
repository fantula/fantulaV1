/**
 * 应用常量定义
 */

// 默认头像路径（统一使用）
export const DEFAULT_AVATAR = '/images/client/pc/avatars/avatar-cat.png'

// 系统头像列表
export const SYSTEM_AVATARS = [
    '/images/client/pc/avatars/avatar-cat.png',
    '/images/client/pc/avatars/avatar-penguin.png',
    '/images/client/pc/avatars/avatar-bunny.png',
    '/images/client/pc/avatars/avatar-owl.png',
    '/images/client/pc/avatars/avatar-frog.png',
    '/images/client/pc/avatars/avatar-bear.png',
    '/images/client/pc/avatars/avatar-1.png',
    '/images/client/pc/avatars/avatar-2.png',
    '/images/client/pc/head1.png',
    '/images/client/pc/head2.png',
    '/images/client/pc/head3.png'
]

// 头像上传配置
export const AVATAR_CONFIG = {
    maxSize: 5 * 1024 * 1024, // 5MB
    outputSize: 200, // 输出尺寸 200x200
    quality: 0.85, // WebP 压缩质量
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
}
