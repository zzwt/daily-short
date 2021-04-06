import { createGlobalStyle } from 'styled-components';
import Header from '../components/header';
import { SWRConfig } from 'swr';
import axios from 'axios';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URI;
export default function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: async (url, cookie) => {
          const config = cookie
            ? {
                params: { codes: cookie },
              }
            : {};
          const response = await axios.get(url, config);
          return response.data;
        },
      }}
    >
      <GlobalStyle />
      <Header></Header>
      <Component {...pageProps} />
    </SWRConfig>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', 'Helvetica', 'Arial', sans-serif;
    padding: 0;
    /* max-width: 680px; */
    margin: 0 auto;
    background-image: linear-gradient(
      to bottom right,
      rgb(151, 153, 183) 10%,
      rgb(80, 81, 110) 80%
    );
    background-repeat: no-repeat;
    min-height: 100vh;
    /* min-height: 100vh; */
    box-sizing: border-box;
    /* color: #474747; */
    color: rgb(65, 79, 118);
  }

  .wrapper {
    width: 1000px;
    margin: 0 auto;
  }

  .border-shadow {
    border-radius: 5px;
    background: white;
    /* border: 1px solid #dedede; */
    box-shadow: 1px 1px 5px rgb(151, 153, 183);
  }

  .spinner {
    width: 50px;
    height: 50px;
    margin: 0px auto;
  }

  .message {
    margin-top: 20px;
  }
`;
