import axios from "axios";
import React, {useState, useEffect} from "react";
import { useHistory, useParams } from "react-router";


const Users = ()=> {
    const history = useHistory();
    const { id } = useParams();
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    })
    useEffect(()=> {
        loadingData();
    })
    const {name, email, phone, address} = user;
    const onInputChange = (e)=> {
        setUser({
            ...user, [e.target.name]: e.target.value
        })
    }
 
    const loadingData = async()=> {
        const response = await axios.get(`http://localhost:3000/user/${id}`);
        setUser(response.data)
    }

    const onSubmit = async(e)=> {
        e.preventDefault();

        if(user.id){
            await axios.put(`http://localhost:3000/user/${id}`, user);
        }else{
            await axios.post("http://localhost:3000/user", user);
        }

       
        history.push('/')

    }


    return (
        <div className="container">
             <p className="mb-3">User Form</p>
           <form onSubmit={e => onSubmit(e)}>
                <div className="row">
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                             <label>Name</label>
                             <input type="text" className="form-control" name="name" value={name}   required
                             onChange={e => onInputChange(e)} />
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                             <label>Email</label>
                             <input type="text" className="form-control" name="email" value={email}  required 
                             onChange={e => onInputChange(e)}/>
                        </div>
                    </div>
                    <div className="col-md-4 mb-2">
                        <div className="form-group">
                             <label>Phone</label>
                             <input type="number" className="form-control" name="phone" value={phone}  required
                             onChange={e => onInputChange(e)} />
                        </div>
                    </div>
                    <div className="col-md-12 mb-2">
                        <div className="form-group">
                             <label>Address</label>
                             <textarea type="text" className="form-control" name="address" value={address}  required
                             onChange={e => onInputChange(e)} />
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

export default Users;