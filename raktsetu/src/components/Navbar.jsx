import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
function Navbar() {
  const { user, logout } = useAuth();
const navigate = useNavigate();
const [menuOpen, setMenuOpen] = useState(false);
const initials = user
  ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  : '';
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/find-blood", label: "Find Blood" },
    { path: "/register-donor", label: "Become a Donor" },
    { path: "/hospitals", label: "Hospitals" },
    { path: "/request-blood", label: "Request Blood" },
    { path: "/emergency", label: "🚨 Emergency" },
  ];
  return (
    <>
      <nav
        style={{
          backgroundColor: "#ffffff",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(220,38,38,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "65px",
          borderBottom: "2px solid #fee2e2",
        }}
      >
        {/*Logo*/}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: "0 4px 10px rgba(220 ,38,38,0.3)",
            }}
          >
            🩸
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#dc2626",
              lineHeight: "1",
            }}
          >
            RaktSetu
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "#94a3b8",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}
          >
            BLOOD BANK MANAGEMENT
          </div>
        </Link>

        {/* Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: "none",
                color: location.pathname === link.path ? "#dc2626" : "#475569",
                fontSize: "13.5px",
                fontWeight: location.pathname === link.path ? "700" : "500",
                padding: "6px 14px",
                borderRadius: "8px",
                backgroundColor:
                  location.pathname === link.path ? "#fee2e2" : "transparent",
                borderBottom:
                  location.pathname === link.path
                    ? "2px solid #dc2626"
                    : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/*Buttons*/}
        {user ? (
  <div style={{ position: 'relative' }}>
    <button onClick={() => setMenuOpen(!menuOpen)} style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      padding: '6px 14px 6px 6px', backgroundColor: '#fff5f5',
      border: '1.5px solid #fca5a5', borderRadius: '30px', cursor: 'pointer'
    }}>
      <span style={{
        width: '34px', height: '34px', borderRadius: '50%',
        backgroundColor: '#dc2626', color: 'white', fontSize: '13px',
        fontWeight: '900', display: 'flex', alignItems: 'center',
        justifyContent: 'center'
      }}>{initials}</span>
      <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
        {user.name.split(' ')[0]}
      </span>
    </button>

    {menuOpen && (
      <div style={{
        position: 'absolute', right: 0, top: '48px', width: '190px',
        backgroundColor: 'white', borderRadius: '14px', padding: '8px',
        boxShadow: '0 12px 30px rgba(0,0,0,0.15)', border: '1px solid #f1f5f9'
      }}>
        <div style={{ padding: '8px 12px', fontSize: '12px', color: '#64748b' }}>
          {user.email}
        </div>
        <Link to="/profile" onClick={() => setMenuOpen(false)} style={{
          display: 'block', padding: '10px 12px', borderRadius: '8px',
          fontSize: '13px', fontWeight: '700', color: '#0f172a',
          textDecoration: 'none'
        }}>My Profile</Link>
        <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} style={{
          width: '100%', textAlign: 'left', padding: '10px 12px',
          borderRadius: '8px', fontSize: '13px', fontWeight: '700',
          color: '#dc2626', backgroundColor: 'transparent',
          border: 'none', cursor: 'pointer'
        }}>Logout</button>
      </div>
    )}
  </div>
) : (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    {/* keep your existing Login and Register links exactly as they were */}
     <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              padding: "8px 20px",
              border: "2px solid #dc2626",
              borderRadius: "8px",
              color: "#dc2626",
              fontSize: "13px",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              textDecoration: "none",
              padding: "8px 20px",
              backgroundColor: "#dc2626",
              borderRadius: "8px",
              color:'#ffffff',
              fontSize: "13px",
              fontWeight: "700",
               cursor: 'pointer',
              boxShadow: "0 4px 12px rgba(220 , 38 , 38 , 0.4)",
             display: 'inline-block'
            }} >Register</Link>
        </div>
  </div>
)}
      </nav>
    </>
  );
}
export default Navbar;
