const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
url =
	"http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/sitelist?key=" +
	process.env.MET_OFFICE_KEY;
const prisma = new PrismaClient();

const getLocations = async () => {
	const response = await axios.get(url).catch((err) => {
		console.log(err);
	});
	return response.data;
};
const prismaResponse = async (data, num) => {
	const location = data.Locations.Location[num];
	const locationName = location.name;
	const latitude = parseFloat(location.latitude);
	const longitude = parseFloat(location.longitude);
	const id = parseInt(location.id);
	console.log(locationName);
	await prisma.locations
		.create({
			data: {
				name: locationName,
				id: id,
				latitude: latitude,
				longitude: longitude,
			},
		})
		.catch((err) => {
			if (err.code === "P2002") {
				console.log("already exists");
			} else {
				console.log(err);
			}
		});
};

async function Main() {
	const data = await getLocations();
	const length = data.Locations.Location.length;
	for (var i = 0; i < length; i++) {
		await prismaResponse(data, i);
	}
}

Main().finally(async () => {
	await prisma.$disconnect();
});
