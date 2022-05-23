import Vue from "vue";
import Vuex from "vuex";

import accounts from "./modules/accounts";
import profile from "./modules/profile";
import community from "./modules/community";
import movies from "./modules/movies";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: { accounts, community, movies, profile },
});
