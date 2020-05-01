import React from 'react';
import { cleanup, render } from '@testing-library/react';

import HomePage from './HomePage';

describe('<HomePage />', () => {
    afterEach(cleanup);

    it('Renders any text', () => {
        const { getByText } = render(<HomePage />);
        expect(getByText(/\w+/gm)).toBeInTheDocument();
    });
});
