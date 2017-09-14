import React, {Component} from 'react';
import './App.css';
import logo from './logo.png';

const styles = {
    input : {
        "width" : "80%",
        "height": "30px",
        "marginTop" : "15px",
        "fontSize" : "20px",
        "color" : "red"
    },

    message : {
        "width" : "80%",
        "height": "100px",
        "marginTop" : "15px",
        "fontSize" : "20px",
        "color" : "blue"
    },

    button1 : {
        "width" : "80%",
        "height": "40px",
        "fontSize" : "30px",
        "color" : "white",
        "background" : "blue",
        "marginBottom" : "20px"
    },

    button2 : {
        "width" : "80%",
        "height": "40px",
        "fontSize" : "30px",
        "color" : "white",
        "background" : "red",
        "marginBottom" : "20px"
    },

    button3 : {
        "width" : "80%",
        "height": "40px",
        "fontSize" : "30px",
        "color" : "white",
        "background" : "green",
        "marginBottom" : "20px"
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            senderEmail : null,
            passkey : null,
            receiverEmail : null,
            plainMessage : null,
            secretMessage : null,
            key : null
        };

        this.handleChange = this.handleChange.bind(this);
        this.generateKey = this.generateKey.bind(this);
    };

    handleChange(event) {
        var change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    generateKey() {
        if(this.state.senderEmail === null || this.state.senderEmail.length < 6)
            alert("Enter Your Email");
        else if (this.state.passkey === null || this.state.passkey.length !== 8)
            alert("Enter Password");
        else if (this.state.receiverEmail == null || this.state.receiverEmail.length < 6)
            alert("Enter Recipient Email");
        else
            alert("Please note down following private key: " + 12345678)
    }

    render() {
        return (
            <div className="Body">
                <div className="App">
                    <div className="App-header">
                        <img src = {logo} alt = "keryx" width = "80px" height = "80px"/>
                        Keryx: Open Source Secret Messaging System
                    </div>
                </div>
                <div className="App">
                    <div className="panel">
                        <input placeholder="Your Gmail ID" type = "email" name = "senderEmail" value = {this.state.senderEmail} onChange={this.handleChange.bind(this)} style = {styles.input}/>
                        <br/>
                        <input placeholder="Gmail Password / Private Key" type = "password" name = "passkey" value = {this.state.passkey} onChange={this.handleChange.bind(this)} style = {styles.input}/>
                        <br/>
                        <input placeholder="Receiver's eMail" type = "email" name = "receiverEmail" value = {this.state.receiverEmail} onChange={this.handleChange.bind(this)} style = {styles.input}/>
                        <hr/>

                        <textarea placeholder="Enter Normal/Plain Message" type = "textbox" name = "plainMessage" value = {this.state.plainMessage} onChange={this.handleChange.bind(this)} style = {styles.message}/>
                        <br/>
                        <textarea placeholder="Enter Secret Message" type = "textbox" name = "secretMessage" value = {this.state.secretMessage} onChange={this.handleChange.bind(this)} style = {styles.message}/>
                        <hr/>

                        Key Image / Audio File
                        <br/>
                        <input type = "file" name = "upload" style = {styles.input}/>
                        <hr/>

                        <input type = "button" style = {styles.button1} value = "🔑 Generate Key 🔒" onClick={()=>this.generateKey()}/>
                        <br/>
                        <input type = "button" style = {styles.button2} value = "📧 Send Message "/>
                        <br/>
                        <input type = "button" style = {styles.button3} value = "🔓 Decrypt"/>
                        <br/>
                    </div>
                </div>
                < div className="App-footer">
                    Website developed by HMS Pvt. Ltd. (CSE - 18)
                    < br />
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