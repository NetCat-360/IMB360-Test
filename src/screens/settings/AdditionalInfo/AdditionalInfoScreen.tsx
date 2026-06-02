import React, {
    useMemo,
    useState,
} from 'react'

import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native'

import DatePicker
    from 'react-native-date-picker'

import TextField from '../../../components/common/TextField'

import {
    Dropdown,
} from 'react-native-element-dropdown'

import Country
    from 'country-state-city/lib/country'
import State
    from 'country-state-city/lib/state'

import ScreenHeader
    from '../../../components/ScreenHeader'



import {
    AppNavigationProp,
} from '../../../types/navigation'
import { styles } from './styles'

const GENDER_OPTIONS = [
    {
        label:
            'Male',
        value:
            'Male',
    },
    {
        label:
            'Female',
        value:
            'Female',
    },
]

type Props = {
    navigation:
    AppNavigationProp<'AdditionalInfo'>
}

export default function AdditionalInfoScreen({
    navigation,
}: Props) {
    const [address, setAddress] =
        useState('')

    const [country, setCountry] =
        useState<any>(null)

    const [state, setState] =
        useState<any>(null)

    const [pincode, setPincode] =
        useState('')

    const [gender, setGender] =
        useState<any>(null)

    const [website, setWebsite] =
        useState('')

    const [dob, setDob] =
        useState(new Date())

    const [openDate,
        setOpenDate] =
        useState(false)

    const countries =
        useMemo(() =>
            Country.getAllCountries()
                .map(item => ({
                    label:
                        item.name,
                    value:
                        item.isoCode,
                })),
            []
        )

    const states =
        useMemo(() => {
            if (!country)
                return []

            return State
                .getStatesOfCountry(
                    country
                )
                ?.map(item => ({
                    label:
                        item.name,
                    value:
                        item.isoCode,
                })) || []
        }, [country])

    const handlePinCode =
        (text: string) => {
            const onlyNums =
                text.replace(
                    /[^0-9]/g,
                    ''
                )

            if (
                onlyNums.length <=
                6
            ) {
                setPincode(
                    onlyNums
                )
            }
        }

    return (
        <View
            style={
                styles.container
            }
        >
            <ScreenHeader
                title="Additional Info"
                onBack={() =>
                    navigation.goBack()
                }
            />

            <ScrollView
                showsVerticalScrollIndicator={
                    false
                }
                contentContainerStyle={
                    styles.scrollContent
                }
            >
                <Text
                    style={
                        styles.description
                    }
                >
                    This makes it
                    easier for you
                    to recover your
                    account.{'\n'}
                    Verified Emails
                    make your account
                    more secure
                </Text>

                {/* Address */}
                <Text
                    style={
                        styles.label
                    }
                >
                    Address
                </Text>

                <TextField
                    value={address}
                    onChangeText={setAddress}
                    placeholder="Enter your Street address"
                    placeholderTextColor="#A1A1A1"
                    style={styles.input}
                />

                {/* Country */}
                <Text
                    style={
                        styles.label
                    }
                >
                    Country
                </Text>

                <Dropdown
                    style={
                        styles.dropdown
                    }
                    placeholderStyle={
                        styles.placeholder
                    }
                    selectedTextStyle={
                        styles.selectedText
                    }
                    containerStyle={
                        styles.dropdownContainer
                    }
                    data={
                        countries
                    }
                    labelField="label"
                    valueField="value"
                    placeholder="Select Country"
                    value={country}
                    onChange={
                        item => {
                            setCountry(
                                item.value
                            )
                            setState(
                                null
                            )
                        }
                    }
                />

                {/* State + Pincode */}
                <View
                    style={
                        styles.row
                    }
                >
                    <View
                        style={
                            styles.half
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            State
                        </Text>

                        <Dropdown
                            style={
                                styles.smallDropdown
                            }
                            placeholderStyle={
                                styles.placeholder
                            }
                            selectedTextStyle={
                                styles.selectedText
                            }
                            containerStyle={
                                styles.dropdownContainer
                            }
                            data={
                                states
                            }
                            labelField="label"
                            valueField="value"
                            placeholder="Select State"
                            value={
                                state
                            }
                            onChange={
                                item =>
                                    setState(
                                        item.value
                                    )
                            }
                        />
                    </View>

                    <View
                        style={
                            styles.half
                        }
                    >
                        <Text
                            style={
                                styles.label
                            }
                        >
                            Postal Code
                        </Text>

                        <TextField
                            value={pincode}
                            onChangeText={handlePinCode}
                            keyboardType="number-pad"
                            maxLength={6}
                            placeholder="PIN Code"
                            placeholderTextColor="#A1A1A1"
                            style={styles.smallInput}
                        />
                    </View>
                </View>

                {/* Gender */}
                <Text
                    style={
                        styles.label
                    }
                >
                    Gender
                </Text>

                <Dropdown
                    style={
                        styles.dropdown
                    }
                    placeholderStyle={
                        styles.placeholder
                    }
                    selectedTextStyle={
                        styles.selectedText
                    }
                    containerStyle={
                        styles.dropdownContainer
                    }
                    data={
                        GENDER_OPTIONS
                    }
                    labelField="label"
                    valueField="value"
                    placeholder="Select Gender"
                    value={
                        gender
                    }
                    onChange={
                        item =>
                            setGender(
                                item.value
                            )
                    }
                />

                {/* Website */}
                <Text
                    style={
                        styles.label
                    }
                >
                    Website
                </Text>

                <TextField
                    value={website}
                    onChangeText={setWebsite}
                    placeholder="e.g. https://mysite.com"
                    placeholderTextColor="#A1A1A1"
                    style={styles.input}
                />

                {/* DOB */}
                <Text
                    style={
                        styles.label
                    }
                >
                    Date of Birth
                </Text>

                <Pressable
                    style={
                        styles.dropdown
                    }
                    onPress={() =>
                        setOpenDate(
                            true
                        )
                    }
                >
                    <Text
                        style={
                            styles.selectedText
                        }
                    >
                        {dob.toLocaleDateString()}
                    </Text>
                </Pressable>

                <DatePicker
                    modal
                    open={openDate}
                    date={dob}
                    mode="date"
                    onConfirm={
                        date => {
                            setOpenDate(
                                false
                            )
                            setDob(
                                date
                            )
                        }
                    }
                    onCancel={() =>
                        setOpenDate(
                            false
                        )
                    }
                />

                <Pressable
                    style={
                        styles.saveButton
                    }
                    onPress={() => {
                        // TODO: Replace with real API POST
                    }}
                >
                    <Text
                        style={
                            styles.saveText
                        }
                    >
                        Save Info
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}


