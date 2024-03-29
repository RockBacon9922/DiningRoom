import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
	const query = JSON.parse(JSON.stringify(req.body));
	console.log("Locations API Called with params: " + JSON.stringify(query));
	const locations = await getLocations(query);
	res.status(200).json(locations);
};

export default handler;

const getLocations = async (query) => {
	const locations = await prisma.locations.findMany(query);
	await prisma.$disconnect();
	return locations;
};
