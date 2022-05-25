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
		goBackCheck() {
			if (confirm("이전으로 이동하시겠습니까?")) {
				router.go(-1);
			}
		},
	},
};
