import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Application from './Application';

describe('<Application />', () => {
    it('Renders home page', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Application />
            </MemoryRouter>
        );

        expect(getByText(/work\sin\sprogress/i)).toBeInTheDocument();
    });

    it('Renders not found page', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/not-exists']} initialIndex={0}>
                <Application />
            </MemoryRouter>
        );

        expect(getByText('404')).toBeInTheDocument();
    });
});
