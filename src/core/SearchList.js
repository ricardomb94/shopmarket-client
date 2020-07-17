import queryString from 'query-string' 

export const list = params => {
    const query = queryString.stringify(params)
    console.log('QUERY', query)
    return fetch(`${process.env.REACT_APP_API}/products?${query}`,{
        method: 'GET'
    })
        .then(response =>{
            return response.json();
        })
        .catch(err => console.log(err));
}