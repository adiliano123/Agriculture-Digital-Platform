import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Target, Eye, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();

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
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 md:py-28 gradient-hero">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground text-sm font-medium">
                {t.aboutUs}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground">
                {t.aboutHeroTitle}
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/80 leading-relaxed">
                {t.aboutHeroDesc}
              </p>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
                {t.ourStory}
              </h2>
              <div className="prose prose-lg mx-auto text-muted-foreground">
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
          </div>
        </section>

        {/* Values */}
        <section className="py-20 md:py-28 bg-card">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                {t.ourValues}
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
