import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import logo from './logo.png';
import {getUrl} from "./constant";

const styles = {
    input: {
        "width": "80%",
        "height": "30px",
        "marginTop": "15px",
        "fontSize": "20px",
        "color": "red"
    },

    message: {
        "width": "80%",
        "height": "100px",
        "marginTop": "15px",
        "fontSize": "20px",
        "color": "blue"
    },

    button1: {
        "width": "80%",
        "height": "40px",
        "fontSize": "30px",
        "color": "white",
        "background": "blue",
        "marginBottom": "20px",
        "marginTop": "20px"
    },

    button2: {
        "width": "80%",
        "height": "40px",
        "fontSize": "30px",
        "color": "white",
        "background": "red",
        "marginBottom": "20px",
        "marginTop": "20px"
    },

    button3: {
        "width": "80%",
        "height": "40px",
        "fontSize": "30px",
        "color": "white",
        "background": "green",
        "marginBottom": "20px",
        "marginTop": "20px"
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.url = getUrl();
        this.state = {
            filePublicKey: new FormData(),
            filePrivateKey: new FormData(),
            fileInformation: new FormData(),
            fileAudio: new FormData(),
            fileTypePublicKey: null,
            fileTypePrivateKey: null,
            fileTypeInformation: null,
            fileTypeAudio: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUploadPublicKeyFile = this.handleUploadPublicKeyFile.bind(this);
        this.handleUploadPrivateKeyFile = this.handleUploadPrivateKeyFile.bind(this);
        this.handleUploadInformationFile = this.handleUploadInformationFile.bind(this);
        this.handleUploadAudioFile = this.handleUploadAudioFile.bind(this);
        this.getAudio = this.getAudio.bind(this);
        this.decryptMessage = this.decryptMessage.bind(this);
    };

    handleUploadPublicKeyFile(event) {
        if (event.target.files[0].type.length === 0) {
            (this.state.filePublicKey).append('file', event.target.files[0]);
            (this.state.filePublicKey).append('name', 'uploadPublicKey');
            this.setState({fileTypePublicKey: event.target.files[0].type});
        }
        else
            alert("Invalid file extension for key file!");

    }

    handleUploadPrivateKeyFile(event) {
        if (event.target.files[0].type.length === 0) {
            (this.state.filePrivateKey).append('file', event.target.files[0]);
            (this.state.filePrivateKey).append('name', 'uploadPrivateKey');
            this.setState({fileTypePrivateKey: event.target.files[0].type});
        }
        else
            alert("Invalid file extension for key file!");

    }

    handleUploadInformationFile(event) {
        if (event.target.files[0].type === 'image/jpeg'
            || event.target.files[0].type === 'image/jpg') {
            (this.state.fileInformation).append('file', event.target.files[0]);
            (this.state.fileInformation).append('name', 'uploadInformation');
            this.setState({fileTypeInformation: event.target.files[0].type});
        }
        else
            alert("Select only JPG file!");

    }

    handleUploadAudioFile(event) {
        if (event.target.files[0].type === 'audio/x-wav'
            || event.target.files[0].type === 'audio/wav') {
            (this.state.fileAudio).append('file', event.target.files[0]);
            (this.state.fileAudio).append('name', 'uploadAudio');
            this.setState({fileTypeAudio: event.target.files[0].type});
        }
        else
            alert("Select only WAV file!");

    }

    handleChange(event) {
        var change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    getAudio() {
        if (this.state.fileTypeInformation !== "image/jpeg" && this.state.fileTypeInformation !== "image/jpg")
            alert("Please upload 'Information Image (jpg)' file");
        else if (this.state.fileTypePublicKey.length !== 0)
            alert("Please upload Public Key file");
        else {
            alert("The encryption will take around 1-2 minutes, based on network speed and size of information.");
            let keyUrl = this.url + "keryx/uploadPublicKey?";
            let contentUrl = this.url + "keryx/uploadInformation?";
            axios.post(keyUrl, this.state.filePublicKey).then((response) => {
                alert(response.data);
            });
            axios.post(contentUrl, this.state.fileInformation).then((response) => {
                alert(response.data);
            });
            alert("Download the audio from the following URL: " + this.url + "keryx/downloadAudio");
        }
    }

    decryptMessage() {
        if (this.state.fileTypeAudio !== "audio/wav" && this.state.fileTypeAudio !== "audio/x-wav")
            alert("Please upload 'Audio Wave (wav)' file");
        else if (this.state.fileTypePrivateKey.length !== 0) {
            alert("Enter Valid Private Key");
            return false;
        } else {
            alert("The decryption will take around 1-2 minutes, based on network speed and size of information.");
            let keyUrl = this.url + "keryx/uploadPrivateKey?";
            let audioUrl = this.url + "keryx/uploadAudioFile?";
            axios.post(keyUrl, this.state.filePrivateKey).then((response) => {
                alert(response.data);
            });
            axios.post(audioUrl, this.state.fileAudio).then((response) => {
                alert(response.data);
            });
            alert("Download the Image from the following URL: " + this.url + "keryx/downloadImage");
        }
    }

    render() {
        return (
            <div className="Body">
                <div className="App">
                    <div className="App-header">
                        <img src={logo} alt="keryx" width="80px" height="80px"/>
                        Keryx: Open Source Secret Messaging System
                    </div>
                </div>
                <div className="App">
                    <div className="panel">
                        <hr/>
                        <a href={this.url+"keryx/downloadKey"}>
                            <input type="button" style={styles.button1} value="🔑 Generate Key 🔒"/>
                        </a>
                        <br/><hr/>
                        Information Image (JPG File)
                        <br/>
                        <input type="file" name="uploadInformation" onChange={this.handleUploadInformationFile} style={styles.input}/>
                        <br/>
                        Public Key
                        <br/>
                        <input type="file" name="uploadPublicKey" onChange={this.handleUploadPublicKeyFile} style={styles.input}/>
                        <br/>
                        <input type="button" style={styles.button2} value="🔊 Download Audio "
                               onClick={() => this.getAudio()}/>
                        <br/>
                        <hr/>
                        Audio Wave (WAV File)
                        <br/>
                        <input type="file" name="uploadAudio" onChange={this.handleUploadAudioFile} style={styles.input}/>
                        <br/>
                        Private Key
                        <br/>
                        <input type="file" name="uploadPrivateKey" onChange={this.handleUploadPrivateKeyFile} style={styles.input}/>
                        <br/>
                        <input type="button" style={styles.button3} value="🔓 Decrypt"
                               onClick={() => this.decryptMessage()}/>
                        <br/>
                        <hr/>
                    </div>
                </div>
                < div className="App-footer">
                    Website developed by HMS Pvt. Ltd. (CSE - 18)
                    < br/>
                    < a href="mailto:keryx.messenger@gmail.com?Subject=Hey%20there!%20Nice%20Application!">
                        <font color="000090"> Want to reach out to us ? keryx.messenger@gmail.com </font>
                    </a>
                    <br/>
                    <br/>
                    <strong>
                        © 2017 HMS Keryx Systems Pvt. Ltd.
                    </strong>
                </div>
            </div>
        );
    }
}

export default App;