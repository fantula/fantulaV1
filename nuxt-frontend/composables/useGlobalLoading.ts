
const visible = ref(false)
const text = ref('加载中...')
const type = ref<'loading' | 'success' | 'error'>('loading')

export function useGlobalLoading() {

    const show = (loadingText = '加载中...') => {
        visible.value = true
        text.value = loadingText
        type.value = 'loading'
    }

    const hide = () => {
        visible.value = false
    }

    const success = (successText = '操作成功', duration = 1500) => {
        text.value = successText
        type.value = 'success'
        visible.value = true
        setTimeout(() => {
            hide()
        }, duration)
    }

    const error = (errorText = '出现错误', duration = 2000) => {
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
