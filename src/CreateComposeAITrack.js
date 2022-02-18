import {getPortNumber, getUser} from "./utils/Common";
import React, {useState} from "react";
import axios from "axios";

function CreateComposeAITrack(props) {

    const user = getUser();

    const [error, setError] = React.useState(null);

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [desc, setDesc] = useState("");
    const [composeType, setComposeType] = useState("");
    // const [coverimage, setCoverimage] = useState(null);
    // const [track, setTrack] = useState(null);

    // const [coverURL, setCoverURL] = useState(null);
    // const [musicFileURL, setMusicFileURL] = useState(null);


    const handleCreateComposeTrack = () => {

        console.log("user " + user)
        console.log("user id " +user.ID)

        const data = new FormData();
        data.append('userID', user.ID);
        data.append('title',  title);
        data.append('artist', artist);
        data.append('desc', desc);
        data.append('compose_change_type', composeType);
        // data.append('coverimage', coverimage) //} //, { type: 'image/png' });

        const config = {headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                // 'Content-Type': `application/json; boundary=${data._boundary}`,
            },
            timeout: 100000};
        //
        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/createWithComposeAI', data, config)
            .then(response => {
                console.log("_____success_____");
                console.log(response);

                handleGoToIndex()
            }).catch(error => {
                console.log("_____error__nooooo_____");
                console.log(error)
                // setLoading(false);
                // setError(error.response.data.message);
                // log.
                // if (error.response.status === 401)
                //     setError(error.response.data.message);
                // else
                //     setError("Something went wrong. Please try again later.");
        });

    }

    const handleGoToIndex = () => {
        props.history.push('/dashboard');
    }

    return (
        <div>
            {/*<form action="http://localhost:8000/api/tracks/createWithComposeAI" method="POST"*/}
            {/*      enctype="multipart/form-data"*/}
            {/*      class="form-horizontal">*/}


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

                <div className="form-group">
                    <div className="col-md-10">
                        <label htmlFor="images" className="col-md-1 control-label">What is the change type of your
                            track? (optional)</label>
                        <br/>
                        <input type="text" name="title" className="form-control" id="title"
                               placeholder=""
                               onChange={(e) => {
                                   setComposeType(e.target.value)
                               }}/>
                        <br/>
                    </div>
                </div>

                {/*<div class="form-group">*/}
                {/*    <label for="images" class="col-md-1 control-label">Choose album cover (optional)</label>*/}
                {/*    <div class="col-md-10">*/}
                {/*        <input type="file" multiple="multiple" id="images" name="image"*/}
                {/*               onChange={(e) => {*/}
                {/*                   const coverimage = e.target.files[0]*/}
                {/*                   // setCoverimage(coverimage)*/}
                {/*                   // setCoverURL(URL.createObjectURL(coverimage))*/}
                {/*               }}/>*/}
                {/*        <p class="help-block">Please only use jpg, jpeg, and png.</p>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <br />
                {/*<br />*/}

            {/*<br />*/}
            {/*<br />*/}
            {/*<br />*/}

            {/*<img src={coverURL}/>*/}

            <input type="button" value='create compose ai track' onClick={handleCreateComposeTrack} />

            <br />
            <br />
            <input type="button" value={'tracks '} onClick={handleGoToIndex} />
            <br />
            <br />

        </div>

    );


}

export default CreateComposeAITrack;