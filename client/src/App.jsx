import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Header from "./components/Header";
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen bg-white text-black px-2">
      <ToastContainer />

      <Header />

      <div className="mt-2">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
