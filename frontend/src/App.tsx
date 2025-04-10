import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import Home from "./pages/home"
import Profile from "./pages/profile"
import Orders from "./pages/orders"
import Login from "./pages/login"
import { AuthProvider } from "./context/auth-context"
import { JSX, ReactNode } from "react"
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

function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();

  // Routes où la navbar doit être cachée
  const noNavbarRoutes = ['/home_livreur', '/Commandes', '/commande-info', '/commande-suivi'];

  return (
    <>
      {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
      {children}
    </>
  );
}

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <FilterProvider>
              <Layout>
                <Routes>
                  <Route path="*" element={<Navigate to="/home" />} />
                  <Route path="/" element={<Navigate to="/home" />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/restaurant/:id" element={<Restaurant />} />
                  <Route path="/home_livreur" element={<Home_livreur />} />
                  <Route path="/commandes" element={<Commandes />} />
                  <Route path="/commande-info" element={<CommandeInfo />} />
                  <Route path="/commande-suivi" element={<CommandeSuivi />} />
                  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />

                  {/* Routes privées */}
                  <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                  <Route path="/payment" element={<PrivateRoute element={<Payment />} />} />
                </Routes>
              </Layout>
            </FilterProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App
