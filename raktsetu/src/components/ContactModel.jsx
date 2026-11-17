import { useState, useEffect } from 'react';

function ContactModal({ person, onClose }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!person) return null;

  const digits = (person.phone || '').replace(/\D/g, '');
  const waNumber = digits.length === 10 ? '91' + digits : digits;
  const waText = encodeURIComponent(
    `Hello ${person.name}, I found you on RaktSetu. ${person.message || ''}`
  );

  const copyNumber = async () => {
    try {
      await navigator.clipboard.writeText(person.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      alert('Number: ' + person.phone);
    }
  };

  const btn = {
    display: 'block', width: '100%', padding: '13px',
    borderRadius: '12px', fontSize: '14px', fontWeight: '800',
    textAlign: 'center', textDecoration: 'none',
    cursor: 'pointer', boxSizing: 'border-box'
  };

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      backgroundColor: 'rgba(15,23,42,0.55)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '20px'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        backgroundColor: 'white', borderRadius: '24px',
        padding: '32px', width: '100%', maxWidth: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <div style={{
            display: 'inline-block', backgroundColor: '#dc2626',
            color: 'white', padding: '6px 16px',
            borderRadius: '10px', fontSize: '20px',
            fontWeight: '900', marginBottom: '12px'
          }}>{person.bloodGroup}</div>
          <div style={{
            fontSize: '20px', fontWeight: '900', color: '#0f172a'
          }}>{person.name}</div>
          {person.subtitle && (
            <div style={{
              fontSize: '13px', color: '#64748b', marginTop: '4px'
            }}>{person.subtitle}</div>
          )}
        </div>

        <div style={{
          backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0',
          borderRadius: '14px', padding: '14px',
          textAlign: 'center', marginBottom: '16px'
        }}>
          <div style={{
            fontSize: '11px', color: '#64748b',
            fontWeight: '800', letterSpacing: '1px'
          }}>PHONE NUMBER</div>
          <div style={{
            fontSize: '24px', fontWeight: '900',
            color: '#0f172a', marginTop: '4px'
          }}>{person.phone}</div>
        </div>

        <a href={`tel:${digits}`} style={{
          ...btn, backgroundColor: '#dc2626', color: 'white',
          marginBottom: '10px'
        }}>Call Now</a>

        <a href={`https://wa.me/${waNumber}?text=${waText}`}
           target="_blank" rel="noreferrer" style={{
          ...btn, backgroundColor: '#16a34a', color: 'white',
          marginBottom: '10px'
        }}>Message on WhatsApp</a>

        <button onClick={copyNumber} style={{
          ...btn, backgroundColor: 'white', color: '#0f172a',
          border: '2px solid #e2e8f0', marginBottom: '10px'
        }}>{copied ? 'Copied!' : 'Copy Number'}</button>

        <button onClick={onClose} style={{
          ...btn, backgroundColor: 'transparent',
          color: '#64748b', border: 'none'
        }}>Close</button>
      </div>
    </div>
  );
}

export default ContactModal;