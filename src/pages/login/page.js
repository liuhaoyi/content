import React from 'react';
import withRouter from 'umi/withRouter';
import {List,InputItem,WhiteSpace,Button} from 'antd-mobile';
import { createForm } from 'rc-form';
import {connect} from 'dva';

@connect(({ login}) => ({
    
  }))
class BasicInputExample extends React.Component {
    componentDidMount() {
      // this.autoFocusInst.focus();
    }
    handleClick = () => {
    //   this.inputRef.focus();
    }
    onLoginClick=()=>{
        // console.log("onLoginClick");
        let phone   =  "";
        let userId  =   "";
        let password=   "";

        const { dispatch } = this.props;
        dispatch({
          type: 'login/login',
          payload: {
          },
        });
    }
    onResetClick=()=>{
        console.log("onResetClick")
    }
    render() {
        
      const { getFieldProps } = this.props.form;
      return (
        <div>
            <div style={{padding:"8px"}}>
            <WhiteSpace />
            <List renderHeader={() => '认证'}>
                <InputItem
                    defaultValue=""
                    placeholder="输入用户名"
                    data-seed="logId"
                >姓名</InputItem>
            
                <InputItem
                {...getFieldProps('phone')}
                type="phone"
                placeholder="186 1234 1234"
                >手机</InputItem>

                <InputItem
                {...getFieldProps('password')}
                type="password"
                placeholder="****"
                >密码</InputItem>

            </List>
            <WhiteSpace />
            <Button type="primary" onClick={()=>this.onLoginClick()}>登录</Button><WhiteSpace />
            <Button onClick={this.onResetClick}>重置</Button><WhiteSpace />
            </div>
        </div>
      );
    }
  }
  const BasicInputExampleWrapper = createForm()(BasicInputExample);
  export default BasicInputExampleWrapper
