import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Spinner } from "../components"


const SingleCrew = () => {
    const [singleCrew, setSingleCrew] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        const fetchSingleCrew = async () => {
            const res = await fetch(`https://api.spacexdata.com/v4/crew/${id}`)
            const data = await res.json()
            setSingleCrew(data)
        }

        fetchSingleCrew()
    }, [id])

    return (
        <>
            {!singleCrew ? (
                <Spinner />
            ) : (
                <section className="py-32 max-width grid grid-cols-1 gap-10 md:grid-cols-2 ">
                    <article>
                        {singleCrew.image ? (
                            <img
                                src={singleCrew.image}
                                alt={singleCrew.name}
                            />
                        ) : (
                            <img
                                src="https://res.cloudinary.com/dxqyvjf5r/image/upload/v1680180672/blank-profile-picture-gebffe8b72_1280_dqblao.png"
                                alt=""
                            />
                        )}
                    </article>

                    <article>
                        <h1 className="heading">{singleCrew.name}</h1>
                        <h2 className="text-white  text-xl opacity-75 mt-2">
                            <b>Agency: </b> {singleCrew.agency}
                        </h2>

                        <h2 className="text-white font-bold text-xl opacity-75 mt-2">
                            Status:
                            {singleCrew.status === "active" ? (
                                <span className="text-emerald-500">Active</span>
                            ) : (
                                <span className="text-rose-500">Not Active</span>
                            )}
                        </h2>
                        <div className="flex justify-center">
                            <a href={singleCrew.wikipedia} className="border-2 border-blue-500 rounded-md bg-black text-white px-4 py-2">
                                More Info
                            </a>
                        </div>
                        <p>
                            <Link
                                to="/crew"
                                className="text-white opacity-75 text-sm hover:opacity-100"
                            >
                                &larr; Back
                            </Link>
                        </p>
                    </article>
                </section>
            )}
        </>
    )
}


export default SingleCrew;