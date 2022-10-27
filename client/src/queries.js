import { gql } from "@apollo/client";
export const GET_PERSONS = gql`
  {
    persons {
      id
      firstName
      lastName
    }
  }
`;

export const ADD_PERSON = gql`
  mutation AddPerson($firstName: String!, $lastName: String!, $id: String) {
    addPerson(firstName: $firstName, lastName: $lastName, id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const REMOVE_PERSON = gql`
  mutation Mutation($id: String!) {
    removePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const UPDATE_PERSON = gql`
  mutation UpdatePerson($firstName: String!, $lastName: String!, $id: String) {
    updatePerson(firstName: $firstName, lastName: $lastName, id: $id) {
      id
      firstName
      lastName
    }
  }
`;

export const GET_PERSON_WITH_CARS = gql`
  query PersonWithCars($id: String!) {
    personWithCars(id: $id) {
      id
      firstName
      lastName
      cars {
        id
        year
        make
        price
        model
      }
    }
  }
`;

export const GET_CARS = gql`
  {
    CarsWithPersons {
      id
      year
      make
      model
      price
      personId
      person {
        firstName
        lastName
      }
    }
  }
`;
export const ADD_CAR = gql`
  mutation Mutation($year: String!, $make: String!, $model: String!, $price: String!, $personId: String!, $id: String) {
    addCar(year: $year, make: $make, model: $model, price: $price, personId: $personId, id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const REMOVE_CAR = gql`
  mutation RemoveCar($id: String!) {
    removeCar(id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($year: String!, $make: String!, $model: String!, $price: String!, $personId: String!, $id: String) {
    updateCar(year: $year, make: $make, model: $model, price: $price, personId: $personId, id: $id) {
      id
      year
      make
      model
      price
      personId
    }
  }
`;
