
import { useState , UseContext, useContext, useEffect } from 'react';
import './profile.css';
import Header from '../../components/Header';
import Title from '../../components/Title';
import User from '../../images/user.png'

import { AuthContext } from '../../Contexts/auth';

import { FiSettings , FiUpload , FiLogOut , UploadImage , porgessPorcent , imgURL } from 'react-icons/fi';
import { toast } from 'react-toastify';

export default () => {

    const { user , SignOut , updateName , UploadImage , porgessPorcent , imgURL , uploadUserData, setImgURL } = useContext(AuthContext);

    const [name , setName] = useState(user && user.name);
    const [email , setEmail] = useState(user && user.email);
    const [imageAvatar , setImageAvatar] = useState(null);

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                setImageAvatar(image);
                setImgURL(URL.createObjectURL(e.target.files[0]));
            } else {
                toast.error("Upload png or jpeg image!");
                setImageAvatar(null);
                return null;
            }
        }
    }

    function handleSave(e) {
        e.preventDefault();
        if (name !== null && name !== "") {
            if (name === user.name) {
                toast.error("This is already your name !");
            } else {
                updateName(name);
                setName(name);
            }
        }
        if (imgURL !== null) {
            if (imageAvatar === user.avatarURL) {
                toast.error("This is already your profile´s photo !");
            } else {
                UploadImage(user.uid, imageAvatar);
            }
        }
    }
    
    return(
        <div className='profile'>
            <Header />
            
            <div className='content'>
                <Title name="My Profile">
                    <FiSettings />
                </Title>

                <div className="container">
                    <form className="form-profile" onSubmit={handleSave}>
                        <label className="label-avatar">
                            {porgessPorcent === null ? <FiUpload /> : <p>{porgessPorcent}%</p>}

                            <input type="file" accept="image/*" onChange={handleFile}/> <br />

                            {imgURL === null ? <img src={User} alt="user"/> : <img src={imgURL} alt="user"/>}
                        </label> <br />

                        <label className='label' htmlFor='name'>Name</label> <br />
                        <input id='name' type="text" value={name === "UNKNOWN" ? "" : name} onChange={(e) => setName(e.target.value)} placeholder="UNKNOWN" required/> <br />

                        <label className='label' htmlFor='email'>E-mail</label> <br />
                        <input id='email' type="text" value={email} disabled={true} /> <br />

                        <button type="submit">Upload</button>
                    </form>
                </div>

                <button onClick={SignOut}><FiLogOut /> LogOut</button>
            </div>
        </div>
    )
}