/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { createRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

var dataSetLength = 0;

function Posts() {
	const [locQuery, setLocQuery] = useState("");
	const { status, data, error, isFetching, refetch } = useQuery(
		["posts"],
		async () => {
			const { data } = await axios.post("/api/locations", {
				where: { name: { contains: locQuery } },
				orderBy: {
					name: "asc",
				},
			});
			dataSetLength = data.length;
			data.forEach((element) => {
				element.ref = createRef(null);
			});
			return data;
		}
	);

	const activateLocation = async (location) => {
		data.forEach((element) => {
			if (element.ref !== location.ref) {
				element.ref.current.checked = false;
				element.ref.current.disabled = false;
			}
		});
		await axios.post("/api/updateCurrentLocation?id=" + location.id);
		refetch();
		return location.id;
	};
	return (
		<div className="flex">
			<div className="w-1/3 fixed border-black border p-4 ml-1 mt-1">
				<h1 className="font-bold text-xl underline">Locations</h1>
				<h1>Status : {status}</h1>
				<h1>Found Entries: {dataSetLength}</h1>
				<h2>
					<input
						type="text"
						onChange={(event) => {
							setLocQuery(event.target.value);
							refetch();
						}}
						value={locQuery}
						className="border border-black"
						placeholder="Search..."
						onBlur={() => {
							refetch();
						}}
					/>
				</h2>
				<div className="border-black border p-2 mt-1">
					<h5 className="text-sm">
						If no locations are showing up. Try indexing locations from the met
						office database.
					</h5>
					<h6 className="text-xs pt-1">
						It may take a while for all the entries to populate into the
						database
					</h6>
					<button
						className="border border-black p-1"
						onClick={() => {
							axios.post("/api/indexLocations");
						}}
					>
						Index Locations
					</button>
				</div>
			</div>
			<span className="w-1/3" />
			<div className="w-2/3 ml-4 justify-self-end">
				{status === "loading" ? (
					"Loading..."
				) : status === "error" ? (
					<span>Error: {error.message}</span>
				) : (
					<>
						<table className="table-aut border-collapse w-max">
							<thead className="bg-gray-400">
								<tr className="text-center">
									<th>active</th>
									<th>id</th>
									<th>name</th>
								</tr>
							</thead>
							<tbody>
								{data.map((post) => (
									<tr key={post.id}>
										<td>
											<input
												type="checkbox"
												ref={post.ref}
												defaultChecked={post.active}
												disabled={post.active}
												onChange={() => {
													if (post.ref.current.checked) {
														post.ref.current.disabled = true;
													}
													activateLocation(post);
												}}
											/>
										</td>
										<td>{post.id}</td>
										<td>{post.name}</td>
									</tr>
								))}
							</tbody>
						</table>
						<div>{isFetching ? "Background Updating..." : " "}</div>
					</>
				)}
			</div>
		</div>
	);
}

export default Posts;
