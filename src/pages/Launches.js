import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import LaunchSearch from "../components/LaunchSearch";

const Launches = () => {
    const { data, isLoading, error } = useFetch(
        "https://api.spacexdata.com/v4/launches"
    );
    const [launches, setLaunches] = useState([]);
    const [filteredLaunches, setFilteredLaunches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        if (data) {
            setLaunches(data);
            setFilteredLaunches(data);
        }
    }, [data]);

    useEffect(() => {
        let filtered = launches;
        if (searchTerm) {
            filtered = filtered.filter((launch) =>
                launch.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (startDate && endDate) {
            filtered = filtered.filter(
                (launch) =>
                    new Date(launch.date_utc) >= new Date(startDate) &&
                    new Date(launch.date_utc) <= new Date(endDate)
            );
        }
        setFilteredLaunches(filtered);
    }, [launches, searchTerm, startDate, endDate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <section className="py-32 max-width">
                <h1 className="heading text-center mb-10">Launches</h1>
                <LaunchSearch
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                    launches={launches}
                    startDate={startDate}
                    endDate={endDate}
                />

                <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
                    {filteredLaunches.map(({ id, name, links, details }) => (
                        <Link to={`/launches/${id}`} key={id} className="p-5 bg-black">
                            {links.patch.large ? (
                                <img src={links.patch.large} alt={name} />
                            ) : (
                                <img
                                    src="https://images2.imgbox.com/40/e3/GypSkayF_o.png"
                                    alt=""
                                />
                            )}
                            <h2 className="font-bold text-white mt-5 mb-3 text-xl">
                                {name}
                            </h2>
                            {details && (
                                <p className="text-white opacity-75">{`${details.substring(
                                    0,
                                    50
                                )}...`}</p>
                            )}
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Launches;
