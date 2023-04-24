import { useState, useEffect } from 'react';
import './toast.css'

const ToastMessage = ({ message }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  }, []);

  return (
    <div className={`toast ${showToast ? 'show' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default ToastMessage;
