
const visible = ref(false)
const text = ref('Loading...')
const type = ref<'loading' | 'success' | 'error'>('loading')

export function useGlobalLoading() {

    const show = (loadingText = 'Loading...') => {
        visible.value = true
        text.value = loadingText
        type.value = 'loading'
    }

    const hide = () => {
        visible.value = false
        // Reset after transition potentially, but for now simple
    }

    const success = (successText = 'Success!', duration = 1500) => {
        text.value = successText
        type.value = 'success'
        visible.value = true
        setTimeout(() => {
            hide()
        }, duration)
    }

    const error = (errorText = 'Error', duration = 2000) => {
        text.value = errorText
        type.value = 'error'
        visible.value = true
        setTimeout(() => {
            hide()
        }, duration)
    }

    return {
        visible: readonly(visible),
        text: readonly(text),
        type: readonly(type),
        show,
        hide,
        success,
        error
    }
}
