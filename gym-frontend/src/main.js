import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { plugin, defaultConfig } from "@formkit/vue";

const options = {
  position: "top-right",
  timeout: 2500,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
  rtl: true,
};

const pinia = createPinia();
pinia.use(piniaPluginPersist);

const app = createApp(App);
app.use(pinia);
app.use(Toast, options);
app.use(plugin, defaultConfig);
app.use(router);
app.mount("#app");
