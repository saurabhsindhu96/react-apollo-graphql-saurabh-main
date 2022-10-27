import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { UPDATE_PERSON } from "../../queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName } = props

  const [form] = Form.useForm();
  const [updatePerson] = useMutation(UPDATE_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    let updatedPerson = { id, firstName, lastName }
    updatePerson({
      variables: updatedPerson,
    });
    props.onButtonClick();
  };

  return (
    <Form
      form={form}
      name="update-person-form"
      size="large"
      initialValues={{
        firstName: firstName,
        lastName: lastName,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input
          placeholder="i.e. John"
        />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input
          placeholder="i.e. Smith"
        />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit">
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdatePerson;
