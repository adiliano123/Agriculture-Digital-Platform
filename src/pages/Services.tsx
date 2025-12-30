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

const services = [
  {
    icon: Calculator,
    title: "Agricultural Calculations",
    description:
      "Make accurate agricultural decisions with our comprehensive calculation tools.",
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
    title: "Real-time Information",
    description:
      "Stay informed with up-to-date data that matters to your farming operations.",
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
    title: "Expert Advice",
    description:
      "Connect with experienced professionals for personalized agricultural guidance.",
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
    title: "Verified Suppliers",
    description:
      "Access a network of trusted suppliers for all your agricultural needs.",
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
    title: "Network Connection",
    description:
      "Build valuable relationships across Tanzania's agricultural ecosystem.",
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
    title: "Analytics Dashboard",
    description:
      "Track performance and make data-driven decisions for your farm.",
    features: [
      "Production tracking",
      "Sales analytics",
      "Expense monitoring",
      "Trend analysis",
      "Performance reports",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
                Comprehensive Agricultural Solutions
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                Discover the tools and resources designed to help you succeed in 
                Tanzania's agricultural sector.
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
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join ADINAS today and access all these powerful features to grow 
                your agricultural business.
              </p>
              <Button variant="hero" size="xl" asChild>
                <Link to="/register">
                  Create Your Account
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
