import React, {useState} from 'react';
import {getPortNumber, getUser, removeUserSession, setUserSession} from './utils/Common';
import axios from "axios";
import MusicIcon from "./music_icon_black.png";
import ReactPlayer from "react-player";


function EditTrack(props) {

    const user = getUser();

    const [error, setError] = React.useState(null);

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [desc, setDesc] = useState("");
    const [coverimage, setCoverimage] = useState(null);
    const [track, setTrack] = useState(null);


    const [coverImage, setCoverImage] = useState(null);
    const [musicFile, setMusicFile] = useState(null);

    // var coverImageElement = React.createRef();

    var coverURL = coverImage && URL.createObjectURL(coverImage)

    var musicFileURL = musicFile && URL.createObjectURL(musicFile)


    const handleUpdateTrack = () => {

        const user = getUser()
        console.log("user")
        console.log(user)
        console.log(user.ID)

        const data = new FormData();
        data.append('userID', user.ID);
        data.append('title', title);
        data.append('artist', artist);
        data.append('desc', desc);
        data.append('musicfile',  track);
        data.append('coverimage', coverimage);

        const config = {headers: {
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
            timeout: 30000};

        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/update', data, config)
            .then(response => {
                console.log(response);

                props.history.push('/dashboard');

            }).catch(error => {
            console.log(error)
            setError("Something went wrong. Please try again later.");
        });

    }

    const handleGoToIndex = () => {
        props.history.push('/dashboard');
    }

    React.useEffect(() => {

        var title = props.history.location.state.data.track.title
        console.log("title: " + title)

        var trackID = props.history.location.state.data.track.ID
        console.log("trackID: " + trackID)

        const track = props.history.location.state.data.track

        var iTrackID = parseInt(trackID)

        console.log("loading files for track " + iTrackID)

        const data = {
            trackID: iTrackID
        };

        //
        const imgOptions = {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'image/png',
                'Accept': 'image/png'
            }
        };

        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/one/coverimage',  data, imgOptions

        ).then(response => {


            // get data
            const data = response.data
            // turn into blob
            const cfile = new Blob([data], {type:'image/png'})
            // set blob with state
            setCoverImage(cfile)

        })
            .catch(error => {
                console.log("cover error")
                console.log(error)

            })


        const musicOptions = {
            responseType: 'arraybuffer',

        };

        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/one/musicfile', data, musicOptions
        ).then(response => {

            const data = response.data

            var musicFile = new Blob([data], {type:'audio/mpeg'})

            if (musicFile == null) {
                musicFile = new Blob([data], {type:'audio/midi'})
            }

            setMusicFile(musicFile)


        })
            .catch(error => {
                console.log("music error")
                console.log(error)
            })


    }, [])

    return (
        <div>
            <form action="http://localhost:8000/api/tracks/createlocal" method="POST"
                  enctype="multipart/form-data"
                  class="form-horizontal">

                <label htmlFor="images" className="col-md-5 control-label">Edit track</label>


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



                <img className="coverImageElement"
                     src={coverURL}
                     width='280px'
                     height='280px'
                     alt = {MusicIcon} />

                <br/>

                <div class="form-group">
                    <label for="images" class="col-md-1 control-label">Choose album cover (optional)</label>
                    <div class="col-md-10">
                        <input type="file" multiple="multiple" id="images" name="image"
                               onChange={(e) => { setCoverimage(e.target.files[0] )}}/>
                        <p class="help-block">Please only use jpg, jpeg, and png.</p>
                    </div>
                </div>


                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <ReactPlayer

                        url={musicFileURL}
                        className='react-player'
                        // playing
                        controls
                        width='500px'
                        height='100px'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="images" className="col-md-1 control-label">Choose song from computer</label>
                    <br/>
                    <div className="col-md-10">
                        <input type="file" multiple="multiple" id="musicf" name="music"
                               onChange={(e) => {
                                   setTrack(e.target.files[0] )
                               }}/>
                        <p className="help-block">Please only use music files.</p>
                    </div>
                </div>
            </form>

            <br />
            <br />
            <br />


            <img src={coverimage}/>

            <br />
            <br />
            <br />
            <br />


            <audio controls>
                <source src={track} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>


            <br />
            <br />
            <br />
            <br />

            <input type="button" value='create local track' onClick={handleUpdateTrack} />

            <br />
            <br />
            <input type="button" value={'tracks '} onClick={handleGoToIndex} />
            <br />
            <br />

        </div>

        // <form action="/tracks/{{.ID}}/createlocalcomplete" method="POST"
        //       className="form-horizontal">
        //     {{csrfField}}
        //     <div className="form-group">
        //         <div className="col-md-1">
        //             <button type="submit" className="btn btn-default">Create Song</button>
        //         </div>
        //     </div>
        // </form>
    );


}

export default EditTrack;