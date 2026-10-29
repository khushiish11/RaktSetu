import { useState } from 'react';
import { Link } from 'react-router-dom';
import { bloodGroups, cities }
    from '../data/dummyData';

function Emergency() {
  const [formData, setFormData] = useState({
    patientName: '',
    bloodGroup: '',
    unitsNeeded: '',
    hospitalName: '',
    city: '',
    contactNumber: '',
    urgencyLevel: 'Critical'
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const e = {};
    if (!formData.patientName.trim())
      e.patientName = 'Patient name is required';
    if (!formData.bloodGroup)
      e.bloodGroup = 'Blood group is required';
    if (!formData.unitsNeeded)
      e.unitsNeeded = 'Units needed is required';
    if (!formData.hospitalName.trim())
      e.hospitalName = 'Hospital name is required';
    if (!formData.city)
      e.city = 'City is required';
    if (!formData.contactNumber.trim())
      e.contactNumber = 'Contact number is required';
    else if (formData.contactNumber.length !== 10)
      e.contactNumber = 'Enter valid 10-digit number';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
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
    fontFamily: 'inherit'
  });

  const lbl = {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '800',
    display: 'block',
    marginBottom: '8px',
    letterSpacing: '1.5px'
  };

  const errStyle = {
    fontSize: '11px',
    color: '#dc2626',
    marginTop: '5px',
    fontWeight: '600'
  };

  // SUCCESS SCREEN
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
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          maxWidth: '480px',
          width: '100%'
        }}>
          <div style={{
            width: '90px', height: '90px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            margin: '0 auto 24px'
          }}>🚨</div>

          <h2 style={{
            fontSize: '26px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '10px'
          }}>Emergency Request Sent!</h2>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            lineHeight: '1.7',
            marginBottom: '24px'
          }}>
            Your emergency blood request has been
            posted! Nearby donors are being
            notified right now. Please stay
            near your phone! 📞
          </p>

          {/* Summary */}
          <div style={{
            backgroundColor: '#fff5f5',
            border: '1.5px solid #fca5a5',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#dc2626',
              letterSpacing: '1px',
              marginBottom: '12px'
            }}>REQUEST DETAILS</div>
            {[
              ['Patient', formData.patientName],
              ['Blood Group', formData.bloodGroup],
              ['Units', `${formData.unitsNeeded} unit(s)`],
              ['Hospital', formData.hospitalName],
              ['City', formData.city],
              ['Contact', formData.contactNumber],
            ].map(([label, val]) => (
              <div key={label} style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                paddingBottom: '8px',
                borderBottom: '1px solid #fee2e2',
                fontSize: '13px'
              }}>
                <span style={{
                  color: '#64748b',
                  fontWeight: '600'
                }}>{label}</span>
                <span style={{
                  color: '#0f172a',
                  fontWeight: '700'
                }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Helplines */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '8px',
            marginBottom: '24px'
          }}>
            {[
              { num: '108', label: 'Ambulance' },
              { num: '102', label: 'Pregnancy' },
              { num: '104', label: 'Blood Help' },
            ].map(item => (
              <div key={item.num} style={{
                backgroundColor: '#dc2626',
                borderRadius: '12px',
                padding: '12px 8px',
                textAlign: 'center'
              }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: 'white'
                }}>{item.num}</div>
                <div style={{
                  fontSize: '10px',
                  color: 'rgba(255,255,255,0.8)',
                  marginTop: '2px'
                }}>{item.label}</div>
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex', gap: '12px'
          }}>
            <Link to="/" style={{
              flex: 1,
              padding: '13px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow:
                '0 4px 14px rgba(220,38,38,0.4)'
            }}>
              Go to Home
            </Link>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  patientName:'', bloodGroup:'',
                  unitsNeeded:'', hospitalName:'',
                  city:'', contactNumber:'',
                  urgencyLevel:'Critical'
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
              New Request
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

      {/* EMERGENCY HERO - RED BACKGROUND */}
      <div style={{
        background:
          'linear-gradient(135deg, #7f1d1d, #dc2626)',
        padding: '50px 100px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(255,255,255,0.05), transparent)',
          right: '-100px', top: '-100px'
        }}/>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              backgroundColor:
                'rgba(255,255,255,0.2)',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: '800',
              marginBottom: '16px',
              letterSpacing: '1.5px',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>🚨 EMERGENCY BLOOD REQUEST</div>
            <h1 style={{
              fontSize: '40px',
              fontWeight: '900',
              marginBottom: '10px',
              letterSpacing: '-1px'
            }}>Need Blood Urgently?</h1>
            <p style={{
              fontSize: '15px',
              color: 'rgba(255,255,255,0.85)',
              maxWidth: '440px',
              lineHeight: '1.8'
            }}>
              Post an emergency request and nearby
              eligible donors will be notified
              immediately. Our system works 24/7
              to help you find blood as fast
              as possible.
            </p>
          </div>

          {/* Emergency helplines */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            {[
              { num: '108', label: 'Free Ambulance', icon: '🚑' },
              { num: '102', label: 'Pregnant Women', icon: '🤱' },
              { num: '104', label: 'Blood Help Line', icon: '🩸' },
              { num: '112', label: 'Police / Help', icon: '👮' },
            ].map(item => (
              <div key={item.num} style={{
                backgroundColor:
                  'rgba(255,255,255,0.15)',
                border:
                  '1px solid rgba(255,255,255,0.25)',
                borderRadius: '12px',
                padding: '10px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                minWidth: '200px'
              }}>
                <span style={{ fontSize: '18px' }}>
                  {item.icon}
                </span>
                <div>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '900',
                    color: 'white',
                    lineHeight: '1'
                  }}>{item.num}</div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255,255,255,0.75)'
                  }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMPORTANT INFO BANNER */}
      <div style={{
        backgroundColor: '#fff7ed',
        border: '1px solid #fdba74',
        padding: '14px 100px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        <span style={{ fontSize: '20px' }}>⚠️</span>
        <span style={{
          fontSize: '13px',
          color: '#92400e',
          fontWeight: '600'
        }}>
          For life-threatening emergencies, call
          <strong> 108</strong> immediately for
          free ambulance. Then fill this form
          to notify nearby blood donors.
        </span>
      </div>

      {/* FORM */}
      <div style={{ padding: '40px 100px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '40px',
          boxShadow:
            '0 8px 30px rgba(0,0,0,0.08)',
          border: '1.5px solid #f1f5f9',
          maxWidth: '760px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '6px'
          }}>
            <div style={{
              width: '40px', height: '40px',
              backgroundColor: '#fee2e2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>🚨</div>
            <div style={{
              fontSize: '18px',
              fontWeight: '800',
              color: '#0f172a'
            }}>Emergency Blood Request Form</div>
          </div>
          <div style={{
            fontSize: '13px',
            color: '#64748b',
            marginBottom: '28px'
          }}>
            Fill all required details to alert
            nearby donors immediately
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '24px'
          }}>

            {/* Patient Name */}
            <div>
              <label style={lbl}>
                PATIENT NAME *
              </label>
              <input
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                placeholder="Patient's full name"
                style={inp('patientName')}
              />
              {errors.patientName && (
                <div style={errStyle}>
                  ⚠️ {errors.patientName}
                </div>
              )}
            </div>

            {/* Blood Group */}
            <div>
              <label style={lbl}>
                BLOOD GROUP NEEDED *
              </label>
              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                style={{
                  ...inp('bloodGroup'),
                  fontWeight: '700'
                }}
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
                <div style={errStyle}>
                  ⚠️ {errors.bloodGroup}
                </div>
              )}
            </div>

            {/* Units */}
            <div>
              <label style={lbl}>
                UNITS NEEDED *
              </label>
              <select
                name="unitsNeeded"
                value={formData.unitsNeeded}
                onChange={handleChange}
                style={inp('unitsNeeded')}
              >
                <option value="">
                  Select Units
                </option>
                {[1,2,3,4,5,6].map(n => (
                  <option key={n} value={n}>
                    {n} Unit{n > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
              {errors.unitsNeeded && (
                <div style={errStyle}>
                  ⚠️ {errors.unitsNeeded}
                </div>
              )}
            </div>

            {/* Contact */}
            <div>
              <label style={lbl}>
                CONTACT NUMBER *
              </label>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="10-digit number"
                maxLength="10"
                style={inp('contactNumber')}
              />
              {errors.contactNumber && (
                <div style={errStyle}>
                  ⚠️ {errors.contactNumber}
                </div>
              )}
            </div>

            {/* Hospital */}
            <div>
              <label style={lbl}>
                HOSPITAL NAME *
              </label>
              <input
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="e.g. AIIMS Delhi"
                style={inp('hospitalName')}
              />
              {errors.hospitalName && (
                <div style={errStyle}>
                  ⚠️ {errors.hospitalName}
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
                <div style={errStyle}>
                  ⚠️ {errors.city}
                </div>
              )}
            </div>

            {/* Urgency */}
            <div style={{
              gridColumn: '1 / -1'
            }}>
              <label style={lbl}>
                URGENCY LEVEL *
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(3, 1fr)',
                gap: '12px'
              }}>
                {[
                  {
                    level: 'Normal',
                    icon: '🟢',
                    desc: 'Within 2-3 days',
                    bg: '#f0fdf4',
                    col: '#16a34a',
                    brd: '#86efac'
                  },
                  {
                    level: 'Urgent',
                    icon: '🟡',
                    desc: 'Within 24 hours',
                    bg: '#fff7ed',
                    col: '#ea580c',
                    brd: '#fdba74'
                  },
                  {
                    level: 'Critical',
                    icon: '🔴',
                    desc: 'Immediately!',
                    bg: '#fff1f1',
                    col: '#dc2626',
                    brd: '#fca5a5'
                  },
                ].map(item => (
                  <div
                    key={item.level}
                    onClick={() =>
                      setFormData(prev => ({
                        ...prev,
                        urgencyLevel: item.level
                      }))
                    }
                    style={{
                      backgroundColor:
                        formData.urgencyLevel
                        === item.level
                        ? item.bg : 'white',
                      border:
                        formData.urgencyLevel
                        === item.level
                        ? `2.5px solid ${item.col}`
                        : '2px solid #e2e8f0',
                      borderRadius: '14px',
                      padding: '18px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      boxShadow:
                        formData.urgencyLevel
                        === item.level
                        ? `0 4px 12px ${item.col}25`
                        : 'none'
                    }}>
                    <div style={{
                      fontSize: '28px',
                      marginBottom: '8px'
                    }}>{item.icon}</div>
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '900',
                      color:
                        formData.urgencyLevel
                        === item.level
                        ? item.col : '#0f172a',
                      marginBottom: '4px'
                    }}>{item.level}</div>
                    <div style={{
                      fontSize: '12px',
                      color: '#64748b'
                    }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div style={{
            display: 'flex', gap: '12px'
          }}>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: '16px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: '900',
                cursor: 'pointer',
                boxShadow:
                  '0 6px 20px rgba(220,38,38,0.5)',
                letterSpacing: '0.3px'
              }}>
              🚨 Send Emergency Request Now
            </button>
            <Link to="/" style={{
              textDecoration: 'none',
              padding: '16px 24px',
              border: '2px solid #e2e8f0',
              borderRadius: '14px',
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
      </div>
    </div>
  );
}

export default Emergency;