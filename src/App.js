import React, { useState } from 'react';
import FormBuilder from 'react-form-builder2';

function App() {
  const [formData, setFormData] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [previewData, setPreviewData] = useState(null);

  const handleFormChange = (newFormData) => {
    setUndoStack([...undoStack, formData]);
    setFormData(newFormData);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevFormData = undoStack.pop();
      setRedoStack([...redoStack, formData]);
      setFormData(prevFormData);
      setUndoStack([...undoStack]);
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextFormData = redoStack.pop();
      setUndoStack([...undoStack, formData]);
      setFormData(nextFormData);
      setRedoStack([...redoStack]);
    }
  };

  const handlePreview = () => {
    const previewData = { fields: formData };
    setPreviewData(previewData);
  };

  return (
    <div>
      <FormBuilder.ReactFormBuilder formData={formData} onChange={handleFormChange} />
      <button onClick={handleUndo} disabled={undoStack.length === 0}>
        Undo
      </button>
      <button onClick={handleRedo} disabled={redoStack.length === 0}>
        Redo
      </button>
      <button onClick={handlePreview}>Preview</button>
      {previewData && (
        <pre>{JSON.stringify(previewData, null, 2)}</pre>
      )}
    </div>
  );
}

export default App;
