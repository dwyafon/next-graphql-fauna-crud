import useSWR from "swr";
import { gql } from "graphql-request";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { graphQLClient } from "../utils/graphql-client";

const fetcher = async (query) => await graphQLClient.request(query);

const Home = () => {
  const { data, error } = useSWR(
    gql`
      {
        allTodos {
          data {
            _id
            task
            completed
          }
        }
      }
    `,
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  return (
    <Layout>
      <h1>Next Fauna GraphQL CRUD</h1>

      {data ? (
        <ul>
          {data.allTodos.data.map((todo) => (
            <li key={todo._id} className={styles.todo}>
              <span>{todo.task}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div>Loading . . .</div>
      )}
    </Layout>
  );
};

export default Home;
