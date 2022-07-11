const axios = require("axios");

//get metoffice apikey
const MET_OFFICE_API_KEY = "f4d32511-0096-4177-8c58-2f9fd290ee8f";

const Location = 3840;

//get weather from api http://datapoint.metoffice.gov.uk/public/data/resource?key=APIkey

const getWeather = async () => {
	const response = await axios
		.get(
			`http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/json/${Location}?res=3hourly&key=${MET_OFFICE_API_KEY}`
		)
		.catch((err) => {
			console.log(err);
		});
	return response.data;
};

getWeather().then((data) => {
	console.log(data);
});
