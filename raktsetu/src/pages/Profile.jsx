import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API, { authHeaders } from '../api';
import { useAuth } from '../Context/AuthContext';

function Profile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [donor, setDonor] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    const load = async () => {
      try {
        const h = authHeaders();
        const [meRes, donorRes, reqRes] = await Promise.all([
          fetch(`${API}/auth/me`, { headers: h }),
          fetch(`${API}/donors/me`, { headers: h }),
          fetch(`${API}/requests/mine`, { headers: h })
        ]);

        if (meRes.status === 401) {
          logout();
          navigate('/login');
          return;
        }

        const me = await meRes.json();
        setProfile(me);
        setEditForm({ name: me.name, phone: me.phone });
        setDonor(await donorRes.json());
        setRequests(await reqRes.json());
      } catch (err) {
        setError('Server not reachable. Is the backend running?');
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAvailability = async () => {
    const res = await fetch(`${API}/donors/${donor._id}/availability`, {
      method: 'PATCH', headers: authHeaders()
    });
    if (res.ok) setDonor(await res.json());
  };

  const markFulfilled = async (id) => {
    const res = await fetch(`${API}/requests/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify({ status: 'Fulfilled' })
    });
    if (res.ok) {
      const updated = await res.json();
      setRequests(prev => prev.map(r => (r._id === updated._id ? updated : r)));
    }
  };

  const saveProfile = async () => {
    const res = await fetch(`${API}/auth/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
      body: JSON.stringify(editForm)
    });
    if (res.ok) {
      const data = await res.json();
      setProfile(prev => ({ ...prev, ...data }));
      updateUser({ ...user, name: data.name });
      setEditing(false);
    }
  };

  const fmt = (d) => new Date(d).toLocaleDateString('en-IN',
    { day: 'numeric', month: 'short', year: 'numeric' });

  if (loading) {
    return <div style={{ padding: '80px', textAlign: 'center', color: '#64748b' }}>
      Loading your profile...</div>;
  }
  if (error || !profile) {
    return <div style={{ padding: '80px', textAlign: 'center', color: '#dc2626',
      fontWeight: '700' }}>{error || 'Could not load profile'}</div>;
  }

  const initials = profile.name.split(' ').map(n => n[0]).join('')
    .slice(0, 2).toUpperCase();

  let nextEligible = null;
  if (donor && donor.lastDonationDate) {
    nextEligible = new Date(donor.lastDonationDate);
    nextEligible.setMonth(nextEligible.getMonth() + 3);
  }
  const eligibleNow = !nextEligible || nextEligible <= new Date();

  const card = {
    backgroundColor: 'white', borderRadius: '20px', padding: '28px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.07)', border: '1.5px solid #f1f5f9'
  };
  const inputStyle = {
    padding: '10px 14px', border: '2px solid #e2e8f0', borderRadius: '10px',
    fontSize: '14px', outline: 'none', fontFamily: 'inherit'
  };
  const urgencyColor = { Critical: '#dc2626', Urgent: '#ea580c', Normal: '#16a34a' };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh' }}>

      {/* HEADER BANNER */}
      <div style={{
        background: 'linear-gradient(145deg, #7f1d1d, #dc2626)',
        padding: '48px 100px', color: 'white',
        display: 'flex', alignItems: 'center', gap: '28px', flexWrap: 'wrap'
      }}>
        <div style={{
          width: '96px', height: '96px', borderRadius: '50%',
          backgroundColor: 'white', color: '#dc2626', fontSize: '34px',
          fontWeight: '900', display: 'flex', alignItems: 'center',
          justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
        }}>{initials}</div>

        <div style={{ flex: 1, minWidth: '240px' }}>
          {editing ? (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <input value={editForm.name} style={inputStyle}
                onChange={e => setEditForm({ ...editForm, name: e.target.value })} />
              <input value={editForm.phone} maxLength="10" style={inputStyle}
                onChange={e => setEditForm({ ...editForm, phone: e.target.value })} />
              <button onClick={saveProfile} style={{
                padding: '10px 18px', borderRadius: '10px', border: 'none',
                backgroundColor: 'white', color: '#dc2626', fontWeight: '800',
                cursor: 'pointer' }}>Save</button>
              <button onClick={() => setEditing(false)} style={{
                padding: '10px 18px', borderRadius: '10px',
                border: '2px solid white', backgroundColor: 'transparent',
                color: 'white', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '6px' }}>
                {profile.name}</h1>
              <div style={{ fontSize: '14px', opacity: 0.9, lineHeight: '1.8' }}>
                {profile.email} &nbsp;|&nbsp; {profile.phone}
              </div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '10px',
                flexWrap: 'wrap' }}>
                <span style={{ backgroundColor: 'rgba(255,255,255,0.2)',
                  padding: '4px 14px', borderRadius: '20px', fontSize: '12px',
                  fontWeight: '800', textTransform: 'capitalize' }}>
                  {profile.role}</span>
                <span style={{ fontSize: '12px', opacity: 0.85, paddingTop: '5px' }}>
                  Member since {new Date(profile.createdAt).toLocaleDateString(
                    'en-IN', { month: 'long', year: 'numeric' })}
                </span>
              </div>
            </>
          )}
        </div>

        {!editing && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setEditing(true)} style={{
              padding: '10px 20px', borderRadius: '10px',
              border: '2px solid white', backgroundColor: 'transparent',
              color: 'white', fontWeight: '800', cursor: 'pointer' }}>
              Edit Profile</button>
            <button onClick={() => { logout(); navigate('/'); }} style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none',
              backgroundColor: 'white', color: '#dc2626', fontWeight: '800',
              cursor: 'pointer' }}>Logout</button>
          </div>
        )}
      </div>

      <div style={{ padding: '36px 100px' }}>

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', marginBottom: '24px' }}>
          {[
            { label: 'Blood Group', value: donor ? donor.bloodGroup : '-' },
            { label: 'Donations Made', value: donor ? donor.totalDonations : 0 },
            { label: 'Requests Posted', value: requests.length },
          ].map(s => (
            <div key={s.label} style={{ ...card, textAlign: 'center', padding: '22px' }}>
              <div style={{ fontSize: '34px', fontWeight: '900', color: '#dc2626' }}>
                {s.value}</div>
              <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '700',
                letterSpacing: '1px', marginTop: '4px' }}>
                {s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr',
          gap: '24px', alignItems: 'start' }}>

          {/* DONOR CARD */}
          <div style={card}>
            <div style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a',
              marginBottom: '18px' }}>My Donor Profile</div>

            {donor ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px',
                  marginBottom: '18px' }}>
                  <div style={{ backgroundColor: '#dc2626', color: 'white',
                    padding: '10px 16px', borderRadius: '12px', fontSize: '24px',
                    fontWeight: '900' }}>{donor.bloodGroup}</div>
                  <div>
                    <div style={{ fontWeight: '800', color: '#0f172a' }}>
                      {donor.area}, {donor.city}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                      {donor.gender}, {donor.age} years</div>
                  </div>
                </div>

                <div style={{ backgroundColor: '#f8fafc', borderRadius: '14px',
                  padding: '14px', fontSize: '13px', color: '#475569',
                  lineHeight: '2', marginBottom: '16px' }}>
                  Last donation: <b>{donor.lastDonationDate
                    ? fmt(donor.lastDonationDate) : 'Not recorded'}</b><br />
                  Next eligible: <b style={{ color: eligibleNow ? '#16a34a' : '#ea580c' }}>
                    {eligibleNow ? 'You can donate now' : fmt(nextEligible)}</b>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '14px',
                  border: '1.5px solid #e2e8f0', borderRadius: '14px' }}>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '14px' }}>
                      Available to donate</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {donor.isAvailable ? 'Visible in searches'
                        : 'Hidden from searches'}</div>
                  </div>
                  <button onClick={toggleAvailability} style={{
                    padding: '8px 18px', borderRadius: '20px', border: 'none',
                    fontWeight: '800', cursor: 'pointer', color: 'white',
                    backgroundColor: donor.isAvailable ? '#16a34a' : '#94a3b8'
                  }}>{donor.isAvailable ? 'ON' : 'OFF'}</button>
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.7',
                  marginBottom: '16px' }}>
                  You have not registered as a blood donor yet. One donation
                  can help save lives.</p>
                <Link to="/register-donor" style={{
                  display: 'inline-block', padding: '12px 24px',
                  backgroundColor: '#dc2626', color: 'white', borderRadius: '12px',
                  fontWeight: '800', textDecoration: 'none' }}>Become a Donor</Link>
              </div>
            )}
          </div>

          {/* MY REQUESTS */}
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a' }}>
                My Blood Requests</div>
              <Link to="/request-blood" style={{ fontSize: '13px', fontWeight: '800',
                color: '#dc2626', textDecoration: 'none' }}>+ New Request</Link>
            </div>

            {requests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px 0', color: '#64748b',
                fontSize: '14px' }}>You have not posted any request yet.</div>
            ) : (
              requests.map(r => (
                <div key={r._id} style={{
                  display: 'flex', alignItems: 'center', gap: '14px',
                  padding: '14px', borderRadius: '14px', marginBottom: '10px',
                  border: '1.5px solid #f1f5f9',
                  borderLeft: `5px solid ${urgencyColor[r.urgencyLevel] || '#16a34a'}`
                }}>
                  <div style={{ fontSize: '20px', fontWeight: '900',
                    color: '#dc2626', minWidth: '46px' }}>{r.bloodGroup}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px' }}>
                      {r.patientName}, {r.unitsNeeded} unit(s)</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {r.hospitalName}, {r.city} | {r.urgencyLevel}</div>
                  </div>
                  {r.status === 'Pending' ? (
                    <button onClick={() => markFulfilled(r._id)} style={{
                      padding: '7px 12px', borderRadius: '10px',
                      border: '2px solid #16a34a', backgroundColor: 'white',
                      color: '#16a34a', fontSize: '12px', fontWeight: '800',
                      cursor: 'pointer' }}>Mark Fulfilled</button>
                  ) : (
                    <span style={{ fontSize: '12px', fontWeight: '800',
                      color: '#16a34a' }}>{r.status}</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px', marginTop: '24px' }}>
          {[
            { to: '/find-blood', label: 'Find Blood' },
            { to: '/request-blood', label: 'Post a Request' },
            { to: '/emergency', label: 'Emergency' },
          ].map(a => (
            <Link key={a.to} to={a.to} style={{ ...card, textAlign: 'center',
              padding: '18px', fontWeight: '800', color: '#dc2626',
              textDecoration: 'none' }}>{a.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;