import { FetchRepositoriesQuery, Repository } from '../generated/graphql';

const REPOSITORY_TYPENAME = 'Repository';

const checkIsRepositoryTypeGuard = function (node: unknown): node is Partial<Repository> {
    return !!node && (node as Partial<Repository>).__typename === REPOSITORY_TYPENAME;
};

export const filterRepositoryData = (data: FetchRepositoriesQuery | undefined): Partial<Repository>[] => {
    if (!data) {
        return [];
    }

    const filteredData = data.search.edges
        ?.map((edge) => {
            if (edge && edge.node && checkIsRepositoryTypeGuard(edge.node)) {
                return edge.node;
            }

            return null;
        })
        .filter((node): node is NonNullable<typeof node> => node !== null);

    return filteredData || [];
};
