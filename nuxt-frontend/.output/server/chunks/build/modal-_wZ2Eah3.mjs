import { j as defineStore } from './server.mjs';

const useModalStore = defineStore("modal", {
  state: () => ({ showLogin: false }),
  actions: {
    openLogin() {
      this.showLogin = true;
    },
    closeLogin() {
      this.showLogin = false;
    }
  }
});

export { useModalStore as u };
//# sourceMappingURL=modal-_wZ2Eah3.mjs.map
