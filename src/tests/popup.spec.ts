import { startTimer, goInactive } from "../popup";

jest.mock('../popup', () => {
    const originalModule = jest.requireActual('../popup');
  
    //Mock the default export and named export 'foo'
    return {
      __esModule: true,
      ...originalModule,
      goInactive: 'mocked baz',
    };
  });
  

describe('When a user logs in', () => {
    describe('Given the login is successful', () => {
        jest.useFakeTimers();
        jest.spyOn(global, 'setTimeout')
        test('The startTimer function successfully called goInactive after 5 seconds', () => {
            expect(goInactive).toBe('mocked baz')
        });
    });
});