import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import ApiService from "./services/api.service";
import { AuthService } from "./services/auth.service";

Vue.config.productionTip = false;

// Set the base URL of the API
ApiService.init("/");

// If token exists set header
if (AuthService.getToken()) {
  ApiService.setHeader();
}

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount("#app");
