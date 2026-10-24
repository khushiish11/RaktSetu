import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bloodGroups, cities } from '../data/dummyData';

function RegisterDonor() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', bloodGroup: '', age: '',
    gender: '', phone: '', email: '',
    city: '', area: '',
    lastDonationDate: '', agreed: false
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep1 = () => {
    const e = {};
    if (!formData.name.trim())
      e.name = 'Full name is required';
    if (!formData.bloodGroup)
      e.bloodGroup = 'Please select blood group';
    if (!formData.age)
      e.age = 'Age is required';
    else if (formData.age < 18 || formData.age > 65)
      e.age = 'Age must be between 18 and 65';
    if (!formData.gender)
      e.gender = 'Please select gender';
    return e;
  };

  const validateStep2 = () => {
    const e = {};
    if (!formData.phone.trim())
      e.phone = 'Phone number is required';
    else if (formData.phone.length !== 10)
      e.phone = 'Enter valid 10-digit number';
    if (!formData.email.trim())
      e.email = 'Email is required';
    if (!formData.city)
      e.city = 'Please select city';
    if (!formData.area.trim())
      e.area = 'Area is required';
    if (!formData.agreed)
      e.agreed = 'You must agree to continue';
    return e;
  };

  const handleNext = () => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = () => {
    const stepErrors = validateStep2();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setSubmitted(true);
  };

  const inp = (field) => ({
    width: '100%',
    padding: '13px 16px',
    border: errors[field]
      ? '2px solid #dc2626'
      : '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    color: '#0f172a',
    backgroundColor: 'white',
    fontWeight: '500',
    outline: 'none',
    fontFamily: 'inherit',
    transition: 'border 0.2s'
  });

  const lbl = {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '800',
    display: 'block',
    marginBottom: '8px',
    letterSpacing: '1.5px'
  };

  const err = {
    fontSize: '11px',
    color: '#dc2626',
    marginTop: '5px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  // ── SUCCESS SCREEN ──
  if (submitted) {
    return (
      <div style={{
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '28px',
          padding: '52px 44px',
          textAlign: 'center',
          boxShadow:
            '0 20px 60px rgba(0,0,0,0.1)',
          maxWidth: '480px',
          width: '100%',
          border: '1.5px solid #f1f5f9'
        }}>
          <div style={{
            width: '90px',
            height: '90px',
            backgroundColor: '#dcfce7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            margin: '0 auto 24px'
          }}>🎉</div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '10px',
            letterSpacing: '-0.5px'
          }}>Welcome, {formData.name}!</h2>

          <p style={{
            fontSize: '15px',
            color: '#64748b',
            lineHeight: '1.7',
            marginBottom: '24px'
          }}>
            You are now registered as a blood donor.
            Thank you for choosing to save lives! ❤️
          </p>

          {/* Detail card */}
          <div style={{
            backgroundColor: '#fff5f5',
            border: '1.5px solid #fca5a5',
            borderRadius: '18px',
            padding: '24px',
            marginBottom: '28px',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '12px',
              fontWeight: '800',
              color: '#dc2626',
              letterSpacing: '1px',
              marginBottom: '14px'
            }}>YOUR DONOR PROFILE</div>

            {[
              ['Blood Group', formData.bloodGroup, true],
              ['Gender', formData.gender, false],
              ['Age', `${formData.age} years`, false],
              ['Location',
               `${formData.area}, ${formData.city}`, false],
              ['Phone', formData.phone, false],
            ].map(([label, val, highlight]) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid #fee2e2'
              }}>
                <span style={{
                  fontSize: '13px',
                  color: '#64748b',
                  fontWeight: '600'
                }}>{label}</span>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '800',
                  color: highlight ? '#dc2626' : '#0f172a',
                  backgroundColor: highlight
                    ? '#fee2e2' : 'transparent',
                  padding: highlight ? '3px 10px' : '0',
                  borderRadius: highlight ? '8px' : '0'
                }}>{val}</span>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                flex: 1,
                padding: '13px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow:
                  '0 4px 14px rgba(220,38,38,0.4)'
              }}>
              Go to Home
            </button>
            <button
              onClick={() => {
                setSubmitted(false);
                setStep(1);
                setFormData({
                  name:'',bloodGroup:'',age:'',
                  gender:'',phone:'',email:'',
                  city:'',area:'',
                  lastDonationDate:'',agreed:false
                });
              }}
              style={{
                flex: 1,
                padding: '13px',
                backgroundColor: 'white',
                color: '#dc2626',
                border: '2px solid #dc2626',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '800',
                cursor: 'pointer'
              }}>
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>

      {/* HERO */}
      <div style={{
        background:
          'linear-gradient(135deg, #fff1f1, #ffffff)',
        padding: '50px 100px',
        borderBottom: '1px solid #fee2e2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '40px'
      }}>
        <div>
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '6px 16px',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: '800',
            marginBottom: '16px',
            letterSpacing: '1.5px',
            border: '1px solid #fca5a5'
          }}>❤️ BECOME A DONOR</div>
          <h1 style={{
            fontSize: '40px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '10px',
            letterSpacing: '-1px'
          }}>Be a Hero.</h1>
          <h2 style={{
            fontSize: '30px',
            fontWeight: '900',
            color: '#dc2626',
            marginBottom: '14px',
            letterSpacing: '-0.5px'
          }}>Donate Blood. Save Lives.</h2>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            maxWidth: '400px',
            lineHeight: '1.8'
          }}>
            Register as a donor in 2 minutes.
            Your one donation can save up to
            3 lives. Join 2,847+ donors today!
          </p>
        </div>

        {/* Why donate card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '28px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          border: '1px solid #fee2e2',
          minWidth: '240px'
        }}>
          <div style={{
            fontSize: '32px',
            marginBottom: '14px'
          }}>🩸</div>
          <div style={{
            fontSize: '14px',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '14px'
          }}>Why Donate Blood?</div>
          {[
            '1 donation saves up to 3 lives',
            'Free health checkup included',
            'Burns 650 calories',
            'Reduces heart disease risk',
            'Takes only 30–45 minutes'
          ].map((pt, i) => (
            <div key={i} style={{
              fontSize: '13px',
              color: '#475569',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: '#fee2e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: '#dc2626',
                fontWeight: '900',
                flexShrink: 0
              }}>✓</div>
              {pt}
            </div>
          ))}
        </div>
      </div>

      {/* FORM */}
      <div style={{ padding: '40px 100px' }}>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0',
          marginBottom: '32px',
          maxWidth: '600px',
          margin: '0 auto 32px'
        }}>
          {[
            { num: 1, label: 'Personal Info' },
            { num: 2, label: 'Contact & Location' },
          ].map((s, i) => (
            <div key={s.num} style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 1
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: step >= s.num
                    ? '#dc2626' : '#e2e8f0',
                  color: step >= s.num
                    ? 'white' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '900',
                  marginBottom: '6px',
                  boxShadow: step >= s.num
                    ? '0 4px 12px rgba(220,38,38,0.4)'
                    : 'none',
                  transition: 'all 0.3s'
                }}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: step >= s.num
                    ? '#dc2626' : '#94a3b8'
                }}>{s.label}</div>
              </div>
              {i < 1 && (
                <div style={{
                  height: '2px',
                  flex: 1,
                  backgroundColor: step > 1
                    ? '#dc2626' : '#e2e8f0',
                  margin: '0 8px',
                  marginBottom: '22px',
                  transition: 'all 0.3s'
                }}/>
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1.5px solid #f1f5f9',
          maxWidth: '700px',
          margin: '0 auto'
        }}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <div>
              <div style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '6px'
              }}>Step 1: Personal Information</div>
              <div style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '28px'
              }}>
                Tell us about yourself
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px'
              }}>

                {/* Full Name */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={lbl}>FULL NAME *</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={inp('name')}
                  />
                  {errors.name && (
                    <div style={err}>
                      ⚠️ {errors.name}
                    </div>
                  )}
                </div>

                {/* Blood Group */}
                <div>
                  <label style={lbl}>
                    BLOOD GROUP *
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    style={inp('bloodGroup')}
                  >
                    <option value="">
                      Select Blood Group
                    </option>
                    {bloodGroups.map(bg => (
                      <option key={bg} value={bg}>
                        {bg}
                      </option>
                    ))}
                  </select>
                  {errors.bloodGroup && (
                    <div style={err}>
                      ⚠️ {errors.bloodGroup}
                    </div>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label style={lbl}>AGE *</label>
                  <input
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Must be 18–65"
                    min="18" max="65"
                    style={inp('age')}
                  />
                  {errors.age && (
                    <div style={err}>
                      ⚠️ {errors.age}
                    </div>
                  )}
                </div>

                {/* Gender */}
                <div>
                  <label style={lbl}>GENDER *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    style={inp('gender')}
                  >
                    <option value="">
                      Select Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <div style={err}>
                      ⚠️ {errors.gender}
                    </div>
                  )}
                </div>

                {/* Last donation */}
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={lbl}>
                    LAST DONATION DATE (optional)
                  </label>
                  <input
                    name="lastDonationDate"
                    type="date"
                    value={formData.lastDonationDate}
                    onChange={handleChange}
                    style={{
                      ...inp('lastDonationDate'),
                      maxWidth: '280px'
                    }}
                  />
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
                marginTop: '32px'
              }}>
                <button
                  onClick={handleNext}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow:
                      '0 4px 14px rgba(220,38,38,0.4)'
                  }}>
                  Next Step →
                </button>
                <Link to="/" style={{
                  textDecoration: 'none',
                  padding: '14px 24px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '700',
                  color: '#64748b',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  Cancel
                </Link>
              </div>
            </div>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <div>
              <div style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '6px'
              }}>Step 2: Contact and Location</div>
              <div style={{
                fontSize: '13px',
                color: '#64748b',
                marginBottom: '28px'
              }}>
                How can donors reach you?
              </div>

              {/* Summary of Step 1 */}
              <div style={{
                backgroundColor: '#fff5f5',
                border: '1.5px solid #fca5a5',
                borderRadius: '14px',
                padding: '16px 20px',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  backgroundColor: '#dc2626',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: '900',
                  color: 'white',
                  flexShrink: 0
                }}>
                  {formData.bloodGroup || '?'}
                </div>
                <div>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: '800',
                    color: '#0f172a'
                  }}>{formData.name}</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#64748b'
                  }}>
                    {formData.bloodGroup} • {formData.age} years • {formData.gender}
                  </div>
                </div>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    marginLeft: 'auto',
                    padding: '6px 14px',
                    backgroundColor: 'white',
                    color: '#dc2626',
                    border: '1.5px solid #dc2626',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                  ← Edit
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginBottom: '20px'
              }}>

                {/* Phone */}
                <div>
                  <label style={lbl}>
                    PHONE NUMBER *
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength="10"
                    style={inp('phone')}
                  />
                  {errors.phone && (
                    <div style={err}>
                      ⚠️ {errors.phone}
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label style={lbl}>
                    EMAIL ADDRESS *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@email.com"
                    style={inp('email')}
                  />
                  {errors.email && (
                    <div style={err}>
                      ⚠️ {errors.email}
                    </div>
                  )}
                </div>

                {/* City */}
                <div>
                  <label style={lbl}>CITY *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    style={inp('city')}
                  >
                    <option value="">Select City</option>
                    {cities.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.city && (
                    <div style={err}>
                      ⚠️ {errors.city}
                    </div>
                  )}
                </div>

                {/* Area */}
                <div>
                  <label style={lbl}>
                    AREA / LOCALITY *
                  </label>
                  <input
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="Rohini, Sector 7"
                    style={inp('area')}
                  />
                  {errors.area && (
                    <div style={err}>
                      ⚠️ {errors.area}
                    </div>
                  )}
                </div>
              </div>

              {/* Agreement */}
              <div style={{
                backgroundColor: '#f8fafc',
                borderRadius: '14px',
                padding: '18px 20px',
                marginBottom: '28px',
                border: errors.agreed
                  ? '2px solid #dc2626'
                  : '1.5px solid #e2e8f0'
              }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={formData.agreed}
                    onChange={handleChange}
                    style={{
                      marginTop: '3px',
                      cursor: 'pointer',
                      width: '16px',
                      height: '16px',
                      accentColor: '#dc2626'
                    }}
                  />
                  <span style={{
                    fontSize: '13px',
                    color: '#475569',
                    lineHeight: '1.7'
                  }}>
                    I confirm that I am{' '}
                    <strong>18 years or older</strong>,
                    in good health with no major
                    illness and I voluntarily agree
                    to donate blood. I understand
                    that minimum{' '}
                    <strong>3 months gap</strong>{' '}
                    is required between donations.
                  </span>
                </label>
                {errors.agreed && (
                  <div style={{ ...err, marginTop: '10px' }}>
                    ⚠️ {errors.agreed}
                  </div>
                )}
              </div>

              <div style={{
                display: 'flex',
                gap: '12px'
              }}>
                <button
                  onClick={() => setStep(1)}
                  style={{
                    padding: '14px 24px',
                    backgroundColor: 'white',
                    color: '#64748b',
                    border: '2px solid #e2e8f0',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}>
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    padding: '14px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    fontSize: '15px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    boxShadow:
                      '0 4px 14px rgba(220,38,38,0.4)'
                  }}>
                  ❤️ Complete Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegisterDonor;