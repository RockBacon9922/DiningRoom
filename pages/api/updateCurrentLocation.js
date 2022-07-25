import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req, res) => {
	const id = parseInt(req.query.id);
	const removeAllActive = await update({
		where: {
			active: {
				equals: true,
			},
		},
		data: {
			active: false,
		},
	});
	const addActive = await update({
		where: {
			id: {
				equals: id,
			},
		},
		data: {
			active: true,
		},
	});
	removeAllActive;
	addActive;
	res.status(200).send("Active location is: " + id);
};

export default handler;

const find = async (query) => {
	const locations = await prisma.locations.findMany(query);
	await prisma.$disconnect();
	return locations;
};

const update = async (query) => {
	const locations = await prisma.locations.updateMany(query);
	await prisma.$disconnect();
	return locations;
};
