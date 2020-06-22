import React, {useState, useEffect} from 'react'

//Checkbox accept la props categories. Ce qui nous permettra de transférer les données (liste des catégories) du composant parent au composant enfant checkbox
const Checkbox = ({categories}) => {
    return categories.map((c, i) => {
        <li className="list-unstyled">
            <input type="checkbox" className="form-check-input"/>
            <label className="form-check-label">{c.name}</label>
        </li>
    })
}

export default Checkbox;