import React from 'react';

import Application from './Application';
import { render, getDataByLanguage } from 'utils/testing';

describe('<Application />', () => {
    it('Renders home page', () => {
        const { getByText } = render(<Application />, {
            routerProps: { initialEntries: ['/'], initialIndex: 0 },
        });

        const regex = new RegExp(getDataByLanguage('en').translations['under-construction'], 'i');

        expect(getByText(regex)).toBeInTheDocument();
    });

    it('Renders not found page', () => {
        const { getByText } = render(<Application />, {
            routerProps: { initialEntries: ['/not-exists'], initialIndex: 0 },
        });

        const regex = new RegExp(getDataByLanguage('en').translations['page-not-found'], 'i');
        expect(getByText(regex)).toBeInTheDocument();
    });
});
