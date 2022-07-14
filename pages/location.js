import { PrismaClient } from "@prisma/client";
import { useQuery } from "react-query";

// create serverside props function
export const getServerSideProps = async () => {
	const prisma = new PrismaClient();
	const fetchLocations = async () => {
		let locations = await prisma.locations.findMany({});
		prisma.$disconnect();
		return locations;
	};

	return {
		props: {
			locations: await fetchLocations(),
		},
	};
};

const location = ({ locations }) => {
	const { data, status } = useQuery("locations", () => locations);
	if (status === "loading") {
		return <div>Loading...</div>;
	}
	if (status === "error") {
		return <div>Error!</div>;
	}
	return (
		<div>
			<h1>Locations</h1>
			<ul>
				{data.map((location) => (
					<li key={location.id}>{location.name}</li>
				))}
			</ul>
		</div>
	);
};

export default location;
