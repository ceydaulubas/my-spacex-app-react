import { Link } from "react-router-dom"

const Error = () => {
    return (
        <>
            <section className="flex flex-col items-center justify-center text-center h-screen bg-red-500">
                <h1>Error | The requested resource could not be found</h1>
                <Link to="/" className="btn font-bold">
                    &larr; Back to Homepage
                </Link>
            </section>
        </>
    )
}

export default Error;