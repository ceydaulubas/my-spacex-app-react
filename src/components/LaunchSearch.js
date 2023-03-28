import { useState } from "react";
import { parseISO, isBefore, isAfter } from "date-fns";

const LaunchSearch = ({ searchTerm, setSearchTerm, setStartDate, setEndDate, launches, startDate, endDate }) => {
    const [filteredLaunches, setFilteredLaunches] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setStartDate("");
        setEndDate("");
        setFilteredLaunches(
            launches.filter(({ date_utc }) => {
                const launchDate = parseISO(date_utc);
                const start = startDate ? parseISO(startDate) : null;
                const end = endDate ? parseISO(endDate) : null;
                return (
                    (!start || isAfter(launchDate, start)) && (!end || isBefore(launchDate, end))
                );
            })
        );
    };

    return (
        <form onSubmit={handleSubmit} className="flex justify-center mt-10">
            <div className="flex items-center">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by mission name"
                    className="border border-gray-400 rounded py-1 px-2 mr-2"
                />
                <label htmlFor="startDate" className="mr-2">
                    Start date:
                </label>
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="border border-gray-400 rounded py-1 px-2 mr-2"
                />
                <label htmlFor="endDate" className="mr-2">
                    End date:
                </label>
                <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="border border-gray-400 rounded py-1 px-2"
                />
                <button type="submit" className="ml-2 bg-gray-800 text-white py-1 px-3 rounded">
                    Clear 2 date range
                </button>
            </div>
        </form>
    );
};

export default LaunchSearch;
