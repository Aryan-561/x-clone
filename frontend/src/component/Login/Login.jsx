import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../features';
function Login() {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.userReducer);
    const {loading,success,error } = useSelector((state) => state.userReducer);
    console.log("login",login)
    const handleLogin = () => {
        dispatch(loginUser({
            // username: "arnav",
            // password: "arsnav"
        }));
    };

    return (
        <div>
            <button onClick={handleLogin} type="button">Login</button>

            {loading && <p>Logging in...</p>}
            {success && <p>Login successful! 🎉</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
}


export default Login