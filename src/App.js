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
        "marginBottom": "20px"
    },

    button2: {
        "width": "80%",
        "height": "40px",
        "fontSize": "30px",
        "color": "white",
        "background": "red",
        "marginBottom": "20px"
    },

    button3: {
        "width": "80%",
        "height": "40px",
        "fontSize": "30px",
        "color": "white",
        "background": "green",
        "marginBottom": "20px"
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.url = getUrl();
        this.state = {
            senderEmail: null,
            passkey: null,
            receiverEmail: null,
            plainMessage: null,
            secretMessage: null,
            file: new FormData(),
            fileType: null,
            key: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUploadFile = this.handleUploadFile.bind(this);
        this.generateKey = this.generateKey.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.decryptMessage = this.decryptMessage.bind(this);
        this.mailVerification = this.mailVerification.bind(this);
    };

    handleUploadFile(event) {
        console.log(event.target.files[0].type)
        if (event.target.files[0].type === 'image/jpeg'
            || event.target.files[0].type === 'image/jpg'
            || event.target.files[0].type === 'audio/x-wav'
            || event.target.files[0].type === 'audio/wav') {
            (this.state.file).append('file', event.target.files[0]);
            (this.state.file).append('name', 'upload');
            this.setState({fileType: event.target.files[0].type})
        }
        else
            alert("Select only JPG/ WAV file!");

    }

    handleChange(event) {
        var change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    mailVerification() {
        if (this.state.senderEmail === null || this.state.senderEmail.length < 8) {
            alert("Enter Your Valid Email");
            return false;
        }
        if (this.state.passkey === null || this.state.passkey.length < 8) {
            alert("Enter Valid Password");
            return false;
        }
        if (this.state.receiverEmail == null || this.state.receiverEmail.length < 8) {
            alert("Enter Recipient Valid Email");
            return false;
        }
        return true;
    }

    generateKey() {
        if (this.mailVerification() === true) {
            alert("Key generation takes about 10-15 seconds. Press 'Ok' to proceed.")
            let keyUrl = this.url + "keryx/generateKey?";
            fetch(keyUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }).then(response => response.json().then(body => ({response, body})))
                .then(({response, body}) => {
                    if (!response.ok) {
                        alert("INTERNAL SERVER ERROR");
                    } else if (body.status === false) {
                        alert(body.message);
                    } else {
                        alert("Turn around and see nobody's watching you. If area is clear, press 'ok'");
                        alert("Please note down following private key: " + body.publicKey);
                    }
                });

        }
    }

    sendMessage() {
        if (this.mailVerification() === true) {
            if (this.state.fileType !== "image/jpeg" && this.state.fileType !== "image/jpg")
                alert("Please upload 'Image Key (jpg)' file");
            else {
                alert("The decryption will take around 1-2 minutes, based on network speed and size of information.");
                let keyUrl = this.url + "keryx/uploadKeyImage?"
                axios.post(keyUrl, this.state.file).then((response) => {
                    alert(response.data);
                });
                let messageUrl = this.url + "keryx/sendMessage?";
                fetch(messageUrl, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.state)
                }).then(response => response.json().then(body => ({response, body})))
                    .then(({response, body}) => {
                        if (!response.ok) {
                            alert("INTERNAL SERVER ERROR");
                        } else {
                            alert(body.message);
                        }
                    });
            }
        }

    }

    decryptMessage() {
        if (this.state.fileType !== "audio/wav" && this.state.fileType !== "audio/x-wav")
            alert("Please upload 'Audio Wave(wav)' file");
        else if (this.state.passkey === null || this.state.passkey.length < 8) {
            alert("Enter Valid Public Key");
            return false;
        } else {
            alert("The decryption will take around 1-2 minutes, based on network speed and size of information.");
            let audioUrl = this.url + "keryx/uploadAudioFile?";
            axios.post(audioUrl, this.state.file).then((response) => {
                alert(response.data);
            });
            let messageUrl = this.url + "keryx/decryptMessage?";
            fetch(messageUrl, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({passkey: this.state.passkey})
            }).then(response => response.json().then(body => ({response, body})))
                .then(({response, body}) => {
                    if (!response.ok) {
                        alert("INTERNAL SERVER ERROR");
                    } else {
                        alert(body.message);
                    }
                });
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
                        <input placeholder="Your Gmail ID" type="email" name="senderEmail"
                               value={this.state.senderEmail} onChange={this.handleChange.bind(this)}
                               style={styles.input}/>
                        <br/>
                        <input placeholder="Gmail Password / Private Key" type="password" name="passkey"
                               value={this.state.passkey} onChange={this.handleChange.bind(this)} style={styles.input}/>
                        <br/>
                        <input placeholder="Receiver's eMail" type="email" name="receiverEmail"
                               value={this.state.receiverEmail} onChange={this.handleChange.bind(this)}
                               style={styles.input}/>
                        <hr/>

                        <textarea placeholder="Enter Normal/Plain Message" type="textbox" name="plainMessage"
                                  value={this.state.plainMessage} onChange={this.handleChange.bind(this)}
                                  style={styles.message}/>
                        <br/>
                        <textarea placeholder="Enter Secret Message" type="textbox" name="secretMessage"
                                  value={this.state.secretMessage} onChange={this.handleChange.bind(this)}
                                  style={styles.message}/>
                        <hr/>

                        Key Image / Audio File
                        <br/>
                        <input type="file" name="upload" onChange={this.handleUploadFile} style={styles.input}/>
                        <hr/>

                        <input type="button" style={styles.button1} value="🔑 Generate Key 🔒"
                               onClick={() => this.generateKey()}/>
                        <br/>
                        <input type="button" style={styles.button2} value="📧 Send Message "
                               onClick={() => this.sendMessage()}/>
                        <br/>
                        <input type="button" style={styles.button3} value="🔓 Decrypt"
                               onClick={() => this.decryptMessage()}/>
                        <br/>
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