import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Target, Eye, Users, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Mission",
    description:
      "To empower Tanzania's agricultural community with digital tools that improve productivity, enhance access to information, and foster meaningful connections across the value chain.",
  },
  {
    icon: Eye,
    title: "Vision",
    description:
      "To be the leading agricultural digital platform in East Africa, driving innovation and sustainability in farming practices while creating prosperity for all stakeholders.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Building a network of farmers, extension officers, dealers, and companies who collaborate, share knowledge, and grow together for mutual benefit.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Committed to delivering high-quality services, verified products, and expert advice that our users can trust and rely upon for their agricultural success.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium">
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
                Building the Future of Agriculture in Tanzania
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                ADINAS connects extension officers, agri dealers, and agri companies 
                in one unified system, revolutionizing how agricultural information 
                flows and business is conducted.
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
                Our Story
              </h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p className="text-lg leading-relaxed">
                  ADINAS was born from a simple observation: Tanzania's agricultural 
                  sector, despite its immense potential, faced significant challenges 
                  in information access, collaboration, and connecting with verified 
                  suppliers.
                </p>
                <p className="text-lg leading-relaxed">
                  Farmers struggled to get timely advice, dealers found it hard to 
                  reach their customers, and extension officers lacked the tools to 
                  effectively serve their communities. We saw an opportunity to 
                  create a digital bridge that would unite these stakeholders.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, ADINAS serves thousands of users across Tanzania, providing 
                  real-time agricultural information, expert advice, calculation tools, 
                  and direct connections to verified suppliers of agricultural inputs.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Our Values
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="p-8 rounded-2xl bg-background border border-border hover:shadow-elevated transition-all duration-300 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                >
                  <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
