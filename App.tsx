
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import SkinAnalyzer from './components/SkinAnalyzer';
import ProductList from './components/ProductList';
import AboutSection from './components/AboutSection';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import ChatWidget from './components/ChatWidget';
import Careers from './components/Careers';
import UIEnhancements from './components/UIEnhancements';
import { CartProvider } from './contexts/CartContext';
import CartDrawer from './components/CartDrawer';
import Preloader from './components/Preloader';
import Marquee from './components/Marquee';
import ScienceSection from './components/ScienceSection';
import IngredientsGlossary from './components/IngredientsGlossary';
import StickyMobileCart from './components/StickyMobileCart';

const Home = () => (
    <>
        <Hero />
        <Marquee />
        <Features />
        <ScienceSection />
        <Testimonials />
        <AboutSection />
        <ProductList />
        <Contact />
    </>
);

const AnimatedRoutes = () => {
    const location = useLocation();
    
    return (
        <div key={location.pathname} className="page-enter">
            <Routes location={location}>
                <Route path="/" element={<Home />} />
                <Route path="/scan" element={<SkinAnalyzer />} />
                <Route path="/shop" element={<ProductList />} />
                <Route path="/about" element={<AboutSection />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/science" element={<IngredientsGlossary />} />
                <Route path="/contact" element={<div className="pt-10"><Contact /></div>} />
                <Route path="*" element={<Contact />} />
            </Routes>
        </div>
    );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <CartProvider>
        {/* Preloader sits on top */}
        <Preloader onComplete={() => setLoading(false)} />

        <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
            <Router>
            <UIEnhancements />
            <div className="min-h-screen bg-transparent text-white font-sans selection:bg-blue-600 selection:text-white pb-16 md:pb-0">
                <Header />
                <CartDrawer />
                <StickyMobileCart />
                <AnimatedRoutes />
                <ChatWidget />
            </div>
            </Router>
        </div>
    </CartProvider>
  );
};

export default App;
