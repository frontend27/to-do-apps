import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
    const [userdata, setUserdata] = useState([])

    const userList = async () => {
        const response = await axios.get("http://localhost:3000/user");
        const result = await response.data;
        setUserdata(result)
    }
    useEffect(() => {
        userList();
    }, []);

    const deleteUser = async(id)=> {
        await axios.delete(`http://localhost:3000/user/${id}`);
        userList();
    }

    return (
        <div className="container">
            <div className="py-4">
            <Link className="btn btn-success mb-3" to="/user/add">Add</Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userdata.map((item, index)=> (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{ item.name }</td>
                                    <td>{ item.email }</td>
                                    <td>{ item.phone }</td>
                                    <td>{ item.address }</td>
                                    <td>
                                        <Link className="btn btn-primary" style={{marginRight: '2px'}} to={`/user/view/${item.id}`}>View</Link>
                                        <Link className="btn btn-primary" style={{marginRight: '2px'}} to={`/user/edit/${item.id}`}>Edit</Link>
                                        <button className="btn btn-primary" style={{marginRight: '2px'}} onClick={()=> deleteUser(item.id)} >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;