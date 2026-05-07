import { useNavigate } from "react-router-dom";
import { Wand2, User, BarChart3, CreditCard, HelpCircle } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/hooks/useAuth";
import { getGuestSession } from "@/lib/guest-session";
import { safeGetSessionItem } from "@/lib/safe-storage";
import { getActivityStats } from "@/lib/activity-tracker";

// Business-Luxury Color Palette (NO GOLD)
const NAVY = "#0D2344";
const CREAM = "#FBF4E8";
const OFF_WHITE = "#F5F0E8";
const LIGHT_TEXT = "#747474";

const HomePage = () => {
  const { lang } = useI18n();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const isHe = lang === "he";
  const isGuest = !user && safeGetSessionItem("onboarding_complete") === "true" && !!getGuestSession();
  const guestSession = isGuest ? getGuestSession() : null;

  const userName = profile?.full_name || user?.user_metadata?.full_name || (isGuest ? (isHe ? "אורח" : "Guest") : (isHe ? "משתמש" : "User"));
  const { creationsCount, downloadsCount, totalActions, remainingActions } = getActivityStats();

  // Feature cards matching specification exactly
  const features = [
    {
      id: 1,
      icon: Wand2,
      titleHe: "התחל ליצור",
      titleEn: "Start Creating",
      descHe: "תוכן שיווקי, תמונות וסרטונים",
      descEn: "Marketing content, photos & videos",
      path: "/create",
      bgColor: "#0D2344",
    },
    {
      id: 2,
      icon: User,
      titleHe: "אזור אישי",
      titleEn: "My Area",
      descHe: "פרופיל והגדרות אישיות",
      descEn: "Profile & Personal Settings",
      path: "/profile",
      bgColor: "#1A3A52",
    },
    {
      id: 3,
      icon: BarChart3,
      titleHe: "מעקב פעילות",
      titleEn: "Activity Tracking",
      descHe: "ניתוח עסקי ותובנות חכמות",
      descEn: "Business analytics & insights",
      path: "/create/analytics",
      bgColor: "#264B6A",
    },
    {
      id: 4,
      icon: CreditCard,
      titleHe: "ניהול מנוי",
      titleEn: "Manage Subscription",
      descHe: "תכניות ותמחור",
      descEn: "Plans & Pricing",
      path: "/pricing",
      bgColor: "#2D5A78",
    },
    {
      id: 5,
      icon: HelpCircle,
      titleHe: "תמיכה",
      titleEn: "Support",
      descHe: "עזרה וליווי מקצועי",
      descEn: "Help & Professional Guidance",
      path: "/support",
      bgColor: "#376386",
    },
  ];

  return (
    <div
      className="min-h-screen pb-24 px-4 sm:px-6 md:px-8"
      dir={isHe ? "rtl" : "ltr"}
      style={{ backgroundColor: CREAM }}
    >
      {isGuest && (
        <div className="max-w-5xl mx-auto mb-8 p-6 rounded-[28px]" style={{ backgroundColor: "#EAF3FF", border: "1px solid rgba(13, 35, 68, 0.08)" }}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: NAVY }}>
                {isHe ? "מצב אורח" : "Guest mode"}
              </p>
              <h2 className="text-2xl font-bold mt-2" style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}>
                {isHe ? "אתה ממשיך כאורח" : "You are continuing as a guest"}
              </h2>
              <p className="mt-2 text-sm" style={{ color: LIGHT_TEXT }}>
                {guestSession?.businessType
                  ? isHe
                    ? `תחום העסק: ${guestSession.businessType}`
                    : `Business type: ${guestSession.businessType}`
                  : isHe
                  ? "המשך לדפדף וליצור. התחבר כדי לשמור את היצירות שלך." 
                  : "Browse and create. Sign in to save your work."}
              </p>
            </div>
            <button
              onClick={() => navigate("/auth")}
              className="rounded-2xl px-5 py-3 font-semibold"
              style={{ backgroundColor: NAVY, color: "#FFFFFF" }}
            >
              {isHe ? "התחבר לשמירה" : "Sign in to save"}
            </button>
          </div>
        </div>
      )}
      {/* Header Greeting - Specification Format */}
      <div className="pt-8 pb-8 max-w-5xl mx-auto">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-3"
          style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
        >
          {isHe ? `שלום ${userName},` : `Hello ${userName},`}
        </h1>
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
          style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif", fontWeight: 700 }}
        >
          {isHe ? "מה תרצה לבנות היום?" : "What would you like to build today?"}
        </h2>
        <p className="text-base sm:text-lg" style={{ color: LIGHT_TEXT }}>
          {isHe
            ? "בחר כלי מהרשתוח לתחת ותתחיל ליצור תוכן שיווקי, ניתוח עסקי ועוד."
            : "Choose a tool below and start creating marketing content, business analytics and more."}
        </p>
      </div>

      {/* Feature Cards Grid - Spec Section: Main Feature Cards */}
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => navigate(feature.path)}
                className="group relative overflow-hidden rounded-2xl p-6 sm:p-7 text-left transition-all duration-300 hover:shadow-xl active:scale-95"
                style={{
                  backgroundColor: feature.bgColor,
                  boxShadow: "0 4px 12px rgba(13, 35, 68, 0.1)",
                }}
              >
                {/* Hover effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                  style={{ backgroundColor: "#FFFFFF" }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <IconComponent
                      size={32}
                      strokeWidth={1.5}
                      style={{ color: "#FFFFFF" }}
                    />
                  </div>
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ color: "#FFFFFF", fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {isHe ? feature.titleHe : feature.titleEn}
                  </h3>
                  <p
                    className="text-sm sm:text-base"
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                  >
                    {isHe ? feature.descHe : feature.descEn}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-1.5 origin-left group-hover:scale-x-100 transform scale-x-0 transition-transform duration-300"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl"
          style={{ backgroundColor: OFF_WHITE }}
        >
          <div>
            <p
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}
            >
              {creationsCount}
            </p>
            <p className="text-xs sm:text-sm mt-2" style={{ color: LIGHT_TEXT }}>
              {isHe ? "יצירות" : "Creations"}
            </p>
          </div>
          <div>
            <p
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}
            >
              {downloadsCount}
            </p>
            <p className="text-xs sm:text-sm mt-2" style={{ color: LIGHT_TEXT }}>
              {isHe ? "הורדות" : "Downloads"}
            </p>
          </div>
          <div>
            <p
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}
            >
              {remainingActions}
            </p>
            <p className="text-xs sm:text-sm mt-2" style={{ color: LIGHT_TEXT }}>
              {isHe ? "קרדיטים נותרו" : "Credits left"}
            </p>
          </div>
          <div>
            <p
              className="text-3xl sm:text-4xl font-bold"
              style={{ color: NAVY, fontFamily: "'Montserrat', sans-serif" }}
            >
              {totalActions}
            </p>
            <p className="text-xs sm:text-sm mt-2" style={{ color: LIGHT_TEXT }}>
              {isHe ? "סך כל הפעולות" : "Total actions"}
            </p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HomePage;
