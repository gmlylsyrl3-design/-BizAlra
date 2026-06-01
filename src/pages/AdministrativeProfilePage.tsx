import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/lib/i18n";
import { ArrowLeft, Building2, Lock, ShieldCheck, Sparkles, UserRound } from "lucide-react";

const AdministrativeProfilePage = () => {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const { profile, user } = useAuth();
  const isHe = lang === "he";

  const fullName = profile?.full_name ?? user?.user_metadata?.full_name ?? (isHe ? "משתמש BizAIra" : "BizAIra User");
  const secureEmail = profile?.email ?? user?.email ?? (isHe ? "לא זמין" : "Not available");
  const telephone = user?.phone ?? (isHe ? "לא צוין" : "Not specified");
  const businessEntity = profile?.business_type
    ? `${profile.business_type} Workspace`
    : isHe
      ? "ישות עסקית רשומה"
      : "Registered business entity";
  const industrySector = profile?.business_type ?? (isHe ? "סיווג התעשייה יתעדכן בהמשך" : "Industry classification will be refined later");
  const audience = profile?.target_audience ?? (isHe ? "קהל היעד יתעדכן בהמשך" : "Target audience will be refined later");
  const operatingPerimeter = isHe ? "אזור פעילות ראשי – לא צוין" : "Primary operating perimeter – not specified";
  const baselineSummary = [
    {
      label: isHe ? "חזון עסקי" : "Business vision",
      value: profile?.business_goals ?? (isHe ? "הלקוח לא ציין חזון עסקי במהלך ההקמה." : "The client did not provide a business vision during onboarding."),
    },
    {
      label: isHe ? "מטרות רבעוניות" : "Quarterly goals",
      value: isHe ? "מטרות ניהול, פיתוח והאצת התהליכים העסקיים יתעדכנו בממשק המנוי." : "Management, growth, and acceleration goals will be surfaced in the subscription dashboard.",
    },
    {
      label: isHe ? "אסטרטגיית מותג מובילה" : "Lead brand strategy",
      value: isHe ? "המסלול האסטרטגי נשמר כמסד נתונים קבוע לצורך תכנון AI ותוכן מקצועי." : "The strategic path is preserved as a locked baseline for AI planning and brand execution.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#001830]" dir={isHe ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-start justify-between gap-4 text-right">
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-2 rounded-full border border-transparent bg-transparent px-0 py-2 text-sm font-bold text-[#001830] transition hover:text-[#0B2A4B]"
          >
            <ArrowLeft size={16} className="rotate-180" />
            {isHe ? "→ חזרה למרכז הבקרה הניהולי" : "→ Back to Executive Control Center"}
          </button>

          <div className="max-w-3xl text-right">
            <p className="luxury-page-eyebrow mb-3">{isHe ? "פרופיל מנהל ומאפייני מערכת" : "Administrative Profile & System Attributes"}</p>
            <h1 className="luxury-page-title text-3xl sm:text-4xl">{isHe ? "פרופיל ניהול סגור לצפייה בלבד" : "Read-only administrative profile"}</h1>
            <p className="luxury-page-copy mt-3">{isHe ? "תצוגת נתונים immutability מקצועית, שמירה קפדנית על המידע העסקי וההגדרות הראשוניות." : "Professional immutable data presentation with strict preservation of onboarding baseline records."}</p>
          </div>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="luxury-card p-6 text-right">
            <div className="mb-5 flex items-center gap-3 text-[#001830]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#001830]/10">
                <ShieldCheck size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#001830]/60">{isHe ? "פרטי מנהל מערכת" : "Administrative credentials"}</p>
                <h2 className="text-lg font-semibold text-[#000F21]">{isHe ? "נתוני הרשאה ומנהל" : "Access and ownership details"}</h2>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: isHe ? "שם מלא" : "Full Name", value: fullName, icon: UserRound },
                { label: isHe ? "כתובת אימייל" : "Secure Email", value: secureEmail, icon: ShieldCheck },
                { label: isHe ? "טלפון ליצירת קשר" : "Telephone", value: telephone, icon: ShieldCheck },
                { label: isHe ? "תפקיד במערכת" : "System Role", value: isHe ? "מנהל מערכת ראשי" : "Root Administrator", icon: Building2 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[12px] border border-[rgba(0,15,33,0.04)] bg-[#FAF9F6] p-4 shadow-[0_4px_20px_rgba(0,15,33,0.02)]">
                    <div className="mb-2 flex items-center gap-2 text-[#001830]/70">
                      <Icon size={15} />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{item.label}</span>
                    </div>
                    <p className="text-[14px] font-medium text-[#475569]">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="luxury-card p-6 text-right">
            <div className="mb-5 flex items-center gap-3 text-[#001830]">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#001830]/10">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#001830]/60">{isHe ? "מאפייני פעילות עסקית" : "Business intelligence parameters"}</p>
                <h2 className="text-lg font-semibold text-[#000F21]">{isHe ? "נתוני העסק והסיווג" : "Business and sector classification"}</h2>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: isHe ? "שם העסק" : "Registered Business Entity", value: businessEntity },
                { label: isHe ? "סיווג תעשייה" : "Industry Classification Sector", value: industrySector },
                { label: isHe ? "קהל יעד מרכזי" : "Primary Target Audience Demographic", value: audience },
                { label: isHe ? "אזור פעילות גאוגרפי" : "Geographical Operation Perimeter", value: operatingPerimeter },
              ].map((item) => (
                <div key={item.label} className="rounded-[12px] border border-[rgba(0,15,33,0.04)] bg-[#FAF9F6] p-4 shadow-[0_4px_20px_rgba(0,15,33,0.02)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#001830]/60">{item.label}</p>
                  <p className="mt-2 text-[14px] font-medium text-[#475569]">{item.value}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <article className="luxury-card mt-6 p-6 text-right">
          <div className="mb-5 flex items-center gap-3 text-[#001830]">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#001830]/10">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#001830]/60">{isHe ? "נתוני אפיון ראשוניים - AI Baseline" : "Initial setup AI baseline overview"}</p>
              <h2 className="text-lg font-semibold text-[#000F21]">{isHe ? "סיכום המידע שהוזן בהקמה" : "Baseline summary from the setup answers"}</h2>
            </div>
          </div>

          <div className="grid gap-4">
            {baselineSummary.map((item) => (
              <div key={item.label} className="rounded-[12px] border border-[rgba(0,15,33,0.04)] bg-[#FAF9F6] p-4 shadow-[0_4px_20px_rgba(0,15,33,0.02)]">
                <div className="mb-2 flex items-center gap-2 text-[#001830]/70">
                  <Lock size={14} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{item.label}</span>
                </div>
                <p className="text-[14px] font-medium text-[#475569] leading-7">{item.value}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default AdministrativeProfilePage;
