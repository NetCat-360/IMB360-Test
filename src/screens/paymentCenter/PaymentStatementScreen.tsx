import React, {
    useState,
    useReducer,
  } from 'react';
  
  import {
    View,
    Text,
    Pressable,
    ScrollView,
    StatusBar,
    Image,
  } from 'react-native';
  
  import DatePicker
  from 'react-native-date-picker';
  
  import Icon
  from 'react-native-vector-icons/Feather';
  
  import {
    SafeAreaView,
  } from 'react-native-safe-area-context';
  
  import ScreenHeader
  from '../../components/ScreenHeader';
  
  import styles
  from './statementstyles';
  
  import {
    AppNavigationProp,
  } from '../../types/navigation';
  
  type Props = {
    navigation:
      AppNavigationProp<'PaymentStatement'>;
  };
  
  type TabAction =
    | { type: 'SET_SELECTED_TAB'; payload: string }
    | { type: 'SET_SELECTED_HISTORY_TAB'; payload: string };
  
  interface TabState {
    selectedTab: string;
    selectedHistoryTab: string;
  }
  
  const initialTabState: TabState = {
    selectedTab: 'statement',
    selectedHistoryTab: 'release',
  };
  
  function tabReducer(state: TabState, action: TabAction): TabState {
    switch (action.type) {
      case 'SET_SELECTED_TAB':
        return { ...state, selectedTab: action.payload };
      case 'SET_SELECTED_HISTORY_TAB':
        return { ...state, selectedHistoryTab: action.payload };
      default:
        return state;
    }
  }
  
  type FormAction =
    | { type: 'SET_START_DATE'; payload: Date }
    | { type: 'SET_END_DATE'; payload: Date }
    | { type: 'SET_OPEN_START_PICKER'; payload: boolean }
    | { type: 'SET_OPEN_END_PICKER'; payload: boolean }
    | { type: 'SET_SELECTED_FORMAT'; payload: string }
    | { type: 'SET_SHOW_DROPDOWN'; payload: boolean };
  
  interface FormState {
    startDate: Date;
    endDate: Date;
    openStartPicker: boolean;
    openEndPicker: boolean;
    selectedFormat: string;
    showDropdown: boolean;
  }
  
  const initialFormState: FormState = {
    startDate: new Date(),
    endDate: new Date(),
    openStartPicker: false,
    openEndPicker: false,
    selectedFormat: 'PDF',
    showDropdown: false,
  };
  
  function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
      case 'SET_START_DATE':
        return { ...state, startDate: action.payload };
      case 'SET_END_DATE':
        return { ...state, endDate: action.payload };
      case 'SET_OPEN_START_PICKER':
        return { ...state, openStartPicker: action.payload };
      case 'SET_OPEN_END_PICKER':
        return { ...state, openEndPicker: action.payload };
      case 'SET_SELECTED_FORMAT':
        return { ...state, selectedFormat: action.payload };
      case 'SET_SHOW_DROPDOWN':
        return { ...state, showDropdown: action.payload };
      default:
        return state;
    }
  }
  
  function TopTabs({ selectedTab, onTabChange }: { selectedTab: string; onTabChange: (tab: string) => void }) {
    return (
      <View style={styles.tabContainer}>
        <Pressable style={[styles.tabButton, selectedTab === 'statement' && styles.activeTab]} onPress={() => onTabChange('statement')}>
          <Text style={selectedTab === 'statement' ? styles.activeTabText : styles.tabText}>Statement</Text>
        </Pressable>
        <Pressable style={[styles.tabButton, selectedTab === 'history' && styles.activeTab]} onPress={() => onTabChange('history')}>
          <Text style={selectedTab === 'history' ? styles.activeTabText : styles.tabText}>History</Text>
        </Pressable>
      </View>
    );
  }

  function StatementTab({
    startDate, setStartDate, endDate, setEndDate,
    openStartPicker, setOpenStartPicker, openEndPicker, setOpenEndPicker,
    selectedFormat, setSelectedFormat, showDropdown, setShowDropdown,
  }: {
    startDate: Date; setStartDate: (d: Date) => void;
    endDate: Date; setEndDate: (d: Date) => void;
    openStartPicker: boolean; setOpenStartPicker: (v: boolean) => void;
    openEndPicker: boolean; setOpenEndPicker: (v: boolean) => void;
    selectedFormat: string; setSelectedFormat: (v: string) => void;
    showDropdown: boolean; setShowDropdown: (v: boolean) => void;
  }) {
    return (
      <View style={styles.statementCard}>
        <View style={styles.statementHeader}>
          <View style={styles.statementIconCircle}>
            <Image source={require('../../assets/images/wallet.png')} style={styles.statementIcon} />
          </View>
          <Text style={styles.statementTitle}>Payment Statement</Text>
        </View>
        <View style={styles.dateRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>Start Date</Text>
            <Pressable style={styles.dateInput} onPress={() => setOpenStartPicker(true)}>
              <Text style={styles.dateText}>{startDate.toLocaleDateString('en-GB')}</Text>
              <Icon name="calendar" size={20} color="#FFF" />
            </Pressable>
          </View>
          <View style={{ width: 16 }} />
          <View style={{ flex: 1 }}>
            <Text style={styles.inputLabel}>End Date</Text>
            <Pressable style={styles.dateInput} onPress={() => setOpenEndPicker(true)}>
              <Text style={styles.dateText}>{endDate.toLocaleDateString('en-GB')}</Text>
              <Icon name="calendar" size={20} color="#FFF" />
            </Pressable>
            <Text style={styles.helperText}>Select start date first</Text>
          </View>
        </View>
        <Text style={styles.inputLabel}>Format</Text>
        <Pressable style={styles.dropdownButton} onPress={() => setShowDropdown(!showDropdown)}>
          <Text style={styles.dropdownText}>{selectedFormat}</Text>
          <Icon name={showDropdown ? 'chevron-up' : 'chevron-down'} size={22} color="#BDBDBD" />
        </Pressable>
        {showDropdown && (
          <View style={styles.dropdownMenu}>
            {['PDF', 'Excel', 'CSV'].map(item => (
              <Pressable key={item} style={styles.dropdownItem} onPress={() => { setSelectedFormat(item); setShowDropdown(false); }}>
                <Text style={styles.dropdownItemText}>{item}</Text>
                {selectedFormat === item && <Icon name="check" size={18} color="#FFF" />}
              </Pressable>
            ))}
          </View>
        )}
        <Pressable style={styles.generateButton}>
          <Text style={styles.generateText}>Generate Statement</Text>
        </Pressable>
        <View style={styles.footerCard}>
          <Text style={styles.footerText}>Custom date range for detailed analysis</Text>
          <Icon name="calendar" size={20} color="#FFF" />
        </View>
      </View>
    );
  }

  function HistoryTab({
    selectedHistoryTab, onHistoryTabChange,
  }: {
    selectedHistoryTab: string; onHistoryTabChange: (tab: string) => void;
  }) {
    return (
      <View style={styles.historyCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.historyTabsContainer}>
          <Pressable style={selectedHistoryTab === 'release' ? styles.historyActiveTab : styles.historyInactiveTab} onPress={() => onHistoryTabChange('release')}>
            <Text style={selectedHistoryTab === 'release' ? styles.historyActiveText : styles.historyInactiveText}>Date of Release</Text>
          </Pressable>
          <Pressable style={selectedHistoryTab === 'transaction' ? styles.historyActiveTab : styles.historyInactiveTab} onPress={() => onHistoryTabChange('transaction')}>
            <Text style={selectedHistoryTab === 'transaction' ? styles.historyActiveText : styles.historyInactiveText}>Transaction ID</Text>
          </Pressable>
          <Pressable style={selectedHistoryTab === 'amount' ? styles.historyActiveTab : styles.historyInactiveTab} onPress={() => onHistoryTabChange('amount')}>
            <Text style={selectedHistoryTab === 'amount' ? styles.historyActiveText : styles.historyInactiveText}>Amount</Text>
          </Pressable>
          <Pressable style={selectedHistoryTab === 'paymentMode' ? styles.historyActiveTab : styles.historyInactiveTab} onPress={() => onHistoryTabChange('paymentMode')}>
            <Text style={selectedHistoryTab === 'paymentMode' ? styles.historyActiveText : styles.historyInactiveText}>Mode of Payment</Text>
          </Pressable>
        </ScrollView>
        <View style={styles.emptyHistoryContainer}>
          <View style={styles.emptyIconCircle}><Text style={styles.emptyDollar}>$</Text></View>
          <Text style={styles.emptyText}>No payment history available</Text>
        </View>
      </View>
    );
  }

  export default function
  PaymentStatementScreen({
    navigation,
  }: Props) {
  
    const [tabState, dispatchTab] = useReducer(tabReducer, initialTabState);
    const [formState, dispatchForm] = useReducer(formReducer, initialFormState);
  
    return (
      <SafeAreaView
        style={
          styles.container
        }
        edges={[]}
      >
        <StatusBar
          backgroundColor="#000"
          barStyle="light-content"
        />
  
        <ScreenHeader
          title="Payment Center"
          onBack={() =>
            navigation.goBack()
          }
        />
  
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <TopTabs selectedTab={tabState.selectedTab} onTabChange={(tab) => dispatchTab({ type: 'SET_SELECTED_TAB', payload: tab })} />

          {tabState.selectedTab === 'statement' && (
            <StatementTab
              startDate={formState.startDate} setStartDate={(d) => dispatchForm({ type: 'SET_START_DATE', payload: d })}
              endDate={formState.endDate} setEndDate={(d) => dispatchForm({ type: 'SET_END_DATE', payload: d })}
              openStartPicker={formState.openStartPicker} setOpenStartPicker={(v) => dispatchForm({ type: 'SET_OPEN_START_PICKER', payload: v })}
              openEndPicker={formState.openEndPicker} setOpenEndPicker={(v) => dispatchForm({ type: 'SET_OPEN_END_PICKER', payload: v })}
              selectedFormat={formState.selectedFormat} setSelectedFormat={(v) => dispatchForm({ type: 'SET_SELECTED_FORMAT', payload: v })}
              showDropdown={formState.showDropdown} setShowDropdown={(v) => dispatchForm({ type: 'SET_SHOW_DROPDOWN', payload: v })}
            />
          )}

          {tabState.selectedTab === 'history' && (
            <HistoryTab selectedHistoryTab={tabState.selectedHistoryTab} onHistoryTabChange={(tab) => dispatchTab({ type: 'SET_SELECTED_HISTORY_TAB', payload: tab })} />
          )}
        </ScrollView>
  
        {/* START DATE PICKER */}
  
        <DatePicker
          modal
          mode="date"
          open={
            formState.openStartPicker
          }
          date={formState.startDate}
          onConfirm={date => {
            dispatchForm({ type: 'SET_OPEN_START_PICKER', payload: false });
            dispatchForm({ type: 'SET_START_DATE', payload: date });
  
            if (
              formState.endDate < date
            ) {
              dispatchForm({ type: 'SET_END_DATE', payload: date });
            }
          }}
          onCancel={() =>
            dispatchForm({ type: 'SET_OPEN_START_PICKER', payload: false })
          }
        />
  
        {/* END DATE PICKER */}
  
        <DatePicker
          modal
          mode="date"
          open={
            formState.openEndPicker
          }
          date={formState.endDate}
          minimumDate={
            formState.startDate
          }
          onConfirm={date => {
            dispatchForm({ type: 'SET_OPEN_END_PICKER', payload: false });
            dispatchForm({ type: 'SET_END_DATE', payload: date });
          }}
          onCancel={() =>
            dispatchForm({ type: 'SET_OPEN_END_PICKER', payload: false })
          }
        />
      </SafeAreaView>
    );
  }