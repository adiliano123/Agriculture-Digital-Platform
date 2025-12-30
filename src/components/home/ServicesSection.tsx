import { Calculator, MessageCircle, ShoppingBag, Radio, Users, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Agricultural Calculations",
    description: "Perform accurate crop yield predictions, fertilizer requirements, and resource planning calculations.",
  },
  {
    icon: Radio,
    title: "Real-time Information",
    description: "Access up-to-date market prices, weather forecasts, and agricultural news from trusted sources.",
  },
  {
    icon: MessageCircle,
    title: "Expert Advice",
    description: "Connect with experienced extension officers and agricultural experts for personalized guidance.",
  },
  {
    icon: ShoppingBag,
    title: "Verified Suppliers",
    description: "Find trusted suppliers of seeds, fertilizers, and agricultural equipment in your region.",
  },
  {
    icon: Users,
    title: "Network Connection",
    description: "Build relationships with farmers, dealers, and companies across Tanzania's agricultural sector.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track your farm's performance, monitor trends, and make data-driven decisions.",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive tools and resources designed to empower Tanzania's agricultural community.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-elevated transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6 group-hover:shadow-glow transition-shadow duration-300">
                <service.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
