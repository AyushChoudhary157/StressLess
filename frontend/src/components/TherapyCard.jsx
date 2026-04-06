import React from 'react';

const TherapyCard = ({ therapy, onExplore }) => {
  const Icon = therapy.icon;
  
  return (
    <div
      className="h-full bg-white dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border-2 hover:scale-105 transition transform shadow-sm flex flex-col"
      style={{ borderColor: therapy.color }}
    >
      <div className="flex justify-center mb-4">
        <div className="p-4 rounded-full" style={{ backgroundColor: therapy.color + '20' }}>
          <Icon size={40} style={{ color: therapy.color }} />
        </div>
      </div>
      <h4 className="text-xl font-bold text-center mb-3 text-slate-900 dark:text-white">{therapy.title}</h4>
      <p className="text-slate-600 dark:text-slate-300 text-center text-sm flex-grow mb-6 line-clamp-4">{therapy.description}</p>
      <button
        onClick={onExplore}
        className="w-full py-3 rounded-lg font-semibold transition hover:brightness-110 mt-auto"
        style={{ backgroundColor: '#00D26A', color: 'white' }}
      >
        Explore
      </button>
    </div>
  );
};

export default TherapyCard;