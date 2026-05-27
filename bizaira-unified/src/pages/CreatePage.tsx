import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import {
  Camera,
  MessageSquare,
  BarChart3,
  Clock,
  Calculator,
  Calendar,
} from "lucide-react";

const NAVY = "#000810";
const GRAY_TEXT = "#6B7280";

const CreatePage = () => {
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const isHe = lang === "he";
  const [selectedTool, setSelectedTool] = useState("message");

  const tools = [
    {
      id: "studio",
      icon: Camera,
      titleKey: "tool.studio.title",
      descKey: "tool.studio.desc",
      route: "/create/product-photos",
    },
    {
      id: "message",
      icon: MessageSquare,
      titleKey: "tool.messages.title",
      descKey: "tool.messages.desc",
      route: "/create/messages",
    },
    {
      id: "analytics",
      icon: BarChart3,
      titleKey: "tool.analytics.title",
      descKey: "tool.analytics.desc",
      route: "/create/analytics",
    },
    {
      id: "time",
      icon: Clock,
      titleKey: "tool.time.title",
      descKey: "tool.time.desc",
      route: "/create/time",
    },
    {
      id: "pricing",
      icon: Calculator,
      titleKey: "tool.pricing.title",
      descKey: "tool.pricing.desc",
      route: "/create/pricing",
    },
    {
      id: "calendar",
      icon: Calendar,
      titleKey: "tool.calendar.title",
      descKey: "tool.calendar.desc",
      route: "/journal",
    },
  ];

  return (
    <div className="min-h-screen pb-32 bg-soft-cream text-[#001830]" dir={isHe ? "rtl" : "ltr"}>
      <div className="px-6 pt-10 pb-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: GRAY_TEXT, letterSpacing: "0.1em" }}>
          {t("create.heading")}
        </p>

        <h1 className="text-4xl font-black mb-2" style={{ color: NAVY, fontFamily: "'Playfair Display', serif" }}>
          {t("create.title")}
        </h1>

        <p className="text-base leading-relaxed max-w-2xl" style={{ color: GRAY_TEXT }}>
          {t("create.subheading")}
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 space-y-4">
        {tools.map((tool, i) => {
          const IconComp = tool.icon;
          const isSelected = selectedTool === tool.id;

          return (
            <button
              key={tool.id}
              onClick={() => {
                setSelectedTool(tool.id);
                navigate(tool.route);
              }}
              className={`luxury-card group w-full overflow-hidden rounded-[16px] transition duration-300 ${isSelected ? "shadow-soft-business ring-1 ring-[#001830]/20" : "hover:shadow-soft-business"}`}
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <div className="luxury-card-inner">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#001830]/10 text-[#001830]">
                    <IconComp size={22} />
                  </div>

                  <div className="space-y-3">
                    <h2 className="luxury-card-title text-2xl">{t(tool.titleKey)}</h2>
                    <p className="luxury-card-text text-sm leading-7">{t(tool.descKey)}</p>
                  </div>
                </div>

                <div className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-soft-muted">
                  {isHe ? "פתח" : "Open"}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CreatePage;
