import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Calculator,
  MessageCircle,
  ShoppingBag,
  Radio,
  Users,
  BarChart3,
  ArrowRight,
  Check,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Calculator,
      title: t.agriculturalCalculations,
      description: "Make accurate agricultural decisions with our comprehensive calculation tools.",
      features: [
        "Crop yield predictions",
        "Fertilizer requirements calculator", 
        "Irrigation planning tools",
        "Seed quantity estimator",
        "Cost-benefit analysis",
      ],
    },
    {
      icon: Radio,
      title: t.realTimeInformation,
      description: "Stay informed with up-to-date data that matters to your farming operations.",
      features: [
        "Live market prices",
        "Weather forecasts",
        "Pest and disease alerts",
        "Agricultural news",
        "Policy updates",
      ],
    },
    {
      icon: MessageCircle,
      title: t.expertAdvice,
      description: "Connect with experienced professionals for personalized agricultural guidance.",
      features: [
        "Extension officer consultations",
        "Agronomist recommendations",
        "Pest management advice",
        "Crop rotation guidance",
        "Best practices sharing",
      ],
    },
    {
      icon: ShoppingBag,
      title: t.verifiedSuppliers,
      description: "Access a network of trusted suppliers for all your agricultural needs.",
      features: [
        "Certified seed suppliers",
        "Quality fertilizer providers",
        "Farm equipment dealers",
        "Agrochemical companies",
        "Irrigation system vendors",
      ],
    },
    {
      icon: Users,
      title: t.networkConnection,
      description: "Build valuable relationships across Tanzania's agricultural ecosystem.",
      features: [
        "Farmer groups",
        "Dealer networks",
        "Company partnerships",
        "Extension officer connections",
        "Cooperative linkages",
      ],
    },
    {
      icon: BarChart3,
      title: t.analyticsDashboard,
      description: "Track performance and make data-driven decisions for your farm.",
      features: [
        "Production tracking",
        "Sales analytics",
        "Expense monitoring",
        "Trend analysis",
        "Performance reports",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 relative overflow-hidden min-h-[60vh]">
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
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-white text-sm font-medium border border-white/40 shadow-lg">
                {t.ourServices}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-2xl [text-shadow:_2px_2px_4px_rgb(0_0_0_/_50%)]">
                {t.comprehensiveAgriSolutions}
              </h1>
              <p className="text-lg md:text-xl text-white/95 leading-relaxed drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_40%)]">
                {t.servicesHeroDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                  >
                    <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center shadow-elevated">
                      <service.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      {service.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-3">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/10 via-accent/5 to-primary/5 p-8 flex items-center justify-center">
                      <service.icon className="w-32 h-32 text-primary/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.readyToGetStarted}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t.joinAdinasToday}
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  {t.createYourAccount}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
