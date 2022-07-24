import fs from "fs";
export default function handler(req, res) {
	//open file and read first line
	if (req.query.type !== "post") {
		var currentLocation = fs.readFileSync("location", "utf8");
		res.status(200).send(currentLocation);
		return;
	}
	res.status(200).send("Done!");
}
