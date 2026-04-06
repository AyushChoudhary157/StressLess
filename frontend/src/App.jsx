import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import StressTest from './components/StressTest';
import ResultsPage from './components/ResultsPage';
import TherapyDetails from './components/TherapyDetails';
import About from './components/About';
import RemediesSection from './components/Remedies'; 
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ChatBot from './components/ChatBot';
import UserIntake from './components/UserIntake';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppContent = () => {
  const { currentUser, token } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [stressScore, setStressScore] = useState(null);
  const [categoricalScores, setCategoricalScores] = useState(null);
  const [currentResultId, setCurrentResultId] = useState(null);
  const [savedAiAnalysis, setSavedAiAnalysis] = useState(null);
  const [selectedTherapy, setSelectedTherapy] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState({ medical: [], financial: [], relationship: [] });
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);
  const [userIntakeText, setUserIntakeText] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState(null);
  const [detectedKeywords, setDetectedKeywords] = useState([]);

  const allQuestions = {
    medical: [
      "Do you feel tired even after sleeping enough?",
      "Do you experience frequent headaches or migraines?",
      "Do you feel muscle tension in your neck or shoulders?",
      "Do you have trouble falling asleep?",
      "Do you wake up feeling unrefreshed?",
      "Do you feel physically weak without heavy activity?",
      "Do you experience sudden appetite changes?",
      "Do you feel mentally exhausted during the day?",
      "Do you find it hard to concentrate?",
      "Do you feel restless or unable to relax?",
      "Do you have stomach issues during stress?",
      "Do you feel dizzy or light-headed when stressed?",
      "Do you worry about your health frequently?",
      "Do you feel low energy most days?",
      "Do daily tasks feel overwhelming?",
      "Do you experience mood swings?",
      "Do you feel chest pressure during stress?",
      "Do you avoid exercise due to fatigue?",
      "Do you feel emotionally drained after work?",
      "Do health issues affect your productivity?",
      "Do you feel work-life imbalance?",
      "Do you feel nervous without clear reason?",
      "Do you feel burnout from responsibilities?",
      "Do emotional stress cause physical symptoms?",
      "Do you feel stress weakens your immunity?",
      "Do you rely on caffeine to function?",
      "Do you struggle to relax your body?",
      "Do you feel mentally overloaded?",
      "Do you feel stress even during rest?",
      "Do health stress reduce your happiness?"
    ],
    relationship: [
      "Do you feel misunderstood by close people?",
      "Do family conflicts disturb your peace?",
      "Do arguments affect your whole day?",
      "Do you hesitate to express feelings?",
      "Do you feel emotionally unsupported?",
      "Do you feel lonely even in relationships?",
      "Do you replay arguments in your mind?",
      "Do you feel pressure to please others?",
      "Do communication gaps stress you?",
      "Do you feel ignored by loved ones?",
      "Do relationship issues affect sleep?",
      "Do conversations emotionally drain you?",
      "Do disagreements cause guilt?",
      "Do others’ expectations stress you?",
      "Do relationships affect your focus?",
      "Do you feel insecure in relationships?",
      "Do you fear losing close people?",
      "Do trust issues stress you?",
      "Do you feel emotionally dependent?",
      "Do you feel pressure to behave certain ways?",
      "Do you avoid difficult conversations?",
      "Do emotional issues lower motivation?",
      "Do social comparisons stress you?",
      "Do you feel ignored in groups?",
      "Do people take your emotions lightly?",
      "Do uncertain relationships stress you?",
      "Do small comments hurt deeply?",
      "Do emotions affect productivity?",
      "Do social obligations overwhelm you?",
      "Do relationship stress lower confidence?"
    ],
    financial: [
      "Do you worry about money regularly?",
      "Do you feel income is insufficient?",
      "Do you stress about financial future?",
      "Do unexpected expenses cause anxiety?",
      "Do you avoid checking your expenses?",
      "Do saving money stress you?",
      "Do you compare finances with others?",
      "Do you feel pressure to earn more?",
      "Do money worries affect sleep?",
      "Do you feel financially insecure?",
      "Do you struggle with monthly expenses?",
      "Do loans or debts stress you?",
      "Do you feel pressure to support family?",
      "Do you feel guilty spending money?",
      "Do you delay purchases due to stress?",
      "Do finances affect mental health?",
      "Do you feel anxious before payday?",
      "Do rising expenses stress you?",
      "Do money issues reduce confidence?",
      "Do finances affect work or studies?",
      "Do you feel no control over money?",
      "Do career income worries stress you?",
      "Do emergency savings worry you?",
      "Do social financial pressure stress you?",
      "Do you avoid money discussions?",
      "Do you feel financially dependent?",
      "Do future plans cause anxiety?",
      "Do finances limit life choices?",
      "Do money issues affect relationships?",
      "Do you feel trapped financially?"
    ]
  };

  const getRandomQuestions = () => {
    const shuffle = (array) => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    const newUsedQuestions = { ...usedQuestions };
    
    const getUnique5 = (category) => {
      const all = allQuestions[category];
      const used = newUsedQuestions[category];
      let available = all.filter(q => !used.includes(q));
      
      // If we don't have enough new questions, reset the used list for this category
      if (available.length < 5) {
        available = all;
        newUsedQuestions[category] = [];
      }
      
      const selected = shuffle(available).slice(0, 5);
      newUsedQuestions[category] = [...newUsedQuestions[category], ...selected];
      return selected.map(q => ({ text: q, category }));
    };

    const medical = getUnique5('medical');
    const financial = getUnique5('financial');
    const relationship = getUnique5('relationship');
    
    // Update the used questions state
    setUsedQuestions(newUsedQuestions);

    return shuffle([...medical, ...financial, ...relationship]);
  };

  const startTest = () => {
    if (!currentUser) {
      setRedirectAfterLogin('test');
      setCurrentPage('login');
      return;
    }
    // Go to intake page first — user describes their problems
    setCurrentPage('intake');
  };

  const handleQuestionsGenerated = (questions, primary, keywords, intakeText) => {
    setActiveQuestions(questions);
    setPrimaryCategory(primary);
    setDetectedKeywords(keywords);
    setUserIntakeText(intakeText);
    setCurrentQuestion(0);
    setAnswers([]);
    setStressScore(null);
    setCurrentPage('test');
  };

  const startTestWithRandomQuestions = () => {
    setActiveQuestions(getRandomQuestions());
    setPrimaryCategory(null);
    setDetectedKeywords([]);
    setUserIntakeText('');
    setCurrentQuestion(0);
    setAnswers([]);
    setStressScore(null);
    setCurrentPage('test');
  };

  const handleNavigate = (page) => {
    if ((page === 'remedies' || page === 'test') && !currentUser) {
      setRedirectAfterLogin(page);
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  const handleTherapySelect = (therapyId) => {
    if (!currentUser) {
      setRedirectAfterLogin('remedies'); // Or just go to remedies after login
      setCurrentPage('login');
    } else {
      setSelectedTherapy(therapyId);
    }
  };

  const handleLoginSuccess = () => {
    if (redirectAfterLogin === 'test') {
      setCurrentPage('intake');
    } else if (redirectAfterLogin) {
      setCurrentPage(redirectAfterLogin);
    } else {
      setCurrentPage('home');
    }
    setRedirectAfterLogin(null);
  };

  // --------------------- TEST FUNCTIONS ----------------------

  const handleAnswerSelect = (value) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentQuestion < activeQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore(newAnswers);
    }
  };

  const calculateScore = (allAnswers) => {
    let total = 0;
    const categories = {
      medical: 0,
      financial: 0,
      relationship: 0
    };

    allAnswers.forEach((answer, index) => {
      total += answer;
      const category = activeQuestions[index].category;
      categories[category] += answer;
    });

    const processedCategories = {
      medical: categories.medical,
      financial: categories.financial,
      relationship: categories.relationship
    };

    setStressScore(total);
    setCategoricalScores(processedCategories);
    setCurrentResultId(null);
    setSavedAiAnalysis(null);
    setCurrentPage('results');
    
    // Save result to backend if user is logged in
    const saveResult = async () => {
      try {
        if (currentUser && token) {
          const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
          const response = await fetch(`${API_URL}/results`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              score: total,
              categoricalScores: processedCategories,
              level: total <= 30 ? 'Low' : total <= 60 ? 'Mild' : total <= 90 ? 'Moderate' : 'High'
            })
          });
          const data = await response.json();
          if (data.id) {
            setCurrentResultId(data.id);
          }
        }
      } catch (err) {
        console.error("Failed to save result:", err);
      }
    };
    saveResult();
  };

  const showPreviousResult = (result) => {
    setStressScore(result.score);
    setCategoricalScores(result.categoricalScores);
    setCurrentResultId(result.id);
    setSavedAiAnalysis(result.aiAnalysis);
    setCurrentPage('results');
  };

  const restartTest = () => {
    setSelectedTherapy(null);
    setCurrentPage('intake');
  };

  // --------------------- PAGE RENDER LOGIC ----------------------

  const renderPage = () => {
    // If user selects a therapy show therapy details page
    if (selectedTherapy) {
      return (
        <TherapyDetails 
          therapyId={selectedTherapy}
          onBack={() => setSelectedTherapy(null)}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onStartTest={startTest} />;

      case 'intake':
        return (
          <UserIntake
            onQuestionsGenerated={handleQuestionsGenerated}
            onBackHome={() => setCurrentPage('home')}
          />
        );

      case 'test':
        return (
          <StressTest
            questions={activeQuestions}
            currentQuestion={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            onBackHome={() => setCurrentPage('home')}
          />
        );

      case 'results':
        return (
          <ResultsPage
            stressScore={stressScore}
            categoricalScores={categoricalScores}
            resultId={currentResultId}
            savedAnalysis={savedAiAnalysis}
            onRetakeTest={restartTest}
            onSelectTherapy={handleTherapySelect}
            onNavigate={handleNavigate}
          />
        );

      case 'remedies':
        return (
          <RemediesSection  
            onSelectTherapy={handleTherapySelect}
          />
        );

      case 'about':
        return <About />;

      case 'login':
        return <Login onNavigate={handleNavigate} onLoginSuccess={handleLoginSuccess} />;

      case 'dashboard':
        return <Dashboard onViewResult={showPreviousResult} />;

      case 'signup':
        return <Signup onNavigate={handleNavigate} onSignupSuccess={handleLoginSuccess} />;

      default:
        return <HomePage onStartTest={startTest} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-300">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-500/10 rounded-full blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[30%] right-[20%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px] animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          showBackButton={selectedTherapy !== null}
          onBack={() => setSelectedTherapy(null)}
        />

        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage + (selectedTherapy || '')}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>

        <Footer />
        <ChatBot />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
