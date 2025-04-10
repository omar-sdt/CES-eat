import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home"
import Profile from "./pages/profile"
import Orders from "./pages/Orders"
import Login from "./pages/login"
import { AuthProvider } from "./context/auth-context"
import { JSX } from "react"
import Navbar from "@/components/navbar"
import { CartProvider } from "./context/cart-context"
import { FilterProvider } from "./context/filter-context"
import Register from "./pages/register"
import Restaurant from "./pages/restaurant"
import Home_livreur from "./pages/Home_livreur"
import Commandes from './pages/Commandes';
import CommandeInfo from './pages/CommandeInfo';
import CommandeSuivi from './pages/CommandeSuivi';
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
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/" element={<Navigate to="/home" />} />

                {/* Routes publiques : User */}
                <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

                {/* Routes publiques : Delivery */}
                <Route path="/home_livreur" element={<Home_livreur />} />
                <Route path="/commande-suivi" element={<CommandeSuivi />} />
                <Route path="/commandes" element={<Commandes />} />
                <Route path="/commande-info" element={<CommandeInfo />} />


                {/* Routes privées */}
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
              </Routes>
            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App
