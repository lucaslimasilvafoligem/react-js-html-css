import '../SignIn/login.css';

import User from '../../images/user.png';
import { useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/auth';

export default () => {

    // Using context starts
    const { SignUpWithEmail } = useContext(AuthContext);

    async function createLoginEmail() {
        await SignUpWithEmail(email, password);
    }
    // Using context ends

    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");

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
                    <button onClick={createLoginEmail}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}