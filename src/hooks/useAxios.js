// import axios from 'axios';
// import { useState, useEffect } from "react"

// export default function useAxios(url) {
//     const [data, setData] = useState(null)

//     useEffect(() => {
//         async function getData() {
//             try {
//                 const res = await axios.get(url);
//                 const data = await res.json()
//                 setData(data)
//             } catch (e) {
//                 return e;
//             }
//         }
//         getData();
//     }, [url]);

//     return [data]
// }



import { useState, useEffect } from "react";
const useFetch = (url, initialData) => {
    const [data, setData] = useState(initialData);
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.log(err));
    }, [url]);
    if (!data) {
        return null
    } else {
        return { data };
    }

};
export default useFetch;
