import './global.css';
import Header from '../components/header';
// This default export is required in a new `pages/_app.js` file.
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
      <Header></Header>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
