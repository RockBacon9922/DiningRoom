import { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";
import Logo from "../public/Logo.png";
import { useQuery } from "@tanstack/react-query";
const apiKey = process.env.MET_OFFICE_KEY;

const getLocation = async () => {
	const location = await axios.get("/api/currentLocation");
	return location.data;
};
const location = getLocation();
const url =
	"http://datapoint.metoffice.gov.uk/public/data/val/wxfcs/all/xml/" +
	location +
	"?res=daily&key=" +
	process.env.MET_OFFICE_KEY;

const getWeather = () => {
	console.log(url);
};

const Index = () => {
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
						height="55
						%"
						objectFit="contain"
						priority={true}
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
	getWeather();
	return <div className="bg-red-100 row-span-2"></div>;
};
