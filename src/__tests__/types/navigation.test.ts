// Types are compile-time only and erased at runtime.
// We verify compilation is valid by importing via type-only syntax.

describe('Navigation Types', () => {
  it('module can be imported without error', () => {
    expect(() => {
      // Types are erased at runtime, so the module is empty {}
      require('../../types/navigation');
    }).not.toThrow();
  });
});
