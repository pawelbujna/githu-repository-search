import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'https://docs.github.com/public/schema.docs.graphql',
    documents: 'src/**/*.graphql',
    generates: {
        'src/generated/': {
            preset: 'client',
            plugins: [],
        },
    },
};

export default config;
