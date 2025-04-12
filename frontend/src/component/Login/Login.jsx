import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, getCurrentUser, search, jwtRefreshToken,logoutUser } from '../../features';
function Login() {
    const dispatch = useDispatch();
    const login = useSelector((state) => state.user);
    const { loading, success, error } = useSelector((state) => state.user);
    // console.log("login",login)
    const handleLogin = () => {
        dispatch(loginUser({
            username: "arnav",
            password: "arnav"
        }));
    };
    const handleGetUser = () => {
        dispatch(getCurrentUser());
    };
    const handleSearch = () => {
        dispatch(search("arnav"));
    };
    const handlejwt = () => {
        dispatch(jwtRefreshToken());
    };
    const handleLogout = () => {
        dispatch(logoutUser());
    };


    return (
        <div className='flex flex-col gap-8'>
            <button className="text-2xl bg-amber-400/15 rounded-2xl px-4" onClick={handleLogin} type="button">Login</button>
            <button className="text-2xl bg-amber-400/15 rounded-2xl px-4" onClick={handleGetUser} type="button">cuurent user</button>
            <button className="text-2xl bg-amber-400/15 rounded-2xl px-4" onClick={handleSearch} type="button">search</button>
            <button className="text-2xl bg-amber-400/15 rounded-2xl px-4" onClick={handlejwt} type="button">refreshtoken</button>
            <button className="text-2xl bg-amber-400/15 rounded-2xl px-4" onClick={handleLogout} type="button">logout</button>

            {loading && <p>Logging in...</p>}
            {success && <p>Login successful! 🎉</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        </div>
    );
}


export default Login