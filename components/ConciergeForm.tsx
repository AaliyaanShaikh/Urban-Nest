
import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ConciergeFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConciergeForm: React.FC<ConciergeFormProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    propertyInterest: '',
    timeline: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setIsMounted(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          inquiry: '',
          propertyInterest: '',
          timeline: '',
          budget: '',
          message: ''
        });
        setIsSubmitting(false);
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 transition-all duration-700 ease-in-out ${isMounted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-2xl cursor-pointer"
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-2xl bg-black/40 backdrop-blur-3xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.1)] transition-all duration-700 ${isMounted ? 'scale-100' : 'scale-95'}`}>
        {/* Header */}
        <div className="p-8 border-b border-white/10 bg-white/5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="serif text-3xl md:text-4xl font-light tracking-tight italic mb-2">{t('form.title')}</h2>
              <p className="text-white/40 text-sm font-light">{t('form.subtitle')}</p>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          {submitStatus === 'success' ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="serif text-2xl font-light italic mb-2">{t('form.thankYou')}</h3>
              <p className="text-white/60 text-sm">{t('form.success')}</p>
            </div>
          ) : (
            <>
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                    {t('form.name')} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    placeholder={t('form.placeholder.name')}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    placeholder={t('form.placeholder.email')}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                    {t('form.phone')}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                    placeholder={t('form.placeholder.phone')}
                  />
                </div>
                <div>
                  <label htmlFor="inquiry" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                    {t('form.inquiry')} *
                  </label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  >
                    <option value="">{t('form.select')}</option>
                    <option value="viewing">{t('form.viewing')}</option>
                    <option value="information">{t('form.information')}</option>
                    <option value="investment">{t('form.investment')}</option>
                    <option value="consultation">{t('form.consultation')}</option>
                    <option value="other">{t('form.other')}</option>
                  </select>
                </div>
              </div>

              {/* Property Interest */}
              <div>
                <label htmlFor="propertyInterest" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                  {t('form.property')}
                </label>
                <input
                  type="text"
                  id="propertyInterest"
                  name="propertyInterest"
                  value={formData.propertyInterest}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  placeholder={t('form.placeholder.property')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="timeline" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                    {t('form.timeline')}
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  >
                    <option value="">{t('form.selectTimeline')}</option>
                    <option value="immediate">{t('form.immediate')}</option>
                    <option value="1-3months">{t('form.months1-3')}</option>
                    <option value="3-6months">{t('form.months3-6')}</option>
                    <option value="6-12months">{t('form.months6-12')}</option>
                    <option value="exploring">{t('form.exploring')}</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                    {t('form.budget')}
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
                  >
                    <option value="">{t('form.selectRange')}</option>
                    <option value="under-1m">{t('form.under1m')}</option>
                    <option value="1-3m">{t('form.range1-3m')}</option>
                    <option value="3-5m">{t('form.range3-5m')}</option>
                    <option value="5-10m">{t('form.range5-10m')}</option>
                    <option value="10m-plus">{t('form.range10mPlus')}</option>
                    <option value="confidential">{t('form.confidential')}</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-3">
                  {t('form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all resize-none"
                  placeholder={t('form.placeholder.message')}
                />
              </div>

              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-sm text-red-400">
                  {t('form.error')}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 text-[10px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  {t('form.cancel')}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t('form.submitting') : t('form.submit')}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ConciergeForm;

