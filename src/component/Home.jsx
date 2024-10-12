import { useState } from "react";
import ListUser from "./ListUser";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
    const baseUrl = 'http://localhost:5000/User';
    const [newUser, setNewuser] = useState([]);
    const [activeIndex, setActiveIndex]=useState(null)
    const [userlist, setuserlist] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });
  

    useEffect(() => {
        getAllUser();
    }, [])

    const getAllUser = async () => {
        await axios.get(`${baseUrl}`).then((response) => setNewuser(response.data))
            .catch((error) => console.log(error))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setuserlist({
            ...userlist,
            [name]: value
        })
    }
    const removeuser = async (id) => {
        if (window.confirm()) {
            await axios.delete(`${baseUrl}/${id}`).then((response) => response.filter((item) => item.id !== id))
                .catch(err => console.log(err));
            getAllUser();
        }
    }
    const onEdituser = async (id) => {
        if (id) {
            await axios.get(`${baseUrl}/${id}`).then((response) => {
                setuserlist(response.data); setActiveIndex(id === activeIndex ? null : id);
            }).catch(error => console.log(error))
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userlist.id) {
            await axios.put(`${baseUrl}/${userlist.id}`, userlist).then((response)=> {
                setuserlist(response.data);
                getAllUser();
                setActiveIndex(null);
            })
            .catch(error=> console.log(error));
        } else {
            await axios.post(`${baseUrl}`, userlist).then((response) => {
                setuserlist(response.data);
                getAllUser();
            })
                .catch((err) => console.log(err))
        }

        setuserlist({
            name: '',
            email: '',
            phone: '',
            address: '',
            password: ''
        })

    }


    return (
        <div className="container mt-3">
            <h3>To Do Apps</h3>

            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control" name="name" value={userlist.name} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input className="form-control" name="email" value={userlist.email} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input className="form-control" name="phone" value={userlist.phone} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Address</label>
                            <input className="form-control" name="address" value={userlist.address} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input className="form-control" name="password" type="password" value={userlist.password} onChange={handleChange} />
                        </div>
                        <button className="btn btn-primary mt-2">To Do</button>
                    </form>
                </div>
                <div className="col-md-6">
                    <ListUser user={newUser} onDelete={removeuser} editForm={onEdituser} active={activeIndex} />
                </div>
            </div>
        </div>
    )
}

export default Home;