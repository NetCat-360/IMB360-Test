import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
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
      
      const [accountHolderName,
        setAccountHolderName] =
        React.useState('');
      
      const [accountNumber,
        setAccountNumber] =
        React.useState('');
      
      const [ifscCode,
        setIfscCode] =
        React.useState('');
      
      const [bankName,
        setBankName] =
        React.useState('');
      
      const [upiId,
        setUpiId] =
        React.useState('');
      
      const [paymentType,
        setPaymentType] =
        React.useState('UPI ID');
      
      const [showPaymentDropdown,
        setShowPaymentDropdown] =
        React.useState(false);

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
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* TAB SWITCHER */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab ===
                'purchase' &&
                styles.activeTab,
            ]}
            onPress={() =>
              dispatch(
                setSelectedTab(
                  'purchase'
                )
              )
            }
          >
            <Text
              style={[
                styles.tabText,
                selectedTab ===
                  'purchase' &&
                  styles.activeTabText,
              ]}
            >
              Purchase Points
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabButton,
              selectedTab ===
                'release' &&
                styles.activeTab,
            ]}
            onPress={() =>
              dispatch(
                setSelectedTab(
                  'release'
                )
              )
            }
          >
            <Text
              style={[
                styles.tabText,
                selectedTab ===
                  'release' &&
                  styles.activeTabText,
              ]}
            >
              Payment Release
            </Text>
          </TouchableOpacity>
        </View>

        {/* PURCHASE TAB */}
        {selectedTab ===
          'purchase' && (
          <>
            <Text
              style={
                styles.expiryText
              }
            >
              Expires:{' '}
              {expiryDate}
            </Text>

            {/* BALANCE */}
            <View
              style={
                styles.balanceCard
              }
            >
              <View>
                <Text
                  style={
                    styles.balanceLabel
                  }
                >
                  Current Balance
                </Text>

                <View
                  style={
                    styles.balanceRow
                  }
                >
                  <Text
                    style={
                      styles.balanceAmount
                    }
                  >
                    ₱{' '}
                    {currentBalance.toLocaleString()}
                  </Text>

                  <Text
                    style={
                      styles.pointsText
                    }
                  >
                    points
                  </Text>
                </View>
              </View>

              <View
                style={
                  styles.accountWrapper
                }
              >
                <Text
                  style={
                    styles.accountTypeLabel
                  }
                >
                  Account Type
                </Text>

                <View
                  style={
                    styles.accountTypeBadge
                  }
                >
                  <Text
                    style={
                      styles.accountTypeText
                    }
                  >
                    {
                      accountType
                    }
                  </Text>
                </View>
              </View>
            </View>

            {/* PURCHASE CARD */}
            <View
              style={
                styles.purchaseCard
              }
            >
              <View
  style={
    styles.starCircle
  }
>
  <Image
    source={require('../../assets/images/star.png')}
    style={
      styles.starIcon
    }
    resizeMode="contain"
  />
</View>

              <Text
                style={
                  styles.greenTitle
                }
              >
                Get Points.
                Get Started.
              </Text>

              <View
                style={
                  styles.descriptionWrapper
                }
              >
                <Text
                  style={
                    styles.description
                  }
                >
                  Purchase points
                  to create tasks,
                  pick campaigns,
                  and unlock
                  premium
                  opportunities.
                </Text>

                <Text
                  style={
                    styles.description
                  }
                >
                  Whether you're
                  a brand or an
                  influencer,
                  points keep you
                  in control.
                </Text>
              </View>

              {/* INPUT */}
              <View
                style={
                  styles.purchaseInputContainer
                }
              >
                <TextInput
                  placeholder="Min Topup limit is 500 points"
                  placeholderTextColor="#888"
                  keyboardType="numeric"
                  style={
                    styles.purchaseInput
                  }
                />
              </View>

              {/* BUTTON */}
              <TouchableOpacity
                style={
                  styles.razorpayButton
                }
              >
                <Text
                  style={
                    styles.razorpayText
                  }
                >
                  Topup with Razorpay
                </Text>
              </TouchableOpacity>

              {/* RATE */}
              <View
                style={
                  styles.rateCard
                }
              >
                <Text
                  style={
                    styles.rateText
                  }
                >
                  1 point = 1 INR
                </Text>

                <Text
                  style={
                    styles.rateSubtext
                  }
                >
                  Enter the no.
                  of points you
                  want to purchase.
                </Text>
              </View>
            </View>
          </>
        )}

       {/* RELEASE TAB */}
{selectedTab ===
  'release' && (
  <>
    {/* AVAILABLE WITHDRAWAL */}
    <View
      style={
        styles.releaseTopCard
      }
    >
      <View
        style={
          styles.releaseCardRow
        }
      >
        <View
          style={
            styles.releaseIconCircle
          }
        >
          <Image
            source={require('../../assets/images/pointsblue.png')}
            style={
              styles.releaseIcon
            }
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 18,
          }}
        >
          <Text
            style={
              styles.releaseTitle
            }
          >
            Available for
            Withdrawal
          </Text>

          <Text
            style={
              styles.releaseAmount
            }
          >
            ₱{' '}
            {availableWithdrawal.toLocaleString()}
          </Text>

          <Text
            style={
              styles.releaseSubtext
            }
          >
            From completed
            campaigns and
            earnings
          </Text>
        </View>
      </View>
    </View>

    {/* RESERVED AMOUNT */}
    <View
      style={
        styles.releaseTopCard
      }
    >
      <View
        style={
          styles.releaseCardRow
        }
      >
        <View
          style={[
            styles.releaseIconCircle,
            {
              borderColor:
                '#FFE600',
            },
          ]}
        >
          <Image
            source={require('../../assets/images/shield.png')}
            style={
              styles.releaseIcon
            }
            resizeMode="contain"
          />
        </View>

        <View
          style={{
            flex: 1,
            marginLeft: 18,
          }}
        >
          <Text
            style={
              styles.releaseTitle
            }
          >
            Reserved Amount
          </Text>

          <Text
            style={
              styles.releaseAmount
            }
          >
            ₱{' '}
            {reservedAmount.toFixed(
              2
            )}
          </Text>

          <Text
            style={
              styles.releaseSubtext
            }
          >
            (Security Hold)
          </Text>
        </View>
      </View>
    </View>

    {/* WITHDRAWAL BOX */}
    <View
      style={
        styles.withdrawCard
      }
    >
      <View
        style={
          styles.withdrawHeader
        }
      >
        <View
          style={
            styles.moneyCircle
          }
        >
          <Text
            style={
              styles.moneyIcon
            }
          >
            $
          </Text>
        </View>

        <Text
          style={
            styles.withdrawTitle
          }
        >
          Withdrawal
          Request
        </Text>
      </View>

      <Text
        style={
          styles.withdrawAmountLabel
        }
      >
        Withdrawal
        Amount
      </Text>

      {/* INPUT */}
      <View
        style={
          styles.withdrawInputContainer
        }
      >
        <TextInput
          value={
            withdrawalAmount
          }
          onChangeText={text =>
            dispatch(
              setWithdrawalAmount(
                text
              )
            )
          }
          placeholder="₱ 0.00"
          placeholderTextColor="#888"
          keyboardType="numeric"
          style={
            styles.withdrawInput
          }
        />
      </View>

      <Text
        style={
          styles.minimumText
        }
      >
        Minimum
        available:{' '}
        <Text
          style={{
            color:
              '#00FF00',
          }}
        >
          ₱26,350
        </Text>
      </Text>

      {/* BANK DETAILS */}
      <View
        style={
          styles.detailCard
        }
      >
        <Text
          style={
            styles.detailTitle
          }
        >
          Bank Details
        </Text>

        <Image
          source={require('../../assets/images/bank.png')}
          style={
            styles.bankIcon
          }
        />

        <Text
          style={
            styles.noDetailsText
          }
        >
          {bankAdded
            ? 'Bank details added'
            : 'No bank details added'}
        </Text>

        <TouchableOpacity
          style={
            styles.addButton
          }
          onPress={() =>
            setBankModalVisible(
              true
            )
          }
        >
          <Text
            style={
              styles.addButtonText
            }
          >
            + Add Bank
            Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* OR */}
      <View
        style={
          styles.orContainer
        }
      >
        <View
          style={
            styles.orLine
          }
        />

        <View
          style={
            styles.orBox
          }
        >
          <Text
            style={
              styles.orText
            }
          >
            OR
          </Text>
        </View>

        <View
          style={
            styles.orLine
          }
        />
      </View>

      {/* UPI DETAILS */}
      <View
        style={
          styles.detailCard
        }
      >
        <Text
          style={
            styles.detailTitle
          }
        >
          UPI Details
        </Text>

        <Image
          source={require('../../assets/images/bank.png')}
          style={
            styles.bankIcon
          }
        />

        <Text
          style={
            styles.noDetailsText
          }
        >
          {upiAdded
            ? 'UPI details added'
            : 'No UPI details added'}
        </Text>

        <TouchableOpacity
          style={
            styles.addButton
          }
          onPress={() =>
            setUpiModalVisible(
              true
            )
          }
        >
          <Text
            style={
              styles.addButtonText
            }
          >
            + Add UPI
            Details
          </Text>
        </TouchableOpacity>
      </View>

      {/* NOTICE */}
      <View
        style={
          styles.noticeCard
        }
      >
        <Text
          style={
            styles.noticeTitle
          }
        >
          Minimum
          withdrawal:
          ₱100
        </Text>

        <Text
          style={
            styles.noticeSubtext
          }
        >
          Processed
          within 24–48
          hours
        </Text>
      </View>
    </View>

    {/* NEXT BUTTON */}
    <TouchableOpacity
  style={
    styles.nextButton
  }
  onPress={() =>
    navigation.navigate(
      'PaymentStatement'
    )
  }
>
      <Text
        style={
          styles.nextText
        }
      >
        Next
      </Text>
    </TouchableOpacity>

    {/* REQUEST BUTTON */}
    <TouchableOpacity
      style={
        styles.requestButton
      }
    >
      <Text
        style={
          styles.requestText
        }
      >
        Request
        Withdrawal
      </Text>
    </TouchableOpacity>
  </>
)}
      </ScrollView>
      {/* BANK MODAL */}

<Modal
  visible={
    bankModalVisible
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
        styles.modalContainer
      }
    >
      <Text
        style={
          styles.modalTitle
        }
      >
        Add Bank Details
      </Text>

      <Text
        style={
          styles.inputLabel
        }
      >
        Account Holder
        Name
        <Text
          style={
            styles.required
          }
        >
          {' '}*
        </Text>
      </Text>

      <TextInput
        value={
          accountHolderName
        }
        onChangeText={
          setAccountHolderName
        }
        placeholder="Full name as per bank account"
        placeholderTextColor="#8E8E8E"
        style={
          styles.modalInput
        }
      />

      <Text
        style={
          styles.inputLabel
        }
      >
        Account Number
        <Text
          style={
            styles.required
          }
        >
          {' '}*
        </Text>
      </Text>

      <TextInput
        value={
          accountNumber
        }
        onChangeText={
          setAccountNumber
        }
        placeholder="Enter account number"
        placeholderTextColor="#8E8E8E"
        style={
          styles.modalInput
        }
      />

      <Text
        style={
          styles.inputLabel
        }
      >
        IFSC Code
        <Text
          style={
            styles.required
          }
        >
          {' '}*
        </Text>
      </Text>

      <TextInput
        value={
          ifscCode
        }
        onChangeText={
          setIfscCode
        }
        placeholder="Enter IFSC Code"
        placeholderTextColor="#8E8E8E"
        style={
          styles.modalInput
        }
      />

      <Text
        style={
          styles.inputLabel
        }
      >
        Bank Name
        <Text
          style={
            styles.required
          }
        >
          {' '}*
        </Text>
      </Text>

      <TextInput
        value={
          bankName
        }
        onChangeText={
          setBankName
        }
        placeholder="Enter bank name"
        placeholderTextColor="#8E8E8E"
        style={
          styles.modalInput
        }
      />

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
            setBankModalVisible(
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
            styles.addDetailsButton
          }
          onPress={() => {
            dispatch(
              addBankDetails(
                'bank-added'
              )
            );

            setBankModalVisible(
              false
            );
          }}
        >
          <Text
            style={
              styles.addDetailsText
            }
          >
            Add Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
{/* UPI MODAL */}

<Modal
  visible={
    upiModalVisible
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
        styles.modalContainer
      }
    >
      <Text
        style={
          styles.modalTitle
        }
      >
        Add UPI Details
      </Text>

      {/* PAYMENT TYPE */}
      <Text
        style={
          styles.inputLabel
        }
      >
        Payment Type
        <Text
          style={
            styles.required
          }
        >
          {' '}*
        </Text>
      </Text>

      <TouchableOpacity
        style={
          styles.dropdownButton
        }
        onPress={() =>
          setShowPaymentDropdown(
            !showPaymentDropdown
          )
        }
      >
        <Text
          style={
            styles.dropdownText
          }
        >
          {paymentType}
        </Text>

        <Text
          style={
            styles.dropdownArrow
          }
        >
          ˅
        </Text>
      </TouchableOpacity>

      {showPaymentDropdown && (
        <View
          style={
            styles.dropdownMenu
          }
        >
          <TouchableOpacity
            style={
              styles.dropdownItem
            }
            onPress={() => {
              setPaymentType(
                'UPI ID'
              );

              setShowPaymentDropdown(
                false
              );
            }}
          >
            <Text
              style={
                styles.dropdownItemText
              }
            >
              UPI ID
            </Text>

            {paymentType ===
              'UPI ID' && (
              <Text
                style={
                  styles.checkMark
                }
              >
                ✓
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={
              styles.dropdownItem
            }
            onPress={() => {
              setPaymentType(
                'Phone Number'
              );

              setShowPaymentDropdown(
                false
              );
            }}
          >
            <Text
              style={
                styles.dropdownItemText
              }
            >
              Phone Number
            </Text>

            {paymentType ===
              'Phone Number' && (
              <Text
                style={
                  styles.checkMark
                }
              >
                ✓
              </Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* UPI INPUT */}
      <Text
        style={
          styles.inputLabel
        }
      >
        {paymentType}
        <Text
          style={
            styles.required
          }
        >
          {' '}*
        </Text>
      </Text>

      <TextInput
        value={
          upiId
        }
        onChangeText={
          setUpiId
        }
        placeholder={
          paymentType ===
          'UPI ID'
            ? 'user@paytm, user@phonepe'
            : 'Enter phone number'
        }
        placeholderTextColor="#8E8E8E"
        style={
          styles.modalInput
        }
      />

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
            setUpiModalVisible(
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
            styles.addDetailsButton
          }
          onPress={() => {
            dispatch(
              addUpiDetails(
                'upi-added'
              )
            );

            setUpiModalVisible(
              false
            );
          }}
        >
          <Text
            style={
              styles.addDetailsText
            }
          >
            Add Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}