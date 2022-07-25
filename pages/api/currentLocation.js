import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
	try {
		const locations = await getLocations({
			where: {
				active: {
					equals: true,
				},
			},
			select: {
				id: true,
			},
		});
		const id = JSON.parse(JSON.stringify(locations))[0].id;
		res.status(200).send(id);
		console.log("Current Location has and ID of: " + id);
	} catch (err) {
		console.log(err);
		res.status(500).send("couldn't find current location");
	}
};

export default handler;

const getLocations = async (query) => {
	const locations = await prisma.locations.findMany(query);
	await prisma.$disconnect();
	return locations;
};
