import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '', password: '', rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] =
    useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name])
      setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!formData.email.trim())
      e.email = 'Email is required';
    else if (!formData.email.includes('@'))
      e.email = 'Enter a valid email address';
    if (!formData.password.trim())
      e.password = 'Password is required';
    else if (formData.password.length < 6)
      e.password = 'Minimum 6 characters required';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#f8fafc'
    }}>

      {/* LEFT PANEL */}
      <div style={{
        flex: 1,
        background:
          'linear-gradient(145deg, #7f1d1d 0%, #dc2626 50%, #ef4444 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 50px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* BG circles */}
        {[
          { s:300, t:-80, l:-80, o:0.08 },
          { s:200, t:'auto', b:-60, r:-60, o:0.06 },
          { s:150, t:100, r:50, o:0.05 },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: c.s, height: c.s,
            borderRadius: '50%',
            backgroundColor: 'white',
            opacity: c.o,
            top: c.t, left: c.l,
            bottom: c.b, right: c.r
          }}/>
        ))}

        {/* Content */}
        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <div style={{
            fontSize: '72px',
            marginBottom: '24px',
            filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
          }}>🩸</div>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '900',
            color: 'white',
            marginBottom: '14px',
            letterSpacing: '-0.5px'
          }}>RaktSetu</h2>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.8',
            maxWidth: '280px',
            margin: '0 auto 36px'
          }}>
            Connecting blood donors with
            patients in need. Every drop
            counts. Every life matters.
          </p>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            maxWidth: '300px',
            margin: '0 auto'
          }}>
            {[
              { num: '2,847+', label: 'Active Donors' },
              { num: '8,421+', label: 'Lives Saved' },
              { num: '156+', label: 'Hospitals' },
              { num: '24/7', label: 'Available' },
            ].map((s, i) => (
              <div key={i} style={{
                backgroundColor:
                  'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                borderRadius: '14px',
                padding: '14px',
                border:
                  '1px solid rgba(255,255,255,0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: 'white',
                  marginBottom: '2px'
                }}>{s.num}</div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.75)',
                  fontWeight: '600'
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '400px'
        }}>
          <div style={{
            marginBottom: '36px'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '900',
              color: '#0f172a',
              marginBottom: '8px',
              letterSpacing: '-0.5px'
            }}>Welcome back! 👋</h1>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              lineHeight: '1.6'
            }}>
              Login to access your donor profile,
              track donations and connect with
              those in need.
            </p>
          </div>

          {/* Email */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '12px',
              fontWeight: '800',
              color: '#374151',
              display: 'block',
              marginBottom: '8px',
              letterSpacing: '0.8px'
            }}>EMAIL ADDRESS</label>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px'
              }}>📧</span>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@email.com"
                onKeyDown={e =>
                  e.key === 'Enter' &&
                  handleSubmit()}
                style={{
                  width: '100%',
                  padding: '14px 16px 14px 44px',
                  border: errors.email
                    ? '2px solid #dc2626'
                    : '2px solid #e5e7eb',
                  borderRadius: '14px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  fontFamily: 'inherit',
                  backgroundColor: '#fafafa',
                  transition: 'all 0.2s'
                }}
              />
            </div>
            {errors.email && (
              <p style={{
                fontSize: '12px',
                color: '#dc2626',
                marginTop: '6px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>⚠️ {errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div style={{ marginBottom: '12px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <label style={{
                fontSize: '12px',
                fontWeight: '800',
                color: '#374151',
                letterSpacing: '0.8px'
              }}>PASSWORD</label>
              <span style={{
                fontSize: '12px',
                color: '#dc2626',
                fontWeight: '700',
                cursor: 'pointer'
              }}>Forgot password?</span>
            </div>
            <div style={{ position: 'relative' }}>
              <span style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px'
              }}>🔒</span>
              <input
                name="password"
                type={showPassword
                  ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                onKeyDown={e =>
                  e.key === 'Enter' &&
                  handleSubmit()}
                style={{
                  width: '100%',
                  padding: '14px 44px',
                  border: errors.password
                    ? '2px solid #dc2626'
                    : '2px solid #e5e7eb',
                  borderRadius: '14px',
                  fontSize: '14px',
                  color: '#0f172a',
                  outline: 'none',
                  fontFamily: 'inherit',
                  backgroundColor: '#fafafa',
                  transition: 'all 0.2s'
                }}
              />
              <span
                onClick={() =>
                  setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}>
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            {errors.password && (
              <p style={{
                fontSize: '12px',
                color: '#dc2626',
                marginTop: '6px',
                fontWeight: '600'
              }}>⚠️ {errors.password}</p>
            )}
          </div>

          {/* Remember me */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '28px'
          }}>
            <input
              type="checkbox"
              id="rm"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              style={{
                width: '17px',
                height: '17px',
                accentColor: '#dc2626',
                cursor: 'pointer'
              }}
            />
            <label htmlFor="rm" style={{
              fontSize: '13px',
              color: '#64748b',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Keep me logged in for 30 days
            </label>
          </div>

          {/* Login Button */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: loading
                ? '#ef4444' : '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '15px',
              fontWeight: '900',
              cursor: loading
                ? 'not-allowed' : 'pointer',
              boxShadow:
                '0 8px 24px rgba(220,38,38,0.4)',
              marginBottom: '20px',
              letterSpacing: '0.3px',
              transition: 'all 0.2s'
            }}>
            {loading
              ? '⏳ Logging in...'
              : '🔐 Login to RaktSetu'}
          </button>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '16px'
          }}>
            <div style={{
              flex: 1, height: '1px',
              backgroundColor: '#e5e7eb'
            }}/>
            <span style={{
              fontSize: '12px',
              color: '#9ca3af',
              fontWeight: '600',
              whiteSpace: 'nowrap'
            }}>or continue with</span>
            <div style={{
              flex: 1, height: '1px',
              backgroundColor: '#e5e7eb'
            }}/>
          </div>

          {/* Social */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            marginBottom: '28px'
          }}>
            {[
              { icon: '🔵', label: 'Google' },
              { icon: '📘', label: 'Facebook' },
            ].map(btn => (
              <button key={btn.label} style={{
                padding: '12px',
                backgroundColor: 'white',
                border: '1.5px solid #e5e7eb',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'all 0.2s'
              }}>
                {btn.icon} {btn.label}
              </button>
            ))}
          </div>

          {/* Sign up */}
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#64748b'
          }}>
            New to RaktSetu?{' '}
            <Link to="/register" style={{
              color: '#dc2626',
              fontWeight: '800',
              textDecoration: 'none'
            }}>
              Create free account →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;