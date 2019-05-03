import { ConfigModule } from './config.module'

/**
 * http://localhost:9876/debug.html?spec=ConfigModule
 */
describe('ConfigModule', () => {
  let configModule: ConfigModule

  beforeEach(() => {
    configModule = new ConfigModule()
  })

  it('should create an instance', () => {
    expect(configModule).toBeTruthy()
  })
})
