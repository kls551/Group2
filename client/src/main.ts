import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload, faUser, faTrash, faTrashAlt, faEdit, faAngleDown, faAngleUp, faShoppingCart, faUserAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUpload, faUser, faEdit, faTrash, faAngleDown, faAngleUp, faTrashAlt, faShoppingCart
  ,faUserAlt, faSignOutAlt);

Vue.config.productionTip = false;

require("./assets/mybulma/sass/mystyles.scss")
Vue.component("font-awesome-icon", FontAwesomeIcon);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
