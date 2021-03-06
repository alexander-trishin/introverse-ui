import { render } from '@testing-library/react';

import SomethingWentWrongPage from './SomethingWentWrongPage';

describe('<SomethingWentWrongPage />', () => {
    it('should show error information', () => {
        const { getByText } = render(
            <SomethingWentWrongPage
                error={new Error('test-error')}
                errorInfo={{ componentStack: 'test-stack' }}
            />
        );

        expect(getByText(/test-error/i)).toBeInTheDocument();
        expect(getByText(/test-stack/i)).toBeInTheDocument();
    });
});
