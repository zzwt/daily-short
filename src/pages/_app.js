import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Header from '../components/header';
import Footer from '../components/footer';
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
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header></Header>
        <Component {...pageProps} />
        <Footer></Footer>
      </ThemeProvider>
    </SWRConfig>
  );
}

const theme = {
  colorPrimary: '#00be70',
  colorSecondary: 'black',
  colorWhite: '#ffffff',
  colorGrey: '#9da7b9',
  colorLightgrey: '#f0f0f0',
  colorRed: '#ff3f4f',
};

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Montserrat', 'Helvetica', 'Arial', sans-serif;
    padding: 0;
    background: repeating-linear-gradient(
      45deg,
      #def1ed,
      #d5f2f6

    );
    min-height: 100vh;
    box-sizing: border-box;
    color: #162c5b;
    
  }

  .wrapper {
    width: 1000px;
    /* max-width: 1000px; */
    /* min-width: 1000px; */
    margin: 0 auto;
    /* display: flex; */
  }

  .border-shadow {
    border-radius: 5px;
    background: white;
    /* border: 1px solid #dedede; */
    box-shadow: 1px 1px 5px rgb(151, 153, 183);
  }

  .round-border{
    border-radius: 10px;
    border: 2px solid white;
    background: rgba(255,255,255,0.4)
  }


  .spinner {
    width: 50px;
    height: 50px;
    margin: 0px auto;
  }

  .message {
    margin-top: 20px;
  }
  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #162c5b;
    opacity: 1; /* Firefox */
  }
  #__next{
    overflow: hidden
  }
`;
