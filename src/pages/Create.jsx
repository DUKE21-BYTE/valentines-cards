import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useValentine } from '../context/ValentineContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Link as LinkIcon, Check, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import BackButton from '../components/BackButton';
import '../styles/Create.css';

export default function Create() {
  const { createValentine, data } = useValentine();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [formData, setFormData] = useState({
    senderName: '',
    recipientName: '',
    letter: { recipient: '', body: '', sender: '' },
    cardMessage: '',
    cardImage: null
  });

  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleInputChange('cardImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const finalData = {
      ...formData,
      letter: {
        recipient: `My Dearest ${formData.recipientName},`,
        body: formData.letter.body || "I love you so much!",
        sender: `Love, ${formData.senderName}`
      }
    };
    
    if (formData.cardImage) {
        finalData.cardImage = formData.cardImage; 
    }

    const id = await createValentine(finalData);
    const baseUrl = window.location.origin;
    setGeneratedLink(`${baseUrl}/v/${id}`);
    setStep(4); // Finished
  };

  return (
    <div className="create-container">
       <div style={{ width: '100%', maxWidth: '700px' }}>
         <BackButton />
       </div>

      <div className="glass-panel create-wrapper">
        <h1 className="create-title">Create Your Valentine 💝</h1>
        <p className="create-subtitle">Step {step} of 3</p>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1"
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-anim-wrapper"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#590d22]">The Basics</h2>
              <div className="input-group">
                <label>Your Name</label>
                <input 
                  className="premium-input"
                  value={formData.senderName}
                  onChange={(e) => handleInputChange('senderName', e.target.value)}
                  placeholder="e.g. Romeo"
                />
              </div>
              <div className="input-group">
                <label>Their Name</label>
                <input 
                  className="premium-input"
                  value={formData.recipientName}
                  onChange={(e) => handleInputChange('recipientName', e.target.value)}
                  placeholder="e.g. Juliet"
                />
              </div>
              
              <button 
                onClick={() => setStep(2)} 
                disabled={!formData.senderName || !formData.recipientName}
                className="btn-primary"
              >
                Next Step <ArrowRight size={18} />
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-anim-wrapper"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#590d22]">Write from the Heart</h2>
              <div className="input-group">
                <label>Love Letter Body</label>
                <textarea 
                  className="premium-input"
                  style={{ height: '150px', resize: 'none' }}
                  value={formData.letter.body}
                  onChange={(e) => setFormData({...formData, letter: {...formData.letter, body: e.target.value}})}
                  placeholder="My love, every moment with you..."
                />
              </div>
              <div className="flex gap-4 mt-6">
                 <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                 <button onClick={() => setStep(3)} className="btn-primary">Next Step <ArrowRight size={18} /></button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div 
              key="step3"
              initial={{ x: 20, opacity: 0 }} 
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="step-anim-wrapper"
            >
              <h2 className="text-2xl font-bold mb-6 text-[#590d22]">Customize the Card</h2>
              
              <div className="input-group">
                  <label>Upload a Photo (Optional)</label>
                  <div className="photo-upload-box">
                      <input type="file" onChange={handleImageUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                      {formData.cardImage ? (
                          <div className="image-preview-wrapper">
                              <img src={formData.cardImage} alt="Preview" className="image-preview" />
                          </div>
                      ) : (
                          <div className="flex flex-col items-center text-gray-500">
                              <Upload size={32} className="mb-2 text-[#ffb3c1]" />
                              <span>Click to upload image</span>
                          </div>
                      )}
                  </div>
              </div>

              <div className="input-group">
                  <label>Short Card Message</label>
                  <input 
                    className="premium-input"
                    value={formData.cardMessage}
                    onChange={(e) => handleInputChange('cardMessage', e.target.value)}
                    placeholder="Happy Valentine's Day!"
                  />
              </div>

               <div className="flex gap-4 mt-8">
                 <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                 <button onClick={() => handleSubmit()} className="btn-primary">Finish & Create ✨</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ scale: 0.9, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }}
                className="success-card"
              >
                  <div className="success-icon-box">
                      <Check size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#590d22] mb-2">Valentine Created!</h2>
                  <p className="text-gray-600 mb-8">Your special surprise is ready to be shared.</p>
                  
                  <div className="link-box">
                      <LinkIcon size={20} className="text-gray-400" />
                      <input readOnly value={generatedLink} className="link-input" />
                      <button 
                          onClick={() => {
                              navigator.clipboard.writeText(generatedLink);
                              setCopied(true);
                              setTimeout(() => setCopied(false), 2000);
                          }}
                          className="copy-btn"
                      >
                          {copied ? <Check size={18} className="text-green-600"/> : "Copy"}
                      </button>
                  </div>

                  <div className="flex gap-4 justify-center">
                      <a href={generatedLink} target="_blank" className="text-[#9d0208] font-bold hover:underline">Open Link</a>
                      <span className="text-gray-300">|</span>
                      <button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-800">Back Home</button>
                  </div>

                  <div className="whatsapp-section">
                      <h3 className="text-lg font-bold mb-3 text-[#25D366] flex items-center justify-center gap-2">
                          <MessageCircle size={24} /> Send via WhatsApp
                      </h3>
                      
                      <div className="wa-input-wrapper">
                          <input 
                              placeholder="Phone (e.g. 15551234567)" 
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              className="premium-input"
                              style={{ padding: '0.8rem' }}
                          />
                          <button 
                              onClick={() => {
                                  if (!phoneNumber) return;
                                  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
                                  const msg = encodeURIComponent(`I made something special just for you! 💖\n\nClick here: ${generatedLink}`);
                                  const waUrl = `https://wa.me/${cleanNumber}?text=${msg}`;
                                  window.open(waUrl, '_blank');
                              }}
                              className="wa-btn"
                          >
                              Send 🚀
                          </button>
                      </div>
                  </div>
              </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
