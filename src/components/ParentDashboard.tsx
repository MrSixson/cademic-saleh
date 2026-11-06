import React from 'react';
import { PlayerSaveState } from '../types';
import { audioService } from '../services/audioService';
import { 
  UserCheck, 
  ArrowRight, 
  Brain, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ParentDashboardProps {
  playerState: PlayerSaveState;
  onBack: () => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  playerState,
  onBack
}) => {
  const stats = playerState.adaptiveStats;
  const total = stats.totalQuestions;
  const correct = stats.correctAnswers;
  const accuracy = total > 0 ? Math.round((correct / total) * 100) : 100;
  const avgTimeSec = (stats.averageResponseTimeMs / 1000).toFixed(1);

  // Problematic letter counts
  const letterMistakesList = Object.entries(stats.letterMistakes)
    .sort((a, b) => (Number(b[1]) || 0) - (Number(a[1]) || 0))
    .slice(0, 6);

  return (
    <div className="dashboard-screen flex-1 w-full max-w-4xl mx-auto px-4 py-6 flex flex-col z-20 select-none pb-16">
      {/* Top Header: Organic Driftwood Plank */}
      <div className="flex items-center justify-between cartoon-wood-panel p-4 mb-6 shadow-2xl relative z-30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 border-2 border-cyan-200 flex items-center justify-center text-white shadow-md">
            <UserCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-black text-amber-100 drop-shadow">
              گزارش تحلیلی پیشرفت و یادگیری
            </h1>
            <span className="text-xs text-amber-200 font-bold">
              ویژه آموزگار محترم و اولیای گرامی
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            audioService.playClick();
            onBack();
          }}
          className="flex items-center gap-1.5 btn-marine-wood px-4 py-2 font-bold text-sm cursor-pointer shadow-md"
        >
          <ArrowRight className="w-4 h-4 text-amber-200" />
          <span>بازگشت</span>
        </button>
      </div>

      {/* Primary KPI Metrics: Floating Bubble Pods */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="stepping-stone-bubble p-4 flex flex-col items-center text-center shadow-lg">
          <CheckCircle2 className="w-7 h-7 text-emerald-600 mb-1" />
          <span className="text-2xl font-black text-slate-900 font-display">{accuracy}٪</span>
          <span className="text-xs text-slate-700 mt-1 font-bold">دقت پاسخگویی کل</span>
        </div>

        <div className="stepping-stone-bubble p-4 flex flex-col items-center text-center shadow-lg">
          <Brain className="w-7 h-7 text-cyan-600 mb-1" />
          <span className="text-2xl font-black text-slate-900 font-display">{total}</span>
          <span className="text-xs text-slate-700 mt-1 font-bold">تمرین‌های حل‌شده</span>
        </div>

        <div className="stepping-stone-bubble p-4 flex flex-col items-center text-center shadow-lg">
          <Clock className="w-7 h-7 text-amber-600 mb-1" />
          <span className="text-2xl font-black text-slate-900 font-display">{avgTimeSec}s</span>
          <span className="text-xs text-slate-700 mt-1 font-bold">میانگین سرعت پاسخ</span>
        </div>

        <div className="stepping-stone-bubble p-4 flex flex-col items-center text-center shadow-lg">
          <Sparkles className="w-7 h-7 text-purple-600 mb-1" />
          <span className="text-2xl font-black text-slate-900 font-display">{stats.longestCombo}</span>
          <span className="text-xs text-slate-700 mt-1 font-bold">بیشترین کمبوی پیاپی</span>
        </div>
      </div>

      {/* Letter Analysis & Diagnostic: Organic Coastal Parchments */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Difficult Letters Identified */}
        <div className="marine-parchment p-5 shadow-xl">
          <h2 className="text-base font-black text-amber-950 flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-800" />
            <span>نیاز به تمرین بیشتر در حروف:</span>
          </h2>

          {letterMistakesList.length === 0 ? (
            <p className="text-xs text-amber-900 bg-amber-100/60 p-4 rounded-[1.5rem_1.75rem_1.4rem_1.6rem] font-bold">
              هنوز خطای تکرارشونده‌ای ثبت نشده است. عملکرد کودک بسیار روان و عالی است!
            </p>
          ) : (
            <div className="space-y-2">
              {letterMistakesList.map(([letter, count]) => (
                <div
                  key={letter}
                  className="flex items-center justify-between bg-amber-200/60 border border-amber-400/80 px-4 py-2.5 rounded-[1.25rem_1.5rem_1.15rem_1.4rem] shadow-sm"
                >
                  <span className="text-base font-black text-amber-950">حرف «{letter}»</span>
                  <span className="text-xs text-amber-900 font-bold">{count} بار تردید/خطا</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pedagogical Guidance for 2nd Grade */}
        <div className="marine-parchment p-5 shadow-xl">
          <h2 className="text-base font-black text-amber-950 flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-amber-800" />
            <span>توصیه‌های آمادگی برای ورود به کلاس دوم:</span>
          </h2>

          <ul className="text-xs sm:text-sm text-amber-950 space-y-2.5 leading-relaxed list-disc list-inside font-bold">
            <li>
              <strong>تمرکز بر حروف هم‌صدا:</strong> تمرین روی دسته‌های (س/ص/ث) و (ز/ذ/ض/ظ) برای ثبات حافظه تصویری املایی.
            </li>
            <li>
              <strong>خوانش بدون مکث:</strong> تشویق به خواندن کلمات با تصویرسازی کلی به جای تلفظ تک‌تک حروف.
            </li>
            <li>
              <strong>بازی با حافظه دیداری:</strong> مراحل آزمون‌های تصویری و حباب‌ها را دوباره تمرین کنید تا سرعت یادسپاری افزایش یابد.
            </li>
          </ul>
        </div>
      </div>

      {/* Educational Credit footer note */}
      <div className="cartoon-wood-panel p-4 text-center text-xs text-amber-200 font-bold border-2 border-amber-950">
        این ابزار تحت نظارت آموزشی سرکار خانم <strong>آرزو صالح</strong> (آموزگار اول ابتدایی) طراحی گردیده است.
      </div>
    </div>
  );
};
