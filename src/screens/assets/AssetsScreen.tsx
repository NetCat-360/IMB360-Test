import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import AppHeader from "../../components/AppHeader";
import GradientButton from "../../components/GradientButton";

import { RootState } from "../../store/store";
import { Colors } from "../../config/theme";

import styles from "./AssetsStyles";

export default function AssetsScreen() {
  const [showFilters,
    setShowFilters] =
    useState(false);

  const assets =
    useSelector(
      (state: RootState) =>
        state.asset.assets
    );

  return (
    <SafeAreaView
      style={
        styles.container
      }
      edges={["top"]}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor={
          Colors.bgBlack
        }
      />

      <AppHeader />

      <ScrollView
        showsVerticalScrollIndicator={
          false
        }
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* TITLE */}
        <Text
          style={styles.title}
        >
          Assets
        </Text>

        {/* FILTER HEADER */}
        <View
          style={
            styles.filterHeader
          }
        >
          <Text
            style={
              styles.filterTitle
            }
          >
            Filter Result
          </Text>

          <TouchableOpacity
            onPress={() =>
              setShowFilters(
                !showFilters
              )
            }
          >
            <Image
              source={require("../../assets/images/filter.png")}
              style={
                styles.filterIcon
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* FILTERS */}
        {showFilters && (
          <>
            {/* CITY */}
            <View
              style={
                styles.inputBox
              }
            >
              <Image
                source={require("../../assets/images/search.png")}
                style={
                  styles.searchIcon
                }
              />

              <TextInput
                placeholder="Search City name"
                placeholderTextColor="#8A8A8A"
                style={
                  styles.input
                }
              />
            </View>

            {/* AREA PIN */}
            <View
              style={
                styles.inputBox
              }
            >
              <Image
                source={require("../../assets/images/search.png")}
                style={
                  styles.searchIcon
                }
              />

              <TextInput
                placeholder="Search Area Pin"
                placeholderTextColor="#8A8A8A"
                style={
                  styles.input
                }
              />
            </View>

            {/* CATEGORY */}
            <TouchableOpacity
  style={styles.dropdown}
>
  <Image
    source={require("../../assets/images/categories.png")}
    style={
      styles.dropdownIcon
    }
  />

  <Text
    style={
      styles.dropdownText
    }
  >
    All Categories
  </Text>

  <Image
    source={require("../../assets/images/downarrow.png")}
    style={
      styles.downArrow
    }
  />
</TouchableOpacity>
{/* SEARCH */}
<GradientButton
  title="Search"
  style={
    styles.searchButton
  }
  textStyle={{
    fontWeight:'bold',
  }}
/>

{/* ADD ASSETS */}
<GradientButton
  title="Add Assets"
  style={
    styles.addButton
  }
  textStyle={{
    fontWeight:'bold',
  }}
/>
          </>
        )}

        {/* ASSET CARDS */}
        {assets?.map(
          (
            item: any
          ) => (
            <View
              key={item.id}
              style={
                styles.card
              }
            >
              {/* COMPANY */}
              <Text
                style={
                  styles.companyName
                }
              >
                {
                  item.companyName
                }
              </Text>

              {/* DESCRIPTION */}
              <Text
                style={
                  styles.description
                }
              >
                {
                  item.description
                }
              </Text>

              {/* AVAILABILITY */}
              <Text
                style={
                  styles.availableText
                }
              >
                AVAILABLE:
                <Text
                  style={
                    styles.availableDate
                  }
                >
                  {" "}
                  {
                    item.startDate
                  }{" "}
                  TO{" "}
                  {
                    item.endDate
                  }
                </Text>
              </Text>

              {/* LOCATION */}
              <View
                style={
                  styles.locationRow
                }
              >
                <Text
                  style={
                    styles.locationIcon
                  }
                >
                  📍
                </Text>

                <Text
                  style={
                    styles.locationText
                  }
                >
                  {
                    item.city
                  }
                  ,{" "}
                  {
                    item.state
                  }
                </Text>
              </View>

              {/* PRICE + BUTTON */}
              <View
                style={
                  styles.bottomRow
                }
              >
                <Text
                  style={
                    styles.rentPrice
                  }
                >
                  {
                    item.rentPerDay
                  }
                </Text>

                <GradientButton
  title="Rent Now"
  style={
    styles.rentButton
  }
  textStyle={{
    fontWeight: 'bold',
  }}
/>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}