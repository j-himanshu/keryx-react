import React, {Component} from 'react';
import './App.css';
import logo from './logo.png';

const styles = {
    input : {
        "width" : "400px",
        "height": "30px",
        "marginTop" : "15px",
        "fontSize" : "30px"
    },

    message : {
        "width" : "400px",
        "height": "100px",
        "marginTop" : "15px",
        "fontSize" : "20px"
    },

    button : {
        "width" : "400px",
        "height": "40px",
        "fontSize" : "30px",
        "color" : "white",
        "background" : "blue",
        "marginBottom" : "20px"
    }
};

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            senderEmail : null,
            senderPassword : null,
            receiverEmail : null,
            plainMessage : null,
            secretMessage : null
        };

        this.handleChange = this.handleChange.bind(this);
    };

    handleChange(event) {
        var change = {};
        change[event.target.name] = event.target.value;
        this.setState(change);
    }

    render() {
        return (
            <div>
                <div className="App">
                    <div className="App-header">
                        <img src = {logo} alt = "keryx" width = "80px" height = "80px"/>
                        Keryx: Open Source Secret Messaging System
                    </div>
                </div>
                <div className="App">
                    <div className="panel">
                        <input placeholder="Your eMail" type = "email" name = "senderEmail" value = {this.state.senderEmail} onChange={this.handleChange.bind(this)} style = {styles.input}/>
                        <br/>
                        <input placeholder="Your Password" type = "password" name = "senderPassword" value = {this.state.senderPassword} onChange={this.handleChange.bind(this)} style = {styles.input}/>
                        <br/>
                        <input placeholder="Receiver's eMail" type = "email" name = "receiverEmail" value = {this.state.receiverEmail} onChange={this.handleChange.bind(this)} style = {styles.input}/>
                        <hr/>

                        <textarea placeholder="Enter Normal/Plain Message" type = "textbox" name = "plainMessage" value = {this.state.plainMessage} onChange={this.handleChange.bind(this)} style = {styles.message}/>
                        <br/>
                        <textarea placeholder="Enter Secret Message" type = "textbox" name = "secretMessage" value = {this.state.secretMessage} onChange={this.handleChange.bind(this)} style = {styles.message}/>
                        <hr/>

                        KEY / AudioFile
                        <br/>
                        <input type = "file" name = "upload" style = {styles.input}/>
                        <hr/>

                        <input type = "button" style = {styles.button} value = "Send Key"/>
                        <br/>
                        <input type = "button" style = {styles.button} value = "Send Message"/>
                        <br/>
                        <input type = "button" style = {styles.button} value = "Decrypt"/>
                        <br/>
                    </div>
                </div>
                < div className="App-footer">
                    Website developed by HMS Pvt. Ltd. (CSE - 18)
                    < br />
                    < a href="mailto:keryx.messenger@gmail.com?Subject=Hey%20there!%20Nice%20Application!">
                        <font color="FF0000"> Want to reach out to us ? keryx.messenger@gmail.com </font>
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