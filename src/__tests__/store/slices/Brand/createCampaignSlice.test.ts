import createCampaignReducer, {
  setCampaignName,
  setCampaignType,
  setDescription,
  setBrandName,
  setIndustry,
  setTargetPlatform,
  toggleContentType,
  setCampaignTags,
  setBudget,
  setBudgetType,
  setStartDate,
  setEndDate,
  setCampaignTimeline,
  setMinFollowers,
  setEngagementRate,
  setTargetAudience,
  setBrandGuidelines,
  setExpectedDeliverables,
  toggleRequireApproval,
  toggleRequireExclusivity,
  setCurrentStep,
  nextStep,
  previousStep,
  toggleCampaignDropdown,
  closeCampaignDropdown,
  togglePlatformDropdown,
  closePlatformDropdown,
  toggleBudgetTypeDropdown,
  closeBudgetTypeDropdown,
  toggleTimelineDropdown,
  closeTimelineDropdown,
  toggleFollowersDropdown,
  closeFollowersDropdown,
  resetCampaignForm,
} from '../../../../store/slices/Brand/createCampaignSlice';

describe('createCampaignSlice', () => {
  it('should return initial state', () => {
    const state = createCampaignReducer(undefined, { type: 'unknown' });
    expect(state.campaignName).toBe('');
    expect(state.campaignType).toBe('');
    expect(state.currentStep).toBe(1);
    expect(state.requireApproval).toBe(false);
    expect(state.requireExclusivity).toBe(false);
    expect(state.showCampaignDropdown).toBe(false);
    expect(state.selectedContentTypes).toEqual([]);
    expect(state.minFollowers).toBe('1K+');
  });

  describe('Step 1', () => {
    it('should handle setCampaignName', () => {
      const state = createCampaignReducer(undefined, setCampaignName('Summer Campaign'));
      expect(state.campaignName).toBe('Summer Campaign');
    });

    it('should handle setCampaignType and close dropdown', () => {
      const withDropdownOpen = createCampaignReducer(undefined, toggleCampaignDropdown());
      const state = createCampaignReducer(withDropdownOpen, setCampaignType('Brand Awareness'));
      expect(state.campaignType).toBe('Brand Awareness');
      expect(state.showCampaignDropdown).toBe(false);
    });

    it('should handle setDescription', () => {
      const state = createCampaignReducer(undefined, setDescription('Campaign description'));
      expect(state.description).toBe('Campaign description');
    });

    it('should handle setBrandName', () => {
      const state = createCampaignReducer(undefined, setBrandName('IMB360'));
      expect(state.brandName).toBe('IMB360');
    });

    it('should handle setIndustry', () => {
      const state = createCampaignReducer(undefined, setIndustry('Technology'));
      expect(state.industry).toBe('Technology');
    });
  });

  describe('Step 2', () => {
    it('should handle setTargetPlatform and close dropdown', () => {
      const withDropdownOpen = createCampaignReducer(undefined, togglePlatformDropdown());
      const state = createCampaignReducer(withDropdownOpen, setTargetPlatform('Instagram'));
      expect(state.targetPlatform).toBe('Instagram');
      expect(state.showPlatformDropdown).toBe(false);
    });

    it('should handle toggleContentType to add', () => {
      const state = createCampaignReducer(undefined, toggleContentType('Video'));
      expect(state.selectedContentTypes).toEqual(['Video']);
    });

    it('should handle toggleContentType to remove', () => {
      const added = createCampaignReducer(undefined, toggleContentType('Video'));
      const state = createCampaignReducer(added, toggleContentType('Video'));
      expect(state.selectedContentTypes).toEqual([]);
    });

    it('should handle toggleContentType with multiple items', () => {
      const withOne = createCampaignReducer(undefined, toggleContentType('Video'));
      const withTwo = createCampaignReducer(withOne, toggleContentType('Image'));
      const state = createCampaignReducer(withTwo, toggleContentType('Carousel'));
      expect(state.selectedContentTypes).toEqual(['Video', 'Image', 'Carousel']);
      const removed = createCampaignReducer(state, toggleContentType('Image'));
      expect(removed.selectedContentTypes).toEqual(['Video', 'Carousel']);
    });

    it('should handle setCampaignTags', () => {
      const state = createCampaignReducer(undefined, setCampaignTags('tech, review'));
      expect(state.campaignTags).toBe('tech, review');
    });
  });

  describe('Step 3', () => {
    it('should handle setBudget', () => {
      const state = createCampaignReducer(undefined, setBudget('5000'));
      expect(state.budget).toBe('5000');
    });

    it('should handle setBudgetType and close dropdown', () => {
      const withDropdownOpen = createCampaignReducer(undefined, toggleBudgetTypeDropdown());
      const state = createCampaignReducer(withDropdownOpen, setBudgetType('Fixed'));
      expect(state.budgetType).toBe('Fixed');
      expect(state.showBudgetTypeDropdown).toBe(false);
    });

    it('should handle setStartDate', () => {
      const state = createCampaignReducer(undefined, setStartDate('01/01/2026'));
      expect(state.startDate).toBe('01/01/2026');
    });

    it('should handle setEndDate', () => {
      const state = createCampaignReducer(undefined, setEndDate('31/01/2026'));
      expect(state.endDate).toBe('31/01/2026');
    });

    it('should handle setCampaignTimeline and close dropdown', () => {
      const withDropdownOpen = createCampaignReducer(undefined, toggleTimelineDropdown());
      const state = createCampaignReducer(withDropdownOpen, setCampaignTimeline('1 Month'));
      expect(state.campaignTimeline).toBe('1 Month');
      expect(state.showTimelineDropdown).toBe(false);
    });
  });

  describe('Step 4', () => {
    it('should handle setMinFollowers and close dropdown', () => {
      const withDropdownOpen = createCampaignReducer(undefined, toggleFollowersDropdown());
      const state = createCampaignReducer(withDropdownOpen, setMinFollowers('10K+'));
      expect(state.minFollowers).toBe('10K+');
      expect(state.showFollowersDropdown).toBe(false);
    });

    it('should handle setEngagementRate', () => {
      const state = createCampaignReducer(undefined, setEngagementRate('3.5'));
      expect(state.engagementRate).toBe('3.5');
    });

    it('should handle setTargetAudience', () => {
      const state = createCampaignReducer(undefined, setTargetAudience('Tech enthusiasts'));
      expect(state.targetAudience).toBe('Tech enthusiasts');
    });

    it('should handle setBrandGuidelines', () => {
      const state = createCampaignReducer(undefined, setBrandGuidelines('Use logo'));
      expect(state.brandGuidelines).toBe('Use logo');
    });

    it('should handle setExpectedDeliverables', () => {
      const state = createCampaignReducer(undefined, setExpectedDeliverables('3 posts'));
      expect(state.expectedDeliverables).toBe('3 posts');
    });

    it('should handle toggleRequireApproval', () => {
      const state = createCampaignReducer(undefined, toggleRequireApproval());
      expect(state.requireApproval).toBe(true);
      const toggledBack = createCampaignReducer(state, toggleRequireApproval());
      expect(toggledBack.requireApproval).toBe(false);
    });

    it('should handle toggleRequireExclusivity', () => {
      const state = createCampaignReducer(undefined, toggleRequireExclusivity());
      expect(state.requireExclusivity).toBe(true);
    });
  });

  describe('Stepper', () => {
    it('should handle setCurrentStep', () => {
      const state = createCampaignReducer(undefined, setCurrentStep(3));
      expect(state.currentStep).toBe(3);
    });

    it('should handle nextStep from step 1 to 2', () => {
      const state = createCampaignReducer(undefined, nextStep());
      expect(state.currentStep).toBe(2);
    });

    it('should not increment nextStep beyond 4', () => {
      const atStep4 = createCampaignReducer(undefined, setCurrentStep(4));
      const state = createCampaignReducer(atStep4, nextStep());
      expect(state.currentStep).toBe(4);
    });

    it('should handle previousStep from step 2 to 1', () => {
      const atStep2 = createCampaignReducer(undefined, setCurrentStep(2));
      const state = createCampaignReducer(atStep2, previousStep());
      expect(state.currentStep).toBe(1);
    });

    it('should not decrement previousStep below 1', () => {
      const state = createCampaignReducer(undefined, previousStep());
      expect(state.currentStep).toBe(1);
    });
  });

  describe('Dropdowns', () => {
    it('should handle toggleCampaignDropdown', () => {
      const state = createCampaignReducer(undefined, toggleCampaignDropdown());
      expect(state.showCampaignDropdown).toBe(true);
      const toggled = createCampaignReducer(state, toggleCampaignDropdown());
      expect(toggled.showCampaignDropdown).toBe(false);
    });

    it('should handle closeCampaignDropdown', () => {
      const opened = createCampaignReducer(undefined, toggleCampaignDropdown());
      const state = createCampaignReducer(opened, closeCampaignDropdown());
      expect(state.showCampaignDropdown).toBe(false);
    });

    it('should handle togglePlatformDropdown', () => {
      const state = createCampaignReducer(undefined, togglePlatformDropdown());
      expect(state.showPlatformDropdown).toBe(true);
    });

    it('should handle closePlatformDropdown', () => {
      const opened = createCampaignReducer(undefined, togglePlatformDropdown());
      const state = createCampaignReducer(opened, closePlatformDropdown());
      expect(state.showPlatformDropdown).toBe(false);
    });

    it('should handle toggleBudgetTypeDropdown', () => {
      const state = createCampaignReducer(undefined, toggleBudgetTypeDropdown());
      expect(state.showBudgetTypeDropdown).toBe(true);
    });

    it('should handle closeBudgetTypeDropdown', () => {
      const opened = createCampaignReducer(undefined, toggleBudgetTypeDropdown());
      const state = createCampaignReducer(opened, closeBudgetTypeDropdown());
      expect(state.showBudgetTypeDropdown).toBe(false);
    });

    it('should handle toggleTimelineDropdown', () => {
      const state = createCampaignReducer(undefined, toggleTimelineDropdown());
      expect(state.showTimelineDropdown).toBe(true);
    });

    it('should handle closeTimelineDropdown', () => {
      const opened = createCampaignReducer(undefined, toggleTimelineDropdown());
      const state = createCampaignReducer(opened, closeTimelineDropdown());
      expect(state.showTimelineDropdown).toBe(false);
    });

    it('should handle toggleFollowersDropdown', () => {
      const state = createCampaignReducer(undefined, toggleFollowersDropdown());
      expect(state.showFollowersDropdown).toBe(true);
    });

    it('should handle closeFollowersDropdown', () => {
      const opened = createCampaignReducer(undefined, toggleFollowersDropdown());
      const state = createCampaignReducer(opened, closeFollowersDropdown());
      expect(state.showFollowersDropdown).toBe(false);
    });
  });

  describe('Reset', () => {
    it('should handle resetCampaignForm', () => {
      const modified = createCampaignReducer(undefined, setCampaignName('Test'));
      const toggled = createCampaignReducer(modified, toggleRequireApproval());
      const stepped = createCampaignReducer(toggled, nextStep());
      const state = createCampaignReducer(stepped, resetCampaignForm());
      expect(state.campaignName).toBe('');
      expect(state.requireApproval).toBe(false);
      expect(state.currentStep).toBe(1);
      expect(state.showCampaignDropdown).toBe(false);
    });
  });
});
