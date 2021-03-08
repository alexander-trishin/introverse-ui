import { render, waitFor } from '@testing-library/react';
import { History, createMemoryHistory } from 'history';

import { Routes } from 'common/routes';
import { HistoryService } from 'services';

import Application from './Application';

jest.mock('components/LoadingOverlay/LoadingOverlay', () => () => <div data-testid="loading" />);
jest.mock('pages/MainPage/MainPage', () => () => <div data-testid="main" />);
jest.mock('pages/NotFoundPage/NotFoundPage', () => () => {
    throw new Error('test');
});

describe('<Application />', () => {
    let history: jest.SpyInstance<History>;

    beforeEach(() => {
        history = jest.spyOn(HistoryService, 'instance', 'get');
    });

    it('should render suspense fallback', () => {
        const { getByTestId } = render(<Application />);

        expect(getByTestId('loading')).toBeInTheDocument();
    });

    it('should render home page', async () => {
        const historyMock = createMemoryHistory({
            initialEntries: [Routes.Page.Home]
        });

        history.mockReturnValue(historyMock);

        const { getByTestId } = render(<Application />);

        await waitFor(() => {
            expect(getByTestId('main')).toBeInTheDocument();
        });
    });

    it('should redirect to crush page in case of unhandled error', async () => {
        const historyMock = createMemoryHistory({
            initialEntries: [Routes.Error.NotFound]
        });

        history.mockReturnValue(historyMock);

        render(<Application />);

        await waitFor(() => {
            expect(historyMock.location.pathname).toBe(Routes.Error.SomethingWentWrong);
        });
    });
});
