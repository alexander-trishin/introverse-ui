import { render } from '@testing-library/react';

import Application from './Application';

describe('<Application />', () => {
    it('should match snapshot', () => {
        const { container } = render(<Application />);

        expect(container).toMatchSnapshot();
    });
});
