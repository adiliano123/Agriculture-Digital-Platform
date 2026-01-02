import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const HorizontalScrollGallery = () => {
  const { t } = useLanguage();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, []);

  // Array of agricultural images with different themes
  const images = [
    {
      src: "/src/assets/hero-agriculture.jpg",
      title: "Modern Farming",
      description: "Advanced agricultural techniques"
    },
    {
      src: "/src/assets/agric.jpg", 
      title: "Crop Management",
      description: "Sustainable farming practices"
    },
    {
      src: "/src/assets/images.jpg",
      title: "Harvest Season",
      description: "Productive agricultural yields"
    },
    {
      src: "/src/assets/pngtree-agricultural-production-summer-solstice-farmer-rice-field-planting-photography-map-with-image_811853.jpg",
      title: "Rice Cultivation",
      description: "Traditional farming methods"
    },
    // Duplicate images for seamless loop
    {
      src: "/src/assets/hero-agriculture.jpg",
      title: "Modern Farming",
      description: "Advanced agricultural techniques"
    },
    {
      src: "/src/assets/agric.jpg",
      title: "Crop Management", 
      description: "Sustainable farming practices"
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Agricultural Excellence Across Tanzania
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the diverse agricultural landscapes and farming practices that make Tanzania a leader in sustainable agriculture.
          </p>
        </div>
      </div>

      {/* Horizontal Scrolling Container */}
      <div className="relative">
        {/* Scrolling Images */}
        <div 
          className="flex gap-6 transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translateX(${-scrollY * 0.5}px)`,
            width: `${images.length * 400}px`
          }}
        >
          {images.map((image, index) => (
            <div
              key={`${image.title}-${index}`}
              className="relative flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-elevated hover:shadow-2xl transition-all duration-500 group"
              style={{
                transform: `translateY(${Math.sin((scrollY + index * 100) * 0.01) * 10}px)`,
              }}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">{image.title}</h3>
                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {image.description}
                </p>
              </div>

              {/* Floating indicator */}
              <div 
                className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full animate-pulse"
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlays for fade effect */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>

      {/* Secondary Scrolling Row (Opposite Direction) */}
      <div className="relative mt-8">
        <div 
          className="flex gap-6 transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translateX(${scrollY * 0.3}px)`,
            width: `${images.length * 300}px`
          }}
        >
          {images.reverse().map((image, index) => (
            <div
              key={`reverse-${image.title}-${index}`}
              className="relative flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-soft hover:shadow-elevated transition-all duration-500 group"
              style={{
                transform: `translateY(${Math.sin((scrollY + index * 150) * 0.008) * 8}px)`,
              }}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
              
              {/* Minimal content overlay */}
              <div className="absolute bottom-3 left-3 right-3">
                <h4 className="text-white text-sm font-semibold">{image.title}</h4>
              </div>
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
};

export default HorizontalScrollGallery;