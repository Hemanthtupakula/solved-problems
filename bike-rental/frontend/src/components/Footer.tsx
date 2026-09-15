import React from 'react';
import { Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0A0A0B] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#141416] to-[#0A0A0B] border border-[#00E5C7]/40 flex items-center justify-center">
                <span className="font-display font-extrabold text-[#00E5C7] text-lg">T</span>
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-display">TBH</span>
                <p className="text-[10px] tracking-widest uppercase text-slate-400 font-semibold">Ride Beyond Limits</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's foremost luxury bike and car rental platform. Seamless 3D vehicle visualization, transparent hourly INR rates, and pan-India airport hubs.
            </p>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#00E5C7]" />
              <span>SOS Helpline: <strong>1800-TBH-RIDE</strong></span>
            </div>
          </div>

          {/* Indian Cities Covered */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#00E5C7] mb-3">Key Indian Cities</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Bengaluru (BLR Airport & Koramangala)</li>
              <li>Hyderabad (HYD Airport & Hitech City)</li>
              <li>Mumbai (BOM Airport & BKC)</li>
              <li>Delhi NCR (DEL Airport & Cyber Hub)</li>
              <li>Chennai (MAA Airport & OMR)</li>
              <li>Goa (Mopa GOX, Dabolim & Calangute)</li>
              <li>Pune & Jaipur Hubs</li>
            </ul>
          </div>

          {/* Fleet Categories */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3">Fleet Portfolio</h5>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Royal Enfield Classic & Hunter 350</li>
              <li>KTM Duke 390 & Yamaha MT-15 V2</li>
              <li>Honda Activa 6G & TVS Jupiter 125</li>
              <li>Ola S1 Pro & Ather 450X EV</li>
              <li>Ultraviolette F77 Mach 2 Superbike</li>
              <li>Mahindra Thar 4x4 & Toyota Fortuner</li>
              <li>Tata Nexon EV Max & Swift Dzire</li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Safety & Trust</h5>
            <div className="p-3 rounded-xl bg-[#141416] border border-white/10 space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-[#00E5C7]" />
                <span className="font-semibold">Parivahan Approved</span>
              </div>
              <p className="text-[11px] text-slate-400">All self-drive vehicles registered with commercial yellow plates and comprehensive insurance.</p>
            </div>
            <p className="text-[10px] text-slate-500">
              Protected by Razorpay 256-Bit SSL Payment Shield.
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 TBH Mobility Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-400 cursor-pointer">Rental Terms</span>
            <span className="hover:text-slate-400 cursor-pointer">Damage Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy</span>
            <span className="text-[#00E5C7] flex items-center space-x-1">
              <span>Made with pride in India</span>
              <Heart className="w-3 h-3 fill-[#00E5C7]" />
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
