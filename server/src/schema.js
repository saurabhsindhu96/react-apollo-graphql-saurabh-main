import { gql } from "apollo-server-express";
import { find, remove, filter } from "lodash";

import persons from './person.json'
import cars from './cars.json'

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String!
    lastName: String!,
    cars: [Car]
  }

  type Car {
    id: String
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
    person: Person
  }

  type Query {
    person(id: String!): Person
    persons: [Person]
    personWithCars(id: String!): Person
    car(id: String!): Car
    cars: [Car]
    CarsWithPersons: [Car]
  }

  type Mutation {
    addPerson(id: String, firstName: String!, lastName: String!): Person
    updatePerson(id: String, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person
    addCar(id: String, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    updateCar(id: String, year: String!, make: String!, model: String!, price: String!, personId: String!): Car
    removeCar(id: String!): Car
  }
`;

const query = {
  person(parent, args, context, info) {
    let { id } = args
    return find(persons, { id });
  },
  persons: () => persons,
  car(parent, args, context, info) {
    let { id } = args
    return find(cars, { id });
  },
  cars: () => cars,
  CarsWithPersons(parent, args, context, info) {
    cars.forEach(function (car) {
      const person = find(persons, { id: car.personId }) || {};
      car.person = person.length > 0 ? person : null;
    });
    return cars;
  },
  personWithCars(parent, args, context, info) {
    let { id } = args
    let person = find(persons, { id });
    person.cars = filter(cars, { personId: person.id });
    return person;
  },
}

const mutation = {
  addPerson(root, args) {
    const { id, firstName, lastName } = args
    persons.push({ id, firstName, lastName });
    return { id, firstName, lastName };
  },
  addCar(root, args) {
    const { id, year, make, model, price, personId } = args
    cars.push({ id, year, make, model, price, personId });
    return { id, year, make, model, price, personId };
  },
  updatePerson: (root, args) => {
    let { id, firstName, lastName } = args
    const person = find(persons, { id });
    if (!person) throw new Error(`Not able to find person with id ${args.id}`);
    person.firstName = firstName;
    person.lastName = lastName;
    return person;
  },
  updateCar: (root, args) => {
    let { id, make, model, year, price, personId } = args
    const car = find(cars, { id });
    if (!car) throw new Error(`Not able to find car with id ${args.id}`);
    car.make = make;
    car.model = model;
    car.year = year;
    car.price = price;
    car.personId = personId;
    return car;
  },
  removePerson: (root, args) => {
    const { id } = args
    const removedPerson = find(persons, { id });
    if (!removedPerson) throw new Error(`Not able to find person with id ${args.id}`);

    remove(cars, { personId: id });
    remove(persons, { id });

    return removedPerson;
  },
  removeCar: (root, args) => {
    const { id } = args
    const removedCar = find(cars, { id });
    if (!removedCar) throw new Error(`Not able to find car with id ${args.id}`);

    remove(cars, { id });
    return removedCar;
  },
}

const resolvers = {
  Query: query,
  Mutation: mutation,
};

export { typeDefs, resolvers };
