import { ref, reactive, toRaw } from 'vue';
import { E as ElMessageBox } from './index-CJRqI9Bk.mjs';
import { E as ElMessage } from './index-Ho-fELR6.mjs';

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
    var _a;
    (_a = formRef.value) == null ? void 0 : _a.resetFields();
    Object.assign(form, defaultForm);
  };
  const submit = async () => {
    var _a;
    if (!formRef.value) return;
    const valid = await formRef.value.validate().catch(() => false);
    if (!valid) return;
    if (!(options == null ? void 0 : options.onSubmit)) {
      console.warn("[useAdminDialog] onSubmit is not defined");
      return;
    }
    loading.value = true;
    try {
      const result = await options.onSubmit(toRaw(form), isEdit.value);
      if (result.success) {
        const message = isEdit.value ? options.editSuccessMessage || "\u66F4\u65B0\u6210\u529F" : options.addSuccessMessage || "\u6DFB\u52A0\u6210\u529F";
        ElMessage.success(message);
        close();
        (_a = options == null ? void 0 : options.onSuccess) == null ? void 0 : _a.call(options, isEdit.value);
      } else {
        ElMessage.error(result.error || "\u64CD\u4F5C\u5931\u8D25");
      }
    } catch (e) {
      ElMessage.error(e.message || "\u64CD\u4F5C\u5931\u8D25");
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
    await ElMessageBox.confirm(message, (options == null ? void 0 : options.title) || "\u786E\u8BA4\u5220\u9664", {
      type: "warning",
      confirmButtonText: "\u786E\u8BA4\u5220\u9664",
      cancelButtonText: "\u53D6\u6D88",
      confirmButtonClass: "el-button--danger"
    });
    const result = await onConfirm();
    if (result.success) {
      ElMessage.success((options == null ? void 0 : options.successMessage) || "\u5220\u9664\u6210\u529F");
      return true;
    } else {
      ElMessage.error(result.error || "\u5220\u9664\u5931\u8D25");
      return false;
    }
  } catch {
    return false;
  }
}
async function confirmAction(message, onConfirm, options) {
  try {
    await ElMessageBox.confirm(message, (options == null ? void 0 : options.title) || "\u786E\u8BA4\u64CD\u4F5C", {
      type: (options == null ? void 0 : options.type) || "warning",
      confirmButtonText: (options == null ? void 0 : options.confirmText) || "\u786E\u8BA4",
      cancelButtonText: "\u53D6\u6D88"
    });
    const result = await onConfirm();
    if (result.success) {
      ElMessage.success((options == null ? void 0 : options.successMessage) || "\u64CD\u4F5C\u6210\u529F");
      return true;
    } else {
      ElMessage.error(result.error || "\u64CD\u4F5C\u5931\u8D25");
      return false;
    }
  } catch {
    return false;
  }
}

export { confirmDelete as a, confirmAction as c, useAdminDialog as u };
//# sourceMappingURL=useAdminDialog-DGlLxLb0.mjs.map
