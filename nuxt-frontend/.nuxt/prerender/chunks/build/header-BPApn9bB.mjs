import { e as defineStore } from './server.mjs';

const useAdminHeaderStore = defineStore("admin-header", {
  state: () => ({
    title: "",
    tabs: [],
    activeTab: "",
    sessionId: null
  }),
  actions: {
    /**
     * Set the layout for the current page.
     * Generates a new random Session ID to "lock" the header for this component.
     * @returns The generated session ID, which the component must store to unlock later.
     */
    setLayout(title, tabs, activeTab) {
      const newId = Math.random().toString(36).substring(7);
      this.title = title;
      this.tabs = tabs;
      this.activeTab = activeTab;
      this.sessionId = newId;
      return newId;
    },
    /**
     * Update the active tab (e.g. when route changes within the same module)
     */
    setActiveTab(tabName) {
      this.activeTab = tabName;
    },
    /**
     * Clear the layout.
     * Critical: Only clear if the unlocking ID matches the current lock.
     * This prevents an unmounting older component from clearing a mounting newer component's header.
     */
    clearLayout(unlockId) {
      if (this.sessionId === unlockId) {
        this.title = "";
        this.tabs = [];
        this.activeTab = "";
        this.sessionId = null;
      }
    }
  }
});

export { useAdminHeaderStore as u };
//# sourceMappingURL=header-BPApn9bB.mjs.map
