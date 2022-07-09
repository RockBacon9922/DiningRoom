const convertColors = (c) => {
	var output = "";
	for (let i = 0; i < 9; i += 3) {
		d = c.toString().slice(i, i + 3);
		output = output + d.toString(16);
	}
	return "#" + output;
};

bethanyblue = "#0f2c57";
bethanytext = "#b8d1e5";
bethanywhite = "#ffffff";
bethanycream = "#829aae";
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"bethany-blue": bethanyblue,
				"bethany-text": bethanytext,
				"bethany-cream": bethanycream,
			},
		},
	},
	plugins: [],
};
