import Head from 'next/head'
// import styles from './layout.module.css'
import styled from 'styled-components'

const Container = styled.div`
  max-width: 40rem;
  margin: 1.5rem auto;
  padding: 0 1rem;
`

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Next Fauna GraphQL CRUD</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>

    <main>
      <Container>{children}</Container>
    </main>
  </>
)

export default Layout
