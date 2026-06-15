import React, {
  useRef,
} from "react";import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
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

export default function AddAssetsScreen({ navigation }: Props) {
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
  const dispatch = useDispatch();

  const [showCategories, setShowCategories] = React.useState(false);
  const [showConditions, setShowConditions] = React.useState(false);
  const [showAmenities, setShowAmenities] = React.useState(false);
  const asset = useSelector((state: RootState) => state.addAsset);
  const [showFromDate, setShowFromDate] = React.useState(false);

  const [showToDate, setShowToDate] = React.useState(false);
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
  const handleChange = (key: keyof typeof asset, value: any) => {
    dispatch(
      updateField({
        key,
        value,
      })
    );
  };
  const toggleAmenity = (amenity: string) => {
    const updatedAmenities = asset.amenities.includes(amenity)
      ? asset.amenities.filter((item) => item !== amenity)
      : [...asset.amenities, amenity];

    handleChange("amenities", updatedAmenities);
  };

  const handleCreateAsset = () => {
    console.log("Asset Data:", asset);

    // API Call Here
  };

  const handleCancel = () => {
    dispatch(resetAssetForm());
  };

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
      <View
  style={
    styles.stepperContainer
  }
>
  {[1, 2, 3].map(
    item => (
      <View
        key={item}
        style={
          styles.stepRow
        }
      >
        <View
          style={[
            styles.stepCircle,

            step >= item &&
              styles.activeStep,
          ]}
        >
          <Text
            style={
              styles.stepText
            }
          >
            {item}
          </Text>
        </View>

        {item !== 3 && (
          <View
            style={[
              styles.stepLine,

              step > item &&
                styles.activeLine,
            ]}
          />
        )}
      </View>
    )
  )}
</View>
<ScrollView
  ref={scrollRef}
  showsVerticalScrollIndicator={false}
  contentContainerStyle={
    styles.scrollContent
  }
>
          {step === 1 && (

<>
          {/* BASIC INFO */}
          <Text style={styles.sectionHeading}>Basic Information</Text>

          <Text style={styles.label}>
            Asset Name
            <Text style={styles.required}> *</Text>
          </Text>

          <TextInput
            value={asset.assetName}
            onChangeText={(text) => handleChange("assetName", text)}
            placeholder="Asset Name"
            placeholderTextColor="#8E8E8E"
            style={styles.input}
          />

          {/* CATEGORY */}
          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowCategories(!showCategories)}
          >
            <Text style={styles.dropdownText}>
              {asset.category || "Select Category"}
            </Text>

            <Image
              source={require("../../../assets/images/downarrow.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>

          {showCategories && (
            <View style={styles.dropdownContainer}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                {categories.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.dropdownItem}
                    onPress={() => {
                      handleChange("category", item);

                      setShowCategories(false);
                    }}
                  >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* DESCRIPTION */}
          <Text style={styles.label}>
            Description
            <Text style={styles.required}> *</Text>
          </Text>

          <View style={styles.descriptionBox}>
            <TextInput
              value={asset.description}
              onChangeText={(text) => handleChange("description", text)}
              multiline
              maxLength={100}
              textAlignVertical="top"
              placeholder="Describe your asset"
              placeholderTextColor="#8E8E8E"
              style={styles.textArea}
            />

            <Text style={styles.counter}>
              {asset.description.length}
              /100
            </Text>
          </View>

          <Text style={styles.maxText}>Maximum 100 words.</Text>

          {/* LOCATION */}
          <Text style={styles.sectionHeading}>Location Details</Text>

          <Text style={styles.label}>
            Address
            <Text style={styles.required}> *</Text>
          </Text>

          <TextInput
            value={asset.address}
            onChangeText={(text) => handleChange("address", text)}
            placeholder="Street address"
            placeholderTextColor="#8E8E8E"
            style={styles.input}
          />

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>
                City
                <Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                value={asset.city}
                onChangeText={(text) => handleChange("city", text)}
                placeholder="City"
                placeholderTextColor="#8E8E8E"
                style={styles.input}
              />
            </View>

            <View style={styles.halfContainer}>
              <Text style={styles.label}>
                PIN Code
                <Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                value={asset.pinCode}
                onChangeText={(text) => handleChange("pinCode", text)}
                keyboardType="numeric"
                placeholder="PIN code"
                placeholderTextColor="#8E8E8E"
                style={styles.input}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>
                State
                <Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                value={asset.state}
                onChangeText={(text) => handleChange("state", text)}
                placeholder="State"
                placeholderTextColor="#8E8E8E"
                style={styles.input}
              />
            </View>

            <View style={styles.halfContainer}>
              <Text style={styles.label}>
                Country
                <Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                value={asset.country}
                onChangeText={(text) => handleChange("country", text)}
                placeholder="Country"
                placeholderTextColor="#8E8E8E"
                style={styles.input}
              />
            </View>
          </View>

          {/* ASSET DETAILS */}
          <Text style={styles.sectionHeading}>Asset Details</Text>

          <Text style={styles.label}>
            Brand/Model
            <Text style={styles.required}> *</Text>
          </Text>

          <TextInput
            value={asset.brandModel}
            onChangeText={(text) => handleChange("brandModel", text)}
            placeholder="e.g., Canon EOS R5"
            placeholderTextColor="#8E8E8E"
            style={styles.input}
          />

          <View style={styles.row}>
            <View style={styles.halfContainer}>
              <Text style={styles.label}>
                Condition
                <Text style={styles.required}> *</Text>
              </Text>

              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setShowConditions(!showConditions)}
              >
                <Text style={styles.dropdownText}>
                  {asset.condition || "Select Condition"}
                </Text>

                <Image
                  source={require("../../../assets/images/downarrow.png")}
                  style={styles.arrow}
                />
              </TouchableOpacity>

              {showConditions && (
                <View style={styles.dropdownContainer}>
                  <ScrollView
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={false}
                  >
                    {conditions.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.dropdownItem}
                        onPress={() => {
                          handleChange("condition", item);

                          setShowConditions(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            <View style={styles.halfContainer}>
              <Text style={styles.label}>
                Year/Age
                <Text style={styles.required}> *</Text>
              </Text>

              <TextInput
                value={asset.yearAge}
                onChangeText={(text) => handleChange("yearAge", text)}
                placeholder="e.g., 2023 or 1"
                placeholderTextColor="#8E8E8E"
                style={styles.input}
              />
            </View>
          </View>
          </>

)}
{step === 1 && (
  <View
    style={{
      flexDirection:
        "row",
      justifyContent:
        "flex-end",
      marginTop:
        verticalScale(5),
    }}
  >
    <TouchableOpacity
      style={
        styles.createButton
      }
      onPress={() => {
        setStep(2);
      
        
      }}
    >
      <Text
        style={
          styles.createText
        }
      >
        Next
      </Text>
    </TouchableOpacity>
  </View>
)}
          {step === 2 && (
  <>
          {/* PRICING */}
          <Text style={styles.sectionHeading}>Pricing</Text>

          <Text style={styles.label}>
            Price per day
            <Text style={styles.required}> *</Text>
          </Text>

          <TextInput
            value={asset.pricePerDay}
            onChangeText={(text) => handleChange("pricePerDay", text)}
            keyboardType="numeric"
            placeholder="₱"
            placeholderTextColor="#8E8E8E"
            style={styles.input}
          />

          {/* AMENITIES */}
          <Text style={styles.sectionHeading}>Amenities & Features</Text>

          <TouchableOpacity
            style={styles.dropdown}
            onPress={() => setShowAmenities(!showAmenities)}
          >
            <Text style={styles.dropdownText}>
              {asset.amenities.length
                ? `${asset.amenities.length} Selected`
                : "Select Amenities"}
            </Text>

            <Image
              source={require("../../../assets/images/downarrow.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>

          {showAmenities && (
            <View style={styles.amenitiesContainer}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
              >
                {amenitiesList.map((item) => {
                  const selected = asset.amenities.includes(item);

                  return (
                    <TouchableOpacity
                      key={item}
                      style={styles.checkboxRow}
                      onPress={() => toggleAmenity(item)}
                    >
                      <Text style={styles.checkboxLabel}>{item}</Text>

                      <View
                        style={[
                          styles.checkbox,
                          selected && styles.checkboxSelected,
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}

          {/* IMAGES */}
          <Text style={styles.sectionHeading}>Images</Text>

          <Text style={styles.label}>Cover Image</Text>

          <TouchableOpacity style={styles.uploadBox}>
            <Image
              source={require("../../../assets/images/gallery.png")}
              style={styles.uploadIcon}
            />

            <Text style={styles.uploadText}>
              {asset.coverImage
                ? "Image Selected"
                : "Click to upload cover image"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.uploadInfo}>Max. size to upload is 50MB</Text>

          <Text style={styles.label}>Gallery</Text>

          <TouchableOpacity style={styles.uploadBox}>
            <Image
              source={require("../../../assets/images/gallery.png")}
              style={styles.uploadIcon}
            />

            <Text style={styles.uploadText}>
              {asset.gallery.length
                ? `${asset.gallery.length} files selected`
                : "Click to upload images or videos"}
            </Text>
          </TouchableOpacity>

          <Text style={styles.uploadInfo}>
            Max. 6 images or videos can be uploaded up to 50MB each
          </Text>
          </>

)}
{step === 2 && (
  <View
    style={
      styles.buttonRow
    }
  >
    <TouchableOpacity
      style={
        styles.cancelButton
      }
      onPress={() => {
        setStep(1);
      
        
      }}
    >
      <Text
        style={
          styles.cancelText
        }
      >
        Previous
      </Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={
        styles.createButton
      }
      onPress={() => {
        setStep(3);
      
        
      }}
    >
      <Text
        style={
          styles.createText
        }
      >
        Next
      </Text>
    </TouchableOpacity>
  </View>
)}
{step === 3 && (
  <>
          {/* AVAILABILITY */}
          <Text style={styles.sectionHeading}>Availability</Text>

          <Text style={styles.label}>
            Available From
            <Text style={styles.required}> *</Text>
          </Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowFromDate(true)}
          >
            {showFromDate && (
              <DateTimePicker
                value={
                  asset.availableFrom
                    ? new Date(asset.availableFrom)
                    : new Date()
                }
                mode="date"
                minimumDate={new Date()}
                display="default"
                onChange={(event, selectedDate) => {
                  setShowFromDate(false);

                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().split("T")[0];

                    handleChange("availableFrom", formatted);
                  }
                }}
              />
            )}
            <Text style={styles.dateText}>
              {asset.availableFrom || "Select Date"}
            </Text>

            <Image
              source={require("../../../assets/images/calendar.png")}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>

          <Text style={styles.helperText}>Cannot select past dates.</Text>

          <Text
            style={[
              styles.label,
              {
                marginTop: verticalScale(14),
              },
            ]}
          >
            Available To
            <Text style={styles.required}> *</Text>
          </Text>

          <TouchableOpacity
            onPress={() => setShowToDate(true)}
            style={styles.dateInput}
          >
            {showToDate && (
              <DateTimePicker
                value={
                  asset.availableTo ? new Date(asset.availableTo) : new Date()
                }
                mode="date"
                minimumDate={
                  asset.availableFrom
                    ? new Date(asset.availableFrom)
                    : new Date()
                }
                display="default"
                onChange={(event, selectedDate) => {
                  setShowToDate(false);

                  if (selectedDate) {
                    const formatted = selectedDate.toISOString().split("T")[0];

                    handleChange("availableTo", formatted);
                  }
                }}
              />
            )}
            <Text style={styles.placeholderText}>
              {asset.availableTo || "Select Date"}
            </Text>

            <Image
              source={require("../../../assets/images/calendar.png")}
              style={styles.calendarIcon}
            />
          </TouchableOpacity>

          {/* ADDITIONAL INFO */}
          <Text
            style={[
              styles.sectionHeading,
              {
                marginTop: verticalScale(18),
              },
            ]}
          >
            Additional Information
          </Text>

          <Text style={styles.label}>
            What Facility You Provide with This Asset
          </Text>

          <View style={styles.descriptionBox}>
            <TextInput
              value={asset.facilities}
              onChangeText={(text) => handleChange("facilities", text)}
              multiline
              maxLength={100}
              textAlignVertical="top"
              placeholder="List what you provide with this asset"
              placeholderTextColor="#8E8E8E"
              style={styles.textArea}
            />

            <Text style={styles.counter}>
              {asset.facilities.length}
              /100
            </Text>
          </View>

          <Text style={styles.maxText}>Maximum 100 words.</Text>

          <Text
            style={[
              styles.label,
              {
                marginTop: verticalScale(10),
              },
            ]}
          >
            Lease/Rent Rules
          </Text>

          <View style={styles.descriptionBox}>
            <TextInput
              value={asset.leaseRules}
              onChangeText={(text) => handleChange("leaseRules", text)}
              multiline
              maxLength={100}
              textAlignVertical="top"
              placeholder="Any specific rules for renters"
              placeholderTextColor="#8E8E8E"
              style={styles.textArea}
            />

            <Text style={styles.counter}>
              {asset.leaseRules.length}
              /100
            </Text>
          </View>

          <Text style={styles.maxText}>Maximum 100 words.</Text>

          <Text style={styles.warningText}>
            * A fee of 10 points will be automatically deducted from your
            balance for asset creation.
          </Text>
          <View
  style={
    styles.buttonRow
  }
>
  <TouchableOpacity
    style={
      styles.cancelButton
    }
    onPress={() => {
      setStep(2);
    
      
    }}
  >
    <Text
      style={
        styles.cancelText
      }
    >
      Previous
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={
      styles.createButton
    }
    onPress={
      handleCreateAsset
    }
  >
    <Text
      style={
        styles.createText
      }
    >
      Create Asset
    </Text>
  </TouchableOpacity>
</View>
          </>

)}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
