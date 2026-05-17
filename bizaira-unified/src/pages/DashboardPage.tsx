import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ShoppingCart, Download, Archive, Rocket, Box, Headphones } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-[#001830]" dir="rtl" style={{ fontFamily: "'Rubik', 'Inter', sans-serif" }}>
      <header className="sticky top-0 z-50 border-b border-[#001830]/10 bg-[#F5F5DC] shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <div className="inline-flex items-center gap-3 rounded-lg border border-[#001830]/10 bg-white px-4 py-2 text-[#001830] shadow-sm">
            <User size={18} strokeWidth={1.5} />
            <span className="text-sm font-semibold">Bizaira</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#F5F5DC] px-4 py-3 text-right text-sm font-semibold text-[#001830] shadow-sm">
              <div>Free Plan</div>
              <div className="mt-1 text-xs text-[#001830]/70">5 / 5 credits</div>
            </div>
            <button className="rounded-lg bg-[#001830] px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:opacity-90">
              שדרג ל-PRO
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pt-10 pb-28">
        <section className="rounded-[28px] border border-[#001830]/10 bg-white p-10 shadow-[0_14px_40px_rgba(0,24,48,0.08)]">
          <div className="text-right">
            <h1 className="text-3xl font-bold" style={{ color: "#001830" }}>אזור אישי</h1>
          </div>

          <div className="mt-10 space-y-6">
            <div className="rounded-[20px] border border-[#001830]/10 bg-[#F5F5DC] p-5 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="text-right">
                  <p className="text-sm font-semibold text-[#001830]">שימוש ראשון (היום)</p>
                </div>
                <div className="flex-1">
                  <div className="h-3 rounded-full bg-[#001830]/10">
                    <div className="h-3 rounded-full bg-[#001830]" style={{ width: "100%" }} />
                  </div>
                </div>
                <div className="text-left md:text-right">
                  <p className="text-sm font-semibold text-[#001830]">חידוש הבא (חודש הבא)</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[20px] border border-[#001830]/10 bg-[#F5F5DC] p-5 shadow-sm text-right">
                <p className="text-sm font-semibold text-[#001830]/70">סך הכל פגישות</p>
                <p className="mt-3 text-lg font-semibold text-[#001830]">5 / 5</p>
              </div>
              <div className="rounded-[20px] border border-[#001830]/10 bg-[#F5F5DC] p-5 shadow-sm text-right">
                <p className="text-sm font-semibold text-[#001830]/70">מידע נוסף</p>
                <p className="mt-3 text-lg font-semibold text-[#001830]">אין מידע</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 text-right">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#001830" }}>פעילויות אחרונות</h2>
            <p className="mt-2 text-sm text-[#001830]/60">הפעילויות שלך החודש</p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-[#001830]/10 bg-white p-6 text-center shadow-sm">
              <p className="text-5xl font-bold text-[#001830]">0</p>
              <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F5F5DC] text-[#001830]">
                <ShoppingCart size={28} strokeWidth={1.5} />
              </div>
              <p className="mt-6 text-sm font-semibold text-[#001830]">יצירת תכנים</p>
            </div>

            <div className="rounded-[24px] border border-[#001830]/10 bg-white p-6 text-center shadow-sm">
              <p className="text-5xl font-bold text-[#001830]">0</p>
              <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F5F5DC] text-[#001830]">
                <Download size={28} strokeWidth={1.5} />
              </div>
              <p className="mt-6 text-sm font-semibold text-[#001830]">הורדות</p>
            </div>

            <div className="rounded-[24px] border border-[#001830]/10 bg-white p-6 text-center shadow-sm">
              <p className="text-5xl font-bold text-[#001830]">0</p>
              <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#F5F5DC] text-[#001830]">
                <Archive size={28} strokeWidth={1.5} />
              </div>
              <p className="mt-6 text-sm font-semibold text-[#001830]">בארכיון</p>
            </div>
          </div>
        </section>

        <section className="mt-12 text-right">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: "#001830" }}>פעולות מהירות</h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] border border-[#001830]/10 bg-white p-6 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F5F5DC] text-[#001830]">
                <Rocket size={24} strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-sm font-semibold text-[#001830]">הפעלת קמפיין</p>
            </div>

            <div className="rounded-[24px] border border-[#001830]/10 bg-white p-6 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F5F5DC] text-[#001830]">
                <Box size={24} strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-sm font-semibold text-[#001830]">ניהול מוצר</p>
            </div>

            <div className="rounded-[24px] border border-[#001830]/10 bg-white p-6 text-center shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-[#F5F5DC] text-[#001830]">
                <Headphones size={24} strokeWidth={1.5} />
              </div>
              <p className="mt-5 text-sm font-semibold text-[#001830]">תמיכה</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-[#001830]/10 bg-[#F5F5DC] py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-6">
          <button className="inline-flex items-center gap-2 rounded-full border border-[#001830]/10 bg-white px-5 py-3 text-sm font-semibold text-[#001830] shadow-sm">
            <User size={20} strokeWidth={1.5} />
            <span>אזור אישי</span>
          </button>
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#001830]/10 bg-[#F5F5DC] text-[#001830]/60">
            <ShoppingCart size={18} strokeWidth={1.5} />
          </button>
          <button className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#001830]/10 bg-[#F5F5DC] text-[#001830]/60">
            <Download size={18} strokeWidth={1.5} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
