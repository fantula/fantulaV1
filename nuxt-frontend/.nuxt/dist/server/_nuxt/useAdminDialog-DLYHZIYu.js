/* empty css              */
/* empty css                    */
/* empty css                        */
/* empty css                   */
/* empty css                  */
/* empty css                    */
import { ref, reactive, toRaw } from "vue";
import { E as ElMessageBox } from "./index-C2vl4wFZ.js";
import { E as ElMessage } from "./index-CIurcsSv.js";
function useAdminDialog(defaultForm, options) {
  const formRef = ref();
  const visible = ref(false);
  const loading = ref(false);
  const isEdit = ref(false);
  const form = reactive({ ...defaultForm });
  const openAdd = (initialData) => {
    isEdit.value = false;
    Object.assign(form, defaultForm, initialData || {});
    visible.value = true;
  };
  const openEdit = (row) => {
    isEdit.value = true;
    Object.assign(form, defaultForm, row);
    visible.value = true;
  };
  const close = () => {
    visible.value = false;
    loading.value = false;
  };
  const reset = () => {
    formRef.value?.resetFields();
    Object.assign(form, defaultForm);
  };
  const submit = async () => {
    if (!formRef.value) return;
    const valid = await formRef.value.validate().catch(() => false);
    if (!valid) return;
    if (!options?.onSubmit) {
      console.warn("[useAdminDialog] onSubmit is not defined");
      return;
    }
    loading.value = true;
    try {
      const result = await options.onSubmit(toRaw(form), isEdit.value);
      if (result.success) {
        const message = isEdit.value ? options.editSuccessMessage || "更新成功" : options.addSuccessMessage || "添加成功";
        ElMessage.success(message);
        close();
        options?.onSuccess?.(isEdit.value);
      } else {
        ElMessage.error(result.error || "操作失败");
      }
    } catch (e) {
      ElMessage.error(e.message || "操作失败");
    } finally {
      loading.value = false;
    }
  };
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
  };
}
async function confirmDelete(message, onConfirm, options) {
  try {
    await ElMessageBox.confirm(message, options?.title || "确认删除", {
      type: "warning",
      confirmButtonText: "确认删除",
      cancelButtonText: "取消",
      confirmButtonClass: "el-button--danger"
    });
    const result = await onConfirm();
    if (result.success) {
      ElMessage.success(options?.successMessage || "删除成功");
      return true;
    } else {
      ElMessage.error(result.error || "删除失败");
      return false;
    }
  } catch {
    return false;
  }
}
async function confirmAction(message, onConfirm, options) {
  try {
    await ElMessageBox.confirm(message, options?.title || "确认操作", {
      type: options?.type || "warning",
      confirmButtonText: options?.confirmText || "确认",
      cancelButtonText: "取消"
    });
    const result = await onConfirm();
    if (result.success) {
      ElMessage.success(options?.successMessage || "操作成功");
      return true;
    } else {
      ElMessage.error(result.error || "操作失败");
      return false;
    }
  } catch {
    return false;
  }
}
export {
  confirmAction as a,
  confirmDelete as c,
  useAdminDialog as u
};
//# sourceMappingURL=useAdminDialog-DLYHZIYu.js.map
