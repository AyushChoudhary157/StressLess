import React from "react";
import { Music, BookOpen, Activity, User } from "lucide-react";

const Remedies = ({ onSelectTherapy }) => {
  const remedies = [
    {
      title: "Audio Therapy",
      description:
        "Relax with soothing melodies to unwind your mind. Soft instrumental music or nature sounds can help you feel at ease.",
      icon: <Music size={40} className="text-yellow-500 dark:text-yellow-400" />,
      border: "border-yellow-400",
      type: "audio",
    },
    {
      title: "Reading Therapy",
      description:
        "Lose yourself in a book. Uplifting stories or poetry can comfort and give you a fresh perspective.",
      icon: <BookOpen size={40} className="text-blue-500 dark:text-blue-400" />,
      border: "border-blue-400",
      type: "reading",
    },
    {
      title: "Yoga Therapy",
      description:
        "Move, breathe, and let go. Yoga helps reduce stress, improve focus, and boost overall well-being.",
      icon: <Activity size={40} className="text-green-500 dark:text-green-400" />,
      border: "border-green-400",
      type: "yoga",
    },
    {
      title: "Consult a Doctor",
      description:
        "If stress is overwhelming, professional help is the best step. Doctors or therapists can guide your mental health.",
      icon: <User size={40} className="text-pink-500 dark:text-pink-400" />,
      border: "border-pink-400",
      type: "doctor",
    },
  ];

  return (
    <section className="py-16 px-6 bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-white min-h-screen">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white">Find Your Calm</h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12">
          Therapy-Based Remedies for Stress
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {remedies.map((remedy, index) => (
            <div
              key={index}
              className={`h-full flex flex-col p-6 rounded-2xl border-2 ${remedy.border} bg-white dark:bg-[#0f172a]/60 backdrop-blur-sm transition hover:scale-[1.03] hover:shadow-lg shadow-sm`}
            >
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                {remedy.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3 text-center text-slate-900 dark:text-white">
                {remedy.title}
              </h3>

              <p className="text-slate-600 dark:text-slate-300 text-center text-sm flex-grow mb-6 line-clamp-4">
                {remedy.description}
              </p>

              <button
                onClick={() => onSelectTherapy(remedy.type)}
                className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg text-base font-semibold transition text-white mt-auto"
              >
                Explore
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Remedies;
