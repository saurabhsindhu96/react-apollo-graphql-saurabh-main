import AddCar from "../forms/AddCar";
import AddPerson from "../forms/AddPerson";
import Title from "../layouts/Title";
import Persons from "../lists/Persons";

const Home = () => {
  return (
    <div>
      <Title name="People" />
      <AddPerson />
      <Title name="Cars" />
      <AddCar />
      <Persons />
    </div>
  );
};

export default Home;
