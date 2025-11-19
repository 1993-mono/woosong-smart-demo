import { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

// 폼 검증 스키마
const formSchema = Yup.object().shape({
  name: Yup.string()
    .required('이름을 입력해주세요')
    .min(2, '이름은 최소 2자 이상이어야 합니다'),
  phone: Yup.string()
    .required('전화번호를 입력해주세요')
    .matches(/^\d{2,3}-\d{3,4}-\d{4}$/, '올바른 전화번호 형식이 아닙니다 (예: 010-1234-5678)'),
  address: Yup.string()
    .required('주소를 입력해주세요'),
});

// 포커스 관리용 폼 스키마
const focusFormSchema = Yup.object().shape({
  focusName: Yup.string(),
  focusEmail: Yup.string()
    .email('올바른 이메일 형식이 아닙니다'),
  focusPhone: Yup.string(),
});

export default function ReactNativeAz_Step06_02() {
  // 기본 텍스트 입력 상태 (예제용)
  const [text, setText] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 포커스 관리용 ref
  const emailInputRef = useRef(null);
  const focusPhoneInputRef = useRef(null);

  // 폼 예제용 useForm
  const {
    control: formControl,
    handleSubmit: handleFormSubmit,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
    },
  });

  // 포커스 관리 예제용 useForm
  const {
    control: focusControl,
    formState: { errors: focusErrors },
  } = useForm({
    resolver: yupResolver(focusFormSchema),
    defaultValues: {
      focusName: '',
      focusEmail: '',
      focusPhone: '',
    },
  });

  // 폼 제출 핸들러
  const onSubmit = (data) => {
    console.log('제출된 데이터:', data);
    alert('폼이 성공적으로 제출되었습니다!');
  };

  // 포커스 관리 폼의 이름 입력 후 이메일 필드로 포커스 이동
  const handleFocusNameSubmit = () => {
    emailInputRef.current?.focus();
  };

  // 포커스 관리 폼의 이메일 입력 후 전화번호 필드로 포커스 이동
  const handleFocusEmailSubmit = () => {
    focusPhoneInputRef.current?.focus();
  };

  // 전화번호 포맷팅 함수 (숫자만 입력받아 자동으로 하이픈 추가)
  const formatPhoneNumber = (text) => {
    // 숫자만 추출
    const numbers = text.replace(/[^\d]/g, '');

    // 길이에 따라 하이픈 추가
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 7) {
      // 010-1234 형식
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      // 010-1234-5678 형식
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      // 11자리 초과 시 11자리까지만
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  // 전화번호 변경 핸들러
  const handlePhoneChange = (onChange, text) => {
    const formatted = formatPhoneNumber(text);
    onChange(formatted);
  };

  return (
    <Layout_ReactNativeAz label="Step 06-02. 입력 컴포넌트 (라이브러리)" type="form" backgroundColor={COLORS.BACKGROUND}>
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

        {/* 이메일 입력 예제 (React Hook Form 사용) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이메일 입력 (React Hook Form)</Text>
          <View style={styles.sectionContent}>
            <Controller
              control={focusControl}
              name="focusEmail"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.label}>이메일</Text>
                  <TextInput
                    style={[styles.input, focusErrors.focusEmail && styles.inputError]}
                    placeholder="example@email.com"
                    placeholderTextColor={COLORS.TEXT_LIGHT}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                  />
                  {focusErrors.focusEmail && (
                    <Text style={styles.errorText}>{focusErrors.focusEmail.message}</Text>
                  )}
                </>
              )}
            />
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

        {/* 포커스 관리 예제 (React Hook Form 사용) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>포커스 관리 (React Hook Form)</Text>
          <View style={styles.sectionContent}>
            <Controller
              control={focusControl}
              name="focusName"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.label}>이름</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="이름을 입력하세요"
                    placeholderTextColor={COLORS.TEXT_LIGHT}
                    value={value}
                    onChangeText={onChange}
                    onSubmitEditing={handleFocusNameSubmit}
                    returnKeyType="next"
                  />
                </>
              )}
            />

            <Controller
              control={focusControl}
              name="focusEmail"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.label, styles.labelMargin]}>이메일</Text>
                  <TextInput
                    ref={emailInputRef}
                    style={[styles.input, focusErrors.focusEmail && styles.inputError]}
                    placeholder="example@email.com"
                    placeholderTextColor={COLORS.TEXT_LIGHT}
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="email"
                    onSubmitEditing={handleFocusEmailSubmit}
                    returnKeyType="next"
                  />
                  {focusErrors.focusEmail && (
                    <Text style={styles.errorText}>{focusErrors.focusEmail.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={focusControl}
              name="focusPhone"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.label, styles.labelMargin]}>전화번호</Text>
                  <TextInput
                    ref={focusPhoneInputRef}
                    style={styles.input}
                    placeholder="010-1234-5678"
                    placeholderTextColor={COLORS.TEXT_LIGHT}
                    value={value}
                    onChangeText={(text) => handlePhoneChange(onChange, text)}
                    keyboardType="phone-pad"
                    returnKeyType="done"
                    maxLength={13}
                  />
                </>
              )}
            />
          </View>
        </View>

        {/* 폼 예제 (React Hook Form 사용) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>폼 예제 (React Hook Form + Yup)</Text>
          <View style={styles.sectionContent}>
            <Controller
              control={formControl}
              name="name"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={styles.label}>이름</Text>
                  <TextInput
                    style={[styles.input, formErrors.name && styles.inputError]}
                    placeholder="이름을 입력하세요"
                    placeholderTextColor={COLORS.TEXT_LIGHT}
                    value={value}
                    onChangeText={onChange}
                  />
                  {formErrors.name && (
                    <Text style={styles.errorText}>{formErrors.name.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={formControl}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.label, styles.labelMargin]}>전화번호</Text>
                  <TextInput
                    style={[styles.input, formErrors.phone && styles.inputError]}
                    placeholder="010-1234-5678"
                    placeholderTextColor={COLORS.TEXT_LIGHT}
                    value={value}
                    onChangeText={(text) => handlePhoneChange(onChange, text)}
                    keyboardType="phone-pad"
                    maxLength={13}
                  />
                  {formErrors.phone && (
                    <Text style={styles.errorText}>{formErrors.phone.message}</Text>
                  )}
                </>
              )}
            />

            <Controller
              control={formControl}
              name="address"
              render={({ field: { onChange, value } }) => (
                <>
                  <Text style={[styles.label, styles.labelMargin]}>주소</Text>
                  <TextInput
                    style={[styles.input, styles.textArea, formErrors.address && styles.inputError]}
                    placeholder="주소를 입력하세요"
                    placeholderTextColor={COLORS.TEXT_LIGHT}
                    value={value}
                    onChangeText={onChange}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                  {formErrors.address && (
                    <Text style={styles.errorText}>{formErrors.address.message}</Text>
                  )}
                </>
              )}
            />

            <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit(onSubmit)}>
              <Text style={styles.submitText}>제출</Text>
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
