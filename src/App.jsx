import { useEffect, useRef, useState } from "react";
import "./App.css";

/* =========================================================
   DEMO DATABASE
========================================================= */

const defaultApplication = {
  id: "APP-2026-001",
  businessName: "Demo Weighing Solutions",
  ownerName: "Ravi Kumar",
  contact: "9876543210",
  instrumentType: "Digital Weighing Machine",
  model: "DWM-Pro-200",
  serialNumber: "DWM-2026-001",
  address: "Rajampet, Andhra Pradesh",
  arrivalDate: "2026-09-22",
  arrivalTime: "10:30",
  status: "Pending GATC Review",
  lmoStatus: "Not Assigned",
  lmoVisited: false,
  lmoLatitude: null,
  lmoLongitude: null,
  lmoVisitTime: null,
  proof: null,
  verificationRemarks: "",
  certificateId: null,
  certificateStatus: null,
  submittedAt: "2026-09-18",
};

const defaultCertificate = {
  certificateId: "LM-CERT-2026-001",
  applicationId: "APP-2026-001",
  businessName: "Demo Weighing Solutions",
  instrumentType: "Digital Weighing Machine",
  serialNumber: "DWM-2026-001",
  issueDate: "2026-01-15",
  expiryDate: "2027-01-15",
  status: "APPROVED",
};

function getApplications() {
  const saved = localStorage.getItem("lm_applications");

  if (saved) {
    return JSON.parse(saved);
  }

  const initial = [defaultApplication];
  localStorage.setItem("lm_applications", JSON.stringify(initial));
  return initial;
}

function saveApplications(data) {
  localStorage.setItem("lm_applications", JSON.stringify(data));
  window.dispatchEvent(new Event("lm-data-updated"));
}

function getCertificates() {
  const saved = localStorage.getItem("lm_certificates");

  if (saved) {
    return JSON.parse(saved);
  }

  const initial = [defaultCertificate];
  localStorage.setItem("lm_certificates", JSON.stringify(initial));
  return initial;
}

function saveCertificates(data) {
  localStorage.setItem("lm_certificates", JSON.stringify(data));
  window.dispatchEvent(new Event("lm-data-updated"));
}

function getComplaints() {
  try {
    return JSON.parse(
      localStorage.getItem("lm_complaints") || "[]"
    );
  } catch {
    return [];
  }
}

function saveComplaints(data) {
  localStorage.setItem(
    "lm_complaints",
    JSON.stringify(data)
  );
  window.dispatchEvent(new Event("lm-complaints-updated"));
}


/* =========================================================
   APP
========================================================= */

function App() {
  const [page, setPage] = useState("home");
  const [aiOpen, setAiOpen] = useState(false);

  const roles = [
    {
      id: "customer",
      icon: "👤",
      title: "Public Portal",
      description: "Complaints and certificate verification",
    },
    {
      id: "business",
      icon: "🏢",
      title: "Business",
      description: "Applications, renewals and LMO scheduling",
    },
    {
      id: "lmo",
      icon: "👮",
      title: "LMO Officer",
      description: "Field verification, proof and live visit tracking",
    },
    {
      id: "gatc",
      icon: "🏛️",
      title: "GATC",
      description: "Application review and certificate approval",
    },
  ];

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

        <div className="sih-badge">SIH 2026</div>
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
          verification, certification and public protection.
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

                if (role.id === "lmo") {
                  setPage("lmo-login");
                }

                if (role.id === "gatc") {
                  setPage("gatc");
                }

                if (role.id === "customer") {
                  setPage("customer");
                }

              }}
            >
              <div className="role-icon">
                {role.icon}
              </div>

              <div className="role-content">
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </div>

              <div className="arrow">→</div>
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
                👋 Hello! I can help with the Legal Metrology Portal.
                <br /><br />
                Try asking:
                <br />
                • How to verify a certificate?
                <br />
                • What is LMO?
                <br />
                • What is GATC?
                <br />
                • How does renewal work?
              </div>

              <button
                className="ai-question"
                onClick={() =>
                  alert(
                    "Open the Public Portal and use the Certificate Scanner or enter the Certificate ID manually."
                  )
                }
              >
                🔍 How to verify a certificate?
              </button>

              <button
                className="ai-question"
                onClick={() =>
                  alert(
                    "LMO means Legal Metrology Officer. The LMO performs field verification and uploads proof."
                  )
                }
              >
                👮 What is LMO?
              </button>

              <button
                className="ai-question"
                onClick={() =>
                  alert(
                    "GATC receives business applications, reviews them, checks LMO verification and approves certificates."
                  )
                }
              >
                🏛️ What is GATC?
              </button>

              <button
                className="ai-question"
                onClick={() =>
                  alert(
                    "Businesses can renew certificates when the current certificate approaches its expiry date."
                  )
                }
              >
                🔄 How does renewal work?
              </button>

            </div>

            <div className="ai-chat-footer">
              <input
                type="text"
                placeholder="Ask about Legal Metrology..."
                onKeyDown={(e) => {

                  if (e.key !== "Enter") return;

                  const q = e.target.value.toLowerCase();

                  if (q.includes("lmo")) {
                    alert(
                      "LMO means Legal Metrology Officer."
                    );
                  } else if (q.includes("gatc")) {
                    alert(
                      "GATC reviews applications and approves certificates."
                    );
                  } else if (
                    q.includes("certificate") ||
                    q.includes("scan")
                  ) {
                    alert(
                      "Use the Certificate Scanner in the Public, Business, LMO or GATC portal."
                    );
                  } else if (q.includes("renew")) {
                    alert(
                      "Businesses can submit certificate renewal applications."
                    );
                  } else {
                    alert(
                      "I can help with certificates, complaints, renewal, LMO and GATC."
                    );
                  }

                  e.target.value = "";
                }}
              />

              <button
                onClick={(e) => {
                  const input =
                    e.currentTarget.previousElementSibling;

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
   LOGIN
========================================================= */

function LoginPage({ role, goHome, loginSuccess }) {

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isLMO = role === "lmo";

  const handleLogin = (e) => {

    e.preventDefault();

    if (!userId.trim() || !password.trim()) {
      setError("Please enter User ID and Password.");
      return;
    }

    if (isLMO) {

      if (
        userId.trim() === "lmo@demo.com" &&
        password === "123456"
      ) {
        loginSuccess();
      } else {
        setError("Invalid LMO User ID or Password.");
      }

    } else {

      if (
        userId.trim() === "business@demo.com" &&
        password === "123456"
      ) {
        loginSuccess();
      } else {
        setError("Invalid Business User ID or Password.");
      }

    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <button
          className="back-button"
          onClick={goHome}
        >
          ← Back
        </button>

        <div className="login-icon">
          {isLMO ? "👮" : "🏢"}
        </div>

        <h1>
          {isLMO ? "LMO Officer Login" : "Business Login"}
        </h1>

        <p className="login-subtitle">
          {isLMO
            ? "Login to access the LMO Officer Portal"
            : "Login to access the Business Portal"}
        </p>

        <form onSubmit={handleLogin}>

          <label>User ID / Email</label>

          <input
            className="login-input"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your User ID"
          />

          <label>Password</label>

          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            className="login-submit"
            type="submit"
          >
            Login →
          </button>

        </form>

        <div className="demo-text">
          <strong>Demo Login</strong>
          <br />
          User ID:{" "}
          {isLMO ? "lmo@demo.com" : "business@demo.com"}
          <br />
          Password: 123456
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   CAMERA COMPONENT
========================================================= */

function CameraModal({ title, onClose, onCapture }) {

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [error, setError] = useState("");
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {

    let mounted = true;

    const startCamera = async () => {

      try {

        if (!navigator.mediaDevices?.getUserMedia) {
          setError("Camera is not supported by this browser.");
          return;
        }

        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: { ideal: "environment" }
            },
            audio: false,
          });

        if (!mounted) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;

        requestAnimationFrame(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current
              .play()
              .catch(() => {});
          }
        });

      } catch (err) {

        setError(
          "Camera permission was denied or the camera is unavailable."
        );

      }

    };

    startCamera();

    return () => {

      mounted = false;

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }

    };

  }, []);

  const takePhoto = () => {

    const video = videoRef.current;

    if (!video || video.readyState < 2 || !video.videoWidth || !video.videoHeight) {
      setError("Camera is still starting. Please wait until the live preview is visible, then try again.");
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) {
      setError("Could not capture the camera frame. Please try again.");
      return;
    }

    context.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        setError("Photo capture failed. Please try again.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        onCapture(reader.result);
      };
      reader.readAsDataURL(blob);
    }, "image/jpeg", 0.85);

  };

  return (
    <div className="camera-overlay">

      <div className="camera-modal">

        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="camera-icon">
          📷
        </div>

        <h2>{title}</h2>

        <p>
          Camera is active. Position the instrument or document
          inside the frame.
        </p>

        <div className="camera-frame">

          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            onLoadedMetadata={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
          />

          <div className="camera-corners"></div>

        </div>

        {error && (
          <div className="camera-error">
            ⚠️ {error}
          </div>
        )}

        <button
          className="primary-btn camera-capture"
          onClick={takePhoto}
          disabled={!videoReady}
        >
          {videoReady ? "📸 Take Photo" : "⏳ Starting Camera..."}
        </button>

      </div>

    </div>
  );
}


/* =========================================================
   CERTIFICATE SCANNER
========================================================= */

function CertificateScanner({ onClose }) {

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const scanTimerRef = useRef(null);

  const [scanResult, setScanResult] = useState("");
  const [manualId, setManualId] = useState("");
  const [error, setError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  useEffect(() => {

    let mounted = true;

    const startScanner = async () => {

      if (!navigator.mediaDevices?.getUserMedia) {
        setError("Camera is not supported by this browser.");
        return;
      }

      try {

        const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: false,
});

        if (!mounted) return;

        streamRef.current = stream;
        setCameraActive(true);

        // Attach the stream after React renders the video element.
        requestAnimationFrame(() => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        });

        if ("BarcodeDetector" in window) {

          const detector = new window.BarcodeDetector({
            formats: ["qr_code"]
          });

          scanTimerRef.current =
            setInterval(async () => {

              if (!videoRef.current) return;

              try {

                const codes =
                  await detector.detect(videoRef.current);

                if (codes.length > 0) {

                  const value = codes[0].rawValue;

                  if (value) {
                    setScanResult(value);
                  }

                }

              } catch {
                // Continue scanning.
              }

            }, 700);

        } else {

          setError(
            "QR camera scanning is not supported by this browser. You can enter the Certificate ID below."
          );

        }

      } catch (err) {
  console.error("Camera error:", err);
  setError(`Camera error: ${err.name || "Unknown error"}`);
}

    };

    startScanner();

    return () => {

      mounted = false;

      if (scanTimerRef.current) {
        clearInterval(scanTimerRef.current);
      }

      if (streamRef.current) {
        streamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }

    };

  }, []);

  const verifyCertificate = (id) => {

    const certificates = getCertificates();

    const cleanId = id.trim();

    const found = certificates.find(
      (certificate) =>
        certificate.certificateId.toLowerCase() ===
        cleanId.toLowerCase()
    );

    if (found) {

      alert(
        `CERTIFICATE VERIFIED\n\nCertificate: ${found.certificateId}\nBusiness: ${found.businessName}\nInstrument: ${found.instrumentType}\nSerial: ${found.serialNumber}\nStatus: ${found.status}\nExpiry: ${found.expiryDate}`
      );

    } else {

      alert(
        "Certificate not found in the Legal Metrology database."
      );

    }

  };

  return (
    <div className="scanner-overlay">

      <div className="scanner-modal">

        <button
          className="modal-close"
          onClick={onClose}
        >
          ×
        </button>

        <div className="scanner-icon">
          🔍
        </div>

        <h2>Certificate Scanner</h2>

        <p>
          Scan the QR code printed on the certificate to check
          whether the certificate is registered and approved.
        </p>

        <div className="scanner-frame">

          {cameraActive && (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
            />
          )}

          <div className="scan-line"></div>

          <div className="scanner-corners"></div>

        </div>

        {scanResult && (
          <div className="scan-detected">
            ✅ QR detected: {scanResult}
            <button
              className="primary-btn"
              onClick={() => verifyCertificate(scanResult)}
            >
              Verify Scanned Certificate
            </button>
          </div>
        )}

        {error && (
          <div className="camera-error">
            ⚠️ {error}
          </div>
        )}

        <div className="scanner-divider">
          <span>OR ENTER CERTIFICATE ID</span>
        </div>

        <div className="scanner-manual">

          <input
            value={manualId}
            onChange={(e) => setManualId(e.target.value)}
            placeholder="Example: LM-CERT-2026-001"
          />

          <button
            className="secondary-btn"
            onClick={() => verifyCertificate(manualId)}
          >
            Check
          </button>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   PUBLIC PORTAL
========================================================= */

function CustomerDashboard({ goHome }) {

  const [showComplaint, setShowComplaint] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [complaintPhoto, setComplaintPhoto] = useState("");
  const [complaintSubmitted, setComplaintSubmitted] =
    useState(false);
  const [complaints, setComplaintsState] =
    useState(getComplaints());

  useEffect(() => {
    const refreshComplaints = () => {
      setComplaintsState(getComplaints());
    };

    refreshComplaints();

    const timer = setInterval(refreshComplaints, 1000);
    window.addEventListener("lm-complaints-updated", refreshComplaints);
    window.addEventListener("storage", refreshComplaints);

    return () => {
      clearInterval(timer);
      window.removeEventListener(
        "lm-complaints-updated",
        refreshComplaints
      );
      window.removeEventListener("storage", refreshComplaints);
    };
  }, []);

  const submitComplaint = (e) => {

    e.preventDefault();

    if (!complaintPhoto) {
      alert("Please take a photo of the complaint evidence first.");
      return;
    }

    const form = new FormData(e.target);

    const complaint = {
      id: `CMP-${Date.now()}`,
      businessName: form.get("businessName"),
      location: form.get("location"),
      issueType: form.get("issueType"),
      description: form.get("description"),
      photo: complaintPhoto,
      submittedAt: new Date().toLocaleString(),

      // Complaint workflow:
      // Public -> GATC -> LMO -> Completed Inspection
      status: "Submitted to GATC",
      stage: "GATC",
      lmoApproved: false,
      inspectionCompletedAt: null,
    };

    const updatedComplaints = [
      ...getComplaints(),
      complaint,
    ];

    saveComplaints(updatedComplaints);
    setComplaintsState(updatedComplaints);

    setComplaintSubmitted(true);
    setShowComplaint(false);
    setComplaintPhoto("");

  };

  return (

    <div className="dashboard-page">

      <header className="dashboard-header">

        <div className="brand">
          <div className="brand-logo">⚖</div>

          <div>
            <h2>LEGAL METROLOGY</h2>
            <span>PUBLIC PORTAL</span>
          </div>
        </div>

        <button
          className="back-button"
          onClick={goHome}
        >
          ← Home
        </button>

      </header>


      <main className="dashboard">

        <div className="dashboard-top">

          <div>

            <div className="hero-badge">
              PUBLIC PORTAL
            </div>

            <h1>
              Public <span>Protection</span>
            </h1>

            <p>
              Report measurement problems and verify
              certificates using the digital portal.
            </p>

          </div>

          <div className="dashboard-avatar">
            👤
          </div>

        </div>


        <div className="stats-grid">

          <div className="stat-card">
            <span>Complaints</span>
            <strong>
              {complaintSubmitted ? "02" : "01"}
            </strong>
            <small>Submitted</small>
          </div>

          <div className="stat-card">
            <span>Verified</span>
            <strong>01</strong>
            <small>Businesses</small>
          </div>

          <div className="stat-card">
            <span>Portal</span>
            <strong>24×7</strong>
            <small>Digital access</small>
          </div>

          <div className="stat-card">
            <span>Support</span>
            <strong>LMO</strong>
            <small>Complaint review</small>
          </div>

        </div>


        <div className="feature-grid">

          <div className="dashboard-card feature-card">

            <div className="feature-icon">
              📷
            </div>

            <span className="card-label">
              CERTIFICATE VERIFICATION
            </span>

            <h2>
              Scan Certificate
            </h2>

            <p>
              Use your device camera to scan the QR code
              printed on a Legal Metrology certificate.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowScanner(true)}
            >
              📷 Open Camera Scanner
            </button>

          </div>


          <div className="dashboard-card feature-card">

            <div className="feature-icon">
              🚨
            </div>

            <span className="card-label">
              CONSUMER PROTECTION
            </span>

            <h2>
              Report an Issue
            </h2>

            <p>
              Report short weight, incorrect measurement,
              faulty instruments or suspected tampering.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowComplaint(true)}
            >
              + File Complaint
            </button>

          </div>

        </div>


        {complaintSubmitted && (
          <div className="success-message">
            ✅ Complaint submitted successfully and sent to GATC for review.
          </div>
        )}

        {/* LIVE COMPLAINT LIST */}
        {complaints.length > 0 && (
          <div className="dashboard-card">
            <div className="card-heading">
              <div>
                <span>COMPLAINT TRACKING</span>
                <h2>Your Complaint Status</h2>
              </div>
              <div className="big-icon">📋</div>
            </div>

            <div className="application-list">
              {complaints.map((complaint) => (
                <div className="application-row" key={complaint.id}>
                  <div className="application-row-main">
                    <strong>{complaint.businessName}</strong>
                    <span>{complaint.id}</span>
                    <small>
                      {complaint.issueType} • {complaint.location}
                    </small>
                  </div>

                  <div className="application-row-status">
                    <span
                      className={
                        complaint.status === "Completed Inspection"
                          ? "status-approved"
                          : complaint.status === "Sent to LMO"
                            ? "status-review"
                            : "status-pending"
                      }
                    >
                      {complaint.status}
                    </span>

                    {complaint.inspectionCompletedAt && (
                      <small>
                        Completed: {complaint.inspectionCompletedAt}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {showComplaint && (

          <div className="modal-overlay">

            <div className="application-modal">

              <button
                className="modal-close"
                type="button"
                onClick={() => setShowComplaint(false)}
              >
                ×
              </button>

              <div className="modal-icon">
                🚨
              </div>

              <h2>
                File a Complaint
              </h2>

              <p>
                Provide details and take a photo of the issue
                as supporting evidence.
              </p>


              <form onSubmit={submitComplaint}>

                <input
                  name="businessName"
                  required
                  placeholder="Business / Shop Name"
                />

                <input
                  name="location"
                  required
                  placeholder="Location"
                />

                <select
                  name="issueType"
                  required
                >

                  <option value="">
                    Select Issue Type
                  </option>

                  <option>Short Weight</option>
                  <option>Incorrect Measurement</option>
                  <option>Faulty Weighing Machine</option>
                  <option>Suspected Tampering</option>

                </select>

                <textarea
                  name="description"
                  required
                  placeholder="Describe the issue"
                  rows="4"
                />


                <div className="camera-upload-box">

                  <div>
                    <strong>
                      📷 Complaint Photo
                    </strong>

                    <p>
                      Take a real photo using your device camera.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowCamera(true)}
                  >
                    📷 Open Camera
                  </button>

                </div>


                {complaintPhoto && (

                  <div className="photo-preview">

                    <img
                      src={complaintPhoto}
                      alt="Complaint evidence"
                    />

                    <span>
                      ✓ Complaint photo captured
                    </span>

                  </div>

                )}


                <label className="upload-label">
                  📎 Or Upload Complaint Evidence
                </label>

                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    if (
                      file &&
                      file.type.startsWith("image/")
                    ) {
                      const reader = new FileReader();

                      reader.onload = () =>
                        setComplaintPhoto(
                          reader.result
                        );

                      reader.readAsDataURL(file);
                    }
                  }}
                />


                <button
                  className="primary-btn"
                  type="submit"
                >
                  Submit Complaint →
                </button>

              </form>

            </div>

          </div>

        )}


      </main>


      {showCamera && (

        <CameraModal
          title="Take Complaint Photo"
          onClose={() => setShowCamera(false)}
          onCapture={(image) => {
            setComplaintPhoto(image);
            setShowCamera(false);
          }}
        />

      )}


      {showScanner && (
        <CertificateScanner
          onClose={() => setShowScanner(false)}
        />
      )}

    </div>
  );
}

/* =========================================================
   BUSINESS PORTAL
========================================================= */

function BusinessDashboard({ goHome }) {

  const [showApplication, setShowApplication] = useState(false);
  const [showRenewal, setShowRenewal] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [instrumentPhoto, setInstrumentPhoto] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [applications, setApplications] =
    useState(getApplications());

  const [certificates, setCertificates] =
    useState(getCertificates());

  useEffect(() => {
    const refreshBusinessData = () => {
      setApplications(getApplications());
      setCertificates(getCertificates());
    };

    refreshBusinessData();

    const timer = setInterval(
      refreshBusinessData,
      1000
    );

    window.addEventListener(
      "storage",
      refreshBusinessData
    );

    // Instantly refresh when GATC approves a certificate in the same app/window.
    window.addEventListener(
      "lm-data-updated",
      refreshBusinessData
    );

    return () => {
      clearInterval(timer);
      window.removeEventListener(
        "storage",
        refreshBusinessData
      );
      window.removeEventListener(
        "lm-data-updated",
        refreshBusinessData
      );
    };
  }, []);

  // Always sync the Business Portal with the latest certificate approved by GATC.
  // This prevents an older pending application from being shown after approval.
  const latestApprovedCertificate =
    [...certificates]
      .filter((certificate) => certificate.status === "APPROVED")
      .sort(
        (a, b) =>
          new Date(b.approvedAt || b.issueDate || 0) -
          new Date(a.approvedAt || a.issueDate || 0)
      )[0] || null;

  const myApplication =
    (latestApprovedCertificate &&
      applications.find(
        (application) =>
          application.id === latestApprovedCertificate.applicationId
      )) ||
    [...applications].reverse().find(
      (application) => application.status === "Certificate Approved"
    ) ||
    applications[applications.length - 1];

  const approvedCertificate =
    (myApplication?.certificateId &&
      certificates.find(
        (certificate) =>
          certificate.certificateId === myApplication.certificateId &&
          certificate.status === "APPROVED"
      )) ||
    (latestApprovedCertificate &&
      latestApprovedCertificate.applicationId === myApplication?.id
      ? latestApprovedCertificate
      : null);

  const isCertificateApproved =
    myApplication?.status === "Certificate Approved" ||
    approvedCertificate?.status === "APPROVED";

  const submitApplication = (e) => {

    e.preventDefault();

    const form = new FormData(e.target);

    const newApplication = {
      id: `APP-2026-${String(
        applications.length + 1
      ).padStart(3, "0")}`,

      businessName: form.get("businessName"),
      ownerName: form.get("ownerName"),
      contact: form.get("contact"),
      instrumentType: form.get("instrumentType"),
      model: form.get("model"),
      serialNumber: form.get("serialNumber"),
      address: form.get("address"),
      arrivalDate: form.get("arrivalDate"),
      arrivalTime: form.get("arrivalTime"),

      status: "Pending GATC Review",
      lmoStatus: "Assigned",
      lmoVisited: false,

      lmoLatitude: null,
      lmoLongitude: null,
      lmoVisitTime: null,

      proof: instrumentPhoto,
      verificationRemarks: "",

      certificateId: null,
      certificateStatus: null,

      submittedAt: new Date().toLocaleDateString(),
    };

    const updatedApplications = [
      ...applications,
      newApplication
    ];

    saveApplications(updatedApplications);
    setApplications(updatedApplications);

    setSubmitted(true);
    setShowApplication(false);
    setInstrumentPhoto("");

  };

  const submitRenewal = (e) => {

    e.preventDefault();

    const form = new FormData(e.target);

    const renewal = {
      ...myApplication,

      id: `REN-${Date.now()}`,

      status: "Certificate Renewal - Pending GATC",

      renewalReason: form.get("reason"),

      arrivalDate: form.get("arrivalDate"),

      arrivalTime: form.get("arrivalTime"),

      submittedAt: new Date().toLocaleDateString(),
    };

    saveApplications([
      ...applications,
      renewal
    ]);

    alert(
      "Certificate renewal application submitted to GATC."
    );

    setShowRenewal(false);

  };

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">

        <div className="brand">

          <div className="brand-logo">
            ⚖
          </div>

          <div>
            <h2>LEGAL METROLOGY</h2>
            <span>BUSINESS PORTAL</span>
          </div>

        </div>

        <button
          className="back-button"
          onClick={goHome}
        >
          ← Home
        </button>

      </header>

      <main className="dashboard">

        <div className="dashboard-top">

          <div>

            <div className="hero-badge">
              BUSINESS DASHBOARD
            </div>

            <h1>
              Business <span>Portal</span>
            </h1>

            <p>
              Submit instruments for verification, renew
              certificates and schedule an LMO visit.
            </p>

          </div>

          <div className="dashboard-avatar">
            🏢
          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <span>Applications</span>
            <strong>{applications.length}</strong>
            <small>Saved in portal</small>
          </div>

          <div className="stat-card">
            <span>GATC Review</span>
            <strong>
              {
                applications.filter(
                  (a) =>
                    a.status.includes("GATC") ||
                    a.status === "Pending GATC Review"
                ).length
              }
            </strong>
            <small>Applications</small>
          </div>

          <div className="stat-card">
            <span>Certificates</span>
            <strong>
              {
                certificates.filter(
                  (certificate) =>
                    certificate.applicationId ===
                    myApplication?.id &&
                    certificate.status === "APPROVED"
                ).length
              }
            </strong>
            <small>Approved for this business</small>
          </div>

          <div className="stat-card">
            <span>Renewal</span>
            <strong>01</strong>
            <small>Period based</small>
          </div>

        </div>

        {/* CURRENT APPLICATION */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <span>APPLICATION STATUS</span>
              <h2>
                {myApplication.businessName}
              </h2>
            </div>

            <div className="big-icon">
              📋
            </div>

          </div>

          <div className="application-details">

            <p>
              <strong>Application:</strong>{" "}
              {myApplication.id}
            </p>

            <p>
              <strong>Instrument:</strong>{" "}
              {myApplication.instrumentType}
            </p>

            <p>
              <strong>Serial:</strong>{" "}
              {myApplication.serialNumber}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  isCertificateApproved
                    ? "status-approved"
                    : myApplication.status.includes("LMO")
                      ? "status-review"
                      : "status-pending"
                }
              >
                {isCertificateApproved
                  ? "Certificate Approved"
                  : myApplication.status}
              </span>
            </p>

            <p>
              <strong>LMO Visit:</strong>{" "}
              {myApplication.arrivalDate
                ? `${myApplication.arrivalDate} at ${myApplication.arrivalTime}`
                : "Not scheduled"}
            </p>

            <p>
              <strong>LMO Tracking:</strong>{" "}
              {isCertificateApproved
                ? "✓ LMO verification completed"
                : myApplication.lmoVisited
                  ? "✓ Visit location recorded"
                  : "Waiting for LMO visit"}
            </p>

          </div>

          {submitted && (
            <div className="success-message">
              ✅ Application successfully saved.
              <br />
              GATC can now see this application.
            </div>
          )}

        </div>

        {isCertificateApproved &&
          approvedCertificate && (

          <div className="dashboard-card">

            <div className="card-heading">

              <div>
                <span className="status-approved">
                  GATC FINAL APPROVAL
                </span>

                <h2>
                  🎉 Your Certificate is Approved
                </h2>
              </div>

              <div className="big-icon">
                📜
              </div>

            </div>

            <div className="success-message">
              Your application was verified by the LMO, sent back to GATC,
              and finally approved by GATC. Your official certificate
              is now live and available in the Business Portal.
            </div>

            <div className="certificate-grid">

              <CertificateCard
                certificate={approvedCertificate}
                onScan={() => setShowScanner(true)}
              />

            </div>

          </div>

        )}


        {/* ACTIONS */}

        <div className="feature-grid">

          <div className="dashboard-card feature-card">

            <div className="feature-icon">
              📝
            </div>

            <span className="card-label">
              NEW APPLICATION
            </span>

            <h2>
              Apply for Verification
            </h2>

            <p>
              Register a new weighing or measuring instrument.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowApplication(true)}
            >
              + New Application
            </button>

          </div>

          <div className="dashboard-card feature-card">

            <div className="feature-icon">
              🔄
            </div>

            <span className="card-label">
              CERTIFICATE RENEWAL
            </span>

            <h2>
              Renew Certificate
            </h2>

            <p>
              Apply for renewal before your certificate expires.
            </p>

            <button
              className="primary-btn"
              onClick={() => setShowRenewal(true)}
            >
              🔄 Start Renewal
            </button>

          </div>

          <div className="dashboard-card feature-card">

            <div className="feature-icon">
              📷
            </div>

            <span className="card-label">
              CERTIFICATE CHECK
            </span>

            <h2>
              Scan Certificate
            </h2>

            <p>
              Check a certificate using the device camera.
            </p>

            <button
              className="secondary-btn"
              onClick={() => setShowScanner(true)}
            >
              📷 Open Scanner
            </button>

          </div>

        </div>

        {/* NEW APPLICATION MODAL */}

        {showApplication && (

          <div className="modal-overlay">

            <div className="application-modal">

              <button
                className="modal-close"
                onClick={() => setShowApplication(false)}
              >
                ×
              </button>

              <div className="modal-icon">
                ⚖️
              </div>

              <h2>
                New Verification Application
              </h2>

              <p>
                All application data will be saved and
                displayed in the GATC portal.
              </p>

              <form onSubmit={submitApplication}>

                <input
                  name="businessName"
                  required
                  placeholder="Business Name"
                />

                <input
                  name="ownerName"
                  required
                  placeholder="Owner Name"
                />

                <input
                  name="contact"
                  required
                  type="tel"
                  placeholder="Contact Number"
                />

                <select
                  name="instrumentType"
                  required
                >
                  <option value="">
                    Select Instrument Type
                  </option>

                  <option>
                    Digital Weighing Machine
                  </option>

                  <option>
                    Petrol Dispensing Unit
                  </option>

                  <option>
                    Measuring Instrument
                  </option>
                </select>

                <input
                  name="model"
                  required
                  placeholder="Instrument Model"
                />

                <input
                  name="serialNumber"
                  required
                  placeholder="Instrument Serial Number"
                />

                <input
                  name="address"
                  required
                  placeholder="Business Address"
                />

                <div className="schedule-box">

                  <h3>
                    📅 LMO Arrival Schedule
                  </h3>

                  <p>
                    Select the date and approximate time
                    when the LMO should visit.
                  </p>

                  <div className="two-inputs">

                    <input
                      name="arrivalDate"
                      required
                      type="date"
                    />

                    <input
                      name="arrivalTime"
                      required
                      type="time"
                    />

                  </div>

                </div>

                <div className="camera-upload-box">

                  <div>
                    <strong>
                      📷 Instrument Photo
                    </strong>

                    <p>
                      Take a real photo using your device camera.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="secondary-btn"
                    onClick={() => setShowCamera(true)}
                  >
                    📷 Open Camera
                  </button>

                </div>

                {instrumentPhoto && (

                  <div className="photo-preview">

                    <img
                      src={instrumentPhoto}
                      alt="Instrument"
                    />

                    <span>
                      ✓ Instrument photo captured
                    </span>

                  </div>

                )}

                <button
                  className="primary-btn"
                  type="submit"
                >
                  Submit Application to GATC →
                </button>

              </form>

            </div>

          </div>

        )}

        {/* RENEWAL MODAL */}

        {showRenewal && (

          <div className="modal-overlay">

            <div className="application-modal">

              <button
                className="modal-close"
                onClick={() => setShowRenewal(false)}
              >
                ×
              </button>

              <div className="modal-icon">
                🔄
              </div>

              <h2>
                Certificate Renewal
              </h2>

              <p>
                Renew your certificate before its validity period ends.
              </p>

              <form onSubmit={submitRenewal}>

                <div className="application-details">

                  <p>
                    <strong>Certificate:</strong>{" "}
                    {certificates[0]?.certificateId}
                  </p>

                  <p>
                    <strong>Instrument:</strong>{" "}
                    {myApplication.instrumentType}
                  </p>

                  <p>
                    <strong>Serial:</strong>{" "}
                    {myApplication.serialNumber}
                  </p>

                </div>

                <textarea
                  name="reason"
                  required
                  placeholder="Reason for renewal"
                  rows="4"
                />

                <label>
                  Preferred LMO Arrival Date
                </label>

                <input
                  name="arrivalDate"
                  required
                  type="date"
                />

                <label>
                  Preferred LMO Arrival Time
                </label>

                <input
                  name="arrivalTime"
                  required
                  type="time"
                />

                <button
                  className="primary-btn"
                  type="submit"
                >
                  Submit Renewal →
                </button>

              </form>

            </div>

          </div>

        )}

      </main>

      {showCamera && (

        <CameraModal
          title="Take Instrument Photo"
          onClose={() => setShowCamera(false)}
          onCapture={(image) => {
            setInstrumentPhoto(image);
            setShowCamera(false);
          }}
        />

      )}

      {showScanner && (

        <CertificateScanner
          onClose={() => setShowScanner(false)}
        />

      )}

    </div>
  );
}


/* =========================================================
   LMO PORTAL
========================================================= */

function LMODashboard({ goHome }) {

  const [applications, setApplications] =
    useState(getApplications());

  const [complaints, setComplaintsState] =
    useState(getComplaints());

  const [showCamera, setShowCamera] = useState(false);
  const [proof, setProof] = useState("");
  const [remarks, setRemarks] = useState("");
  const [tracking, setTracking] = useState(false);
  const [location, setLocation] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  // LMO physical inspection: compare the details seen at the business
  // location with the details submitted in the application.
  const [observedInstrumentType, setObservedInstrumentType] = useState("");
  const [observedModel, setObservedModel] = useState("");
  const [observedSerialNumber, setObservedSerialNumber] = useState("");
  const [observedBusinessName, setObservedBusinessName] = useState("");
  const [observedAddress, setObservedAddress] = useState("");
  const [detailsChecked, setDetailsChecked] = useState(false);
  const [detailsMatch, setDetailsMatch] = useState(false);

  const assigned =
    applications.find(
      (app) =>
        app.status === "Sent to LMO" ||
        app.status === "Pending GATC Review" ||
        app.lmoStatus === "Assigned"
    ) || applications[applications.length - 1];

  const refresh = () => {
    setApplications(getApplications());
    setComplaintsState(getComplaints());
  };

  useEffect(() => {
    refresh();

    const timer = setInterval(refresh, 1000);
    window.addEventListener("lm-data-updated", refresh);
    window.addEventListener("lm-complaints-updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      clearInterval(timer);
      window.removeEventListener("lm-data-updated", refresh);
      window.removeEventListener("lm-complaints-updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const startVisit = () => {

    if (!navigator.geolocation) {
      alert("Live location is not supported by this browser.");
      return;
    }

    setTracking(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLocation(coords);

        const apps = getApplications();

        const updated = apps.map((app) => {

          if (app.id !== assigned.id) return app;

          return {
            ...app,
            lmoStatus: "Visit Started",
            lmoVisited: true,
            lmoLatitude: coords.latitude,
            lmoLongitude: coords.longitude,
            lmoVisitTime: new Date().toLocaleString(),
          };

        });

        saveApplications(updated);
        setApplications(updated);

      },
      () => {
        alert(
          "Please allow location permission so the LMO visit can be recorded."
        );
        setTracking(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );

  };

  const approveComplaintInspection = (complaintId) => {
    const updatedComplaints = getComplaints().map((complaint) => {
      if (complaint.id !== complaintId) return complaint;

      return {
        ...complaint,
        status: "Completed Inspection",
        stage: "Completed",
        lmoApproved: true,
        inspectionCompletedAt: new Date().toLocaleString(),
      };
    });

    saveComplaints(updatedComplaints);
    setComplaintsState(updatedComplaints);
  };

  const normalizeValue = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");

  const checkInstrumentDetails = () => {
    if (!assigned) {
      alert("No application is currently assigned to this LMO.");
      return;
    }

    const checks = [
      [assigned.instrumentType, observedInstrumentType],
      [assigned.model, observedModel],
      [assigned.serialNumber, observedSerialNumber],
      [assigned.businessName, observedBusinessName],
      [assigned.address, observedAddress],
    ];

    const allMatch = checks.every(
      ([expected, observed]) =>
        normalizeValue(expected) === normalizeValue(observed)
    );

    setDetailsChecked(true);
    setDetailsMatch(allMatch);

    if (allMatch) {
      alert("✓ All submitted details match the instrument and business details checked by the LMO.");
    } else {
      alert("⚠ Details do not match. Please re-check the model, serial number and other details before submitting the verification.");
    }
  };

  const submitVerification = () => {

    if (!detailsChecked || !detailsMatch) {
      alert("Please complete the physical detail check and make sure all details match before submitting to GATC.");
      return;
    }

    if (!proof) {
      alert(
        "Please take verification proof using the camera first."
      );
      return;
    }

    const apps = getApplications();

    const updated = apps.map((app) => {

      if (app.id !== assigned.id) return app;

      return {
        ...app,
        status: "Sent to GATC for Final Approval",
        lmoStatus: "Verification Completed",
        proof,
        verificationRemarks: remarks,
        physicalDetailsChecked: true,
        physicalDetailsMatch: true,
        observedInstrumentType,
        observedModel,
        observedSerialNumber,
        observedBusinessName,
        observedAddress,
        physicalDetailsCheckedAt: new Date().toLocaleString(),
      };

    });

    saveApplications(updated);
    setApplications(updated);
    setSubmitted(true);

  };

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">

        <div className="brand">

          <div className="brand-logo">
            ⚖
          </div>

          <div>
            <h2>LEGAL METROLOGY</h2>
            <span>LMO OFFICER PORTAL</span>
          </div>

        </div>

        <button
          className="back-button"
          onClick={goHome}
        >
          ← Home
        </button>

      </header>

      <main className="dashboard">

        <div className="dashboard-top">

          <div>

            <div className="hero-badge">
              LMO OFFICER DASHBOARD
            </div>

            <h1>
              Field <span>Verification</span>
            </h1>

            <p>
              Verify the instrument at the business location,
              record the visit location and submit proof to GATC.
            </p>

          </div>

          <div className="dashboard-avatar">
            👮
          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <span>Assigned</span>
            <strong>01</strong>
            <small>Current case</small>
          </div>

          <div className="stat-card">
            <span>Visit Status</span>
            <strong>
              {assigned?.lmoVisited ? "✓" : "—"}
            </strong>
            <small>
              {assigned?.lmoVisited
                ? "Location recorded"
                : "Not started"}
            </small>
          </div>

          <div className="stat-card">
            <span>Proof</span>
            <strong>
              {proof || assigned?.proof ? "✓" : "—"}
            </strong>
            <small>Verification evidence</small>
          </div>

          <div className="stat-card">
            <span>Report</span>
            <strong>
              {submitted ? "✓" : "01"}
            </strong>
            <small>Submission status</small>
          </div>

        </div>

        {/* ASSIGNED APPLICATION */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <span>ASSIGNED APPLICATION</span>
              <h2>
                {assigned?.businessName}
              </h2>
            </div>

            <div className="big-icon">
              ⚖️
            </div>

          </div>

          <div className="application-details">

            <p>
              <strong>Application:</strong>{" "}
              {assigned?.id}
            </p>

            <p>
              <strong>Instrument:</strong>{" "}
              {assigned?.instrumentType}
            </p>

            <p>
              <strong>Model:</strong>{" "}
              {assigned?.model}
            </p>

            <p>
              <strong>Serial:</strong>{" "}
              {assigned?.serialNumber}
            </p>

            <p>
              <strong>Business Address:</strong>{" "}
              {assigned?.address}
            </p>

            <p>
              <strong>Scheduled Visit:</strong>{" "}
              {assigned?.arrivalDate} at{" "}
              {assigned?.arrivalTime}
            </p>

          </div>

          {/* LIVE TRACKING */}

          <div className="tracking-box">

            <div>

              <span className="card-label">
                LIVE VISIT TRACKING
              </span>

              <h3>
                {tracking
                  ? "📍 Location tracking active"
                  : "LMO visit not started"}
              </h3>

              <p>
                The LMO can start the visit to record
                the device location and visit timestamp.
              </p>

            </div>

            {!tracking && assigned && (

              <button
                className="primary-btn"
                onClick={startVisit}
              >
                📍 Start Visit & Record Location
              </button>

            )}

          </div>

          {location && (

            <div className="location-success">

              📍 Visit location recorded

              <br />

              Latitude: {location.latitude.toFixed(6)}

              <br />

              Longitude: {location.longitude.toFixed(6)}

              <br />

              🕒 {new Date().toLocaleString()}

            </div>

          )}

          {/* PHYSICAL DETAIL CHECK */}

          <div className="verification-panel detail-check-panel">

            <span className="card-label">
              PHYSICAL DETAIL CHECK
            </span>

            <h3>
              Match Instrument & Business Details
            </h3>

            <p>
              The LMO must compare the details physically seen at the business location with the details submitted in this application.
            </p>

            <div className="inspection-grid">

              <div className="inspection-row">
                <span>Instrument Type</span>
                <strong>{assigned?.instrumentType || "—"}</strong>
                <input
                  value={observedInstrumentType}
                  onChange={(e) => {
                    setObservedInstrumentType(e.target.value);
                    setDetailsChecked(false);
                  }}
                  placeholder="Enter observed instrument type"
                />
              </div>

              <div className="inspection-row">
                <span>Model</span>
                <strong>{assigned?.model || "—"}</strong>
                <input
                  value={observedModel}
                  onChange={(e) => {
                    setObservedModel(e.target.value);
                    setDetailsChecked(false);
                  }}
                  placeholder="Enter model seen on instrument"
                />
              </div>

              <div className="inspection-row">
                <span>Serial Number</span>
                <strong>{assigned?.serialNumber || "—"}</strong>
                <input
                  value={observedSerialNumber}
                  onChange={(e) => {
                    setObservedSerialNumber(e.target.value);
                    setDetailsChecked(false);
                  }}
                  placeholder="Enter serial number seen"
                />
              </div>

              <div className="inspection-row">
                <span>Business Name</span>
                <strong>{assigned?.businessName || "—"}</strong>
                <input
                  value={observedBusinessName}
                  onChange={(e) => {
                    setObservedBusinessName(e.target.value);
                    setDetailsChecked(false);
                  }}
                  placeholder="Confirm business name"
                />
              </div>

              <div className="inspection-row">
                <span>Business Address</span>
                <strong>{assigned?.address || "—"}</strong>
                <input
                  value={observedAddress}
                  onChange={(e) => {
                    setObservedAddress(e.target.value);
                    setDetailsChecked(false);
                  }}
                  placeholder="Confirm business address"
                />
              </div>

            </div>

            <button
              className="secondary-btn detail-check-btn"
              onClick={checkInstrumentDetails}
            >
              🔎 Check Details Match
            </button>

            {detailsChecked && (
              <div
                className={
                  detailsMatch
                    ? "inspection-result match"
                    : "inspection-result mismatch"
                }
              >
                {detailsMatch
                  ? "✓ MATCH CONFIRMED — Instrument and business details match the application."
                  : "⚠ MISMATCH FOUND — Re-check the physical instrument and submitted details."}
              </div>
            )}

          </div>

          {/* VERIFICATION */}

          <div className="verification-panel">

            <span className="card-label">
              INSTRUMENT VERIFICATION
            </span>

            <h3>
              Physical Inspection & Proof
            </h3>

            <p>
              Check the instrument physically and capture
              evidence using the camera.
            </p>

            <button
              className="secondary-btn"
              onClick={() => setShowCamera(true)}
            >
              📷 Take Verification Proof
            </button>

            {proof && (

              <div className="photo-preview">

                <img
                  src={proof}
                  alt="Verification proof"
                />

                <span>
                  ✓ Proof captured
                </span>

              </div>

            )}

            <textarea
              value={remarks}
              onChange={(e) =>
                setRemarks(e.target.value)
              }
              placeholder="LMO verification remarks"
              rows="4"
            />

            <button
              className="primary-btn"
              onClick={submitVerification}
            >
              📤 Submit Verification to GATC →
            </button>

          </div>

          {submitted && (

            <div className="success-message">

              🎉 Verification report submitted successfully.

              <br />

              Verification has been sent to GATC for final certificate approval.

            </div>

          )}

        </div>

        {/* PUBLIC COMPLAINTS ASSIGNED TO LMO */}
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span>PUBLIC COMPLAINTS</span>
              <h2>Inspection Queue</h2>
            </div>
            <div className="big-icon">🚨</div>
          </div>

          <div className="application-list">
            {complaints.filter(
              (complaint) => complaint.stage === "LMO"
            ).length === 0 ? (
              <p>No complaints are currently assigned to LMO.</p>
            ) : (
              complaints
                .filter((complaint) => complaint.stage === "LMO")
                .map((complaint) => (
                  <div className="application-row" key={complaint.id}>
                    <div className="application-row-main">
                      <strong>{complaint.businessName}</strong>
                      <span>{complaint.id}</span>
                      <small>
                        {complaint.issueType} • {complaint.location}
                      </small>
                    </div>

                    <div className="application-row-status">
                      <span className="status-review">
                        Ready for Inspection
                      </span>

                      <button
                        className="primary-btn small-btn"
                        onClick={() =>
                          approveComplaintInspection(complaint.id)
                        }
                      >
                        ✓ Complete Inspection
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <span>CERTIFICATE CHECK</span>
              <h2>Scan Existing Certificate</h2>
            </div>

            <div className="big-icon">
              🔍
            </div>

          </div>

          <p>
            LMO can also scan a certificate using the device camera.
          </p>

          <button
            className="primary-btn"
            onClick={() => setShowScanner(true)}
          >
            📷 Open Certificate Scanner
          </button>

        </div>

      </main>

      {showCamera && (

        <CameraModal
          title="LMO Verification Proof"
          onClose={() => setShowCamera(false)}
          onCapture={(image) => {
            setProof(image);
            setShowCamera(false);
          }}
        />

      )}

      {showScanner && (

        <CertificateScanner
          onClose={() => setShowScanner(false)}
        />

      )}

    </div>
  );
}


/* =========================================================
   GATC PORTAL
========================================================= */

function GATCDashboard({ goHome }) {

  const [applications, setApplications] =
    useState(getApplications());

  const [certificates, setCertificates] =
    useState(getCertificates());

  const [complaints, setComplaintsState] =
    useState(getComplaints());

  const [showScanner, setShowScanner] = useState(false);

  // Keep GATC updated when LMO submits verification and when a certificate is approved.
  useEffect(() => {
    const refreshGATCData = () => {
      setApplications(getApplications());
      setCertificates(getCertificates());
      setComplaintsState(getComplaints());
    };

    refreshGATCData();

    const timer = setInterval(refreshGATCData, 1000);
    window.addEventListener("storage", refreshGATCData);

    return () => {
      clearInterval(timer);
      window.removeEventListener("storage", refreshGATCData);
    };
  }, []);

  const refreshData = () => {
    setApplications(getApplications());
    setCertificates(getCertificates());
    setComplaintsState(getComplaints());
  };

  const sendComplaintToLMO = (complaintId) => {
    const updatedComplaints = getComplaints().map((complaint) => {
      if (complaint.id !== complaintId) return complaint;

      return {
        ...complaint,
        status: "Sent to LMO",
        stage: "LMO",
        forwardedToLMOAt: new Date().toLocaleString(),
      };
    });

    saveComplaints(updatedComplaints);
    setComplaintsState(updatedComplaints);
  };

  const sendToLMO = (id) => {

    const updated = applications.map((app) => {

      if (app.id !== id) return app;

      return {
        ...app,
        status: "Sent to LMO",
        lmoStatus: "Assigned",
      };

    });

    saveApplications(updated);
    setApplications(updated);

  };

  const approveCertificate = (app) => {

    if (
      app.status !== "Sent to GATC for Final Approval"
    ) {
      alert(
        "The LMO verification must be completed and sent to GATC before certificate approval."
      );
      return;
    }

    const newCertificate = {
      certificateId:
        app.certificateId ||
        `LM-CERT-2026-${String(
          certificates.length + 1
        ).padStart(3, "0")}`,

      applicationId: app.id,

      businessName: app.businessName,

      instrumentType: app.instrumentType,

      serialNumber: app.serialNumber,

      issueDate:
        new Date().toISOString().split("T")[0],

      expiryDate: getExpiryDate(),

      status: "APPROVED",
      approvedAt: new Date().toISOString(),
    };

    const newCertificates = [
      ...certificates.filter(
        (c) =>
          c.certificateId !==
          newCertificate.certificateId
      ),
      newCertificate,
    ];

    const updatedApplications =
      applications.map((item) => {

        if (item.id !== app.id) return item;

        return {
          ...item,
          status: "Certificate Approved",
          lmoStatus: "Verification Completed",
          certificateId:
            newCertificate.certificateId,
          certificateStatus: "APPROVED",
          certificateIssuedAt: new Date().toLocaleString(),
        };

      });

    // Save both records first, then notify every open portal once.
    localStorage.setItem(
      "lm_certificates",
      JSON.stringify(newCertificates)
    );
    localStorage.setItem(
      "lm_applications",
      JSON.stringify(updatedApplications)
    );
    window.dispatchEvent(new Event("lm-data-updated"));

    setCertificates(newCertificates);
    setApplications(updatedApplications);

    alert(
      `Certificate ${newCertificate.certificateId} approved successfully.`
    );

  };

  return (
    <div className="dashboard-page">

      <header className="dashboard-header">

        <div className="brand">

          <div className="brand-logo">
            ⚖
          </div>

          <div>
            <h2>LEGAL METROLOGY</h2>
            <span>GATC PORTAL</span>
          </div>

        </div>

        <button
          className="back-button"
          onClick={goHome}
        >
          ← Home
        </button>

      </header>

      <main className="dashboard">

        <div className="dashboard-top">

          <div>

            <div className="hero-badge">
              GATC DASHBOARD
            </div>

            <h1>
              Application <span>Control Centre</span>
            </h1>

            <p>
              Applications submitted by businesses appear here.
              GATC can send applications to LMO, receive the LMO verification report,
              and issue the final certificate after approval.
            </p>

          </div>

          <div className="dashboard-avatar">
            🏛️
          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <span>Applications</span>
            <strong>{applications.length}</strong>
            <small>Received</small>
          </div>

          <div className="stat-card">
            <span>LMO Assigned</span>
            <strong>
              {
                applications.filter(
                  (a) => a.lmoStatus === "Assigned"
                ).length
              }
            </strong>
            <small>Field visits</small>
          </div>

          <div className="stat-card">
            <span>Verified</span>
            <strong>
              {
                applications.filter(
                  (a) =>
                    a.status ===
                    "Sent to GATC for Final Approval"
                ).length
              }
            </strong>
            <small>Sent by LMO for final approval</small>
          </div>

          <div className="stat-card">
            <span>Certificates</span>
            <strong>{certificates.length}</strong>
            <small>Approved</small>
          </div>

        </div>

        {/* PUBLIC COMPLAINTS */}
        <div className="dashboard-card">
          <div className="card-heading">
            <div>
              <span>PUBLIC COMPLAINTS</span>
              <h2>Complaint Review</h2>
            </div>
            <div className="big-icon">🚨</div>
          </div>

          <div className="application-list">
            {complaints.length === 0 ? (
              <p>No public complaints received.</p>
            ) : (
              complaints.map((complaint) => (
                <div className="application-row" key={complaint.id}>
                  <div className="application-row-main">
                    <strong>{complaint.businessName}</strong>
                    <span>{complaint.id}</span>
                    <small>
                      {complaint.issueType} • {complaint.location}
                    </small>
                  </div>

                  <div className="application-row-status">
                    <span
                      className={
                        complaint.status === "Completed Inspection"
                          ? "status-approved"
                          : complaint.stage === "LMO"
                            ? "status-review"
                            : "status-pending"
                      }
                    >
                      {complaint.status}
                    </span>

                    {complaint.stage === "GATC" && (
                      <button
                        className="primary-btn small-btn"
                        onClick={() =>
                          sendComplaintToLMO(complaint.id)
                        }
                      >
                        Send to LMO →
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* APPLICATION DATABASE */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <span>APPLICATION DATABASE</span>
              <h2>Business Applications</h2>
            </div>

            <div className="big-icon">
              🗃️
            </div>

          </div>

          <div className="application-list">

            {applications.map((app) => (

              <div
                className="application-row"
                key={app.id}
              >

                <div className="application-row-main">

                  <strong>
                    {app.businessName}
                  </strong>

                  <span>
                    {app.id}
                  </span>

                  <small>
                    {app.instrumentType} •{" "}
                    {app.serialNumber}
                  </small>

                </div>

                <div className="application-row-status">

                  <span
                    className={
                      app.status ===
                      "Certificate Approved"
                        ? "status-approved"
                        : app.status.includes("LMO")
                          ? "status-review"
                          : "status-pending"
                    }
                  >
                    {app.status}
                  </span>

                  {!app.lmoVisited &&
                    app.status ===
                      "Pending GATC Review" && (

                      <button
                        className="primary-btn small-btn"
                        onClick={() =>
                          sendToLMO(app.id)
                        }
                      >
                        Send to LMO →
                      </button>

                    )}

                  {app.lmoVisited && (

                    <div className="tracking-mini">

                      📍 LMO Visit Recorded

                      <br />

                      <small>
                        {app.lmoVisitTime}
                      </small>

                    </div>

                  )}

                  {app.status ===
                    "Sent to GATC for Final Approval" && (

                    <button
                      className="primary-btn small-btn"
                      onClick={() =>
                        approveCertificate(app)
                      }
                    >
                      ✓ Approve Certificate
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* CERTIFICATES */}

        <div className="dashboard-card">

          <div className="card-heading">

            <div>
              <span>OFFICIAL CERTIFICATES</span>
              <h2>Approved Certificate Database</h2>
            </div>

            <div className="big-icon">
              📜
            </div>

          </div>

          <div className="certificate-grid">

            {certificates.map((certificate) => (

              <CertificateCard
                key={certificate.certificateId}
                certificate={certificate}
                onScan={() => setShowScanner(true)}
              />

            ))}

          </div>

          <button
            className="secondary-btn"
            onClick={refreshData}
          >
            🔄 Refresh Database
          </button>

        </div>

      </main>

      {showScanner && (

        <CertificateScanner
          onClose={() => setShowScanner(false)}
        />

      )}

    </div>
  );
}


/* =========================================================
   CERTIFICATE CARD
========================================================= */

function CertificateCard({ certificate, onScan }) {

  const qrData = encodeURIComponent(
    certificate.certificateId
  );

  const qrUrl =
    `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qrData}`;

  return (

    <div className="certificate-card">

      <div className="certificate-header">

        <div className="certificate-seal">
          ⚖
        </div>

        <div>
          <strong>
            LEGAL METROLOGY
          </strong>

          <small>
            DIGITAL VERIFICATION CERTIFICATE
          </small>
        </div>

      </div>

      <div className="certificate-id">
        {certificate.certificateId}
      </div>

      <div className="certificate-body">

        <p>
          <strong>Business:</strong>{" "}
          {certificate.businessName}
        </p>

        <p>
          <strong>Instrument:</strong>{" "}
          {certificate.instrumentType}
        </p>

        <p>
          <strong>Serial:</strong>{" "}
          {certificate.serialNumber}
        </p>

        <p>
          <strong>Issued:</strong>{" "}
          {certificate.issueDate}
        </p>

        <p>
          <strong>Valid Until:</strong>{" "}
          {certificate.expiryDate}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          <span className="status-approved">
            {certificate.status}
          </span>
        </p>

      </div>

      <div className="certificate-qr">

        <img
          src={qrUrl}
          alt="Certificate QR Code"
        />

        <span>
          Scan to verify
        </span>

      </div>

      <button
        className="secondary-btn"
        onClick={onScan}
      >
        📷 Scan Certificate
      </button>

    </div>
  );
}


/* =========================================================
   DATE
========================================================= */

function getExpiryDate() {

  const date = new Date();

  date.setFullYear(
    date.getFullYear() + 1
  );

  return date.toISOString().split("T")[0];
}


export default App;