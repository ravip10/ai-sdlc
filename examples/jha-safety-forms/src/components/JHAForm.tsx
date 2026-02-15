import React, { useState } from 'react';
import './JHAForm.css';

interface HazardRow {
  id: string;
  step: string;
  hazard: string;
  controlMeasure: string;
}

interface SignatureEntry {
  name: string;
  signature: string;
  date: string;
}

interface JHAFormData {
  jobDescription: string;
  location: string;
  date: string;
  crewMembers: string;
  supervisor: string;
  hazards: HazardRow[];
  ppe: {
    hardHat: boolean;
    safetyGlasses: boolean;
    hearingProtection: boolean;
    gloves: boolean;
    safetyBoots: boolean;
    hiVisVest: boolean;
    fallProtection: boolean;
    respirator: boolean;
    other: string;
  };
  signatures: SignatureEntry[];
}

const initialFormData: JHAFormData = {
  jobDescription: '',
  location: '',
  date: new Date().toISOString().split('T')[0],
  crewMembers: '',
  supervisor: '',
  hazards: [{ id: '1', step: '', hazard: '', controlMeasure: '' }],
  ppe: {
    hardHat: false,
    safetyGlasses: false,
    hearingProtection: false,
    gloves: false,
    safetyBoots: false,
    hiVisVest: false,
    fallProtection: false,
    respirator: false,
    other: '',
  },
  signatures: [{ name: '', signature: '', date: '' }],
};

export function JHAForm() {
  const [formData, setFormData] = useState<JHAFormData>(initialFormData);

  const updateField = <K extends keyof JHAFormData>(
    field: K,
    value: JHAFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updatePPE = (field: keyof JHAFormData['ppe'], value: boolean | string) => {
    setFormData((prev) => ({
      ...prev,
      ppe: { ...prev.ppe, [field]: value },
    }));
  };

  const addHazardRow = () => {
    const newRow: HazardRow = {
      id: Date.now().toString(),
      step: '',
      hazard: '',
      controlMeasure: '',
    };
    updateField('hazards', [...formData.hazards, newRow]);
  };

  const removeHazardRow = (id: string) => {
    if (formData.hazards.length > 1) {
      updateField(
        'hazards',
        formData.hazards.filter((row) => row.id !== id)
      );
    }
  };

  const updateHazardRow = (
    id: string,
    field: keyof HazardRow,
    value: string
  ) => {
    updateField(
      'hazards',
      formData.hazards.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const addSignature = () => {
    updateField('signatures', [
      ...formData.signatures,
      { name: '', signature: '', date: '' },
    ]);
  };

  const removeSignature = (index: number) => {
    if (formData.signatures.length > 1) {
      updateField(
        'signatures',
        formData.signatures.filter((_, i) => i !== index)
      );
    }
  };

  const updateSignature = (
    index: number,
    field: keyof SignatureEntry,
    value: string
  ) => {
    updateField(
      'signatures',
      formData.signatures.map((sig, i) =>
        i === index ? { ...sig, [field]: value } : sig
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('JHA Form Data:', formData);
    // Handle form submission - send to API, save, print, etc.
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  return (
    <form className="jha-form" onSubmit={handleSubmit}>
      <header className="jha-header">
        <h1>Job Hazard Analysis (JHA)</h1>
        <p className="jha-subtitle">Complete before starting work</p>
      </header>

      {/* Job Information Section */}
      <section className="jha-section">
        <h2>Job Information</h2>
        <div className="jha-grid">
          <div className="jha-field jha-field-full">
            <label htmlFor="jobDescription">Job/Task Description *</label>
            <textarea
              id="jobDescription"
              value={formData.jobDescription}
              onChange={(e) => updateField('jobDescription', e.target.value)}
              placeholder="Describe the job or task being performed..."
              required
              rows={3}
            />
          </div>

          <div className="jha-field">
            <label htmlFor="location">Location *</label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Work site location"
              required
            />
          </div>

          <div className="jha-field">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={(e) => updateField('date', e.target.value)}
              required
            />
          </div>

          <div className="jha-field">
            <label htmlFor="crewMembers">Crew Members</label>
            <input
              type="text"
              id="crewMembers"
              value={formData.crewMembers}
              onChange={(e) => updateField('crewMembers', e.target.value)}
              placeholder="Names of crew members"
            />
          </div>

          <div className="jha-field">
            <label htmlFor="supervisor">Supervisor</label>
            <input
              type="text"
              id="supervisor"
              value={formData.supervisor}
              onChange={(e) => updateField('supervisor', e.target.value)}
              placeholder="Supervisor name"
            />
          </div>
        </div>
      </section>

      {/* Hazard Analysis Table */}
      <section className="jha-section">
        <h2>Hazard Analysis</h2>
        <p className="jha-section-description">
          Identify each step, potential hazards, and control measures
        </p>

        <table className="jha-table">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '25%' }}>Job Step</th>
              <th style={{ width: '30%' }}>Potential Hazard</th>
              <th style={{ width: '35%' }}>Control Measure</th>
              <th style={{ width: '5%' }}></th>
            </tr>
          </thead>
          <tbody>
            {formData.hazards.map((row, index) => (
              <tr key={row.id}>
                <td className="jha-row-number">{index + 1}</td>
                <td>
                  <input
                    type="text"
                    value={row.step}
                    onChange={(e) =>
                      updateHazardRow(row.id, 'step', e.target.value)
                    }
                    placeholder="Task step..."
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.hazard}
                    onChange={(e) =>
                      updateHazardRow(row.id, 'hazard', e.target.value)
                    }
                    placeholder="What could go wrong?"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.controlMeasure}
                    onChange={(e) =>
                      updateHazardRow(row.id, 'controlMeasure', e.target.value)
                    }
                    placeholder="How to prevent/mitigate?"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="jha-btn-icon jha-btn-remove"
                    onClick={() => removeHazardRow(row.id)}
                    disabled={formData.hazards.length === 1}
                    title="Remove row"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          className="jha-btn jha-btn-secondary"
          onClick={addHazardRow}
        >
          + Add Hazard Row
        </button>
      </section>

      {/* PPE Requirements */}
      <section className="jha-section">
        <h2>Required PPE</h2>
        <div className="jha-ppe-grid">
          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.hardHat}
              onChange={(e) => updatePPE('hardHat', e.target.checked)}
            />
            <span>Hard Hat</span>
          </label>

          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.safetyGlasses}
              onChange={(e) => updatePPE('safetyGlasses', e.target.checked)}
            />
            <span>Safety Glasses</span>
          </label>

          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.hearingProtection}
              onChange={(e) => updatePPE('hearingProtection', e.target.checked)}
            />
            <span>Hearing Protection</span>
          </label>

          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.gloves}
              onChange={(e) => updatePPE('gloves', e.target.checked)}
            />
            <span>Gloves</span>
          </label>

          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.safetyBoots}
              onChange={(e) => updatePPE('safetyBoots', e.target.checked)}
            />
            <span>Safety Boots</span>
          </label>

          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.hiVisVest}
              onChange={(e) => updatePPE('hiVisVest', e.target.checked)}
            />
            <span>Hi-Vis Vest</span>
          </label>

          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.fallProtection}
              onChange={(e) => updatePPE('fallProtection', e.target.checked)}
            />
            <span>Fall Protection</span>
          </label>

          <label className="jha-checkbox">
            <input
              type="checkbox"
              checked={formData.ppe.respirator}
              onChange={(e) => updatePPE('respirator', e.target.checked)}
            />
            <span>Respirator</span>
          </label>
        </div>

        <div className="jha-field" style={{ marginTop: '1rem' }}>
          <label htmlFor="ppeOther">Other PPE</label>
          <input
            type="text"
            id="ppeOther"
            value={formData.ppe.other}
            onChange={(e) => updatePPE('other', e.target.value)}
            placeholder="Specify additional PPE requirements..."
          />
        </div>
      </section>

      {/* Signatures */}
      <section className="jha-section">
        <h2>Sign-Off</h2>
        <p className="jha-section-description">
          All crew members must sign before starting work
        </p>

        <table className="jha-table jha-signature-table">
          <thead>
            <tr>
              <th>Print Name</th>
              <th>Signature</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {formData.signatures.map((sig, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={sig.name}
                    onChange={(e) =>
                      updateSignature(index, 'name', e.target.value)
                    }
                    placeholder="Full name"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={sig.signature}
                    onChange={(e) =>
                      updateSignature(index, 'signature', e.target.value)
                    }
                    placeholder="Type name as signature"
                    className="jha-signature-input"
                  />
                </td>
                <td>
                  <input
                    type="date"
                    value={sig.date}
                    onChange={(e) =>
                      updateSignature(index, 'date', e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    type="button"
                    className="jha-btn-icon jha-btn-remove"
                    onClick={() => removeSignature(index)}
                    disabled={formData.signatures.length === 1}
                    title="Remove signature"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          className="jha-btn jha-btn-secondary"
          onClick={addSignature}
        >
          + Add Signature Row
        </button>
      </section>

      {/* Form Actions */}
      <div className="jha-actions">
        <button type="button" className="jha-btn jha-btn-secondary" onClick={handleReset}>
          Reset Form
        </button>
        <button type="submit" className="jha-btn jha-btn-primary">
          Submit JHA
        </button>
      </div>
    </form>
  );
}

export default JHAForm;
