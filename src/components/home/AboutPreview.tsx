import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";

const features = [
  "Connect with verified agricultural suppliers",
  "Access expert advice from extension officers",
  "Real-time market prices and weather updates",
  "Comprehensive farm management tools",
];

const AboutPreview = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Visual */}
          <div className="relative animate-fade-in">
            <div className="aspect-square max-w-md mx-auto lg:max-w-none rounded-3xl bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 p-8 lg:p-12">
              <div className="w-full h-full rounded-2xl gradient-hero flex items-center justify-center shadow-elevated">
                <div className="text-center text-primary-foreground p-8">
                  <div className="text-6xl md:text-7xl font-bold mb-2">A</div>
                  <div className="text-lg md:text-xl font-medium opacity-90">
                    Agriculture Digital
                  </div>
                  <div className="text-lg md:text-xl font-medium opacity-90">
                    Information &amp; Networking
                  </div>
                  <div className="text-lg md:text-xl font-medium opacity-90">
                    Advisory System
                  </div>
                </div>
              </div>
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30 animate-float" />
            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 animate-float"
              style={{ animationDelay: "1s" }}
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
              About ADINAS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Transforming Tanzania's Agricultural Ecosystem
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              ADINAS is a comprehensive digital platform designed to bridge the gap 
              between farmers, extension officers, agri dealers, and agricultural 
              companies across Tanzania. Our mission is to improve productivity, 
              enhance information access, and foster collaboration throughout the 
              agricultural value chain.
            </p>

            {/* Features List */}
            <ul className="space-y-3 py-4">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button variant="default" size="lg" asChild>
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
