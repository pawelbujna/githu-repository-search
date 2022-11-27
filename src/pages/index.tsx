import { Alert, Form, Input, List } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useQuery } from 'urql';

import { FetchRepositoriesDocument, FetchRepositoriesQueryVariables } from '../generated/graphql';
import { filterRepositoryData } from '../helpers/filterRepositoryData';

const DEFAULT_REPOSITORY_PARAMS = {
    pageSize: 10,
    query: 'followers:>100000',
    after: '0',
};

const parseQueryParameters = (queryParameters: FetchRepositoriesQueryVariables) => {
    const query = queryParameters?.query || DEFAULT_REPOSITORY_PARAMS.query;
    const pageSize = Number(queryParameters?.first) || DEFAULT_REPOSITORY_PARAMS.pageSize;
    const after = queryParameters?.after || DEFAULT_REPOSITORY_PARAMS.after;
    const currentPage = Number(after) / pageSize + 1;

    return {
        query,
        pageSize,
        after,
        currentPage,
    };
};

export default function Home() {
    const router = useRouter();
    const [form] = Form.useForm();

    // Casting query params as router.query cannot be typed
    const { query, pageSize, after, currentPage } = parseQueryParameters(
        router.query as FetchRepositoriesQueryVariables,
    );

    const queryAfterBase64 = Buffer.from(`cursor:${after}`).toString('base64');

    const [{ data, fetching, error }] = useQuery({
        query: FetchRepositoriesDocument,
        variables: {
            query,
            first: pageSize,
            after: queryAfterBase64,
        },
    });

    const repositoryData = filterRepositoryData(data);

    const handleSearch = (searchInput: string) => {
        // With new query user is redirected to first page
        router.push({ query: { query: searchInput, after: DEFAULT_REPOSITORY_PARAMS.after } });
    };

    const handleChangePage = (current: number, pageSizeValue: number) => {
        const after = current && pageSizeValue ? `${(current - 1) * pageSizeValue}` : DEFAULT_REPOSITORY_PARAMS.after;

        router.push({ query: { after, first: pageSizeValue, query } });
    };

    useEffect(() => {
        // Update form value when query changes
        // https://ant.design/components/form/
        form.setFieldsValue({ search: query });
    }, [query, form]);

    return (
        <div>
            <Form form={form}>
                <Form.Item name="search">
                    <Input.Search
                        onSearch={handleSearch}
                        placeholder="Type repository name"
                        disabled={!!error}
                        enterButton="Submit"
                    />
                </Form.Item>
            </Form>

            {error ? (
                // If error display alert

                <Alert message="Something went wrong" description={error.message} type="error" />
            ) : (
                // Otherwise display list of repositories

                <List
                    style={{
                        background: '#fff',
                        borderRadius: '4px',
                        padding: '20px',
                    }}
                    itemLayout="horizontal"
                    size="small"
                    loading={fetching}
                    dataSource={repositoryData}
                    pagination={{
                        onChange: handleChangePage,
                        pageSize,
                        current: currentPage,
                        total: data?.search.repositoryCount || 0,
                    }}
                    renderItem={({ id, url, description, name, stargazerCount, forkCount }) => (
                        <List.Item data-testid="repository-list-item" key={id}>
                            <List.Item.Meta
                                title={
                                    <a href={url} target="_blank" rel="noreferrer noopener">
                                        {name}
                                    </a>
                                }
                                description={description}
                            />

                            <div style={{ width: '100px' }}>
                                <p>🌟 {stargazerCount}</p>
                                <p>🍴 {forkCount}</p>
                            </div>
                        </List.Item>
                    )}
                />
            )}
        </div>
    );
}
