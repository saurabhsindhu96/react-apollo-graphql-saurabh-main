import { useState } from "react";
import { Link } from "react-router-dom";

import { EditOutlined } from "@ant-design/icons";
import { Card, List } from "antd";

import RemovePerson from "../buttons/DeletePerson";
import UpdatePerson from "../forms/UpdatePerson";
import Car from "../listitems/Car";

const Person = ({ id, firstName, lastName, cars }) => {
  var [editMode, setEditMode] = useState(false);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onClick={() => setEditMode(!editMode)}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          actions={[
            <Link
              key={id}
              to={`/${id}`}
              title="LEARN MORE"
              reloadDocument={true}
            >
              LEARN MORE
            </Link>,
            <EditOutlined key="edit" onClick={() => setEditMode(!editMode)} />,
            <RemovePerson id={id} />,
          ]}
        >
          {`${firstName} ${lastName}`}
          <List>
            {cars.length > 0 ? cars.map(
              ({ id, year, make, model, price, personId, person }) => (
                <List.Item key={id} style={{ flexDirection: "column", alignItems: "stretch" }}>
                  <Car
                    key={id}
                    id={id}
                    year={year}
                    make={make}
                    model={model}
                    price={price}
                    personId={personId}
                    person={person}
                  />
                </List.Item>
              )
            ) : "No cars"}
          </List>
        </Card>
      )}
    </>
  );
};
export default Person;
