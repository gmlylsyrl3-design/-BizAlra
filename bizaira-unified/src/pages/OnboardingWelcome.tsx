import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import bizairaLogo from "@/assets/bizaira-logo.png";
import { useI18n } from "@/lib/i18n";

const LANG_OPTIONS = [
  { id: "en", label: "English", font: "Assistant, sans-serif" },
  { id: "he", label: "עברית", font: "Heebo, sans-serif" },
] as const;

type LangOption = (typeof LANG_OPTIONS)[number]["id"];

const OnboardingWelcome = () => {
  const navigate = useNavigate();
  const { lang, setLang } = useI18n();
  const [selectedLang, setSelectedLang] = useState<LangOption>(lang as LangOption);

  const handleSelect = (option: LangOption) => {
    setSelectedLang(option);
    setLang(option);
  };

  const handleContinue = () => {
    if (selectedLang) {
      setLang(selectedLang);
      navigate("/onboarding");
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0]" dir={selectedLang === "he" ? "rtl" : "ltr"}>
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="bg-white/95 border border-slate-200 shadow-[0_35px_90px_-40px_rgba(0,0,0,0.22)] rounded-[32px] overflow-hidden">
          <div className="flex flex-col gap-6 border-b border-slate-200 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <img src={bizairaLogo} alt="BizAIra" className="h-11 w-auto" />
              <div>
                <div className="text-xs uppercase tracking-[0.32em] text-slate-500 font-semibold" style={{ fontFamily: "Assistant, sans-serif" }}>
                  Step 1 of 4
                </div>
                <h1 className="mt-2 text-3xl font-bold text-[#06172A]" style={{ fontFamily: "Assistant, sans-serif" }}>
                  Which language do you prefer?
                </h1>
              </div>
            </div>
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5"
              style={{ fontFamily: "Assistant, sans-serif" }}
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          <div className="px-6 py-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {LANG_OPTIONS.map((option) => {
                const isActive = selectedLang === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className={`flex h-40 flex-col items-center justify-center rounded-[28px] border text-lg font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-[#06172A] text-white shadow-[0_20px_60px_-40px_rgba(6,23,42,0.45)]"
                        : "bg-white text-[#06172A] border-[#06172A] shadow-[0_10px_30px_-25px_rgba(6,23,42,0.18)]"
                    }`}
                    style={{ fontFamily: option.font }}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-[28px] border border-slate-200 bg-[#F5F3EF] p-5 shadow-sm">
              <p className="text-sm text-slate-600 leading-7" style={{ fontFamily: "Assistant, sans-serif" }}>
                {selectedLang === "he"
                  ? "בחר/י עברית עבור ממשק RTL ויישום מלא בעברית, כאשר BizAIra ו-AI נשארים באנגלית."
                  : "Choose English for the app interface, with BizAIra and AI always kept in English."}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-6 py-5">
            <div className="text-sm text-slate-500" style={{ fontFamily: "Assistant, sans-serif" }}>
              {selectedLang === "he" ? "שפה נבחרה:" : "Selected language:"} <span className="font-semibold text-slate-900">{selectedLang === "he" ? "עברית" : "English"}</span>
            </div>
            <button
              onClick={handleContinue}
              disabled={!selectedLang}
              className="inline-flex items-center gap-2 rounded-2xl bg-[#06172A] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#091a2a] disabled:cursor-not-allowed disabled:opacity-50"
              style={{ fontFamily: "Assistant, sans-serif" }}
            >
              Continue
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWelcome;
