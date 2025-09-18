import { createApp } from "vue";
import App from "./App.vue";
import router from "./router.js";

import "bootstrap-icons/font/bootstrap-icons.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/styles/main.scss";

createApp(App).use(createPinia()).use(router).mount("#app");
