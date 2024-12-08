import React, { useState } from 'react';
import { API } from '../constant/constant';
import { useLoading } from './LoadingContext';
import { useNavigate } from 'react-router-dom';

const OTP_Login = () => {
    const [mobile, setmobile] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const {setLoading}= useLoading();
    const navigate=useNavigate();
    // Function to send OTP
    const handleSendOtp = async () => {
        if (!mobile || mobile.length !== 10) {
            setErrorMessage('Please enter a valid 10-digit mobile number');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API}/user/otpSend`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile }),
            });
            const data =await response.json();
            
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
        }finally{
            setLoading(false);
        }
    };

    // Function to verify OTP
    const handleVerifyOtp = async () => {
        if (!otp || otp.length !== 6) {
            setErrorMessage('Please enter a valid 6-digit OTP');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`${API}/user/otpVerify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mobile, otp }),
            });
            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('OTP verified successfully. Redirecting...');
                setErrorMessage('');
                navigate("/applicant");
                // Add your redirection logic here, e.g., navigate to another page
            } else {
                setErrorMessage(data.message || 'Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setErrorMessage('Something went wrong. Please try again later.');
        }finally{
            setLoading(false);
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
                    <label htmlFor="mobile" className="form-label">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                        className="form-control"
                        id="mobile"
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
