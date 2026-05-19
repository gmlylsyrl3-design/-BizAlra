import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import bizairaLogo from "@/assets/bizaira-logo.png";
import { useI18n } from "@/lib/i18n";

const NAVY = "#001830";
const OFFWHITE = "#F8F9FA";
const WHITE = "#FFFFFF";
const DARK_TEXT = "#2D3748";

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  const { lang, setLang, t } = useI18n();
  const isHe = lang === "he";

  const handleSelect = (option: "en" | "he") => {
    setLang(option);
  };

  const handleBack = () => {
    navigate("/");
  };

  const handleContinue = () => {
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]" dir={isHe ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="rounded-[32px] bg-white px-6 py-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src={bizairaLogo} alt="BizAIra" className="h-11 w-auto" />
              <div>
                <div className="text-xs uppercase tracking-[0.32em] font-semibold" style={{ color: NAVY }}>
                  {t("onboarding.welcome.step")}
                </div>
                <h1 className="mt-2 text-3xl font-bold" style={{ color: NAVY }}>
                  {t("onboarding.welcome.title")}
                </h1>
              </div>
            </div>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#001830] px-4 py-3 text-sm font-semibold"
              style={{ color: NAVY, backgroundColor: WHITE }}
            >
              <ArrowLeft size={16} />
              {t("ui.back")}
            </button>
          </div>

          <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#F8F9FA]">
            <div className="h-full rounded-full" style={{ width: "25%", backgroundColor: NAVY }} />
          </div>
        </div>

        <div className="rounded-[32px] bg-white mt-8 px-6 py-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => handleSelect("en")}
              className="flex h-40 flex-col items-center justify-center rounded-xl border border-gray-200 bg-[#F8F9FA] text-lg font-semibold text-[#2D3748] transition-colors duration-200 ease-in-out focus:outline-none"
              style={{
                backgroundColor: lang === "en" ? NAVY : OFFWHITE,
                color: lang === "en" ? WHITE : DARK_TEXT,
                borderColor: lang === "en" ? NAVY : "#E5E7EB",
              }}
            >
              {t("onboarding.languages.english")}
            </button>

            <button
              type="button"
              onClick={() => handleSelect("he")}
              className="flex h-40 flex-col items-center justify-center rounded-xl border border-gray-200 bg-[#F8F9FA] text-lg font-semibold text-[#2D3748] transition-colors duration-200 ease-in-out focus:outline-none"
              style={{
                backgroundColor: lang === "he" ? NAVY : OFFWHITE,
                color: lang === "he" ? WHITE : DARK_TEXT,
                borderColor: lang === "he" ? NAVY : "#E5E7EB",
              }}
            >
              {t("onboarding.languages.hebrew")}
            </button>
          </div>

          <div className="mt-8 rounded-[24px] bg-[#F8F9FA] p-5">
            <p className="text-sm leading-7" style={{ color: NAVY }}>
              {t("onboarding.welcome.description")}
            </p>
          </div>

          <div className="mt-6 border-t border-[#E5E7EB] pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="text-sm font-medium" style={{ color: NAVY }}>
                {t("onboarding.selectedLanguage", { lang: isHe ? "עברית" : "English" })}
              </div>
              <button
                onClick={handleContinue}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#001830] px-8 py-3 text-sm font-semibold text-white"
              >
                {isHe ? "המשך" : "Continue"}
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
