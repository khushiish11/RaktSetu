import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bloodGroups, cities, bloodRequests }
    from '../data/dummyData';

function RequestBlood() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    requesterName: '',
    patientName: '',
    bloodGroup: '',
    unitsNeeded: '',
    urgencyLevel: '',
    hospitalName: '',
    city: '',
    contactNumber: '',
    reason: ''
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
    if (!formData.requesterName.trim())
      e.requesterName = 'Your name is required';
    if (!formData.patientName.trim())
      e.patientName = 'Patient name is required';
    if (!formData.bloodGroup)
      e.bloodGroup = 'Blood group is required';
    if (!formData.unitsNeeded)
      e.unitsNeeded = 'Units needed is required';
    if (!formData.urgencyLevel)
      e.urgencyLevel = 'Please select urgency level';
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

  const urgencyConfig = {
    Normal: {
      bg: '#dcfce7', color: '#16a34a',
      border: '#86efac', icon: '🟢',
      desc: 'Within 2-3 days'
    },
    Urgent: {
      bg: '#fff7ed', color: '#ea580c',
      border: '#fdba74', icon: '🟡',
      desc: 'Within 24 hours'
    },
    Critical: {
      bg: '#fee2e2', color: '#dc2626',
      border: '#fca5a5', icon: '🔴',
      desc: 'Immediately needed'
    },
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
            width: '90px',
            height: '90px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            margin: '0 auto 24px'
          }}>🩸</div>

          <h2 style={{
            fontSize: '26px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '10px'
          }}>Request Submitted!</h2>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            lineHeight: '1.7',
            marginBottom: '24px'
          }}>
            Your blood request has been posted
            successfully. Nearby donors will be
            notified shortly!
          </p>

          <div style={{
            backgroundColor: '#fff5f5',
            border: '1.5px solid #fca5a5',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            textAlign: 'left'
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#dc2626',
              letterSpacing: '1px',
              marginBottom: '14px'
            }}>REQUEST SUMMARY</div>
            {[
              ['Patient', formData.patientName],
              ['Blood Group', formData.bloodGroup],
              ['Units Needed', formData.unitsNeeded],
              ['Urgency', formData.urgencyLevel],
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

          <div style={{
            backgroundColor: '#dcfce7',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '24px',
            fontSize: '13px',
            color: '#16a34a',
            fontWeight: '600'
          }}>
            📞 Stay near your phone —
            donors may contact you soon!
          </div>

          <div style={{
            display: 'flex', gap: '12px'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                flex: 1, padding: '13px',
                backgroundColor: '#dc2626',
                color: 'white', border: 'none',
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
                setFormData({
                  requesterName:'', patientName:'',
                  bloodGroup:'', unitsNeeded:'',
                  urgencyLevel:'', hospitalName:'',
                  city:'', contactNumber:'', reason:''
                });
              }}
              style={{
                flex: 1, padding: '13px',
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
      backgroundColor: '#f8fafc', minHeight: '100vh'
    }}>

      {/* HERO */}
      <div style={{
        background:
          'linear-gradient(135deg, #fff1f1, #ffffff)',
        padding: '50px 100px',
        borderBottom: '1px solid #fee2e2'
      }}>
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
        }}>🩸 REQUEST BLOOD</div>
        <h1 style={{
          fontSize: '38px',
          fontWeight: '900',
          color: '#0f172a',
          marginBottom: '10px',
          letterSpacing: '-1px'
        }}>Request Blood</h1>
        <p style={{
          fontSize: '15px',
          color: '#64748b',
          maxWidth: '480px',
          lineHeight: '1.7'
        }}>
          Fill the form below to post a blood request.
          Nearby eligible donors will be notified
          immediately based on urgency level.
        </p>
      </div>

      {/* EXISTING REQUESTS */}
      <div style={{ padding: '32px 100px 0' }}>
        <div style={{
          fontSize: '15px',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '14px'
        }}>🔴 Active Blood Requests</div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '32px'
        }}>
          {bloodRequests
            .filter(r => r.status === 'Pending')
            .map(req => {
              const uc =
                urgencyConfig[req.urgencyLevel];
              return (
                <div key={req.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '14px',
                  padding: '16px',
                  boxShadow:
                    '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1.5px solid #f1f5f9',
                  borderLeft:
                    `4px solid ${uc.color}`
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                  }}>
                    <span style={{
                      backgroundColor: '#fee2e2',
                      color: '#dc2626',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '900'
                    }}>
                      {req.bloodGroup}
                    </span>
                    <span style={{
                      backgroundColor: uc.bg,
                      color: uc.color,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: '700'
                    }}>
                      {uc.icon} {req.urgencyLevel}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#0f172a',
                    marginBottom: '4px'
                  }}>
                    {req.patientName}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b'
                  }}>
                    🏥 {req.hospitalName}
                    <br/>
                    📍 {req.city} •
                    {req.unitsNeeded} unit(s)
                  </div>
                </div>
              );
          })}
        </div>
      </div>

      {/* FORM */}
      <div style={{ padding: '0 100px 40px' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '36px',
          boxShadow:
            '0 8px 30px rgba(0,0,0,0.08)',
          border: '1.5px solid #f1f5f9'
        }}>
          <div style={{
            fontSize: '18px',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '6px'
          }}>📋 Blood Request Form</div>
          <div style={{
            fontSize: '13px',
            color: '#64748b',
            marginBottom: '28px'
          }}>
            All starred fields are required
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '20px'
          }}>

            {/* Requester Name */}
            <div>
              <label style={lbl}>
                YOUR NAME *
              </label>
              <input
                name="requesterName"
                value={formData.requesterName}
                onChange={handleChange}
                placeholder="Your name"
                style={inp('requesterName')}
              />
              {errors.requesterName && (
                <div style={errStyle}>
                  ⚠️ {errors.requesterName}
                </div>
              )}
            </div>

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

            {/* Reason */}
            <div>
              <label style={lbl}>
                REASON (optional)
              </label>
              <input
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Surgery, Accident..."
                style={inp('reason')}
              />
            </div>

            {/* Urgency Level */}
            <div style={{
              gridColumn: '1 / -1'
            }}>
              <label style={lbl}>
                URGENCY LEVEL *
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3,1fr)',
                gap: '12px'
              }}>
                {Object.entries(urgencyConfig)
                  .map(([level, cfg]) => (
                  <div
                    key={level}
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        urgencyLevel: level
                      }));
                      if (errors.urgencyLevel)
                        setErrors(prev => ({
                          ...prev,
                          urgencyLevel: ''
                        }));
                    }}
                    style={{
                      backgroundColor:
                        formData.urgencyLevel===level
                        ? cfg.bg : 'white',
                      border:
                        formData.urgencyLevel===level
                        ? `2px solid ${cfg.color}`
                        : '2px solid #e2e8f0',
                      borderRadius: '12px',
                      padding: '16px',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s'
                    }}>
                    <div style={{
                      fontSize: '24px',
                      marginBottom: '6px'
                    }}>{cfg.icon}</div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '800',
                      color: formData.urgencyLevel===level
                        ? cfg.color : '#0f172a',
                      marginBottom: '4px'
                    }}>{level}</div>
                    <div style={{
                      fontSize: '11px',
                      color: '#64748b'
                    }}>{cfg.desc}</div>
                  </div>
                ))}
              </div>
              {errors.urgencyLevel && (
                <div style={{
                  ...errStyle, marginTop: '8px'
                }}>
                  ⚠️ {errors.urgencyLevel}
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div style={{
            display: 'flex', gap: '12px'
          }}>
            <button
              onClick={handleSubmit}
              style={{
                flex: 1, padding: '14px',
                backgroundColor: '#dc2626',
                color: 'white', border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow:
                  '0 4px 14px rgba(220,38,38,0.4)'
              }}>
              🩸 Submit Blood Request
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
      </div>
    </div>
  );
}

export default RequestBlood;