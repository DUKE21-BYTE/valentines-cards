import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ to = "/", label = "Back to Home", className = "", style = {} }) {
  return (
    <Link 
      to={to} 
      className={`inline-flex items-center gap-2 text-[#590d22] font-medium no-underline mb-8 hover:text-[#ff4d6d] hover:-translate-x-1 transition-transform ${className}`}
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '0.5rem', 
        color: '#590d22', 
        textDecoration: 'none', 
        fontWeight: 500, 
        marginBottom: '2rem',
        transition: 'transform 0.2s',
        ...style
      }}
    >
      <ArrowLeft size={20} /> {label}
    </Link>
  );
}
