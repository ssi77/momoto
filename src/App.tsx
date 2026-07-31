import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Bestsellers from './components/Bestsellers';
import Features from './components/Features';
import Stats from './components/Stats';
import Story from './components/Story';
import Testimonials from './components/Testimonials';
import Trust from './components/Trust';
import Newsletter from './components/Newsletter';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Shop from './components/Shop';
import ProductPage from './components/ProductPage';
import CartDrawer from './components/CartDrawer';
import StoriesPage from './components/StoriesPage';
import CommunityPage from './components/CommunityPage';

function Home({ onCartClick }: { onCartClick: () => void }) {
  return (
    <>
      <Hero />
      <Categories />
      <Bestsellers onAdd={onCartClick} />
      <Features />
      <Stats />
      <Story />
      <Testimonials />
      <Trust />
      <Newsletter />
      <CTA />
    </>
  );
}

function PageMeta({ title, description }: { title: string; description: string }) {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', window.location.origin + pathname);
  }, [title, description, pathname]);
  return null;
}

function AppShell() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('paid') === '1') {
      // success: cart cleared on Stripe side; close drawer if open
      setCartOpen(false);
    }
  }, []);

  return (
    <div className="bg-[#181D15] min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setCartOpen(true)} />
      <main>
        <Routes>
          <Route path="/" element={<Home onCartClick={() => setCartOpen(true)} />} />
          <Route
            path="/shop"
            element={
              <>
                <PageMeta
                  title="Shop · Momoto"
                  description="Esplora il catalogo Momoto: ricambi, abbigliamento tecnico, caschi e accessori per motociclisti."
                />
                <Shop onAdd={() => setCartOpen(true)} />
              </>
            }
          />
          <Route
            path="/product/:id"
            element={
              <>
                <PageMeta
                  title="Prodotto · Momoto"
                  description="Dettagli prodotto, specifiche tecniche e acquisto su Momoto."
                />
                <ProductPage onAdd={() => setCartOpen(true)} onCheckout={() => setCartOpen(true)} />
              </>
            }
          />
          <Route
            path="/stories"
            element={
              <>
                <PageMeta
                  title="Stories · Momoto"
                  description="Guide, viaggi, tutorial e interviste dal mondo delle due ruote."
                />
                <StoriesPage />
              </>
            }
          />
          <Route
            path="/community"
            element={
              <>
                <PageMeta
                  title="Community · Momoto"
                  description="Eventi, gite, track day e workshop della tribe Momoto."
                />
                <CommunityPage />
              </>
            }
          />
        </Routes>
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCountChange={setCartCount}
      />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#272B24',
            color: '#FAF5FF',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}