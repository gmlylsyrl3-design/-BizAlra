import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles, Mail, Lock, User, Phone, Loader2, Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getSavedGuestAnswers, createGuestSession } from "@/lib/guest-session";
import { safeSetSessionItem } from "@/lib/safe-storage";

const DEEP_MIDNIGHT_BLUE = "#001830";
const CREAM = "#F5F5DC";
const INPUT_BG = "#FEF9E7";

const AuthPage = () => {
  const { lang } = useI18n();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isHe = lang === "he";
  const [mode, setMode] = useState<"login" | "register">(() => {
    const modeParam = searchParams.get("mode")?.toLowerCase();
    return modeParam === "register" ? "register" : "login";
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const modeParam = searchParams.get("mode")?.toLowerCase();
    setMode(modeParam === "register" ? "register" : "login");
  }, [searchParams]);

  const isLogin = mode === "login";
  const pageTitle = isLogin
    ? isHe
      ? "התחברות לחשבון"
      : "Login to your account"
    : isHe
      ? "הרשמה לחשבון"
      : "Create your account";
  const bottomLinkText = isLogin
    ? isHe
      ? "עוד לא נרשמת? להרשמה"
      : "Not registered? Register"
    : isHe
      ? "כבר יש לך חשבון? להתחברות"
      : "Already have an account? Login";

  const switchMode = (nextMode: "login" | "register") => {
    setFade(false);
    setTimeout(() => {
      setMode(nextMode);
      navigate(`/auth?mode=${nextMode}`, { replace: true });
      setFade(true);
    }, 200);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isLogin && (!name || !email || !password || !phone)) {
      toast.error(isHe ? "נא למלא את כל השדות" : "Please fill in all fields");
      return;
    }
    if (!isLogin && !agreePolicy) {
      toast.error(isHe ? "אנא קבל את מדיניות האבטחה" : "Please accept the security policy");
      return;
    }
    if (isLogin && (!email || !password)) {
      toast.error(isHe ? "נא למלא אימייל וסיסמה" : "Please fill in email and password");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success(isHe ? "התחברת בהצלחה!" : "Logged in successfully!");
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
              phone: phone,
              ...getSavedGuestAnswers(),
            },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
        toast.success(isHe ? "החשבון נוצר! בדוק את האימייל שלך" : "Account created! Check your email");
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth?mode=${mode}`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || (isHe ? "שגיאה בהתחברות עם Google" : "Google sign-in failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen px-5 py-10"
      style={{ background: "linear-gradient(180deg, #001830 0%, #000f23 100%)" }}
      dir={isHe ? "rtl" : "ltr"}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-9">
          <div
            className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-5"
            style={{ background: DEEP_MIDNIGHT_BLUE, boxShadow: "0 16px 40px -20px rgba(0, 0, 0, 0.45)" }}
          >
            <Sparkles size={28} className="" style={{ color: CREAM }} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black leading-tight" style={{ color: CREAM, fontFamily: "'Assistant', sans-serif" }}>
            {pageTitle}
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`rounded-[32px] p-10 space-y-6 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundColor: CREAM, boxShadow: "0 28px 80px -28px rgba(0, 0, 0, 0.25)", border: "1px solid rgba(0, 24, 48, 0.08)" }}
        >
          {!isLogin && (
            <FieldWrapper label={isHe ? "שם מלא" : "Full Name"}>
              <div className="relative">
                <User
                  size={16}
                  strokeWidth={1.5}
                  className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  style={{ [isHe ? "right" : "left"]: "14px" }}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isHe ? "שם מלא" : "Full Name"}
                  className="w-full rounded-2xl py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all border border-gray-200 focus:border-[#000B18]"
                  style={{ backgroundColor: INPUT_BG, [isHe ? "paddingRight" : "paddingLeft"]: "40px", [isHe ? "paddingLeft" : "paddingRight"]: "16px" }}
                />
              </div>
            </FieldWrapper>
          )}

          {!isLogin && (
            <FieldWrapper label={isHe ? "מספר טלפון" : "Phone Number"}>
              <div className="relative">
                <Phone
                  size={16}
                  strokeWidth={1.5}
                  className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  style={{ [isHe ? "right" : "left"]: "14px" }}
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={isHe ? "050-1234567" : "+972-50-1234567"}
                  dir="ltr"
                  className="w-full rounded-2xl py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all border border-gray-200 focus:border-[#000B18]"
                  style={{ backgroundColor: INPUT_BG, [isHe ? "paddingRight" : "paddingLeft"]: "40px", [isHe ? "paddingLeft" : "paddingRight"]: "16px" }}
                />
              </div>
            </FieldWrapper>
          )}

          <FieldWrapper label={isHe ? "אימייל" : "Email"}>
            <div className="relative">
              <Mail
                size={16}
                strokeWidth={1.5}
                className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                style={{ [isHe ? "right" : "left"]: "14px" }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                dir="ltr"
                className="w-full rounded-2xl py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all border border-gray-200 focus:border-[#000B18]"
                style={{ backgroundColor: INPUT_BG, [isHe ? "paddingRight" : "paddingLeft"]: "40px", [isHe ? "paddingLeft" : "paddingRight"]: "16px" }}
              />
            </div>
          </FieldWrapper>

          <FieldWrapper label={isHe ? "סיסמה" : "Password"}>
            <div className="relative">
              <Lock
                size={16}
                strokeWidth={1.5}
                className="absolute top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                style={{ [isHe ? "right" : "left"]: "14px" }}
              />
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                dir="ltr"
                className="w-full rounded-2xl py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all border border-gray-200 focus:border-[#000B18]"
                style={{ backgroundColor: INPUT_BG, [isHe ? "paddingRight" : "paddingLeft"]: "40px", [isHe ? "paddingLeft" : "paddingRight"]: "40px" }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                style={{ [isHe ? "left" : "right"]: "14px" }}
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </FieldWrapper>

          {!isLogin && (
            <div className="flex items-start gap-3 mt-2">
              <input
                id="security-policy"
                type="checkbox"
                checked={agreePolicy}
                onChange={(e) => setAgreePolicy(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <label htmlFor="security-policy" className="text-sm text-gray-700">
                {isHe ? "אני מסכים למדיניות האבטחה..." : "I agree to the security policy..."}
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (!isLogin && !agreePolicy)}
            className="w-full py-3.5 rounded-2xl font-bold text-white flex items-center justify-center gap-2 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            style={{ background: DEEP_MIDNIGHT_BLUE, boxShadow: "0 8px 24px -4px rgba(0, 24, 48, 0.35)" }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
            {isLogin ? (isHe ? "התחברות" : "Login") : (isHe ? "הרשמה" : "Sign Up")}
          </button>

          <div className="flex items-center gap-3 text-sm text-slate-500">
            <span className="h-px flex-1 bg-slate-300" />
            <span className="font-semibold">{isHe ? "או" : "or"}</span>
            <span className="h-px flex-1 bg-slate-300" />
          </div>

          <button
            type="button"
            onClick={handleGoogleAuth}
            className="w-full rounded-2xl border border-slate-300 bg-white text-slate-900 font-semibold py-3.5 flex items-center justify-center gap-3 hover:bg-slate-50 transition-all"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.64 9.20454C17.64 8.56636 17.5782 7.95091 17.4645 7.35909H9.18V10.8291H13.7718C13.5964 11.8627 12.9936 12.7118 12.03 13.2673V15.5636H14.99C16.8455 14.0845 17.64 11.8282 17.64 9.20454Z" fill="#4285F4" />
                <path d="M9.18 18C11.7 18 13.79 17.1236 15.39 15.5636L12.03 13.2673C11.115 13.7955 10.005 14.1127 9.18 14.1127C7.10182 14.1127 5.34 12.6218 4.8 10.6527H1.34V12.9964C2.94 15.8827 5.82 18 9.18 18Z" fill="#34A853" />
                <path d="M4.8 10.6527C4.64545 10.1455 4.56 9.60273 4.56 9.04545C4.56 8.48818 4.64545 7.94545 4.8 7.43818V5.09455H1.34C0.6 6.54818 0.18 8.22 0.18 9.04545C0.18 9.87091 0.6 11.5427 1.34 12.9964L4.8 10.6527Z" fill="#FBBC05" />
                <path d="M9.18 3.97727C10.8455 3.97727 12.2364 4.64545 13.2064 5.63273L15.48 3.35909C13.7827 1.82182 11.7 0.9 9.18 0.9C5.82 0.9 2.94 3.01727 1.34 5.90364L4.8 8.24727C5.34 6.27818 7.10182 4.78727 9.18 4.78727V3.97727Z" fill="#EA4335" />
              </svg>
            </span>
            {isHe ? "המשך עם גוגל" : "Continue with Google"}
          </button>

          <div className="text-center pt-3">
            <button
              type="button"
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className="text-sm text-[#0f254a] hover:text-[#001830] transition-colors underline"
              style={{ fontFamily: "'Heebo', sans-serif" }}
            >
              {bottomLinkText}
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                createGuestSession();
                safeSetSessionItem("onboarding_complete", "true");
                navigate("/");
              }}
              className="text-sm text-[#001830] hover:text-[#0f254a] transition-colors"
              style={{ fontFamily: "'Heebo', sans-serif" }}
            >
              {isHe ? "המשך כאורח" : "Continue as guest"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const FieldWrapper = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-600 uppercase tracking-wide block">{label}</label>
    {children}
  </div>
);

export default AuthPage;
