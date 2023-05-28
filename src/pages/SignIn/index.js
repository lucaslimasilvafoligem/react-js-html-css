import { Link, Navigate } from 'react-router-dom';
import './login.css';

import User from '../../images/user.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/auth';

export default () => {

    // Using context starts
    const { user , SignInWithEmail , signed } = useContext(AuthContext);

    async function LoginEmail() {
        await SignInWithEmail(email, password);
    }
    // Using context ends


    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

    if (!signed) {
        return(
            <div className="logIn">
                <div> 
                    <div className='logo'>
                        <img src={User} alt="user icon" />
                    </div>
    
                    <div className='log'>
                        <h1>Callings</h1>
                        <label htmlFor='email'>E-mail</label> <br />
                        <input type="text" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your E-mail Adress" /><br />
                        <label htmlFor='Password'>Password</label><br />
                        <input type="password" id='Password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your Password" /> <br />
                        <button onClick={LoginEmail}>Log In</button>
                    </div>
    
                    <div className='create'>
                        <Link className='link' to="/signup">Create an Acount</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Navigate to="/dashboard" />
    }
    
}