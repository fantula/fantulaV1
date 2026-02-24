import { defineStore } from 'pinia'
export const useModalStore = defineStore('modal', {
  state: () => ({
    showLogin: false,
    showContact: false
  }),
  actions: {
    openLogin() { this.showLogin = true },
    closeLogin() { this.showLogin = false },
    openContact() { this.showContact = true },
    closeContact() { this.showContact = false }
  }
}) 