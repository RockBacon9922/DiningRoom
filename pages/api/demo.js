const handler = async (req, res) => {
	console.log(req.query);
	const obj = JSON.parse(JSON.stringify(req.body));

	res.status(200).send(obj.height);
};

export default handler;
