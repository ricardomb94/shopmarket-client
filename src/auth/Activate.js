import React, {useState, useEffect} from 'react';
// import {useParams} from "react-router-dom";
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Layout from '../core/Layout';
import * as jwt from 'jsonwebtoken'


const Activate = ({match}) => {

//On déclare une variable d'état local (ou le State), que l'on appellera "values" 
const [values, setValues] = useState({
    name:"",
    token:"",
    show:true,
    buttonText:""
 });
 
 useEffect(() => {
    let token = match.params.token
    let {name} = jwt.decode(token) ;  
    // console.log("message:"+ ""+ token);
    if(token){
        setValues({ ...values, name, token})
    }
 },[]);
 
 //destructuring des valeurs du State
 const{name, token} = values;

 const clickSubmit = event => {
    event.preventDefault()
    // setValues({...values,token, buttonText:'Données envoyées'})
    //On configure Axios pour se connecter à la base de donnée
    axios({
        method: 'POST',
        // url:`${process.env.REACT_APP_API}/auth/activate/${token}`,
        //data:{name, token, show}
        url:`${process.env.REACT_APP_API}/account-activation`,
        data:{token}
    })
    .then(response => {
        console.log('ACCOUNT ACTIVATION', response)
        setValues({ ...values, show:false});
        toast.success(response.data.message);
    })
    .catch(error => {
        console.log('ACCOUNT ACTIVATION ERROR', error.response.data.error);
       {/* setValues({...values,buttonText:"Submit"});*/}
        toast.error(error.response.data.error);
    })
 };

    const activationLink = () => (
        <div className="text-center">
           {/* <h1 className="p-2 text-center">Hey {name}, Vous y êtes presque.
    </h1>*/}
            <button className="btn btn-outline-primary" onClick={clickSubmit}>Activez votre compte</button>
        </div>
    )
 
    return(
        <Layout>
            <div className="col-md-6 offset-md-3">
            <ToastContainer/>
            <h4 className="p-3 text-center">Bonjour {name}</h4>
            {activationLink()}
            </div>
        </Layout>
    )
}

export default Activate;