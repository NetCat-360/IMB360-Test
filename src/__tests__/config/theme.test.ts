import { Colors } from '../../config/theme';

describe('Colors', () => {
  it('has brand colors', () => {
    expect(Colors.teal).toBe('#00b9c0');
    expect(Colors.lime).toBe('#b6d82c');
    expect(Colors.cyan).toBe('#00D5FF');
  });

  it('has background colors', () => {
    expect(Colors.bgBlack).toBe('#000000');
    expect(Colors.bgSurface).toBe('#0A0A0A');
    expect(Colors.bgCard).toBe('#0D0D0D');
    expect(Colors.bgInput).toBe('#1C1C1E');
    expect(Colors.bgInputBorder).toBe('#2C2C2E');
    expect(Colors.bgModalOverlay).toBe('rgba(0,0,0,0.8)');
    expect(Colors.bgModalSheet).toBe('#121214');
  });

  it('has text colors', () => {
    expect(Colors.textPrimary).toBe('#FFFFFF');
    expect(Colors.textSecondary).toBe('#AAAAAA');
    expect(Colors.textMuted).toBe('#888888');
    expect(Colors.textDim).toBe('#666666');
  });

  it('has border colors', () => {
    expect(Colors.borderDefault).toBe('#1C1C1E');
    expect(Colors.borderStrong).toBe('#2C2C2E');
    expect(Colors.borderTeal).toBe('#00b9c0');
    expect(Colors.borderCyan).toBe('#00D5FF');
  });

  it('has status colors', () => {
    expect(Colors.success).toBe('#22C55E');
    expect(Colors.error).toBe('#FF3B30');
    expect(Colors.pending).toBe('#FF4D4D');
  });

  it('has social platform colors', () => {
    expect(Colors.instagram).toBe('#E1306C');
    expect(Colors.youtube).toBe('#FF0000');
    expect(Colors.facebook).toBe('#1877F2');
    expect(Colors.twitter).toBe('#1DA1F2');
  });

  it('all color values are valid hex or rgba strings', () => {
    const hexOrRgba = /^(#[0-9A-Fa-f]{6}|rgba?\(.*\))$/;
    for (const value of Object.values(Colors)) {
      expect(value).toMatch(hexOrRgba);
    }
  });
});
