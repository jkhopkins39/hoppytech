import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../../components/Footer';

interface Photo {
  id: number;
  title: string;
  imageUrl: string;
  category: string;
}

interface Video {
  id: number;
  title: string;
  description: string;
  vimeoId: string;
  thumbnail: string;
  category: string;
}

const Creative: React.FC = () => {
  const [expandedPhotos, setExpandedPhotos] = useState<boolean>(false);
  const [expandedVideos, setExpandedVideos] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && selectedPhoto) {
        setSelectedPhoto(null);
      }
    };

    if (selectedPhoto) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedPhoto]);

  // Sample photos - replace with your actual Cloudinary URLs
  const photos: Photo[] = [
    {
      id: 1,
      title: "Revival 1",
      imageUrl: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750693184/224_0409.00_08_54_42.Still032_p617ri.jpg",
      category: "Church"
    },
    {
      id: 2,
      title: "Revival 2",
      imageUrl: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750693183/224_0438.00_19_59_55.Still046_mt84pl.jpg",
      category: "Church"
    },
    {
      id: 3,
      title: "Choir",
      imageUrl: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750693184/224_0409.00_03_03_59.Still017_uwlelj.jpg",
      category: "Church"
    },
    {
      id: 4,
      title: "Cleave",
      imageUrl: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750693387/TheyreJealousJPG_pqleie.jpg",
      category: "Nature + Portrait"
    },
    {
      id: 5,
      title: "Over the Treeline",
      imageUrl: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750693386/UBetterPostThisJPG_hda7zf.jpg",
      category: "Nature + Portrait"
    },
    {
      id: 6,
      title: "Wave",
      imageUrl: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750693387/FacingAwayJPG_lekwl6.jpg",
      category: "Beach + Portrait"
    }
  ];

  // Sample videos - replace with your actual Vimeo IDs
  const videos: Video[] = [
    {
      id: 1,
      title: "First Baptist Church of Villa Rica: Graduate Recognition",
      description: "Graduate recognition ceremony at First Baptist Church of Villa Rica.",
      vimeoId: "1095312445",
      thumbnail: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750703823/Screenshot_2025-06-23_at_2.36.26_PM_kzrn9i.png",
      category: "Church"
    },
    {
      id: 2,
      title: "First Baptist Church of Villa Rica: Winter Revival Recap",
      description: "A recap of the 4 day winter revival at First Baptist Church of Villa Rica.",
      vimeoId: "1095311303",
      thumbnail: "https://res.cloudinary.com/dr0f81oek/image/upload/v1750704347/Screenshot_2025-06-23_at_2.44.58_PM_iw37u3.png",
      category: "Process"
    },
  ];

  const displayedPhotos = expandedPhotos ? photos : photos.slice(0, 3);
  const displayedVideos = expandedVideos ? videos : videos.slice(0, 3);

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12 pb-44">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-[#ffbd62] to-[#ff8f62] bg-clip-text text-transparent"
        >
          Creative
        </motion.h1>

        {/* Photos Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Photography</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpandedPhotos(!expandedPhotos)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-all hover:bg-blue-600"
            >
              <i className={`fas fa-chevron-${expandedPhotos ? 'up' : 'down'}`}></i>
              {expandedPhotos ? 'Show Less' : `Show All (${photos.length})`}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-xl group cursor-pointer"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={photo.imageUrl}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-photo.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <i className="fas fa-expand text-2xl text-white mb-2"></i>
                      <p className="text-white text-sm">Click to expand</p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{photo.title}</h3>
                  <p className="text-gray-400 text-sm">{photo.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Videos Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">Videos</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setExpandedVideos(!expandedVideos)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium transition-all hover:bg-blue-600"
            >
              <i className={`fas fa-chevron-${expandedVideos ? 'up' : 'down'}`}></i>
              {expandedVideos ? 'Show Less' : `Show All (${videos.length})`}
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedVideos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-900 rounded-lg overflow-hidden shadow-xl group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-video.png';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                  <p className="text-gray-400 text-sm mb-2">{video.category}</p>
                  <p className="text-gray-300 text-sm line-clamp-2">{video.description}</p>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={`https://vimeo.com/${video.vimeoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 bg-[#ffbd62] text-black px-4 py-2 rounded-lg font-medium text-sm transition-transform hover:bg-[#ff8f62]"
                  >
                    <i className="fab fa-vimeo-v mr-2"></i>
                    Watch on Vimeo
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>

      {/* Full Screen Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-5xl max-h-[85vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain rounded-lg"
                style={{ maxHeight: '85vh', maxWidth: '100%' }}
              />
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
                <h3 className="text-xl font-bold">{selectedPhoto.title}</h3>
                <p className="text-gray-300">{selectedPhoto.category}</p>
              </div>
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg text-sm">
                <i className="fas fa-keyboard mr-2"></i>
                Press ESC to exit
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Creative;
