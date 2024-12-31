import { createContext , useEffect, useState } from "react";
import { app } from '../services/firebaseConection';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

import { toast } from "react-toastify";

import { doc, getFirestore , setDoc , collection, addDoc, updateDoc, getDoc } from "firebase/firestore";
import { getDownloadURL, getStorage , ref, uploadBytesResumable } from 'firebase/storage';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {

    const database = getFirestore(app);
    const storage = getStorage(app);

    useEffect(() => {
        const loadStoreAuth = async () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUSer = sessionStorage.getItem("@AuthFirebase:user");
            if (sessionToken && sessionUSer) {
                setUser("null");
            }
        };

        loadStoreAuth();
    }, []);

    

    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [porgessPorcent ,  setPorgessPorcent] = useState(null);
    const [imgURL, setImgURL] = useState("");

    const SignInWithEmail = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
        .then( async (userCredential) => {
            const user = userCredential.user;
            sessionStorage.setItem("@AuthFirebase:token", user.accessToken);
            sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));

            let userCollection = collection(database, "users");
            const userProfile = await getDoc(doc(userCollection, user.uid));
            
            let data = {
                uid: user.uid,
                name: userProfile.data().name,
                avatarURL: userProfile.data().avatarURL,
                email: user.email
            }

            localStorage.setItem("@AuthFIrebase:data", JSON.stringify(data));
            setUser(data);
            setImgURL(data.avatarURL);
            toast.success("Welcome!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
        })
    };

    const SignUpWithEmail = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            let uid = user.uid;
            let name = user.displayName;
            let data = collection(database, "users");

            await setDoc(doc(data,uid) , {
                name: "UNKNOWN",
                avatarURL: null,
            })

            toast.success("User registered!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
        }) 
    }

    const updateName = async (name) => {
        let data = collection(database, "users");

        await updateDoc(doc(data,user.uid) , {
            name: name,
        })
        .then(() => {
            toast.success("Name upLoaded!")
        })
        .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage.split("(")[1].split(")")[0].replace("auth/","Error :  ").replaceAll("-"," "));
        });
    }

    const UploadImage = async (uid , file) => {
        if (!file) return;

        const storageRef = ref(storage, `images/${uid}/userImage`);
        const UploadTask = uploadBytesResumable(storageRef, file);

        UploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setPorgessPorcent(progress);
            },
            (error) => {
                toast.error("Error Uploading Image!");
            },
            () => {
                getDownloadURL(UploadTask.snapshot.ref)
                .then(async (dowloadURL) => {
                    setPorgessPorcent(null)
                    setImgURL(dowloadURL);
                    let colection = collection(database, "users");
                    await updateDoc(doc(colection, user.uid) , {
                        avatarURL: dowloadURL,
                    })
                });
                toast.success("Image upLoaded!");
            }
        );
    }

    const uploadUserData = async (name) => {
        let data = {
            uid: user.uid,
            name: name,
            avatarURL: imgURL,
            email: user.email
        }
        setUser(data);
        localStorage.setItem("@AuthFIrebase:data", JSON.stringify(data));
    }

    function SignOut() {
        signOut(auth);
        sessionStorage.clear();
        setUser(null);
        toast.success("logged out")
        localStorage.clear()
        return <Navigate to="/" />;
    }

    async function loadUSer() {
        let user = JSON.parse(localStorage.getItem("@AuthFIrebase:data"));
        setUser(user);
        setImgURL(user.avatarURL)
    }

    return(
        <AuthContext.Provider value={{signed: !!user , SignInWithEmail, SignUpWithEmail, SignOut, user, loadUSer , updateName , UploadImage , porgessPorcent , imgURL , setImgURL, uploadUserData}}>
            {children}
        </AuthContext.Provider>
    )
}