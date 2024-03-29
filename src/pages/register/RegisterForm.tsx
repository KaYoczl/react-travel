import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import styles from './index.module.less'
import axios from 'axios';
import { userApi } from '../../service';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await axios.post(`${userApi}/register`, {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm
      })
      navigate('/signIn')
    } catch (error) {
      message.error('注册失败！')
    }
  };
  const onFinishFailed = (errorInfo: any) => {};
  
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        rules={[
          { required: true, message: 'Please input your confirm password!' },
          (({getFieldValue}) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject('密码确认不一致！')
            }
          }))
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}