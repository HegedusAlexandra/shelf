import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Replace with your server's URL
  cache: new InMemoryCache({
    typePolicies: {
      Ingredients: {
        keyFields: ["id", "type"]
      }
    }
  })
});

export default client;
