import React, {useState, useEffect} from "react";
import axios from 'axios'
import {withRouter} from 'react-router-dom'
import Table from './Table';
import { Button, Row, Col, Typography, Form, Input, Modal, InputNumber, Radio } from "antd";
import { PlusOutlined, UserOutlined, CarOutlined } from '@ant-design/icons'
const { Title } = Typography;

const NewRecordingForm = ({ visible, onRecord, onCancel }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    console.log('hello')
    axios.get('http://localhost:8000/trips').then(
      (resp) => {
        console.log(resp.data)
      }
    )
  },[])
  return (
    <Modal
      visible={visible}
      title="Start New Recording"
      okText="Start"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onRecord(values);
          })
          .catch(info => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        layout="horizontal"
        name="form_in_modal"
        initialValues={{
          modifier: "public"
        }}
      >
        <Form.Item
          label="Plate Number"
          name="plateNumber"
          rules={[
            {
              required: true,
              message: "Please input the bus number!"
            }
          ]}
        >
          <Input
            prefix={<CarOutlined className="site-form-item-icon" />}
            placeholder="Bus Plate Number"
          />
        </Form.Item>
        <Form.Item
          label="Driver Name"
          name="driver"
          rules={[
            {
              required: true, 
              message: "Please input the driver's name!"
            }
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Driver Name"
          />
        </Form.Item>
        <Form.Item label="Capacity" name="capacity">
          <InputNumber defaultValue={30} step={1} />
        </Form.Item>
        <Form.Item 
          rules={[
            {
              required: true,
              message: "Please choose camera location!"
            }
          ]} 
          label="Position" 
          name="position">
          <Radio.Group buttonStyle="solid">
            <Radio.Button value="enter">Entry</Radio.Button>
            <Radio.Button value="exit">Exit</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const Dashboard = ({history}) => {
  const [visible, setVisible] = useState(false);

  const onRecord = (data) => {
    if(!data.capacity){
      data.capacity = 30;
    }
    console.log('received ', data)
    history.push({
      pathname: '/camera',
      state: {...data}
    })
    setVisible(false)
  };
  return ( 
    <div
      className="Admin"
      style={{
        width: "70%",
        margin: '0 auto'
      }}
    >
      <Row style={{paddingTop: 40}} justify="space-between">
        <Col span={10}>
          <Title>Dashboard</Title>
        </Col>
        <Col span={3}>
          <Button onClick={() => {
            setVisible(true);
          }} 
          icon={<PlusOutlined />}
          shape="round" 
          size="large"
          type="primary">
            Record
          </Button>
        </Col>
      </Row>
      <div>
        <Table/>
      </div>
      <NewRecordingForm
        visible={visible}
        onRecord={onRecord}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default withRouter(Dashboard);
