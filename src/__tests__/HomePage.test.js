import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { Provider } from 'urql';
import { fromValue } from 'wonka';

import { MOCK_FETCH_REPOSITORY_QUERY_SUCCESS } from '../__mocks__/MockFetchRepositoriesQuerySuccess';
import Home from '../pages/index';

const routerPushMock = jest.fn();

jest.mock('next/router', () => ({
    useRouter() {
        return {
            query: {},
            push: routerPushMock,
        };
    },
}));

const mockClient = {
    executeQuery: () => fromValue(MOCK_FETCH_REPOSITORY_QUERY_SUCCESS),
};

const REPOSITORY_LIST_MOCK = MOCK_FETCH_REPOSITORY_QUERY_SUCCESS.data.search.edges.map(({ node }) => node);

const [firstListElementMock] = REPOSITORY_LIST_MOCK;

const createComponent = () => (
    <Provider value={mockClient}>
        <Home />
    </Provider>
);

const renderHomePage = () => {
    render(createComponent());
};

describe('HomePage', () => {
    it('renders the page', async () => {
        renderHomePage();

        const header = await screen.findByText(firstListElementMock.name);

        expect(header).toBeInTheDocument();
    });

    it('matches the snapshot', async () => {
        const testRenderer = await renderer.create(createComponent());

        expect(testRenderer.toJSON()).toMatchSnapshot();
    });

    it('should display all elements correctly', async () => {
        renderHomePage();

        const repositoryList = await screen.findAllByTestId('repository-list-item');

        expect(repositoryList.length).toBe(REPOSITORY_LIST_MOCK.length);

        for (const [index, repositoryListItem] of repositoryList.entries()) {
            const { url, stargazerCount, forkCount } = REPOSITORY_LIST_MOCK[index];

            const link = repositoryListItem.querySelector('a');
            const [stargazerElement, forkElement] = repositoryListItem.querySelectorAll('p');

            expect(link).toHaveAttribute('href', url);
            expect(stargazerElement).toHaveTextContent(`🌟 ${stargazerCount}`);
            expect(forkElement).toHaveTextContent(`🍴 ${forkCount}`);
        }
    });

    it('calls router when looking for a different query param', async () => {
        renderHomePage();

        const input = screen.getByPlaceholderText('Type repository name');

        // For some reason 'closest' is not working here
        const submitButton = input.nextSibling.childNodes[0];

        userEvent.type(input, 'freeCodeCamp');
        userEvent.click(submitButton);

        await waitFor(() => {
            expect(routerPushMock).toBeCalled();
        });
    });
});
