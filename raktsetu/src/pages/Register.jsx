import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '',
    password: '', confirmPassword: '',
    role: 'donor', agreed: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] =
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
    if (!formData.name.trim())
      e.name = 'Full name is required';
    if (!formData.email.trim())
      e.email = 'Email is required';
    else if (!formData.email.includes('@'))
      e.email = 'Enter valid email';
    if (!formData.phone.trim())
      e.phone = 'Phone is required';
    else if (formData.phone.length !== 10)
      e.phone = 'Enter 10-digit number';
    if (!formData.password)
      e.password = 'Password is required';
    else if (formData.password.length < 6)
      e.password = 'Minimum 6 characters';
    if (formData.password !==
        formData.confirmPassword)
      e.confirmPassword =
        'Passwords do not match!';
    if (!formData.agreed)
      e.agreed = 'Please accept the terms';
    return e;
  };

  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Weak', color: '#dc2626', w: '30%' };
    if (p.length < 10) return { label: 'Fair', color: '#ea580c', w: '60%' };
    return { label: 'Strong', color: '#16a34a', w: '100%' };
  };
  const strength = getPasswordStrength();

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (formData.role === 'donor')
        navigate('/register-donor');
      else navigate('/');
    }, 1800);
  };

  const inpStyle = (field) => ({
    width: '100%',
    padding: '13px 16px 13px 44px',
    border: errors[field]
      ? '2px solid #dc2626'
      : '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f172a',
    outline: 'none',
    fontFamily: 'inherit',
    backgroundColor: '#fafafa',
    transition: 'border 0.2s'
  });

  const lbl = {
    fontSize: '12px',
    fontWeight: '800',
    color: '#374151',
    display: 'block',
    marginBottom: '8px',
    letterSpacing: '0.8px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: '#f8fafc'
    }}>

      {/* LEFT PANEL */}
      <div style={{
        flex: 0.85,
        background:
          'linear-gradient(145deg, #7f1d1d 0%, #dc2626 50%, #ef4444 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {[
          { s:350, t:-100, l:-100, o:0.07 },
          { s:200, b:-60, r:-50, o:0.06 },
          { s:120, t:80, r:40, o:0.05 },
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

        <div style={{
          zIndex: 1, textAlign: 'center'
        }}>
          <div style={{
            fontSize: '64px',
            marginBottom: '20px',
            filter:
              'drop-shadow(0 8px 16px rgba(0,0,0,0.2))'
          }}>🩸</div>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '900',
            color: 'white',
            marginBottom: '12px'
          }}>Join RaktSetu</h2>
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.85)',
            lineHeight: '1.8',
            maxWidth: '240px',
            margin: '0 auto 32px'
          }}>
            Be a hero. Register as a donor
            or find blood for your loved ones.
          </p>

          {/* Steps */}
          {[
            { icon: '📝', title: 'Create Account',
              desc: 'Takes only 2 minutes' },
            { icon: '❤️', title: 'Register as Donor',
              desc: 'Add your blood group' },
            { icon: '🩸', title: 'Save Lives',
              desc: 'Connect with patients' },
          ].map((step, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '16px',
              backgroundColor:
                'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              borderRadius: '14px',
              padding: '14px 18px',
              border:
                '1px solid rgba(255,255,255,0.15)',
              textAlign: 'left'
            }}>
              <div style={{
                width: '38px', height: '38px',
                backgroundColor:
                  'rgba(255,255,255,0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                flexShrink: 0
              }}>{step.icon}</div>
              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: '800',
                  color: 'white',
                  marginBottom: '2px'
                }}>{step.title}</div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.7)'
                }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{
        flex: 1.2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        overflowY: 'auto'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '420px'
        }}>
          <div style={{
            marginBottom: '28px'
          }}>
            <h1 style={{
              fontSize: '26px',
              fontWeight: '900',
              color: '#0f172a',
              marginBottom: '6px',
              letterSpacing: '-0.5px'
            }}>Create your account</h1>
            <p style={{
              fontSize: '13px',
              color: '#64748b'
            }}>
              Already have one?{' '}
              <Link to="/login" style={{
                color: '#dc2626',
                fontWeight: '800',
                textDecoration: 'none'
              }}>Login here</Link>
            </p>
          </div>

          {/* Role selector */}
          <div style={{ marginBottom: '22px' }}>
            <label style={lbl}>
              I AM JOINING AS
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px'
            }}>
              {[
                { val: 'donor', icon: '❤️',
                  label: 'Blood Donor',
                  desc: 'I want to donate' },
                { val: 'recipient', icon: '🩸',
                  label: 'Patient / Family',
                  desc: 'I need blood' },
              ].map(opt => (
                <div
                  key={opt.val}
                  onClick={() =>
                    setFormData(prev => ({
                      ...prev, role: opt.val
                    }))
                  }
                  style={{
                    padding: '14px 12px',
                    borderRadius: '14px',
                    border:
                      formData.role === opt.val
                      ? '2.5px solid #dc2626'
                      : '2px solid #e5e7eb',
                    backgroundColor:
                      formData.role === opt.val
                      ? '#fff5f5' : 'white',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    boxShadow:
                      formData.role === opt.val
                      ? '0 4px 12px rgba(220,38,38,0.12)'
                      : 'none'
                  }}>
                  <div style={{
                    fontSize: '24px',
                    marginBottom: '5px'
                  }}>{opt.icon}</div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: '800',
                    color:
                      formData.role === opt.val
                      ? '#dc2626' : '#0f172a',
                    marginBottom: '2px'
                  }}>{opt.label}</div>
                  <div style={{
                    fontSize: '10px',
                    color: '#94a3b8'
                  }}>{opt.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Form fields */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '14px',
            marginBottom: '14px'
          }}>

            {/* Name */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={lbl}>FULL NAME</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '15px'
                }}>👤</span>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  style={inpStyle('name')}
                />
              </div>
              {errors.name && (
                <p style={{
                  fontSize: '11px',
                  color: '#dc2626',
                  marginTop: '5px',
                  fontWeight: '600'
                }}>⚠️ {errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label style={lbl}>EMAIL</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '15px'
                }}>📧</span>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@email.com"
                  style={inpStyle('email')}
                />
              </div>
              {errors.email && (
                <p style={{
                  fontSize: '11px',
                  color: '#dc2626',
                  marginTop: '5px',
                  fontWeight: '600'
                }}>⚠️ {errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label style={lbl}>PHONE</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '15px'
                }}>📱</span>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit"
                  maxLength="10"
                  style={inpStyle('phone')}
                />
              </div>
              {errors.phone && (
                <p style={{
                  fontSize: '11px',
                  color: '#dc2626',
                  marginTop: '5px',
                  fontWeight: '600'
                }}>⚠️ {errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label style={lbl}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '15px'
                }}>🔒</span>
                <input
                  name="password"
                  type={showPass
                    ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 chars"
                  style={inpStyle('password')}
                />
                <span
                  onClick={() =>
                    setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                  {showPass ? '🙈' : '👁️'}
                </span>
              </div>
              {strength && (
                <div style={{
                  marginTop: '6px'
                }}>
                  <div style={{
                    height: '3px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width: strength.w,
                      backgroundColor:
                        strength.color,
                      borderRadius: '10px',
                      transition: 'width 0.3s'
                    }}/>
                  </div>
                  <span style={{
                    fontSize: '10px',
                    color: strength.color,
                    fontWeight: '700'
                  }}>
                    {strength.label} password
                  </span>
                </div>
              )}
              {errors.password && (
                <p style={{
                  fontSize: '11px',
                  color: '#dc2626',
                  marginTop: '5px',
                  fontWeight: '600'
                }}>⚠️ {errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label style={lbl}>
                CONFIRM PASSWORD
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '15px'
                }}>🔑</span>
                <input
                  name="confirmPassword"
                  type={showConfirm
                    ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  style={inpStyle('confirmPassword')}
                />
                <span
                  onClick={() =>
                    setShowConfirm(!showConfirm)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}>
                  {showConfirm ? '🙈' : '👁️'}
                </span>
              </div>
              {errors.confirmPassword && (
                <p style={{
                  fontSize: '11px',
                  color: '#dc2626',
                  marginTop: '5px',
                  fontWeight: '600'
                }}>
                  ⚠️ {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>

          {/* Terms */}
          <div style={{
            backgroundColor: '#f8fafc',
            borderRadius: '12px',
            padding: '14px 16px',
            marginBottom: '20px',
            border: errors.agreed
              ? '2px solid #dc2626'
              : '1.5px solid #e5e7eb'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                style={{
                  marginTop: '2px',
                  accentColor: '#dc2626',
                  width: '15px',
                  height: '15px',
                  cursor: 'pointer'
                }}
              />
              <span style={{
                fontSize: '12px',
                color: '#64748b',
                lineHeight: '1.6'
              }}>
                I agree to RaktSetu's{' '}
                <span style={{
                  color: '#dc2626',
                  fontWeight: '700'
                }}>Terms of Service</span>
                {' '}and{' '}
                <span style={{
                  color: '#dc2626',
                  fontWeight: '700'
                }}>Privacy Policy</span>
              </span>
            </label>
            {errors.agreed && (
              <p style={{
                fontSize: '11px',
                color: '#dc2626',
                marginTop: '6px',
                fontWeight: '600'
              }}>⚠️ {errors.agreed}</p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
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
              letterSpacing: '0.3px',
              transition: 'all 0.2s'
            }}>
            {loading
              ? '⏳ Creating account...'
              : '🩸 Create Account — It\'s Free!'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;