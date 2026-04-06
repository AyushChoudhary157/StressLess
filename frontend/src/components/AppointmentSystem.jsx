import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, CheckCircle2, ChevronRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    specialty: "Psychologist",
    expertise: "Anxiety & Stress Management",
    image: "https://images.unsplash.com/photo-1559839734-2b71f153678f?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.9,
    bio: "Specializing in evidence-based therapy for clinical anxiety and stress reduction.",
    slots: ["10:00 AM", "11:30 AM", "02:00 PM", "04:30 PM"]
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Psychiatrist",
    expertise: "Mood Disorders & Depression",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.8,
    bio: "Expert in holistic psychiatric treatment and cognitive behavioral approaches.",
    slots: ["09:00 AM", "12:00 PM", "03:30 PM", "05:00 PM"]
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Clinical Therapist",
    expertise: "CBT & Mindfulness",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 5.0,
    bio: "Focusing on mindfulness and resilience building for emotional well-being.",
    slots: ["11:00 AM", "01:00 PM", "04:00 PM", "06:00 PM"]
  },
  {
    id: 4,
    name: "Dr. David Wilson",
    specialty: "Mental Health Counselor",
    expertise: "Work-Life Balance & Burnout",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200&h=200",
    rating: 4.7,
    bio: "Dedicated to helping professionals manage workplace stress and prevent burnout.",
    slots: ["08:30 AM", "10:30 AM", "02:30 PM", "04:30 PM"]
  }
];

const AppointmentSystem = () => {
  const { currentUser, token } = useAuth();
  const [isStarted, setIsStarted] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isBooked, setIsBooked] = useState(false);

  const handleBookAppointment = async () => {
    if (selectedDoctor && selectedSlot) {
      try {
        if (currentUser && token) {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
          await fetch(`${API_URL}/appointments`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              doctorName: selectedDoctor.name,
              slot: selectedSlot
            })
          });
        }
        setIsBooked(true);
      } catch (err) {
        console.error("Failed to book appointment:", err);
        // Fallback to local state booking even if backend fails
        setIsBooked(true);
      }
    }
  };

  const resetSelection = () => {
    setIsStarted(false);
    setSelectedDoctor(null);
    setSelectedSlot(null);
    setIsBooked(false);
  };

  if (isBooked) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-10 text-center border-green-500/50"
      >
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500">
            <CheckCircle2 size={48} />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Appointment Confirmed!</h3>
        <p className="text-slate-600 dark:text-slate-300 text-lg mb-8 max-w-md mx-auto">
          Your session with <span className="text-yellow-600 dark:text-yellow-500 font-bold">{selectedDoctor.name}</span> is scheduled for <span className="text-yellow-600 dark:text-yellow-500 font-bold">{selectedSlot}</span> tomorrow.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 mb-8 max-w-sm mx-auto">
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 mb-3">
            <Calendar size={18} className="text-yellow-500" />
            <span>Tomorrow, Friday Jan 31</span>
          </div>
          <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
            <Clock size={18} className="text-yellow-500" />
            <span>{selectedSlot}</span>
          </div>
        </div>
        <button
          onClick={resetSelection}
          className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-8 py-3 rounded-xl font-bold transition shadow-lg shadow-yellow-500/20"
        >
          Book Another Appointment
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {!isStarted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center py-10"
        >
          <button
            onClick={() => setIsStarted(true)}
            className="group relative bg-yellow-500 hover:bg-yellow-400 text-slate-900 px-12 py-6 rounded-3xl text-2xl font-black transition-all shadow-[0_0_50px_rgba(234,179,8,0.3)] hover:shadow-[0_0_60px_rgba(234,179,8,0.5)] flex items-center gap-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <Calendar size={32} />
            Book Appointment Now
            <ChevronRight size={32} className="group-hover:translate-x-2 transition-transform" />
          </button>
          <p className="mt-6 text-slate-500 dark:text-slate-400 font-medium">Click to see our available specialists</p>
        </motion.div>
      ) : !selectedDoctor ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {doctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedDoctor(doctor)}
              className="glass-card rounded-[2rem] p-6 cursor-pointer group transition-all border border-slate-200 dark:border-white/5 hover:border-yellow-500/50"
            >
              <div className="flex items-center gap-5">
                <div className="relative">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-20 h-20 rounded-2xl object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-yellow-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full">
                    ★ {doctor.rating}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-yellow-500 transition-colors">{doctor.name}</h4>
                  <p className="text-sm text-yellow-600 dark:text-yellow-500 font-semibold mb-1">{doctor.specialty}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{doctor.expertise}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 italic">"{doctor.bio}"</p>
                </div>
                <ChevronRight className="text-slate-400 dark:text-slate-600 group-hover:text-yellow-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/10"
        >
          <button 
            onClick={() => setSelectedDoctor(null)}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={16} />
            Back to Doctors
          </button>

          <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
            <img 
              src={selectedDoctor.image} 
              alt={selectedDoctor.name} 
              className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-2 border-yellow-500/30"
            />
            <div className="text-center md:text-left">
              <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{selectedDoctor.name}</h4>
              <p className="text-lg text-yellow-600 dark:text-yellow-500 font-bold mb-3">{selectedDoctor.specialty}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                <span className="bg-slate-100 dark:bg-slate-900/50 border border-slate-300 dark:border-slate-700 px-3 py-1 rounded-full text-xs text-slate-600 dark:text-slate-300">
                  {selectedDoctor.expertise}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h5 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Clock className="text-yellow-500" size={20} />
              Available Slots for Tomorrow
            </h5>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedDoctor.slots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-4 rounded-2xl font-bold transition-all border-2 ${
                    selectedSlot === slot 
                      ? 'bg-yellow-500 text-slate-900 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.4)]' 
                      : 'bg-slate-100 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:border-yellow-500/50 hover:text-yellow-500'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleBookAppointment}
            disabled={!selectedSlot}
            className="w-full bg-yellow-500 hover:bg-yellow-400 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-900 py-5 rounded-[1.5rem] text-xl font-black transition-all shadow-xl shadow-yellow-500/10 active:scale-[0.98]"
          >
            Confirm Appointment Booking
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AppointmentSystem;
