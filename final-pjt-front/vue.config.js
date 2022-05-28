const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	transpileDependencies: ["vuetify"],
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
					@import "@/styles/_variables.scss";
					@import "@/styles/mixins/_mixins.scss";
				`,
			},
		},
	},
	pages: {
		index: {
			entry: "src/main.js",
			template: "public/index.html",
			filename: "index.html",
			title: "AMU🎬",
			chunks: ["chunk-vendors", "chunk-common", "index"],
		},
	},
});
