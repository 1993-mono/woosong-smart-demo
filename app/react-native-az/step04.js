import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, Animated } from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step04() {
  // 카운트 상태
  const [count, setCount] = useState(0);

  // 토글 상태
  const [isOn, setIsOn] = useState(false);

  // 토글 버튼 배경색 애니메이션 값
  const toggleAnim = useRef(new Animated.Value(0)).current;

  // 토글 상태 변경 시 애니메이션
  useEffect(() => {
    Animated.timing(toggleAnim, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOn]);

  // 배경색 인터폴레이션
  const toggleBgColor = toggleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#ccc', COLORS.PRIMARY],
  });

  // 제출 버튼 상태
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 제출 버튼 opacity 애니메이션 값
  const submitOpacityAnim = useRef(new Animated.Value(1)).current;

  // 제출 상태 변경 시 애니메이션
  useEffect(() => {
    Animated.timing(submitOpacityAnim, {
      toValue: isSubmitting ? 0.6 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isSubmitting]);

  // 카운트 증가 함수
  const increment = () => {
    setCount(count + 1);
  };

  // 카운트 감소 함수
  const decrement = () => {
    setCount(count - 1);
  };

  // 카운트 리셋 함수
  const reset = () => {
    setCount(0);
  };

  // 토글 함수
  const toggle = () => {
    setIsOn(!isOn);
  };

  // 제출 함수
  const handleSubmit = () => {
    setIsSubmitting(true);
    // API 호출 시뮬레이션
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Layout_ReactNativeAz label="Step 04. 상태 관리와 이벤트 처리" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 카운터 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            카운터 예제
          </Text>
          <View style={[styles.sectionContent, styles.counterContainer]}>
            <Text style={styles.countText}>{count}</Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.button} onPress={decrement}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={reset}>
                <Text style={styles.buttonText}>리셋</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={increment}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* 토글 버튼 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            토글 버튼 예제
          </Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity onPress={toggle} activeOpacity={0.8}>
              <Animated.View style={[styles.toggleButton, { backgroundColor: toggleBgColor }]}>
                <Text style={styles.toggleText}>
                  {isOn ? '켜짐' : '꺼짐'}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </View>
        </View>

        {/* 버튼 비활성화 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            버튼 비활성화 예제
          </Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity onPress={handleSubmit} activeOpacity={0.8} disabled={isSubmitting}>
              <Animated.View style={[styles.submitButton, { opacity: submitOpacityAnim }]}>
                <Text style={styles.submitButtonText}>
                  제출
                </Text>
                {isSubmitting && <ActivityIndicator color="#fff" />}
              </Animated.View>
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

  // 카운트 스타일
  counterContainer: {
    alignItems: 'center',
    gap: SPACING.XS,
  },
  countText: {
    fontSize: FONT_SIZE.XXLARGE,
    color: COLORS.PRIMARY,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.XS,
    marginTop: SPACING.SMALL,
  },
  button: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.XS,
  },
  buttonText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '600',
  },

  // 토글 버튼 스타일
  toggleButton: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.XS,
  },
  toggleText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '700',
  },

  // 제출 버튼 스타일
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.SMALL,
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.XS,
  },
  submitButtonText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '700',
  },
});