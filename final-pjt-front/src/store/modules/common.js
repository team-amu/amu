import router from "@/router";
// import axios from "axios";
// import drf from "@/api/drf";
// import _ from "lodash";

export default {
	state: {},

	getters: {},

	mutations: {},

	actions: {
		goBack() {
			router.go(-1);
		},
	},
};
