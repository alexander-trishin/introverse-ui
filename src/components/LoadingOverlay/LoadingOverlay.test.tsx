import { render } from '@testing-library/react';

import LoadingOverlay from './LoadingOverlay';

describe('<LoadingOverlay />', () => {
    it('should match snapshot', () => {
        const { container } = render(<LoadingOverlay />);

        expect(container).toMatchSnapshot();
    });
});
