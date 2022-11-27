import { MOCK_FETCH_REPOSITORY_QUERY_SUCCESS } from '../../__mocks__/MockFetchRepositoriesQuerySuccess';
import { filterRepositoryData } from '../filterRepositoryData';

const FORMATTED_DATA_MOCK = [
    {
        id: 'MDEwOlJlcG9zaXRvcnk5MDc1OTkzMA==',
        forkCount: 540,
        stargazerCount: 1138,
        name: 'mock-1',
        url: 'https://github.com/discountry/react',
        description: 'React docs in Chinese | React 中文文档翻译',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnkxMjE4MTQyMTA=',
        forkCount: 344,
        stargazerCount: 2110,
        name: 'mock-2',
        url: 'https://github.com/primer/react',
        description: "An implementation of GitHub's Primer Design System using React",
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnk3NzUxMzQxOQ==',
        forkCount: 462,
        stargazerCount: 989,
        name: 'mock-3',
        url: 'https://github.com/react-redux-antd-es6/react',
        description: '基于react的企业后台管理开发框架',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnk3MjYyODI4NQ==',
        forkCount: 437,
        stargazerCount: 792,
        name: 'mock-4',
        url: 'https://github.com/Cathy0807/react',
        description: '京东首页构建',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnk0MzAyOTI5Ng==',
        forkCount: 182,
        stargazerCount: 221,
        name: 'mock-5',
        url: 'https://github.com/formio/react',
        description: 'JSON powered forms for React.js',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnkyOTAyODc3NQ==',
        forkCount: 22_637,
        stargazerCount: 106_189,
        name: 'mock-6',
        url: 'https://github.com/facebook/react-native',
        description: 'A framework for building native applications using React',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnkzNjA2NjI0',
        forkCount: 3564,
        stargazerCount: 19_973,
        name: 'mock-7',
        url: 'https://github.com/ReactiveCocoa/ReactiveCocoa',
        description: 'Cocoa framework and Obj-C dynamism bindings for ReactiveSwift.',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnkzOTMxNjUzNQ==',
        forkCount: 128,
        stargazerCount: 234,
        name: 'mock-8',
        url: 'https://github.com/azat-co/react',
        description: 'Examples for the React Quickly book. ',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnk2MTU3MzcwMg==',
        forkCount: 94,
        stargazerCount: 437,
        name: 'mock-9',
        url: 'https://github.com/ui-router/react',
        description: '🔼 UI-Router for React',
        __typename: 'Repository',
    },
    {
        id: 'MDEwOlJlcG9zaXRvcnkxOTg3MjQ1Ng==',
        forkCount: 9623,
        stargazerCount: 48_894,
        name: 'mock-10',
        url: 'https://github.com/remix-run/react-router',
        description: 'Declarative routing for React',
        __typename: 'Repository',
    },
];

describe('formatRepositoryData', () => {
    it('should an empty array', () => {
        expect(filterRepositoryData()).toEqual([]);
    });

    it('should return formatted data', () => {
        expect(filterRepositoryData(MOCK_FETCH_REPOSITORY_QUERY_SUCCESS.data)).toEqual(FORMATTED_DATA_MOCK);
    });
});
