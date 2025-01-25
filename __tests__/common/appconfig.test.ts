import {getConfig} from "../../src/common";

describe('getConfig', () => {
  it('populates app config correctly', () => {
    const testConfig = getConfig();
    expect(testConfig.nodeEnv).toEqual('test');
    expect(testConfig.dbPassword).toEqual('testpassword');
  });
});