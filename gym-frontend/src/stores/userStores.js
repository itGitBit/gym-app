import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: "",
      name: "",
      phone: "",
      email: "",
      type: "",
    },
  }),
  actions: {
    setUser(newUser) {
      this.user = newUser;
    },
    clearUser() {
      this.user = {
        id: "",
        name: "",
        phone: "",
        email: "",
        type: "",
      };
    },
    isUserLoggedIn() {
      return this.user.id !== "";
    },
    getUser() {
      return this.user;
    },
  },
  persist: {
    enabled: true,
  },
});
