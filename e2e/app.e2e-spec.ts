import { EmarketDemoPage } from './app.po';

describe('emarket-demo App', () => {
  let page: EmarketDemoPage;

  beforeEach(() => {
    page = new EmarketDemoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
