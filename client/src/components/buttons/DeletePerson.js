import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { filter } from "lodash";
import { GET_CARS, GET_PERSONS, REMOVE_PERSON } from "../../queries";

const DeletePerson = (props) => {
  const [DeletePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { DeletePerson } }) {
      const { persons } = cache.readQuery({ query: GET_PERSONS });

      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          persons: filter(persons, (car) => car.id !== DeletePerson.id),
        },
      });

      const { CarsWithPersons } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          CarsWithPersons: filter(CarsWithPersons, (car) => car.personId !== DeletePerson.id),
        },
      });
    },
  });

  const handleButtonClick = () => {
    const { id } = props;

    let result = window.confirm("Are you sure you want to delete this Person?");

    if (result) { 
      DeletePerson({ variables: { id } });
      window.location.reload();
    }
  };

  return <DeleteOutlined key="delete" style={{ color: "red" }} onClick={handleButtonClick} />
};

export default DeletePerson;
