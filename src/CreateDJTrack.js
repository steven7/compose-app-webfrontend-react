import React, {useState} from 'react';
import {getPortNumber, getUser, removeUserSession, setUserSession} from './utils/Common';
import axios from "axios";

function CreateDJTrack(props) {

    const user = getUser();

    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    // handle button click of create with compose ai
    const handleCreateMusicWithComposeAI = () => {
        setError(null);
        setLoading(true);
        const data = new FormData();
        data.append('userID', user.ID);
        data.append('composeType', 'jazz');
        data.append('composeEpochs', 1);
        axios.get('http://localhost:' + getPortNumber() + '/tracks/createWithComposeAI', data).then(response => {
            console.log(response)
            setLoading(false);
            if (response.data.success === false) {
                if (response.data.title === "ErrCredentials") {
                    setError("Invalid credentials");
                }
                else {
                    setError("Something went wrong. Please try again later.");
                }
            }
            else {
                setUserSession(response.data.token, response.data.user);
                // props.history.push('/dashboard');
            }
        }).catch(error => {
            console.log(error)
            setLoading(false);
            setError("Something went wrong. Please try again later.");
        });
    }

    const handleGoToIndex = () => {
        props.history.push('/dashboard');
    }


    return (
        <div>
            <h1>compose</h1>
            <input type="button" value={'create with compose ai'} onClick={handleCreateMusicWithComposeAI}  /><br />
            {/*disabled={loading}*/}
            {/*<input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />}*/}
        </div>
    )
}

export default CreateDJTrack;