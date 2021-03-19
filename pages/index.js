import useSWR from 'swr'
import { gql } from 'graphql-request'
import Layout from '../components/layout'
// import styles from '../styles/Home.module.css';
import { graphQLClient } from '../utils/graphql-client'
import Link from 'next/link'
import styled from 'styled-components'

const ListItem = styled.li`
  padding: 0.5rem;
`

const EditItem = styled.span`
  margin: 0 0.5rem;
  border-right: 1px solid #ccc;
  border-left: 1px solid #ccc;
  padding: 0 0.5rem;
`

const DeleteItem = styled.span`
  color: #d32f2f;
  cursor: pointer;
`

const fetcher = async (query) => await graphQLClient.request(query)

const Home = () => {
  const { data, error, mutate } = useSWR(
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
  )

  const toggleTodo = async (id, completed) => {
    const query = gql`
      mutation PartialUpdateTodo($id: ID!, $completed: Boolean!) {
        partialUpdateTodo(id: $id, data: { completed: $completed }) {
          _id
          completed
        }
      }
    `

    const variables = {
      id,
      completed: !completed,
    }

    try {
      await graphQLClient.request(query, variables)
      mutate()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteATodo = async (id) => {
    const query = gql`
      mutation DeleteATodo($id: ID!) {
        deleteTodo(id: $id) {
          _id
        }
      }
    `

    try {
      await graphQLClient.request(query, { id })
      mutate()
    } catch (error) {
      console.error(error)
    }
  }

  if (error) return <div>Failed to load</div>

  return (
    <Layout>
      <h1>Next Fauna GraphQL CRUD</h1>

      {data ? (
        <ul>
          {data.allTodos.data.map((todo) => (
            <ListItem key={todo._id}>
              <span
                onClick={() => toggleTodo(todo._id, todo.completed)}
                style={
                  todo.completed
                    ? { textDecorationLine: 'line-through' }
                    : { textDecorationLine: 'none' }
                }
              >
                {todo.task}
              </span>
              <EditItem>
                <Link href='/todo/[id]' as={`/todo/${todo._id}`}>
                  <a>Edit</a>
                </Link>
              </EditItem>
              <DeleteItem
                onClick={() => deleteATodo(todo._id)}
        
              >
                Delete
              </DeleteItem>
            </ListItem>
          ))}
        </ul>
      ) : (
        <div>Loading . . .</div>
      )}
      <Link href='/new'>
        <a>Create New Todo</a>
      </Link>
    </Layout>
  )
}

export default Home
