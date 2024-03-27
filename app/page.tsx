"use client"
import { Card, CardHeader, CardBody, Image, Input } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function Home() {
	const [users, setUsers] = useState([]);
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/data.json');
			const data = await res.json();
			setUsers(data);
			setData(data);
		};

		fetchData();
	}, []);

	let timeout: NodeJS.Timeout | null = null;
	const handleSearch = (search: any) => {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			filterUsers(search);
		}, 300); // 300 milliseconds debounce time
	};

	const filterUsers = (filter: any) => {
		const filteredUsers = data.filter((user: any) => {
			return (
				user.body_part.toLowerCase().includes(filter.toLowerCase()) ||
				user.equipment.toLowerCase().includes(filter.toLowerCase()) ||
				user.name.toLowerCase().includes(filter.toLowerCase()) ||
				user.target.toLowerCase().includes(filter.toLowerCase())
			);
		});
		setUsers(filteredUsers);
	};

	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10" >
			<Input type="search" label="Search" onChange={(e) => handleSearch(e.target.value)} />
			{
				users.map((u: any, i) => (
					<Card className="py-4" key={i} style={{ maxWidth: 400, minHeight: 500 }}>
						<CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
							<h4 className="font-bold text-large text-wrap capitalize">{u?.name}</h4>
							<small className="text-default-500 capitalize">Equipment : {u?.equipment}</small>
							<small className="text-default-500 capitalize">Target : {u?.target}</small>
							<small className="text-default-500 capitalize">Body Part : {u?.body_part}</small>
						</CardHeader>
						<CardBody className="overflow-visible py-2">
							<Image
								alt="Card background"
								className="object-cover rounded-xl"
								src={`/exercise/${u?.image}`}
								width={370}
							/>
						</CardBody>
					</Card>
				))
			}
		</section>
	);
}
