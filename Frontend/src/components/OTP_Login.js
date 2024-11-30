import React, { useState } from 'react';
import { API } from '../constant/constant';

const OTP_Login = () => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Function to send OTP
    const handleSendOtp = async () => {
        if (!mobileNumber || mobileNumber.length !== 10) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            return;
        }

        try {
            const response = await fetch(`${API}/send-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber }),
            });
            const data = await response.json();

            if (response.ok) {
                setIsOtpSent(true);
                setSuccessMessage('OTP sent successfully. Please check your mobile.');
                setErrorMessage('');
            } else {
                setErrorMessage(data.message || 'Failed to send OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        }
    };

    // Function to verify OTP
    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            setErrorMessage('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            const response = await fetch(`${API}/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobileNumber, otp }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('OTP verified successfully. Redirecting...');
                setErrorMessage('');
                // Add your redirection logic here, e.g., navigate to another page
            } else {
                setErrorMessage(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h2 className="text-center mb-4">Login with OTP</h2>
                {successMessage && (
                    <div className="alert alert-success text-center">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="alert alert-danger text-center">{errorMessage}</div>
                )}
                <div className="mb-3">
                    <label htmlFor="mobileNumber" className="form-label">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="form-control"
                        id="mobileNumber"
                        placeholder="Enter your mobile number"
                        disabled={isOtpSent}
                    />
                </div>
                {isOtpSent && (
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">
                            OTP
                        </label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className="form-control"
                            id="otp"
                            placeholder="Enter OTP"
                        />
                    </div>
                )}
                {!isOtpSent ? (
                    <button className="btn btn-primary w-100" onClick={handleSendOtp}>
                        Send OTP
                    </button>
                ) : (
                    <button className="btn btn-success w-100" onClick={handleVerifyOtp}>
                        Verify OTP
                    </button>
                )}
            </div>
        </div>
    );
};

export default OTP_Login;
