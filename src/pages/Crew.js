import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Spinner, Error } from "../components";
import CrewSlider from "../components/CrewSlider";

const Crew = () => {
    const { data, isLoading, error } = useFetch(
        "https://api.spacexdata.com/v4/crew"
    );

    const [crews, setCrews] = useState([]);

    useEffect(() => {
        if (data) {
            setCrews(data);
        }
    }, [data]);

    if (isLoading) {
        return <Spinner />;
    }

    if (error) {
        console.log("Error:", error.message);
        return <Error />;
    }

    return (
        <div>
            <CrewSlider crews={crews} />
        </div>
    );
};

export default Crew;
