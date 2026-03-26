import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
const Error = lazy(() => (import("./pages/Error")))
const Dashboard = lazy(() => (import("./pages/Dashboard")))
const Header = lazy(() => (import("./components/Header")))
const Register = lazy(() => (import("./pages/Register")))


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
