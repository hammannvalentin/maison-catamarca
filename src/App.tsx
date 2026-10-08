/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import {
  PRODUCTS as DEFAULT_PRODUCTS,
  INAUGURATION_DISCOUNT_AMOUNT as DEFAULT_DISCOUNT,
  STORE_WHATSAPP_NUMBER as DEFAULT_WHATSAPP,
  STORE_INSTAGRAM as DEFAULT_INSTAGRAM,
} from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromoBanner } from './components/PromoBanner';
import { CatalogSection } from './components/CatalogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  // Persistent Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('maison_cherry_products');
      return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // Persistent Discount
  const [discountAmount, setDiscountAmount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('maison_cherry_discount');
      return saved ? Number(saved) : DEFAULT_DISCOUNT;
    } catch {
      return DEFAULT_DISCOUNT;
    }
  });

  // Persistent WhatsApp
  const [whatsappNumber, setWhatsappNumber] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('maison_cherry_whatsapp');
      return saved ? saved : DEFAULT_WHATSAPP;
    } catch {
      return DEFAULT_WHATSAPP;
    }
  });

  // Persistent Instagram
  const [instagramHandle, setInstagramHandle] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('maison_cherry_instagram');
      return saved ? saved : DEFAULT_INSTAGRAM;
    } catch {
      return DEFAULT_INSTAGRAM;
    }
  });

  // Persistent Cart
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('maison_cherry_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('maison_cherry_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }, [cartItems]);

  // Sync products to localStorage
  const handleUpdateProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    try {
      localStorage.setItem('maison_cherry_products', JSON.stringify(newProducts));
    } catch (e) {
      console.error('Error saving products:', e);
    }
    // Update active modal product if currently open
    if (selectedProduct) {
      const updatedSelected = newProducts.find((p) => p.id === selectedProduct.id);
      if (updatedSelected) setSelectedProduct(updatedSelected);
    }
  };

  const handleUpdateDiscount = (amount: number) => {
    setDiscountAmount(amount);
    try {
      localStorage.setItem('maison_cherry_discount', String(amount));
    } catch (e) {
      console.error('Error saving discount:', e);
    }
  };

  const handleUpdateWhatsapp = (num: string) => {
    setWhatsappNumber(num);
    try {
      localStorage.setItem('maison_cherry_whatsapp', num);
    } catch (e) {
      console.error('Error saving whatsapp:', e);
    }
  };

  const handleUpdateInstagram = (handle: string) => {
    setInstagramHandle(handle);
    try {
      localStorage.setItem('maison_cherry_instagram', handle);
    } catch (e) {
      console.error('Error saving instagram:', e);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const subtotalPrice = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const calculatedDiscount =
    cartItems.length > 0 ? Math.min(discountAmount, subtotalPrice) : 0;
  const finalPrice = Math.max(0, subtotalPrice - calculatedDiscount);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectComboFromHero = (comboId: string) => {
    const found = products.find((p) => p.id === comboId);
    if (found) {
      setSelectedProduct(found);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#111111] flex flex-col selection:bg-[#c9182b] selection:text-white">
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExplore={() => scrollToSection('combos')}
          onSelectCombo={handleSelectComboFromHero}
        />

        {/* Huge Inauguration Banner */}
        <PromoBanner
          onShopNow={() => scrollToSection('combos')}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={totalCartCount}
        />

        {/* Store Catalog with Dynamic Combos */}
        <CatalogSection
          products={products}
          onAddToCart={handleAddToCart}
          onSelectProduct={(product) => setSelectedProduct(product)}
          recentlyAddedId={recentlyAddedId}
        />

        {/* Detailed Contact Section with Dynamic WhatsApp & Instagram */}
        <ContactSection
          whatsappNumber={whatsappNumber}
          instagramHandle={instagramHandle}
        />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar
        cartCount={totalCartCount}
        totalPrice={finalPrice}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Product Detail Modal with Gallery */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer with Dynamic WhatsApp Checkout */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        discountAmount={discountAmount}
        whatsappNumber={whatsappNumber}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onAddToCart={handleAddToCart}
      />

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        onUpdateProducts={handleUpdateProducts}
        discountAmount={discountAmount}
        onUpdateDiscount={handleUpdateDiscount}
        whatsappNumber={whatsappNumber}
        onUpdateWhatsapp={handleUpdateWhatsapp}
        instagramHandle={instagramHandle}
        onUpdateInstagram={handleUpdateInstagram}
      />
    </div>
  );
}
