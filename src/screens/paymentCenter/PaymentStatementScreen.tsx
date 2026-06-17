import React, {
    useState,
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
  
  export default function
  PaymentStatementScreen({
    navigation,
  }: Props) {
  
    const [
      selectedTab,
      setSelectedTab,
    ] = useState(
      'statement'
    );
    const [
        selectedHistoryTab,
        setSelectedHistoryTab,
      ] = useState(
        'release'
      );
  
    const [
      selectedFormat,
      setSelectedFormat,
    ] = useState(
      'PDF'
    );
  
    const [
      showDropdown,
      setShowDropdown,
    ] = useState(
      false
    );
  
    const [
      startDate,
      setStartDate,
    ] = useState(
      new Date()
    );
  
    const [
      endDate,
      setEndDate,
    ] = useState(
      new Date()
    );
  
    const [
      openStartPicker,
      setOpenStartPicker,
    ] = useState(
      false
    );
  
    const [
      openEndPicker,
      setOpenEndPicker,
    ] = useState(
      false
    );
  
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
  
        <ScrollView
          contentContainerStyle={
            styles.scrollContent
          }
          showsVerticalScrollIndicator={
            false
          }
        >
          {/* TOP TABS */}
  
          <View
            style={
              styles.tabContainer
            }
          >
            <Pressable
              style={[
                styles.tabButton,
                selectedTab ===
                  'statement' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setSelectedTab(
                  'statement'
                )
              }
            >
              <Text
                style={
                  selectedTab ===
                  'statement'
                    ? styles.activeTabText
                    : styles.tabText
                }
              >
                Statement
              </Text>
            </Pressable>
  
            <Pressable
              style={[
                styles.tabButton,
                selectedTab ===
                  'history' &&
                  styles.activeTab,
              ]}
              onPress={() =>
                setSelectedTab(
                  'history'
                )
              }
            >
              <Text
                style={
                  selectedTab ===
                  'history'
                    ? styles.activeTabText
                    : styles.tabText
                }
              >
                History
              </Text>
            </Pressable>
          </View>
  
          {/* ==========================
              STATEMENT TAB
          ========================== */}
  
          {selectedTab ===
            'statement' && (
            <View
              style={
                styles.statementCard
              }
            >
              {/* HEADER */}
  
              <View
                style={
                  styles.statementHeader
                }
              >
                <View
                  style={
                    styles.statementIconCircle
                  }
                >
                  <Image
                    source={require('../../assets/images/wallet.png')}
                    style={
                      styles.statementIcon
                    }
                  />
                </View>
  
                <Text
                  style={
                    styles.statementTitle
                  }
                >
                  Payment
                  Statement
                </Text>
              </View>
  
              {/* DATE ROW */}
  
              <View
                style={
                  styles.dateRow
                }
              >
                {/* START DATE */}
  
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      styles.inputLabel
                    }
                  >
                    Start Date
                  </Text>
  
                  <Pressable
                    style={
                      styles.dateInput
                    }
                    onPress={() =>
                      setOpenStartPicker(
                        true
                      )
                    }
                  >
                    <Text
                      style={
                        styles.dateText
                      }
                    >
                      {startDate.toLocaleDateString(
                        'en-GB'
                      )}
                    </Text>
  
                    <Icon
                      name="calendar"
                      size={20}
                      color="#FFF"
                    />
                  </Pressable>
                </View>
  
                <View
                  style={{
                    width: 16,
                  }}
                />
  
                {/* END DATE */}
  
                <View
                  style={{
                    flex: 1,
                  }}
                >
                  <Text
                    style={
                      styles.inputLabel
                    }
                  >
                    End Date
                  </Text>
  
                  <Pressable
                    style={
                      styles.dateInput
                    }
                    onPress={() =>
                      setOpenEndPicker(
                        true
                      )
                    }
                  >
                    <Text
                      style={
                        styles.dateText
                      }
                    >
                      {endDate.toLocaleDateString(
                        'en-GB'
                      )}
                    </Text>
  
                    <Icon
                      name="calendar"
                      size={20}
                      color="#FFF"
                    />
                  </Pressable>
  
                  <Text
                    style={
                      styles.helperText
                    }
                  >
                    Select start
                    date first
                  </Text>
                </View>
              </View>
  
              {/* FORMAT */}
  
              <Text
                style={
                  styles.inputLabel
                }
              >
                Format
              </Text>
  
              <Pressable
                style={
                  styles.dropdownButton
                }
                onPress={() =>
                  setShowDropdown(
                    !showDropdown
                  )
                }
              >
                <Text
                  style={
                    styles.dropdownText
                  }
                >
                  {
                    selectedFormat
                  }
                </Text>
  
                <Icon
                  name={
                    showDropdown
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={22}
                  color="#BDBDBD"
                />
              </Pressable>
  
              {showDropdown && (
                <View
                  style={
                    styles.dropdownMenu
                  }
                >
                  {[
                    'PDF',
                    'Excel',
                    'CSV',
                  ].map(item => (
                    <Pressable
                      key={item}
                      style={
                        styles.dropdownItem
                      }
                      onPress={() => {
                        setSelectedFormat(
                          item
                        );
  
                        setShowDropdown(
                          false
                        );
                      }}
                    >
                      <Text
                        style={
                          styles.dropdownItemText
                        }
                      >
                        {item}
                      </Text>
  
                      {selectedFormat ===
                        item && (
                        <Icon
                          name="check"
                          size={18}
                          color="#FFF"
                        />
                      )}
                    </Pressable>
                  ))}
                </View>
              )}
  
              <Pressable
                style={
                  styles.generateButton
                }
              >
                <Text
                  style={
                    styles.generateText
                  }
                >
                  Generate
                  Statement
                </Text>
              </Pressable>
  
              <View
                style={
                  styles.footerCard
                }
              >
                <Text
                  style={
                    styles.footerText
                  }
                >
                  Custom date
                  range for
                  detailed
                  analysis
                </Text>
  
                <Icon
                  name="calendar"
                  size={20}
                  color="#FFF"
                />
              </View>
            </View>
          )}
  
          {/* ==========================
              HISTORY TAB
          ========================== */}
  
          {/* HISTORY TAB */}

          {selectedTab ===
  'history' && (
  <View
    style={
      styles.historyCard
    }
  >
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={
        false
      }
      contentContainerStyle={
        styles.historyTabsContainer
      }
    >
      <Pressable
        style={
          selectedHistoryTab ===
          'release'
            ? styles.historyActiveTab
            : styles.historyInactiveTab
        }
        onPress={() =>
          setSelectedHistoryTab(
            'release'
          )
        }
      >
        <Text
          style={
            selectedHistoryTab ===
            'release'
              ? styles.historyActiveText
              : styles.historyInactiveText
          }
        >
          Date of Release
        </Text>
      </Pressable>

      <Pressable
        style={
          selectedHistoryTab ===
          'transaction'
            ? styles.historyActiveTab
            : styles.historyInactiveTab
        }
        onPress={() =>
          setSelectedHistoryTab(
            'transaction'
          )
        }
      >
        <Text
          style={
            selectedHistoryTab ===
            'transaction'
              ? styles.historyActiveText
              : styles.historyInactiveText
          }
        >
          Transaction ID
        </Text>
      </Pressable>

      <Pressable
        style={
          selectedHistoryTab ===
          'amount'
            ? styles.historyActiveTab
            : styles.historyInactiveTab
        }
        onPress={() =>
          setSelectedHistoryTab(
            'amount'
          )
        }
      >
        <Text
          style={
            selectedHistoryTab ===
            'amount'
              ? styles.historyActiveText
              : styles.historyInactiveText
          }
        >
          Amount
        </Text>
      </Pressable>

      <Pressable
        style={
          selectedHistoryTab ===
          'paymentMode'
            ? styles.historyActiveTab
            : styles.historyInactiveTab
        }
        onPress={() =>
          setSelectedHistoryTab(
            'paymentMode'
          )
        }
      >
        <Text
          style={
            selectedHistoryTab ===
            'paymentMode'
              ? styles.historyActiveText
              : styles.historyInactiveText
          }
        >
          Mode of Payment
        </Text>
      </Pressable>
    </ScrollView>

    {/* EMPTY STATE FOR ALL TABS */}

    <View
      style={
        styles.emptyHistoryContainer
      }
    >
      <View
        style={
          styles.emptyIconCircle
        }
      >
        <Text
          style={
            styles.emptyDollar
          }
        >
          $
        </Text>
      </View>

      <Text
        style={
          styles.emptyText
        }
      >
        No payment
        history
        available
      </Text>
    </View>
  </View>
)}
        </ScrollView>
  
        {/* START DATE PICKER */}
  
        <DatePicker
          modal
          mode="date"
          open={
            openStartPicker
          }
          date={startDate}
          onConfirm={date => {
            setOpenStartPicker(
              false
            );
  
            setStartDate(
              date
            );
  
            if (
              endDate < date
            ) {
              setEndDate(
                date
              );
            }
          }}
          onCancel={() =>
            setOpenStartPicker(
              false
            )
          }
        />
  
        {/* END DATE PICKER */}
  
        <DatePicker
          modal
          mode="date"
          open={
            openEndPicker
          }
          date={endDate}
          minimumDate={
            startDate
          }
          onConfirm={date => {
            setOpenEndPicker(
              false
            );
  
            setEndDate(
              date
            );
          }}
          onCancel={() =>
            setOpenEndPicker(
              false
            )
          }
        />
      </SafeAreaView>
    );
  }