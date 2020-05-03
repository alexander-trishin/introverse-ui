import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouterProps } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';

import { i18n } from 'utils';

const ProviderWrapper: React.FC = ({ children, ...rest }) => (
    <MemoryRouter {...rest}>
        <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </MemoryRouter>
);

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
    routerProps?: MemoryRouterProps;
}

const customRender = (ui: React.ReactElement, options: CustomRenderOptions = {}) => {
    const { routerProps, ...rest } = options;
    return render(<ProviderWrapper {...routerProps}>{ui}</ProviderWrapper>, rest);
};

export default customRender;
