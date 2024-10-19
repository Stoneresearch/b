import { motion } from 'framer-motion';
import Image from 'next/image';
import { ZoomIn, ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';

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

const works = {
    tattoo: [
        { src: '/tattoo1.jpg', title: 'Tattoo Work 1' },
        { src: '/tattoo2.jpg', title: 'Tattoo Work 2' },
        { src: '/tattoo3.jpg', title: 'Tattoo Work 3' },
        { src: '/tattoo4.jpg', title: 'Tattoo Work 4' },
        { src: '/tattoo5.jpg', title: 'Tattoo Work 5' },
    ],
    illustration: [
        { src: '/illustration1.jpg', title: 'Illustration Work 1' },
        { src: '/illustration2.jpg', title: 'Illustration Work 2' },
        { src: '/illustration3.jpg', title: 'Illustration Work 3' },
        { src: '/illustration4.jpg', title: 'Illustration Work 4' },
        { src: '/illustration5.jpg', title: 'Illustration Work 5' },
        { src: '/illustration6.jpg', title: 'Illustration Work 6' },
        { src: '/illustration7.jpg', title: 'Illustration Work 7' },
        { src: '/illustration8.jpg', title: 'Illustration Work 8' },
        { src: '/illustration9.jpg', title: 'Illustration Work 9' },
    ],
    collage: [
        { src: '/collage1.jpg', title: 'Urban Fragments' },
        { src: '/collage2.jpg', title: 'Nature Remix' },
        { src: '/collage3.jpg', title: 'Retro Futurism' },
        { src: '/collage4.jpg', title: 'Pop Culture Mashup' },
    ],
};

function getRandomImage(category: keyof typeof works): string {
    const categoryWorks = works[category];
    const randomIndex = Math.floor(Math.random() * categoryWorks.length);
    return categoryWorks[randomIndex].src;
}

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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {artworks.map(({ src, title }, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-lg shadow-md"
                    >
                        <div className="aspect-square relative bg-gray-200">
                            {!imageError[src] && (
                                <Image
                                    src={src}
                                    alt={title}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition-transform duration-300 group-hover:scale-105"
                                    onError={() => handleImageError(src)}
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    loading="lazy"
                                />
                            )}
                            {imageError[src] && (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                                    Image not available
                                </div>
                            )}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                className="text-white text-center p-4"
                            >
                                <h3 className="text-lg font-light mb-2">{title}</h3>
                                <button
                                    onClick={() => onFullscreenImage(src)}
                                    className="bg-white text-black px-3 py-1 rounded-full text-sm flex items-center mx-auto"
                                >
                                    <ZoomIn size={16} className="mr-1" /> View
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-16 sm:mt-24">
            {!artSubsection ? (
                <div className="space-y-12">
                    <h2 className="text-4xl font-light text-center mb-12">Art Portfolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {categoriesWithRandomImages.map((category) => (
                            <motion.div
                                key={category.name}
                                className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => onSubsectionChange(category.name)}
                            >
                                <div className="aspect-[3/4] relative bg-gray-200">
                                    {!imageError[category.image] && (
                                        <Image
                                            src={category.image}
                                            alt={category.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className="transition-transform duration-300 group-hover:scale-110"
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
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <h3 className="text-white text-2xl font-light tracking-wider">{category.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex justify-between items-center">
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center text-gray-600 hover:text-black transition-colors"
                            onClick={() => onSubsectionChange(null)}
                        >
                            <ArrowLeft size={20} className="mr-2" />
                            <span className="hidden sm:inline">Back to Art Portfolio</span>
                            <span className="sm:hidden">Back</span>
                        </motion.button>
                        <h2 className="text-3xl font-light text-center">
                            {categories.find(c => c.name === artSubsection)?.title}
                        </h2>
                    </div>
                    {renderArtworks(works[artSubsection])}
                </div>
            )}
        </div>
    );
}
