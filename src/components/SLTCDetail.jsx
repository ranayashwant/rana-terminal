/* SLTCDetail.jsx — SLTC flagship detail section (matching MFScreener layout).
   Extracted directly from the project specification & PDF documentation.
   
   Contains:
   1. Pipeline View / File Breakdown View toggle
   2. System Architecture Data Flow Diagram
   3. Python Classifier & Inference Code Inspector (sample code response)
   4. Top-right Screenshot modal preview button */

import { useState } from 'react'
import { projects } from '../data/content.js'
import { useReveal } from '../hooks/useReveal.js'
import '../styles/mfscreener.css'

const sltc = projects.find(p => p.id === 'sltc')

/* Sample inference code snippet extracted from inference_classifier.py */
const sltcCodeSnippet = `# inference_classifier.py — Real-time gesture prediction loop
import cv2, pickle, mediapipe as mp, numpy as np

model_dict = pickle.load(open('./model.p', 'rb'))
model = model_dict['model']

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(static_image_mode=False, min_detection_confidence=0.5)

cap = cv2.VideoCapture(0)
labels_dict = {0: 'A', 1: 'B', 2: 'C', 3: 'D'}

while True:
    ret, frame = cap.read()
    H, W, _ = frame.shape
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    results = hands.process(frame_rgb)
    
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            data_aux = []
            x_ = [lm.x for lm in hand_landmarks.landmark]
            y_ = [lm.y for lm in hand_landmarks.landmark]
            
            for lm in hand_landmarks.landmark:
                data_aux.append(lm.x - min(x_)) # Normalized X
                data_aux.append(lm.y - min(y_)) # Normalized Y

            prediction = model.predict([np.asarray(data_aux)])
            predicted_character = labels_dict[int(prediction[0])]
            
            # Draw bounding box & predicted label
            cv2.rectangle(frame, (min(x_), min(y_)), (max(x_), max(y_)), (232, 163, 61), 2)
            cv2.putText(frame, predicted_character, (min(x_), min(y_) - 10), 
                        cv2.FONT_HERSHEY_SIMPLEX, 1.3, (62, 207, 142), 3)

    cv2.imshow('SLTC Inference', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'): break`

function SLTCPipelineDiagram() {
  const steps = [
    { step: '01', title: 'WEBCAM STREAM',      desc: 'Real-time 60FPS video capture via OpenCV VideoCapture(0)' },
    { step: '02', title: 'MEDIAPIPE DETECT',  desc: 'Extract 21 3D hand landmarks per frame (42 raw x,y points)' },
    { step: '03', title: 'NORMALIZATION',     desc: 'Subtract min(x), min(y) — remove scale & position bias' },
    { step: '04', title: 'RANDOM FOREST',     desc: 'Predict gesture class (A / B / C / D) via trained Scikit-Learn model' },
    { step: '05', title: 'REAL-TIME OUTPUT',  desc: 'Overlay bounding box & text string output on live feed' },
  ]

  return (
    <div className="er-wrap">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {steps.map(s => (
          <div
            key={s.step}
            style={{
              border: '1px solid var(--color-hairline)',
              background: 'var(--color-panel)',
              padding: '0.65rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--color-amber)', fontWeight: '600' }}>
              {s.step}
            </span>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-primary)', letterSpacing: '0.06em' }}>
                {s.title}
              </div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SLTCDetail() {
  const [view, setView] = useState('pipeline')
  const [showModal, setShowModal] = useState(false)
  const sectionRef = useReveal()

  const files = [
    { file: 'collect_imgs.py',       desc: 'Opens webcam, captures 400 gesture images (100 per class A/B/C/D)' },
    { file: 'create_dataset.py',     desc: 'Processes images through MediaPipe, extracts 42 features, saves to dataset.pickle' },
    { file: 'train_classifier.py',   desc: 'Trains Scikit-Learn Random Forest Classifier, evaluates accuracy, saves model.p' },
    { file: 'inference_classifier.py', desc: 'Runs live webcam inference, draws landmark bounding boxes & translated text' },
  ]

  return (
    <section className="mfscreener reveal" ref={sectionRef} aria-label="Sign Language AI Flagship">
      {/* Header & Badges */}
      <div className="mfsc-header-row">
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <div className="flagship-badge">AI / COMPUTER VISION</div>
          <div className="flagship-badge" style={{ borderColor: 'var(--color-green)', color: 'var(--color-green)' }}>
            FINAL YEAR PROJECT · DSMNRU 2024
          </div>
        </div>
        {sltc.image && (
          <button
            onClick={() => setShowModal(true)}
            className="chrome-screenshot-btn"
          >
            📷 [ SCREENSHOT ↗ ]
          </button>
        )}
      </div>

      <h2 className="mfsc-title">{sltc.ticker} — {sltc.name}</h2>
      <p className="mfsc-pitch">{sltc.pitch}</p>

      {/* Description bullets */}
      <div className="mfsc-description">
        {sltc.description.map((line, i) => (
          <p key={i} className="mfsc-bullet">{line}</p>
        ))}
        <p className="mfsc-bullet">
          Problem Solved: Eliminates expensive hardware by converting sign language to text in real-time using standard webcam feeds.
        </p>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
        <a
          href={sltc.github}
          className="card-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW SOURCE ↗
        </a>
        {sltc.image && (
          <button
            onClick={() => setShowModal(true)}
            className="card-link"
            style={{ cursor: 'pointer' }}
          >
            SCREENSHOT ↗
          </button>
        )}
      </div>

      {/* ── View Toggle ── */}
      <div className="mfsc-toggle-group" role="group" aria-label="Switch SLTC view">
        <button
          className={`mfsc-toggle-btn ${view === 'pipeline' ? 'mfsc-toggle-btn--active' : ''}`}
          onClick={() => setView('pipeline')}
          aria-pressed={view === 'pipeline'}
        >
          PIPELINE VIEW
        </button>
        <button
          className={`mfsc-toggle-btn ${view === 'files' ? 'mfsc-toggle-btn--active' : ''}`}
          onClick={() => setView('files')}
          aria-pressed={view === 'files'}
        >
          FILE-BY-FILE BREAKDOWN
        </button>
      </div>

      {/* ── View 1: Pipeline View ── */}
      <div className={`mfsc-view ${view === 'pipeline' ? 'mfsc-view--active' : ''}`}>
        <SLTCPipelineDiagram />
      </div>

      {/* ── View 2: File Breakdown ── */}
      <div className={`mfsc-view ${view === 'files' ? 'mfsc-view--active' : ''}`}>
        <table className="compare-table" aria-label="SLTC File Breakdown">
          <thead>
            <tr>
              <th>FILE</th>
              <th>DESCRIPTION / TECHNICAL PURPOSE</th>
            </tr>
          </thead>
          <tbody>
            {files.map(f => (
              <tr key={f.file}>
                <td style={{ color: 'var(--color-amber)', fontFamily: 'var(--font-mono)' }}>{f.file}</td>
                <td>{f.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Two-Column Grid: Pipeline Architecture + Code Inspector ── */}
      <div className="mfsc-detail-grid">

        {/* Architecture Summary */}
        <div>
          <div className="detail-panel__label">MODEL METRICS & DATASET</div>
          <div className="system-output" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="output-field">
              <span className="output-label">DATASET SIZE</span>
              <span className="output-value">400 IMAGES</span>
            </div>
            <div className="output-field">
              <span className="output-label">CLASSES</span>
              <span className="output-value">4 (A, B, C, D)</span>
            </div>
            <div className="output-field">
              <span className="output-label">FEATURES / IMAGE</span>
              <span className="output-value">42 (21 × X,Y)</span>
            </div>
            <div className="output-field">
              <span className="output-label">CLASSIFIER</span>
              <span className="output-value">RANDOM FOREST</span>
            </div>
            <p className="output-note">
              Normalized keypoints ensure gesture recognition is invariant to hand position and distance from camera.
            </p>
          </div>
        </div>

        {/* Python Code Inspector */}
        <div>
          <div className="detail-panel__label">PYTHON INFERENCE CODE INSPECTOR</div>
          <div className="payload-inspector">
            <div className="payload-header">
              <span className="payload-title">inference_classifier.py</span>
              <span className="payload-badge">OPENCV + MEDIAPIPE</span>
            </div>
            <div className="payload-body">
              <pre className="json-block" style={{ fontSize: '0.68rem', lineHeight: '1.5' }}>
                {sltcCodeSnippet}
              </pre>
            </div>
          </div>
        </div>

      </div>

      {/* ── Screenshot Full View Modal ── */}
      {showModal && sltc.image && (
        <div className="screenshot-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="screenshot-modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">{sltc.ticker} — {sltc.name} PREVIEW</span>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>[ CLOSE ✕ ]</button>
            </div>
            <img src={sltc.image} alt={`${sltc.name} full resolution preview`} className="modal-full-img" />
          </div>
        </div>
      )}
    </section>
  )
}

export default SLTCDetail
