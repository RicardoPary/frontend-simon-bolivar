import { PagesModule } from './pages.module';

describe('PagesModule', () => {
    let layoutModule: PagesModule;

    beforeEach(() => {
        layoutModule = new PagesModule();
    });

    it('should create an instance', () => {
        expect(layoutModule).toBeTruthy();
    });
});
