import './dashboard.css';
import { useEffect, useState , useContext } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { app } from '../../services/firebaseConection';
import { collection, getFirestore , doc, getDocs } from 'firebase/firestore';
import { AuthContext } from '../../Contexts/auth';
import { toast } from 'react-toastify';
import format from 'date-fns/format';
import { FiXCircle } from 'react-icons/fi';

export default () => {
    const [calls , setCalls] = useState([]);
    const [loading , setLoading] = useState(true);
    const [show , setShow] = useState(false)
    const [info , setInfo] = useState([]);

    const database = getFirestore(app);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            loadCalls(user.uid)
        }
        
        return () => {

        }
    }, [user]);

    async function loadCalls(id) {
        if (id !== null && id !== undefined) {
            const callsRef = collection(database, "calls");
            const userCallsRef = doc(callsRef, id);
            const userCalls = collection(userCallsRef, "userCalls");
            const data = await getDocs(userCalls)
            .then((snapshot) => {
                if (snapshot.size > 0) {
                    let list = [];
                    snapshot.forEach((doc) => {
                        list.push(doc.data());
                    })
                    setCalls(list);
                }
            })
            .catch((error) => {
                toast.error("Error : Fail to load Call!")
                setLoading(false);
            })
            setLoading(false);
        }
    }

    function showCallInfo(index) {
        setShow(true);
        setInfo(calls[index]);
    } 

    if (loading) {
        return(
            <div>
                <Header />

                <div className="content">
                    <Title name="Calls">
                        <FiMessageSquare />
                    </Title>

                    
                    <div id='board' className="container dashboard">
                        <h2>Searching Calls...</h2>

                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {show === true ? (
                    <div className='div-info'>
                        <div className='box'>
                            <div className='info'>
                                <FiXCircle className='close' onClick={() => setShow(false)}/>
                                <p className='id'>Customer : {info.customerId}</p>
                                <h2>{info.customer}</h2>
                                <div className='status'>
                                    <p>Description : {info.description}</p>
                                    <p>Status : {<span className='badge' style={info.status === "Opened" ? {backgroundColor: '#5cb85c'} : (info.status === "Pending" ? {backgroundColor: 'red'} : {backgroundColor: '#777'})}>{info.status}</span>}</p>
                                </div>
                                <p className='problem'>problem : {info.problem}</p>
                                <p className='id'>user : {info.userId}</p>
                            </div>
                        </div>
                    </div>
                ) : (<></>)}
                <Header />
    
                <div className="content">
                    <Title name="Calls">
                        <FiMessageSquare />
                    </Title>
    
                    
                    <div id='board' className="container dashboard">
                        {calls.length === 0 ? (
                            <div>
                                <p>No call registered :(</p>
    
                                <Link to="/new">
                                    <FiPlus />
                                    Add Call
                                </Link>
                            </div>
                        ) : (
                            <div className='calls'>
                                <Link to="/new">
                                    <FiPlus />
                                    Add Call
                                </Link>
    
                                <table>
    
                                    <thead>
                                        <tr>
                                            <th scope='col'>Costumers</th>
                                            <th scope='col'>Description</th>
                                            <th scope='col'>Status</th>
                                            <th scope='col'>Add´s Date</th>
                                            <th scope='col'>#</th>
                                        </tr>
                                    </thead>
    
                                    <tbody>
                                        {calls.map((item, index) => {
                                            return(
                                                <tr>
                                                    <td data-label="client">
                                                        <div>{item.customer}</div>
                                                    </td>
                                                    <td data-label="description">
                                                        <div>{item.problem}</div>
                                                    </td>
                                                    <td data-label="status">
                                                        <div>
                                                            <span className='badge' style={item.status === "Opened" ? {backgroundColor: '#5cb85c'} : (item.status === "Pending" ? {backgroundColor: 'red'} : {backgroundColor: '#777'})}>{item.status}</span>
                                                        </div>
                                                     </td>
                                                     <td data-label="date">
                                                        <div>
                                                            {format(item.created.toDate(), "dd/MM/yyyy")}
                                                        </div>
                                                    </td>
                                                    <td data-label="#" className='buttons'>
                                                        <div>
                                                            <button className='action' style={{backgroundColor: '#3583f6'}} onClick={() => showCallInfo(index)}>
                                                                <FiSearch />
                                                            </button>
                                                            <button className='action' style={{backgroundColor: '#f6a935'}}>
                                                                <FiEdit2 />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
    
                                    </tbody>
    
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}