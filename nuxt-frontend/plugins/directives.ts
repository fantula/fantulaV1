import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('intersection-observer', {
        mounted(el: HTMLElement, binding: any) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    binding.value()
                }
            }, { rootMargin: '100px' }) // Trigger 100px before bottom
            observer.observe(el)
            // @ts-ignore
            el._observer = observer
        },
        unmounted(el: HTMLElement) {
            // @ts-ignore
            if (el._observer) {
                // @ts-ignore
                el._observer.disconnect()
            }
        }
    })
})
