import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#F5EFE4', color: '#1C1A14' }}>
      {/* pt offsets the fixed floating navbar (pill + top margin ≈ 76px mobile / 84px desktop) */}
      <div className="pt-[76px] md:pt-[84px]">
        <Navbar />
      </div>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}