import React, {useState} from 'react';
import axios from "axios";
import ReactPlayer from 'react-player'
import MusicIcon from "./music_icon_black.png";
import {getPortNumber} from "./utils/Common";

function PlayAudio(props) {

    const [loading, setLoading] = useState(false);
    const [coverImage, setCoverImage] = useState(null);
    const [musicFile, setMusicFile] = useState(null);

    const coverURL = coverImage && URL.createObjectURL(coverImage)
    const musicFileURL = musicFile && URL.createObjectURL(musicFile)


    //
    // var MidiPlayer = require('midi-player-js');

    // Initialize player and register event handler
    // var Player = new MidiPlayer.Player(function(event) {
    //     console.log(event);
    // });
    //
    // // Load a MIDI file
    // Player.loadFile(musicFileURL);
    // Player.play();

    React.useEffect(() => {

        const title = props.history.location.state.data.track.title
        console.log("title: " + title)

        const trackID = props.history.location.state.data.track.ID
        console.log("trackID: " + trackID)

        setLoading(true);

        const iTrackID = parseInt(trackID)
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

                setLoading(false);

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
                setLoading(false);
                // get data
                // const data = MusicIcon.url
                // turn into blob
                // const cfile = new Blob([data], {type:'image/png'})
                // setCoverImage(MusicIcon.url)

                // coverURL = URL.createObjectURL({MusicIcon}) //

                // coverURL = "./music_icon_black.png"

                // MusicIcon.url
                // setCoverImage(cfile)
                // setCoverImage({MusicIcon})
                // setError("Something went wrong. Please try again later.");

        })


        const musicOptions = {
            responseType: 'arraybuffer',
            // headers: {
            //     'Content-Type': 'audio/mpeg',
            // }
        };

        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/one/musicfile', data, musicOptions
        ).then(response => {

                setLoading(false);

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
                setLoading(false);
                // setError("Something went wrong. Please try again later.");
        })


    }, [])

    return (


        <div >
            <script type='text/javascript' src='//www.midijs.net/lib/midi.js'></script>

            <h1>Play Audio</h1>

            <br/>

            <img className="coverImageElement"
                 src={coverURL}
                 width='280px'
                 height='280px'
                 alt = {MusicIcon} />

            <br/>


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

            {/*<div>*/}
            {/*    <Player>*/}

            {/*    </Player>*/}
            {/*</div>*/}

        </div>
    )
}

export default PlayAudio;
