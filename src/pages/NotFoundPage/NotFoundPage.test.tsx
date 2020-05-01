import React from 'react';
import { cleanup, render } from '@testing-library/react';

import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
    afterEach(cleanup);

    it('Renders any text', () => {
        const { getByText } = render(<NotFoundPage />);
        expect(getByText(/\w+/gm)).toBeInTheDocument();
    });
});
