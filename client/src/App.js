import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/pages/Home";

import Title from "./components/layouts/Title";
import ShowDetail from "./components/pages/ShowDetail";

const uri = "http://localhost:4000/graphql";
const cache = new InMemoryCache()

const client = new ApolloClient({
  uri,
  cache,
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Title name="People and their cars" header={true} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<ShowDetail />}></Route>
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
