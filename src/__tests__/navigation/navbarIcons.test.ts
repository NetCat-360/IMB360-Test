import {
  NB_PROFILE_SVG,
  NB_PROFILE_ACTIVE_SVG,
  NB_EXPLORE_SVG,
  NB_EXPLORE_ACTIVE_SVG,
  NB_ANALYTICS_SVG,
  NB_ANALYTICS_ACTIVE_SVG,
  NB_ASSETS_SVG,
  NB_ASSETS_ACTIVE_SVG,
  NB_CAMPAIGN_SVG,
  NB_CAMPAIGN_ACTIVE_SVG,
  navbarIconContainerStyle,
} from '../../navigation/navbarIcons';

describe('navbarIcons', () => {
  const iconExports = [
    { name: 'NB_PROFILE_SVG', value: NB_PROFILE_SVG },
    { name: 'NB_PROFILE_ACTIVE_SVG', value: NB_PROFILE_ACTIVE_SVG },
    { name: 'NB_EXPLORE_SVG', value: NB_EXPLORE_SVG },
    { name: 'NB_EXPLORE_ACTIVE_SVG', value: NB_EXPLORE_ACTIVE_SVG },
    { name: 'NB_ANALYTICS_SVG', value: NB_ANALYTICS_SVG },
    { name: 'NB_ANALYTICS_ACTIVE_SVG', value: NB_ANALYTICS_ACTIVE_SVG },
    { name: 'NB_ASSETS_SVG', value: NB_ASSETS_SVG },
    { name: 'NB_ASSETS_ACTIVE_SVG', value: NB_ASSETS_ACTIVE_SVG },
    { name: 'NB_CAMPAIGN_SVG', value: NB_CAMPAIGN_SVG },
    { name: 'NB_CAMPAIGN_ACTIVE_SVG', value: NB_CAMPAIGN_ACTIVE_SVG },
  ];

  describe.each(iconExports)('$name', ({ name: _name, value }) => {
    it('is a non-empty string containing SVG markup', () => {
      expect(typeof value).toBe('string');
      expect(value.length).toBeGreaterThan(0);
      expect(value).toContain('<svg');
      expect(value).toContain('</svg>');
    });

    it('references currentColor for dynamic tinting', () => {
      expect(value).toMatch(/currentColor|#[0-9A-Fa-f]{6}/);
    });
  });

  describe('navbarIconContainerStyle', () => {
    it('is a ViewStyle object with expected dimensions', () => {
      expect(navbarIconContainerStyle).toBeDefined();
      expect(navbarIconContainerStyle.width).toBe(32);
      expect(navbarIconContainerStyle.height).toBe(32);
    });

    it('is centered', () => {
      expect(navbarIconContainerStyle.justifyContent).toBe('center');
      expect(navbarIconContainerStyle.alignItems).toBe('center');
    });

    it('has transparent border', () => {
      expect(navbarIconContainerStyle.borderColor).toBe('transparent');
    });
  });
});
