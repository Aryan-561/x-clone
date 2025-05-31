import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Googleauthentication } from '../../features';
import { useNavigate } from 'react-router-dom';
const GoogleAuthentication = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleGoogleSuccess = async (googleResponse) => {
        try {
            const { credential } = googleResponse;
            if (!credential) {
                console.error("No Google credential received.");
                return;
            }
// console.log("Google Credential JWT:", credential)
            const decoded = jwtDecode(credential);
// console.log("Decoded User Info:", decoded)
// console.log("Decoded User Info:", decoded)
            await Promise.resolve(dispatch(Googleauthentication(credential)));
            navigate("/home")
            
        } catch (err) {
            console.error("Google login failed:", err);
        }
    };

    const handleGoogleError = () => {
        console.error("Google login error");
    };

    return (
        <div className="w-full px-10">
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
        </div>
    );
};

export default GoogleAuthentication;
