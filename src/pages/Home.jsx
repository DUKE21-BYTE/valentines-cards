import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import '../styles/Home.css';

// Decorative "Gift Heart" component to simulate the image graphics
const GiftHeart = ({ color, dots, delay, x, y, size, rotation }) => (
  <motion.div
    initial={{ y: y + 20, opacity: 0 }}
    animate={{ y: y, opacity: 1, rotate: rotation }}
    transition={{ duration: 1, delay: delay, type: 'spring' }}
    style={{
      position: 'absolute',
      left: x,
      top: y,
      width: size,
      height: size,
      zIndex: 1
    }}
    className={`gift-heart ${color}`}
  >
    <div className="heart-shape">
       {dots && <div className="dots-pattern"></div>}
       <div className="ribbon-vertical"></div>
       <div className="ribbon-horizontal"></div>
       <div className="bow"></div>
    </div>
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="home-container">
      {/* Background Graphic: White Wave */}
      <div className="bg-wave"></div>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-left">
          {/* Logo or Brand Name could go here */}
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', color: '#ff4d6d' }}>VI💖</span>
        </div>
        <div className="nav-right">
          <a href="#" className="active">Home</a>
          <a onClick={() => handleNavigate('/create')} style={{cursor: 'pointer'}}>Create</a>
          <a href="#">About</a>
        </div>
      </nav>

      {/* Main Content Grid */}
      <div className="hero-section">
        
        {/* Left Side: Decorative Canvas */}
        <div className="hero-visuals">
             {/* Large Red Dot Heart */}
             <GiftHeart color="red" dots={true} x="10%" y="20%" size={120} rotation={-15} delay={0.2} />
             {/* Black Polka Heart */}
             <GiftHeart color="black" dots={true} x="5%" y="60%" size={160} rotation={10} delay={0.4} />
             {/* Small Floating Hearts */}
             <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} style={{ position: 'absolute', left: '30%', top: '10%' }}>
                <Heart fill="#ff4d6d" stroke="none" size={40} />
             </motion.div>
             <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, delay: 1 }} style={{ position: 'absolute', left: '15%', top: '40%' }}>
                <Heart fill="#ffb3c1" stroke="none" size={30} />
             </motion.div>
             
             {/* Central/Lower gifts */}
             <GiftHeart color="red" dots={true} x="40%" y="40%" size={140} rotation={-5} delay={0.6} />
             <GiftHeart color="red" dots={true} x="60%" y="75%" size={130} rotation={15} delay={0.8} />
             <GiftHeart color="black" dots={true} x="85%" y="80%" size={100} rotation={-10} delay={1} />
        </div>

        {/* Right Side: Text & Action */}
        <div className="hero-content">
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">Make This Valentine's Unforgettable</h1>
            <p className="hero-text">
              Write a heartfelt letter, send a fun quiz, or share a custom virtual card — all personalized for them.
            </p>

            <div className="input-field-wrapper">
              <label className="input-label">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNavigate('/create')}
                className="name-input"
              />
            </div>

            <div className="cta-container">
               <button onClick={() => {
                   // Pass name to create page if needed (future improvement)
                   handleNavigate('/create')
               }} className="btn-main">Start Your Valentine</button>
               <button onClick={() => handleNavigate('/quiz')} className="btn-text">Take a Demo Quiz</button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Simple Footer */}
      <footer style={{ 
          position: 'absolute', 
          bottom: '1rem', 
          width: '100%', 
          textAlign: 'center', 
          zIndex: 10,
          fontSize: '0.8rem',
          color: '#888'
      }}>
          <p>© 2024 Valentine Interactive | <a href="/legal" style={{ color: '#888', textDecoration: 'underline' }}>Legal & Privacy</a></p>
      </footer>
    </div>
  );
}
