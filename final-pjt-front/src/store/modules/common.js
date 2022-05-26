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
			window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
		},
		goBackCheck({ state }) {
			if (confirm("이전으로 이동하시겠습니까?")) {
				state.goBack();
			}
		},

		goDoubleBack() {
			window.history.length > 2 ? this.$router.go(-2) : this.$router.push("/");
		},
		goDoubleBackCheck({ state }) {
			if (confirm("이전으로 이동하시겠습니까?")) {
				state.goDoubleBack();
			}
		},

		goHome() {
			router.push({ name: "home" });
		},
		goHomeCheck() {
			if (confirm("홈으로 이동하시겠습니까?")) {
				router.push({ name: "home" });
			}
		},
	},
};
