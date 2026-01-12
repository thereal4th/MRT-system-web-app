// app/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Train, MapPin, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  const [origin, setOrigin] = useState<string>('');
  const [dest, setDest] = useState<string>('');
  const [fare, setFare] = useState<number | null>(null);
  const [discount, setDiscount] = useState<string>('');

  //TODO: make this an endpoint to calculate fares
  const calculateFare = () => {
    if (origin && dest) {
      const base = 13;
      const distanceFare = Math.floor(Math.random() * 15) + 5; 
    
      //50% discount
      if(discount) setFare((base + distanceFare)/2);
      else setFare(base + distanceFare);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* --- NAV BAR --- */}
      <header className="px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <Train className="h-6 w-6" />
          <span>MRT 3</span>
        </div>

        <Link href="/login">
          <button className="px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-md hover:bg-slate-800 transition-colors">
            Staff Login
          </button>
        </Link>
      </header>

      <main className="flex-1">
        
        {/* --- HERO SECTION --- */}
        <section className="px-6 py-20 md:py-32 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          
          {/* Text Content */}
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              <span className="text-blue-600">MRT-3<br /></span>
              Ticketing System.
            </h1>
            <p className="text-lg text-slate-600 max-w-lg">
              A proof of concept modernizing Manila&apos;s MRT-3 system. 
              Featuring real-time station plotting, geo-fencing, and seamless mobile payments.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 flex items-center gap-2 transition-all">
                Download Passenger App (Mobile)<ArrowRight className="h-4 w-4"/>
              </a>
            </div>
          </div>

          {/* Interactive Component: Public Fare Calculator */}
          <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-400"></div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-500"/> Quick Fare Check
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">Origin Station</label>
                <select 
                  className="w-full p-2 border rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                >
                  <option value="">Select Station...</option>
                  <option value="north">North Avenue</option>
                  <option value="quezon">Quezon Avenue</option>
                  <option value="cubao">Cubao</option>
                  <option value="santolan">Santolan</option>
                  <option value="pasig">Pasig</option>
                  <option value="shaw boulevard">Shaw Boulevard</option>
                  <option value="guadalupe">guadalupe</option>
                  <option value="buendia">Buendia</option>
                  <option value="ayala">Ayala</option>
                  <option value="magallanes">Magallanes</option>
                  <option value="taft avenue">Taft Avenue</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">Destination</label>
                <select 
                  className="w-full p-2 border rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={dest}
                  onChange={(e) => setDest(e.target.value)}
                >
                  <option value="">Select Station...</option>
                  <option value="north">North Avenue</option>
                  <option value="quezon">Quezon Avenue</option>
                  <option value="cubao">Cubao</option>
                  <option value="santolan">Santolan</option>
                  <option value="pasig">Pasig</option>
                  <option value="shaw boulevard">Shaw Boulevard</option>
                  <option value="guadalupe">guadalupe</option>
                  <option value="buendia">Buendia</option>
                  <option value="ayala">Ayala</option>
                  <option value="magallanes">Magallanes</option>
                  <option value="taft avenue">Taft Avenue</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">Discount</label>
                <select
                className="w-full p-2 border rounded-md bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setDiscount(e.target.value)}>
                  <option value = "">Select discount type...</option>
                  <option value = "student">Student</option>
                  <option value = "pwd">Person With Disability</option>
                  <option value = "senior">Senior Citizen</option>
                </select>

              </div>

              <button 
                onClick={calculateFare}
                className="w-full py-2 bg-slate-900 text-white font-medium rounded-md hover:bg-slate-800"
              >
                Calculate Fare
              </button>

              {fare !== null && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-center animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-sm text-blue-600 font-medium">Estimated Fare</p>
                  <p className="text-3xl font-bold text-slate-900">₱{fare}.00</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="bg-white py-20 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1 */}
              <div className="space-y-3">
                <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <QrCode className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl">Dynamic QR Entry</h3>
                <p className="text-slate-500 leading-relaxed">
                  Secure, encrypted QR codes generated per station. 
                  Prevents fraud and enables instant turnstile access via mobile scan.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-3">
                <div className="h-10 w-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl">Geo-Spatial Plotting</h3>
                <p className="text-slate-500 leading-relaxed">
                  Admin dashboard powered by Google Maps API allows precise plotting 
                  of station coordinates for accurate distance-based pricing.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-3">
                <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-xl">Role-Based Security</h3>
                <p className="text-slate-500 leading-relaxed">
                  Strict access control for Admins, Station Agents, and Passengers.
                  Built with NextAuth v5 and MongoDB.
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-50 py-8 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>© 2026 MRT Internship Project. Built by Alfredo C. Venturina IV.</p>
      </footer>
    </div>
  );
}