import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/profile"
import Orders from "./pages/orders"
import Login from "./pages/login"
import { AuthProvider, useAuth } from "./context/auth-context"
import { JSX } from "react"
import Navbar from "@/components/navbar"
import { CartProvider } from "./context/cart-context"

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
          <CartProvider>
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
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
