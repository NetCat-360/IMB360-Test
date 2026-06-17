import React, {
    useMemo,
    useState,
    useReducer,
} from 'react'

import {
    View,
    Text,
    Pressable,
    ScrollView,
} from 'react-native'

import DatePicker
    from 'react-native-date-picker'

import TextField from '../../../components/common/TextField/TextField'

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

function CountryDropdownField({ label, data, value, onChange, placeholder }: { label: string; data: any[]; value: any; onChange: (v: any) => void; placeholder: string }) {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <Dropdown style={styles.dropdown} placeholderStyle={styles.placeholder} selectedTextStyle={styles.selectedText} containerStyle={styles.dropdownContainer} data={data} labelField="label" valueField="value" placeholder={placeholder} value={value} onChange={onChange} />
    </>
  );
}

function StatePincodeRow({ states, state, setState, pincode, handlePinCode }: { states: any[]; state: any; setState: (v: any) => void; pincode: string; handlePinCode: (text: string) => void }) {
  return (
    <View style={styles.row}>
      <View style={styles.half}>
        <CountryDropdownField label="State" data={states} value={state} onChange={item => setState(item.value)} placeholder="Select State" />
      </View>
      <View style={styles.half}>
        <Text style={styles.label}>Postal Code</Text>
        <TextField value={pincode} onChangeText={handlePinCode} keyboardType="number-pad" maxLength={6} placeholder="PIN Code" placeholderTextColor="#A1A1A1" style={styles.smallInput} />
      </View>
    </View>
  );
}

function DobPicker({ dob, openDate, setOpenDate, setDob }: { dob: Date; openDate: boolean; setOpenDate: (v: boolean) => void; setDob: (v: Date) => void }) {
  return (
    <>
      <Text style={styles.label}>Date of Birth</Text>
      <Pressable style={styles.dropdown} onPress={() => setOpenDate(true)}>
        <Text style={styles.selectedText}>{dob.toLocaleDateString()}</Text>
      </Pressable>
      <DatePicker modal open={openDate} date={dob} mode="date" onConfirm={date => { setOpenDate(false); setDob(date); }} onCancel={() => setOpenDate(false)} />
    </>
  );
}

function SaveButton() {
  return (
    <Pressable style={styles.saveButton} onPress={() => {}}>
      <Text style={styles.saveText}>Save Info</Text>
    </Pressable>
  );
}

type FormAction =
    | { type: 'SET_ADDRESS'; payload: string }
    | { type: 'SET_COUNTRY'; payload: any }
    | { type: 'SET_STATE'; payload: any }
    | { type: 'SET_PINCODE'; payload: string }
    | { type: 'SET_GENDER'; payload: any }
    | { type: 'SET_WEBSITE'; payload: string }
    | { type: 'SET_DOB'; payload: Date };

interface FormState {
    address: string;
    country: any;
    state: any;
    pincode: string;
    gender: any;
    website: string;
    dob: Date;
}

const initialFormState: FormState = {
    address: '',
    country: null,
    state: null,
    pincode: '',
    gender: null,
    website: '',
    dob: new Date(),
};

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case 'SET_ADDRESS':
            return { ...state, address: action.payload };
        case 'SET_COUNTRY':
            return { ...state, country: action.payload, state: null };
        case 'SET_STATE':
            return { ...state, state: action.payload };
        case 'SET_PINCODE':
            return { ...state, pincode: action.payload };
        case 'SET_GENDER':
            return { ...state, gender: action.payload };
        case 'SET_WEBSITE':
            return { ...state, website: action.payload };
        case 'SET_DOB':
            return { ...state, dob: action.payload };
        default:
            return state;
    }
}

export default function AdditionalInfoScreen({
    navigation,
}: Props) {
    const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
    const [openDate, setOpenDate] = useState(false)

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
            if (!formState.country)
                return []

            return State
                .getStatesOfCountry(
                    formState.country
                )
                ?.map(item => ({
                    label:
                        item.name,
                    value:
                        item.isoCode,
                })) || []
        }, [formState.country])

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
                dispatchForm({ type: 'SET_PINCODE', payload: onlyNums })
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

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <Text style={styles.description}>
                    This makes it easier for you to recover your account.{'\n'}
                    Verified Emails make your account more secure
                </Text>

                <Text style={styles.label}>Address</Text>
                <TextField value={formState.address} onChangeText={(text) => dispatchForm({ type: 'SET_ADDRESS', payload: text })} placeholder="Enter your Street address" placeholderTextColor="#A1A1A1" style={styles.input} />

                <CountryDropdownField label="Country" data={countries} value={formState.country} onChange={item => dispatchForm({ type: 'SET_COUNTRY', payload: item.value })} placeholder="Select Country" />

                <StatePincodeRow states={states} state={formState.state} setState={(v) => dispatchForm({ type: 'SET_STATE', payload: v })} pincode={formState.pincode} handlePinCode={handlePinCode} />

                <CountryDropdownField label="Gender" data={GENDER_OPTIONS} value={formState.gender} onChange={item => dispatchForm({ type: 'SET_GENDER', payload: item.value })} placeholder="Select Gender" />

                <Text style={styles.label}>Website</Text>
                <TextField value={formState.website} onChangeText={(text) => dispatchForm({ type: 'SET_WEBSITE', payload: text })} placeholder="e.g. https://mysite.com" placeholderTextColor="#A1A1A1" style={styles.input} />

                <DobPicker dob={formState.dob} openDate={openDate} setOpenDate={setOpenDate} setDob={(d) => dispatchForm({ type: 'SET_DOB', payload: d })} />
                <SaveButton />
            </ScrollView>
        </View>
    )
}


