import { render } from '@testing-library/react';

import ErrorBoundary from './ErrorBoundary';

const Throw = () => {
    throw new Error('');
};

describe('<ErrorBoundary />', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(jest.fn());
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should render fallback on error', () => {
        const { getByText } = render(
            <ErrorBoundary>
                <Throw />
            </ErrorBoundary>
        );

        expect(getByText(ErrorBoundary.defaultProps.fallback)).toBeInTheDocument();
    });

    it('should call onError handler on error', () => {
        const onErrorMock = jest.fn();

        render(
            <ErrorBoundary onError={onErrorMock}>
                <Throw />
            </ErrorBoundary>
        );

        expect(onErrorMock).toBeCalledTimes(1);
    });
});
