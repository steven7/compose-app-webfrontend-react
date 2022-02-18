import React, { useState } from 'react';
import axios from 'axios';
import {getPortNumber, setUserSession} from './utils/Common';

function Login(props) {

    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // handle button click of login form
    const handleLogin = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:' + getPortNumber() + '/api/auth/login', { name: "lol", email: username.value, password: password.value }).then(response => {
            console.log(response)
            setLoading(false);
            if (response.data.success === false) {
                if (response.data.title === "ErrCredentials") {
                    setError("Invalid credentials");
                }
                else if (response.data.title === "ErrPassword") {
                    setError("Incorrect password provided");
                }
                else {
                    setError("Something went wrong. Please try again later.");
                }
            }
            else {
                setUserSession(response.data.token, response.data.user);
                props.history.push('/dashboard');
            }


        }).catch(error => {
            console.log(error)
            setLoading(false);
            // setError(error.response.data.message);
            // log.
            // if (error.response.status === 401) setError(error.response.data.message);
            // else
            setError("Something went wrong. Please try again later.");
        });
    }

    const handleSignup = () => {
        props.history.push('/signup');
        // return <Redirect to='/dashboard' />
    }

    return (
        <div>
            Login<br /><br />
            <div>
                Email<br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
            <br/>
            <label>Do not have an account? </label><input type="button" value='Sign up here!' onClick={handleSignup} />
        </div>
    );
}


const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;