import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Profile from "./pages/profile"
import Orders from "./pages/Orders"
import Login from "./pages/login"
import { AuthProvider } from "./context/auth-context"
import { JSX } from "react"
import Navbar from "@/components/Navbar"
import { CartProvider } from "./context/cart-context"
import { FilterProvider } from "./context/filter-context"
import Register from "./pages/register"
import Restaurant from "./pages/restaurant"
import { useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import Payment from "./pages/payment"

function PrivateRoute({ element }: { element: JSX.Element }) {
  const { userToken } = useSelector((state: RootState) => state.auth);

  // Si l'utilisateur n'est pas connecté, redirige vers la page de login
  return userToken ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <FilterProvider>
              <Navbar />
              <Routes>
                {/* Routes publiques */}
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />


                {/* Routes privées */}
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
              </Routes>
            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter >

    </>
  )
}

export default App
