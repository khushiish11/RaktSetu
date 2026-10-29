import { Link, useLocation } from "react-router-dom";
function Navbar() {
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/find-blood", label: "Find Blood" },
    { path: "/register-donor", label: "Become a Donor" },
    { path: "/hospitals", label: "Hospitals" },
    { path: "/request-blood", label: "Request Blood" },
    { path: "/emergency", label: "🚨 Emergency" },
  ];
  return (
    <>
      <nav
        style={{
          backgroundColor: "#ffffff",
          padding: "0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 12px rgba(220,38,38,0.1)",
          position: "sticky",
          top: 0,
          zIndex: 100,
          height: "65px",
          borderBottom: "2px solid #fee2e2",
        }}
      >
        {/*Logo*/}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              boxShadow: "0 4px 10px rgba(220 ,38,38,0.3)",
            }}
          >
            🩸
          </div>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "800",
              color: "#dc2626",
              lineHeight: "1",
            }}
          >
            RaktSetu
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "#94a3b8",
              fontWeight: "500",
              letterSpacing: "0.5px",
            }}
          >
            BLOOD BANK MANAGEMENT
          </div>
        </Link>

        {/* Nav Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                textDecoration: "none",
                color: location.pathname === link.path ? "#dc2626" : "#475569",
                fontSize: "13.5px",
                fontWeight: location.pathname === link.path ? "700" : "500",
                padding: "6px 14px",
                borderRadius: "8px",
                backgroundColor:
                  location.pathname === link.path ? "#fee2e2" : "transparent",
                borderBottom:
                  location.pathname === link.path
                    ? "2px solid #dc2626"
                    : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/*Buttons*/}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              padding: "8px 20px",
              border: "2px solid #dc2626",
              borderRadius: "8px",
              color: "#dc2626",
              fontSize: "13px",
              fontWeight: "600",
              transition: "all 0.2s",
            }}
          >
            Login
          </Link>

          <Link
            to="/register"
            style={{
              textDecoration: "none",
              padding: "8px 20px",
              backgroundColor: "#dc2626",
              borderRadius: "8px",
              color:'#ffffff',
              fontSize: "13px",
              fontWeight: "700",
               cursor: 'pointer',
              boxShadow: "0 4px 12px rgba(220 , 38 , 38 , 0.4)",
             display: 'inline-block'
            }} >Register</Link>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
