import React, {useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

const UserView = ()=> {
    const { id } = useParams();

    const [user, setUser ] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(()=> {
        getData()
    }, [])


    const getData = async()=> {
        const response = await axios.get(`http://localhost:3000/user/${id}`);

        setUser(response.data)
    }

    return (
        <div className="container">
            <ul>
            {user.name  ? <li>{user.name}</li> : null}
               
               <li>{user.email}</li>
               <li>{user.phone}</li>
               <li>{user.address}</li>
            </ul>
        </div>
    )
}

export default UserView;