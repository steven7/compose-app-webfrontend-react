import React, {useState} from 'react';
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles"
import { getPortNumber, getUser } from './utils/Common';
import { useHistory } from "react-router-dom";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction  from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Popup from "reactjs-popup";

import {
    usePopupState,
    bindTrigger,
    bindMenu,
} from 'material-ui-popup-state/hooks'

import MusicIcon from "./music_icon_black.png";

function Dashboard(props) {

    const user = getUser();

    const [tracks, setTracks] = React.useState([]);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [oneTrack, setOneTrack] = React.useState(null);
    const [oneTrackID, setOneTrackID] = React.useState(null);

    const history = useHistory();

    const ReactDOM = require('react-dom');

    const data = {
        userID: user.ID
    };

    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log("user:   " + user)
    console.log("userID: " + user.ID)
    console.log("data:   " + data)

    React.useEffect(() => {
        setLoading(true); //
        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/index', data
            ).then(response => {

                setLoading(false);
                const newTracks = response.data
                setTracks(newTracks);

            }).catch(error => {
                console.log(error)
                setLoading(false);
                setError("Something went wrong. Please try again later.");
        });
    }, []);

    const handleListItemClick = (event, oneTrack) => {
        var trackType = {
            pathname: '/playAudio',
            state: {
                data:{
                    'track':oneTrack,
                }
            }
        }
        history.push(trackType);
    };

    const handleEditTrackClick = (event, oneTrack, popupState) => {
        console.log("Item clicked with track " + oneTrack);
        console.log('tap')

        setOneTrack(oneTrack)

        const oneTrackID = oneTrack.ID;
        console.log("lol track id " + oneTrackID);

        const oneTrackTitle = oneTrack.title;
        console.log("lol track title " + oneTrackTitle);
        popupState.close()
        var trackType = {
            pathname: '/editTrack',
            state: {
                data:{
                    'track':oneTrack,
                }
            }
        }
        history.push(trackType);
    }

    const node = document.createElement("div");
    const popup = (message, {type, timeout}) => {
        document.body.appendChild(node);
        const PopupContent = () => {
            return (
                <Popup type={type} open={true} timeout={timeout}>
                    {message}
                    <button
                        onClick={clear}
                    >Close</button>
                </Popup >
            );
        };

        const clear = () => {
            ReactDOM.unmountComponentAtNode(node);
            node.remove();
        }

        ReactDOM.render(<PopupContent/>, node);
    };


    const handleDialogClickYes = () => {
        setOpen(true);
        // carryoutDeleteTrack()
        console.log('oneTrack ' + oneTrack)
        console.log('oneTrack id ' + oneTrack.ID)
    };

    const handleDialogClose = () => {
        setOpen(false);
    };

    var handleDeleteTrackClick = (event, oneTrack, popupState) => {
        popupState.close()
        // TODO:
        // setOneTrack(oneTrack)
        console.log('oneTrack ' + oneTrack)
        setOneTrack(oneTrack)
        console.log('oneTrack ' + oneTrack)
        console.log('oneTrack ID ' + oneTrack.ID)
        setOneTrack(oneTrack.ID)
        console.log('oneTrack ID ' + oneTrack.ID)
        popup("text within modal", {type: "info"});

        setOpen(true);
    }

    const handleDeleteTrackClickWithID = (event, id)  => {
        console.log('oneTrack ' + oneTrack)
        console.log('oneTrack id ' + oneTrackID)
        console.log('oneTrack id ' + id)
    }

    const carryoutDeleteTrack = (oneTrack) => {
        setLoading(true);

        const trackID = oneTrack.ID;

        const iTrackID = parseInt(trackID);
        const data = {
            trackID: iTrackID
        };

        axios.post('http://localhost:' + getPortNumber() + '/api/tracks/delete',  data
        ).then(response => {
            setLoading(false);
            refreshPage()
        }).catch(error => {
            console.log(error)
            setLoading(false);
            setError("Something went wrong. Please try again later.");
        })
    }

    const handleCreateLocal = () => {
        history.push('/createLocalTrack');
    }

    const handleCreateComposeAI = () => {
        history.push('/createComposeAITrack');
    }

    const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })

    const theme = createMuiTheme({
        shadows: ["none"]
    });

    return (
        <div>
            <h1>tracks</h1>
            <ul>
                {/*remove filter once edit is set up!*/}
                {/*.filter(track => track.title != '')*/}
                {tracks.map( (track, index) => (

                    <div
                        style={{paddingLeft: '250px',
                            paddingRight: '250px',}}
                        >
                        <ListItem
                            // button
                            key={track.id}
                            onClick={(event) => handleListItemClick(event, track)}
                            style={{paddingLeft: '20px'}}
                            theme={theme}
                            >

                            <ListItemIcon>
                                <img src={MusicIcon}
                                width={50}
                                height={50}
                                style={{paddingLeft: '0px'}}/>
                            </ListItemIcon>

                            <ListItemText

                                primary={track.title}
                                secondary={track.description}

                                style={{paddingLeft: '25px'}}
                            />

                            <ListItemSecondaryAction>
                                <IconButton
                                    variant="contained"
                                    {...bindTrigger(popupState)}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    {...bindMenu(popupState)}
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                                    // onClick = {setOneTrack(track)}
                                    elevation={1}
                                >
                                    <MenuItem onClick={(event) => handleEditTrackClick(event, track, popupState)}>Edit track</MenuItem>
                                    <MenuItem onClick={(event) => handleDeleteTrackClick(event, track, popupState)}>Delete track</MenuItem>
                                    <MenuItem onClick={(event) => handleDeleteTrackClickWithID(event, track.ID)}>two Delete track</MenuItem>
                                </Menu>
                                <Dialog
                                    open={open}
                                    onClose={handleDialogClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    elevation={1}
                                    BackdropProps={{ style: { backgroundColor: "transparent" } }} >

                                    <DialogTitle id="alert-dialog-title">
                                        {"Delete track?"}
                                    </DialogTitle>
                                    <DialogContent>
                                        <DialogContentText id="alert-dialog-description" elevation={1}>
                                            Please confirm that you want to delete this track. This cannot be undone.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDialogClickYes} autoFocus>
                                            Yes
                                        </Button>
                                        <Button onClick={handleDialogClose}>No</Button>

                                    </DialogActions>
                                </Dialog>
                            </ListItemSecondaryAction>

                        </ListItem>

                    </div>

                ))}
            </ul>

            <input type="button" value='new local track' onClick={handleCreateLocal} />
            <input type="button" value='new compose ai track' onClick={handleCreateComposeAI} />

        </div>
    );

    // handle click event of logout button
    const handleLogout = () => {
        // removeUserSession();
        props.history.push('/login');
    }

    function refreshPage() {
        window.location.reload(false);
    }


}

export default Dashboard;
