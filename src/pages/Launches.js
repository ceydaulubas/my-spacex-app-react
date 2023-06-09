import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { LaunchSearch, Pagination, Spinner, Error } from "../components";

const Launches = () => {
    const { data, isLoading, error } = useFetch(
        "https://api.spacexdata.com/v5/launches/"
    );
    const [launches, setLaunches] = useState([]);
    const [filteredLaunches, setFilteredLaunches] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(12);


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

    // Get current launch
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentLaunches = filteredLaunches.slice(
        indexOfFirstPost,
        indexOfLastPost
    );

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (isLoading) {
        <Spinner />

    }

    if (error) {
        <Error />
        console.log("Error:", error.message)
    }

    return (
        <>
            <section className="py-10 max-width">
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

                <div className="max-width-sm grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 px-5 mt-8">
                    {currentLaunches.map(({ id, name, links, details }) => (
                        <Link to={`/launches/${id}`} key={id} className="p-5 bg-slate-900">
                            {links.patch.small ? (
                                <img src={links.patch.small} alt={name} />
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
                                    100
                                )}...`}</p>
                            )}
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center flex-wrap max-w-full mt-10">
                    <Pagination postsPerPage={postsPerPage} filteredLaunches={filteredLaunches} paginate={paginate} currentPage={currentPage} />
                </div>
            </section>

        </>

    );
};

export default Launches;
