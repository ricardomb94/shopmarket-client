import React, {useState, useEffect} from 'react'

//Checkbox accept la props categories. Ce qui nous permettra de transférer les données (liste des catégories) du composant parent au composant enfant checkbox
const Checkbox = ({categories}) => {
    const [checked, setChecked]= useState([])
    
    const handleToggle = c => () => {
    //La methode indexOf renvoie le premier élt du tableau cat appelé ds le state sinon il renvoie -1(ce qui signifie que la catégorie n'existe pas dans le state)
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
        //Si la catégorie n'existe pas encore on fait un push dans le tableau ou le state. Au cas contraire on l'enlève
        if (currentCategoryId === -1){
            newCheckedCategoryId.push(c)
        }else{
            newCheckedCategoryId.slice(currentCategoryId)
        }
        console.log(newCheckedCategoryId)
        //On update le state
        setChecked(newCheckedCategoryId)
    }
    
    return categories.map((c, i) => (
        <li key={i} className="list-unstyled">
            <input 
                onChange={handleToggle(c._id)} 
                value={checked.indexOf(c._id === -1)} 
                type="checkbox" 
                className="form-check-input"/>
            <label className="form-check-label">{c.name}</label>
        </li>
    ))
}

export default Checkbox;