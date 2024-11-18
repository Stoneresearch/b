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
    { name: 'tattoo', title: 'Tattoo' },
    { name: 'illustration', title: 'Illustrations' },
    { name: 'collage', title: 'Collage Art' },
] as const;

type WorkItem = {
    src: string;
};

interface Works {
    tattoo: WorkItem[];
    illustration: WorkItem[];
    collage: WorkItem[];
}

const works: Works = {
    tattoo: [
        { src: '/tattoo1.jpg' },
        { src: '/tattoo2.jpg' },
        { src: '/tattoo3.jpg' },
        { src: '/tattoo4.jpg' },
        { src: '/tattoo5.jpg' },
        { src: '/tattoo6.jpg' },
        { src: '/tattoo7.jpg' },
        { src: '/tattoo8.jpg' },
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

function getRandomImage(category: keyof Works): string {
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

    const renderArtworks = (artworks: WorkItem[]) => {
        return (
            <motion.div 
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-6 lg:gap-8"
            >
                {artworks.map(({ src }, index) => (
                    <motion.div
                        key={index}
                        variants={fadeInUp}
                        className="group relative overflow-hidden rounded-lg sm:rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="aspect-[4/5] relative bg-gray-100">
                            {!imageError[src] && (
                                <Image
                                    src={src}
                                    alt={`Artwork ${index + 1}`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-all duration-500 group-hover:scale-105"
                                    onError={() => handleImageError(src)}
                                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                    priority={true}
                                />
                            )}
                            {imageError[src] && (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                    Image not available
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center p-2 sm:p-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFullscreenImage(src);
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && onFullscreenImage(src)}
                                className="bg-white/90 hover:bg-white text-black text-xs sm:text-sm px-3 py-1.5 rounded-full flex items-center mb-2"
                                aria-label="View artwork in full size"
                                role="button"
                                tabIndex={0}
                            >
                                <ZoomIn size={14} className="mr-1.5" aria-hidden="true" />
                                <span>View</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        );
    };

    return (
        <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16 sm:mt-32">
            {!artSubsection ? (
                <motion.div 
                    initial="initial"
                    animate="animate"
                    variants={fadeInUp}
                    className="space-y-16"
                >
                    <h2 className="text-center mb-16">
                        <span className="block text-xl text-gray-500 mb-4 tracking-[.25em]">Explore</span>
                        <span className="text-5xl md:text-6xl font-light tracking-[.5em] bg-gradient-to-br from-black via-gray-600 to-black bg-clip-text text-transparent transform hover:scale-105 transition-transform duration-500 inline-block">
                            WORKS
                        </span>
                    </h2>
                    <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-8 lg:gap-12">
                        {categoriesWithRandomImages.map((category) => (
                            <motion.div
                                key={category.name}
                                className="relative overflow-hidden rounded-lg sm:rounded-2xl shadow-md sm:shadow-xl cursor-pointer group h-[150px] sm:h-[600px] md:h-[400px]"
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
                                            sizes="(max-width: 768px) 33vw, (max-width: 1200px) 50vw, 33vw"
                                            priority={true}
                                        />
                                    )}
                                    {imageError[category.image] && (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                            Image not available
                                        </div>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center p-2 sm:p-6">
                                    <div className="text-white text-center">
                                        <h3 className="text-sm sm:text-2xl font-light mb-1 sm:mb-4">{category.title}</h3>
                                        <p className="text-xs sm:text-base text-gray-300 hidden sm:block">Click to explore</p>
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
