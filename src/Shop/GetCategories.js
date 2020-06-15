

//Afficher les catégories enregistrées dans la BBD

const GetCategories = () => {
    return fetch(`${process.env.REACT_APP_API}/categories`,{
        method: 'GET'
    })
    .then(response => {
       return response.json();
    })
    .catch(err => console.log(err));
};

export default GetCategories;