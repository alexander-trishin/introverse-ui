import { History, createBrowserHistory } from 'history';

class HistoryService {
    private static history?: History;

    static get instance() {
        if (!this.history) {
            this.history = createBrowserHistory({
                basename: process.env.PUBLIC_URL ?? '/'
            });
        }
        return this.history;
    }
}

export default HistoryService;
