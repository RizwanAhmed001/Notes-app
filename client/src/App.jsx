import { ToastContainer } from 'react-toastify';
import {Route, Routes} from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/login';
import Error from './pages/Error';
import Header from './components/Header';

function App() {

  return (
    <div>
      <ToastContainer />
      <Header />

      <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
      </Routes>
    </div>
      
  )
}

export default App
