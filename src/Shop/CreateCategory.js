import {isAuth, getCookie} from '../auth/helpers';
import axios from "axios";

  const checkAuth = isAuth();
  const token = getCookie('token');
  console.log(token)
  
 const CreateCategory = (_id, token,category) => {
 console.log(category)
        return (
                
                axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_API}/category/create`,
                    headers: {
                      Accept: "application/json",
                      Authorization:`Bearer ${token}`
                    },data:{'category': 'namaaaa'}
                })
                .then(response => {
                    console.log('ADD CATEGORY RESP.', response);
                })
                .catch(error => {
                    console.log('ADD CATEGORY ERROR', error) 
                })
        )}
        

export default  CreateCategory      
