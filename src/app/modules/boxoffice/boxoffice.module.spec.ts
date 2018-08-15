import { BoxofficeModule } from './boxoffice.module';

describe('BoxofficeModule', () => {
  let boxofficeModule: BoxofficeModule;

  beforeEach(() => {
    boxofficeModule = new BoxofficeModule();
  });

  it('should create an instance', () => {
    expect(boxofficeModule).toBeTruthy();
  });
});
