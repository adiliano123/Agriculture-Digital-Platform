import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Target, Eye, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

const About = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Target,
      title: t.mission,
      description: t.missionDesc,
    },
    {
      icon: Eye,
      title: t.vision,
      description: t.visionDesc,
    },
    {
      icon: Users,
      title: t.community,
      description: t.communityDesc,
    },
    {
      icon: Award,
      title: t.excellence,
      description: t.excellenceDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
        `
      }} />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden min-h-[60vh]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-700 hover:scale-110"
            style={{
              backgroundImage: "url('/src/assets/agric.jpg')",
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40" />
          {/* Additional subtle overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/10" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className={`inline-block px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-white text-sm font-medium border border-white/40 shadow-lg transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                {t.aboutUs}
              </span>
              <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)] transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {t.aboutHeroTitle}
              </h1>
              <p className={`text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)] transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {t.aboutHeroDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Story Content */}
              <div className={`space-y-8 transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                    {t.ourStory}
                  </h2>
                  <div className="space-y-6 text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                      {t.aboutStoryP1}
                    </p>
                    <p className="text-lg leading-relaxed">
                      {t.aboutStoryP2}
                    </p>
                    <p className="text-lg leading-relaxed">
                      {t.aboutStoryP3}
                    </p>
                  </div>
                </div>
                
                {/* Key Features */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-foreground">What Makes Us Different</h3>
                  <div className="space-y-3">
                    {[
                      "Local expertise with global technology",
                      "Multi-language support for all Tanzanians", 
                      "Real-time weather and market data",
                      "Community-driven knowledge sharing"
                    ].map((feature, index) => (
                      <div 
                        key={feature}
                        className={`flex items-center gap-3 transform transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                        style={{ transitionDelay: `${800 + index * 100}ms` }}
                      >
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Story Image */}
              <div className={`relative transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}>
                <div className="relative rounded-2xl overflow-hidden shadow-elevated hover:shadow-2xl transition-shadow duration-500">
                  <div 
                    className="aspect-[4/3] bg-cover bg-center transform transition-transform duration-700 hover:scale-105"
                    style={{
                      backgroundImage: "url('/src/assets/images.jpg')",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white text-sm font-medium">
                      Empowering farmers across Tanzania with modern agricultural solutions
                    </p>
                  </div>
                </div>
                
                {/* Floating Stats */}
                <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-6 shadow-elevated hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-bounce-slow">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2024</div>
                    <div className="text-sm text-muted-foreground">Founded</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.ourValues}
              </h2>
              <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                These core values guide everything we do and shape our commitment to Tanzania's agricultural future.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className={`group p-8 rounded-2xl bg-background border border-border hover:shadow-elevated hover:border-primary/20 transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  style={{ transitionDelay: `${1200 + index * 150}ms` }}
                >
                  <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-lg">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 transform transition-all duration-1000 delay-1800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Impact in Numbers
              </h2>
              <p className="text-lg text-muted-foreground mt-4">
                Making a real difference in Tanzania's agricultural landscape
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { number: "10,000+", label: "Farmers Supported" },
                { number: "25+", label: "Regions Covered" },
                { number: "500+", label: "Extension Officers" },
                { number: "95%", label: "User Satisfaction" }
              ].map((stat, index) => (
                <div 
                  key={stat.label}
                  className={`text-center p-6 rounded-xl bg-card border border-border hover:shadow-soft hover:scale-105 transition-all duration-500 transform hover:-translate-y-2 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                  style={{ transitionDelay: `${2000 + index * 100}ms` }}
                >
                  <div className="text-4xl font-bold text-primary mb-2 hover:scale-110 transition-transform duration-300 cursor-default">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container mx-auto px-4">
            <div className={`max-w-3xl mx-auto text-center space-y-8 transform transition-all duration-1000 delay-2400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Ready to Transform Your Agricultural Journey?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Join thousands of farmers, extension officers, and agricultural professionals 
                who are already using our platform to improve their farming practices and increase productivity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 rounded-lg gradient-hero text-primary-foreground font-semibold hover:shadow-elevated transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95">
                  Get Started Today
                </button>
                <button className="px-8 py-3 rounded-lg border border-border bg-background text-foreground font-semibold hover:bg-card hover:border-primary/30 transition-all duration-300 hover:scale-105 active:scale-95">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
