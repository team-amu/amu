import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vuetify
import Vuetify from "vuetify";
// import "vuetify/dist/vuetify.min.css";
Vue.use(Vuetify);

// Vue Bootstrap
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	vuetify: new Vuetify(),
	render: (h) => h(App),
}).$mount("#app");
