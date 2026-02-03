/**
 * 后台弹窗状态管理 Composable
 * 统一管理所有弹窗的显示/隐藏、表单数据、加载状态
 * 避免每个页面重复编写弹窗控制逻辑
 */

import { ref, reactive, computed, toRaw, type Ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 通用弹窗管理 Composable
 * @param defaultForm - 表单默认值
 * @param options - 配置选项
 */
export function useAdminDialog<T extends Record<string, any>>(
    defaultForm: T,
    options?: {
        onSubmit?: (form: T, isEdit: boolean) => Promise<{ success: boolean; error?: string }>
        onSuccess?: (isEdit: boolean) => void
        editSuccessMessage?: string
        addSuccessMessage?: string
    }
) {
    const formRef = ref<FormInstance>()

    const visible = ref(false)
    const loading = ref(false)
    const isEdit = ref(false)
    const form = reactive<T>({ ...defaultForm })

    /**
     * 打开新增弹窗
     */
    const openAdd = (initialData?: Partial<T>) => {
        isEdit.value = false
        Object.assign(form, defaultForm, initialData || {})
        visible.value = true
    }

    /**
     * 打开编辑弹窗
     */
    const openEdit = (row: Partial<T>) => {
        isEdit.value = true
        Object.assign(form, defaultForm, row)
        visible.value = true
    }

    /**
     * 关闭弹窗
     */
    const close = () => {
        visible.value = false
        loading.value = false
    }

    /**
     * 重置表单
     */
    const reset = () => {
        formRef.value?.resetFields()
        Object.assign(form, defaultForm)
    }

    /**
     * 提交表单
     */
    const submit = async () => {
        if (!formRef.value) return

        const valid = await formRef.value.validate().catch(() => false)
        if (!valid) return

        if (!options?.onSubmit) {
            console.warn('[useAdminDialog] onSubmit is not defined')
            return
        }

        loading.value = true
        try {
            // 使用 toRaw 获取原始对象，传递给回调函数
            const result = await options.onSubmit(toRaw(form) as T, isEdit.value)

            if (result.success) {
                const message = isEdit.value
                    ? (options.editSuccessMessage || '更新成功')
                    : (options.addSuccessMessage || '添加成功')
                ElMessage.success(message)
                close()
                options?.onSuccess?.(isEdit.value)
            } else {
                ElMessage.error(result.error || '操作失败')
            }
        } catch (e: any) {
            ElMessage.error(e.message || '操作失败')
        } finally {
            loading.value = false
        }
    }

    return {
        formRef,
        visible,
        loading,
        isEdit,
        form,

        openAdd,
        openEdit,
        close,
        reset,
        submit
    }
}

/**
 * 确认删除弹窗
 */
export async function confirmDelete(
    message: string,
    onConfirm: () => Promise<{ success: boolean; error?: string }>,
    options?: {
        title?: string
        successMessage?: string
    }
): Promise<boolean> {
    try {
        await ElMessageBox.confirm(message, options?.title || '确认删除', {
            type: 'warning',
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            confirmButtonClass: 'el-button--danger'
        })

        const result = await onConfirm()

        if (result.success) {
            ElMessage.success(options?.successMessage || '删除成功')
            return true
        } else {
            ElMessage.error(result.error || '删除失败')
            return false
        }
    } catch {
        // 用户取消
        return false
    }
}

/**
 * 确认操作弹窗
 */
export async function confirmAction(
    message: string,
    onConfirm: () => Promise<{ success: boolean; error?: string }>,
    options?: {
        title?: string
        type?: 'warning' | 'info'
        confirmText?: string
        successMessage?: string
    }
): Promise<boolean> {
    try {
        await ElMessageBox.confirm(message, options?.title || '确认操作', {
            type: options?.type || 'warning',
            confirmButtonText: options?.confirmText || '确认',
            cancelButtonText: '取消'
        })

        const result = await onConfirm()

        if (result.success) {
            ElMessage.success(options?.successMessage || '操作成功')
            return true
        } else {
            ElMessage.error(result.error || '操作失败')
            return false
        }
    } catch {
        // 用户取消
        return false
    }
}

export default useAdminDialog
