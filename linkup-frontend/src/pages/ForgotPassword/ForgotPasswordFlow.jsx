import React, { useState } from 'react';
import RequestEmail from './RequestEmail/RequestEmail';
import VerifyCode from './VerifyCode/VerifyCode';
import ResetPassword from './ResetPassword/ResetPassword';

// ...existing code...
const ForgotPasswordFlow = ({ onBackToLogin, onPasswordResetSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (userEmail) => {
    setEmail(userEmail);
    setCurrentStep(2);
  };

  const handleCodeVerified = () => {
    setCurrentStep(3);
  };

  const handlePasswordReset = () => {
    // Mostrar mensaje de éxito y volver al login
    alert('¡Contraseña cambiada exitosamente! Ahora puedes iniciar sesión con tu nueva contraseña.');
    onPasswordResetSuccess && onPasswordResetSuccess();
    onBackToLogin();
  };

  const handleBackToRequestEmail = () => {
    setCurrentStep(1);
  };

  switch (currentStep) {
    case 1:
      return (
        <RequestEmail 
          onNext={handleEmailSubmit}
          onBackToLogin={onBackToLogin}
        />
      );
    case 2:
      return (
        <VerifyCode 
          email={email}
          onNext={handleCodeVerified}
          onBack={handleBackToRequestEmail}
        />
      );
    case 3:
      return (
        <ResetPassword 
          onSuccess={handlePasswordReset}
        />
      );
    default:
      return (
        <RequestEmail 
          onNext={handleEmailSubmit}
          onBackToLogin={onBackToLogin}
        />
      );
  }
};

export default ForgotPasswordFlow;