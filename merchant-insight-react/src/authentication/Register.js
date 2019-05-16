import React from 'react';
import {
    Form,
    Input,
    Button,
} from 'antd';
import '../styles/Register.css';
import { Link } from 'react-router-dom';
import { BACKEND_API } from '../res/Constants'
import { message } from 'antd'
import axios from 'axios';
import qs from 'qs'

const FormItem = Form.Item

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const data = qs.stringify({
                    username: values.email,
                    password: values.password
                });

                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                };

               axios.post(BACKEND_API+ '/users/register', data, headers).then((response) => {
                    message.success('Successfully created user.');
                    this.props.history.push('/login');
                }).catch((error) => {
                   //TODO: fix the javascript error, maybe a lib issue
                   console.log(error.response)
                   message.error(error.response.data.error)
                })
            }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter are inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className='register-form'>
                <FormItem label="E-mail">
                    {getFieldDecorator('email', {
                        rules: [
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ],
                    })(<Input />)}
                </FormItem>
                <FormItem label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                validator: this.validateToNextPassword,
                            },
                        ],
                    })(<Input.Password />)}
                </FormItem>
                <FormItem label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            {
                                validator: this.compareToFirstPassword,
                            },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </FormItem>

                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Register
                    </Button>
                    <p> Already have an account? <Link to='login'>Log in</Link> right now!</p>
                </FormItem>
            </Form>
        );
    }
}

export const Register = Form.create({ name: 'register' })(RegistrationForm);

