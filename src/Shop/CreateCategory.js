import {isAuth} from '../auth/helpers';
import axios from "axios";

// const token = localStorage.getItem("token");

 const CreateCategory = (user,token, category) => {
        return (
                
                axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_API}/category/create/${isAuth()._id}`,
                    headers: {
                      Accept: "application/json",
                      Authorization:`Bearer  ${token}`
                    },data:{category},
                })
                .then(response => {
                    console.log('ADD CATEGORY RESP.', response);
                })
                .catch(error => {
                    console.log('ADD CATEGORY ERROR', error) 
                })
        )}
        
        
        
        
        
        
// export const CreateCategory = (userId, token, category) => {
// // console.log('USERID',userId)
//     return (fetch(`${process.env.REACT_APP_API}/category/create/${userId}`,{
//         method: "POST",
//         headers:{
//             accept:"application/json",
//             "Content-Type": "application/json",
//             Authorization:`Bearer  ${token}`
//         },
//         body: JSON.stringify(category)
    
//     }).then(response => {
//         return response.json()
//     }).catch(err => {
//         console.log(err);
//     })
// )}
   
    
   


export default  CreateCategory      
