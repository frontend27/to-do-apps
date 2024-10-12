import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useHistory } from 'react-router'

const Login =()=>{
  
    const [error, seterror]= useState({});
    const [valid, setValid] = useState(true);
    const [formdata, setformdata]= useState({
        email:'',
        password:''
    });
    const inputChange = (e)=>{
       setformdata({
        ...formdata,
        [e.target.name]:e.target.value
       })
    }
    const history = useHistory();
    useEffect(()=>{
        sessionStorage.clear()
    },[])
    const onSubmit =(e)=>{
        e.preventDefault();
       let invalid = true;
       let validator ={};
       if(formdata.email === "" || formdata.email === null ){
        invalid = false;
        validator.email = "Email is required"
       }else if(!/\S+@\S+\.\S+/.test(formdata.email)){
        invalid = false;
        validator.email="Email is not valid"
       }

       if(formdata.password === "" || formdata.password === null){
        invalid=false;
        validator.password = "Pasword is required"
       }else if(formdata.password.length < 6){
        invalid=false;
        validator.password = "Pasword is must be 6 char"
       }

     

       axios.get('http://localhost:3000/User').then(result=>{
            let logindata = result.data;
            logindata.map(user=>{
                if(user.email === formdata.email){
                    if(user.password === formdata.password){
                        sessionStorage.setItem('username', formdata.email);
                        setTimeout(()=>{
                            alert('Login Suceessfully');
                        },1000);
                        history.push("/about");

                    }else{
                        invalid=false;
                        validator.password="wrong password"
                    }
                }
            })
            seterror(validator);
            setValid(invalid);
       }).catch(err=>console.log(err))

    }
   
    return(
        <div className="container">
            {valid ? "": <span>
                {error.email} {error.password}
                </span>}
        <p className="mb-3">User Form</p>
      <form onSubmit={e => onSubmit(e)}>
           <div className="row">
               <div className="col-md-4 mb-2">
                   <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" name="email" required
                        onChange={(e)=>inputChange(e)} />
                   </div>
               </div>
               <div className="col-md-4 mb-2">
                   <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" required 
                        onChange={(e)=>inputChange(e)} />
                   </div>
               </div>
             
              

               <div className="col-md-12 text-right mb-2">
                   <button className="btn btn-primary">Save</button>
               </div>
           </div>
      </form>
   </div>
    )
}

export default Login;