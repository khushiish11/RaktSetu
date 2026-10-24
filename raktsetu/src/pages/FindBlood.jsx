import { useState } from 'react';
import { donors, bloodGroups, cities, searchDonors }
    from '../data/dummyData';

function FindBlood() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const found = searchDonors(bloodGroup, city);
      setResults(found);
      setSearched(true);
      setLoading(false);
    }, 600);
  };

  const getInitials = (name) => {
    return name.split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const avatarColors = [
    '#dc2626', '#b91c1c', '#991b1b',
    '#7f1d1d', '#c2410c', '#92400e'
  ];

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>

      {/* HERO HEADER */}
      <div style={{
        background:
          'linear-gradient(135deg, #fff1f1 0%, #fff5f5 50%, #ffffff 100%)',
        padding: '60px 100px',
        borderBottom: '1px solid #fee2e2',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          width: '400px', height: '400px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(220,38,38,0.05), transparent)',
          right: '-100px', top: '-100px'
        }}/>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
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
            }}>🩸 FIND BLOOD</div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#0f172a',
              marginBottom: '10px',
              letterSpacing: '-1.5px'
            }}>Find Blood Near You</h1>
            <p style={{
              fontSize: '16px',
              color: '#64748b',
              maxWidth: '480px',
              lineHeight: '1.7'
            }}>
              Search available donors and hospitals
              by blood group and city. Connect directly
              with donors and save lives!
            </p>
          </div>

          {/* Quick stats */}
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            {[
              { num: '2,847', label: 'Active Donors',
                icon: '👥' },
              { num: '8', label: 'Blood Groups',
                icon: '🩸' },
              { num: '24/7', label: 'Available',
                icon: '⏰' },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '20px 24px',
                textAlign: 'center',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #fee2e2',
                minWidth: '110px'
              }}>
                <div style={{
                  fontSize: '22px',
                  marginBottom: '6px'
                }}>{stat.icon}</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '900',
                  color: '#dc2626',
                  letterSpacing: '-0.5px'
                }}>{stat.num}</div>
                <div style={{
                  fontSize: '11px',
                  color: '#64748b',
                  fontWeight: '600',
                  marginTop: '2px'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 100px' }}>

        {/* SEARCH BOX */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1.5px solid #f1f5f9',
          marginBottom: '40px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '40px', height: '40px',
              backgroundColor: '#fee2e2',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>🔍</div>
            <div>
              <div style={{
                fontSize: '17px',
                fontWeight: '800',
                color: '#0f172a'
              }}>Search Blood</div>
              <div style={{
                fontSize: '12px',
                color: '#64748b'
              }}>Filter by blood group and city</div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto',
            gap: '16px',
            alignItems: 'end'
          }}>
            <div>
              <label style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: '800',
                display: 'block',
                marginBottom: '10px',
                letterSpacing: '1.5px'
              }}>BLOOD GROUP</label>
              <select
                value={bloodGroup}
                onChange={e =>
                    setBloodGroup(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: '#0f172a',
                  backgroundColor: 'white',
                  fontWeight: '700',
                  outline: 'none',
                  cursor: 'pointer'
                }}>
                <option value=''>
                    All Blood Groups</option>
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>
                      {bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: '800',
                display: 'block',
                marginBottom: '10px',
                letterSpacing: '1.5px'
              }}>CITY</label>
              <select
                value={city}
                onChange={e =>
                    setCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '15px',
                  color: '#0f172a',
                  backgroundColor: 'white',
                  fontWeight: '700',
                  outline: 'none',
                  cursor: 'pointer'
                }}>
                <option value=''>All Cities</option>
                {cities.map(c => (
                  <option key={c} value={c}>
                      {c}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSearch}
              disabled={loading}
              style={{
                padding: '14px 40px',
                backgroundColor: loading
                    ? '#ef4444' : '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '15px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow:
                  '0 6px 20px rgba(220,38,38,0.4)',
                letterSpacing: '0.5px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
              {loading ? '⏳ Searching...' : '🔍 Search'}
            </button>
          </div>

          {/* Blood group quick select */}
          {!searched && (
            <div style={{
              marginTop: '20px',
              paddingTop: '20px',
              borderTop: '1px solid #f1f5f9'
            }}>
              <div style={{
                fontSize: '11px',
                color: '#94a3b8',
                fontWeight: '700',
                marginBottom: '10px',
                letterSpacing: '1px'
              }}>QUICK SELECT</div>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap'
              }}>
                {bloodGroups.map(bg => (
                  <button
                    key={bg}
                    onClick={() => setBloodGroup(bg)}
                    style={{
                      padding: '6px 16px',
                      backgroundColor:
                        bloodGroup === bg
                          ? '#dc2626' : '#f8fafc',
                      color: bloodGroup === bg
                          ? 'white' : '#64748b',
                      border: bloodGroup === bg
                          ? '2px solid #dc2626'
                          : '2px solid #e2e8f0',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '800',
                      cursor: 'pointer'
                    }}>
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px'
          }}>
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
              animation: 'pulse 1s infinite'
            }}>🔍</div>
            <div style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#64748b'
            }}>Searching donors...</div>
          </div>
        )}

        {/* RESULTS */}
        {searched && !loading && (
          <div>
            {/* Results header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <div>
                <h2 style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#0f172a',
                  letterSpacing: '-0.5px'
                }}>
                  {results.length} Donor
                  {results.length !== 1 ? 's' : ''} Found
                </h2>
                <p style={{
                  fontSize: '13px',
                  color: '#64748b',
                  marginTop: '2px'
                }}>
                  {bloodGroup && `Blood Group: ${bloodGroup}`}
                  {bloodGroup && city && ' • '}
                  {city && `City: ${city}`}
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                {bloodGroup && (
                  <span style={{
                    backgroundColor: '#fee2e2',
                    color: '#dc2626',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '900',
                    border: '1.5px solid #fca5a5'
                  }}>{bloodGroup}</span>
                )}
                {city && (
                  <span style={{
                    backgroundColor: '#f0fdf4',
                    color: '#16a34a',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '700',
                    border: '1.5px solid #86efac'
                  }}>📍 {city}</span>
                )}
              </div>
            </div>

            {/* No results */}
            {results.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                backgroundColor: 'white',
                borderRadius: '24px',
                border: '1.5px solid #f1f5f9',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
              }}>
                <div style={{
                  fontSize: '64px',
                  marginBottom: '16px'
                }}>😔</div>
                <div style={{
                  fontSize: '20px',
                  fontWeight: '800',
                  color: '#0f172a',
                  marginBottom: '8px'
                }}>No donors found!</div>
                <div style={{
                  fontSize: '14px',
                  color: '#64748b',
                  marginBottom: '24px'
                }}>
                  Try different blood group or city
                </div>
                <button
                  onClick={() => {
                    setBloodGroup('');
                    setCity('');
                    setSearched(false);
                    setResults([]);
                  }}
                  style={{
                    padding: '10px 24px',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                  Clear Search
                </button>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '20px'
              }}>
                {results.map((donor, index) => (
                  <div key={donor.id} style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '28px',
                    boxShadow:
                      '0 4px 20px rgba(0,0,0,0.07)',
                    border: '1.5px solid #f1f5f9',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'transform 0.2s'
                  }}>

                    {/* Background decoration */}
                    <div style={{
                      position: 'absolute',
                      top: 0, right: 0,
                      width: '80px', height: '80px',
                      background:
                        'radial-gradient(circle, rgba(220,38,38,0.06), transparent)',
                      borderRadius: '0 20px 0 80px'
                    }}/>

                    {/* Top section */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '20px'
                    }}>
                      {/* Avatar + name */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px'
                      }}>
                        <div style={{
                          width: '56px',
                          height: '56px',
                          borderRadius: '16px',
                          backgroundColor:
                            avatarColors[
                              index %
                              avatarColors.length],
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '18px',
                          fontWeight: '900',
                          color: 'white',
                          flexShrink: 0,
                          boxShadow:
                            '0 4px 12px rgba(220,38,38,0.3)'
                        }}>
                          {getInitials(donor.name)}
                        </div>
                        <div>
                          <div style={{
                            fontSize: '15px',
                            fontWeight: '800',
                            color: '#0f172a',
                            marginBottom: '2px'
                          }}>{donor.name}</div>
                          <div style={{
                            fontSize: '12px',
                            color: '#64748b',
                            fontWeight: '500'
                          }}>
                            {donor.gender} •
                            {donor.age} years
                          </div>
                        </div>
                      </div>

                      {/* Blood group badge */}
                      {/* Blood group badge - TOP RIGHT of card */}
<div style={{
  backgroundColor: '#dc2626',
  color: '#ffffff',
  padding: '6px 12px',
  borderRadius: '10px',
  fontSize: '18px',
  fontWeight: '900',
  minWidth: '52px',
  textAlign: 'center',
  letterSpacing: '-0.5px',
  flexShrink: 0
}}>
  {donor.bloodGroup}
</div>
                    </div>

                    {/* Available badge */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '16px'
                    }}>
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#16a34a',
                        padding: '5px 14px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: '700',
                        border: '1.5px solid #86efac',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        <span style={{
                          width: '6px',
                          height: '6px',
                          backgroundColor: '#16a34a',
                          borderRadius: '50%',
                          display: 'inline-block'
                        }}/>
                        Available
                      </span>
                      <span style={{
                        fontSize: '12px',
                        color: '#94a3b8',
                        fontWeight: '600'
                      }}>
                        {donor.totalDonations}x donor
                      </span>
                    </div>

                    {/* Info box */}
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '14px',
                      padding: '14px 16px',
                      marginBottom: '18px',
                      border: '1px solid #f1f5f9'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: '#475569',
                        fontWeight: '500'
                      }}>
                        <span>📍</span>
                        <span>
                          {donor.area}, {donor.city}
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px',
                        fontSize: '13px',
                        color: '#475569',
                        fontWeight: '500'
                      }}>
                        <span>🩸</span>
                        <span>
                          {donor.totalDonations} donations done
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '13px',
                        color: '#475569',
                        fontWeight: '500'
                      }}>
                        <span>📅</span>
                        <span>
                          Last: {donor.lastDonationDate}
                        </span>
                      </div>
                    </div>

                    {/* Contact button */}
                    <button style={{
                      width: '100%',
                      padding: '13px',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontWeight: '800',
                      cursor: 'pointer',
                      boxShadow:
                        '0 4px 14px rgba(220,38,38,0.35)',
                      letterSpacing: '0.3px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px'
                    }}>
                      📞 Contact Donor
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* DEFAULT STATE */}
        {!searched && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '80px 40px',
            backgroundColor: 'white',
            borderRadius: '24px',
            border: '1.5px solid #f1f5f9',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
          }}>
            <div style={{
              width: '100px', height: '100px',
              backgroundColor: '#fee2e2',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              margin: '0 auto 20px'
            }}>🩸</div>
            <div style={{
              fontSize: '22px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '10px'
            }}>Search for Blood Donors</div>
            <div style={{
              fontSize: '15px',
              color: '#64748b',
              lineHeight: '1.7',
              maxWidth: '380px',
              margin: '0 auto'
            }}>
              Select a blood group and city above,
              or use quick select buttons to find
              available donors near you!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FindBlood;