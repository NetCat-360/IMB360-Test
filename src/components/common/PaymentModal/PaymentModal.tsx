import React from 'react'
import { View, Text, Pressable, Modal } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'

interface PaymentModalProps {
  visible: boolean
  onClose: () => void
  onConfirm: () => void
  deductionAmount?: number
  currentBalance?: number
}

export default function PaymentModal({
  visible,
  onClose,
  onConfirm,
  deductionAmount = 5,
  currentBalance = 1200,
}: PaymentModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.paymentModalContainer}>

          <Text style={styles.modalTitle}>Confirm Submission?</Text>
          <Text style={styles.warningText}>
            ₱ {deductionAmount} will be deducted as you submit.
          </Text>

          <View style={styles.balanceRow}>
            <Text style={styles.balanceLabel}>Current Balance: </Text>
            <Text style={styles.balanceValue}>₱ {currentBalance.toLocaleString()}</Text>
          </View>

          <Pressable style={styles.confirmBtnWrapper} onPress={onConfirm}>
            <LinearGradient
              colors={['#00B9C0', '#B6D82C']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmGradientElement}
            >
              <Text style={styles.confirmBtnText}>Confirm</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={onClose} hitSlop={12}>
            <Text style={styles.cancelTextLink}>Cancel</Text>
          </Pressable>

        </View>
      </View>
    </Modal>
  )
}
