import { Music, BookOpen, Activity, User } from 'lucide-react';

export const therapiesData = [
  {
    id: 'audio',
    icon: Music,
    title: 'Audio Therapy',
    color: '#D4AF37',
    description: 'Relax with soothing melodies to unwind your mind. Soft instrumental music or nature sounds can help you feel at ease.',
    details: {
      benefits: [
        'Reduces anxiety and promotes relaxation',
        'Improves sleep quality',
        'Lowers blood pressure and heart rate',
        'Enhances mood and emotional well-being'
      ],
      songs: [
        {
          title: "Rain on Window",
          artist: "Nature Sounds",
          duration: "10:00",
          url: "https://www.bensound.com/bensound-music/bensound-ukulele.mp3",
          tags: ["rain", "nature", "sleep", "ambient"]
        },
        {
          title: "Ocean Waves",
          artist: "Coastal Ambience",
          duration: "8:30",
          url: "https://www.bensound.com/bensound-music/bensound-mellowdramaticsq.mp3",
          tags: ["ocean", "waves", "beach", "calm"]
        },
        {
          title: "Forest Meditation",
          artist: "Environmental Sounds",
          duration: "12:00",
          url: "https://www.bensound.com/bensound-music/bensound-anotherbrick.mp3",
          tags: ["forest", "birds", "nature", "meditation"]
        },
        {
          title: "Gentle Piano",
          artist: "Classical Relaxation",
          duration: "7:45",
          url: "https://www.bensound.com/bensound-music/bensound-littleidea.mp3",
          tags: ["piano", "classical", "focus", "study"]
        },
        {
          title: "Meditation Bell",
          artist: "Zen Sounds",
          duration: "5:20",
          url: "https://www.bensound.com/bensound-music/bensound-zen.mp3",
          tags: ["meditation", "zen", "bell", "peace"]
        },
        {
          title: "Flowing Water",
          artist: "Stream Ambience",
          duration: "9:15",
          url: "https://www.bensound.com/bensound-music/bensound-summer.mp3",
          tags: ["water", "stream", "flow", "nature"]
        },
        {
          title: "Ambient Breeze",
          artist: "Wind Sounds",
          duration: "6:45",
          url: "https://www.bensound.com/bensound-music/bensound-ambient.mp3",
          tags: ["wind", "breeze", "calm", "sleep"]
        },
        {
          title: "Breathing Guide",
          artist: "Mindfulness Coach",
          duration: "5:00",
          url: "https://www.bensound.com/bensound-music/bensound-relaxing.mp3",
          tags: ["breathing", "meditation", "relax", "mindful"]
        },
        {
          title: "Spa Music",
          artist: "Wellness Sounds",
          duration: "11:20",
          url: "https://www.bensound.com/bensound-music/bensound-sunny.mp3",
          tags: ["spa", "massage", "relax", "healing"]
        },
        {
          title: "Night Crickets",
          artist: "Evening Ambience",
          duration: "8:00",
          url: "https://www.bensound.com/bensound-music/bensound-clearday.mp3",
          tags: ["crickets", "night", "sleep", "nature"]
        },
        {
          title: "Cosmic Dreams",
          artist: "Electronic Ambient",
          duration: "9:30",
          url: "https://www.bensound.com/bensound-music/bensound-deepdive.mp3",
          tags: ["ambient", "electronic", "dreamy", "sleep"]
        },
        {
          title: "Healing Frequencies",
          artist: "Binaural Beats",
          duration: "10:45",
          url: "https://www.bensound.com/bensound-music/bensound-straight.mp3",
          tags: ["binaural", "healing", "frequency", "meditation"]
        }
      ],
      techniques: [
        'Listen to calming instrumental music (classical, ambient)',
        'Nature sounds like rain, ocean waves, or forest ambience',
        'Binaural beats for meditation and focus',
        'Guided relaxation and meditation audio'
      ],
      duration: 'Practice for 15-30 minutes daily, preferably before bedtime or during breaks',
      tips: [
        'Use comfortable headphones for immersive experience',
        'Create a quiet, comfortable space',
        'Close your eyes and focus on the sounds',
        'Combine with deep breathing exercises'
      ],
      whyAudio: [
        { icon: '🎵', title: 'Instant Calm', desc: 'Music activates the parasympathetic nervous system within seconds' },
        { icon: '🧠', title: 'Brain Rewiring', desc: 'Sound frequencies can alter brainwave patterns for relaxation' },
        { icon: '💤', title: 'Better Sleep', desc: 'Ambient sounds help you fall asleep faster and deeper' },
        { icon: '🎯', title: 'Enhanced Focus', desc: 'Certain frequencies improve concentration and productivity' },
        { icon: '❤️', title: 'Heart Health', desc: 'Calming music lowers heart rate and blood pressure' },
        { icon: '😌', title: 'Mood Boost', desc: 'Music releases dopamine and reduces cortisol levels' }
      ],
      soundCategories: [
        { name: 'Nature Sounds', emoji: '🌿', desc: 'Rain, ocean, forest ambience' },
        { name: 'Instrumental', emoji: '🎹', desc: 'Piano, guitar, ambient music' },
        { name: 'Binaural Beats', emoji: '🔊', desc: 'Frequency-based healing' },
        { name: 'Meditation', emoji: '🧘', desc: 'Guided relaxation audio' }
      ],
      listeningGuide: {
        morning: { time: '10-15 mins', type: 'Energizing', tip: 'Start with uplifting instrumentals' },
        afternoon: { time: '15-20 mins', type: 'Focus', tip: 'Use binaural beats for productivity' },
        evening: { time: '20-30 mins', type: 'Relaxation', tip: 'Wind down with nature sounds' }
      },
      audioTips: [
        'Use quality headphones for full immersion',
        'Find a quiet, comfortable space',
        'Close your eyes to enhance the experience',
        'Match the sound to your current mood',
        'Combine with deep breathing exercises',
        'Create playlists for different activities',
        'Try different genres to find what works',
        'Use sleep timers for bedtime listening'
      ]
    }
  },
  {
    id: 'reading',
    icon: BookOpen,
    title: 'Reading Therapy',
    color: '#5B9BD5',
    description: 'Lose yourself in a book. Reading uplifting stories, self-help guides, or even poetry can provide comfort and a fresh perspective.',
    details: {
      benefits: [
        'Provides mental escape and reduces stress',
        'Improves cognitive function and focus',
        'Enhances empathy and emotional intelligence',
        'Promotes better sleep when done before bed'
      ],
      books: [
        { 
          title: "Atomic Habits", 
          author: "James Clear", 
          description: "A revolutionary system to get 1% better every day. Learn how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1655988385i/40121378.jpg",
          readUrl: "https://archive.org/details/atomic-habits-james-clear/mode/2up"
        },
        { 
          title: "The Alchemist", 
          author: "Paulo Coelho", 
          description: "A mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure, teaching us about the essential wisdom of listening to our hearts.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1654371463i/18144590.jpg",
          readUrl: "https://archive.org/details/the-alchemist_202004/mode/2up"
        },
        { 
          title: "Can't Hurt Me", 
          author: "David Goggins", 
          description: "For David Goggins, childhood was a nightmare. Through self-discipline and mental toughness, he transformed himself from a depressed, overweight young man into a US Armed Forces icon.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1536184191i/41721428.jpg",
          readUrl: "https://archive.org/details/cant-hurt-me-by-david-goggins/mode/2up"
        },
        { 
          title: "The Power of Now", 
          author: "Eckhart Tolle", 
          description: "A guide to spiritual enlightenment that shows how to live in the present moment and free yourself from pain and anxiety.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1386925535i/6708.jpg",
          readUrl: "https://archive.org/details/powerofnow00toll/mode/2up"
        },
        { 
          title: "Think and Grow Rich", 
          author: "Napoleon Hill", 
          description: "The timeless classic on success principles, teaching the philosophy of achievement through desire, faith, and persistence.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1463241782i/30186948.jpg",
          readUrl: "https://archive.org/details/thinkgrowrich00hill/mode/2up"
        },
        { 
          title: "Man's Search for Meaning", 
          author: "Viktor E. Frankl", 
          description: "A powerful memoir and psychological exploration of finding purpose in suffering, based on Frankl's experiences in Nazi concentration camps.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1535419394i/4069.jpg",
          readUrl: "https://archive.org/details/manssearchformea00fran/mode/2up"
        },
        { 
          title: "The 7 Habits of Highly Effective People", 
          author: "Stephen R. Covey", 
          description: "A business and self-help book that presents an approach to being effective in attaining goals by aligning oneself to universal principles.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421842784i/36072.jpg",
          readUrl: "https://archive.org/details/7habitsofhighlyeffectivepeople/mode/2up"
        },
        { 
          title: "How to Win Friends and Influence People", 
          author: "Dale Carnegie", 
          description: "The first and still the best book of its kind, teaching fundamental techniques in handling people and ways to make people like you.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1442726934i/4865.jpg",
          readUrl: "https://archive.org/details/how-to-win-friends-and-influence-people_202003/mode/2up"
        },
        { 
          title: "The Secret", 
          author: "Rhonda Byrne", 
          description: "The Secret reveals the most powerful law in the universe - the law of attraction. Learn how your thoughts can transform your life.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1659086328i/52529.jpg",
          readUrl: "https://archive.org/details/secret00byrn/mode/2up"
        },
        { 
          title: "Rich Dad Poor Dad", 
          author: "Robert T. Kiyosaki", 
          description: "What the rich teach their kids about money that the poor and middle class do not! A #1 personal finance book of all time.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388211242i/69571.jpg",
          readUrl: "https://archive.org/details/richdadpoordadwh00kiyo/mode/2up"
        },
        { 
          title: "The Subtle Art of Not Giving a F*ck", 
          author: "Mark Manson", 
          description: "A counterintuitive approach to living a good life. Learn how to embrace your limitations and stop trying to be positive all the time.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1465761302i/28257707.jpg",
          readUrl: "https://archive.org/details/subtleartofnotgi0000mans/mode/2up"
        },
        { 
          title: "Meditations", 
          author: "Marcus Aurelius", 
          description: "Personal writings of the Roman Emperor Marcus Aurelius, recording his private notes on Stoic philosophy and self-improvement.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421618636i/30659.jpg",
          readUrl: "https://archive.org/details/meditationsofmar00marc/mode/2up"
        },
        { 
          title: "The Four Agreements", 
          author: "Don Miguel Ruiz", 
          description: "Reveals the source of self-limiting beliefs that rob us of joy and create needless suffering. Based on ancient Toltec wisdom.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1347561963i/6596.jpg",
          readUrl: "https://archive.org/details/fouragreementspracticalguide/mode/2up"
        },
        { 
          title: "As a Man Thinketh", 
          author: "James Allen", 
          description: "A literary essay that reveals how our thoughts shape our reality. A timeless classic on the power of the mind.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1327942607i/81959.jpg",
          readUrl: "https://archive.org/details/asamanthinketh00alle/mode/2up"
        },
        { 
          title: "The Magic of Thinking Big", 
          author: "David J. Schwartz", 
          description: "Millions have acquired the secrets of success through this book. Learn the habits of thinking and behaving that will lead to success.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388177859i/759945.jpg",
          readUrl: "https://archive.org/details/magicofthinkingb00schw/mode/2up"
        },
        { 
          title: "Who Moved My Cheese?", 
          author: "Spencer Johnson", 
          description: "An amazing way to deal with change in your work and in your life. A simple parable that reveals profound truths.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388639717i/4894.jpg",
          readUrl: "https://archive.org/details/whomovedmycheese00john/mode/2up"
        },
        { 
          title: "The Richest Man in Babylon", 
          author: "George S. Clason", 
          description: "The success secrets of the ancients, offering timeless advice on financial wisdom through parables set in ancient Babylon.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1348336780i/1052.jpg",
          readUrl: "https://archive.org/details/richestmaninbaby00clas/mode/2up"
        },
        { 
          title: "Awaken the Giant Within", 
          author: "Tony Robbins", 
          description: "How to take immediate control of your mental, emotional, physical and financial destiny. A guide to self-mastery.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388173777i/180116.jpg",
          readUrl: "https://archive.org/details/awakengiantwith00robb/mode/2up"
        },
        { 
          title: "The Power of Positive Thinking", 
          author: "Norman Vincent Peale", 
          description: "A practical guide to mastering the problems of everyday living. Learn how positive thinking can transform your life.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1388173624i/1134121.jpg",
          readUrl: "https://archive.org/details/powerofpositiv00peal/mode/2up"
        },
        { 
          title: "Feeling Good: The New Mood Therapy", 
          author: "David D. Burns", 
          description: "The clinically proven drug-free treatment for depression. Revolutionary techniques to overcome negative thinking.",
          cover: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1630822249i/46674.jpg",
          readUrl: "https://archive.org/details/feelinggood00burn/mode/2up"
        }
      ],
      recommendations: [
        'Self-help books: "The Power of Now" by Eckhart Tolle',
        'Fiction for escapism: Light-hearted novels or fantasy',
        'Poetry collections for emotional expression',
        'Mindfulness books: "Wherever You Go, There You Are" by Jon Kabat-Zinn'
      ],
      duration: 'Read for 20-30 minutes daily in a comfortable setting',
      tips: [
        'Choose physical books over screens before bedtime',
        'Create a cozy reading nook',
        'Join a book club for social connection',
        'Keep a reading journal to reflect on insights'
      ],
      whyReading: [
        { icon: '🧠', title: 'Mental Escape', desc: 'Transport yourself to different worlds and take a break from daily stress' },
        { icon: '📚', title: 'Knowledge Growth', desc: 'Expand your understanding and gain new perspectives on life' },
        { icon: '💡', title: 'Creativity Boost', desc: 'Stimulate imagination and creative thinking through stories' },
        { icon: '😌', title: 'Stress Relief', desc: 'Lower cortisol levels and achieve deep relaxation' },
        { icon: '🌙', title: 'Better Sleep', desc: 'Reading before bed improves sleep quality naturally' },
        { icon: '❤️', title: 'Emotional Intelligence', desc: 'Develop empathy by experiencing different perspectives' }
      ],
      bookCategories: [
        { name: 'Self-Development', emoji: '🚀', color: 'blue' },
        { name: 'Mindfulness & Spirituality', emoji: '🧘', color: 'purple' },
        { name: 'Financial Wisdom', emoji: '💰', color: 'green' },
        { name: 'Psychology & Mind', emoji: '🧠', color: 'pink' }
      ],
      readingGuide: {
        beginner: { time: '15-20 mins', books: '1-2 books/month', tip: 'Start with short, engaging books' },
        intermediate: { time: '30-45 mins', books: '3-4 books/month', tip: 'Mix genres for variety' },
        advanced: { time: '1+ hour', books: '5+ books/month', tip: 'Take notes and apply learnings' }
      },
      readingTips: [
        'Create a distraction-free reading environment',
        'Set a specific reading time each day',
        'Keep a reading journal for insights',
        'Mix audiobooks with physical reading',
        'Join a book club for accountability',
        'Always have your next book ready',
        'Take breaks to reflect on what you read',
        'Apply one lesson from each book you finish'
      ]
    }
  },
  {
    id: 'yoga',
    icon: Activity,
    title: 'Yoga Therapy',
    color: '#70AD47',
    description: 'Discover the ancient art of yoga - a holistic practice that unites body, mind, and spirit. Through mindful movement and breath, yoga helps release tension, build strength, and cultivate inner peace.',
    details: {
      benefits: [
        'Significantly reduces cortisol and stress hormones for deep relaxation',
        'Builds functional strength, flexibility, and improved posture',
        'Enhances respiratory function and cardiovascular health',
        'Deepens mind-body awareness and emotional regulation',
        'Improves sleep quality and reduces anxiety symptoms',
        'Boosts immune system and overall vitality'
      ],
      whyYoga: [
        { icon: '🧘', title: 'Ancient Wisdom', desc: '5000+ years of proven techniques for holistic wellness' },
        { icon: '💪', title: 'Physical Strength', desc: 'Build lean muscle and improve flexibility naturally' },
        { icon: '🧠', title: 'Mental Clarity', desc: 'Sharpen focus and reduce mental fog through breathwork' },
        { icon: '❤️', title: 'Emotional Balance', desc: 'Process emotions and cultivate inner peace' },
        { icon: '🌙', title: 'Better Sleep', desc: 'Relax your nervous system for deeper, restful sleep' },
        { icon: '⚡', title: 'Energy Boost', desc: 'Increase vitality and reduce chronic fatigue' }
      ],
      practiceGuide: {
        beginner: {
          duration: '15-20 minutes',
          frequency: '3-4 times per week',
          focus: 'Basic poses, breath awareness, gentle stretching'
        },
        intermediate: {
          duration: '30-45 minutes',
          frequency: '4-5 times per week',
          focus: 'Flow sequences, balance poses, pranayama'
        },
        advanced: {
          duration: '60-90 minutes',
          frequency: '5-6 times per week',
          focus: 'Advanced asanas, meditation, inversions'
        }
      },
      quickTips: [
        'Practice on an empty stomach or 2-3 hours after meals',
        'Wear comfortable, breathable clothing',
        'Use a quality yoga mat for grip and cushioning',
        'Listen to your body - never force a pose',
        'Focus on breath - it guides your practice',
        'Stay hydrated before and after practice',
        'Create a calm, distraction-free space',
        'Be consistent - even 10 minutes daily helps'
      ],
      asanas: [
        // RELAXATION & STRESS RELIEF
        { 
          name: "Child's Pose (Balasana)", 
          description: "A gentle resting pose that stretches the back and hips while calming the nervous system.",
          category: "Relaxation & Stress Relief",
          image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop",
          benefits: ["Calms the brain and relieves stress", "Gently stretches hips, thighs, and ankles", "Relieves back and neck pain", "Promotes relaxation and steady breathing"]
        },
        { 
          name: "Corpse Pose (Savasana)", 
          description: "The ultimate relaxation pose to integrate the benefits of your practice into the body.",
          category: "Relaxation & Stress Relief",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop",
          benefits: ["Deeply relaxes the entire body", "Reduces blood pressure and anxiety", "Decreases headache and fatigue", "Helps with insomnia"]
        },
        { 
          name: "Legs Up The Wall (Viparita Karani)", 
          description: "A restorative inversion that promotes relaxation and reduces swelling in legs.",
          category: "Relaxation & Stress Relief",
          image: "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=400&h=300&fit=crop",
          benefits: ["Relieves tired or cramped legs", "Calms the mind", "Gently stretches hamstrings", "Reduces stress and anxiety"]
        },
        { 
          name: "Reclined Bound Angle (Supta Baddha Konasana)", 
          description: "A restorative hip opener that releases tension and promotes deep relaxation.",
          category: "Relaxation & Stress Relief",
          image: "https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?w=400&h=300&fit=crop",
          benefits: ["Opens hips and groin", "Stimulates heart and improves circulation", "Relieves symptoms of stress", "Calms the nervous system"]
        },
        
        // FLEXIBILITY & STRETCHING
        { 
          name: "Cat-Cow (Chakravakasana)", 
          description: "A dynamic movement that synchronizes breath with movement to relieve spinal tension.",
          category: "Flexibility & Stretching",
          image: "https://images.unsplash.com/photo-1573384666979-2b1e160d2d08?w=400&h=300&fit=crop",
          benefits: ["Improves posture and balance", "Strengthens and stretches spine", "Massages and stimulates organs", "Relieves stress and calms mind"]
        },
        { 
          name: "Downward Dog (Adho Mukha Svanasana)", 
          description: "A foundational pose that stretches the entire back body while building strength.",
          category: "Flexibility & Stretching",
          image: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=300&fit=crop",
          benefits: ["Stretches shoulders, hamstrings, calves", "Strengthens arms and legs", "Energizes the body", "Relieves headache and insomnia"]
        },
        { 
          name: "Seated Forward Bend (Paschimottanasana)", 
          description: "A calming forward fold that deeply stretches the spine and hamstrings.",
          category: "Flexibility & Stretching",
          image: "https://images.unsplash.com/photo-1510894347713-fc3ed6fdf539?w=400&h=300&fit=crop",
          benefits: ["Stretches spine, shoulders, hamstrings", "Calms the brain and relieves stress", "Reduces anxiety and fatigue", "Stimulates digestive organs"]
        },
        { 
          name: "Pigeon Pose (Eka Pada Rajakapotasana)", 
          description: "A deep hip opener that releases stored tension and emotions.",
          category: "Flexibility & Stretching",
          image: "https://images.unsplash.com/photo-1562088287-bde35a1ea917?w=400&h=300&fit=crop",
          benefits: ["Opens hip flexors and rotators", "Stretches thighs and groin", "Releases stored stress and trauma", "Increases hip flexibility"]
        },
        
        // BALANCE & FOCUS
        { 
          name: "Tree Pose (Vrikshasana)", 
          description: "A balancing pose that improves concentration and strengthens the legs and core.",
          category: "Balance & Focus",
          image: "https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?w=400&h=300&fit=crop",
          benefits: ["Improves balance and stability", "Strengthens thighs, calves, ankles", "Increases focus and concentration", "Reduces flat feet"]
        },
        { 
          name: "Eagle Pose (Garudasana)", 
          description: "A challenging balance pose that improves focus and stretches shoulders and hips.",
          category: "Balance & Focus",
          image: "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?w=400&h=300&fit=crop",
          benefits: ["Improves concentration and balance", "Stretches shoulders and upper back", "Strengthens legs and ankles", "Opens tight shoulders and hips"]
        },
        { 
          name: "Warrior III (Virabhadrasana III)", 
          description: "An energizing balance pose that strengthens the entire body.",
          category: "Balance & Focus",
          image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&h=300&fit=crop",
          benefits: ["Strengthens ankles, legs, shoulders", "Tones the abdomen", "Improves balance and posture", "Calms the mind and improves memory"]
        },
        { 
          name: "Half Moon (Ardha Chandrasana)", 
          description: "A powerful balancing pose that opens the hips and strengthens the legs.",
          category: "Balance & Focus",
          image: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?w=400&h=300&fit=crop",
          benefits: ["Strengthens abdomen, thighs, buttocks", "Stretches groin, hamstrings, calves", "Improves coordination and balance", "Relieves stress"]
        },
        
        // STRENGTH & ENERGY
        { 
          name: "Warrior I (Virabhadrasana I)", 
          description: "A powerful standing pose that builds strength and confidence.",
          category: "Strength & Energy",
          image: "https://images.unsplash.com/photo-1558017487-06bf9f82613a?w=400&h=300&fit=crop",
          benefits: ["Strengthens shoulders, arms, legs", "Opens hips and chest", "Develops concentration and balance", "Energizes the entire body"]
        },
        { 
          name: "Warrior II (Virabhadrasana II)", 
          description: "A grounding pose that builds stamina and concentration.",
          category: "Strength & Energy",
          image: "https://images.unsplash.com/photo-1573590330099-d6c7355ec595?w=400&h=300&fit=crop",
          benefits: ["Strengthens and stretches legs and ankles", "Opens chest, lungs, shoulders", "Stimulates abdominal organs", "Increases stamina"]
        },
        { 
          name: "Plank Pose (Phalakasana)", 
          description: "A core-strengthening pose that builds overall body strength.",
          category: "Strength & Energy",
          image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?w=400&h=300&fit=crop",
          benefits: ["Strengthens arms, wrists, spine", "Tones the abdomen", "Builds endurance", "Prepares body for arm balances"]
        },
        { 
          name: "Chair Pose (Utkatasana)", 
          description: "A powerful pose that builds heat and strengthens the lower body.",
          category: "Strength & Energy",
          image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop",
          benefits: ["Strengthens thighs, calves, spine", "Stretches shoulders and chest", "Stimulates heart and diaphragm", "Reduces flat feet"]
        },
        
        // BREATHING & MEDITATION
        { 
          name: "Easy Pose (Sukhasana)", 
          description: "A comfortable seated position ideal for meditation and pranayama.",
          category: "Breathing & Meditation",
          image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
          benefits: ["Calms the brain", "Strengthens the back", "Stretches knees and ankles", "Opens hips and groin"]
        },
        { 
          name: "Lotus Pose (Padmasana)", 
          description: "The classic meditation pose that promotes stillness and inner peace.",
          category: "Breathing & Meditation",
          image: "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=400&h=300&fit=crop",
          benefits: ["Calms the brain", "Stimulates pelvis, spine, abdomen", "Stretches ankles and knees", "Increases awareness and focus"]
        },
        { 
          name: "Hero Pose (Virasana)", 
          description: "A grounding seated pose that stretches the thighs and improves digestion.",
          category: "Breathing & Meditation",
          image: "https://images.unsplash.com/photo-1602192509154-0b900ee1f851?w=400&h=300&fit=crop",
          benefits: ["Stretches thighs, knees, ankles", "Reduces swelling in legs", "Improves digestion", "Therapeutic for high blood pressure"]
        },
        { 
          name: "Staff Pose (Dandasana)", 
          description: "A foundational seated pose that improves posture and prepares for deeper stretches.",
          category: "Breathing & Meditation",
          image: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400&h=300&fit=crop",
          benefits: ["Strengthens back muscles", "Stretches shoulders and chest", "Improves posture", "Calms brain cells"]
        }
      ],
      poses: [
        'Child\'s Pose (Balasana) - Calming and grounding',
        'Cat-Cow Stretch (Marjaryasana-Bitilasana) - Releases tension',
        'Legs-Up-The-Wall (Viparita Karani) - Relaxation',
        'Corpse Pose (Savasana) - Deep relaxation'
      ],
      duration: 'Practice 20-45 minutes, 3-5 times per week',
      tips: [
        'Start with beginner-friendly classes or videos',
        'Focus on breath awareness throughout practice',
        'Use props like blocks and straps for support',
        'Practice in a quiet, well-ventilated space'
      ]
    }
  },
  {
    id: 'doctor',
    icon: User,
    title: 'Consult a Doctor',
    color: '#FF6B9D',
    description: 'If stress is overwhelming and persistent, seeking professional help is the best step. A doctor or therapist can provide tailored guidance to support your mental health.',
    details: {
      benefits: [
        'Professional diagnosis and treatment plan',
        'Access to therapy and counseling services',
        'Medication management if needed',
        'Personalized coping strategies'
      ],
      when: [
        'Stress interferes with daily activities',
        'Physical symptoms persist (headaches, fatigue)',
        'Experiencing anxiety or depression',
        'Difficulty sleeping or concentrating',
        'Thoughts of self-harm'
      ],
      options: [
        'Primary care physician for initial consultation',
        'Licensed therapist or psychologist',
        'Psychiatrist for medication management',
        'Online therapy platforms for convenience'
      ],
      duration: 'Seek help immediately if experiencing severe symptoms',
      tips: [
        'Be honest about your symptoms and feelings',
        'Prepare questions before your appointment',
        'Consider therapy as a sign of strength',
        'Follow through with recommended treatment plans'
      ],
      whyDoctor: [
        { icon: '🩺', title: 'Expert Diagnosis', desc: 'Get accurate assessment of your mental health condition' },
        { icon: '📊', title: 'Treatment Plans', desc: 'Receive personalized, evidence-based treatment strategies' },
        { icon: '💊', title: 'Medication Support', desc: 'Access to prescribed medications when needed' },
        { icon: '🧠', title: 'Cognitive Therapy', desc: 'Learn techniques to manage thoughts and behaviors' },
        { icon: '🤝', title: 'Ongoing Support', desc: 'Build a lasting relationship with your care provider' },
        { icon: '🔒', title: 'Confidential Care', desc: 'Your privacy is protected by law' }
      ],
      specialists: [
        { name: 'Psychiatrist', emoji: '🩺', desc: 'Medical doctor specializing in mental health, can prescribe medication', color: 'pink' },
        { name: 'Psychologist', emoji: '🧠', desc: 'Expert in talk therapy and psychological testing', color: 'purple' },
        { name: 'Therapist/Counselor', emoji: '💬', desc: 'Licensed professional for talk therapy and coping strategies', color: 'blue' },
        { name: 'Primary Care Doctor', emoji: '👨‍⚕️', desc: 'First point of contact, can refer to specialists', color: 'green' }
      ],
      consultationGuide: {
        before: { title: 'Before Visit', tips: ['Write down your symptoms', 'List current medications', 'Note questions to ask', 'Bring insurance info'] },
        during: { title: 'During Visit', tips: ['Be open and honest', 'Describe symptoms clearly', 'Ask about treatment options', 'Discuss side effects'] },
        after: { title: 'After Visit', tips: ['Follow treatment plan', 'Schedule follow-ups', 'Track your progress', 'Reach out if needed'] }
      },
      preparationTips: [
        'Keep a symptom journal for 1-2 weeks before',
        'List all medications and supplements',
        'Write down your top 3 concerns',
        'Bring a trusted friend or family member',
        'Know your family mental health history',
        'Be ready to discuss lifestyle factors',
        'Prepare questions about treatment options',
        'Set realistic expectations for the visit'
      ]
    }
  }
];