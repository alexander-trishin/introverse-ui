import path from 'path';

import getTsconfigPaths from './getTsconfigPaths';

const getWebpackResolveAlias = (root: string) => {
    const { base, paths } = getTsconfigPaths();

    return Object.entries(paths).reduce(
        (result, [name, relative]) => ({ ...result, [name]: path.resolve(root, base, relative) }),
        {}
    );
};

export default getWebpackResolveAlias;
