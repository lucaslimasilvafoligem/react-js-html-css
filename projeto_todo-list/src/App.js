import Rotas from './routes/AppRoutes.js';
import { AuthProvider } from './Contexts/auth';
import './App.css';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return(
    <AuthProvider>
      <ToastContainer autoClose={4000} />
      <Rotas />
    </AuthProvider>
  )
}

export default App;
