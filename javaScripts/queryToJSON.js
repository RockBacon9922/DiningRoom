const query = {
	where: {
		id: {
			gt: 10,
			lt: 200,
		},
	},
};

console.log(JSON.stringify(query));
