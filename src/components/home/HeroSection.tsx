import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import heroImage from "@/assets/hero-agriculture.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Tanzania agricultural landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl space-y-8">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm font-medium text-primary-foreground">
              Tanzania's Agricultural Network
            </span>
          </div>

          {/* Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight animate-slide-up"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            Connecting{" "}
            <span className="text-accent">Agriculture</span>{" "}
            for a Better Tomorrow
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed animate-slide-up"
            style={{ animationDelay: "0.3s", opacity: 0 }}
          >
            ADINAS connects extension officers, agri dealers, and agri companies 
            in one powerful system. Access real-time information, expert advice, 
            and verified agricultural inputs to boost productivity.
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
