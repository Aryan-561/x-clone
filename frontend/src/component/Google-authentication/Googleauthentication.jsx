import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const GoogleAuthentication = () => {

    const handleGoogleSuccess = async (googleResponse) => {
        console.log("hello")
        try {
            const { credential } =  googleResponse;
            console.log("Google Credential JWT:", credential);

            // Decode the JWT (optional, for logging or local user info)
            const decoded =  jwtDecode(credential);
            console.log("Decoded User Info:", decoded);

            // Send credential to your backend for verification and login
            const response = await axios.post(
                'http://localhost:4444/api/v1/users/google-login',
                { credential },
                { withCredentials: true }
            );
            console.log("response", response.data.data)

        } catch (err) {
            console.error("Google login failed:", err);
        }
    };

    const handleGoogleError = () => {
        console.error("Google login error");
    };

    return (
        <div className=' w-full px-10'>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
            />
        </div>
    );
};

export default GoogleAuthentication;
