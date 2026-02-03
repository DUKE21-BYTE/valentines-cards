import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import BackButton from '../components/BackButton';
import { useValentine } from '../context/ValentineContext';
import '../styles/Letter.css';

export default function Letter() {
  const { data } = useValentine();
  const letterContent = data.letter;

  return (
    <div className="letter-container">
      <div style={{ alignSelf: 'flex-start', maxWidth: '700px', width: '100%' }}>
         <BackButton />
      </div>

      <div className="envelope-wrapper">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="paper"
        >
          <div className="letter-content">
            <h2 className="greeting">{letterContent.recipient}</h2>
            
            {/* Handle both array (original) and string (new input) body format */}
            {Array.isArray(letterContent.body) ? (
              letterContent.body.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + (index * 0.3) }}
                  className="paragraph"
                >
                  {paragraph}
                </motion.p>
              ))
            ) : (
             <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="paragraph whitespace-pre-wrap"
              >
                {letterContent.body}
              </motion.p>
            )}

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="signature-block"
            >
              <p className="closing">{letterContent.sender}</p>
              <div className="signature-line"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <div className="actions">
        <Link to="/card" className="next-btn-outline">See Your Card →</Link>
      </div>
    </div>
  );
}
