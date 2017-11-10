import { DisasterPage } from './app.po';

describe('disaster App', function() {
  let page: DisasterPage;

  beforeEach(() => {
    page = new DisasterPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
