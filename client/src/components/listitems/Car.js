import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useState } from "react";
import RemoveCar from "../buttons/DeleteCar";
import UpdateCar from "../forms/UpdateCar";

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const Car = ({ id, year, make, model, price, personId, person }) => {

  const [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          personId={personId}
          person={person}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemoveCar id={id} />,
          ]}
        >
          {make} {model} {year} <br />
          {`Price: ${formatter.format(parseInt(price).toFixed(2))}`}
        </Card>
      )}
    </div>
  );
};

export default Car;
