
import Header from '../../components/Header';
import Title from '../../components/Title';
import './new.css';

import { FiPlusCircle } from 'react-icons/fi';
import { useState , useEffect , useContext } from 'react';
import { AuthContext } from '../../Contexts/auth';

import { app } from '../../services/firebaseConection';
import { doc , collection, getDocs, getFirestore, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default () => {

    const [loading , setLoading] = useState(true);
    const [tarefas , setTarefas] = useState("");

    const [description , setDescription] = useState('');
    const [status , setStatus] = useState('Criada');
    const [data , setData] = useState(new Date(0,0,0));

    const database = getFirestore(app);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        setLoading(false);
    }, []);

    async function newCall(e) {
        e.preventDefault();
        //collection("collection").doc("documentId").collection("subcollection");
        const callsRef = collection(database, "calls");
        const userCallsRef = doc(callsRef, user.uid);
        const userCalls = collection(userCallsRef, "userCalls");
        await addDoc(userCalls,{
            created: new Date(),
            tarefa: tarefas,
            descricao: description,
            status: status,
            data: data,
            userId: user.uid
        })
        .then(() => {
            toast.success("Call created ;)");
        })
        .catch((error) => {
            toast.error("Error: call not added!")
        })
       
    }

    function changeSelect(e) {
        setDescription(e.target.value);
    }

    function changeStatus(e) {
        setStatus(e.target.value);
    }

    function changeStatus1(e) {
        setData(e.target.value);
    }

    return(
        <div>
            <Header />

            <div cllassName="content">
                <Title name="New call">
                    <FiPlusCircle />
                </Title>

                <div className="container">
                    <form className='form-profile' onSubmit={newCall}>
                        <label htmlFor='tarefas'>Tarefa</label><br />
                        <input type="text" id="tarefas" placeholder='Sua tarefa : ' required value={tarefas} onChange={(e) => setTarefas(e.target.value)} /><br/>

                        <label htmlFor='descricao'>Descrição</label><br />
                        <textarea type="text" placeholder='Descrição da tarefa' required value={description} onChange={(e) => setDescription(e.target.value)} /><br/>

                        <label htmlFor='status'>status</label>
                        <div className='status'>
                            <input type="radio" name="radio" value="Criada" id='opened' required onChange={changeStatus} checked={ status === 'Criada' }/>
                            <label htmlFor='opened'>Criada</label>

                            <input type="radio" name="radio" value="Andamaneto" id='pending' onChange={changeStatus} checked={ status === 'Andamaneto' }/>
                            <label htmlFor='pending'>Em Andamaneto</label>

                            <input type="radio" name="radio" value="Concluida" id='conclued' onChange={changeStatus} checked={ status === 'Concluida' }/>
                            <label htmlFor='conclued'>Concluída</label>
                        </div>

                        <label htmlFor='data'>Data de Realização</label>
                        <input type="date" id='data' value={data} onChange={(e) => setData(new Date(e.target.value))} checked={ status === 'Concluida' }/>

                        <button type='submit'>Save</button>
                    </form>
                </div>
            </div>
        
        </div>
    )
}