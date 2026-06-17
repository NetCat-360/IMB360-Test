// Types are compile-time only and erased at runtime.
// We verify compilation is valid by importing via type-only syntax.

describe('Global Types', () => {
  it('module can be imported without error', () => {
    expect(() => {
      // Types are erased at runtime, so the module is empty {}
      require('../../types/global');
    }).not.toThrow();
  });
});
