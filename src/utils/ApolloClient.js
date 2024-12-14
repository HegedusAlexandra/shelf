import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  //uri: "http://localhost:4000/graphql", // Replace with your server's URL
  uri: "https://idv7jhpea0.execute-api.eu-north-1.amazonaws.com/shelf-be",
  cache: new InMemoryCache({
    typePolicies: {
      Ingredients: {
        keyFields: ["id", "type"]
      }
    }
  })
});

export default client;
