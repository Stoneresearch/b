'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { ArtSection } from './art-section';
import { Instagram } from 'lucide-react';

const AnimatedLink = ({ children, onClick, isActive }: { children: React.ReactNode; onClick: () => void; isActive: boolean }) => (
  <motion.span
    className={`text-sm uppercase tracking-wider ${isActive ? 'text-black' : 'text-gray-600'} hover:text-black transition-colors`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.99 }}
    transition={{ duration: 0.3 }}
    onClick={onClick}
  >
    {children}
  </motion.span>
);

const FluidBackground = () => {
  const controls = useAnimation();

  useEffect(() => {
    const animateBackground = async () => {
      await controls.start({
        scale: [1, 1.05, 1],
        filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)"],
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }
      });
    };

    animateBackground();
  }, [controls]);

  return (
    <motion.div
      className="fixed inset-0 z-0 opacity-20"
      style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.4), rgba(236, 72, 153, 0.4), rgba(239, 68, 68, 0.4))',
        filter: 'blur(15px)'
      }}
      animate={controls}
    />
  );
};

const ParallaxImage = ({ src, alt, index }: { src: string; alt: string; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${10 * (index + 1)}%`]);

  return (
    <motion.div
      ref={ref}
      className="absolute inset-0"
      style={{ y, zIndex: -index }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority={index === 0}
      />
    </motion.div>
  );
};

const BiographySection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['100%', '0%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-0 w-full text-6xl font-bold text-gray-200"
        style={{ x: x1, opacity }}
      >
        Visual Artist
      </motion.div>
      <motion.div
        className="absolute top-2/4 right-0 w-full text-right text-6xl font-bold text-gray-200"
        style={{ x: x2, opacity }}
      >
        Tattoo Artist
      </motion.div>
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl mb-6 text-black">Bahar Şener</h2>
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
    className={`text-2xl font-light tracking-wider ${isActive ? 'text-black' : 'text-gray-600'} hover:text-black transition-colors cursor-pointer`}
    whileHover={{ scale: 1.05, x: 10 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.2 }}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/baharssener',
    icon: Instagram
  }
];

export function LandingPage() {
  const [currentSection, setCurrentSection] = useState('home');
  const [direction, setDirection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const [artSubsection, setArtSubsection] = useState<'tattoo' | 'illustration' | 'collage' | null>(null);

  const images = [
    '/bahar1.png',  // Reverted back to .png
    '/bahar2.jpg',  // This remains as .jpg as per your previous request
  ];

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

  const handleArtClick = (subsection: 'tattoo' | 'collage' | 'illustration') => {
    handleSectionChange('art');
    handleArtSubsectionChange(subsection);
  };

  return (
    <div className="min-h-screen bg-white text-black overflow-hidden font-light">
      <FluidBackground />

      <header className="fixed top-0 left-0 w-full p-4 flex justify-between items-center z-50">
        <motion.div
          className="ml-4 cursor-none hidden md:block"
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
          />
        </motion.div>
        <nav className="hidden md:flex space-x-8 mr-4">
          <AnimatedLink onClick={() => handleSectionChange('home')} isActive={currentSection === 'home'}>Home</AnimatedLink>
          <AnimatedLink onClick={() => handleSectionChange('about')} isActive={currentSection === 'about'}>About</AnimatedLink>
          <AnimatedLink onClick={() => handleSectionChange('art')} isActive={currentSection === 'art'}>Art</AnimatedLink>
          <AnimatedLink onClick={() => handleSectionChange('contact')} isActive={currentSection === 'contact'}>Contact</AnimatedLink>
        </nav>
        <div className="flex items-center md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-black z-50">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white bg-opacity-60 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden"
          >
            <nav className="flex flex-col space-y-8">
              <MobileMenuLink onClick={() => handleSectionChange('home')} isActive={currentSection === 'home'}>Home</MobileMenuLink>
              <MobileMenuLink onClick={() => handleSectionChange('about')} isActive={currentSection === 'about'}>About</MobileMenuLink>
              <MobileMenuLink onClick={() => handleSectionChange('art')} isActive={currentSection === 'art'}>Art</MobileMenuLink>
              <MobileMenuLink onClick={() => handleSectionChange('contact')} isActive={currentSection === 'contact'}>Contact</MobileMenuLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

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
                <div className="absolute inset-0 z-0">
                  {images.map((src, index) => (
                    <ParallaxImage key={src} src={src} alt={`Artwork ${index + 1}`} index={index} />
                  ))}
                </div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center 
                                bg-gradient-to-b from-white/80 via-white/70 to-transparent backdrop-blur-[1px] p-4 z-10">
                  <motion.div className="w-full flex justify-center mb-8">
                    <Image
                      src="/logo.png"
                      alt="Bahar Sener Logo"
                      width={150}
                      height={150}
                      className="drop-shadow-lg"
                    />
                  </motion.div>
                  <motion.div className="text-xl md:text-2xl lg:text-3xl mb-8 md:mb-10 text-gray-800 
                          tracking-wide flex flex-col md:flex-row items-center justify-center 
                          space-y-6 md:space-y-0 md:space-x-12">
                    {['TATTOO ART', 'COLLAGE ART', 'ILLUSTRATION'].map((text) => (
                      <motion.span
                        key={text}
                        className="cursor-pointer relative group"
                        onClick={() => handleArtClick(text.split(' ')[0].toLowerCase() as 'tattoo' | 'collage' | 'illustration')}
                        whileHover={{ scale: 1.05 }}
                      >
                        {text}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 
                                       group-hover:w-full" />
                      </motion.span>
                    ))}
                  </motion.div>
                  <motion.p className="text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16 
                        text-gray-700 leading-relaxed font-light tracking-wide">
                    Blending traditional artistry with contemporary vision, creating unique visual narratives 
                    that transcend conventional boundaries. Each piece tells a story, each design carries meaning.
                  </motion.p>
                  <motion.div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSectionChange('contact')}
                      className="bg-black text-white px-8 py-3 rounded-full hover:bg-white 
                                 hover:text-black transition-all duration-300 border border-black
                                 shadow-lg hover:shadow-xl"
                    >
                      Get in Touch
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSectionChange('art')}
                      className="bg-transparent text-black px-8 py-3 rounded-full hover:bg-black 
                                 hover:text-white transition-all duration-300 border border-black
                                 shadow-lg hover:shadow-xl"
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
                    <h2 className="text-2xl md:text-3xl mb-4">Get in Touch</h2>
                    <p className="text-lg font-light text-gray-800">
                      Looking to book a tattoo appointment, request a commission, or ask a question? 
                      Contact me anytime!
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
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 w-full"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? 'Sending...' : 'Send'}
                    </button>
                    {formStatus === 'success' && (
                      <p className="text-green-600 text-sm mt-2">Message sent successfully!</p>
                    )}
                    {formStatus === 'error' && (
                      <p className="text-red-600 text-sm mt-2">Error sending message. Please try again.</p>
                    )}
                  </form>
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
          <p className="text-xs text-gray-600">&copy; 2023 Bahar Şener. All rights reserved.</p>
          <div className="flex items-center">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <link.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
