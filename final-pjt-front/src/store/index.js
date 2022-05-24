import Vue from "vue";
import Vuex from "vuex";

import common from "./modules/common";
import accounts from "./modules/accounts";
import community from "./modules/community";
import movies from "./modules/movies";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: { accounts, community, movies, common },
});
