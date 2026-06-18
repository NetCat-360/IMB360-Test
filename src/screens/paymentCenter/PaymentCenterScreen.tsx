import React from 'react';

import {
    View,
    Text,
    Pressable,
    ScrollView,
    TextInput,
    Image,
    StatusBar,
    Modal,
  } from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  useDispatch,
  useSelector,
} from 'react-redux';

import ScreenHeader
from '../../components/ScreenHeader';

import {
  RootState,
} from '../../store/store';

import {
  setSelectedTab,
  setWithdrawalAmount,
  addBankDetails,
  addUpiDetails,
  PaymentTab,
} from '../../store/slices/paymentSlice';

import styles
from './styles';

import {
  AppNavigationProp,
} from '../../types/navigation';

type Props = {
  navigation:
  AppNavigationProp<'PaymentCenter'>;
};

type BankFormAction =
  | { type: 'SET_ACCOUNT_HOLDER_NAME'; payload: string }
  | { type: 'SET_ACCOUNT_NUMBER'; payload: string }
  | { type: 'SET_IFSC_CODE'; payload: string }
  | { type: 'SET_BANK_NAME'; payload: string };

interface BankFormState {
  accountHolderName: string;
  accountNumber: string;
  ifscCode: string;
  bankName: string;
}

const initialBankFormState: BankFormState = {
  accountHolderName: '',
  accountNumber: '',
  ifscCode: '',
  bankName: '',
};

function bankFormReducer(state: BankFormState, action: BankFormAction): BankFormState {
  switch (action.type) {
    case 'SET_ACCOUNT_HOLDER_NAME':
      return { ...state, accountHolderName: action.payload };
    case 'SET_ACCOUNT_NUMBER':
      return { ...state, accountNumber: action.payload };
    case 'SET_IFSC_CODE':
      return { ...state, ifscCode: action.payload };
    case 'SET_BANK_NAME':
      return { ...state, bankName: action.payload };
    default:
      return state;
  }
}

type UpiFormAction =
  | { type: 'SET_UPI_ID'; payload: string }
  | { type: 'SET_PAYMENT_TYPE'; payload: string }
  | { type: 'SET_SHOW_PAYMENT_DROPDOWN'; payload: boolean };

interface UpiFormState {
  upiId: string;
  paymentType: string;
  showPaymentDropdown: boolean;
}

const initialUpiFormState: UpiFormState = {
  upiId: '',
  paymentType: 'UPI ID',
  showPaymentDropdown: false,
};

function upiFormReducer(state: UpiFormState, action: UpiFormAction): UpiFormState {
  switch (action.type) {
    case 'SET_UPI_ID':
      return { ...state, upiId: action.payload };
    case 'SET_PAYMENT_TYPE':
      return { ...state, paymentType: action.payload };
    case 'SET_SHOW_PAYMENT_DROPDOWN':
      return { ...state, showPaymentDropdown: action.payload };
    default:
      return state;
  }
}

function TabSwitcher({ selectedTab, onTabChange }: { selectedTab: string; onTabChange: (tab: string) => void }) {
  return (
    <View style={styles.tabContainer}>
      <Pressable
        style={[
          styles.tabButton,
          selectedTab === 'purchase' && styles.activeTab,
        ]}
        onPress={() => onTabChange('purchase')}
      >
        <Text style={[styles.tabText, selectedTab === 'purchase' && styles.activeTabText]}>
          Purchase Points
        </Text>
      </Pressable>
      <Pressable
        style={[styles.tabButton, selectedTab === 'release' && styles.activeTab]}
        onPress={() => onTabChange('release')}
      >
        <Text style={[styles.tabText, selectedTab === 'release' && styles.activeTabText]}>
          Payment Release
        </Text>
      </Pressable>
    </View>
  );
}

function PurchaseTab({ currentBalance, accountType, expiryDate }: { currentBalance: number; accountType: string; expiryDate: string }) {
  return (
    <>
      <Text style={styles.expiryText}>Expires: {expiryDate}</Text>
      <View style={styles.balanceCard}>
        <View>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.balanceAmount}>₱ {currentBalance.toLocaleString()}</Text>
            <Text style={styles.pointsText}>points</Text>
          </View>
        </View>
        <View style={styles.accountWrapper}>
          <Text style={styles.accountTypeLabel}>Account Type</Text>
          <View style={styles.accountTypeBadge}>
            <Text style={styles.accountTypeText}>{accountType}</Text>
          </View>
        </View>
      </View>
      <View style={styles.purchaseCard}>
        <View style={styles.starCircle}>
          <Image source={require('../../assets/images/star.png')} style={styles.starIcon} resizeMode="contain" />
        </View>
        <Text style={styles.greenTitle}>Get Points. Get Started.</Text>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.description}>Purchase points to create tasks, pick campaigns, and unlock premium opportunities.</Text>
          <Text style={styles.description}>Whether you're a brand or an influencer, points keep you in control.</Text>
        </View>
        <View style={styles.purchaseInputContainer}>
          <TextInput placeholder="Min Topup limit is 500 points" placeholderTextColor="#888" keyboardType="numeric" style={styles.purchaseInput} />
        </View>
        <Pressable style={styles.razorpayButton}>
          <Text style={styles.razorpayText}>Topup with Razorpay</Text>
        </Pressable>
        <View style={styles.rateCard}>
          <Text style={styles.rateText}>1 point = 1 INR</Text>
          <Text style={styles.rateSubtext}>Enter the no. of points you want to purchase.</Text>
        </View>
      </View>
    </>
  );
}

function ReleaseTab({
  availableWithdrawal,
  reservedAmount,
  withdrawalAmount,
  bankAdded,
  upiAdded,
  onWithdrawalChange,
  onOpenBankModal,
  onOpenUpiModal,
  onNext,
}: {
  availableWithdrawal: number;
  reservedAmount: number;
  withdrawalAmount: string;
  bankAdded: boolean;
  upiAdded: boolean;
  onWithdrawalChange: (text: string) => void;
  onOpenBankModal: () => void;
  onOpenUpiModal: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <View style={styles.releaseTopCard}>
        <View style={styles.releaseCardRow}>
          <View style={styles.releaseIconCircle}>
            <Image source={require('../../assets/images/pointsblue.png')} style={styles.releaseIcon} resizeMode="contain" />
          </View>
          <View style={{ flex: 1, marginLeft: 18 }}>
            <Text style={styles.releaseTitle}>Available for Withdrawal</Text>
            <Text style={styles.releaseAmount}>₱ {availableWithdrawal.toLocaleString()}</Text>
            <Text style={styles.releaseSubtext}>From completed campaigns and earnings</Text>
          </View>
        </View>
      </View>
      <View style={styles.releaseTopCard}>
        <View style={styles.releaseCardRow}>
          <View style={[styles.releaseIconCircle, { borderColor: '#FFE600' }]}>
            <Image source={require('../../assets/images/shield.png')} style={styles.releaseIcon} resizeMode="contain" />
          </View>
          <View style={{ flex: 1, marginLeft: 18 }}>
            <Text style={styles.releaseTitle}>Reserved Amount</Text>
            <Text style={styles.releaseAmount}>₱ {reservedAmount.toFixed(2)}</Text>
            <Text style={styles.releaseSubtext}>(Security Hold)</Text>
          </View>
        </View>
      </View>
      <View style={styles.withdrawCard}>
        <View style={styles.withdrawHeader}>
          <View style={styles.moneyCircle}><Text style={styles.moneyIcon}>$</Text></View>
          <Text style={styles.withdrawTitle}>Withdrawal Request</Text>
        </View>
        <Text style={styles.withdrawAmountLabel}>Withdrawal Amount</Text>
        <View style={styles.withdrawInputContainer}>
          <TextInput value={withdrawalAmount} onChangeText={onWithdrawalChange} placeholder="₱ 0.00" placeholderTextColor="#888" keyboardType="numeric" style={styles.withdrawInput} />
        </View>
        <Text style={styles.minimumText}>Minimum available: <Text style={{ color: '#00FF00' }}>₱26,350</Text></Text>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>Bank Details</Text>
          <Image source={require('../../assets/images/bank.png')} style={styles.bankIcon} />
          <Text style={styles.noDetailsText}>{bankAdded ? 'Bank details added' : 'No bank details added'}</Text>
          <Pressable style={styles.addButton} onPress={onOpenBankModal}>
            <Text style={styles.addButtonText}>+ Add Bank Details</Text>
          </Pressable>
        </View>
        <View style={styles.orContainer}>
          <View style={styles.orLine} />
          <View style={styles.orBox}><Text style={styles.orText}>OR</Text></View>
          <View style={styles.orLine} />
        </View>
        <View style={styles.detailCard}>
          <Text style={styles.detailTitle}>UPI Details</Text>
          <Image source={require('../../assets/images/bank.png')} style={styles.bankIcon} />
          <Text style={styles.noDetailsText}>{upiAdded ? 'UPI details added' : 'No UPI details added'}</Text>
          <Pressable style={styles.addButton} onPress={onOpenUpiModal}>
            <Text style={styles.addButtonText}>+ Add UPI Details</Text>
          </Pressable>
        </View>
        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>Minimum withdrawal: ₱100</Text>
          <Text style={styles.noticeSubtext}>Processed within 24–48 hours</Text>
        </View>
      </View>
      <Pressable style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextText}>Next</Text>
      </Pressable>
      <Pressable style={styles.requestButton}>
        <Text style={styles.requestText}>Request Withdrawal</Text>
      </Pressable>
    </>
  );
}

function BankModal({
  visible,
  onClose,
  accountHolderName,
  setAccountHolderName,
  accountNumber,
  setAccountNumber,
  ifscCode,
  setIfscCode,
  bankName,
  setBankName,
  onAddBank,
}: {
  visible: boolean;
  onClose: () => void;
  accountHolderName: string;
  setAccountHolderName: (v: string) => void;
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  ifscCode: string;
  setIfscCode: (v: string) => void;
  bankName: string;
  setBankName: (v: string) => void;
  onAddBank: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Bank Details</Text>
          <Text style={styles.inputLabel}>Account Holder Name<Text style={styles.required}> *</Text></Text>
          <TextInput value={accountHolderName} onChangeText={setAccountHolderName} placeholder="Full name as per bank account" placeholderTextColor="#8E8E8E" style={styles.modalInput} />
          <Text style={styles.inputLabel}>Account Number<Text style={styles.required}> *</Text></Text>
          <TextInput value={accountNumber} onChangeText={setAccountNumber} placeholder="Enter account number" placeholderTextColor="#8E8E8E" style={styles.modalInput} />
          <Text style={styles.inputLabel}>IFSC Code<Text style={styles.required}> *</Text></Text>
          <TextInput value={ifscCode} onChangeText={setIfscCode} placeholder="Enter IFSC Code" placeholderTextColor="#8E8E8E" style={styles.modalInput} />
          <Text style={styles.inputLabel}>Bank Name<Text style={styles.required}> *</Text></Text>
          <TextInput value={bankName} onChangeText={setBankName} placeholder="Enter bank name" placeholderTextColor="#8E8E8E" style={styles.modalInput} />
          <View style={styles.modalButtonRow}>
            <Pressable style={styles.cancelButton} onPress={onClose}><Text style={styles.cancelText}>Cancel</Text></Pressable>
            <Pressable style={styles.addDetailsButton} onPress={onAddBank}><Text style={styles.addDetailsText}>Add Details</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function UpiModal({
  visible,
  onClose,
  paymentType,
  setPaymentType,
  showPaymentDropdown,
  setShowPaymentDropdown,
  upiId,
  setUpiId,
  onAddUpi,
}: {
  visible: boolean;
  onClose: () => void;
  paymentType: string;
  setPaymentType: (v: string) => void;
  showPaymentDropdown: boolean;
  setShowPaymentDropdown: (v: boolean) => void;
  upiId: string;
  setUpiId: (v: string) => void;
  onAddUpi: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add UPI Details</Text>
          <Text style={styles.inputLabel}>Payment Type<Text style={styles.required}> *</Text></Text>
          <Pressable style={styles.dropdownButton} onPress={() => setShowPaymentDropdown(!showPaymentDropdown)}>
            <Text style={styles.dropdownText}>{paymentType}</Text>
            <Text style={styles.dropdownArrow}>˅</Text>
          </Pressable>
          {showPaymentDropdown && (
            <View style={styles.dropdownMenu}>
              <Pressable style={styles.dropdownItem} onPress={() => { setPaymentType('UPI ID'); setShowPaymentDropdown(false); }}>
                <Text style={styles.dropdownItemText}>UPI ID</Text>
                {paymentType === 'UPI ID' && <Text style={styles.checkMark}>✓</Text>}
              </Pressable>
              <Pressable style={styles.dropdownItem} onPress={() => { setPaymentType('Phone Number'); setShowPaymentDropdown(false); }}>
                <Text style={styles.dropdownItemText}>Phone Number</Text>
                {paymentType === 'Phone Number' && <Text style={styles.checkMark}>✓</Text>}
              </Pressable>
            </View>
          )}
          <Text style={styles.inputLabel}>{paymentType}<Text style={styles.required}> *</Text></Text>
          <TextInput value={upiId} onChangeText={setUpiId} placeholder={paymentType === 'UPI ID' ? 'user@paytm, user@phonepe' : 'Enter phone number'} placeholderTextColor="#8E8E8E" style={styles.modalInput} />
          <View style={styles.modalButtonRow}>
            <Pressable style={styles.cancelButton} onPress={onClose}><Text style={styles.cancelText}>Cancel</Text></Pressable>
            <Pressable style={styles.addDetailsButton} onPress={onAddUpi}><Text style={styles.addDetailsText}>Add Details</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default function PaymentCenterScreen({
  navigation,
}: Props) {

  const dispatch =
    useDispatch();
    const [bankModalVisible,
        setBankModalVisible] =
        React.useState(false);
      
      const [upiModalVisible,
        setUpiModalVisible] =
        React.useState(false);
      
      const [bankFormState, dispatchBankForm] = React.useReducer(bankFormReducer, initialBankFormState);
      const [upiFormState, dispatchUpiForm] = React.useReducer(upiFormReducer, initialUpiFormState);

  const {
    selectedTab,
    currentBalance,
    availableWithdrawal,
    reservedAmount,
    withdrawalAmount,
    bankAdded,
    upiAdded,
    accountType,
    expiryDate,
  } = useSelector(
    (
      state:
      RootState
    ) =>
      state.payment
  );

  return (
    <SafeAreaView
      style={styles.container}
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <TabSwitcher selectedTab={selectedTab} onTabChange={(tab: string) => dispatch(setSelectedTab(tab as PaymentTab))} />

        {selectedTab === 'purchase' && (
          <PurchaseTab currentBalance={currentBalance} accountType={accountType} expiryDate={expiryDate} />
        )}

        {selectedTab === 'release' && (
          <ReleaseTab
            availableWithdrawal={availableWithdrawal}
            reservedAmount={reservedAmount}
            withdrawalAmount={withdrawalAmount}
            bankAdded={bankAdded}
            upiAdded={upiAdded}
            onWithdrawalChange={(text) => dispatch(setWithdrawalAmount(text))}
            onOpenBankModal={() => setBankModalVisible(true)}
            onOpenUpiModal={() => setUpiModalVisible(true)}
            onNext={() => navigation.navigate('PaymentStatement')}
          />
        )}
      </ScrollView>

      <BankModal
        visible={bankModalVisible}
        onClose={() => setBankModalVisible(false)}
        accountHolderName={bankFormState.accountHolderName}
        setAccountHolderName={(v) => dispatchBankForm({ type: 'SET_ACCOUNT_HOLDER_NAME', payload: v })}
        accountNumber={bankFormState.accountNumber}
        setAccountNumber={(v) => dispatchBankForm({ type: 'SET_ACCOUNT_NUMBER', payload: v })}
        ifscCode={bankFormState.ifscCode}
        setIfscCode={(v) => dispatchBankForm({ type: 'SET_IFSC_CODE', payload: v })}
        bankName={bankFormState.bankName}
        setBankName={(v) => dispatchBankForm({ type: 'SET_BANK_NAME', payload: v })}
        onAddBank={() => { dispatch(addBankDetails('bank-added')); setBankModalVisible(false); }}
      />

      <UpiModal
        visible={upiModalVisible}
        onClose={() => setUpiModalVisible(false)}
        paymentType={upiFormState.paymentType}
        setPaymentType={(v) => dispatchUpiForm({ type: 'SET_PAYMENT_TYPE', payload: v })}
        showPaymentDropdown={upiFormState.showPaymentDropdown}
        setShowPaymentDropdown={(v) => dispatchUpiForm({ type: 'SET_SHOW_PAYMENT_DROPDOWN', payload: v })}
        upiId={upiFormState.upiId}
        setUpiId={(v) => dispatchUpiForm({ type: 'SET_UPI_ID', payload: v })}
        onAddUpi={() => { dispatch(addUpiDetails('upi-added')); setUpiModalVisible(false); }}
      />
    </SafeAreaView>
  );
}