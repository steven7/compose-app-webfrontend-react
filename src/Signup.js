import React, { useState } from 'react';
import axios from 'axios';
import {getPortNumber, setUserSession} from './utils/Common';

function Signup(props) {

    const username = useFormInput('');
    const password = useFormInput('');
    const confirmpassword = useFormInput('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // handle button click of login form
    const handleSignup = () => {
        setError(null);
        setLoading(true);
        axios.post('http://localhost:' + getPortNumber() + '/api/auth/signup', { name: "lol", email: username.value, password: password.value }).then(response => {
            console.log(response)
            setLoading(false);
            setUserSession(response.data.token, response.data.user);
            props.history.push('/login');
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

    return (
        <div>
            Signup<br /><br />
            <div>
                Email<br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Confirm Password<br />
                <input type="password" {...confirmpassword} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Signup'} onClick={handleSignup} disabled={loading} /><br />
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

export default Signup;