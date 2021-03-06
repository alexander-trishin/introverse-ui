import type { ErrorInfo, FC } from 'react';

interface SomethingWentWrongPageProps {
    error?: Error;
    errorInfo?: ErrorInfo;
}

const SomethingWentWrongPage: FC<SomethingWentWrongPageProps> = props => {
    const { error, errorInfo } = props;

    return (
        <>
            <p>Something went wrong...</p>
            {error && (
                <>
                    <br />
                    <p>Error:</p>
                    <p>{error.stack}</p>
                </>
            )}
            {errorInfo?.componentStack && (
                <>
                    <br />
                    <p>Stack:</p>
                    <p>{errorInfo.componentStack}</p>
                </>
            )}
        </>
    );
};

export default SomethingWentWrongPage;
