import React, {
  useRef,
  useState,
  useReducer,
  useCallback,
} from "react";import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  Pressable,
  Image,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RootState } from "../../../store/store";
import {
  updateField,
  resetAssetForm,
} from "../../../store/slices/addAssetSlice";
import ScreenHeader from "../../../components/ScreenHeader";
import styles from "./AddAssetsStyles";

import { verticalScale } from "../../../utils/scaling";

import { AppNavigationProp } from "../../../types/navigation";

type Props = {
  navigation: AppNavigationProp<"AddAssets">;
};

const categories = [
  "Camera",
  "Drone",
  "Laptop",
  "Lighting",
  "Microphone",
  "Studio",
  "Vehicle",
  "Fashion",
  "Sports",
  "Other",
];

const conditions = ["Excellent", "Good", "Fair"];

const amenitiesList = [
  "Warranty Included",
  "Free Delivery",
  "Setup Assistance",
  "Insurance Covered",
  "Backup Equipment",
  "24/7 Support",
  "Usage Training",
  "Accessories Included",
];

const defaultCheckboxStyle = [styles.checkbox];
const selectedCheckboxStyle = [styles.checkbox, styles.checkboxSelected];

function StepperIndicator({ step }: { step: number }) {
  return (
    <View style={styles.stepperContainer}>
      {[1, 2, 3].map(item => (
        <View key={item} style={styles.stepRow}>
          <View style={[styles.stepCircle, step >= item && styles.activeStep]}>
            <Text style={styles.stepText}>{item}</Text>
          </View>
          {item !== 3 && <View style={[styles.stepLine, step > item && styles.activeLine]} />}
        </View>
      ))}
    </View>
  );
}

function StepOneForm({ asset, handleChange, showCategories, setShowCategories, renderCategoryItem, showConditions, setShowConditions, renderConditionItem }: {
  asset: any; handleChange: (key: string, value: any) => void;
  showCategories: boolean; setShowCategories: (v: boolean) => void; renderCategoryItem: (info: { item: string }) => React.JSX.Element;
  showConditions: boolean; setShowConditions: (v: boolean) => void; renderConditionItem: (info: { item: string }) => React.JSX.Element;
}) {
  return (
    <>
      <Text style={styles.sectionHeading}>Basic Information</Text>
      <Text style={styles.label}>Asset Name<Text style={styles.required}> *</Text></Text>
      <TextInput value={asset.assetName} onChangeText={(text) => handleChange("assetName", text)} placeholder="Asset Name" placeholderTextColor="#8E8E8E" style={styles.input} />
      <Pressable style={styles.dropdown} onPress={() => setShowCategories(!showCategories)}>
        <Text style={styles.dropdownText}>{asset.category || "Select Category"}</Text>
        <Image source={require("../../../assets/images/downarrow.png")} style={styles.arrow} />
      </Pressable>
      {showCategories && (
        <View style={styles.dropdownContainer}>
          <FlatList nestedScrollEnabled showsVerticalScrollIndicator={false} data={categories} keyExtractor={(item) => item} renderItem={renderCategoryItem} />
        </View>
      )}
      <Text style={styles.label}>Description<Text style={styles.required}> *</Text></Text>
      <View style={styles.descriptionBox}>
        <TextInput value={asset.description} onChangeText={(text) => handleChange("description", text)} multiline maxLength={100} textAlignVertical="top" placeholder="Describe your asset" placeholderTextColor="#8E8E8E" style={styles.textArea} />
        <Text style={styles.counter}>{asset.description.length}/100</Text>
      </View>
      <Text style={styles.maxText}>Maximum 100 words.</Text>
      <Text style={styles.sectionHeading}>Location Details</Text>
      <Text style={styles.label}>Address<Text style={styles.required}> *</Text></Text>
      <TextInput value={asset.address} onChangeText={(text) => handleChange("address", text)} placeholder="Street address" placeholderTextColor="#8E8E8E" style={styles.input} />
      <View style={styles.row}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>City<Text style={styles.required}> *</Text></Text>
          <TextInput value={asset.city} onChangeText={(text) => handleChange("city", text)} placeholder="City" placeholderTextColor="#8E8E8E" style={styles.input} />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>PIN Code<Text style={styles.required}> *</Text></Text>
          <TextInput value={asset.pinCode} onChangeText={(text) => handleChange("pinCode", text)} keyboardType="numeric" placeholder="PIN code" placeholderTextColor="#8E8E8E" style={styles.input} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>State<Text style={styles.required}> *</Text></Text>
          <TextInput value={asset.state} onChangeText={(text) => handleChange("state", text)} placeholder="State" placeholderTextColor="#8E8E8E" style={styles.input} />
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Country<Text style={styles.required}> *</Text></Text>
          <TextInput value={asset.country} onChangeText={(text) => handleChange("country", text)} placeholder="Country" placeholderTextColor="#8E8E8E" style={styles.input} />
        </View>
      </View>
      <Text style={styles.sectionHeading}>Asset Details</Text>
      <Text style={styles.label}>Brand/Model<Text style={styles.required}> *</Text></Text>
      <TextInput value={asset.brandModel} onChangeText={(text) => handleChange("brandModel", text)} placeholder="e.g., Canon EOS R5" placeholderTextColor="#8E8E8E" style={styles.input} />
      <View style={styles.row}>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Condition<Text style={styles.required}> *</Text></Text>
          <Pressable style={styles.dropdown} onPress={() => setShowConditions(!showConditions)}>
            <Text style={styles.dropdownText}>{asset.condition || "Select Condition"}</Text>
            <Image source={require("../../../assets/images/downarrow.png")} style={styles.arrow} />
          </Pressable>
          {showConditions && (
            <View style={styles.dropdownContainer}>
              <FlatList nestedScrollEnabled showsVerticalScrollIndicator={false} data={conditions} keyExtractor={(item) => item} renderItem={renderConditionItem} />
            </View>
          )}
        </View>
        <View style={styles.halfContainer}>
          <Text style={styles.label}>Year/Age<Text style={styles.required}> *</Text></Text>
          <TextInput value={asset.yearAge} onChangeText={(text) => handleChange("yearAge", text)} placeholder="e.g., 2023 or 1" placeholderTextColor="#8E8E8E" style={styles.input} />
        </View>
      </View>
    </>
  );
}

function StepOneButtons({ onNext }: { onNext: () => void }) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: verticalScale(5) }}>
      <Pressable style={styles.createButton} onPress={onNext}>
        <Text style={styles.createText}>Next</Text>
      </Pressable>
    </View>
  );
}

function StepTwoForm({ asset, handleChange, showAmenities, setShowAmenities, renderAmenityItem }: {
  asset: any; handleChange: (key: string, value: any) => void;
  showAmenities: boolean; setShowAmenities: (v: boolean) => void; renderAmenityItem: (info: { item: string }) => React.JSX.Element;
}) {
  return (
    <>
      <Text style={styles.sectionHeading}>Pricing</Text>
      <Text style={styles.label}>Price per day<Text style={styles.required}> *</Text></Text>
      <TextInput value={asset.pricePerDay} onChangeText={(text) => handleChange("pricePerDay", text)} keyboardType="numeric" placeholder="₱" placeholderTextColor="#8E8E8E" style={styles.input} />
      <Text style={styles.sectionHeading}>Amenities & Features</Text>
      <Pressable style={styles.dropdown} onPress={() => setShowAmenities(!showAmenities)}>
        <Text style={styles.dropdownText}>{asset.amenities.length ? `${asset.amenities.length} Selected` : "Select Amenities"}</Text>
        <Image source={require("../../../assets/images/downarrow.png")} style={styles.arrow} />
      </Pressable>
      {showAmenities && (
        <View style={styles.amenitiesContainer}>
          <FlatList nestedScrollEnabled showsVerticalScrollIndicator={false} data={amenitiesList} keyExtractor={(item) => item} renderItem={renderAmenityItem} />
        </View>
      )}
      <Text style={styles.sectionHeading}>Images</Text>
      <Text style={styles.label}>Cover Image</Text>
      <Pressable style={styles.uploadBox}>
        <Image source={require("../../../assets/images/gallery.png")} style={styles.uploadIcon} />
        <Text style={styles.uploadText}>{asset.coverImage ? "Image Selected" : "Click to upload cover image"}</Text>
      </Pressable>
      <Text style={styles.uploadInfo}>Max. size to upload is 50MB</Text>
      <Text style={styles.label}>Gallery</Text>
      <Pressable style={styles.uploadBox}>
        <Image source={require("../../../assets/images/gallery.png")} style={styles.uploadIcon} />
        <Text style={styles.uploadText}>{asset.gallery.length ? `${asset.gallery.length} files selected` : "Click to upload images or videos"}</Text>
      </Pressable>
      <Text style={styles.uploadInfo}>Max. 6 images or videos can be uploaded up to 50MB each</Text>
    </>
  );
}

function StepTwoButtons({ onPrevious, onNext }: { onPrevious: () => void; onNext: () => void }) {
  return (
    <View style={styles.buttonRow}>
      <Pressable style={styles.cancelButton} onPress={onPrevious}><Text style={styles.cancelText}>Previous</Text></Pressable>
      <Pressable style={styles.createButton} onPress={onNext}><Text style={styles.createText}>Next</Text></Pressable>
    </View>
  );
}

function StepThreeForm({ asset, handleChange, showFromDate, setShowFromDate, showToDate, setShowToDate, today, handleCreateAsset, onPrevious }: {
  asset: any; handleChange: (key: string, value: any) => void;
  showFromDate: boolean; setShowFromDate: (v: boolean) => void;
  showToDate: boolean; setShowToDate: (v: boolean) => void;
  today: Date; handleCreateAsset: () => void; onPrevious: () => void;
}) {
  return (
    <>
      <Text style={styles.sectionHeading}>Availability</Text>
      <Text style={styles.label}>Available From<Text style={styles.required}> *</Text></Text>
      <Pressable style={styles.dateInput} onPress={() => setShowFromDate(true)}>
        {showFromDate && (
          <DateTimePicker value={asset.availableFrom ? new Date(asset.availableFrom) : today} mode="date" minimumDate={today} display="default" onChange={(event, selectedDate) => { setShowFromDate(false); if (selectedDate) { handleChange("availableFrom", selectedDate.toISOString().split("T")[0]); } }} />
        )}
        <Text style={styles.dateText}>{asset.availableFrom || "Select Date"}</Text>
        <Image source={require("../../../assets/images/calendar.png")} style={styles.calendarIcon} />
      </Pressable>
      <Text style={styles.helperText}>Cannot select past dates.</Text>
      <Text style={[styles.label, { marginTop: verticalScale(14) }]}>Available To<Text style={styles.required}> *</Text></Text>
      <Pressable onPress={() => setShowToDate(true)} style={styles.dateInput}>
        {showToDate && (
          <DateTimePicker value={asset.availableTo ? new Date(asset.availableTo) : today} mode="date" minimumDate={asset.availableFrom ? new Date(asset.availableFrom) : today} display="default" onChange={(event, selectedDate) => { setShowToDate(false); if (selectedDate) { handleChange("availableTo", selectedDate.toISOString().split("T")[0]); } }} />
        )}
        <Text style={styles.placeholderText}>{asset.availableTo || "Select Date"}</Text>
        <Image source={require("../../../assets/images/calendar.png")} style={styles.calendarIcon} />
      </Pressable>
      <Text style={[styles.sectionHeading, { marginTop: verticalScale(18) }]}>Additional Information</Text>
      <Text style={styles.label}>What Facility You Provide with This Asset</Text>
      <View style={styles.descriptionBox}>
        <TextInput value={asset.facilities} onChangeText={(text) => handleChange("facilities", text)} multiline maxLength={100} textAlignVertical="top" placeholder="List what you provide with this asset" placeholderTextColor="#8E8E8E" style={styles.textArea} />
        <Text style={styles.counter}>{asset.facilities.length}/100</Text>
      </View>
      <Text style={styles.maxText}>Maximum 100 words.</Text>
      <Text style={[styles.label, { marginTop: verticalScale(10) }]}>Lease/Rent Rules</Text>
      <View style={styles.descriptionBox}>
        <TextInput value={asset.leaseRules} onChangeText={(text) => handleChange("leaseRules", text)} multiline maxLength={100} textAlignVertical="top" placeholder="Any specific rules for renters" placeholderTextColor="#8E8E8E" style={styles.textArea} />
        <Text style={styles.counter}>{asset.leaseRules.length}/100</Text>
      </View>
      <Text style={styles.maxText}>Maximum 100 words.</Text>
      <Text style={styles.warningText}>* A fee of 10 points will be automatically deducted from your balance for asset creation.</Text>
      <View style={styles.buttonRow}>
        <Pressable style={styles.cancelButton} onPress={onPrevious}><Text style={styles.cancelText}>Previous</Text></Pressable>
        <Pressable style={styles.createButton} onPress={handleCreateAsset}><Text style={styles.createText}>Create Asset</Text></Pressable>
      </View>
    </>
  );
}

type DropdownsAction =
  | { type: 'SET_SHOW_CATEGORIES'; payload: boolean }
  | { type: 'SET_SHOW_CONDITIONS'; payload: boolean }
  | { type: 'SET_SHOW_AMENITIES'; payload: boolean };

interface DropdownsState {
  showCategories: boolean;
  showConditions: boolean;
  showAmenities: boolean;
}

const initialDropdownsState: DropdownsState = {
  showCategories: false,
  showConditions: false,
  showAmenities: false,
};

function dropdownsReducer(state: DropdownsState, action: DropdownsAction): DropdownsState {
  switch (action.type) {
    case 'SET_SHOW_CATEGORIES':
      return { ...state, showCategories: action.payload };
    case 'SET_SHOW_CONDITIONS':
      return { ...state, showConditions: action.payload };
    case 'SET_SHOW_AMENITIES':
      return { ...state, showAmenities: action.payload };
    default:
      return state;
  }
}

type DatePickersAction =
  | { type: 'SET_SHOW_FROM_DATE'; payload: boolean }
  | { type: 'SET_SHOW_TO_DATE'; payload: boolean };

interface DatePickersState {
  showFromDate: boolean;
  showToDate: boolean;
}

const initialDatePickersState: DatePickersState = {
  showFromDate: false,
  showToDate: false,
};

function datePickersReducer(state: DatePickersState, action: DatePickersAction): DatePickersState {
  switch (action.type) {
    case 'SET_SHOW_FROM_DATE':
      return { ...state, showFromDate: action.payload };
    case 'SET_SHOW_TO_DATE':
      return { ...state, showToDate: action.payload };
    default:
      return state;
  }
}

export default function AddAssetsScreen({ navigation }: Props) {
  const dispatch = useDispatch();

  const [dropdownsState, dispatchDropdowns] = useReducer(dropdownsReducer, initialDropdownsState);
  const [datePickersState, dispatchDatePickers] = useReducer(datePickersReducer, initialDatePickersState);
  const asset = useSelector((state: RootState) => state.addAsset);
  const [today] = useState(() => new Date());
  const [step,
    setStep] =
    React.useState(1);
  
  const scrollRef =
    useRef<ScrollView>(
      null
    );
  
  React.useEffect(
    () => {
      scrollRef.current
        ?.scrollTo({
          y: 0,
          animated:
            false,
        });
    },
    [step]
  );
  const handleChange = useCallback((key: keyof typeof asset, value: any) => {
    dispatch(
      updateField({
        key,
        value,
      })
    );
  }, [dispatch]);
  const toggleAmenity = useCallback((amenity: string) => {
    const updatedAmenities = asset.amenities.includes(amenity)
      ? asset.amenities.filter((item) => item !== amenity)
      : [...asset.amenities, amenity];

    handleChange("amenities", updatedAmenities);
  }, [asset.amenities, handleChange]);

  const handleCreateAsset = () => {
    console.log("Asset Data:", asset);

    // API Call Here
  };

  const handleCancel = () => {
    dispatch(resetAssetForm());
  };

  const handleCategoryPress = useCallback((item: string) => {
    handleChange("category", item);
    dispatchDropdowns({ type: 'SET_SHOW_CATEGORIES', payload: false });
  }, [handleChange]);

  const handleConditionPress = useCallback((item: string) => {
    handleChange("condition", item);
    dispatchDropdowns({ type: 'SET_SHOW_CONDITIONS', payload: false });
  }, [handleChange]);

  const handleAmenityPress = useCallback((item: string) => {
    toggleAmenity(item);
  }, [toggleAmenity]);

  const renderCategoryItem = useCallback(({ item }: { item: string }) => (
    <Pressable
      style={styles.dropdownItem}
      onPress={() => handleCategoryPress(item)}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </Pressable>
  ), [handleCategoryPress]);

  const renderConditionItem = useCallback(({ item }: { item: string }) => (
    <Pressable
      style={styles.dropdownItem}
      onPress={() => handleConditionPress(item)}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </Pressable>
  ), [handleConditionPress]);

  const renderAmenityItem = useCallback(({ item }: { item: string }) => {
    const selected = asset.amenities.includes(item);
    return (
      <Pressable
        style={styles.checkboxRow}
        onPress={() => handleAmenityPress(item)}
      >
        <Text style={styles.checkboxLabel}>{item}</Text>
        <View
          style={selected ? selectedCheckboxStyle : defaultCheckboxStyle}
        />
      </Pressable>
    );
  }, [asset.amenities, handleAmenityPress]);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScreenHeader
        title="Add New Asset"
        onBack={() => {
          navigation.pop();
        }}
      />
      <SafeAreaView style={styles.container} edges={["bottom"]}>
        <StepperIndicator step={step} />
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {step === 1 && <StepOneForm asset={asset} handleChange={handleChange} showCategories={dropdownsState.showCategories} setShowCategories={(v) => dispatchDropdowns({ type: 'SET_SHOW_CATEGORIES', payload: v })} renderCategoryItem={renderCategoryItem} showConditions={dropdownsState.showConditions} setShowConditions={(v) => dispatchDropdowns({ type: 'SET_SHOW_CONDITIONS', payload: v })} renderConditionItem={renderConditionItem} />}
          {step === 1 && <StepOneButtons onNext={() => setStep(2)} />}
          {step === 2 && <StepTwoForm asset={asset} handleChange={handleChange} showAmenities={dropdownsState.showAmenities} setShowAmenities={(v) => dispatchDropdowns({ type: 'SET_SHOW_AMENITIES', payload: v })} renderAmenityItem={renderAmenityItem} />}
          {step === 2 && <StepTwoButtons onPrevious={() => setStep(1)} onNext={() => setStep(3)} />}
          {step === 3 && <StepThreeForm asset={asset} handleChange={handleChange} showFromDate={datePickersState.showFromDate} setShowFromDate={(v) => dispatchDatePickers({ type: 'SET_SHOW_FROM_DATE', payload: v })} showToDate={datePickersState.showToDate} setShowToDate={(v) => dispatchDatePickers({ type: 'SET_SHOW_TO_DATE', payload: v })} today={today} handleCreateAsset={handleCreateAsset} onPrevious={() => setStep(2)} />}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
