
import React from 'react';
import  './sign.less';
import ChatWatcher from '../../../msgService/ChatWatcher';

class Signin extends React.Component{

    displayName = 'app-signin';

    signin = (e) => {
        e.preventDefault();
        let BOSH_SERVICE = 'http://localhost:7070/http-bind/';
        let userName = this.refs.account.value;
        let password = this.refs.password.value;
        window.ChatWatcher.connect(BOSH_SERVICE,userName,'windows10.microdone.cn','pc0.0.1',password);
      //  console.log (`${this.refs.account.value},${this.refs.password.value}`);
    }

    /*
     *   main-card app-feature  [brand-cover + appbrand]
     *             app-container [account-input + account-pwd + error-block + submit]
     * 
     */

    renderFeature(){
        return React.createElement(
            'div',
            {className: 'app-brand'},
            React.createElement(
                'h1',
                {className: 'brand'},
                'QTeam'
            )
        )
    };
    renderContainer(){
        return React.createElement(
            'div',
            {className: 'app-container'},
            this.renderAccount(), this.renderPassword(),this.renderSubmit()
        )
    };
    renderAccount(){
        return React.createElement(
            'div',
            { 
                className: 'account',
             },
            <input ref = 'account' type= 'text' placeholder = '邮箱/手机号'></input>
        )
    };
    renderPassword(){
        return React.createElement(
            'div',
            { 
                className: 'password' ,
            },
            <input ref = 'password' type= 'password' placeholder = '密码'></input>
        )
    };
    renderSubmit(){
        return React.createElement(
            'div',
            {
                 className: 'submit' ,
                 onClick: this.signin
            },
            'Signin'
        )
    };

    render() {
        return React.createElement(
            'div',
            {
                className: 'main-card',
            }, this.renderFeature(),this.renderContainer()
        )
    }
}

export default Signin;