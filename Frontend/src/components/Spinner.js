import React from 'react';
import { useLoading } from './LoadingContext';
const Spinner = () => {
  const { loading } = useLoading();

  if (!loading) return null;

  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
