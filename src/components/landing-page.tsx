'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ArtSection } from './art-section';
import { Instagram } from 'lucide-react';
import React from 'react';

const AnimatedLink = ({ children, onClick, isActive }: { children: React.ReactNode; onClick: () => void; isActive: boolean }) => (
  <motion.span
    className={`text-lg tracking-wide cursor-pointer ${
      isActive ? 'text-black font-medium' : 'text-black/70'
    } hover:text-black transition-colors font-sfpro`}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
  >
    {children}
  </motion.span>
);

const BiographySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <motion.div
        className="absolute top-1/3 w-full text-6xl md:text-7xl font-bold text-gray-200/60"
        style={{ x: x1, opacity }}
      >
        Illustration
      </motion.div>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-5xl md:text-6xl mb-8 font-light tracking-[.5em] bg-gradient-to-br from-black via-gray-600 to-black bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-500">
          Bahar Şener
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-sm leading-relaxed space-y-4 text-gray-700"
        >
          <p>
            Bahar Şener, born in Ankara in 1991, began her art journey in 2005 when she was accepted into the Anatolian University of Fine Arts and Crafts. In 2013, she graduated with honors from Hacettepe University&apos;s Faculty of Fine Arts. Following her studies, she ventured into illustration and graphic design, creating visuals for festivals and event venues. In 2018, Bahar shifted her focus to tattoo art. Now based in Istanbul, she continues to explore her creativity and is currently working on her painting series titled &ldquo;Subconscious Collage&rdquo;.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? "100%" : "-100%",
  }),
  in: {
    opacity: 1,
    y: 0,
  },
  out: (direction: number) => ({
    opacity: 0,
    y: direction < 0 ? "100%" : "-100%",
  }),
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

const MobileMenuLink = ({ children, onClick, isActive }: { children: React.ReactNode; onClick: () => void; isActive: boolean }) => (
  <motion.div
    className={`text-3xl tracking-tight font-medium relative overflow-hidden
      ${isActive ? 'text-black' : 'text-gray-600'} 
      hover:text-zinc-800 hover:shadow-sm
      transition-all duration-300 cursor-pointer
      before:content-[''] before:absolute before:top-0 before:left-[-100%] before:w-full before:h-full
      before:bg-gradient-to-r before:from-transparent before:via-zinc-400/10 before:to-transparent
      hover:before:left-[100%] before:transition-all before:duration-700
    `}
    whileHover={{ 
      scale: 1.02,
      x: 5,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10,
        mass: 0.8,
        duration: 0.3
      }
    }}
    whileTap={{ 
      scale: 0.98,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }}
    animate={{ 
      y: [0, -2, 0],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2,
        ease: "easeInOut"
      }
    }}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

type IconProps = { size?: number; className?: string };
type IconComponent = React.ComponentType<IconProps>;

interface SocialLink {
  name: string;
  href: string;
  icon: IconComponent | ((props: IconProps) => JSX.Element);
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/baharssener',
    icon: Instagram as IconComponent
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/905322011992',
    icon: ({ size, className }: IconProps) => (
      <svg 
        width={size} 
        height={size} 
        className={className}
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.067 16.511c-.272.861-.847 1.564-1.488 2.164-.793.659-1.758 1.117-2.853 1.314-.771.097-1.514.097-2.285.001-1.879-.271-3.504-1.151-4.719-2.366-1.215-1.215-2.095-2.84-2.366-4.719-.096-.771-.096-1.514.001-2.285.197-1.095.655-2.06 1.314-2.853.6-.641 1.303-1.216 2.164-1.488.441-.137.902-.203 1.363-.203h.09c.685.012 1.258.156 1.846.346.588.19 1.145.458 1.674.764 1.588.918 2.844 2.267 3.629 3.916.529.976.824 2.05.861 3.163.037 1.113-.166 2.197-.598 3.183l.267.383z"/>
      </svg>
    )
  }
];

export function LandingPage() {
  const [currentSection, setCurrentSection] = useState('home');
  const [direction, setDirection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [artSubsection, setArtSubsection] = useState<'tattoo' | 'illustration' | 'collage' | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus('error');
    }
  };

  const handleSectionChange = (section: string) => {
    const sections = ['home', 'about', 'art', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    const newIndex = sections.indexOf(section);
    setDirection(newIndex - currentIndex);
    setCurrentSection(section);
    setMenuOpen(false);
    if (section !== 'art') {
      setArtSubsection(null);
    }
  };

  const handleArtSubsectionChange = (subsection: 'tattoo' | 'illustration' | 'collage' | null) => {
    setArtSubsection(subsection);
  };

  const handleFullscreenImage = (imageUrl: string) => {
    setFullscreenImage(imageUrl);
  };

  const handleCloseFullscreenImage = () => {
    setFullscreenImage(null);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-light">
      <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50">
        <motion.div
          className="ml-4 cursor-pointer hidden md:block"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => handleSectionChange('home')}
        >
          <Image
            src="/logo.png"
            alt="Bahar Şener Logo"
            width={100}
            height={50}
            className="object-contain"
            priority
          />
        </motion.div>
        <nav className="hidden md:flex space-x-8 mr-4">
          <AnimatedLink onClick={() => handleSectionChange('home')} isActive={currentSection === 'home'}>
            <span className="text-lg font-sfpro">Home</span>
          </AnimatedLink>
          <AnimatedLink onClick={() => handleSectionChange('about')} isActive={currentSection === 'about'}>
            <span className="text-lg font-sfpro">About</span>
          </AnimatedLink>
          <AnimatedLink onClick={() => handleSectionChange('art')} isActive={currentSection === 'art'}>
            <span className="text-lg font-sfpro">Art</span>
          </AnimatedLink>
          <AnimatedLink onClick={() => handleSectionChange('contact')} isActive={currentSection === 'contact'}>
            <span className="text-lg font-sfpro">Contact</span>
          </AnimatedLink>
        </nav>
        <div className="flex items-center md:hidden">
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="text-black z-50 p-2 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/60 backdrop-blur-sm z-40 flex items-center justify-center"
          >
            <div className="flex flex-col space-y-2 text-center">
              <MobileMenuLink onClick={() => handleSectionChange('home')} isActive={currentSection === 'home'}>
                <span className="font-sfpro">Home</span>
              </MobileMenuLink>
              <MobileMenuLink onClick={() => handleSectionChange('about')} isActive={currentSection === 'about'}>
                <span className="font-sfpro">About</span>
              </MobileMenuLink>
              <MobileMenuLink onClick={() => handleSectionChange('art')} isActive={currentSection === 'art'}>
                <span className="font-sfpro">Art</span>
              </MobileMenuLink>
              <MobileMenuLink onClick={() => handleSectionChange('contact')} isActive={currentSection === 'contact'}>
                <span className="font-sfpro">Contact</span>
              </MobileMenuLink>
            </div>
          </motion.div>
        )}
      </header>
      <main ref={mainRef} className="h-screen overflow-y-auto">
        <div className="relative z-0">
          <AnimatePresence initial={false} mode="wait">
            {currentSection === 'home' && (
              <motion.section
                key="home"
                className="relative h-screen flex items-center justify-center overflow-hidden"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                custom={direction}
                transition={pageTransition}
              >
                <div 
                  className="absolute inset-0 z-0 mt-[80px]"
                  style={{
                    backgroundImage: "url('/bahar1.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed'
                  }}
                />
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
                  <motion.div className="w-full flex justify-center mb-36">
                    <Image
                      src="/logo.png"
                      alt="Bahar Sener Logo"
                      width={150}
                      height={150}
                      className="drop-shadow-lg"
                      priority
                    />
                  </motion.div>
                  <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSectionChange('contact')}
                      className="bg-white text-black px-8 py-3 rounded-full hover:bg-black 
                                 hover:text-white transition-all duration-300 border border-white
                                 shadow-lg hover:shadow-xl text-base font-medium"
                    >
                      Get in Touch
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSectionChange('art')}
                      className="bg-black text-white px-8 py-3 rounded-full hover:bg-white 
                                 hover:text-black transition-all duration-300 border-2 border-black
                                 shadow-md hover:shadow-xl text-base font-semibold"
                    >
                      View Portfolio
                    </motion.button>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {currentSection === 'about' && (
              <motion.section
                key="about"
                className="min-h-screen pt-24 px-4"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                custom={direction}
                transition={pageTransition}
              >
                <BiographySection />
              </motion.section>
            )}

            {currentSection === 'art' && (
              <motion.section
                key="art"
                className="min-h-screen pt-24 px-4"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                custom={direction}
                transition={pageTransition}
              >
                <ArtSection
                  artSubsection={artSubsection}
                  onSubsectionChange={handleArtSubsectionChange}
                  onFullscreenImage={handleFullscreenImage}
                />
              </motion.section>
            )}

            {currentSection === 'contact' && (
              <motion.section
                key="contact"
                className="min-h-screen flex flex-col justify-center items-center p-8 pt-24"
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                custom={direction}
                transition={pageTransition}
              >
                <div className="max-w-md w-full space-y-4">
                  <motion.div className="text-center mb-10">
                    <h2 className="text-4xl md:text-5xl mb-8 md:mb-10 font-semibold tracking-[.75em] bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent px-8 md:px-16 max-w-4xl mx-auto">Get in Touch</h2>
                    <p className="text-lg font-light text-gray-800">
                      Ready to book a tattoo appointment, request a custom design or just have a question? Get in touch with me.
                    </p>
                  </motion.div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 
                                  focus:ring-black focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 
                                  focus:ring-black focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 
                                  focus:ring-black focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="border border-gray-300 rounded-lg p-3 focus:ring-2 
                                  focus:ring-black focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 py-2.5 px-4 rounded-lg font-medium tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        <span>Sending...</span>
                      ) : formStatus === 'success' ? (
                        <span>Message Sent!</span>
                      ) : formStatus === 'error' ? (
                        <span>Error - Try Again</span>
                      ) : (
                        <span>Send Message</span>
                      )}
                    </button>
                    {formStatus === 'success' && (
                      <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
                    )}
                    {formStatus === 'error' && (
                      <p className="text-red-600 text-sm mt-2">Failed to send message. Please try again.</p>
                    )}
                  </form>
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 mb-3">or</p>
                    <a
                      href="https://wa.me/905322011992"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full bg-[#25D366] bg-opacity-10 hover:bg-opacity-20 text-black border-2 border-[#25D366] transition-all duration-300 py-2.5 px-4 rounded-lg font-medium tracking-wide"
                    >
                      <svg 
                        className="w-5 h-5 mr-2" 
                        fill="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.067 16.511c-.272.861-.847 1.564-1.488 2.164-.793.659-1.758 1.117-2.853 1.314-.771.097-1.514.097-2.285.001-1.879-.271-3.504-1.151-4.719-2.366-1.215-1.215-2.095-2.84-2.366-4.719-.096-.771-.096-1.514.001-2.285.197-1.095.655-2.06 1.314-2.853.6-.641 1.303-1.216 2.164-1.488.441-.137.902-.203 1.363-.203h.09c.685.012 1.258.156 1.846.346.588.19 1.145.458 1.674.764 1.588.918 2.844 2.267 3.629 3.916.529.976.824 2.05.861 3.163.037 1.113-.166 2.197-.598 3.183l.267.383z"/>
                      </svg>
                      Message on WhatsApp
                    </a>
                  </div>
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>

        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-95"
            onClick={handleCloseFullscreenImage}
          >
            <div className="relative max-w-2xl w-full h-auto" style={{ height: '80vh' }}>
              <Image
                src={fullscreenImage}
                alt="Fullscreen"
                fill
                className="object-contain"
                priority
              />
            </div>
            <button
              className="absolute top-6 right-6 text-black hover:text-gray-600 
                         transition-colors p-2"
              onClick={handleCloseFullscreenImage}
              aria-label="Close fullscreen"
            >
              <X size={28} />
            </button>
          </motion.div>
        )}

        <footer className="fixed bottom-0 left-0 w-full p-2 bg-white bg-opacity-50 backdrop-blur-sm flex justify-between items-center px-4">
          <p className="text-xs text-gray-600">&copy; 2024 Bahar Şener. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-600 hover:text-gray-900 transition-colors ${link.name === 'WhatsApp' ? 'md:hidden' : ''}`}
              >
                {React.createElement(link.icon, { 
                  size: 20, 
                  className: "hover:scale-110 transition-transform" 
                })}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
