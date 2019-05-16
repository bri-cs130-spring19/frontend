import React from 'react'
import {Form, Icon, Input, Button, Checkbox, message} from 'antd/lib/index';
import { Link } from 'react-router-dom'
import '../styles/Login.css'
import {BACKEND_API} from "../res/Constants"
import qs from "qs"
import axios from "axios"

const FormItem = Form.Item;
class NormalLoginForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log('Received values of form: ', values);
                const data = qs.stringify({
                    username: values.username,
                    password: values.password
                });

                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                };

                axios.post(BACKEND_API+ '/users/login', data, headers)
                    .then((response) => {
                        message.success("Successfully logged in.");
                        this.props.handleLogin(response)
                })
                    .catch((error) => {
                        //TODO: fix the javascript error, maybe a lib issue
                        console.log(error.response)
                        message.error(error.response.data.error)
                })
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;


        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder="Username"
                        />,
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type="password"
                            placeholder="Password"
                        />,
                    )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(<Checkbox>Remember me</Checkbox>)}
                    <a className="login-form-forgot">
                        Forgot password
                    </a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                    Or <Link to='/register'>Register Now!</Link>
                </FormItem>
            </Form>
        );
    }
}

export const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);