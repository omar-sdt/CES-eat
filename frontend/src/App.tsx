import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/profile"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import { AuthProvider, useAuth } from "./context/AuthContext"
import { JSX } from "react"
import Navbar from "@/components/Navbar"

function PrivateRoute({ element }: { element: JSX.Element }) {
  const { accessToken } = useAuth();

  // Si l'utilisateur n'est pas connecté, redirige vers la page de login
  return accessToken ? element : <Navigate to="/login" />;
}

function App() {

  return (
    <>

      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            {/* Routes publiques */}
            <Route path="*" element={<Navigate to="/home" />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
            <Route path="/login" element={<Login />} />

            {/* Routes privées */}
            <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
            <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
