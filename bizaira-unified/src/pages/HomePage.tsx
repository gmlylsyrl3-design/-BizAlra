import { Link } from "react-router-dom";
import SparkleIcon from "@/components/SparkleIcon";
import { Sparkles, ArrowLeft, ArrowRight, Camera, MessageSquare, BarChart3, Clock, DollarSign, HelpCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";

const HomePage = () => {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const isHe = lang === "he";
  const BackArrow = lang === "he" ? ArrowLeft : ArrowRight;
  const userName = user?.user_metadata?.full_name;

  const tools = [
    { title: t("tool.photos.title"), desc: t("tool.photos.desc"), to: "/create/product-photos", Icon: Camera },
    { title: t("tool.messages.title"), desc: t("tool.messages.desc"), to: "/create/messages", Icon: MessageSquare },
    { title: t("tool.analytics.title"), desc: t("tool.analytics.desc"), to: "/create/analytics", Icon: BarChart3 },
    { title: t("tool.time.title"), desc: t("tool.time.desc"), to: "/create/time", Icon: Clock },
    { title: t("tool.pricing.title"), desc: t("tool.pricing.desc"), to: "/create/pricing", Icon: DollarSign },
  ];

  const slides = [
    { title: t("home.slide1.title"), desc: t("home.slide1.desc") },
    { title: t("home.slide2.title"), desc: t("home.slide2.desc") },
    { title: t("home.slide3.title"), desc: t("home.slide3.desc") },
  ];

  return (
    <div className="px-4 pt-8 pb-4">
      {/* Hero */}
      <div className="text-center mb-12 animate-float-up pt-4">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight text-center" style={{color: "#001830", fontFamily: "'Playfair Display', serif"}}>
          {userName ? (isHe ? `המוח העסקי שלך: ${userName}, מה תרצה לעשות היום?` : `Your Business Brain: ${userName}, what would you like to do today?`) : t("home.hero.title2")}
        </h1>
        <p className="text-primary text-base md:text-lg leading-relaxed max-w-md mx-auto mb-7" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 500}}>
          {userName ? (isHe ? "המערכת מוכנה לשרת את העסק שלך עם כל הכלים הנכונים" : "The system is ready to serve your business with the right tools") : t("home.hero.desc")}
        </p>

        {userName && (
          <div className="max-w-2xl mx-auto mb-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/create" className="luxury-card rounded-2xl bg-luxury-navy/95 text-white px-5 py-4 flex items-center justify-center gap-2 hover:shadow-xl transition-all">
              <Sparkles size={18} />
              {isHe ? "יצירה" : "Create"}
            </Link>
            <Link to="/dashboard" className="luxury-card rounded-2xl bg-white border border-luxury-gray-200 px-5 py-4 flex items-center justify-center gap-2 hover:shadow-lg transition-all">
              <ArrowRight size={18} className="text-luxury-navy" />
              {isHe ? "אזור אישי" : "My Area"}
            </Link>
            <Link to="/support" className="luxury-card rounded-2xl bg-white border border-luxury-gray-200 px-5 py-4 flex items-center justify-center gap-2 hover:shadow-lg transition-all">
              <HelpCircle size={18} className="text-luxury-navy" />
              {isHe ? "תמיכה" : "Support"}
            </Link>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/create"
            className="gradient-glow glow-shadow text-primary-foreground font-bold px-8 py-4 rounded-2xl text-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 animate-glow-pulse"
            style={{fontFamily: "'Montserrat', sans-serif"}}
          >
            <Sparkles size={20} />
            {t("home.cta.start")}
          </Link>
          <Link
            to="/auth"
            className="bg-card border border-border text-foreground font-semibold px-8 py-4 rounded-2xl text-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:border-primary/40"
            style={{fontFamily: "'Montserrat', sans-serif"}}
          >
            {t("home.cta.auth")}
            <BackArrow size={18} />
          </Link>
        </div>
      </div>

      {/* Explanation slides */}
      <div className="mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms`, fontFamily: "'Montserrat', sans-serif" }}
            >
              <h4 className="font-bold text-sm text-foreground mb-2" style={{fontWeight: 700}}>{slide.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{slide.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools grid */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-5 text-foreground flex items-center gap-2" style={{fontFamily: "'Montserrat', sans-serif", fontWeight: 700}}>
          <SparkleIcon size={14} />
          {t("home.tools.title")}
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {tools.map((tool, i) => {
            const Icon = tool.Icon;
            return (
              <Link
                key={tool.title}
                to={tool.to}
                className="glass-card rounded-2xl p-4 hover:scale-[1.03] hover:glow-shadow transition-all duration-300 group"
                style={{ animationDelay: `${i * 80}ms`, fontFamily: "'Montserrat', sans-serif" }}
              >
                <div className={`flex items-start gap-3 ${isHe ? "flex-row-reverse text-right" : ""}`}>
                  <div className="w-11 h-11 rounded-2xl bg-white/90 flex items-center justify-center shadow-sm">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-foreground group-hover:gradient-glow-text transition-all" style={{fontWeight: 700}}>
                      {tool.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {tool.desc}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
