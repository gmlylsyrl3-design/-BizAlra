import { useI18n } from "@/lib/i18n";

const PricingPage = () => {
  const { t, lang } = useI18n();
  const isHe = lang === "he";

  const plans = [
    {
      name: lang === "he" ? "חינם" : "Free",
      price: lang === "he" ? "₪0" : "$0",
      priceLabel: t("pricing.startFree"),
      highlight: false,
      features: [
        "Controlled allocation of up to 5 AI production cycles per month",
        "Basic access to the business management tools and interfaces",
        "A streamlined workflow for professional launch preparation",
      ],
      featuresHe: [
        "הקצאה מבוקרת של עד 5 מחזורי הפקה חודשיים בטכנולוגיית AI",
        "גישה בסיסית למערך הכלים ולממשקי הניהול העסקיים",
        "ממשק מקצועי לניהול תהליכים ראשוניים",
      ],
    },
    {
      name: lang === "he" ? "Pro" : "Pro",
      price: lang === "he" ? "₪29" : "$29",
      period: lang === "he" ? "/ לחודש" : "/ month",
      priceLabel: t("pricing.upgradeNow"),
      highlight: true,
      features: [
        "Unlimited AI-driven creative production cycles",
        "Advanced rendering engine with ultimate resolution fidelity",
        "Full integration with prospective pricing and goal-driven time management",
      ],
      featuresHe: [
        "הפקת תכנים ומחזורי יצירה מבוססי AI ללא הגבלה נפחית",
        "מנוע עיבוד ורנדור מתקדם ברזולוציה אולטימטיבית",
        "אינטגרציה מלאה לכלי תמחור פרוספקטיביים וניהול זמן מבוסס יעדים",
      ],
    },
    {
      name: lang === "he" ? "Business" : "Business",
      price: lang === "he" ? "₪59" : "$59",
      period: lang === "he" ? "/ לחודש" : "/ month",
      priceLabel: t("pricing.upgradeNow"),
      highlight: false,
      features: [
        "Priority server routing for minimal latency and real-time processing",
        "Expanded workspace for multi-client, multi-brand professional studio management",
        "AI-driven financial analysis, business analytics and predictive reporting",
      ],
      featuresHe: [
        "ניתוב שרתים בעדיפות עליונה (זמן תגובה אפסי ועיבוד בזמן אמת)",
        "סביבת עבודה מורחבת לניהול ריבוי לקוחות, מותגים וסטודיו מקצועי",
        "מודול ניתוח פיננסי, אנליטיקה עסקית ודוחות חזויים מבוססי בינה מלאכותית",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#001830]" dir={lang === "he" ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-3xl text-right">
          <p className="luxury-page-eyebrow mb-3">{isHe ? "תמחור" : "Pricing"}</p>
          <h1 className="luxury-page-title text-4xl sm:text-5xl">
            {isHe ? "תוכניות וניהול מנוי" : "Plans & subscription management"}
          </h1>
          <p className="luxury-page-copy mt-3 max-w-2xl">
            {isHe ? "בחרו את התוכנית המתאימה לכם וראו את הכלים שמציע BizAIra בדיוק כמו בשאר הממשק." : "Choose the plan that fits your workflow and view the tools BizAIra offers in the same premium tone as the rest of the app."}
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {plans.map((plan, i) => {
            const featureList = lang === "he" ? plan.featuresHe : plan.features;
            const isPro = plan.highlight;
            return (
              <div
                key={plan.name}
                className={`group relative flex min-h-[30rem] flex-col justify-between rounded-[12px] border border-[rgba(0,15,33,0.04)] bg-[#FAF9F6] p-8 text-[#001830] shadow-[0_4px_20px_rgba(0,15,33,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-business ${isPro ? "ring-1 ring-[#001830]/10" : ""}`}
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {isPro && (
                  <div className="absolute inset-x-0 top-4 mx-auto w-max rounded-full bg-[#000B18] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#F5F5DC] shadow-sm">
                    {lang === "he" ? "הפופולרי ביותר" : "Most Popular"}
                  </div>
                )}

                <div className="space-y-8 pt-6 text-center">
                  <div className="space-y-4 px-2 text-right">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#001830]/60">
                      {lang === "he" ? "תוכנית" : "Plan"}
                    </p>
                    <h2 className="text-3xl font-semibold tracking-tight text-[#001830]">
                      {plan.name}
                    </h2>
                    <div className="space-y-1">
                      <p className="text-5xl font-extrabold tracking-tight text-[#001830]">
                        {plan.price}
                      </p>
                      {plan.period && (
                        <p className="text-sm text-[#64748B]">
                          {plan.period}
                        </p>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 text-right text-[#001830]">
                    {featureList.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-base leading-7">
                        <span className="mt-1 inline-flex h-2 w-2 rounded-full bg-current shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-[#001830] px-5 py-4 text-sm font-semibold uppercase tracking-[0.04em] text-[#FAF9F6] shadow-[0_10px_24px_rgba(0,24,48,0.12)] transition hover:bg-[#0D2E48]">
                  {plan.priceLabel}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-[#64748B]">{t("pricing.footer")}</p>
      </div>
    </div>
  );
};

export default PricingPage;
