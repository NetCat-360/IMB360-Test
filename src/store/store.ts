import {
    configureStore,
  } from '@reduxjs/toolkit'
  
  import authReducer
  from './slices/authSlice'

  import assetReducer
  from "./slices/assetSlice";
  
  import campaignReducer
  from './slices/campaignSlice'

  import addAssetReducer from "./slices/addAssetSlice";

  import overviewReducer
from "./slices/OverviewSlice";

  import analyticsReducer
from "./slices/analyticsSlice";

import brandOverviewReducer from "./slices/Brand/brandOverviewSlice";
import brandCampaignReducer
from "./slices/Brand/brandCampaignSlice";
import brandCampaignBidsReducer
from "./slices/Brand/brandCampaignBidsSlice";
import totalSpendReducer
from "./slices/Brand/totalSpendSlice";
import createCampaignReducer
from "./slices/Brand/createCampaignSlice";
import brandCampaignTabReducer
from "./slices/Brand/brandCampaignTabSlice";
  export const store =
    configureStore({
      reducer: {
        auth:
          authReducer,
  
        campaign:
          campaignReducer,
          
        asset: assetReducer,
        addAsset: addAssetReducer,
        overview: overviewReducer,
        analytics: analyticsReducer, 
        brandOverview: brandOverviewReducer,
        brandCampaign: brandCampaignReducer,
        brandCampaignBids: brandCampaignBidsReducer,
        totalSpend: totalSpendReducer,
        brandCampaignTab: brandCampaignTabReducer,
        createCampaign: createCampaignReducer,
      },
    })
  
  export type RootState =
    ReturnType<
      typeof store.getState
    >
  
  export type AppDispatch =
    typeof store.dispatch