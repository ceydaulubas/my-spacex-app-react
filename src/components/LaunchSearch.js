import { useState } from "react";
import { parseISO, isBefore, isAfter } from "date-fns";

const LaunchSearch = ({ searchTerm, setSearchTerm, setStartDate, setEndDate, launches, startDate, endDate }) => {
    const [filteredLaunches, setFilteredLaunches] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setStartDate("");
        setEndDate("");
        setFilteredLaunches(
            launches.filter(({ date_utc, name }) => {
                const launchDate = parseISO(date_utc);
                const start = startDate ? parseISO(startDate) : null;
                const end = endDate ? parseISO(endDate) : null;
                return (
                    (!start || isAfter(launchDate, start)) && (!end || isBefore(launchDate, end)) &&
                    name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center justify-center mt-10">
            <div className="flex flex-col md:flex-row items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by mission name"
                    className="border border-gray-400 rounded py-1 px-2 mr-2 mb-2 md:mb-0 md:mr-0"
                />
                <label htmlFor="startDate" className="mr-2  text-white">
                    Start date:
                </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-400 rounded py-1 px-2 mr-2 mb-2 md:mb-0 md:mr-2"
                />
                <label htmlFor="endDate" className="mr-2  text-white">
                    End date:
                </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-400 rounded py-1 px-2 mb-2 md:mb-0"
                />
                <button type="submit" className="ml-2 bg-red-700 text-white py-1 px-3 rounded">
                    Clear 2 date range
                </button>
            </div>
        </form>

    );
};

export default LaunchSearch;
