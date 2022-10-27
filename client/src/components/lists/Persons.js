import { useQuery } from "@apollo/client";
import { GET_PERSONS, GET_CARS } from "../../queries";
import { List } from "antd";
import Person from "../listitems/Person";

const Persons = () => {
  const { loading, error, data } = useQuery(GET_PERSONS);
  const { loading: loading_car, error: error_car, data: data_car } = useQuery(GET_CARS);

  if (loading || loading_car) return "Loading.....";
  if (error || error_car) return `Error!`;

  return (
    <List>
      {data.persons.map(({ id, firstName, lastName }) => (
        <List.Item key={id} style={{ flexDirection: "column", alignItems: "stretch" }}>
          <Person
            key={id}
            id={id}
            firstName={firstName}
            lastName={lastName}
            cars={data_car.CarsWithPersons.filter(car => car.personId === id)}
          />
        </List.Item>
      ))}
    </List>
  );
};

export default Persons;
