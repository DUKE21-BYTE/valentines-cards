import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Maximize2 } from 'lucide-react';
import BackButton from '../components/BackButton';
import { useValentine } from '../context/ValentineContext';
import '../styles/Card.css';

export default function Card() {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useValentine();

  return (
    <div className="card-page-container">
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 100 }}>
        <BackButton className="glass" />
      </div>

      <div className="card-scene">
        <motion.div 
          className={`card-3d ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          initial={{ rotateY: 0 }}
          animate={{ rotateY: isOpen ? 180 : 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="card-front">
            <div className="heart-pattern"></div>
            <div className="card-title-box">
              <h2>To {data.recipientName}</h2>
              <p>Tap to Open</p>
            </div>
          </div>

          <div className="card-inside">
            <div className="card-left">
              <div className="photo-placeholder" style={{ 
                backgroundImage: data.cardImage ? `url(${data.cardImage})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}>
                {!data.cardImage && <span>[Photo]</span>}
              </div>
            </div>
            <div className="card-right">
              <h3>Happy Valentine's Day!</h3>
              <p>
                {data.cardMessage || "Wishing you a day filled with love, laughter, and all your favorite things. I'm so lucky to have you in my life."}
              </p>
              <p className="love-sign">Love, {data.senderName} xoxo</p>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="instruction-text">Tap the card to {isOpen ? 'close' : 'open'} it</p>
    </div>
  );
}
