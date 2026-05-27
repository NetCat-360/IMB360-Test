import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  campaign: {
    companyName: 'WebHelp365',
    companyType: 'Software & Services',

    description:
      'We are looking for tech-savvy influencers to explore and review our latest CMS features. Focus on functionality, UI/UX and performance.',

    appliedCount: 27,

    timeline: '3 Months',
    deadline: 'Oct 15, 2024',
    budget: '$1.5K - $4.0K',

    requirements: {
      minFollowers: '50.0K',
      minEngagement: '4.2%',
    },

    targetAudience:
      'Influencers should have an audience primarily composed of young professionals, tech enthusiasts and digital creators interested in software, productivity, business tools and web technologies.',

    campaignCategories: [
      'Technology',
      'CMS',
      'Product Review',
      'Software',
      'WebHelp365',
    ],

    eligiblePlatforms: [
      'instagram',
      'facebook',
      'youtube',
      'tiktok',
      'linkedin',
      'pinterest',
      'telegram',
      'whatsapp',
    ],

    deliverables: [
      '1x In-depth YouTube video review (min 8 mins)',
      '3x High-fidelity Instagram Stories with direct links',
      'Functionality walkthrough of WebHelp365 CMS',
      'Authentic UX feedback & product critique',
    ],
  },
}

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,

  reducers: {
    updateCampaign: (
      state,
      action
    ) => {
      state.campaign = {
        ...state.campaign,
        ...action.payload,
      }
    },
  },
})

export const {
  updateCampaign,
} = campaignSlice.actions

export default campaignSlice.reducer