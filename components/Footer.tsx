
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-zinc-950 border-t border-white/5 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.explore')}</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.residential')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.commercial')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.architecture')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.designLab')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.services')}</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.advisory')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.relocation')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.staging')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.financing')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.company')}</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.story')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.impact')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.press')}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{t('footer.careers')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">{t('footer.offices')}</h4>
            <ul className="space-y-4 text-sm text-white/50">
              <li>Cupertino, CA</li>
              <li>New York City, NY</li>
              <li>London, UK</li>
              <li>Tokyo, JP</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/30 space-y-4 md:space-y-0">
          <p>{t('footer.copyright')}</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.terms')}</a>
            <a href="#" className="hover:text-white transition-colors">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
