import { useRef, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Easing,
} from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

const CONTAINER_SIZE = 100;
const BOX_SIZE = CONTAINER_SIZE - (SPACING.SMALL * 2);
const SPINNER_SIZE = BOX_SIZE * 0.5;
const PULSE_SIZE = BOX_SIZE * 0.5;
const TOGGLE_WIDTH = 50;
const TOGGLE_HEIGHT = 30;
const TOGGLE_BORDER_WIDTH = 2;
const SLIDER_SIZE = TOGGLE_HEIGHT - (TOGGLE_BORDER_WIDTH * 2);

export default function ReactNativeAz_Step12() {

  // ========== 1. 페이드 인/아웃 ==========
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [fadeVisible, setFadeVisible] = useState(true);

  useEffect(() => {
    if (fadeVisible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeVisible]);

  const toggleFade = () => {
    setFadeVisible(!fadeVisible);
  };

  // ========== 2. 슬라이드 애니메이션 ==========
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const [slideVisible, setSlideVisible] = useState(false);

  useEffect(() => {
    if (slideVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -CONTAINER_SIZE,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [slideVisible]);

  const toggleSlide = () => {
    setSlideVisible(!slideVisible);
  };

  // ========== 3. 스케일 애니메이션 ==========
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const [scaleVisible, setScaleVisible] = useState(false);

  useEffect(() => {
    if (scaleVisible) {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4, // 마찰 (낮을수록 더 많이 튕김)
        tension: 40, // 장력 (높을수록 빠름)
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(scaleAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [scaleVisible]);

  const toggleScale = () => {
    setScaleVisible(!scaleVisible);
  };

  // ========== 4. 버튼 클릭 애니메이션 ==========
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;

  const handleButtonPressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      friction: 3,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 300,
      useNativeDriver: true,
    }).start();
  };

  // ========== 5. 로딩 스피너 ==========
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const [spinnerActive, setSpinnerActive] = useState(false);

  useEffect(() => {
    if (spinnerActive) {
      const rotate = Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      rotate.start();
      return () => rotate.stop();
    } else {
      rotateAnim.setValue(0);
    }
  }, [spinnerActive]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const toggleSpinner = () => {
    setSpinnerActive(!spinnerActive);
  };

  // ========== 6. 펄스 애니메이션 ==========
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    if (pulseActive) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [pulseActive]);

  const togglePulse = () => {
    setPulseActive(!pulseActive);
  };

  // ========== 7. 슬라이드 토글 ==========
  const [toggleOn, setToggleOn] = useState(false);
  const toggleSlideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(toggleSlideAnim, {
      toValue: toggleOn ? 1 : 0,
      friction: 7,
      tension: 100,
      useNativeDriver: true,
    }).start();
  }, [toggleOn]);

  const translateX = toggleSlideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, TOGGLE_WIDTH - SLIDER_SIZE - (TOGGLE_BORDER_WIDTH * 2)],
  });

  // ========== 8. 인터랙티브 애니메이션 (PanResponder) ==========
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  const resetPan = () => {
    Animated.spring(pan, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start();
  };

  // ========== 9. 애니메이션 조합 ==========
  const comboFadeAnim = useRef(new Animated.Value(0)).current;
  const comboSlideAnim = useRef(new Animated.Value(-50)).current;
  const comboScaleAnim = useRef(new Animated.Value(0.5)).current;
  const [comboActive, setComboActive] = useState(false);

  const startSequenceAnimation = () => {
    setComboActive(true);
    Animated.sequence([
      Animated.timing(comboFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(comboSlideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(comboScaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startParrallelAnimation = () => {
    setComboActive(true);
    Animated.parallel([
      Animated.timing(comboFadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(comboSlideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(comboScaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetComboAnimation = () => {
    setComboActive(false);
    comboFadeAnim.setValue(0);
    comboSlideAnim.setValue(-50);
    comboScaleAnim.setValue(0.5);
  };

  // ========== 10. Stagger 애니메이션 ==========
  const staggerAnim1 = useRef(new Animated.Value(0)).current;
  const staggerAnim2 = useRef(new Animated.Value(0)).current;
  const staggerAnim3 = useRef(new Animated.Value(0)).current;
  const [staggerActive, setStaggerActive] = useState(false);

  const startStaggerAnimation = () => {
    setStaggerActive(true);
    Animated.stagger(100, [
      Animated.timing(staggerAnim1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(staggerAnim2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(staggerAnim3, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const resetStaggerAnimation = () => {
    setStaggerActive(false);
    staggerAnim1.setValue(0);
    staggerAnim2.setValue(0);
    staggerAnim3.setValue(0);
  };

  const staggerTranslateY1 = staggerAnim1.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const staggerTranslateY2 = staggerAnim2.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  const staggerTranslateY3 = staggerAnim3.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <Layout_ReactNativeAz label="12. 애니메이션 (Animated API)" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 1. 페이드 인/아웃 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 페이드 인/아웃</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>Animated.timing()</Text>을 사용하여 opacity 값을 변경하여 페이드 효과를 구현합니다.
            {'\n'}
            <Text style={styles.highlight}>핵심:</Text> <Text style={styles.codeText}>useNativeDriver: true</Text>를 사용하면 네이티브 스레드에서 실행되어 성능이 향상됩니다.
          </Text>

          <View style={styles.animBoxContainer}>
            <Animated.View
              style={[
                styles.animBox,
                {
                  opacity: fadeAnim,
                },
              ]}
            >
              <Text style={styles.animBoxText}>페이드 애니메이션</Text>
            </Animated.View>
          </View>

          <TouchableOpacity style={styles.button} onPress={toggleFade}>
            <Text style={styles.buttonText}>{fadeVisible ? '페이드 아웃' : '페이드 인'}</Text>
          </TouchableOpacity>
        </View>

        {/* 2. 슬라이드 애니메이션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 슬라이드 애니메이션</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>transform: translateY</Text>를 사용하여 위에서 아래로 슬라이드하는 효과를 구현합니다.
            {'\n'}
            <Text style={styles.highlight}>활용:</Text> 모달, 드로어, 알림 등
          </Text>

          <View style={[styles.animBoxContainer, { overflow: 'hidden' }]}>
            <Animated.View
              style={[
                styles.animBox,
                {
                  transform: [{ translateY: slideAnim }],
                }
              ]}
            >
              <Text style={styles.animBoxText}>슬라이드 박스</Text>
            </Animated.View>
          </View>

          <TouchableOpacity style={styles.button} onPress={toggleSlide}>
            <Text style={styles.buttonText}>{slideVisible ? '위로 숨기기' : '아래로 보이기'}</Text>
          </TouchableOpacity>
        </View>

        {/* 3. 스케일 애니메이션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 스케일 애니메이션</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>Animated.spring()</Text>을 사용하여 스프링 효과와 함께 크기가 변하는 애니메이션을 구현합니다.
            {'\n'}
            <Text style={styles.highlight}>설정:</Text> <Text style={styles.codeText}>friction</Text> (마찰: 낮을수록 더 많이 튕김), <Text style={styles.codeText}>tension</Text> (장력: 높을수록 빠름)으로 스프링 효과를 조절합니다.
          </Text>

          <View style={styles.animBoxContainer}>
            <Animated.View
              style={[
                styles.animBox,
                {
                  width: BOX_SIZE,
                  transform: [{ scale: scaleAnim }],
                }
              ]}
            >
              <Text style={styles.animBoxText}>스케일</Text>
            </Animated.View>
          </View>

          <TouchableOpacity style={styles.button} onPress={toggleScale}>
            <Text style={styles.buttonText}>{scaleVisible ? '축소하기' : '확대하기'}</Text>
          </TouchableOpacity>
        </View>

        {/* 4. 버튼 클릭 애니메이션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. 버튼 클릭 애니메이션</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>onPressIn</Text>과 <Text style={styles.codeText}>onPressOut</Text>을 사용하여 버튼을 누를 때와 뗄 때 다른 애니메이션을 적용합니다.
            {'\n'}
            <Text style={styles.highlight}>활용:</Text> 버튼 피드백, 인터랙티브 UI
          </Text>

          <TouchableOpacity
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            activeOpacity={1}
          >
            <Animated.View
              style={[
                styles.button,
                {
                  transform: [{ scale: buttonScaleAnim }],
                }
              ]}
            >
              <Text style={styles.buttonText}>눌러보세요</Text>
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* 5. 로딩 스피너 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 로딩 스피너</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>Animated.loop()</Text>과 <Text style={styles.codeText}>interpolate()</Text>를 사용하여 회전하는 로딩 스피너를 구현합니다.
            {'\n'}
            <Text style={styles.highlight}>핵심:</Text> <Text style={styles.codeText}>interpolate()</Text>로 0~1 값을 0deg~360deg로 변환합니다.
          </Text>

          <View style={styles.animBoxContainer}>
            <Animated.View
              style={[
                styles.spinner,
                {
                  transform: [{ rotate }],
                },
              ]}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={toggleSpinner}>
            <Text style={styles.buttonText}>{spinnerActive ? '정지' : '시작'}</Text>
          </TouchableOpacity>
        </View>

        {/* 6. 펄스 애니메이션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. 펄스 애니메이션</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>Animated.sequence()</Text>와 <Text style={styles.codeText}>Animated.loop()</Text>을 조합하여 반복되는 펄스 효과를 구현합니다.
            {'\n'}
            <Text style={styles.highlight}>활용:</Text> 알림, 중요 요소 강조
          </Text>

          <View style={styles.animBoxContainer}>
            <Animated.View
              style={[
                styles.pulse,
                {
                  transform: [{ scale: pulseAnim }],
                }
              ]}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={togglePulse}>
            <Text style={styles.buttonText}>{pulseActive ? '정지' : '시작'}</Text>
          </TouchableOpacity>
        </View>

        {/* 7. 슬라이드 토글 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>7. 슬라이드 토글</Text>
          <Text style={styles.description}>
            <Text style={styles.highlight}>활용:</Text> 설정 스위치, 온/오프 토글
          </Text>

          <TouchableOpacity
            style={[styles.toggle]}
            onPress={() => setToggleOn(!toggleOn)}
            activeOpacity={0.8}
          >
            <Animated.View
              style={[
                styles.toggleSlider,
                toggleOn && styles.toggleSliderOn,
                {
                  transform: [{ translateX }],
                }
              ]}
            />
          </TouchableOpacity>

          <Text style={styles.toggleStatus}>
            상태: {toggleOn ? 'ON' : 'OFF'}
          </Text>
        </View>

        {/* 8. 인터랙티브 애니메이션 (PanResponder) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>8. 인터랙티브 애니메이션 (PanResponder)</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>PanResponder</Text>를 사용하여 드래그 가능한 박스를 구현합니다.
            {'\n'}
            <Text style={[styles.highlight, styles.highlightRed]}>주의:</Text> PanResponder는 <Text style={styles.codeText}>useNativeDriver: false</Text>를 사용해야 합니다.
          </Text>

          <View style={[styles.animBoxContainer, { height: CONTAINER_SIZE * 2 }]}>
            <Animated.View
              style={[
                styles.animBox,
                styles.panBox,
                {
                  transform: [
                    { translateX: pan.x },
                    { translateY: pan.y },
                  ],
                }
              ]}
              {...panResponder.panHandlers}
            >
              <Text style={styles.animBoxText}>드래그</Text>
            </Animated.View>
          </View>

          <TouchableOpacity style={styles.button} onPress={resetPan}>
            <Text style={styles.buttonText}>초기화</Text>
          </TouchableOpacity>
        </View>

        {/* 9. 애니메이션 조합 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>9. 애니메이션 조합</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>Animated.sequence()</Text>: 순차 실행
            {'\n'}
            <Text style={styles.codeText}>Animated.parallel()</Text>: 병렬 실행
            {'\n'}
            <Text style={styles.highlight}>차이점:</Text> sequence는 하나씩, parallel은 동시에 실행됩니다.
          </Text>

          <View style={[styles.animBoxContainer, { overflow: 'hidden' }]}>
            <Animated.View
              style={[
                styles.animBox,
                styles.comboBox,
                {
                  transform: [
                    { translateY: comboSlideAnim },
                    { scale: comboScaleAnim },
                  ],
                  opacity: comboFadeAnim,
                }
              ]}
            >
              <Text style={styles.animBoxText}>
                조합
                {'\n'}
                애니메이션
              </Text>
            </Animated.View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={startSequenceAnimation}>
              <Text style={styles.buttonText}>순차 실행</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={startParrallelAnimation}>
              <Text style={styles.buttonText}>병렬 실행</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, styles.clearButton, { marginTop: SPACING.SMALL }]} onPress={resetComboAnimation}>
            <Text style={styles.buttonText}>초기화</Text>
          </TouchableOpacity>
        </View>

        {/* 10. Stagger 애니메이션 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>10. Stagger 애니메이션</Text>
          <Text style={styles.description}>
            <Text style={styles.codeText}>Animated.stagger()</Text>를 사용하여 여러 애니메이션을 시간차를 두고 실행합니다.
            {'\n'}
            <Text style={styles.highlight}>활용:</Text> 리스트 아이템 등장, 카드 그리드 애니메이션
          </Text>

          <View style={[
            styles.animBoxContainer,
            styles.staggerContainer,
            { overflow: 'hidden' },
          ]}>
            <Animated.View
              style={[
                styles.animBox,
                styles.staggerBox,
                {
                  transform: [{ translateY: staggerTranslateY1 }],
                  opacity: staggerAnim1,
                },
              ]}
            >
              <Text style={styles.animBoxText}>1</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.animBox,
                styles.staggerBox,
                {
                  transform: [{ translateY: staggerTranslateY2 }],
                  opacity: staggerAnim2,
                },
              ]}
            >
              <Text style={styles.animBoxText}>2</Text>
            </Animated.View>
            <Animated.View
              style={[
                styles.animBox,
                styles.staggerBox,
                {
                  transform: [{ translateY: staggerTranslateY3 }],
                  opacity: staggerAnim3,
                },
              ]}
            >
              <Text style={styles.animBoxText}>3</Text>
            </Animated.View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={startStaggerAnimation}>
              <Text style={styles.buttonText}>시작</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={resetStaggerAnimation}>
              <Text style={styles.buttonText}>초기화</Text>
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
  highlightRed: {
    color: COLORS.RED,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: SPACING.SMALL,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: SPACING.MEDIUM,
    paddingVertical: SPACING.XS,
    marginTop: SPACING.SMALL,
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
  animBoxContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: CONTAINER_SIZE,
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.BORDER_DARKER,
    padding: SPACING.SMALL,
    marginTop: SPACING.SMALL,
  },
  animBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.SECONDARY,
  },
  animBoxText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  // 스피너
  spinner: {
    width: SPINNER_SIZE,
    height: SPINNER_SIZE,
    borderRadius: SPINNER_SIZE / 2,
    borderWidth: 4,
    borderColor: COLORS.PRIMARY,
    borderTopColor: 'transparent',
  },

  // 펄스
  pulse: {
    width: PULSE_SIZE,
    height: PULSE_SIZE,
    borderRadius: PULSE_SIZE / 2,
    backgroundColor: COLORS.SECONDARY,
  },

  // 토글
  toggle: {
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    borderRadius: TOGGLE_HEIGHT / 2,
    borderWidth: TOGGLE_BORDER_WIDTH,
    borderColor: COLORS.BORDER,
    backgroundColor: '#fff',
    marginTop: SPACING.SMALL,
  },
  toggleSlider: {
    width: SLIDER_SIZE,
    height: SLIDER_SIZE,
    borderRadius: SLIDER_SIZE / 2,
    backgroundColor: COLORS.BORDER,
  },
  toggleSliderOn: {
    backgroundColor: COLORS.PRIMARY,
  },
  toggleStatus: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.SMALL,
  },

  // PanResponder
  panBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
  },

  // 조합 애니메이션
  comboBox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
  },

  // Stagger 애니메이션
  staggerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: SPACING.SMALL,
  },
  staggerBox: {
    flex: 1,
    width: 'auto',
  }
});