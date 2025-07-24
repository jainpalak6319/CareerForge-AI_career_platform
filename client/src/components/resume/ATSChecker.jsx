import React, { useState } from 'react';
import { Card, ProgressBar, Form } from 'react-bootstrap';

const ATSChecker = () => {
  const [file, setFile] = useState(null);
  const [score, setScore] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (uploadedFile) => {
    setFile(uploadedFile);

    // Simulate ATS score for demo
    setTimeout(() => {
      setScore(Math.floor(Math.random() * 41) + 60); // Random score 60–100
    }, 1000);
  };

  const handleInputChange = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      handleFileUpload(uploaded);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === "application/pdf" || droppedFile.name.endsWith(".docx") || droppedFile.name.endsWith(".doc"))) {
      handleFileUpload(droppedFile);
    }
  };

  return (
    <Card className="p-4 shadow-lg rounded-4 border-0" style={{ backgroundColor: '#F5F5F5' }}>
      <h4 className="mb-3 fw-bold" style={{ color: '#2D2F4A' }}>
        📤 Check Your Resume with ATS
      </h4>
      <p className="text-secondary">
        Upload your resume or drag & drop it below to see how it performs against common ATS filters.
      </p>

      {/* 🔽 Drag and Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="mb-3 p-4 text-center border border-2 rounded-3"
        style={{
          backgroundColor: isDragging ? '#e9ecef' : '#ffffff',
          borderStyle: 'dashed',
          color: '#777',
          transition: 'background-color 0.2s ease',
          cursor: 'pointer'
        }}
      >
        {isDragging ? "📂 Drop your file here..." : "🖱️ Drag and drop your resume here"}
      </div>

      {/* 🔼 Traditional File Upload */}
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className="fw-semibold text-dark">
          Or select manually (.pdf or .docx)
        </Form.Label>
        <Form.Control
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleInputChange}
          className="rounded-3 border border-2"
          style={{ backgroundColor: '#ffffff' }}
        />
      </Form.Group>

      {file && (
        <div className="mt-4">
          <h6 className="text-success">📄 Uploaded: <strong>{file.name}</strong></h6>
        </div>
      )}

      {score && (
        <div className="mt-4">
          <h5 className="fw-semibold text-primary">
            📊 ATS Score: <strong>{score}/100</strong>
          </h5>
          <ProgressBar
            now={score}
            label={`${score}%`}
            className="mb-3 rounded-3"
            variant={score >= 75 ? 'success' : 'warning'}
          />

          <Card className="p-3 mt-3 bg-white rounded-4 shadow-sm border-0">
            <h6 className="fw-bold text-success">✅ Strengths</h6>
            <ul className="mb-3 text-dark">
              <li>Contains relevant keywords</li>
              <li>Professional formatting</li>
              <li>Includes LinkedIn and contact info</li>
            </ul>

            <h6 className="fw-bold text-danger mt-3">❌ Areas to Improve</h6>
            <ul className="text-dark">
              <li>Use more action verbs and quantifiable achievements</li>
              <li>Add a compelling professional summary</li>
              <li>Format section headings with consistency</li>
            </ul>
          </Card>
        </div>
      )}

      {!file && (
        <div className="text-muted mt-3 fst-italic">
          📝 Tip: Ensure your resume is in PDF or DOCX format for best results.
        </div>
      )}
    </Card>
  );
};

export default ATSChecker;
