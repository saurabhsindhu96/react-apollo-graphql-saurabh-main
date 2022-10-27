import { useQuery, useMutation } from "@apollo/client";

import { Form, Input, Button, Select } from "antd";

import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PERSONS } from "../../queries";

const AddCar = () => {
  const [form] = Form.useForm();

  let [id] = useState(uuidv4());
  const { data } = useQuery(GET_PERSONS);
  const [addCar] = useMutation(ADD_CAR);

  const onFormFinish = (values) => {
    const { year, make, model, price, personId } = values;
    id += new Date().getTime().toString();
    let car = { id, year, make, model, price, personId }

    addCar({
      variables: car, update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({ query: GET_CARS });
        proxy.writeQuery({
          query: GET_CARS, data: {
            ...data,
            CarsWithPersons: [...data.CarsWithPersons, addCar],
          },
        });
      },
    });
    form.resetFields();
  };

  return (
    <Form
      form={form}
      style={{ margin: "10px" }}
      name="add-car-form"
      layout="inline"
      size="large"
      onFinish={onFormFinish}
    >
      <Form.Item
        name="year"
        style={{ padding: "10px" }}
        rules={[{ required: true, message: "Please input your year!" }]}
      >
        <Input placeholder="i.e. 2022" />
      </Form.Item>
      <Form.Item
        style={{ padding: "10px" }}
        name="make"
        rules={[{ required: true, message: "Please input your make!" }]}
      >
        <Input placeholder="i.e. Honda" />
      </Form.Item>
      <Form.Item
        style={{ padding: "10px" }}
        name="model"
        rules={[{ required: true, message: "Please input your model!" }]}
      >
        <Input placeholder="i.e. CRV" />
      </Form.Item>
      <Form.Item
        style={{ padding: "10px" }}
        name="price"
        rules={[{ required: true, message: "Please input your price!" }]}
      >
        <Input placeholder="i.e. 37000" />
      </Form.Item>

      <Form.Item
        style={{ padding: "10px" }}
        name="personId"
        rules={[{ required: true, message: "Please Select Person" }]}
      >
        <Select
          placeholder="Select Person"
          allowClear
        >
          {data?.persons.map(({ id, firstName, lastName }) => (
            <Select.Option value={id} key={id}>
              {`${firstName} ${lastName}`}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item style={{ padding: "10px" }} shouldUpdate={true}>
        {() => (
          <Button
            type="primary"
            htmlType="submit"

            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
