import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import {authenticate, isAuth} from './helpers'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '../core/Layout';
// import { render } from 'react-dom'

const Signin = ({history}) => {

//On déclare une variable d'état local (ou le State), que l'on appellera "values" ou useState
const [values, setValues] = useState({
    email:"aymardmb@gmail.com",
    password:"amparo",
    buttonText:"Envoyer"
 });

 //destructuring des valeurs du State
 const{email, password,buttonText} = values;

 const handleChange = (email) => (event) => {
    console.log(event.target.value);
    setValues({...values,[email]:event.target.value})
 }

 const clickSubmit = event => {
    event.preventDefault()
    setValues({...values, buttonText:' Données envoyées'})
    //On configure Axios pour faire une requête POST au serveur via le formulaire de connexion
    axios({
        method: 'POST',
        url:`${process.env.REACT_APP_API}/signin`,
        data:{email, password}
    })
    .then(response => {
        console.log('SIGNIN SUCCES', response);

        //Dans le cas ou la requête s'avère positive.ON sauvegarde le token de l'utilisateur dabord dans le localstorage(moins sécure) puis dans les cookie(plus sécure)
        authenticate(response, () => {
            setValues({...values, email:"", password:"", buttonText:"Transmis"})
            // toast.success(`Bonjour ${response.data.user.name}.Bienvenue sur E-shop`);
            isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private')
        })


    })
    .catch(error => {
        console.log('SIGNIN ERROR', error.response)
        setValues({...values,buttonText:"Soumis"})
        toast.error(error)
    })
 };


 const signinForm = () => (

    <form>
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} value={email}type="texte" className="form-control"/>
        </div>
        <div className="form-group">
            <label className="text-muted">password</label>
            <input onChange={handleChange('password')} value={password} type="texte" className="form-control"/>
        </div>
        <div className="form-group">
            <button className="btn btn-primary" onClick={clickSubmit}>{buttonText}</button>
        </div>
    </form>
    )
    return(
        <Layout>
        {JSON.stringify(isAuth())}
        <div className="col-md-6 offset-md-3">
            <ToastContainer/>
            {isAuth()? <Redirect to="/" /> : null}
            {JSON.stringify({email,password})}
            <h1 className="p-5 text-center">Signin</h1>
            {signinForm()}
            </div>
        </Layout>
    )
}

export default Signin;
