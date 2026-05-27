import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useI18n } from "@/lib/i18n";
import { UserCircle2, Headphones, CreditCard, Settings } from "lucide-react";

const ProfilePage = () => {
  const { lang } = useI18n();
  const isHe = lang === "he";
  const navigate = useNavigate();
  const { profile } = useAuth();

  const stats = getActivityStats();
  const totalCredits = profile?.credits_total ?? stats.limit;
  const usedCredits = profile?.credits_used ?? stats.totalActions;
  const remainingCredits = Math.max(0, totalCredits - usedCredits);
  const isPro = profile?.plan === "pro";
  const planLabel = isPro ? "PRO" : isHe ? "תוכנית חינם" : "Free Plan";
  const userName = profile?.full_name ?? profile?.email ?? (isHe ? "משתמש BizAIra" : "BizAIra User");
  const studioStatus = isPro ? (isHe ? "גישה בלתי מוגבלת לסטודיו" : "Unlimited studio access") : isHe ? "גישה פעילה לסטודיו" : "Studio access active";
  const creditPercent = isPro ? 100 : Math.round((remainingCredits / Math.max(totalCredits, 1)) * 100);

  return (
    <div className="min-h-screen bg-soft-cream text-[#001830]" dir={isHe ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="max-w-4xl mx-auto text-right">
            <h1 className="text-5xl font-black tracking-tight text-[#001830]">
              {isHe ? "אזור אישי" : "Personal Area"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-light leading-7 text-soft-muted">
              {isHe ? "ניהול פרטי החשבון והגדרות העסק שלך" : "Manage your account details and business settings"}
            </p>
          </div>
        </header>

        <section className="luxury-card p-8 text-right">          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-cream text-[#001830]">
                <UserCircle2 size={30} />
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-[0.26em] text-[#001830]/80">{planLabel}</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#001830]">{isHe ? `ברוכה השבה, ${userName}` : `Welcome back, ${userName}`}</h2>
                <p className="mt-1 text-sm text-soft-muted">{studioStatus}</p>
              </div>
            </div>

            <div className="space-y-3 text-right">
              <p className="text-sm font-semibold text-[#000B18]">{isHe ? `נשארים קרדיטים: ${remainingCredits} / ${totalCredits}` : `Credits remaining: ${remainingCredits} / ${totalCredits}`}</p>
              <p className="text-sm text-slate-500">{isHe ? `מתחדש בתאריך: ${stats.nextRenewalDate.toLocaleDateString(isHe ? 'he-IL' : 'en-US')}` : `Renews on: ${stats.nextRenewalDate.toLocaleDateString(isHe ? 'he-IL' : 'en-US')}`}</p>
            </div>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between gap-4 text-sm font-medium text-[#000B18]">
              <span>{isHe ? "סטטוס קרדיטים" : "Credit balance"}</span>
              <span>{`${creditPercent}%`}</span>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-[#000B18] transition-all duration-300" style={{ width: `${creditPercent}%` }} />
            </div>
          </div>
        </section>

        <section className="mt-8 luxury-card p-6 text-right">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.26em] text-soft-muted text-right">{isHe ? "כלי ניהול מהירים" : "Quick actions"}</p>
            <h3 className="mt-2 text-xl font-semibold text-[#001830] text-right">{isHe ? "ניהול חשבון וסטודיו" : "Account & studio controls"}</h3>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate("/support")}
              className="group flex flex-row-reverse items-center justify-between w-full rounded-[16px] border border-[var(--soft-border)] bg-surface-cream px-6 py-5 text-right text-sm font-semibold text-[#001830] transition duration-300 hover:border-[#001830]/20 hover:shadow-soft-business"
            >
              <span>{isHe ? "תמיכה" : "Support"}</span>
              <Headphones size={20} className="transition-colors duration-300" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/pricing")}
              className="group flex flex-row-reverse items-center justify-between w-full rounded-[16px] border border-[var(--soft-border)] bg-surface-cream px-6 py-5 text-right text-sm font-semibold text-[#001830] transition duration-300 hover:border-[#001830]/20 hover:shadow-soft-business"
            >
              <span>{isHe ? "ניהול מנוי" : "Manage subscription"}</span>
              <CreditCard size={20} className="transition-colors duration-300" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className="group flex flex-row-reverse items-center justify-between w-full rounded-[16px] border border-[var(--soft-border)] bg-surface-cream px-6 py-5 text-right text-sm font-semibold text-[#001830] transition duration-300 hover:border-[#001830]/20 hover:shadow-soft-business"
            >
              <span>{isHe ? "הגדרות" : "Settings"}</span>
              <Settings size={20} className="transition-colors duration-300" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

const getActivityStats = () => ({
  limit: 20,
  totalActions: 12,
  nextRenewalDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  creationsCount: 11,
  downloadsCount: 5,
  generalCount: 31,
});

export default ProfilePage;
