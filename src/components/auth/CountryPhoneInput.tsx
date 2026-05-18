import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet } from 'react-native';
import { COUNTRIES } from '../../utils/countries';
import { scale, verticalScale, moderateScale } from '../../utils/scaling';

interface Country {
  code: string;
  flag: string;
  name: string;
  callingCode: string;
}

interface CountryPhoneInputProps {
  phoneNumber: string;
  onPhoneNumberChange: (text: string) => void;
  selectedCountry: Country;
  onCountrySelect: (country: Country) => void;
}

export const CountryPhoneInput: React.FC<CountryPhoneInputProps> = ({
  phoneNumber,
  onPhoneNumberChange,
  selectedCountry,
  onCountrySelect,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = COUNTRIES.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.callingCode.includes(searchQuery)
  );

  const handleSelect = (country: Country) => {
    onCountrySelect(country);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <View style={localStyles.inputBlockWrapper}>
      <Text style={localStyles.inputStaticLabel}>Phone Number</Text>
      
      <View style={localStyles.inputContentRow}>
        {/* Country Code Selection Dropdown Trigger */}
        <TouchableOpacity 
          style={localStyles.countryPickerTrigger} 
          onPress={() => setModalVisible(true)}
          activeOpacity={0.7}
        >
          <Text style={localStyles.flagText}>{selectedCountry.flag}</Text>
          <Text style={localStyles.callingCodeText}>{selectedCountry.callingCode}</Text>
          <Text style={localStyles.dropdownArrow}>▾</Text>
        </TouchableOpacity>

        {/* Clean, Non-Shifting TextInput Block */}
        <TextInput
          style={localStyles.phoneTextInput}
          placeholder="Enter phone number"
          placeholderTextColor="#666666"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
        />
      </View>

      {/* High-Performance Selector Bottom-Sheet Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={localStyles.modalOverlay}>
          <View style={localStyles.modalContent}>
            <View style={localStyles.modalHeader}>
              <Text style={localStyles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={localStyles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={localStyles.searchBar}
              placeholder="Search country or country code..."
              placeholderTextColor="#666666"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />

            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              initialNumToRender={15}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={localStyles.countryItem} 
                  onPress={() => handleSelect(item)}
                >
                  <Text style={localStyles.itemFlag}>{item.flag}</Text>
                  <Text style={localStyles.itemName}>{item.name}</Text>
                  <Text style={localStyles.itemCallingCode}>{item.callingCode}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const localStyles = StyleSheet.create({
  inputBlockWrapper: {
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderRadius: moderateScale(12),
    borderWidth: 1,
    borderColor: '#2C2C2E',
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(12),
    height: verticalScale(75),
    justifyContent: 'center',
    marginBottom: verticalScale(16),
  },
  inputStaticLabel: {
    color: '#666666',
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginBottom: verticalScale(4),
  },
  inputContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(24),
  },
  countryPickerTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(12),
    borderRightWidth: 1,
    borderRightColor: '#2C2C2E',
    height: '100%',
  },
  flagText: {
    fontSize: moderateScale(16),
    marginRight: scale(6),
  },
  callingCodeText: {
    color: '#ffffff',
    fontSize: moderateScale(15),
    fontWeight: '500',
  },
  dropdownArrow: {
    color: '#666666',
    fontSize: moderateScale(10),
    marginLeft: scale(4),
  },
  phoneTextInput: {
    flex: 1,
    color: '#ffffff',
    fontSize: moderateScale(15),
    paddingLeft: scale(12),
    paddingVertical: 0,
    margin: 0,
    height: '100%',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#121214',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    height: '75%',
    paddingTop: verticalScale(20),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(15),
  },
  modalTitle: {
    color: '#ffffff',
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  closeButton: {
    color: '#666666',
    fontSize: moderateScale(18),
    padding: scale(4),
  },
  searchBar: {
    backgroundColor: '#1C1C1E',
    color: '#ffffff',
    borderRadius: moderateScale(8),
    height: verticalScale(42),
    paddingHorizontal: scale(12),
    marginHorizontal: scale(20),
    marginBottom: verticalScale(15),
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(20),
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1E',
  },
  itemFlag: {
    fontSize: moderateScale(20),
    marginRight: scale(14),
  },
  itemName: {
    flex: 1,
    color: '#ffffff',
    fontSize: moderateScale(15),
  },
  itemCallingCode: {
    color: '#b6d82c',
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});