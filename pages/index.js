import { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Logo from "../public/Logo.png";

//getserverside data
export async function getServerSideProps({ req, res }) {
	//get location environment variable
	const location = process.env.LOCATION;
	const API_KEY = process.env.API_KEY;
	const MET_OFFICE_API_KEY = process.env.METOFFICE_KEY;
	//create a new request to get the data from the API using location and API_KEY
	const response = await axios.get(
		`https://api.openweathermap.org/data/2.5/weather?id=${location}&appid=${API_KEY}`
	);
	//return the data from the API
	return {
		props: {
			data: response.data,
		},
	};
}

const Index = ({ data }) => {
	var temperature = 20;
	const weather = useRef(null);
	const menu = useRef(null);
	const news = useRef(null);
	const logo = useRef(null);
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico?v=2" />
			</Head>
			<div className="bg-bethany-blue content-center w-full min-h-screen max-h-max md:h-screen md:w-screen gap-10 p-4 grid grid-cols-3 grid-rows-3">
				<div className="p-3">
					<Image
						src={Logo}
						alt="Bethany School Logo"
						layout="responsive"
						width="100%"
						height="55%"
						objectFit="contain"
					/>
				</div>
				<div className="bg-red-500 col-span-2 row-span-2"></div>
				<Weather />
				<div className="bg-red-500 col-span-2"></div>
			</div>
		</>
	);
};

export default Index;

const Weather = (props) => {
	return <div className="bg-red-100 row-span-2"></div>;
};
