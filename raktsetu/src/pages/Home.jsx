import { Link } from 'react-router-dom';
import { stats, bloodInventory, getStatusColor }
    from '../data/dummyData';

function Home() {
  return (
    <div style={{ backgroundColor: '#f8fafc' }}>

      {/* HERO SECTION */}
      <div style={{
        background: 'linear-gradient(135deg, #fff1f1 0%, #fff5f5 40%, #ffffff 100%)',
        padding: '80px 100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #fee2e2',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '560px'
      }}>

        {/* BG decorations */}
        <div style={{
          position: 'absolute', width: '600px', height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
          right: '-150px', top: '-150px', pointerEvents: 'none'
        }}/>
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,38,38,0.04) 0%, transparent 70%)',
          left: '-80px', bottom: '-80px', pointerEvents: 'none'
        }}/>

        {/* LEFT */}
        <div style={{ flex: 1, zIndex: 1, maxWidth: '540px' }}>

          {/* Badge */}
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '8px 20px',
            borderRadius: '30px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '13px',
            fontWeight: '700',
            marginBottom: '28px',
            border: '1.5px solid #fca5a5',
            boxShadow: '0 2px 8px rgba(220,38,38,0.1)'
          }}>
            <span style={{ fontSize: '16px' }}>🩸</span>
            Every drop counts — Join {stats.totalDonors.toLocaleString()}+ donors!
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: '58px',
            fontWeight: '900',
            color: '#0f172a',
            lineHeight: '1.1',
            marginBottom: '20px',
            letterSpacing: '-2px'
          }}>
            Every Drop<br/>
            <span style={{
              color: '#dc2626',
              WebkitTextStroke: '0px',
            }}>
              Can Save a Life
            </span>
          </h1>

          {/* Subtext */}
          <p style={{
            fontSize: '17px',
            color: '#64748b',
            lineHeight: '1.8',
            marginBottom: '36px',
            maxWidth: '440px'
          }}>
            Donate blood, save lives. Connect with donors,
            hospitals and blood banks on one platform.
            Find blood near you or register as a donor today.
          </p>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '14px',
            marginBottom: '36px',
            flexWrap: 'wrap'
          }}>
            <Link to="/find-blood" style={{
              textDecoration: 'none',
              padding: '16px 36px',
              backgroundColor: '#dc2626',
              color: 'white',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '800',
              boxShadow: '0 8px 24px rgba(220,38,38,0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              letterSpacing: '0.3px'
            }}>
              🔍 Find Blood
            </Link>

            <Link to="/register-donor" style={{
              textDecoration: 'none',
              padding: '16px 36px',
              border: '2.5px solid #dc2626',
              color: '#dc2626',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(220,38,38,0.1)'
            }}>
              ❤️ Become a Donor
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            {[
              '✅ 100% Free',
              '✅ Verified Donors',
              '✅ 24/7 Emergency'
            ].map((badge, i) => (
              <div key={i} style={{
                fontSize: '13px',
                color: '#475569',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>{badge}</div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{
          flex: 0.9,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '400px'
        }}>
          {/* Main circle */}
          <div style={{
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 40% 40%, #fecaca, #fee2e2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '140px',
            boxShadow: '0 30px 80px rgba(220,38,38,0.2), 0 0 0 20px rgba(220,38,38,0.05)'
          }}>🩸</div>

          {/* Floating card 1 */}
          <div style={{
            position: 'absolute',
            top: '30px',
            right: '30px',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '14px 18px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            border: '1px solid #fee2e2',
            minWidth: '140px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '4px'
            }}>🩸 O+ Available</div>
            <div style={{
              fontSize: '20px',
              fontWeight: '800',
              color: '#dc2626'
            }}>60 Units</div>
            <div style={{
              fontSize: '11px',
              color: '#16a34a',
              fontWeight: '600',
              marginTop: '2px'
            }}>● Live</div>
          </div>

          {/* Floating card 2 */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '20px',
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '14px 18px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
            border: '1px solid #fee2e2',
            minWidth: '150px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '4px'
            }}>💖 Life Saved!</div>
            <div style={{
              fontSize: '12px',
              color: '#64748b',
              fontWeight: '500'
            }}>Just 2 mins ago</div>
          </div>

          {/* Floating card 3 */}
          <div style={{
            position: 'absolute',
            bottom: '100px',
            right: '10px',
            backgroundColor: '#dc2626',
            borderRadius: '16px',
            padding: '14px 18px',
            boxShadow: '0 10px 30px rgba(220,38,38,0.3)',
            minWidth: '130px'
          }}>
            <div style={{
              fontSize: '12px',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: '4px'
            }}>Donors nearby</div>
            <div style={{
              fontSize: '24px',
              fontWeight: '800',
              color: 'white'
            }}>24 🩸</div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        backgroundColor: 'white',
        borderBottom: '1px solid #fee2e2',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)'
      }}>
        {[
          { value: stats.totalDonors.toLocaleString() + '+',
            label: 'Total Donors', icon: '👥', bg: '#fff1f1' },
          { value: stats.totalDonations.toLocaleString() + '+',
            label: 'Blood Units', icon: '🩸', bg: '#fff1f1' },
          { value: stats.totalHospitals + '+',
            label: 'Hospitals', icon: '🏥', bg: '#fff1f1' },
          { value: stats.livesSaved.toLocaleString() + '+',
            label: 'Lives Saved', icon: '💖', bg: '#fff1f1' },
        ].map((stat, i) => (
          <div key={i} style={{
            padding: '32px 20px',
            textAlign: 'center',
            borderRight: i < 3 ? '1px solid #fee2e2' : 'none',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '48px', height: '48px',
              borderRadius: '12px',
              backgroundColor: stat.bg,
              display: 'flex', alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              margin: '0 auto 12px'
            }}>{stat.icon}</div>
            <div style={{
              fontSize: '36px',
              fontWeight: '900',
              color: '#dc2626',
              lineHeight: '1',
              letterSpacing: '-1px'
            }}>{stat.value}</div>
            <div style={{
              fontSize: '13px',
              color: '#64748b',
              marginTop: '8px',
              fontWeight: '600'
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* HOW IT WORKS */}
      <div style={{
        padding: '70px 100px',
        backgroundColor: 'white',
        borderBottom: '1px solid #f1f5f9'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '6px 16px',
            borderRadius: '20px',
            display: 'inline-block',
            fontSize: '12px',
            fontWeight: '700',
            marginBottom: '14px',
            letterSpacing: '1px'
          }}>HOW IT WORKS</div>
          <h2 style={{
            fontSize: '34px',
            fontWeight: '800',
            color: '#0f172a',
            marginBottom: '10px',
            letterSpacing: '-1px'
          }}>Simple Steps to Save a Life</h2>
          <p style={{
            fontSize: '15px',
            color: '#64748b',
            maxWidth: '400px',
            margin: '0 auto'
          }}>Three simple steps connect donors with those in need</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px'
        }}>
          {[
            { step: '01', icon: '📝', title: 'Register as Donor',
              desc: 'Create your profile with blood group and location details in just 2 minutes.',
              color: '#fee2e2' },
            { step: '02', icon: '🔍', title: 'Find or Request Blood',
              desc: 'Search available donors and hospitals by blood group and city instantly.',
              color: '#fee2e2' },
            { step: '03', icon: '❤️', title: 'Save a Life',
              desc: 'Connect directly with donors or hospitals and complete the donation.',
              color: '#fee2e2' },
          ].map((item, i) => (
            <div key={i} style={{
              backgroundColor: '#f8fafc',
              borderRadius: '20px',
              padding: '36px 28px',
              border: '1.5px solid #f1f5f9',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s'
            }}>
              {/* Step badge */}
              <div style={{
                position: 'absolute',
                top: '20px', right: '20px',
                fontSize: '11px',
                fontWeight: '900',
                color: '#dc2626',
                backgroundColor: '#fee2e2',
                padding: '4px 10px',
                borderRadius: '10px',
                letterSpacing: '1px'
              }}>{item.step}</div>

              {/* Arrow connector */}
              {i < 2 && (
                <div style={{
                  position: 'absolute',
                  right: '-16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '24px',
                  zIndex: 10,
                  color: '#dc2626'
                }}>→</div>
              )}

              <div style={{
                width: '64px', height: '64px',
                backgroundColor: item.color,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                marginBottom: '20px',
                boxShadow: '0 4px 12px rgba(220,38,38,0.15)'
              }}>{item.icon}</div>

              <div style={{
                fontSize: '18px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '10px'
              }}>{item.title}</div>

              <div style={{
                fontSize: '14px',
                color: '#64748b',
                lineHeight: '1.7'
              }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOOD AVAILABILITY */}
      <div style={{ padding: '70px 100px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: '32px'
        }}>
          <div>
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '5px 14px',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: '700',
              marginBottom: '10px',
              letterSpacing: '1px'
            }}>LIVE INVENTORY</div>
            <h2 style={{
              fontSize: '30px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '4px',
              letterSpacing: '-1px'
            }}>Blood Availability</h2>
            <p style={{
              fontSize: '14px',
              color: '#64748b'
            }}>Real-time blood stock status across hospitals</p>
          </div>
          <Link to="/find-blood" style={{
            textDecoration: 'none',
            color: '#dc2626',
            fontSize: '14px',
            fontWeight: '700',
            border: '2px solid #dc2626',
            padding: '10px 20px',
            borderRadius: '10px',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(220,38,38,0.1)'
          }}>View All →</Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '16px'
        }}>
          {bloodInventory.map(item => (
            <div key={item.bloodGroup} style={{
              backgroundColor: 'white',
              borderRadius: '16px',
              padding: '28px 20px',
              textAlign: 'center',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
              border: '1.5px solid #f1f5f9',
              borderLeft: `5px solid ${getStatusColor(item.status)}`,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0, right: 0,
                width: '60px', height: '60px',
                background: `radial-gradient(circle, ${getStatusColor(item.status)}15, transparent)`,
                borderRadius: '0 0 0 60px'
              }}/>
              <div style={{
                fontSize: '42px',
                fontWeight: '900',
                color: '#dc2626',
                marginBottom: '8px',
                letterSpacing: '-1px'
              }}>{item.bloodGroup}</div>
              <div style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#0f172a',
                marginBottom: '4px'
              }}>{item.available}</div>
              <div style={{
                fontSize: '12px',
                color: '#94a3b8',
                marginBottom: '12px',
                fontWeight: '500'
              }}>Units Available</div>
              <span style={{
                backgroundColor: item.status === 'Available'
                  ? '#dcfce7' : item.status === 'Low'
                  ? '#fff7ed' : '#fee2e2',
                color: getStatusColor(item.status),
                fontSize: '11px',
                padding: '5px 14px',
                borderRadius: '20px',
                fontWeight: '700',
                border: `1.5px solid ${getStatusColor(item.status)}40`
              }}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div style={{
        padding: '0 100px 70px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '24px'
      }}>
        {/* Why donate */}
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '24px',
          padding: '48px 40px',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            width: '200px', height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.15), transparent)',
            right: '-50px', bottom: '-50px'
          }}/>
          <div style={{
            fontSize: '48px',
            marginBottom: '20px'
          }}>💉</div>
          <h3 style={{
            fontSize: '26px',
            fontWeight: '800',
            marginBottom: '20px',
            letterSpacing: '-0.5px'
          }}>Why Donate Blood?</h3>
          {[
            '1 donation saves up to 3 lives',
            'Burns 650 calories per donation',
            'Reduces risk of heart disease',
            'Free health checkup included',
            'Takes only 30-45 minutes'
          ].map((point, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '12px',
              fontSize: '14px',
              color: '#cbd5e1'
            }}>
              <div style={{
                width: '20px', height: '20px',
                borderRadius: '50%',
                backgroundColor: 'rgba(220,38,38,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                color: '#dc2626',
                flexShrink: 0,
                fontWeight: '800'
              }}>✓</div>
              {point}
            </div>
          ))}
          <Link to="/register-donor" style={{
            textDecoration: 'none',
            display: 'inline-block',
            marginTop: '28px',
            padding: '14px 28px',
            backgroundColor: '#dc2626',
            color: 'white',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '800',
            boxShadow: '0 6px 20px rgba(220,38,38,0.4)',
            letterSpacing: '0.3px'
          }}>Become a Donor →</Link>
        </div>

        {/* Emergency */}
        <div style={{
          background: 'linear-gradient(135deg, #fff1f1 0%, #ffe4e4 100%)',
          borderRadius: '24px',
          padding: '48px 40px',
          border: '2px solid #fca5a5',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            width: '200px', height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(220,38,38,0.08), transparent)',
            right: '-50px', top: '-50px'
          }}/>
          <div>
            <div style={{
              fontSize: '48px',
              marginBottom: '20px'
            }}>🚨</div>
            <h3 style={{
              fontSize: '26px',
              fontWeight: '800',
              color: '#0f172a',
              marginBottom: '14px',
              letterSpacing: '-0.5px'
            }}>Need Blood Urgently?</h3>
            <p style={{
              fontSize: '14px',
              color: '#64748b',
              lineHeight: '1.8',
              marginBottom: '24px'
            }}>
              Post an emergency request and instantly
              notify nearby eligible donors. Our system
              works 24/7 to help you find blood as
              fast as possible.
            </p>
            {[
              { num: '108', label: 'Free Ambulance' },
              { num: '102', label: 'Pregnant Women' },
              { num: '104', label: 'Blood Help Line' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <div style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: '800',
                  minWidth: '44px',
                  textAlign: 'center'
                }}>{item.num}</div>
                <div style={{
                  fontSize: '13px',
                  color: '#475569',
                  fontWeight: '600'
                }}>{item.label}</div>
              </div>
            ))}
          </div>
          <Link to="/emergency" style={{
            textDecoration: 'none',
            display: 'block',
            marginTop: '28px',
            padding: '16px 24px',
            backgroundColor: '#dc2626',
            color: 'white',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: '800',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(220,38,38,0.4)',
            letterSpacing: '0.3px'
          }}>🚨 Post Emergency Request</Link>
        </div>
      </div>

    </div>
  );
}

export default Home;