import React from 'react';
import withRouter from 'umi/withRouter';
import { List, InputItem, WhiteSpace, Button, ActivityIndicator, Toast} from 'antd-mobile';
import { createForm } from 'rc-form';
import { connect } from 'dva';

@connect(({ login, loading }) => ({
    loginState: login.loginState,
    loading: loading.effects['login/login']

  }))
class BasicInputExample extends React.Component {
  state = {
    //   data: ['1', '2', '3'],
      loginState: null,
    }
    componentDidMount() {
      // this.autoFocusInst.focus();
    }
    componentDidUpdate(){

    }
    handleClick = () => {
    //   this.inputRef.focus();
    }
    onLoginClick=()=>{
        const { dispatch, form }  = this.props;
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          // form.resetFields();
          dispatch({
              type: 'login/login',
              payload: {
                ...fieldsValue,
              },
            });
        });
    }
    onResetClick=()=>{
      const { form }  = this.props;
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
      });
    }
    render() {
        
      const { getFieldProps } = this.props.form;
      return (
        <div>
            <div style={{padding:"8px"}}>
            <WhiteSpace />
            <List renderHeader={() => '认证'}>
                <InputItem
                 {...getFieldProps('loginName')}
                    defaultValue=""
                    placeholder="输入用户名"
                    data-seed="loginName"
                >用户名</InputItem>
            
                <InputItem
                {...getFieldProps('phone')}
                type="phone"
                placeholder="输入手机号"
                >手机号</InputItem>

                <InputItem
                {...getFieldProps('userNo')}
                type="password"
                placeholder="输入员工编号"
                >工号编号</InputItem>
            </List>
            <WhiteSpace />
            <Button type="primary" onClick={()=>this.onLoginClick()}>登录</Button><WhiteSpace />
            <Button onClick={this.onResetClick}>重置</Button><WhiteSpace />
            </div>
            {/* <ActivityIndicator
                toast
                text="Loading..."
                animating={ this.props.loading ?true:false}
              /> */}
        </div>
      );
    }
  }
  const BasicInputExampleWrapper = createForm()(BasicInputExample);
  export default BasicInputExampleWrapper
