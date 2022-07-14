import { Main } from "../../javaScripts/locToDatabase";
const main = Main;
// export default function handler(req, res) {
// 	res
// 		.status(200)
// 		.send("Started indexing locations to database. Please wait...")
// 		.then(() => {
// 			main();
// 		});
// }
// #TODO: fix the error in this file
const handler = (req, res) => {
	res
		.status(200)
		.send("Started indexing locations to database. Please wait...");
	main();
};

export default handler;
