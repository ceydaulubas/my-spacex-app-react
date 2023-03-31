import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const CrewSlider = ({ crews }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Slider className="max-w-screen-lg mx-auto" {...settings}>
            {crews.map((crew) => (
                <Link to={`/crew/${crew.id}`} key={crew.id} className="px-2" >
                    <div  >
                        <img
                            src={crew.image}
                            alt={crew.name}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                        <h3 className="text-center text-white font-bold my-2">{crew.name}</h3>
                        <p className="text-center text-white">Agency: <b>{crew.agency}</b></p>
                    </div>
                </Link>
            ))}
        </Slider>
    );
};

export default CrewSlider;
