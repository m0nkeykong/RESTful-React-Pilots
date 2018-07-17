import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import google from './Login.css'

class Login extends Component {
    constructor(props) {
        super(props)
        
        this.loginSuccess = this.loginSuccess.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
        this.navigate = this.navigate.bind(this);
    }
    
    navigate() {
        const query = ['consumer', 'producer'];
        query.map((query) => {
            console.log('Fetching Docs',query);
            let user = JSON.parse(sessionStorage.getItem('userDetails'));
            console.log('for user: ' + user.email);
            const url = `https://pilotsapp.herokuapp.com/${query}`;
            let url2 = 'https://pilotsapp.herokuapp.com/project';

            fetch(url).then((res) => {
                return res.json();
            }).then((data) => {
                console.log(data);
                data.map((doc) => {
                    if (doc.email === user.email) {
                        console.log('found a match!');
                        sessionStorage.setItem('userType', JSON.stringify(query));
                        sessionStorage.setItem('userPilotsDetails', JSON.stringify(doc));
                        fetch(url2).then((res) => {
                            return res.json();
                        }).then((data) => {
                            sessionStorage.setItem('projects', JSON.stringify(data));
                        });
                    }
                }) 
            }).then(() => {
                    console.log(JSON.parse(sessionStorage.getItem('userType')));
                    (JSON.parse(sessionStorage.getItem('userType')) === 'consumer') ? this.props.history.push('/ConsumerHome') : (JSON.parse(sessionStorage.getItem('userType')) === 'producer') ? this.props.history.push('/ProducerHome') : this.props.history.push('/register')
            })
        });
    }

    loginSuccess() {
        console.log("123456");
        sessionStorage.setItem('userDetails', JSON.stringify(this.state.userDetails.profileObj));
        console.log("SFADSFASFSAGSDGDFGSDFGDSFGSDGDSHGFXHFDGHDSFFGDSG");
        this.navigate();
    }

    responseGoogle(response) {
        !response ? console.log('Failed to connect') : this.setState({ userDetails: response });
        !this.state.userDetails ? null : this.loginSuccess();
    }

    render() {
        return (
            <div >
                <div style={{backgroundImage: `url(./images/logo.JPG)`, backgroundSize: 'cover', margin: '0 auto', width: '250px', height: '250px', marginTop: '130px'}}>
                </div><p style={{marginTop: '50px'}}></p>
                    <div className="d-flex justify-content-center">
                    <GoogleLogin style={{backgroundColor: "#DD4B39"}}
                            clientId={'27160300776-vrr4hvulicl4e83njgaj6dhbgpbrs3to.apps.googleusercontent.com'}
                            buttonText="GOOGLE ME"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}>
                        <button className="loginBtn loginBtn--google">
                            Login with Google
                        </button>
                    </GoogleLogin>
                    </div>
            </div>
        )
    }
}

export default Login;
