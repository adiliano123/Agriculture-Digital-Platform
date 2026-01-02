import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-agriculture.jpg";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tanzania agricultural landscape"
          className="w-full h-full object-cover transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translateY(${scrollY * 0.5}px) scale(${1.1 + scrollY * 0.0001})`,
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40 transition-opacity duration-300"
          style={{
            opacity: Math.max(0.4, 1 - scrollY * 0.001),
          }}
        />
      </div>

      {/* Floating Elements for Enhanced Parallax */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {/* Floating particles with different speeds */}
        <div 
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-accent/30 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.1}px)`,
          }}
        />
        <div 
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-primary/20 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.4}px) translateX(${-scrollY * 0.15}px)`,
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent/40 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.05}px)`,
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary/15 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.35}px) translateX(${scrollY * 0.08}px)`,
            animationDelay: '0.5s'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/2 w-1 h-1 bg-accent/25 rounded-full animate-pulse"
          style={{
            transform: `translateY(${scrollY * 0.25}px) translateX(${-scrollY * 0.12}px)`,
            animationDelay: '1.5s'
          }}
        />
      </div>

      {/* Content with Counter-Parallax */}
      <div 
        className="container mx-auto px-4 relative z-10"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div 
          className="max-w-2xl space-y-8"
          style={{
            transform: `translateY(${-scrollY * 0.05}px)`,
          }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              {t.tanzaniaNetwork}
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-slide-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            {t.heroTitle}{" "}
            <span className="text-accent">{t.heroSubtitle}</span>{" "}
            for a Better Tomorrow
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            {t.heroDescription}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 animate-slide-up"
            style={{ animationDelay: "0.4s", opacity: 0 }}
          >
            <Button variant="accent" size="xl" asChild>
              <Link to="/register">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link to="/about">Learn More</Link>
            </Button>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 pt-8 border-t border-primary-foreground/20 animate-fade-in"
            style={{ animationDelay: "0.5s", opacity: 0 }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-accent">
                <Users className="w-5 h-5" />
                <span className="text-2xl font-bold text-primary-foreground">1000+</span>
              </div>
              <p className="text-sm text-primary-foreground/70">Active Users</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-accent">
                <TrendingUp className="w-5 h-5" />
                <span className="text-2xl font-bold text-primary-foreground">50+</span>
              </div>
              <p className="text-sm text-primary-foreground/70">Regions Covered</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-accent">
                <Shield className="w-5 h-5" />
                <span className="text-2xl font-bold text-primary-foreground">100%</span>
              </div>
              <p className="text-sm text-primary-foreground/70">Verified Inputs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
