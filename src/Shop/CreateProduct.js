import {getCookie} from '../auth/helpers';
import axios from "axios";

 
 const token = getCookie('token');
  
  
const CreateProduct = (_id, token,product) => {
        return (
                
                axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_API}/product/create/${_id}`,
                    headers: {
                      Accept: "application/json",
                      Authorization:`Bearer ${token}`
                    },data:{product}
                })
                .then(response => {
                    console.log('ADD CATEGORY RESP.', response);
                })
                .catch(error => {
                    console.log('ADD CATEGORY ERROR', error) 
                })
        )}
        

export default  CreateProduct     
