import { useQuery } from "@apollo/client";
import { GET_PERSON_WITH_CARS } from "../../queries";
import { Card } from "antd";
import { Link, useParams } from "react-router-dom";

const formatNumber = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const ShowDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, { variables: { id } });

  return (
    <>
      {error ? ("Error loading data", JSON.stringify(error)) : loading ? ("Loading") :
        (
          <Card
            title={`${data.personWithCars.firstName} ${data.personWithCars.lastName}`}
          >
            <Card type="inner" title="Cars">
              {data.personWithCars.cars.length === 0
                ? "No Cars"
                : data.personWithCars.cars.map(
                  ({ id, year, make, model, price }) => (
                    <p key={id}>
                      {make} {model} {year} ({`Price: ${formatNumber.format(parseInt(price).toFixed(2))}`})
                    </p>
                  )
                )}
            </Card>
          </Card>
        )}

      <Link to="/">go back home</Link>
    </>
  );
};
export default ShowDetail;
