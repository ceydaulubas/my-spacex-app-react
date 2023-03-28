import React from "react";

const Pagination = ({ postsPerPage, filteredLaunches, paginate, currentPage }) => {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredLaunches.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="flex justify-center my-8">
            <ul className="flex border border-gray-300 rounded-md divide-x divide-gray-300">
                {pageNumbers.map((number) => (
                    <li key={number} className={`px-3 py-2 hover:bg-gray-200 ${currentPage === number ? 'bg-gray-200' : ''}`}>
                        <a
                            href="#"
                            className="text-gray-500 hover:text-gray-700"
                            onClick={() => paginate(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;
