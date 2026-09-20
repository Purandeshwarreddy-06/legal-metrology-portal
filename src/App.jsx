import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");
  const [aiOpen, setAiOpen] = useState(false);

  const roles = [
    {
      id: "customer",
      icon: "👤",
      title: "Customer",
      description: "Report weighing and measurement issues",
    },
    {
      id: "business",
      icon: "🏢",
      title: "Business",
      description: "Register instruments and apply for verification",
    },
    {
      id: "lmo",
      icon: "👮",
      title: "LMO Officer",
      description: "Verify instruments and manage complaints",
    },
    {
      id: "gatc",
      icon: "🏛️",
      title: "GATC",
      description: "Review applications and approve certificates",
    },
  ];

  /* PAGE ROUTING */

if (page === "business-login") {
  return (
    <LoginPage
      role="business"
      goHome={() => setPage("home")}
      loginSuccess={() => setPage("business")}
    />
  );
}

if (page === "lmo-login") {
  return (
    <LoginPage
      role="lmo"
      goHome={() => setPage("home")}
      loginSuccess={() => setPage("lmo")}
    />
  );
}

if (page === "business") {
  return <BusinessDashboard goHome={() => setPage("home")} />;
}

if (page === "lmo") {
  return <LMODashboard goHome={() => setPage("home")} />;
}

if (page === "gatc") {
  return <GATCDashboard goHome={() => setPage("home")} />;
}

if (page === "customer") {
  return <CustomerDashboard goHome={() => setPage("home")} />;
}

  /* HOME PAGE */

  return (
    <div className="app">

      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>
      <div className="orb orb-three"></div>

      <header className="header">

        <div className="brand">
          <div className="brand-logo">⚖</div>

          <div>
            <h2>LEGAL METROLOGY</h2>
            <span>DIGITAL VERIFICATION PORTAL</span>
          </div>
        </div>

        <div className="sih-badge">
          SIH 2026
        </div>

      </header>

      <main className="hero">

        <div className="hero-badge">
          ● GOVERNMENT DIGITAL INITIATIVE
        </div>

        <h1>
          Trust Every
          <br />
          <span>Measurement.</span>
        </h1>

        <p className="hero-description">
          A centralized digital platform for transparent monitoring,
          verification and certification of weighing and measuring
          instruments.
        </p>

        <h3 className="choose-title">
          Select your portal
        </h3>

        <div className="role-grid">

          {roles.map((role) => (

            <button
              key={role.id}
              className="role-card"
              onClick={() => {

  if (role.id === "business") {
    setPage("business-login");
  }

  else if (role.id === "lmo") {
    setPage("lmo-login");
  }

  else if (role.id === "gatc") {
    setPage("gatc");
  }

  else if (role.id === "customer") {
    setPage("customer");
  }

}}
            >

              <div className="role-icon">
                {role.icon}
              </div>

              <div className="role-content">

                <h3>
                  {role.title}
                </h3>

                <p>
                  {role.description}
                </p>

              </div>

              <div className="arrow">
                →
              </div>

            </button>

          ))}

        </div>

      </main>

      {/* AI ASSISTANT */}

<div className="ai-assistant">

  <button
    className="ai-button"
    onClick={() => setAiOpen(!aiOpen)}
  >
    🤖 <span>AI Assistant</span>
  </button>

  {aiOpen && (
    <div className="ai-chat">

      <div className="ai-chat-header">
        <div>
          <strong>🤖 Legal Metrology AI</strong>
          <small>Online • Ready to help</small>
        </div>

        <button
          className="ai-close"
          onClick={() => setAiOpen(false)}
        >
          ×
        </button>
      </div>

      <div className="ai-messages">

        <div className="ai-message">
          👋 Hello! I can help you with the Legal Metrology Portal.
          <br /><br />
          Try asking:
          <br />
          • How to file a complaint?
          <br />
          • What is LMO?
          <br />
          • What is GATC?
          <br />
          • How does verification work?
        </div>

        <button
          className="ai-question"
          onClick={() => alert(
            "Customer can file a complaint by entering the issue details and uploading photo/video proof."
          )}
        >
          📋 How to file a complaint?
        </button>

        <button
          className="ai-question"
          onClick={() => alert(
            "LMO means Legal Metrology Officer. The LMO verifies complaints and instruments."
          )}
        >
          👮 What is LMO?
        </button>

        <button
          className="ai-question"
          onClick={() => alert(
            "GATC is the testing and verification centre that reviews instruments and processes certification."
          )}
        >
          🏛️ What is GATC?
        </button>

        <button
          className="ai-question"
          onClick={() => alert(
            "Business submits an application → GATC reviews it → LMO verifies the instrument → verification result is submitted for approval."
          )}
        >
          ⚖️ How does verification work?
        </button>

      </div>

      <div className="ai-chat-footer">
        <input
          type="text"
          placeholder="Ask about Legal Metrology..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const question = e.target.value.toLowerCase();

              if (question.includes("lmo")) {
                alert(
                  "LMO means Legal Metrology Officer. The LMO handles verification and complaint-related activities."
                );
              } else if (question.includes("gatc")) {
                alert(
                  "GATC is the testing and verification centre involved in instrument testing and certification."
                );
              } else if (
                question.includes("complaint") ||
                question.includes("proof")
              ) {
                alert(
                  "A customer can submit a complaint with details and upload photo or other evidence as proof."
                );
              } else if (
                question.includes("verification") ||
                question.includes("verify")
              ) {
                alert(
                  "The verification flow is Business Application → GATC Review → LMO Verification → Final Approval."
                );
              } else {
                alert(
                  "I can help with complaints, LMO, GATC, instrument verification and applications."
                );
              }

              e.target.value = "";
            }
          }}
        />

        <button
          onClick={(e) => {
            const input = e.currentTarget.previousElementSibling;
            input.dispatchEvent(
              new KeyboardEvent("keydown", {
                key: "Enter",
                bubbles: true,
              })
            );
          }}
        >
          ➤
        </button>
      </div>

    </div>
  )}

</div>

      <footer>

        <span>
          © 2026 Digital Legal Metrology Portal
        </span>

        <span>
          Secure • Transparent • Digital
        </span>

      </footer>

    </div>
  );
}

/* =========================================================
   LOGIN PAGE
========================================================= */

function LoginPage({ role, goHome, loginSuccess }) {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isLMO = role === "lmo";

  const handleLogin = (e) => {

    e.preventDefault();

    if (!userId.trim() || !password.trim()) {

      setError(
        "Please enter User ID / Email and Password."
      );

      return;
    }

    /* LMO LOGIN */

    if (isLMO) {

      if (
        userId.trim() === "lmo@demo.com" &&
        password === "123456"
      ) {

        setError("");
        loginSuccess();

      } else {

        setError(
          "Invalid LMO User ID or Password."
        );

      }

    }

    /* BUSINESS LOGIN */

    else {

      if (
        userId.trim() === "business@demo.com" &&
        password === "123456"
      ) {

        setError("");
        loginSuccess();

      } else {

        setError(
          "Invalid Business User ID or Password."
        );

      }

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <button
          type="button"
          className="back-button"
          onClick={goHome}
        >
          ← Back
        </button>


        <div className="login-icon">

          {isLMO ? "👮" : "🏢"}

        </div>


        <h1>

          {isLMO
            ? "LMO Officer Login"
            : "Business Login"}

        </h1>


        <p className="login-subtitle">

          {isLMO
            ? "Login to access the LMO Officer Portal"
            : "Login to access the Business Portal"}

        </p>


        <form onSubmit={handleLogin}>

          <label>
            User ID / Email
          </label>

          <input
            className="login-input"
            type="text"
            placeholder="Enter your User ID or Email"
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
          />


          <label>
            Password
          </label>

          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          {error && (

            <div className="login-error">
              {error}
            </div>

          )}


          <button
            type="submit"
            className="login-submit"
          >

            Login →

          </button>

        </form>


        <div className="demo-text">

          <strong>
            Demo Login
          </strong>

          <br />

          User ID:{" "}

          {isLMO
            ? "lmo@demo.com"
            : "business@demo.com"}

          <br />

          Password: 123456

        </div>

      </div>

    </div>

  );

}

/* =========================================================
   SHARED DEMO DATA / LIVE WORKFLOW
========================================================= */

const COMPLAINTS_KEY = "lm_demo_complaints_v2";
const CERTIFICATE_KEY = "lm_demo_certificates_v2";

function getComplaints() {
  try {
    return JSON.parse(localStorage.getItem(COMPLAINTS_KEY) || "[]");
  } catch {
    return [];
  }
}

function setComplaints(items) {
  localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("lm-complaints-updated"));
}

function updateComplaint(id, changes) {
  const items = getComplaints().map((item) =>
    item.id === id ? { ...item, ...changes, updatedAt: new Date().toISOString() } : item
  );
  setComplaints(items);
}

function getCertificates() {
  try {
    return JSON.parse(localStorage.getItem(CERTIFICATE_KEY) || "[]");
  } catch {
    return [];
  }
}

function createComplaintId() {
  const items = getComplaints();
  return `LM-${String(1001 + items.length).padStart(4, "0")}`;
}

function getStageText(status) {
  const map = {
    "Submitted to GATC": "Complaint submitted to GATC",
    "Forwarded to LMO": "Complaint forwarded to LMO",
    "Under LMO Checking": "LMO is checking the complaint",
    "Solved": "Complaint solved by LMO",
    "Needs Further Action": "Further action required",
  };
  return map[status] || status;
}

/* =========================================================
   REAL CAMERA CERTIFICATE SCANNER
========================================================= */

function CertificateScanner({ compact = false }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanTimerRef = useRef(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [scanResult, setScanResult] = useState("");
  const [manualNumber, setManualNumber] = useState("");

  const stopCamera = () => {
    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  };

  const startCamera = async () => {
    setCameraError("");
    setScanResult("");

    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError("Camera is not available. Open this website using HTTPS or localhost and allow camera access.");
      return;
    }

    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: "environment" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOpen(true);
    } catch (error) {
      console.error("Camera error:", error);
      if (error.name === "NotAllowedError") {
        setCameraError("Camera permission was denied. Click the camera permission icon in the browser address bar and allow Camera.");
      } else if (error.name === "NotFoundError") {
        setCameraError("No camera was found on this device.");
      } else {
        setCameraError("Unable to open the camera. Please check browser camera permissions and try again.");
      }
    }
  };

  useEffect(() => {
    if (!cameraOpen || !streamRef.current || !videoRef.current) return;

    videoRef.current.srcObject = streamRef.current;
    videoRef.current.play().catch(() => {});

    let detector = null;
    if ("BarcodeDetector" in window) {
      try {
        detector = new window.BarcodeDetector({
          formats: ["qr_code", "code_128", "code_39", "ean_13", "ean_8", "upc_a", "upc_e"],
        });
      } catch {
        detector = null;
      }
    }

    if (detector) {
      scanTimerRef.current = window.setInterval(async () => {
        const video = videoRef.current;
        if (!video || video.readyState < 2) return;
        try {
          const codes = await detector.detect(video);
          if (codes.length && codes[0].rawValue) {
            setScanResult(codes[0].rawValue);
            stopCamera();
          }
        } catch {
          // Keep the camera running if a frame cannot be decoded.
        }
      }, 500);
    }

    return () => {
      if (scanTimerRef.current) {
        clearInterval(scanTimerRef.current);
        scanTimerRef.current = null;
      }
    };
  }, [cameraOpen]);

  useEffect(() => () => stopCamera(), []);

  const verifyNumber = () => {
    const value = (manualNumber || scanResult).trim();
    if (!value) {
      alert("Scan a QR/certificate code or enter a certificate number first.");
      return;
    }

    const certificates = getCertificates();
    const found = certificates.find(
      (certificate) => certificate.certificateNumber === value || certificate.qrData === value
    );

    if (found) {
      alert(`✓ Certificate Verified\n\nCertificate: ${found.certificateNumber}\nBusiness: ${found.businessName}\nInstrument: ${found.instrument}\nStatus: ${found.status}`);
    } else {
      alert(`Certificate data captured: ${value}\n\nThis demo scanner can read a real QR code. Certificate database verification will use the connected backend when one is added.`);
    }
  };

  return (
    <div className={`scanner-card ${compact ? "scanner-card-compact" : ""}`}>
      <div className="card-heading">
        <div>
          <span>SECURE CERTIFICATE CHECK</span>
          <h2>Scan Certificate QR</h2>
        </div>
        <div className="big-icon">📷</div>
      </div>

      <p>
        Open your device camera and scan the QR code printed on a Legal Metrology certificate.
      </p>

      {!cameraOpen ? (
        <button className="primary-btn scanner-open-btn" type="button" onClick={startCamera}>
          📷 Open Camera & Scan
        </button>
      ) : (
        <div className="scanner-live-box">
          <video ref={videoRef} className="scanner-video" autoPlay playsInline muted />
          <div className="scanner-guide">Align the certificate QR code inside this box</div>
          <div className="scanner-actions">
            <button className="secondary-btn" type="button" onClick={stopCamera}>✕ Close Camera</button>
          </div>
          {!("BarcodeDetector" in window) && (
            <small className="scanner-note">
              Your browser does not provide automatic QR detection. You can still use the live camera and enter the certificate number below.
            </small>
          )}
        </div>
      )}

      {cameraError && <div className="camera-error">⚠️ {cameraError}</div>}

      <div className="scanner-manual-row">
        <input
          className="search-input"
          value={manualNumber}
          onChange={(e) => setManualNumber(e.target.value)}
          placeholder="Certificate / QR value"
        />
        <button className="secondary-btn" type="button" onClick={verifyNumber}>✓ Verify</button>
      </div>

      {scanResult && (
        <div className="scan-success">
          ✅ QR data captured: <strong>{scanResult}</strong>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   BUSINESS DASHBOARD
========================================================= */

function BusinessDashboard({ goHome }) {
  const [showApplication, setShowApplication] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const submitApplication = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowApplication(false);
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="brand">
          <div className="brand-logo">⚖</div>
          <div><h2>LEGAL METROLOGY</h2><span>BUSINESS PORTAL</span></div>
        </div>
        <button className="back-button" onClick={goHome}>← Home</button>
      </header>

      <main className="dashboard">
        <div className="dashboard-top">
          <div>
            <div className="hero-badge">BUSINESS DASHBOARD</div>
            <h1>Welcome, <span>Business Partner</span></h1>
            <p>Register your weighing instruments and submit them for government verification.</p>
          </div>
          <div className="dashboard-avatar">🏢</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><span>Applications</span><strong>03</strong><small>Total submitted</small></div>
          <div className="stat-card"><span>Under Review</span><strong>{submitted ? "02" : "01"}</strong><small>GATC review</small></div>
          <div className="stat-card"><span>Verified</span><strong>02</strong><small>Certificates issued</small></div>
          <div className="stat-card"><span>Certificates</span><strong>02</strong><small>Active certificates</small></div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading">
            <div><span>INSTRUMENT VERIFICATION</span><h2>Apply for Verification</h2></div>
            <div className="big-icon">⚖️</div>
          </div>
          <p>Submit your weighing or measuring instrument for official verification.</p>
          <button className="primary-btn" onClick={() => setShowApplication(true)}>+ New Application</button>
          {submitted && <div className="success-message">✅ Application submitted successfully.<br />Application forwarded to GATC for review.</div>}
        </div>

        <CertificateScanner />

        {showApplication && (
          <div className="modal-overlay">
            <div className="application-modal">
              <button className="modal-close" type="button" onClick={() => setShowApplication(false)}>×</button>
              <div className="modal-icon">⚖️</div>
              <h2>New Verification Application</h2>
              <p>Register your weighing or measuring instrument for official verification.</p>
              <form onSubmit={submitApplication}>
                <input required placeholder="Business Name" />
                <input required placeholder="Owner Name" />
                <input required type="tel" placeholder="Contact Number" />
                <select required><option value="">Select Instrument Type</option><option>Digital Weighing Machine</option><option>Petrol Dispensing Unit</option><option>Measuring Instrument</option></select>
                <input required placeholder="Instrument Model" />
                <input required placeholder="Instrument Serial Number" />
                <input required placeholder="Business Address" />
                <label className="upload-label">📎 Instrument Photo / Evidence</label>
                <input type="file" accept="image/*,.pdf" />
                <button className="primary-btn" type="submit">Submit Application →</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

/* =========================================================
   GATC DASHBOARD
========================================================= */

function GATCDashboard({ goHome }) {
  const [sentToLMO, setSentToLMO] = useState(false);
  const [finalApproved, setFinalApproved] = useState(false);
  const [complaints, setComplaintsState] = useState([]);

  const refreshComplaints = () => setComplaintsState(getComplaints());

  useEffect(() => {
    refreshComplaints();
    const handler = () => refreshComplaints();
    window.addEventListener("lm-complaints-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("lm-complaints-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const forwardComplaint = (id) => {
    updateComplaint(id, { status: "Forwarded to LMO", stage: "LMO", gatcReviewedAt: new Date().toISOString() });
    refreshComplaints();
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="brand"><div className="brand-logo">⚖</div><div><h2>LEGAL METROLOGY</h2><span>GATC PORTAL</span></div></div>
        <button className="back-button" onClick={goHome}>← Home</button>
      </header>

      <main className="dashboard">
        <div className="dashboard-top">
          <div><div className="hero-badge">GATC DASHBOARD</div><h1>Application <span>Review</span></h1><p>Review business applications, complaints, forward them to LMO and approve final verification.</p></div>
          <div className="dashboard-avatar">🏛️</div>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><span>Applications</span><strong>03</strong><small>Received</small></div>
          <div className="stat-card"><span>Pending</span><strong>{finalApproved ? "00" : "01"}</strong><small>Awaiting action</small></div>
          <div className="stat-card"><span>LMO Review</span><strong>{sentToLMO ? "01" : "00"}</strong><small>Under verification</small></div>
          <div className="stat-card"><span>Complaints</span><strong>{complaints.length}</strong><small>Live cases</small></div>
        </div>

        <div className="dashboard-card">
          <div className="card-heading"><div><span>VERIFICATION APPLICATION</span><h2>Demo Weighing Solutions</h2></div><div className="big-icon">📋</div></div>
          <div className="application-details">
            <p><strong>Business:</strong> Demo Weighing Solutions</p>
            <p><strong>Instrument:</strong> Digital Weighing Machine</p>
            <p><strong>Serial Number:</strong> DWM-2026-001</p>
            <p><strong>Status:</strong> {(!sentToLMO && !finalApproved) && <span className="status-pending">Pending GATC Review</span>}{sentToLMO && !finalApproved && <span className="status-review">Sent to LMO</span>}{finalApproved && <span className="status-approved">Certificate Approved</span>}</p>
          </div>
          {!sentToLMO && !finalApproved && <button className="primary-btn" onClick={() => setSentToLMO(true)}>Review & Send to LMO →</button>}
          {sentToLMO && !finalApproved && <div><div className="success-message">✅ Application sent successfully to LMO Officer for verification.</div><button className="primary-btn" onClick={() => { setFinalApproved(true); localStorage.setItem(CERTIFICATE_KEY, JSON.stringify([{certificateNumber:"LM-CERT-2026-001",qrData:"LM-CERT-2026-001",businessName:"Demo Weighing Solutions",instrument:"Digital Weighing Machine",status:"Approved"}])); }}>✓ Approve Certificate</button></div>}
          {finalApproved && <div className="success-message">🎉 Certificate approved successfully!<br />The instrument is now officially verified.</div>}
        </div>

        <CertificateScanner />

        <div className="dashboard-card complaint-board-card">
          <div className="card-heading"><div><span>PUBLIC COMPLAINTS</span><h2>Complaint Queue</h2></div><div className="big-icon">🚨</div></div>
          {complaints.length === 0 ? <div className="empty-state">No public complaints have been submitted yet.</div> : complaints.map((complaint) => (
            <div className="complaint-item" key={complaint.id}>
              <div className="complaint-item-top"><strong>{complaint.id}</strong><span className={`complaint-status status-${complaint.status.toLowerCase().replace(/\s+/g,"-")}`}>{complaint.status}</span></div>
              <p><strong>Business:</strong> {complaint.business}</p>
              <p><strong>Issue:</strong> {complaint.issue}</p>
              <p><strong>Description:</strong> {complaint.description}</p>
              <p><strong>Stage:</strong> {getStageText(complaint.status)}</p>
              {complaint.evidenceName && <p><strong>Evidence:</strong> 📎 {complaint.evidenceName}</p>}
              {complaint.status === "Submitted to GATC" && <button className="primary-btn" onClick={() => forwardComplaint(complaint.id)}>Forward Complaint to LMO →</button>}
            </div>
          ))}
        </div>

        <div className="workflow-card">
          <h3>Verification Workflow</h3>
          <div className="workflow"><div className="workflow-step active"><span>1</span><p>Business Application</p></div><div className="workflow-line"></div><div className="workflow-step active"><span>2</span><p>GATC Review</p></div><div className="workflow-line"></div><div className={`workflow-step ${sentToLMO ? "active" : ""}`}><span>3</span><p>LMO Verification</p></div><div className="workflow-line"></div><div className={`workflow-step ${finalApproved ? "active" : ""}`}><span>4</span><p>Certificate Approval</p></div></div>
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   LMO DASHBOARD
========================================================= */

function LMODashboard({ goHome }) {
  const [verified, setVerified] = useState(false);
  const [proofFile, setProofFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [complaints, setComplaintsState] = useState([]);

  const refreshComplaints = () => setComplaintsState(getComplaints());

  useEffect(() => {
    refreshComplaints();
    const handler = () => refreshComplaints();
    window.addEventListener("lm-complaints-updated", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("lm-complaints-updated", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const handleProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) setProofFile(file);
  };

  const submitVerification = () => {
    if (!proofFile) {
      alert("Please upload verification proof first.");
      return;
    }
    setSubmitted(true);
  };

  const startComplaintCheck = (id) => {
    updateComplaint(id, { status: "Under LMO Checking", stage: "LMO" });
    refreshComplaints();
  };

  const solveComplaint = (id) => {
    updateComplaint(id, { status: "Solved", stage: "Public", resolution: "Complaint verified and resolved by LMO." });
    refreshComplaints();
  };

  const needFurtherAction = (id) => {
    updateComplaint(id, { status: "Needs Further Action", stage: "Public", resolution: "Additional evidence or action is required." });
    refreshComplaints();
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header"><div className="brand"><div className="brand-logo">⚖</div><div><h2>LEGAL METROLOGY</h2><span>LMO OFFICER PORTAL</span></div></div><button className="back-button" onClick={goHome}>← Home</button></header>
      <main className="dashboard">
        <div className="dashboard-top"><div><div className="hero-badge">LMO OFFICER DASHBOARD</div><h1>Instrument <span>Verification</span></h1><p>Verify instruments assigned by GATC, upload proof and resolve public complaints.</p></div><div className="dashboard-avatar">👮</div></div>

        <div className="stats-grid"><div className="stat-card"><span>Assigned</span><strong>01</strong><small>Applications</small></div><div className="stat-card"><span>Under Verification</span><strong>{verified ? "00" : "01"}</strong><small>Current application</small></div><div className="stat-card"><span>Complaints</span><strong>{complaints.filter((c) => c.stage === "LMO").length}</strong><small>Need checking</small></div><div className="stat-card"><span>Resolved</span><strong>{complaints.filter((c) => c.status === "Solved").length}</strong><small>Public cases</small></div></div>

        <div className="dashboard-card">
          <div className="card-heading"><div><span>ASSIGNED APPLICATION</span><h2>Digital Weighing Machine</h2></div><div className="big-icon">⚖️</div></div>
          <div className="application-details"><p><strong>Business:</strong> Demo Weighing Solutions</p><p><strong>Instrument:</strong> Digital Weighing Machine</p><p><strong>Serial Number:</strong> DWM-2026-001</p><p><strong>Assigned By:</strong> GATC</p><p><strong>Status:</strong> {!verified && <span className="status-review">Assigned for Verification</span>}{verified && !submitted && <span className="status-approved">Verification Completed</span>}{submitted && <span className="status-approved">Report Sent to GATC</span>}</p></div>
          {!verified && <button className="primary-btn" onClick={() => setVerified(true)}>✓ Start Verification</button>}
          {verified && !submitted && <div className="verification-section"><div className="success-message">✅ Instrument verification completed.<br />Please upload proof before submitting the verification report.</div><label className="upload-label">📎 Upload Verification Proof</label><input className="file-input" type="file" accept="image/*,.pdf" onChange={handleProofUpload} />{proofFile && <div className="file-selected">📄 {proofFile.name}</div>}<button className="primary-btn" type="button" onClick={submitVerification}>📤 Submit Verification to GATC →</button></div>}
          {submitted && <div className="success-message">🎉 Verification report submitted successfully.<br />GATC can now review the verification proof and approve the certificate.</div>}
        </div>

        <CertificateScanner />

        <div className="dashboard-card complaint-board-card">
          <div className="card-heading"><div><span>PUBLIC COMPLAINTS</span><h2>LMO Complaint Checking</h2></div><div className="big-icon">🔎</div></div>
          {complaints.length === 0 ? <div className="empty-state">No complaints available.</div> : complaints.map((complaint) => (
            <div className="complaint-item" key={complaint.id}>
              <div className="complaint-item-top"><strong>{complaint.id}</strong><span className={`complaint-status status-${complaint.status.toLowerCase().replace(/\s+/g,"-")}`}>{complaint.status}</span></div>
              <p><strong>Business:</strong> {complaint.business}</p><p><strong>Location:</strong> {complaint.location}</p><p><strong>Issue:</strong> {complaint.issue}</p><p><strong>Description:</strong> {complaint.description}</p>{complaint.evidenceName && <p><strong>Evidence:</strong> 📎 {complaint.evidenceName}</p>}
              {complaint.status === "Forwarded to LMO" && <button className="primary-btn" onClick={() => startComplaintCheck(complaint.id)}>🔎 Start Complaint Checking</button>}
              {complaint.status === "Under LMO Checking" && <div className="complaint-action-row"><button className="primary-btn" onClick={() => solveComplaint(complaint.id)}>✓ Mark Complaint Solved</button><button className="secondary-btn" onClick={() => needFurtherAction(complaint.id)}>Needs Further Action</button></div>}
              {complaint.resolution && <div className="success-message">{complaint.resolution}</div>}
            </div>
          ))}
        </div>

        <div className="workflow-card"><h3>Complaint Workflow</h3><div className="workflow"><div className="workflow-step active"><span>1</span><p>Public Complaint</p></div><div className="workflow-line"></div><div className="workflow-step active"><span>2</span><p>GATC</p></div><div className="workflow-line"></div><div className="workflow-step active"><span>3</span><p>LMO Checking</p></div><div className="workflow-line"></div><div className={`workflow-step ${complaints.some((c) => c.status === "Solved") ? "active" : ""}`}><span>4</span><p>Public Update</p></div></div></div>
      </main>
    </div>
  );
}

/* =========================================================
   CUSTOMER / PUBLIC DASHBOARD
========================================================= */

function CustomerDashboard({ goHome }) {
  const [showComplaint, setShowComplaint] = useState(false);
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [complaints, setComplaintsState] = useState([]);

  const refreshComplaints = () => setComplaintsState(getComplaints());

  useEffect(() => {
    refreshComplaints();
    const handler = () => refreshComplaints();
    window.addEventListener("lm-complaints-updated", handler);
    window.addEventListener("storage", handler);
    const timer = window.setInterval(refreshComplaints, 1000);
    return () => {
      window.removeEventListener("lm-complaints-updated", handler);
      window.removeEventListener("storage", handler);
      window.clearInterval(timer);
    };
  }, []);

  const submitComplaint = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const complaint = {
      id: createComplaintId(),
      business: data.get("business") || "",
      location: data.get("location") || "",
      issue: data.get("issue") || "",
      description: data.get("description") || "",
      evidenceName: data.get("evidence")?.name || "",
      status: "Submitted to GATC",
      stage: "GATC",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setComplaints([...getComplaints(), complaint]);
    setComplaintSubmitted(true);
    setShowComplaint(false);
    form.reset();
    refreshComplaints();
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header"><div className="brand"><div className="brand-logo">⚖</div><div><h2>LEGAL METROLOGY</h2><span>PUBLIC PORTAL</span></div></div><button className="back-button" onClick={goHome}>← Home</button></header>
      <main className="dashboard">
        <div className="dashboard-top"><div><div className="hero-badge">PUBLIC PORTAL</div><h1>Protect Your <span>Measurements</span></h1><p>Report weighing and measurement issues and follow your complaint live from GATC to LMO resolution.</p></div><div className="dashboard-avatar">👤</div></div>

        <div className="stats-grid"><div className="stat-card"><span>Complaints</span><strong>{complaints.length}</strong><small>Submitted</small></div><div className="stat-card"><span>GATC / LMO Review</span><strong>{complaints.filter((c) => c.status !== "Solved").length}</strong><small>Live cases</small></div><div className="stat-card"><span>Resolved</span><strong>{complaints.filter((c) => c.status === "Solved").length}</strong><small>Completed cases</small></div><div className="stat-card"><span>Updates</span><strong>{complaints.filter((c) => c.status === "Solved" || c.status === "Needs Further Action").length}</strong><small>Latest decisions</small></div></div>

        <div className="dashboard-card">
          <div className="card-heading"><div><span>CONSUMER PROTECTION</span><h2>Report an Issue</h2></div><div className="big-icon">🚨</div></div>
          <p>If you receive less quantity than what you paid for, submit a complaint with supporting evidence.</p>
          <button className="primary-btn" onClick={() => setShowComplaint(true)}>+ File Complaint</button>
          {complaintSubmitted && <div className="success-message">✅ Complaint submitted and sent to GATC. Track its status below.</div>}
        </div>

        <CertificateScanner compact />

        <div className="dashboard-card live-update-card">
          <div className="card-heading"><div><span>LIVE PUBLIC UPDATES</span><h2>Complaint Status Tracking</h2></div><div className="big-icon">📡</div></div>
          <p>Status changes made by GATC or LMO are shown here automatically.</p>
          {complaints.length === 0 ? <div className="empty-state">No complaints submitted yet. Your complaint updates will appear here.</div> : complaints.slice().reverse().map((complaint) => (
            <div className="live-complaint" key={complaint.id}>
              <div className="complaint-item-top"><strong>{complaint.id}</strong><span className={`complaint-status status-${complaint.status.toLowerCase().replace(/\s+/g,"-")}`}>{complaint.status}</span></div>
              <div className="complaint-timeline">
                <div className="timeline-step active"><span>✓</span><div><strong>Complaint Submitted</strong><small>{new Date(complaint.createdAt).toLocaleString()}</small></div></div>
                <div className={`timeline-step ${["Forwarded to LMO","Under LMO Checking","Solved","Needs Further Action"].includes(complaint.status) ? "active" : ""}`}><span>✓</span><div><strong>GATC Review</strong><small>{complaint.status === "Submitted to GATC" ? "Waiting for GATC" : "Complaint reviewed by GATC"}</small></div></div>
                <div className={`timeline-step ${["Under LMO Checking","Solved","Needs Further Action"].includes(complaint.status) ? "active" : ""}`}><span>✓</span><div><strong>LMO Checking</strong><small>{complaint.status === "Under LMO Checking" ? "Officer is checking" : ["Solved","Needs Further Action"].includes(complaint.status) ? "Checking completed" : "Waiting for LMO"}</small></div></div>
                <div className={`timeline-step ${["Solved","Needs Further Action"].includes(complaint.status) ? "active" : ""}`}><span>{complaint.status === "Solved" ? "✓" : "4"}</span><div><strong>Final Update</strong><small>{complaint.status === "Solved" ? "Complaint solved" : complaint.status === "Needs Further Action" ? "Further action required" : "Waiting for LMO result"}</small></div></div>
              </div>
              {complaint.resolution && <div className="success-message">📢 {complaint.resolution}</div>}
            </div>
          ))}
        </div>

        {showComplaint && (
          <div className="modal-overlay">
            <div className="application-modal">
              <button className="modal-close" type="button" onClick={() => setShowComplaint(false)}>×</button>
              <div className="modal-icon">🚨</div>
              <h2>File a Complaint</h2>
              <p>Your complaint will first go to GATC and then to the LMO Officer for checking.</p>
              <form onSubmit={submitComplaint}>
                <input name="business" required placeholder="Business / Shop Name" />
                <input name="location" required placeholder="Location" />
                <select name="issue" required><option value="">Select Issue Type</option><option>Short Weight</option><option>Incorrect Measurement</option><option>Faulty Weighing Machine</option><option>Suspected Tampering</option></select>
                <textarea name="description" required placeholder="Describe the issue" rows="4"></textarea>
                <label className="upload-label">📷 Complaint Photo / Evidence</label>
                <input name="evidence" type="file" accept="image/*,.pdf" capture="environment" />
                <small className="form-note">On a supported phone/browser, the camera can be offered by the file control. Certificate scanning above uses the live camera directly.</small>
                <button className="primary-btn" type="submit">Submit Complaint →</button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
