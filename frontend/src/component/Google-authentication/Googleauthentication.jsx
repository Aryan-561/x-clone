import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Googleauthentication } from '../../features';

const GoogleAuthentication = () => {
    const dispatch = useDispatch();

    const handleGoogleSuccess = async (googleResponse) => {
        try {
            const { credential } = googleResponse;
            if (!credential) {
                console.error("No Google credential received.");
                return;
            }

            console.log("Google Credential JWT:", credential);

            const decoded = jwtDecode(credential);
            console.log("Decoded User Info:", decoded);

            dispatch(Googleauthentication(credential));
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
