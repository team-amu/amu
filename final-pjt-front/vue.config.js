const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: ["vuetify"],
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import "@/styles/_variables.scss";
					@import "@/styles/_mixins.scss";
				`,
			},
		},
	},
});
