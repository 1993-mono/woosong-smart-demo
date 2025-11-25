import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step11() {
  // 1. 기본 저장/불러오기 상태
  const [inputValue, setInputValue] = useState('');
  const [storedValue, setStoredValue] = useState('');

  // 2. 사용자 설정 상태
  const [settings, setSettings] = useState({
    notifications: false,
    darkMode: false,
  });
  const [settingsLoading, setSettingsLoading] = useState(true);

  // 3. 사용자 정보 상태
  const [user, setUser] = useState({ name: '', email: '' });
  const [savedUser, setSavedUser] = useState({ name: '', email: '' });
  const [userLoading, setUserLoading] = useState(true);

  // 컴포넌트 마운트 시 저장된 데이터 불러오기
  useEffect(() => {
    loadStoredValue();
    loadSettings();
    loadUser();
  }, []);

  // ========== 1. 기본 저장/불러오기 ==========
  /*
    # AsyncStorage 기본 사용법
    - setItem(key, value): 데이터 저장 (비동기)
    - getItem(key): 데이터 불러오기 (비동기)
    - removeItem(key): 특정 키 삭제 (비동기)
    - 모든 작업은 await 또는 .then()을 사용해야 함
  */
  const loadStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('myKey');
      if (value !== null) {
        setStoredValue(value);
      }
    } catch (error) {
      console.error('불러오기 실패: ', error);
    }
  };

  const saveValue = async () => {

    if (!inputValue.trim()) {
      Alert.alert('오류', '값을 입력해주세요');
      return;
    }

    try {
      await AsyncStorage.setItem('myKey', inputValue);
      setStoredValue(inputValue);
      setInputValue('');
      Alert.alert('성공', '저장되었습니다!');
    } catch (error) {
      console.error('저장 실파: ', error);
      Alert.alert('오류', '저장에 실패했습니다');
    }
  };

  const clearStoredValue = async () => {
    try {
      await AsyncStorage.removeItem('myKey');
      setStoredValue('');
      Alert.alert('성공', '삭제되었습니다');
    } catch (error) {
      console.error('삭제 실패: ', error);
      Alert.alert('오류', '삭제에 실패했습니다');
    }
  }

  // ========== 2. 사용자 설정 저장 ==========
  /*
    # 객체 데이터 저장하기
    - AsyncStorage는 문자열만 저장 가능
    - 객체는 JSON.stringify()로 변환하여 저장
    - 불러올 때는 JSON.parse()로 변환
    - 사용자 설정, 프로필 등에 활용
  */
  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem('user_settings');
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.error('설정 불러오기 실패: ', error);
    } finally {
      setSettingsLoading(false);
    }
  };

  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('user_settings', JSON.stringify(newSettings));
      setSettings(newSettings);
      Alert.alert('성공', '설정이 저장되었습니다');
    } catch (error) {
      console.error('설정 저장 실패: ', error);
      Alert.alert('오류', '설정 저장에 실패했습니다');
    }
  };

  const toggleNotification = async (value) => {
    const newSettings = { ...settings, notifications: value };
    await saveSettings(newSettings);
  };

  const toggleDarkMode = async (value) => {
    const newSettings = { ...settings, darkMode: value };
    await saveSettings(newSettings);
  };

  const clearSettings = async () => {
    try {
      await AsyncStorage.removeItem('user_settings');
      setSettings({ notification: false, darkMode: false });
      Alert.alert('성공', '설정이 삭제되었습니다');
    } catch (error) {
      console.error('설정 삭제 실패: ', error);
      Alert.alert('오류', '설정 삭제에 실패했습니다');
    }
  };

  // ========== 3. 사용자 정보 저장 ==========
  /*
    # 사용자 프로필 정보 저장
    - 여러 필드를 가진 객체 저장 예제
    - 앱 재시작 후에도 데이터 유지
    - 로그인 정보, 사용자 설정 등에 활용
  */
  const loadUser = async () => {
    try {
      const stored = await AsyncStorage.getItem('user_info');
      if (stored) {
        const parsedUser = JSON.parse(stored);
        setUser(parsedUser);
        setSavedUser(parsedUser);
      }
    } catch (error) {
      console.error('사용자 정보 불러오기 실패: ', error);
    } finally {
      setUserLoading(false);
    }
  };

  const saveUser = async () => {
    if (!user.name.trim() || !user.email.trim()) {
      Alert.alert('오류', '이름과 이메일을 모두 입력해주세요');
      return;
    }

    try {
      await AsyncStorage.setItem('user_info', JSON.stringify(user));
      setSavedUser(user);
      Alert.alert('성공', '프로필이 저장되었습니다');
    } catch (error) {
      console.error('사용자 정보 저장 실패: ', error);
      Alert.alert('오류', '저장에 실패했습니다');
    }
  };

  const clearUser = async () => {
    try {
      await AsyncStorage.removeItem('user_info');
      setUser({ name: '', email: '' });
      setSavedUser({ name: '', email: '' });
      Alert.alert('성공', '프로필이 삭제되었습니다');
    } catch (error) {
      console.error('사용자 정보 삭제 실패: ', error);
      Alert.alert('오류', '삭제에 실패했습니다');
    }
  };

  // ========== 4. 여러 키 한 번에 저장/불러오기 ==========
  /*
    # 여러 키를 한 번에 처리하기
    - multiSet([['key1', 'value1'], ['key2', 'value2']]): 여러 키 한 번에 저장
    - multiGet(['key1', 'key2']): 여러 키 한 번에 불러오기
    - multiRemove(['key1', 'key2']): 여러 키 한 번에 삭제
    - 성능 향상 및 코드 간결화에 유용
  */
  const saveMultipleItems = async () => {
    try {
      const items = [
        ['key1', 'value1'],
        ['key2', 'value2'],
        ['key3', 'value3'],
      ];
      await AsyncStorage.multiSet(items);
      Alert.alert('성공', '여러 항목이 저장되었습니다');
    } catch (error) {
      console.error('저장 실패: ', error);
      Alert.alert('오류', '저장에 실패했습니다');
    }
  };

  const loadMultipleItems = async () => {
    try {
      const keys = ['key1', 'key2', 'key3'];
      const values = await AsyncStorage.multiGet(keys);
      const data = Object.fromEntries(values);

      const resultText = Object.entries(data)
        .map(([key, value]) => `${key}: ${value || '(없음)'}`)
        .join('\n');

      Alert.alert('불러온 데이터', resultText);
    } catch (error) {
      console.error('불러오기 실패: ', error);
      Alert.alert('오류', '불러오기에 실패했습니다');
    }
  };

  const removeMultipleItems = async () => {
    try {
      const keys = ['key1', 'key2', 'key3'];
      await AsyncStorage.multiRemove(keys);
      Alert.alert('성공', '여러 항목이 삭제되었습니다');
    } catch (error) {
      console.error('삭제 실패: ', error);
      Alert.alert('오류', '삭제에 실패했습니다.')
    }
  };

  // ========== 5. 전체 삭제 ==========
  /*
    # 모든 데이터 삭제하기
    - clear(): AsyncStorage의 모든 데이터 삭제
    - 주의: 앱의 모든 로컬 데이터가 삭제됨
    - 로그아웃 시나 앱 초기화에 사용
  */
  const clearAll = async () => {
    Alert.alert(
      '확인',
      '모든 저장된 데이터를 삭제하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setStoredValue('');
              setSettings({ notifications: false, darkMode: false });
              setUser({ name: '', email: '' });
              setSavedUser({ name: '', email: '' });
              Alert.alert('성공', '모든 데이터가 삭제되었습니다');
            } catch (error) {
              console.error('전체 삭제 실패: ', error);
              Alert.alert('오류', '삭제에 실패했습니다');
            }
          },
        }
      ]
    );
  };

  return (
    <Layout_ReactNativeAz label="11. 데이터 저장 (AsyncStorage)" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 1. 기본 저장 불러오기 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 기본 저장/불러오기</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>setItem()</Text>과 <Text style={styles.codeText}>getItem()</Text>을 사용하여 문자열 데이터를 저장하고 불러옵니다.
            {'\n'}
            <Text style={styles.highlight}>핵심:</Text> 모든 AsyncStorage 작업은 비동기이므로 <Text lineHeight={1.2} style={styles.codeText}>await</Text>를 사용해야 합니다.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="저장할 값 입력"
            placeholderTextColor={COLORS.TEXT_LIGHT}
            value={inputValue}
            onChangeText={setInputValue}
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={saveValue}>
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearStoredValue}>
              <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
          </View>

          {storedValue ? (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>저장된 값</Text>
              <Text style={styles.resultText}>{storedValue}</Text>
            </View>
          ) : (
            <View style={[styles.resultContainer, styles.noResultContainer]}>
              <Text style={[styles.resultText, styles.noResultText]}>(저장된 값 없음)</Text>
            </View>
          )}
        </View>

        {/* 2. 사용자 설정 저장 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 사용자 설정 저장 (객체 데이터)</Text>
          <Text style={styles.description}>
            객체를 저장할 때는 <Text style={styles.codeText}>JSON.stringify()</Text>로 변환하고, 불러올 때는 <Text style={styles.codeText}>JSON.parse()</Text>로 변환합니다.
            {'\n'}
            <Text style={styles.highlight}>활용:</Text> 앱 설정, 사용자 선호도, 테마 설정 등
          </Text>

          {settingsLoading ? (
            <Text style={styles.loadingText}>로딩 중...</Text>
          ) : (
            <>
              <View style={[styles.settingItem, styles.settingItemFirst]}>
                <Text style={styles.settingLabel}>알림</Text>
                {/*
                  # Switch 컴포넌트 : ON/OFF 토글 스위치
                  - value : 현재 스위치 상태 (true/false)
                  - onValueChange: 스위치 값이 변경될 때 호출되는 콜백 함수
                  - iOS와 Android에서 네이티브 스위치 UI를 제공
                */}
                <Switch
                  value={settings.notifications}
                  onValueChange={toggleNotification}
                />
              </View>

              <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>다크 모드</Text>
                <Switch
                  value={settings.darkMode}
                  onValueChange={toggleDarkMode}
                />
              </View>

              <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={clearSettings}
              >
                <Text style={styles.buttonText}>설정 삭제</Text>
              </TouchableOpacity>

              <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>설정 정보</Text>
                <Text style={styles.resultText}>
                  알림: {settings.notifications ? 'ON' : 'OFF'}
                </Text>
                <Text style={styles.resultText}>
                  다크 모드: {settings.darkMode ? 'ON' : 'OFF'}
                </Text>
              </View>
            </>
          )}
        </View>

        {/* 3. 사용자 정보 저장 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 사용자 정보 저장</Text>
          <Text style={styles.description}>
            여러 필드를 가진 객체를 저장하는 예제입니다.
            {'\n'}
            <Text style={styles.highlight}>활용:</Text> 로그인 정보, 프로필 데이터, 사용자 기본 정보 등
          </Text>

          {userLoading ? (
            <Text style={styles.loadingText}>로딩 중...</Text>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="이름"
                placeholderTextColor={COLORS.TEXT_LIGHT}
                value={user.name}
                onChangeText={(text) => setUser({ ...user, name: text })}
              />

              <TextInput
                style={styles.input}
                placeholder="이메일"
                placeholderTextColor={COLORS.TEXT_LIGHT}
                value={user.email}
                onChangeText={(text) => setUser({ ...user, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={saveUser}>
                  <Text style={styles.buttonText}>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearUser}>
                  <Text style={styles.buttonText}>삭제</Text>
                </TouchableOpacity>
              </View>

              {(savedUser.name || savedUser.email) && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultTitle}>저장된 정보</Text>
                  {savedUser.name && (
                    <Text style={styles.resultText}>이름 : {savedUser.name}</Text>
                  )}
                  {savedUser.email && (
                    <Text style={styles.resultText}>이메일 : {savedUser.email}</Text>
                  )}
                </View>
              )}
            </>
          )}
        </View>

        {/* 4. 여러 키 한 번에 저장/불러오기 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 여러 키 한 번에 처리</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>multiSet()</Text>, <Text style={styles.codeText}>multiGet()</Text>, <Text style={styles.codeText}>multiRemove()</Text>를 사용하여 여러 키를 한 번에 처리합니다.
            {'\n'}
            <Text style={styles.highlight}>장점:</Text> 성능 향상 및 코드 간결화
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={saveMultipleItems}>
              <Text style={styles.buttonText}>여러 항목 저장</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={loadMultipleItems}>
              <Text style={styles.buttonText}>여러 항목 불러오기</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, styles.clearButton, { marginTop: SPACING.SMALL }]} onPress={removeMultipleItems}>
            <Text style={styles.buttonText}>여러 항목 삭제</Text>
          </TouchableOpacity>
        </View>

        {/* 5. 전체 삭제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 전체 삭제</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>clear()</Text>를 사용하여 AsyncStorage의 모든 데이터를 삭제합니다.
            {'\n'}
            <Text style={styles.highlight}>주의:</Text> 앱의 모든 로컬 데이터가 삭제되므로 신중하게 사용해야 합니다.
            {'\n'}
            <Text style={styles.highlight}>활용:</Text> 로그아웃, 앱 초기화 등
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clearAll}>
              <Text style={styles.buttonText}>모든 데이터 삭제</Text>
            </TouchableOpacity>
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
  description: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.XS,
  },
  codeText: {
    backgroundColor: COLORS.BACKGROUND,
    fontFamily: 'monospace',
    fontSize: FONT_SIZE.TINY,
    color: COLORS.PRIMARY,
  },
  highlight: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
  input: {
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: SPACING.SMALL,
    fontSize: FONT_SIZE.SMALL,
    marginTop: SPACING.XS,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.SMALL,
    marginTop: SPACING.SMALL,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.XS,
  },
  clearButton: {
    backgroundColor: COLORS.RED,
  },
  dangerButton: {
    backgroundColor: COLORS.RED,
  },
  buttonText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '600',
  },
  resultContainer: {
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    padding: SPACING.MEDIUM,
    marginTop: SPACING.LARGE,
  },
  resultTitle: {
    fontWeight: '600',
    marginBottom: SPACING.XS,
  },
  resultText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
  },
  noResultText: {
    textAlign: 'center',
  },
  loadingText: {
    padding: SPACING.MEDIUM,
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
  },
  settingItemFirst: {
    borderTopWidth: 0,
  },
  settingLabel: {
    fontSize: FONT_SIZE.SMALL,
  },
});