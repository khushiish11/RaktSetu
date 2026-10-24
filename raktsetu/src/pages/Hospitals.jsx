import { useState } from 'react';
import { hospitals, cities, searchHospital }
    from '../data/dummyData';

function Hospitals() {
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState(hospitals);
  const [selectedHospital, setSelectedHospital]
    = useState(null);

  const handleSearch = () => {
    if(city) {
      setResults(searchHospital(city));
    } else {
      setResults(
        hospitals.filter(h =>
          h.name.toLowerCase()
           .includes(search.toLowerCase())
        )
      );
    }
  };

  const handleClear = () => {
    setSearch('');
    setCity('');
    setResults(hospitals);
  };

  return (
    <div style={{
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>

      {/* HERO HEADER */}
      <div style={{
        background:
          'linear-gradient(135deg, #fff1f1, #ffffff)',
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
            }}>🏥 HOSPITALS</div>
            <h1 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: '#0f172a',
              marginBottom: '10px',
              letterSpacing: '-1.5px'
            }}>Partner Hospitals</h1>
            <p style={{
              fontSize: '15px',
              color: '#64748b',
              maxWidth: '460px',
              lineHeight: '1.7'
            }}>
              Find registered hospitals with blood banks
              near you. All hospitals are verified and
              offer blood bank services.
            </p>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '16px'
          }}>
            {[
              { num: hospitals.length,
                label: 'Hospitals', icon: '🏥' },
              { num: hospitals.filter(
                  h => h.emergency).length,
                label: '24/7 Emergency', icon: '🚨' },
              { num: hospitals.filter(
                  h => h.bloodBankAvailable).length,
                label: 'Blood Banks', icon: '🩸' },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '20px 24px',
                textAlign: 'center',
                boxShadow:
                  '0 4px 16px rgba(0,0,0,0.08)',
                border: '1px solid #fee2e2',
                minWidth: '110px'
              }}>
                <div style={{
                  fontSize: '22px',
                  marginBottom: '6px'
                }}>{stat.icon}</div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#dc2626'
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
          padding: '32px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1.5px solid #f1f5f9',
          marginBottom: '36px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '20px'
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
                fontSize: '16px',
                fontWeight: '800',
                color: '#0f172a'
              }}>Search Hospitals</div>
              <div style={{
                fontSize: '12px',
                color: '#64748b'
              }}>Search by name or filter by city</div>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr auto auto',
            gap: '14px',
            alignItems: 'end'
          }}>
            <div>
              <label style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: '800',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '1.5px'
              }}>HOSPITAL NAME</label>
              <input
                value={search}
                onChange={e =>
                    setSearch(e.target.value)}
                placeholder="Search hospital..."
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#0f172a',
                  fontWeight: '600',
                  outline: 'none'
                }}/>
            </div>

            <div>
              <label style={{
                fontSize: '11px',
                color: '#64748b',
                fontWeight: '800',
                display: 'block',
                marginBottom: '8px',
                letterSpacing: '1.5px'
              }}>CITY</label>
              <select
                value={city}
                onChange={e => setCity(e.target.value)}
                style={{
                  width: '100%',
                  padding: '13px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '14px',
                  color: '#0f172a',
                  fontWeight: '600',
                  backgroundColor: 'white',
                  outline: 'none',
                  cursor: 'pointer'
                }}>
                <option value=''>All Cities</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button onClick={handleSearch} style={{
              padding: '13px 28px',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow:
                '0 4px 14px rgba(220,38,38,0.4)'
            }}>🔍 Search</button>

            <button onClick={handleClear} style={{
              padding: '13px 28px',
              backgroundColor: '#f8fafc',
              color: '#64748b',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: 'pointer'
            }}>✕ Clear</button>
          </div>
        </div>

        {/* RESULTS COUNT */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '800',
            color: '#0f172a'
          }}>
            {results.length} Hospital
            {results.length !== 1 ? 's' : ''} Found
          </h2>
          {city && (
            <span style={{
              backgroundColor: '#f0fdf4',
              color: '#16a34a',
              padding: '5px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: '700',
              border: '1.5px solid #86efac'
            }}>📍 {city}</span>
          )}
        </div>

        {/* HOSPITAL CARDS */}
        {results.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px',
            backgroundColor: 'white',
            borderRadius: '24px',
            border: '1.5px solid #f1f5f9'
          }}>
            <div style={{
              fontSize: '64px',
              marginBottom: '16px'
            }}>🏥</div>
            <div style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '8px'
            }}>No hospitals found!</div>
            <div style={{
              fontSize: '14px',
              color: '#64748b'
            }}>Try different search or city</div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {results.map((hospital, index) => (
              <div key={hospital.id} style={{
                backgroundColor: 'white',
                borderRadius: '20px',
                padding: '28px 32px',
                boxShadow:
                  '0 4px 20px rgba(0,0,0,0.07)',
                border: '1.5px solid #f1f5f9',
                borderLeft: '5px solid #dc2626',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* BG decoration */}
                <div style={{
                  position: 'absolute',
                  right: '-20px', top: '-20px',
                  width: '120px', height: '120px',
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(220,38,38,0.04), transparent)'
                }}/>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '20px'
                }}>

                  {/* Left — icon + info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    flex: 1
                  }}>
                    {/* Hospital icon */}
                    <div style={{
                      width: '64px',
                      height: '64px',
                      backgroundColor: '#fee2e2',
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      flexShrink: 0,
                      boxShadow:
                        '0 4px 12px rgba(220,38,38,0.15)'
                    }}>🏥</div>

                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        marginBottom: '6px',
                        flexWrap: 'wrap'
                      }}>
                        <h3 style={{
                          fontSize: '19px',
                          fontWeight: '900',
                          color: '#0f172a',
                          letterSpacing: '-0.5px'
                        }}>{hospital.name}</h3>
                        <span style={{
                          backgroundColor:
                            hospital.type === 'Government'
                              ? '#dbeafe' : '#f3e8ff',
                          color:
                            hospital.type === 'Government'
                              ? '#1d4ed8' : '#7c3aed',
                          padding: '3px 10px',
                          borderRadius: '8px',
                          fontSize: '11px',
                          fontWeight: '700'
                        }}>{hospital.type}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: '20px',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          fontSize: '13px',
                          color: '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          📍 {hospital.address}
                        </div>
                        <div style={{
                          fontSize: '13px',
                          color: '#64748b',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}>
                          📞 {hospital.phone}
                        </div>
                      </div>

                      {/* OPD timing */}
                      <div style={{
                        display: 'flex',
                        gap: '10px',
                        marginTop: '10px',
                        flexWrap: 'wrap'
                      }}>
                        <div style={{
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '4px 12px',
                          fontSize: '12px',
                          color: '#475569',
                          fontWeight: '600'
                        }}>
                          ⏰ OPD: {hospital.opdTiming}
                        </div>
                        <div style={{
                          backgroundColor: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '4px 12px',
                          fontSize: '12px',
                          color: '#475569',
                          fontWeight: '600'
                        }}>
                          🩸 Blood Bank:
                          {hospital.bloodBankTiming}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle — blood inventory */}
                  <div style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '16px',
                    padding: '16px 20px',
                    minWidth: '280px',
                    border: '1px solid #f1f5f9'
                  }}>
                    <div style={{
                      fontSize: '11px',
                      color: '#94a3b8',
                      fontWeight: '800',
                      marginBottom: '12px',
                      letterSpacing: '1px'
                    }}>BLOOD INVENTORY</div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns:
                        'repeat(4, 1fr)',
                      gap: '6px'
                    }}>
                      {Object.entries(
                        hospital.bloodInventory
                      ).map(([group, units]) => (
                        <div key={group} style={{
                          textAlign: 'center',
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          padding: '6px 4px',
                          border: '1px solid #f1f5f9'
                        }}>
                          <div style={{
                            fontSize: '13px',
                            fontWeight: '900',
                            color: '#dc2626'
                          }}>{group}</div>
                          <div style={{
                            fontSize: '12px',
                            fontWeight: '700',
                            color: '#0f172a'
                          }}>{units}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — badges + button */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '10px',
                    minWidth: '140px'
                  }}>
                    {hospital.emergency && (
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#16a34a',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '800',
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
                        Emergency 24/7
                      </span>
                    )}

                    {hospital.bloodBankAvailable && (
                      <span style={{
                        backgroundColor: '#fee2e2',
                        color: '#dc2626',
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: '800',
                        border: '1.5px solid #fca5a5'
                      }}>🩸 Blood Bank</span>
                    )}

                    <button
                      onClick={() =>
                        setSelectedHospital(
                          selectedHospital?.id
                          === hospital.id
                          ? null : hospital
                        )}
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        boxShadow:
                          '0 4px 12px rgba(220,38,38,0.3)',
                        marginTop: '4px'
                      }}>
                      {selectedHospital?.id
                        === hospital.id
                        ? '✕ Close' : 'View Details'}
                    </button>
                  </div>
                </div>

                {/* EXPANDED DETAILS */}
                {selectedHospital?.id
                  === hospital.id && (
                  <div style={{
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '1.5px solid #fee2e2',
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(3, 1fr)',
                    gap: '16px'
                  }}>
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        fontWeight: '800',
                        marginBottom: '8px',
                        letterSpacing: '1px'
                      }}>CONTACT INFO</div>
                      <div style={{
                        fontSize: '13px',
                        color: '#475569',
                        lineHeight: '1.8'
                      }}>
                        📞 {hospital.phone}<br/>
                        🏙️ {hospital.city}<br/>
                        📍 {hospital.address}
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        fontWeight: '800',
                        marginBottom: '8px',
                        letterSpacing: '1px'
                      }}>TIMINGS</div>
                      <div style={{
                        fontSize: '13px',
                        color: '#475569',
                        lineHeight: '1.8'
                      }}>
                        🏥 OPD: {hospital.opdTiming}
                        <br/>
                        🩸 Blood Bank:
                        {hospital.bloodBankTiming}
                      </div>
                    </div>
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '12px',
                      padding: '16px'
                    }}>
                      <div style={{
                        fontSize: '11px',
                        color: '#94a3b8',
                        fontWeight: '800',
                        marginBottom: '8px',
                        letterSpacing: '1px'
                      }}>FACILITIES</div>
                      <div style={{
                        fontSize: '13px',
                        color: '#475569',
                        lineHeight: '1.8'
                      }}>
                        {hospital.emergency
                          ? '✅' : '❌'}
                        Emergency 24/7<br/>
                        {hospital.bloodBankAvailable
                          ? '✅' : '❌'}
                        Blood Bank<br/>
                        ✅ OPD Services
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Hospitals;