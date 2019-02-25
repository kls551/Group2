import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUpload, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUpload, faUser);
library.add(faCoffee);


Vue.config.productionTip = false;

require("./assets/mybulma/sass/mystyles.scss")
Vue.component("font-awesome-icon", FontAwesomeIcon);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
