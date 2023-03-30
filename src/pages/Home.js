import { useState, useEffect } from "react"
import { Spinner, Error } from "../components"
import useFetch from "../hooks/useFetch";
import backgroundImage from "../spacex_starship_hls_artemis_iii_2_crew_0.jpg";
import { FaGlobe, FaTwitter, FaFlickr, FaLongArrowAltDown } from "react-icons/fa";

const Home = () => {
    const [company, setCompany] = useState([])
    const [scale, setScale] = useState(1);

    const { data, isLoading, error } = useFetch(
        "https://api.spacexdata.com/v4/company"
    );

    useEffect(() => {
        if (data) {
            setCompany(data);
        }
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            setScale((prevScale) => (prevScale === 1 ? 1.5 : 1));
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return <Spinner />
    }

    if (error) {
        return (
            <>
                <Error />
                <p>Error: {error.message}</p>
            </>
        )
    }

    return (
        <>
            {data && (
                <div>
                    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
                        <div className="flex h-screen items-start px-8 py-40 flex-col">
                            <div className="sm:text-2xl font-semibold text-white text-center w-3/4 lg:w-1/2 leading-tight">{company.summary}</div>
                            <div className="relative h-screen">
                                <div className="absolute bottom-0 left-0 right-0 mx-auto text-center">
                                    <div
                                        className={`relative inline-block transition-transform duration-500 ease-in-out transform hover:scale-125`}
                                        style={{ transform: `scale(${scale})` }}
                                    >
                                        <FaLongArrowAltDown className="h-16 w-16 text-white" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-4xl mx-auto px-4 py-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-white p-2 rounded-lg shadow-lg">
                                    <div className="text-2xl font-semibold">{company.founder}</div>
                                    <div className="text-gray-600">Founder</div>
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-lg">
                                    <div className="text-2xl font-semibold">{company.founded}</div>
                                    <div className="text-gray-600">Founded</div>
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-lg">
                                    <div className="text-2xl font-semibold">{company.employees}</div>
                                    <div className="text-gray-600">Employees</div>
                                </div>
                                <div className="bg-white p-2 rounded-lg shadow-lg">
                                    <div className="text-2xl font-semibold">{company.vehicles}</div>
                                    <div className="text-gray-600">Vehicles</div>
                                </div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <a href={company.links?.website} target="_blank" rel="noopener noreferrer"><FaGlobe className="h-8 mx-2 text-white lg:text-2xl" /></a>
                                <a href={company.links?.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter className="h-8 mx-2 text-white lg:text-2xl" /></a>
                                <a href={company.links?.flickr} target="_blank" rel="noopener noreferrer"><FaFlickr className="h-8 mx-2 text-white lg:text-2xl" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )
}

export default Home;