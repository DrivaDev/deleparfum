import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import ReturnPolicy from './pages/ReturnPolicy';
import Shipping from './pages/Shipping';
import Admin from './pages/Admin';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Pages that use their own header (no Navbar/Footer)
const STANDALONE_ROUTES = ['/checkout', '/confirmacion', '/admin'];

function Layout() {
  const { pathname } = useLocation();
  const isStandalone = STANDALONE_ROUTES.some(r => pathname.startsWith(r));

  return (
    <>
      <ScrollToTop />
      {!isStandalone && <Navbar />}
      <CartSidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/producto/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmacion" element={<OrderConfirmation />} />
        <Route path="/politica-de-devoluciones" element={<ReturnPolicy />} />
        <Route path="/envios" element={<Shipping />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isStandalone && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
