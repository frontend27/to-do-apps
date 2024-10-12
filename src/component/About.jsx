import React, { useEffect} from "react";
import { useHistory } from 'react-router'
const About = ()=> {
    const history = useHistory();
    useEffect(()=>{
        let username = sessionStorage.getItem('username');
        if(username === '' || username === null){
            history.push("/login");
        }
    }, []);
    const logout = ()=>{
        setTimeout(() => {
            sessionStorage.removeItem('username')
        }, 1000);
        history.push("/login");
    }
    return (
        <div>
             <button onClick={logout}>Logout</button>
            About me
        </div>
    )
}

export default About;