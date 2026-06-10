// src/screens/assets/AssetDetailsScreen.tsx

import React from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    StyleSheet,
    TextInput,
    Modal,
  } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { useSelector, useDispatch } from "react-redux";

import LinearGradient from "react-native-linear-gradient";

import ScreenHeader from "../../components/ScreenHeader";

import { scale, verticalScale, moderateScale } from "../../utils/scaling";

import { Colors } from "../../config/theme";

import { RootState } from "../../store/store";
import {
    setActiveTab,
    toggleTerms,
  } from "../../store/slices/assetSlice";

export default function AssetDetailsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    selectedAsset,
    activeTab,
    showFullTerms,
  } = useSelector(
    (
      state:
        RootState
    ) =>
      state.asset
  );

  const asset = selectedAsset;
  const [
    showRentModal,
    setShowRentModal,
  ] = React.useState(
    false
  );
  const [
    startDate,
    setStartDate,
  ] = React.useState("");
  
  const [
    endDate,
    setEndDate,
  ] = React.useState("");

  if (!asset) {
    return null;
  }
  const formatDate =
  (
    text: string
  ) => {
    const cleaned =
      text.replace(
        /\D/g,
        ""
      );

    let formatted =
      cleaned;

    if (
      cleaned.length >
      2
    ) {
      formatted =
        `${cleaned.slice(
          0,
          2
        )}/${cleaned.slice(
          2,
          4
        )}`;
    }

    if (
      cleaned.length >
      4
    ) {
      formatted =
        `${cleaned.slice(
          0,
          2
        )}/${cleaned.slice(
          2,
          4
        )}/${cleaned.slice(
          4,
          8
        )}`;
    }

    return formatted;
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <ScreenHeader title="Rent Now" onBack={() => navigation.goBack()} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* TITLE */}
        <Text style={styles.screenTitle}>Assets</Text>

        {/* BANNER IMAGE */}
        <Image
          source={require("../../assets/images/asusbanner.png")}
          style={styles.banner}
        />

        {/* CARD */}
        <View style={styles.card}>
          {/* AVAILABLE TAG */}
          <LinearGradient
            colors={["#00D2FF", "#7BFF5B"]}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 0,
            }}
            style={styles.availableBadge}
          >
            <View style={styles.greenDot} />

            <Text style={styles.availableText}>Available</Text>
          </LinearGradient>

          {/* TITLE */}
          <Text style={styles.assetTitle}>{asset.companyName}</Text>

          {/* DESCRIPTION */}
          <Text style={styles.description}>{asset.description}</Text>

          {/* AVAILABLE */}
          <Text style={styles.availableLabel}>
            AVAILABLE:
            <Text style={styles.dateText}>
              {" "}
              {asset.startDate} TO {asset.endDate}
            </Text>
          </Text>

         {/* LOCATION */}
<View
  style={
    styles.locationRow
  }
>
  <Image
    source={require(
      "../../assets/images/location.png"
    )}
    style={
      styles.locationImage
    }
  />

  <Text
    style={
      styles.locationText
    }
  >
    {asset.city},
    {" "}
    {asset.state}
  </Text>
</View>

          {/* SOCIALS */}
          <View style={styles.socialRow}>
            <View style={styles.socialItem}>
              <Text style={styles.heart}>❤️</Text>

              <Text style={styles.socialText}>{asset.likes}</Text>
            </View>

            <View style={styles.socialItem}>
              <Text style={styles.comment}>💬</Text>

              <Text style={styles.socialText}>{asset.comments}</Text>
            </View>

            <TouchableOpacity>
  <Image
    source={require(
      "../../assets/images/share.png"
    )}
    style={
      styles.shareIcon
    }
  />
</TouchableOpacity>
          </View>

          {/* PRICE */}
          <Text style={styles.price}>{asset.rentPerDay}</Text>

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.chatButton}>
              <Image
                source={require("../../assets/images/chat.png")}
                style={styles.chatIcon}
              />
            </TouchableOpacity>

            <LinearGradient
              colors={["#00C6FF", "#7BFF5B"]}
              style={styles.requestButton}
            >
              <TouchableOpacity
  onPress={() =>
    setShowRentModal(
      true
    )
  }
>
  <Text
    style={
      styles.requestText
    }
  >
    Send Request to Rent
  </Text>
</TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        {/* SINGLE HORIZONTAL TAB BAR */}
<ScrollView
  horizontal
  nestedScrollEnabled
  showsHorizontalScrollIndicator={
    false
  }
  contentContainerStyle={
    styles.tabScroll
  }
>
  {[
    "Asset Details",
    "What's Provided",
    "Price Details",
    "Terms & Conditions",
    "Comments & Reviews",
    "Gallery",
  ].map(tab => {
    const isActive =
      activeTab === tab;

    return (
      <TouchableOpacity
        key={tab}
        style={[
          styles.tabButton,
          isActive &&
            styles.activeTab,
        ]}
        onPress={() =>
          dispatch(
            setActiveTab(
              tab as any
            )
          )
        }
      >
        <Text
          style={[
            styles.tabText,
            isActive && {
              color:
                "#000",
            },
          ]}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    );
  })}
</ScrollView>

{/* DYNAMIC CONTENT CARD */}
<View
  style={
    styles.detailsCard
  }
>
  {/* ASSET DETAILS */}
  {activeTab ===
    "Asset Details" && (
    <>
      <Text
        style={
          styles.sectionHeading
        }
      >
        Asset Details
      </Text>

      <Text
        style={
          styles.sectionLabel
        }
      >
        AVAILABLE:
        <Text
          style={
            styles.sectionText
          }
        >
          {" "}
          {
            asset.availableFrom
          }{" "}
          TO{" "}
          {
            asset.availableTo
          }
        </Text>
      </Text>

      <Text
        style={
          styles.sectionLabel
        }
      >
        AMENITIES:
      </Text>

      <Text
        style={
          styles.paragraph
        }
      >
        {asset.amenities.join(
          ", "
        )}
      </Text>

      <Text
        style={
          styles.sectionLabel
        }
      >
        DESCRIPTION:
      </Text>

      <Text
        style={
          styles.paragraph
        }
      >
        {
          asset.description
        }
      </Text>
    </>
  )}

  {/* PROVIDED */}
  {activeTab ===
    "What's Provided" && (
    <>
      <Text
        style={
          styles.sectionHeading
        }
      >
        What's Provided
        with This
        Facility
      </Text>

      <Text
        style={
          styles.paragraph
        }
      >
        {asset.providedFeatures.join(
          ". "
        )}
      </Text>
    </>
  )}

  {/* PRICE */}
  {activeTab ===
    "Price Details" && (
    <>
      <Text
        style={
          styles.sectionHeading
        }
      >
        Price Details
      </Text>

      <Text
        style={
          styles.priceText
        }
      >
        {
          asset.priceDetails
        }
      </Text>
    </>
  )}

  {/* TERMS */}
  {activeTab ===
    "Terms & Conditions" && (
    <>
      <Text
        style={
          styles.sectionHeading
        }
      >
        Terms &
        Conditions /
        Rules
      </Text>

      <Text
        style={
          styles.paragraph
        }
        numberOfLines={
          showFullTerms
            ? undefined
            : 5
        }
      >
        {
          asset.termsAndConditions
        }
      </Text>

      <TouchableOpacity
        onPress={() =>
          dispatch(
            toggleTerms()
          )
        }
      >
        <Text
          style={
            styles.showMore
          }
        >
          {showFullTerms
            ? "Show less"
            : "Show more"}
        </Text>
      </TouchableOpacity>
    </>
  )}

  {/* COMMENTS */}
  {activeTab ===
    "Comments & Reviews" && (
    <>
      <Text
        style={
          styles.sectionHeading
        }
      >
        Comments &
        Reviews
      </Text>

      <Text
        style={
          styles.paragraph
        }
      >
        Rating:
        {" "}
        {"⭐".repeat(
          asset.rating
        )}
        {" "}
        Reviews (
        {
          asset.reviewsCount
        }
        )
      </Text>

      <TextInput
        placeholder="Add Your Comment..."
        placeholderTextColor="#8A8A8A"
        style={
          styles.commentInput
        }
      />

      <LinearGradient
        colors={[
          "#00C6FF",
          "#7BFF5B",
        ]}
        style={
          styles.commentButton
        }
      >
        <Text
          style={
            styles.commentButtonText
          }
        >
          Add Comment
        </Text>
      </LinearGradient>
    </>
  )}

  {/* GALLERY */}
  {activeTab ===
    "Gallery" && (
    <View
      style={
        styles.galleryGrid
      }
    >
      {asset.gallery.map(
        (
          image,
          index
        ) => (
          <Image
            key={index}
            source={require(
              "../../assets/images/asusbanner.png"
            )}
            style={
              styles.galleryImage
            }
          />
        )
      )}
    </View>
  )}
</View>
      </ScrollView>
      <Modal
  visible={
    showRentModal
  }
  transparent
  animationType="fade"
>
  <View
    style={
      styles.modalOverlay
    }
  >
    <View
      style={
        styles.modalCard
      }
    >
      <Text
        style={
          styles.modalTitle
        }
      >
        Book{" "}
        {
          asset.companyName
        }
      </Text>

      {/* DATE ROW */}
<View
  style={
    styles.dateRow
  }
>
  {/* START DATE */}
  <View
    style={
      styles.dateBox
    }
  >
    <Text
      style={
        styles.label
      }
    >
      Start Date
      <Text
        style={{
          color:
            "red",
        }}
      >
        {" "}
        *
      </Text>
    </Text>

    <TextInput
      value={
        startDate
      }
      onChangeText={text =>
        setStartDate(
          formatDate(
            text
          )
        )
      }
      placeholder="DD/MM/YYYY"
      placeholderTextColor="#8A8A8A"
      keyboardType="numeric"
      maxLength={10}
      style={
        styles.modalInput
      }
    />
  </View>

  {/* END DATE */}
  <View
    style={
      styles.dateBox
    }
  >
    <Text
      style={
        styles.label
      }
    >
      End Date
      <Text
        style={{
          color:
            "red",
        }}
      >
        {" "}
        *
      </Text>
    </Text>

    <TextInput
      value={
        endDate
      }
      onChangeText={text =>
        setEndDate(
          formatDate(
            text
          )
        )
      }
      placeholder="DD/MM/YYYY"
      placeholderTextColor="#8A8A8A"
      keyboardType="numeric"
      maxLength={10}
      style={
        styles.modalInput
      }
    />
  </View>
</View>

      {/* FORM */}
      <Text
        style={
          styles.label
        }
      >
        Full Name
      </Text>

      <TextInput
        placeholder="Enter your full name"
        placeholderTextColor="#A3A3A3"
        style={
          styles.modalInput
        }
      />

      <Text
        style={
          styles.label
        }
      >
        Email Address
      </Text>

      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#A3A3A3"
        style={
          styles.modalInput
        }
      />

      <Text
        style={
          styles.label
        }
      >
        Phone
      </Text>

      <TextInput
        placeholder="Enter your phone number"
        placeholderTextColor="#A3A3A3"
        style={
          styles.modalInput
        }
      />

      <Text
        style={
          styles.label
        }
      >
        Additional Request
      </Text>

      <TextInput
        multiline
        placeholder="Any special requirements or message"
        placeholderTextColor="#A3A3A3"
        style={
          styles.requestInput
        }
      />

      <Text
        style={
          styles.noteText
        }
      >
        * To send a
        quote for
        asset rental,
        a fee of 5
        points will
        be applied.
      </Text>

      {/* BUTTONS */}
      <View
        style={
          styles.modalButtonRow
        }
      >
        <TouchableOpacity
          style={
            styles.cancelButton
          }
          onPress={() =>
            setShowRentModal(
              false
            )
          }
        >
          <Text
            style={
              styles.cancelText
            }
          >
            Cancel
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            styles.sendButton
          }
        >
          <Text
            style={
              styles.sendText
            }
          >
            Send Request
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  scrollContent: {
    paddingBottom: verticalScale(30),
  },

  screenTitle: {
    color: "#fff",
    fontSize: moderateScale(28),
    fontWeight: "700",
    marginTop: verticalScale(18),
    marginLeft: scale(22),
    marginBottom: verticalScale(14),
  },

  banner: {
    width: "90%",
    height: verticalScale(180),
    borderRadius: moderateScale(10),
    alignSelf: "center",
    resizeMode: "cover",
  },

  card: {
    width: "90%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Colors.teal,
    borderRadius: moderateScale(14),
    marginTop: verticalScale(18),
    padding: scale(18),
    backgroundColor: "#000",
  },

  availableBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(6),
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00FF00",
    marginRight: 5,
  },

  availableText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 12,
  },

  assetTitle: {
    color: "#fff",
    fontSize: moderateScale(24),
    fontWeight: "700",
    marginTop: verticalScale(10),
  },

  description: {
    color: "#8A8A8A",
    fontSize: moderateScale(15),
    lineHeight: verticalScale(20),
    marginTop: verticalScale(14),
  },

  availableLabel: {
    color: Colors.teal,
    fontWeight: "700",
    marginTop: verticalScale(18),
  },
  locationImage: {
    width: scale(18),
  
    height: scale(18),
  
    resizeMode:
      "contain",
  
    marginRight:
      scale(6),
  },
  shareIcon: {
    width: scale(20),
  
    height: scale(20),
  
    resizeMode:
      "contain",
  },

  dateText: {
    color: "#BFBFBF",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(8),
  },

  locationIcon: {
    fontSize: 18,
  },

  locationText: {
    color: "#BFBFBF",
    marginLeft: 6,
  },

  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(12),
    gap: 18,
  },

  socialItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  socialText: {
    color: "#fff",
    marginLeft: 4,
  },

  heart: {
    fontSize: 20,
  },

  comment: {
    fontSize: 18,
  },

  share: {
    color: "#fff",
    fontSize: 22,
  },

  price: {
    color: "#00FF47",
    fontSize: moderateScale(30),
    fontWeight: "700",
    alignSelf: "flex-end",
    marginTop: verticalScale(-5),
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: verticalScale(14),
    gap: 12,
  },

  chatButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.teal,
  },

  chatIcon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  requestButton: {
    flex: 1,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  requestText: {
    color: "#000",
    fontWeight: "700",
    fontSize: moderateScale(18),
    paddingVertical: verticalScale(8),
  },
  tabScroll: {
    paddingHorizontal: scale(20),

    marginTop: verticalScale(20),

    paddingRight: scale(40),

    flexGrow: 1,
  },

  tabButton: {
    height: verticalScale(44),

    borderWidth: 1,

    borderColor: Colors.teal,

    justifyContent: "center",

    alignItems: "center",

    paddingHorizontal: scale(22),

    borderRadius: moderateScale(12),

    marginRight: scale(12),

    backgroundColor: "#000",
  },

  activeTab: {
    backgroundColor: Colors.teal,
  },

  tabText: {
    color: "#FFF",

    fontSize: moderateScale(16),

    fontWeight: "500",
  },

  detailsCard: {
    width: "90%",

    alignSelf: "center",

    borderWidth: 1,

    borderColor: Colors.teal,

    borderRadius: moderateScale(16),

    padding: scale(20),

    marginTop: verticalScale(14),

    backgroundColor: "#000",
  },

  sectionHeading: {
    color: "#FFF",

    fontSize: moderateScale(22),

    fontWeight: "700",

    marginBottom: verticalScale(14),
  },

  sectionLabel: {
    color: Colors.teal,

    fontSize: moderateScale(16),

    fontWeight: "700",

    marginTop: verticalScale(14),
  },

  sectionText: {
    color: "#9A9A9A",
  },

  paragraph: {
    color: "#8A8A8A",

    fontSize: moderateScale(16),

    lineHeight: verticalScale(30),

    marginTop: verticalScale(8),
  },

  priceText: {
    color: "#9A9A9A",

    fontSize: moderateScale(18),
  },

  showMore: {
    color: Colors.teal,

    fontSize: moderateScale(16),

    marginTop: verticalScale(14),
  },

  commentInput: {
    minHeight: verticalScale(80),

    borderRadius: moderateScale(14),

    backgroundColor: "#2A272B",

    borderWidth: 1,

    borderColor: "#3A3A3A",

    color: "#FFF",

    padding: scale(14),

    marginTop: verticalScale(16),

    textAlignVertical: "top",
  },

  commentButton: {
    alignSelf: "flex-end",

    borderRadius: moderateScale(14),

    paddingHorizontal: scale(24),

    paddingVertical: verticalScale(12),

    marginTop: verticalScale(18),
  },

  commentButtonText: {
    color: "#000",

    fontWeight: "700",

    fontSize: moderateScale(18),
  },

  galleryGrid: {
    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "space-between",
  },

  galleryImage: {
    width: "48%",

    height: verticalScale(100),

    borderRadius: moderateScale(8),

    marginBottom: verticalScale(14),

    resizeMode: "cover",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.75)",
    justifyContent:
      "center",
    alignItems:
      "center",
  },
  
  modalCard: {
    width: "92%",
  
    maxHeight:
      verticalScale(520),
  
    backgroundColor:
      "#000",
  
    borderWidth: 1,
  
    borderColor:
      Colors.teal,
  
    borderRadius:
      moderateScale(18),
  
    padding:
      scale(14),
  },
  
  modalTitle: {
    color: "#FFF",
  
    fontSize:
      moderateScale(20),
  
    fontWeight:
      "700",
  
    marginBottom:
      verticalScale(10),
  },
  
  dateRow: {
    flexDirection:
      "row",
  
    justifyContent:
      "space-between",
  },
  
  dateBox: {
    width: "48%",
  },
  
  label: {
    color: "#FFF",
  
    fontSize:
      moderateScale(14),
  
    fontWeight:
      "600",
  
    marginBottom:
      verticalScale(4),
  
    marginTop:
      verticalScale(8),
  },
  
  inputBox: {
    borderWidth: 1,
  
    borderColor:
      Colors.teal,
  
    borderRadius:
      moderateScale(10),
  
    backgroundColor:
      "#2A272B",
  
    paddingVertical:
      verticalScale(10),
  
    paddingHorizontal:
      scale(12),
  },
  
  inputText: {
    color: "#FFF",
  
    fontSize:
      moderateScale(14),
  },
  
  modalInput: {
    borderWidth: 1,
  
    borderColor:
      Colors.teal,
  
    borderRadius:
      moderateScale(10),
  
    backgroundColor:
      "#2A272B",
  
    color: "#FFF",
  
    paddingVertical:
      verticalScale(10),
  
    paddingHorizontal:
      scale(12),
  
    fontSize:
      moderateScale(14),
  },
  
  requestInput: {
    minHeight:
      verticalScale(65),
  
    borderWidth: 1,
  
    borderColor:
      Colors.teal,
  
    borderRadius:
      moderateScale(10),
  
    backgroundColor:
      "#2A272B",
  
    color: "#FFF",
  
    padding:
      scale(12),
  
    textAlignVertical:
      "top",
  },
  
  noteText: {
    color: "#A3A3A3",
  
    fontSize:
      moderateScale(12),
  
    marginTop:
      verticalScale(8),
  },
  
  modalButtonRow: {
    flexDirection:
      "row",
  
    justifyContent:
      "space-between",
  
    marginTop:
      verticalScale(14),
  },
  
  cancelButton: {
    width: "46%",
  
    borderWidth: 1,
  
    borderColor:
      "#FF3B30",
  
    borderRadius:
      moderateScale(10),
  
    alignItems:
      "center",
  
    paddingVertical:
      verticalScale(10),
  },
  
  cancelText: {
    color: "#FFF",
  
    fontWeight:
      "600",
  
    fontSize:
      moderateScale(14),
  },
  
  sendButton: {
    width: "46%",
  
    backgroundColor:
      Colors.teal,
  
    borderRadius:
      moderateScale(10),
  
    alignItems:
      "center",
  
    paddingVertical:
      verticalScale(10),
  },
  
  sendText: {
    color: "#000",
  
    fontWeight:
      "700",
  
    fontSize:
      moderateScale(14),
  },
});
