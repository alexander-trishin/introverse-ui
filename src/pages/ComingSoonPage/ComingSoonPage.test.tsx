import { render } from '@testing-library/react';

import ComingSoonPage from './ComingSoonPage';

describe('<ComingSoonPage />', () => {
    it('should show a message', () => {
        const { getByText } = render(<ComingSoonPage />);

        expect(getByText(/soon/i)).toBeInTheDocument();
    });
});
