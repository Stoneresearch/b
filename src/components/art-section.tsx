import { motion } from 'framer-motion';
import Image from 'next/image';
import { ZoomIn, ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import React from 'react';

interface ArtSectionProps {
    artSubsection: 'tattoo' | 'illustration' | 'collage' | null;
    onSubsectionChange: (subsection: 'tattoo' | 'illustration' | 'collage' | null) => void;
    onFullscreenImage: (imageUrl: string) => void;
}

const categories = [
    { name: 'tattoo', title: 'Tattoo Art' },
    { name: 'illustration', title: 'Illustrations' },
    { name: 'collage', title: 'Collage Art' },
] as const;

type WorkItem = {
    src: string;
};

type Works = {
    [K in 'tattoo' | 'illustration' | 'collage']: WorkItem[];
};

const works: Works = {
    tattoo: [
        { src: '/tattoo1.jpg' },
        { src: '/tattoo2.jpg' },
        { src: '/tattoo3.jpg' },
        { src: '/tattoo4.jpg' },
        { src: '/tattoo5.jpg' },
    ],
    illustration: [
        { src: '/illustration1.jpg' },
        { src: '/illustration2.jpg' },
        { src: '/illustration3.jpg' },
        { src: '/illustration4.jpg' },
        { src: '/illustration5.jpg' },
        { src: '/illustration6.jpg' },
        { src: '/illustration7.jpg' },
        { src: '/illustration8.jpg' },
        { src: '/illustration9.jpg' },
    ],
    collage: [
        { src: '/collage1.jpg' },
        { src: '/collage2.jpg' },
        { src: '/collage3.jpg' },
        { src: '/collage4.jpg' },
    ],
};

function getRandomImage(category: keyof typeof works): string {
    const categoryWorks = works[category];
    const randomIndex = Math.floor(Math.random() * categoryWorks.length);
    return categoryWorks[randomIndex].src;
}

// Add new animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function ArtSection({ artSubsection, onSubsectionChange, onFullscreenImage }: ArtSectionProps) {
    const [imageError, setImageError] = useState<Record<string, boolean>>({});

    const categoriesWithRandomImages = useMemo(() =>
        categories.map(category => ({
            ...category,
            image: getRandomImage(category.name)
        })),
        []
    );

    const handleImageError = (imageSrc: string) => {
        console.error(`Error loading image: ${imageSrc}`);
        setImageError(prev => ({ ...prev, [imageSrc]: true }));
    };

    const renderArtworks = (artworks: typeof works[keyof typeof works]) => {
        return (
            <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8"
            >
                {artworks.map(({ src }, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                    >
                        <div className="aspect-[4/5] relative bg-gray-100">
                            {!imageError[src] && (
                                <Image
                                    src={src}
                                    alt={`Artwork ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-all duration-500 group-hover:scale-110"
                                    onError={() => handleImageError(src)}
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    loading="lazy"
                                />
                            )}
                            {imageError[src] && (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                    Image not available
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-6">
                            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <button
                                    onClick={() => onFullscreenImage(src)}
                                    onKeyDown={(e) => e.key === 'Enter' && onFullscreenImage(src)}
                                    className="bg-white/90 hover:bg-white text-black px-4 py-2 rounded-full flex items-center"
                                    aria-label="View artwork in full size"
                                    role="button"
                                    tabIndex={0}
                                >
                                    <ZoomIn size={18} className="mr-2" aria-hidden="true" />
                                    <span>View Full Size</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                    <div className="aspect-[4/5] bg-gray-200 rounded-2xl" />
                </div>
            ))}
        </div>
    );

    class ErrorBoundary extends React.Component<
      { children: React.ReactNode },
      { hasError: boolean }
    > {
      constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false };
      }

      static getDerivedStateFromError(_: Error) {
        return { hasError: true };
      }

      render() {
        if (this.state.hasError) {
          return <div>Something went wrong.</div>;
        }

        return this.props.children;
      }
    }

    return (
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16 sm:mt-32">
            {!artSubsection ? (
                <motion.div 
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="space-y-16"
                >
                    <h2 className="text-5xl font-light text-center mb-16 tracking-tight">
                        <span className="block text-xl text-gray-500 mb-4">Explore</span>
                        Art Portfolio
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {categoriesWithRandomImages.map((category) => (
                            <motion.div
                                key={category.name}
                                className="relative overflow-hidden rounded-2xl shadow-xl cursor-pointer group h-[500px] sm:h-[600px] md:h-[400px]"
                                whileHover={{ 
                                    scale: 1.03,
                                    transition: { duration: 0.3 }
                                }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSubsectionChange(category.name)}
                            >
                                <div className="absolute inset-0 bg-gray-100">
                                    {!imageError[category.image] && (
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-500 group-hover:scale-110"
                                            onError={() => handleImageError(category.image)}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            loading="lazy"
                                        />
                                    )}
                                    {imageError[category.image] && (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                            Image not available
                                        </div>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center p-8">
                                    <div className="text-white text-center">
                                        <h3 className="text-3xl font-light tracking-wide mb-2">{category.title}</h3>
                                        <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Click to explore
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ) : (
                <div className="space-y-12">
                    <div className="flex justify-between items-center">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center text-gray-600 hover:text-black transition-colors group"
                            onClick={() => onSubsectionChange(null)}
                        >
                            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                            <span className="hidden sm:inline">Back to Portfolio</span>
                            <span className="sm:hidden">Back</span>
                        </motion.button>
                        <h2 className="text-4xl font-light">
                            {categories.find(c => c.name === artSubsection)?.title}
                        </h2>
                    </div>
                    {renderArtworks(works[artSubsection])}
                </div>
            )}
        </div>
    );
}
