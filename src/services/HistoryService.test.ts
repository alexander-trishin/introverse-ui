import HistoryService from './HistoryService';

describe('HistoryService', () => {
    it('should return instance of history', () => {
        expect(HistoryService.instance).toBeDefined();
    });
});
