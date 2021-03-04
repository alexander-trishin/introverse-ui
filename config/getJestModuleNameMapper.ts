import getTsconfigPaths from './getTsconfigPaths';

const getJestModuleNameMapper = () => {
    const { base, paths } = getTsconfigPaths();

    return Object.entries(paths).reduce(
        (result, [name, relative]) => ({
            ...result,
            [`^${name}(.*)$`]: `<rootDir>/${base}/${relative}$1`
        }),
        {}
    );
};

export default getJestModuleNameMapper;
