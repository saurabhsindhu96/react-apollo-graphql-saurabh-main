import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { GET_CARS, GET_PERSONS, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const { id, year, make, model, price, personId, person } = props
  const [form] = Form.useForm();

  const { data } = useQuery(GET_PERSONS);
  const [updateCar] = useMutation(UPDATE_CAR);
  const { Option } = Select;


  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    let updatedCar = { id, year, make, model, price, personId }
    updateCar({
      variables: updatedCar,
      update: (proxy, { data: { updateCar } }) => {
        const data = proxy.readQuery({
          query: GET_CARS,
        });
        proxy.writeQuery({
          query: GET_CARS,
          data: { ...data, updateCar },
        });
      },
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-car-form"
      size="small"
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
        person: person,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input year!" }]}
      >
        <Input
          placeholder="i.e. 2022"
        />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input make!" }]}
      >
        <Input
          placeholder="i.e. Honda"
        />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input model!" }]}
      >
        <Input
          placeholder="i.e. CRV"
        />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input
          placeholder="i.e. 38000"
        />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please input your personId!" }]}
      >
        <Select
          placeholder="Select Person"
          allowClear
        >
          {data.persons.map(({ id, firstName, lastName }) => (
            <Option value={id} key={id}>
              {`${firstName} ${lastName}`}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit">
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick} >
        Cancel
      </Button>
    </Form>
  );
};

export default UpdateCar;
