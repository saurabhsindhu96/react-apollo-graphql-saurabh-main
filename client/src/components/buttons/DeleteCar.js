import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../queries";
import { filter } from "lodash";

const DeleteCar = ({ id }) => {
  const [DeleteCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { DeleteCar } }) {
      const { CarsWithPersons } = cache.readQuery({ query: GET_CARS });

      cache.writeQuery({
        query: GET_CARS,
        data: {
          CarsWithPersons: filter(
            CarsWithPersons,
            (car) => car.id !== DeleteCar.id
          ),
        },
      });

    },
  });

  const handleButtonClick = () => {
    let result = window.confirm("Are you sure you want to delete this Car?");

    if (result) {
      DeleteCar({ variables: { id } });
      window.location.reload();
    }

  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};

export default DeleteCar;
