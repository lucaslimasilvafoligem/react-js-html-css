
import { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../Contexts/auth';
import Avatar from '../../images/user.png';

//icons
import { FiHome , FiUser , FiSettings } from "react-icons/fi";
import { Link } from 'react-router-dom';

export default () => {
    const { user , loadUSer , imgURL } = useContext(AuthContext);

    if (user === "null") {
        loadUSer();
    }

    return(
        <div className='sidebar'>
            <div className='img'>
                <div>
                    <img src={imgURL === null ? Avatar : imgURL} alt="Avatar image" />
                </div>
            </div>

            <Link to="/dashboard">
                <FiHome />
                Chamados
            </Link>

            <Link to="/profile">
                <FiSettings />
                Settings
            </Link>

        </div>
    )
}