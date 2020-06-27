// import axios from 'axios'

// const GetfilteredProducts = (skip, limit, filters ={}) => {
//     const data = {
//         skip,
//         limit,
//         filters
//     };
//     return (
//             axios({
//                 method: 'POST',
//                 url: `${process.env.REACT_APP_API}/products/by/search`,
//                 headers: {
//                     Accept: "application/json",
//                   },data:{data}
//             })
//             .then(response => {
//                 console.log('ADD CATEGORY RESP.', response);
//             })
//             .catch(error => {
//                 console.log('ADD CATEGORY ERROR', error)
//             })
//     )}



const GetfilteredProducts = (skip, limit, filters ={}) => {

    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${process.env.REACT_APP_API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => {
            console.log(error)
        });

};


    
    export default GetfilteredProducts