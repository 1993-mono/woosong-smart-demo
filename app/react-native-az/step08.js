import { useState } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Alert,
  Platform,
  ActionSheetIOS,
  TouchableWithoutFeedback,
} from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step08_01() {
  // 각 모달의 상태 관리
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  // 1. 기본 모달 열기
  const openBasicModal = () => {
    setBasicModalVisible(true);
  };

  // 2. 바텀시트 모달 열기
  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  // 3. 확인/취소 다이얼로그 열기
  const openConfirmDialog = () => {
    setConfirmDialogVisible(true);
  };

  // 4. Alert API 사용
  const showBasicAlert = () => {
    Alert.alert('알림', '기본 알림입니다.');
  };

  const showConfirmAlert = () => {
    Alert.alert('확인', '정말로 삭제하시겠습니까?', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          console.log('삭제됨');
        },
      }
    ]);
  };

  const showThreeButtonAlert = () => {
    Alert.alert('선택', '원하는 옵션을 선택하세요', [
      {
        text: '취소',
        style: 'cancel',
      },
      {
        text: '옵션 1',
        onPress: () => console.log('옵션 1 선택'),
      },
      {
        text: '옵션 2',
        onPress: () => console.log('옵션 2 선택'),
      }
    ]);
  };

  // 5. ActionSheet 열기 (크로스 플랫폼)
  const showActionSheet = () => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['취소', '옵션 1', '옵션 2', '삭제'],
          destructiveButtonIndex: 3,
          cancelButtonIndex: 0,
        },
        (buttonIndex) => {
          handleAction(buttonIndex);
        }
      );
    } else {
      setActionSheetVisible(true);
    }
  };

  const handleAction = (index) => {
    switch (index) {
      case 1:
        console.log('옵션 1 선택');
        break;
      case 2:
        console.log('옵션 2 선택');
        break;
      case 3:
        console.log('삭제 선택');
        break;
    }
    setActionSheetVisible(false);
  };

  // 확인 다이얼로그 핸들러
  const handleConfirm = () => {
    console.log('확인됨');
    setConfirmDialogVisible(false);
  };

  const handleCancel = () => {
    setConfirmDialogVisible(false);
  };

  return (
    <Layout_ReactNativeAz label="Step 08. 모달과 알림" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 1. 기본 모달 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 기본 모달</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.button} onPress={openBasicModal}>
              <Text style={styles.buttonText}>기본 모달 열기</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={basicModalVisible}
              onRequestClose={() => setBasicModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>모달 제목</Text>
                  <Text style={styles.modalText}>
                    이것은 기본 모달 내용입니다.
                  </Text>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setBasicModalVisible(false)}>
                    <Text style={styles.closeButtonText}>닫기</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        {/* 2. 바텀시트 모달 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 바텀시트 모달</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.button} onPress={openBottomSheet}>
              <Text style={styles.buttonText}>바텀시트 열기</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={true}
              visible={bottomSheetVisible}
              onRequestClose={() => setBottomSheetVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setBottomSheetVisible(false)}>
                <View style={[styles.modalContainer, { justifyContent: 'flex-end' }]}>
                  <TouchableWithoutFeedback>
                    <View style={styles.bottomSheet}>
                      <View style={styles.handle} />
                      <Text style={styles.bottomSheetTitle}>바텀시트</Text>
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          console.log('옵션 1 선택');
                          setBottomSheetVisible(false);
                        }}
                      >
                        <Text>옵션 1</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          console.log('옵션 2 선택');
                          setBottomSheetVisible(false);
                        }}
                      >
                        <Text>옵션 2</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => setBottomSheetVisible(false)}
                      >
                        <Text style={styles.cancelText}>취소</Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          </View>
        </View>

        {/* 3. 확인/취소 다이얼로그 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 확인/취소 다이얼로그</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.button} onPress={openConfirmDialog}>
              <Text style={styles.buttonText}>기본 모달 열기</Text>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={confirmDialogVisible}
              onRequestClose={handleCancel}
            >
              <View style={styles.modalContainer}>
                <View style={styles.dialog}>
                  <Text style={styles.dialogTitle}>확인</Text>
                  <Text style={styles.dialogMessage}>
                    정말로 삭제하시겠습니까?
                  </Text>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.dialogButton,
                        styles.cancelDialogButton,
                      ]}
                      onPress={handleCancel}
                    >
                      <Text style={styles.cancelDialogButtonText}>취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.dialogButton,
                        styles.confirmDialogButton,
                      ]}
                      onPress={handleConfirm}
                    >
                      <Text style={styles.confirmDialogButtonText}>확인</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        {/* 4. Alert API */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Alert API</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.button} onPress={showBasicAlert}>
              <Text style={styles.buttonText}>기본 알림</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { marginTop: SPACING.SMALL }]} onPress={showConfirmAlert}>
              <Text style={styles.buttonText}>확인 알림</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { marginTop: SPACING.SMALL }]} onPress={showThreeButtonAlert}>
              <Text style={styles.buttonText}>3개 버튼 알림</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. ActionSheet */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. ActionSheet</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.button} onPress={showActionSheet}>
              <Text style={styles.buttonText}>액션시트 열기</Text>
            </TouchableOpacity>

            {Platform.OS === 'android' && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={actionSheetVisible}
                onRequestClose={() => setActionSheetVisible(false)}
              >
                <View style={[styles.modalContainer, { justifyContent: 'flex-end' }]}>
                  <View style={styles.actionSheet}>
                    <TouchableOpacity style={styles.actionItem} onPress={() => handleAction(1)}>
                      <Text>옵션 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionItem} onPress={() => handleAction(2)}>
                      <Text>옵션 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionItem, styles.destructiveAction]} onPress={() => handleAction(3)}>
                      <Text style={styles.destructiveText}>삭제</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => setActionSheetVisible(false)}>
                      <Text style={styles.cancelText}>취소</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}
          </View>
        </View>
      </View>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.LARGE,
  },
  section: {
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.MEDIUM,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  sectionContent: {
    marginTop: SPACING.SMALL,
  },
  button: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.XS,
  },
  buttonText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '600',
  },

  // 기본 모달 스타일
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    padding: SPACING.MEDIUM,
  },
  modalTitle: {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: '700'
  },
  modalText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.SMALL,
  },
  closeButton: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.XS,
    marginTop: SPACING.SMALL,
  },
  closeButtonText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '600',
  },

  // 바텀시트
  bottomSheet: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    padding: SPACING.MEDIUM,
    paddingBottom: 40,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ccc',
    marginBottom: SPACING.MEDIUM,
  },
  bottomSheetTitle: {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: '700',
    marginBottom: SPACING.MEDIUM,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: SPACING.SMALL,
  },
  cancelButton: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: '#f0f0f0',
    padding: SPACING.XS,
    marginTop: SPACING.SMALL,
    marginHorizontal: SPACING.SMALL,
  },
  cancelText: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: '600',
  },

  // 다이얼로그
  dialog: {
    width: '80%',
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    padding: SPACING.MEDIUM,
  },
  dialogTitle: {
    fontSize: FONT_SIZE.MEDIUM,
    fontWeight: '700',
  },
  dialogMessage: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.SMALL,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.SMALL,
    marginTop: SPACING.MEDIUM,
  },
  dialogButton: {
    borderRadius: SPACING.XS,
    paddingVertical: SPACING.XS,
    paddingHorizontal: SPACING.SMALL,
  },
  cancelDialogButton: {
    backgroundColor: '#f0f0f0'
  },
  confirmDialogButton: {
    backgroundColor: COLORS.PRIMARY,
  },
  cancelDialogButtonText: {
    fontSize: FONT_SIZE.SMALL,
  },
  confirmDialogButtonText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '600',
  },

  // ActionSheet 스타일
  actionSheet: {
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    paddingBottom: SPACING.MEDIUM,
  },
  actionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: SPACING.SMALL,
  },
  destructiveAction: {
    borderBottomWidth: 0,
  },
  destructiveText: {
    color: COLORS.RED,
  },
});