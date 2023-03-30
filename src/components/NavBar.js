import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SiSpacex } from "react-icons/si";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="bg-black sm:flex sm:justify-between sm:items-center sm:px-20 sm:py-0">
            <div className="flex items-center justify-between px-4 py-2 sm:p-0">
                <div>
                    <Link to="/">
                        <SiSpacex className="text-8xl text-white" />
                    </Link>
                </div>
                <div className="sm:hidden">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        type="button"
                        className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                    >
                        <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M18 7.41L16.59 6L12 10.59L7.41 6L6 7.41L10.59 12L6 16.59L7.41 18L12 13.41L16.59 18L18 16.59L13.41 12L18 7.41Z"
                                />
                            ) : (
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            <nav className={`sm:flex ${isOpen ? "block" : "hidden"}`}>
                <Link
                    to="/launches"
                    className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-700 sm:ml-2"
                    onClick={() => setIsOpen(false)}
                >
                    Launches
                </Link>
                <Link
                    to="/crew"
                    className="block px-2 py-1 text-white font-semibold rounded hover:bg-gray-700 sm:ml-2"
                    onClick={() => setIsOpen(false)}
                >
                    Crew
                </Link>

            </nav>
        </header>
    );
};

export default Navbar;
