import { useState } from 'react';
import { bloodGroups, cities, bloodRequests }
    from '../data/dummyData';

function RequestBlood() {
  const [filter, setFilter] = useState('All');
  const [searchGroup, setSearchGroup] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '', requesterName: '',
    bloodGroup: '', unitsNeeded: '',
    hospitalName: '', city: '',
    contactNumber: '', reason: '',
    urgencyLevel: 'Normal'
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [allRequests, setAllRequests] = useState(bloodRequests);

  const urgencyConfig = {
    All: { color: '#64748b', bg: '#f1f5f9' },
    Critical: { color: '#dc2626', bg: '#fee2e2' },
    Urgent: { color: '#ea580c', bg: '#fff7ed' },
    Normal: { color: '#16a34a', bg: '#dcfce7' },
    Fulfilled: { color: '#7c3aed', bg: '#ede9fe' },
  };

  const statusConfig = {
    Pending: { color: '#ea580c', bg: '#fff7ed' },
    Fulfilled: { color: '#16a34a', bg: '#dcfce7' },
    Cancelled: { color: '#64748b', bg: '#f1f5f9' },
  };

  const filtered = allRequests.filter(r => {
    const matchFilter = filter === 'All'
      ? true
      : filter === 'Fulfilled'
      ? r.status === 'Fulfilled'
      : r.urgencyLevel === filter
        && r.status === 'Pending';
    const matchGroup = searchGroup
      ? r.bloodGroup === searchGroup
      : true;
    return matchFilter && matchGroup;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev, [name]: value
    }));
    if (errors[name])
      setErrors(prev => ({
        ...prev, [name]: ''
      }));
  };

  const validate = () => {
    const e = {};
    if (!formData.patientName.trim())
      e.patientName = 'Required';
    if (!formData.requesterName.trim())
      e.requesterName = 'Required';
    if (!formData.bloodGroup)
      e.bloodGroup = 'Required';
    if (!formData.unitsNeeded)
      e.unitsNeeded = 'Required';
    if (!formData.hospitalName.trim())
      e.hospitalName = 'Required';
    if (!formData.city)
      e.city = 'Required';
    if (!formData.contactNumber.trim())
      e.contactNumber = 'Required';
    else if (formData.contactNumber.length !== 10)
      e.contactNumber = 'Enter 10-digit number';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const newRequest = {
      id: allRequests.length + 1,
      ...formData,
      status: 'Pending',
      createdAt: new Date()
        .toISOString().split('T')[0]
    };
    setAllRequests(prev => [newRequest, ...prev]);
    setSubmitted(true);
    setShowForm(false);
    setFormData({
      patientName: '', requesterName: '',
      bloodGroup: '', unitsNeeded: '',
      hospitalName: '', city: '',
      contactNumber: '', reason: '',
      urgencyLevel: 'Normal'
    });
  };

  const inp = (field) => ({
    width: '100%',
    padding: '10px 14px',
    border: errors[field]
      ? '2px solid #dc2626'
      : '1.5px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#0f172a',
    backgroundColor: 'white',
    outline: 'none',
    fontFamily: 'inherit'
  });

  const lbl = {
    fontSize: '11px',
    color: '#64748b',
    fontWeight: '700',
    display: 'block',
    marginBottom: '6px',
    letterSpacing: '1px'
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>

      {/* HEADER */}
      <div style={{
        background:
          'linear-gradient(135deg, #fff1f1, #fff)',
        padding: '40px 100px',
        borderBottom: '1px solid #fee2e2',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <div>
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '5px 14px',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '11px',
            fontWeight: '800',
            marginBottom: '14px',
            letterSpacing: '1.5px',
            border: '1px solid #fca5a5'
          }}>🩸 BLOOD REQUESTS</div>
          <h1 style={{
            fontSize: '36px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '8px',
            letterSpacing: '-1px'
          }}>Blood Request Board</h1>
          <p style={{
            fontSize: '14px',
            color: '#64748b',
            lineHeight: '1.7',
            maxWidth: '440px'
          }}>
            View all active blood requests and
            help donors connect with patients
            in need. Post your own request below.
          </p>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '12px'
        }}>
          {[
            {
              num: allRequests.filter(
                r => r.status==='Pending'
                && r.urgencyLevel==='Critical'
              ).length,
              label: 'Critical',
              color: '#dc2626',
              bg: '#fee2e2'
            },
            {
              num: allRequests.filter(
                r => r.status==='Pending'
              ).length,
              label: 'Pending',
              color: '#ea580c',
              bg: '#fff7ed'
            },
            {
              num: allRequests.filter(
                r => r.status==='Fulfilled'
              ).length,
              label: 'Fulfilled',
              color: '#16a34a',
              bg: '#dcfce7'
            },
          ].map((s, i) => (
            <div key={i} style={{
              backgroundColor: 'white',
              borderRadius: '14px',
              padding: '16px 20px',
              textAlign: 'center',
              boxShadow:
                '0 2px 8px rgba(0,0,0,0.08)',
              border: `1.5px solid ${s.bg}`,
              minWidth: '90px'
            }}>
              <div style={{
                fontSize: '26px',
                fontWeight: '900',
                color: s.color
              }}>{s.num}</div>
              <div style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: '600',
                marginTop: '2px'
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        padding: '32px 100px'
      }}>

        {/* FILTERS + POST BUTTON */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Filter tabs */}
          <div style={{
            display: 'flex', gap: '8px',
            flexWrap: 'wrap'
          }}>
            {Object.keys(urgencyConfig)
              .map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '20px',
                  border: filter === f
                    ? `2px solid ${urgencyConfig[f].color}`
                    : '2px solid #e2e8f0',
                  backgroundColor: filter === f
                    ? urgencyConfig[f].bg
                    : 'white',
                  color: filter === f
                    ? urgencyConfig[f].color
                    : '#64748b',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}>
                {f}
                <span style={{
                  marginLeft: '6px',
                  backgroundColor:
                    filter === f
                    ? urgencyConfig[f].color
                    : '#e2e8f0',
                  color: filter === f
                    ? 'white' : '#64748b',
                  borderRadius: '10px',
                  padding: '1px 7px',
                  fontSize: '11px'
                }}>
                  {f === 'All'
                    ? allRequests.length
                    : f === 'Fulfilled'
                    ? allRequests.filter(
                        r => r.status==='Fulfilled'
                      ).length
                    : allRequests.filter(
                        r => r.urgencyLevel===f
                        && r.status==='Pending'
                      ).length}
                </span>
              </button>
            ))}
          </div>

          {/* Right side: search + post */}
          <div style={{
            display: 'flex', gap: '10px',
            alignItems: 'center'
          }}>
            <select
              value={searchGroup}
              onChange={e =>
                setSearchGroup(e.target.value)}
              style={{
                padding: '8px 14px',
                border: '1.5px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '13px',
                color: '#0f172a',
                backgroundColor: 'white',
                outline: 'none',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
              <option value=''>
                All Blood Groups
              </option>
              {bloodGroups.map(bg => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setShowForm(!showForm);
                setSubmitted(false);
              }}
              style={{
                padding: '9px 20px',
                backgroundColor: showForm
                  ? 'white' : '#dc2626',
                color: showForm
                  ? '#dc2626' : 'white',
                border: '2px solid #dc2626',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: showForm ? 'none'
                  : '0 4px 12px rgba(220,38,38,0.35)'
              }}>
              {showForm
                ? '✕ Cancel'
                : '+ Post Request'}
            </button>
          </div>
        </div>

        {/* SUCCESS BANNER */}
        {submitted && (
          <div style={{
            backgroundColor: '#dcfce7',
            border: '1.5px solid #86efac',
            borderRadius: '14px',
            padding: '14px 20px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '14px',
            color: '#16a34a',
            fontWeight: '700'
          }}>
            ✅ Your blood request has been
            posted successfully! Donors will
            be notified shortly.
            <button
              onClick={() => setSubmitted(false)}
              style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                color: '#16a34a',
                cursor: 'pointer',
                fontSize: '16px'
              }}>✕</button>
          </div>
        )}

        {/* POST FORM - Collapsible */}
        {showForm && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '20px',
            padding: '28px',
            boxShadow:
              '0 8px 24px rgba(0,0,0,0.08)',
            border: '2px solid #fca5a5',
            marginBottom: '24px'
          }}>
            <div style={{
              fontSize: '16px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '20px'
            }}>📋 Post New Blood Request</div>

            <div style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '16px'
            }}>
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
                  <div style={{
                    fontSize: '11px',
                    color: '#dc2626',
                    marginTop: '4px'
                  }}>
                    ⚠️ {errors.requesterName}
                  </div>
                )}
              </div>

              <div>
                <label style={lbl}>
                  PATIENT NAME *
                </label>
                <input
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  placeholder="Patient name"
                  style={inp('patientName')}
                />
                {errors.patientName && (
                  <div style={{
                    fontSize: '11px',
                    color: '#dc2626',
                    marginTop: '4px'
                  }}>
                    ⚠️ {errors.patientName}
                  </div>
                )}
              </div>

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
                  <div style={{
                    fontSize: '11px',
                    color: '#dc2626',
                    marginTop: '4px'
                  }}>
                    ⚠️ {errors.contactNumber}
                  </div>
                )}
              </div>

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
                  <option value=''>
                    Select Group
                  </option>
                  {bloodGroups.map(bg => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
                {errors.bloodGroup && (
                  <div style={{
                    fontSize: '11px',
                    color: '#dc2626',
                    marginTop: '4px'
                  }}>
                    ⚠️ {errors.bloodGroup}
                  </div>
                )}
              </div>

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
                  <option value=''>
                    Select Units
                  </option>
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n}>
                      {n} Unit{n > 1 ? 's' : ''}
                    </option>
                  ))}
                </select>
                {errors.unitsNeeded && (
                  <div style={{
                    fontSize: '11px',
                    color: '#dc2626',
                    marginTop: '4px'
                  }}>
                    ⚠️ {errors.unitsNeeded}
                  </div>
                )}
              </div>

              <div>
                <label style={lbl}>
                  CITY *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={inp('city')}
                >
                  <option value=''>
                    Select City
                  </option>
                  {cities.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.city && (
                  <div style={{
                    fontSize: '11px',
                    color: '#dc2626',
                    marginTop: '4px'
                  }}>
                    ⚠️ {errors.city}
                  </div>
                )}
              </div>

              <div>
                <label style={lbl}>
                  HOSPITAL NAME *
                </label>
                <input
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="Hospital name"
                  style={inp('hospitalName')}
                />
                {errors.hospitalName && (
                  <div style={{
                    fontSize: '11px',
                    color: '#dc2626',
                    marginTop: '4px'
                  }}>
                    ⚠️ {errors.hospitalName}
                  </div>
                )}
              </div>

              <div>
                <label style={lbl}>
                  REASON (optional)
                </label>
                <input
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Surgery, accident..."
                  style={inp('reason')}
                />
              </div>

              <div>
                <label style={lbl}>
                  URGENCY *
                </label>
                <select
                  name="urgencyLevel"
                  value={formData.urgencyLevel}
                  onChange={handleChange}
                  style={{
                    ...inp('urgencyLevel'),
                    color:
                      formData.urgencyLevel
                      === 'Critical'
                      ? '#dc2626'
                      : formData.urgencyLevel
                      === 'Urgent'
                      ? '#ea580c'
                      : '#16a34a',
                    fontWeight: '700'
                  }}
                >
                  <option value='Normal'>
                    🟢 Normal
                  </option>
                  <option value='Urgent'>
                    🟡 Urgent
                  </option>
                  <option value='Critical'>
                    🔴 Critical
                  </option>
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '13px',
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
              🩸 Submit Blood Request
            </button>
          </div>
        )}

        {/* REQUESTS LIST */}
        <div style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#0f172a',
          marginBottom: '14px'
        }}>
          Showing {filtered.length} request
          {filtered.length !== 1 ? 's' : ''}
          {filter !== 'All'
            ? ` — ${filter}` : ''}
          {searchGroup
            ? ` — ${searchGroup}` : ''}
        </div>

        {filtered.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px',
            backgroundColor: 'white',
            borderRadius: '20px',
            border: '1.5px solid #f1f5f9'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '14px'
            }}>🩸</div>
            <div style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '6px'
            }}>No requests found</div>
            <div style={{
              fontSize: '13px',
              color: '#64748b'
            }}>
              Try changing filters or
              post a new request above
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}>
            {filtered.map(req => {
              const uc =
                urgencyConfig[req.urgencyLevel]
                || urgencyConfig.Normal;
              const sc =
                statusConfig[req.status]
                || statusConfig.Pending;
              return (
                <div key={req.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '18px',
                  padding: '22px 26px',
                  boxShadow:
                    '0 2px 10px rgba(0,0,0,0.06)',
                  border: '1.5px solid #f1f5f9',
                  borderLeft:
                    `5px solid ${uc.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  opacity:
                    req.status === 'Fulfilled'
                    ? 0.7 : 1
                }}>

                  {/* Blood group big */}
                  <div style={{
                    backgroundColor: uc.bg,
                    border:
                      `2px solid ${uc.color}`,
                    borderRadius: '14px',
                    padding: '12px 16px',
                    textAlign: 'center',
                    flexShrink: 0,
                    minWidth: '70px'
                  }}>
                    <div style={{
                      fontSize: '24px',
                      fontWeight: '900',
                      color: '#dc2626',
                      lineHeight: '1'
                    }}>{req.bloodGroup}</div>
                    <div style={{
                      fontSize: '11px',
                      color: '#64748b',
                      marginTop: '4px',
                      fontWeight: '600'
                    }}>
                      {req.unitsNeeded} unit
                      {req.unitsNeeded > 1
                        ? 's' : ''}
                    </div>
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '6px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '15px',
                        fontWeight: '800',
                        color: '#0f172a'
                      }}>
                        {req.patientName}
                      </span>
                      <span style={{
                        backgroundColor: uc.bg,
                        color: uc.color,
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '800',
                        border:
                          `1px solid ${uc.color}40`
                      }}>
                        {req.urgencyLevel}
                      </span>
                      <span style={{
                        backgroundColor: sc.bg,
                        color: sc.color,
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '700'
                      }}>
                        {req.status}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      flexWrap: 'wrap'
                    }}>
                      <span style={{
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        🏥 {req.hospitalName}
                      </span>
                      <span style={{
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        📍 {req.city}
                      </span>
                      {req.reason && (
                        <span style={{
                          fontSize: '13px',
                          color: '#64748b'
                        }}>
                          📋 {req.reason}
                        </span>
                      )}
                      <span style={{
                        fontSize: '13px',
                        color: '#64748b'
                      }}>
                        📅 {req.createdAt}
                      </span>
                    </div>
                  </div>

                  {/* Contact button */}
                  {req.status === 'Pending' && (
                    <button style={{
                      padding: '10px 20px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      boxShadow:
                        '0 3px 10px rgba(220,38,38,0.3)',
                      flexShrink: 0,
                      whiteSpace: 'nowrap'
                    }}>
                      📞 Contact
                    </button>
                  )}

                  {req.status === 'Fulfilled' && (
                    <span style={{
                      backgroundColor: '#dcfce7',
                      color: '#16a34a',
                      padding: '8px 16px',
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '700',
                      flexShrink: 0
                    }}>
                      ✅ Fulfilled
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default RequestBlood;