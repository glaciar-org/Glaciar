import { ChartzModule } from './chartz.module'

/**
 * http://localhost:9876/debug.html?spec=ChartzModule
 */
describe('ChartzModule', () => {
  let chartzModule: ChartzModule

  beforeEach(() => {
    chartzModule = new ChartzModule()
  })

  it('should create an instance', () => {
    expect(chartzModule).toBeTruthy()
  })
})
