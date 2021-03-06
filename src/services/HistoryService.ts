import { History, createBrowserHistory } from 'history';

class HistoryService {
    private static history?: History;

    static get instance() {
        return (this.history ??= createBrowserHistory({
            basename: process.env.PUBLIC_URL ?? '/'
        }));
    }
}

export default HistoryService;
