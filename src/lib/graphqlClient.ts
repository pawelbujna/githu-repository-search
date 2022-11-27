import { createClient } from 'urql';

const url = 'https://api.github.com/graphql';

export const client = createClient({
    url,
    fetchOptions: {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        },
    },
});
