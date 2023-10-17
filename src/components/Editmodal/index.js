import React from "react";
import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
function Editmodal({
  isEditModalVisible,
  handleEditCancel,
  onFinish,
  datatobedited,
  changeditdata,
}) {
  const [form] = Form.useForm();
  useEffect(() => {
    console.log(dayjs(datatobedited.date, "YYYY-MM-DD"));
    form.setFieldsValue({
      name: datatobedited.name,
      amount: datatobedited.amount,
      date: dayjs(datatobedited.date, "YYYY-MM-DD"),
      tag: datatobedited.tag,
      mop: datatobedited.mop,
    });
  }, [datatobedited]);
  return (
    <Modal
      style={{ fontWeight: 600 }}
      title="Edit Transaction"
      open={isEditModalVisible}
      onCancel={() => {
        handleEditCancel();
      }}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={async(values) => {
          await onFinish(values, datatobedited.type, datatobedited.uuid);
        }}
      >
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the expense amount!" },
          ]}
        >
          <Input type="number" className="custom-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the expense date!" },
          ]}
        >
          <DatePicker className="custom-input" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          label="Tag"
          name="tag"
          style={{ fontWeight: 600 }}
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            {[
              "food",
              "education",
              "office",
              "shopping",
              "transportation",
              "food and beverage",
            ].includes(datatobedited.tag) ? (
              <>
                <Select.Option value="food">Food</Select.Option>
                <Select.Option value="education">Education</Select.Option>
                <Select.Option value="office">Office</Select.Option>
                <Select.Option value="shopping">Shopping</Select.Option>
                <Select.Option value="transporatation">
                  Transportation
                </Select.Option>
              </>
            ) : (
              <>
                <Select.Option value="salary">Salary</Select.Option>
                <Select.Option value="freelance">Freelance</Select.Option>
                <Select.Option value="investment">Investment</Select.Option>
                <Select.Option value="gift">Gift</Select.Option>
              </>
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label="Mode of Payment"
          name="mop"
          style={{ fontWeight: 600 }}
          rules={[
            { required: true, message: "Please select a mode of payment!" },
          ]}
        >
          <Select className="select-input-2">
            <Select.Option value="upi">UPI</Select.Option>
            <Select.Option value="card">Debit/Credit card</Select.Option>
            <Select.Option value="cash">Cash</Select.Option>
            <Select.Option value="other">Other</Select.Option>
            {/* Add more tags here */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Edit transaction
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default Editmodal;
