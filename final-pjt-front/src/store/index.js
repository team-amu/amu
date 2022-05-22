import Vue from "vue";
import Vuex from "vuex";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import accounts from "./modules/accounts";
import community from "./modules/community";
import movies from "./modules/movies";

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export default new Vuex.Store({
	modules: { accounts, community, movies },
});
