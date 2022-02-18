import React, {useState} from 'react';
import {getPortNumber, getUser, removeUserSession, setUserSession} from './utils/Common';
import axios from "axios";


function CreateLocalTrack(props) {

    const user = getUser();

    const [error, setError] = React.useState(null);

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [desc, setDesc] = useState("");
    const [coverimage, setCoverimage] = useState(null);
    const [track, setTrack] = useState(null);

    const [coverURL, setCoverURL] = useState(null);
    const [musicFileURL, setMusicFileURL] = useState(null);
    // var coverURL = ""
    // var musicFileURL = ""

    const handleCreateTrack = () => {

        const user = getUser()
        console.log("user")
        console.log(user)
        console.log(user.ID)

        const data = new FormData();
        data.append('userID', user.ID);
        data.append('title', title);
        data.append('artist', artist);
        data.append('desc', desc);
        data.append('musicfile',  track)
        data.append('coverimage', coverimage)

        const config = {headers: {
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
        timeout: 30000};

        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/createlocal', data, config)
            .then(response => {
                console.log(response);

                props.history.push('/dashboard');

            }).catch(error => {
                console.log(error)
        });

    }

    const handleGoToIndex = () => {
        props.history.push('/dashboard');
    }

    return (
        <div>
            <form action="http://localhost:8000/api/tracks/createlocal" method="POST"
                  enctype="multipart/form-data"
                  class="form-horizontal">


                <div class="form-group">
                    <div class="col-md-10">
                        <label htmlFor="images" className="col-md-1 control-label">What is the title of your track?</label>
                        <br/>
                        <input type="text" name="title" class="form-control" id="title"
                               placeholder=""
                               onChange={(e) => { setTitle(e.target.value )}}/>
                        <br/>
                    </div>
                </div>

                <br />

                <div className="form-group">
                    <div className="col-md-10">
                        <label htmlFor="images" className="col-md-1 control-label">What is the artist of your
                            track? (optional)</label>
                        <br/>
                        <input type="text" name="title" className="form-control" id="title"
                               placeholder=""
                               onChange={(e) => {
                                   setArtist(e.target.value)
                               }}/>
                        <br/>
                    </div>
                </div>

                <br />

                <div className="form-group">
                    <div className="col-md-10">
                        <label htmlFor="images" className="col-md-1 control-label">What is the description of your
                            track? (optional)</label>
                        <br/>
                        <input type="text" name="title" className="form-control" id="title"
                               placeholder=""
                               onChange={(e) => {
                                   setDesc(e.target.value)
                               }}/>
                        <br/>
                    </div>
                </div>

                <br />

                <div class="form-group">
                    <label for="images" class="col-md-1 control-label">Choose album cover (optional)</label>
                    <div class="col-md-10">
                        <input type="file" multiple="multiple" id="images" name="image"
                               onChange={(e) => {
                                   const coverimage = e.target.files[0]
                                   setCoverimage(coverimage)
                                   setCoverURL(URL.createObjectURL(coverimage))
                               }}/>
                            <p class="help-block">Please only use jpg, jpeg, and png.</p>
                    </div>
                </div>

                <br />
                <br />

                <div className="form-group">
                    <label htmlFor="images" className="col-md-1 control-label">Choose song from computer</label>
                    <br/>
                    <div className="col-md-10">
                        <input type="file" multiple="multiple" id="musicf" name="music"
                               onChange={(e) => {
                                   const musicFile = e.target.files[0]
                                   setTrack(musicFile)
                                   // musicFileURL = URL.createObjectURL(musicFile)
                                   setMusicFileURL(URL.createObjectURL(musicFile))
                               }}/>
                        <p className="help-block">Please only use music files.</p>
                    </div>
                </div>

            </form>

            <br />
            <br />
            <br />

            <img src={coverURL}/>

            <br />
            <br />
            <br />


            <audio controls>
                <source src={musicFileURL} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>


            <br />
            <br />
            <br />
            <br />

            <input type="button" value='create local track' onClick={handleCreateTrack} />

            <br />
            <br />
            <input type="button" value={'tracks '} onClick={handleGoToIndex} />
            <br />
            <br />

        </div>

    );


}

export default CreateLocalTrack;