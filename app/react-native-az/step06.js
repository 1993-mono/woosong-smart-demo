import { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step06() {
  // 기본 텍스트 입력 상태
  const [text, setText] = useState('');

  // 숫자 입력 상태
  const [number, setNumber] = useState('');

  // 이메일 입력 상태
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // 비밀번호 입력 상태
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 여러 줄 텍스트 입력 상태
  const [message, setMessage] = useState('');

  // 포커스 관리용 ref
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);

  // 폼 데이터 상태
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({});

  // 이메일 검증 함수
  const validateEmail = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text && !emailRegex.test(text)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
    } else {
      setEmailError('');
    }
  };

  // 이름 입력 후 이메일 필드로 포커스 이동
  const handleNameSubmit = () => {
    emailInputRef.current?.focus();
  };

  // 이메일 입력 후 전화번호 필드로 포커스 이동
  const handleEmailSubmit = () => {
    phoneInputRef.current?.focus();
  };

  // 폼 데이터 변경 핸들러
  const handleFormChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // 에러 초기화
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  // 폼 검증 함수
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = '이름을 입력해주세요';
    }

    if (!formData.phone.trim()) {
      errors.phone = '전화번호를 입력해주세요';
    } else if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(formData.phone)) {
      errors.phone = '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)';
    }

    if (!formData.address.trim()) {
      errors.address = '주소를 입력해주세요';
    }

    return errors;
  };

  // 폼 제출 핸들러
  const handleFormSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log('제출된 데이터: ', formData);
    // API 호출 등 처리
    alert('폼이 성공적으로 제출되었습니다!');
  };

  return (
    <Layout_ReactNativeAz label="Step 06. 입력 컴포넌트" type="form" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 기본 텍스트 입력 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 텍스트 입력</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={text}
              onChangeText={setText}
            />
            {text ? (
              <Text style={styles.result}>
                입력한 값: {text}
              </Text>
            ) : null}
          </View>
        </View>

        {/* 숫자 입력 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>숫자 입력</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>나이</Text>
            <TextInput
              style={styles.input}
              placeholder="나이를 입력하세요"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={number}
              onChangeText={setNumber}
              keyboardType="numeric"
              maxLength={3}
            />
          </View>
        </View>

        {/* 이메일 입력 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이메일 입력</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
          </View>
        </View>

        {/* 비밀번호 입력 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>비밀번호 입력 (보기/숨기기 토글)</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>비밀번호</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="비밀번호를 입력하세요"
                placeholderTextColor={COLORS.TEXT_LIGHT}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="password"
              />
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text style={styles.toggleText}>{isPasswordVisible ? '숨기기' : '보기'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 여러 줄 텍스트 입력 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>여러 줄 텍스트 입력 (TextArea)</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>메모</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="메모를 입력하세요"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* 포커스 관리 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>포커스 관리</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={styles.input}
              placeholder="이름을 입력하세요"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={formData.name}
              onChangeText={(value) => handleFormChange('name', value)}
              onSubmitEditing={handleNameSubmit} // 키보드에서 '다음' 또는 '완료'를 눌렀을 때 호출되는 콜백 (여기서는 다음 입력창으로 포커스 이동)
              returnKeyType="next" // 키보드의 오른쪽 하단 버튼 종류를 지정 (여기서는 '다음' 표시)
            />

            <Text style={[styles.label, styles.labelMargin]}>이메일</Text>
            <TextInput
              ref={emailInputRef}
              style={styles.input}
              placeholder="example@email.com"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={email}
              onChangeText={validateEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              onSubmitEditing={handleEmailSubmit}
              returnKeyType="next"
            />

            <Text style={[styles.label, styles.labelMargin]}>전화번호</Text>
            <TextInput
              ref={phoneInputRef}
              style={styles.input}
              placeholder="010-1234-5678"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={formData.phone}
              onChangeText={(value) => handleFormChange('phone', value)}
              keyboardType="phone-pad"
              returnKeyType="done"
            />
          </View>
        </View>

        {/* 폼 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>폼 예제 (여러 입력 필드)</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              style={[styles.input, formErrors.name && styles.inputError]}
              placeholder="이름을 입력하세요"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={formData.name}
              onChangeText={(value) => handleFormChange('name', value)}
            />
            {formErrors.name ? (
              <Text style={styles.errorText}>
                {formErrors.name}
              </Text>
            ) : null}

            <Text style={[styles.label, styles.labelMargin]}>전화번호</Text>
            <TextInput
              style={[styles.input, formErrors.phone && styles.inputError]}
              placeholder="010-1234-5678"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={formData.phone}
              onChangeText={(value) => handleFormChange('phone', value)}
            />
            {formErrors.phone ? (
              <Text style={styles.errorText}>
                {formErrors.phone}
              </Text>
            ) : null}

            <Text style={[styles.label, styles.labelMargin]}>주소</Text>
            <TextInput
              style={[styles.input, styles.textArea, formErrors.address && styles.inputError]}
              placeholder="주소를 입력하세요"
              placeholderTextColor={COLORS.TEXT_LIGHT}
              value={formData.address}
              onChangeText={(value) => handleFormChange('address', value)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
            {formErrors.address ? (
              <Text style={styles.errorText}>
                {formErrors.address}
              </Text>
            ) : null}

            <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
              <Text style={styles.submitText}>
                제출
              </Text>
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
  sectionContent: {
    marginTop: SPACING.SMALL,
  },
  label: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: '600',
    marginTop: SPACING.SMALL,
  },
  labelMargin: {
    marginTop: SPACING.MEDIUM,
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
  inputError: {
    borderColor: COLORS.RED,
    backgroundColor: '#fff5f5',
  },
  result: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.XS,
  },
  errorText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.RED,
    marginTop: SPACING.XS,
  },
  submitButton: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.SMALL,
    marginTop: SPACING.MEDIUM,
  },
  submitText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '700',
  },

  // 비밀번호 입력
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginTop: SPACING.XS,
  },
  passwordInput: {
    flex: 1,
    padding: SPACING.SMALL,
    fontSize: FONT_SIZE.SMALL,
  },
  toggleButton: {
    padding: SPACING.SMALL,
  },
  toggleText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.PRIMARY,
  },

  // 여러 줄 텍스트 입력
  textArea: {
    minHeight: 100,
  }
});