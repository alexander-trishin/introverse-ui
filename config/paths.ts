import fs from 'fs';
import path from 'path';

const rootDirectory = fs.realpathSync(process.cwd());
const resolvePath = (relativePath: string) => path.resolve(rootDirectory, relativePath);

const getPublicUrlOrPath = (isDevelopment: boolean, envPublicUrl?: string) => {
    const stubDomain = 'https://reactjs.org';

    if (envPublicUrl) {
        envPublicUrl = envPublicUrl.endsWith('/') ? envPublicUrl : envPublicUrl + '/';

        const validPublicUrl = new URL(envPublicUrl, stubDomain);

        return isDevelopment
            ? envPublicUrl.startsWith('.')
                ? '/'
                : validPublicUrl.pathname
            : envPublicUrl;
    }

    return '/';
};

const paths = {
    base: resolvePath('.'),
    build: resolvePath('build'),
    nodeModules: resolvePath('node_modules'),
    public: resolvePath('public'),
    indexHtml: resolvePath('public/index.html'),
    src: resolvePath('src'),
    indexTsx: resolvePath('src/index.tsx'),
    tsconfig: resolvePath('tsconfig.json'),
    publicUrlOrPath: getPublicUrlOrPath(
        process.env.NODE_ENV !== 'production',
        process.env.PUBLIC_URL
    )
};

export default paths;
