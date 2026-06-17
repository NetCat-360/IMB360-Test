import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

import AppHeader from "../../components/AppHeader";
import GradientButton from "../../components/GradientButton";

import { RootState } from "../../store/store";
import { Colors } from "../../config/theme";
import {
  AppNavigationProp,
} from '../../types/navigation';
import {
  useNavigation,
} from '@react-navigation/native';

import styles from "./AssetsStyles";
import {
  useDispatch,
} from 'react-redux';

import {
  setSelectedAsset,
} from '../../store/slices/assetSlice';

function FilterSection({ showFilters, setShowFilters }: { showFilters: boolean; setShowFilters: (v: boolean) => void }) {
  return (
    <>
      <View style={styles.filterHeader}>
        <Text style={styles.filterTitle}>Filter Result</Text>
        <Pressable onPress={() => setShowFilters(!showFilters)}>
          <Image source={require("../../assets/images/filter.png")} style={styles.filterIcon} resizeMode="contain" />
        </Pressable>
      </View>
      {showFilters && (
        <>
          <View style={styles.inputBox}>
            <Image source={require("../../assets/images/search.png")} style={styles.searchIcon} />
            <TextInput placeholder="Search City name" placeholderTextColor="#8A8A8A" style={styles.input} />
          </View>
          <View style={styles.inputBox}>
            <Image source={require("../../assets/images/search.png")} style={styles.searchIcon} />
            <TextInput placeholder="Search Area Pin" placeholderTextColor="#8A8A8A" style={styles.input} />
          </View>
          <Pressable style={styles.dropdown}>
            <Image source={require("../../assets/images/categories.png")} style={styles.dropdownIcon} />
            <Text style={styles.dropdownText}>All Categories</Text>
            <Image source={require("../../assets/images/downarrow.png")} style={styles.downArrow} />
          </Pressable>
          <GradientButton title="Search" style={styles.searchButton} textStyle={{ fontWeight: 'bold' }} />
          <GradientButton title="Add Assets" style={styles.addButton} textStyle={{ fontWeight: 'bold' }} />
        </>
      )}
    </>
  );
}

function AssetCard({ item, onRent }: { item: any; onRent: (item: any) => void }) {
  return (
    <View key={item.id} style={styles.card}>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.availableText}>AVAILABLE: <Text style={styles.availableDate}> {item.startDate} TO {item.endDate}</Text></Text>
      <View style={styles.locationRow}>
        <Text style={styles.locationIcon}>📍</Text>
        <Text style={styles.locationText}>{item.city}, {item.state}</Text>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.rentPrice}>{item.rentPerDay}</Text>
        <GradientButton title="Rent Now" style={styles.rentButton} textStyle={{ fontWeight: 'bold' }} onPress={() => onRent(item)} />
      </View>
    </View>
  );
}

export default function AssetsScreen() {
  
  const [showFilters,
    setShowFilters] =
    useState(false);

  const assets =
    useSelector(
      (state: RootState) =>
        state.asset.assets
    );
    const dispatch =
    useDispatch();

    const navigation =
  useNavigation<
    AppNavigationProp<'AssetDetails'>
  >();

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

      <AppHeader showSettings={false} showChat={false} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Assets</Text>
        <FilterSection showFilters={showFilters} setShowFilters={setShowFilters} />
        {assets?.map((item: any) => (
          <AssetCard key={item.id} item={item} onRent={(asset) => { dispatch(setSelectedAsset(asset)); navigation.navigate('AssetDetails'); }} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}