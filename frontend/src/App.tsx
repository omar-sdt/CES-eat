import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/home"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"
import Login from "./pages/Login"
import { AuthProvider } from "./context/auth-context"
import { JSX } from "react"
import Navbar from "@/components/navbar"
import { CartProvider } from "./context/cart-context"
import { FilterProvider } from "./context/filter-context"
import Register from "./pages/Register"
import Restaurant from "./pages/Restaurant"
import CommandeInfo from './pages/CommandeInfo';
import CommandeSuivi from './pages/CommandeSuivi';
import { useSelector } from "react-redux";
import { RootState } from "@/store.ts";
import Payment from "./pages/Payment"
import MyDeliveries from "./pages/MyDeliveries"
import OrdersAvailable from "./pages/OrdersAvailable"
import MyRestaurant from "./pages/MyRestaurant"

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

                <Route path="/home" element={<Home />} />

                {/* Routes publiques : User */}
                <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/restaurant/:id" element={<Restaurant />} />
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

                {/* Routes publiques : Delivery */}
                <Route path="/commande-suivi" element={<PrivateRoute element={<CommandeSuivi />} />} />
                <Route path="/orders-available" element={<PrivateRoute element={<OrdersAvailable />} />} />
                <Route path="/commande-info" element={<PrivateRoute element={<CommandeInfo />} />} />
                <Route path="/my-deliveries" element={<PrivateRoute element={<MyDeliveries />} />} />

                {/* Routes publiques : Restaurant */}
                <Route path="/my-restaurant" element={<PrivateRoute element={<MyRestaurant />} />} />


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
