
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="text-white font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Residential</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Commercial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Architecture</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Design Lab</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Private Advisory</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Relocation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Staging</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Financing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Lumina Offices</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li>Cupertino, CA</li>
              <li>New York City, NY</li>
              <li>London, UK</li>
              <li>Tokyo, JP</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 space-y-4 md:space-y-0">
          <p>© 2024 Lumina Estates. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
