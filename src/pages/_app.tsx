import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'urql';

import { AppLayout } from '../components/Layout/Layout';
import { client } from '../lib/graphqlClient';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Provider value={client}>
            {/* Head can be placed anywhere as its being hoisted by react */}
            <Head>
                <title>Github search</title>
                <meta name="description" content="Github search" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AppLayout>
                <Component {...pageProps} />
            </AppLayout>
        </Provider>
    );
}
