import { Link } from "react-router-dom";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center shadow-soft">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ADINAS</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Connecting extension officers, agri dealers, and agri companies to transform Tanzania's agricultural ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {t.quickLinks}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {t.home}
              </Link>
              <Link
                to="/about"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {t.about}
              </Link>
              <Link
                to="/services"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {t.services}
              </Link>
              <Link
                to="/contact"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                {t.contact}
              </Link>
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Services
            </h4>
            <nav className="flex flex-col gap-2">
              {[
                "Agricultural Calculations",
                "Expert Advice",
                "Supplier Network",
                "Real-time Information",
              ].map((item) => (
                <span
                  key={item}
                  className="text-muted-foreground text-sm"
                >
                  {item}
                </span>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Contact
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Dar es Salaam, Tanzania</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+255 123 456 789</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@adinas.co.tz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ADINAS. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
