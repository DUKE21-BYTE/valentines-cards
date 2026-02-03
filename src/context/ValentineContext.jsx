import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { questions as defaultQuestions } from '../data/questions';
import { letterContent as defaultLetter } from '../data/letter';

const ValentineContext = createContext();

export function ValentineProvider({ children }) {
  // Default State
  const [data, setData] = useState({
    senderName: "Admirer",
    recipientName: "Valentine",
    questions: defaultQuestions,
    letter: defaultLetter,
    cardImage: null,
    cardMessage: "Happy Valentine's Day!",
  });

  const [loading, setLoading] = useState(false);

  const loadValentine = async (id) => {
    setLoading(true);
    try {
      const { data: valData, error } = await supabase
        .from('valentines')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error loading valentine:", error);
        return false;
      }

      if (valData) {
        setData({
            senderName: valData.sender_name,
            recipientName: valData.recipient_name,
            questions: valData.questions,
            letter: valData.letter,
            cardImage: valData.card_image,
            cardMessage: valData.card_message
        });
        return true;
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const createValentine = async (newData) => {
    setLoading(true);
    try {
        const { data: insertedData, error } = await supabase
            .from('valentines')
            .insert([
                { 
                    sender_name: newData.senderName,
                    recipient_name: newData.recipientName,
                    questions: newData.questions,
                    letter: newData.letter,
                    card_image: newData.cardImage,
                    card_message: newData.cardMessage
                }
            ])
            .select()
            .single();

        if (error) {
            console.error("Error creating valentine:", error);
            // Fallback to local storage if DB fails (e.g. table not created yet)
            const id = Date.now().toString(36);
            localStorage.setItem(`valentine_${id}`, JSON.stringify(newData));
            alert("Database error! Falling back to local/temporary link. Please setup the Table in Supabase.");
            return id;
        }

        return insertedData.id;
    } catch (err) {
        console.error(err);
        return null;
    } finally {
        setLoading(false);
    }
  };

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ValentineContext.Provider value={{ data, updateField, loadValentine, createValentine, loading }}>
      {children}
    </ValentineContext.Provider>
  );
}

export function useValentine() {
  return useContext(ValentineContext);
}
