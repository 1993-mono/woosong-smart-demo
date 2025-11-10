import { StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@constants/theme';

export default function SplashScreen() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spin = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spin.start();

    return () => {
      spin.stop();
    };
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityLabel="앱 로딩 중"
      accessibilityHint="앱이 시작되고 있습니다. 잠시만 기다려주세요."
    >
      <Animated.View
        style={{ transform: [{ rotate: spin }] }}
        accessible={false}
      >
        <Ionicons
          name="sync"
          size={48}
          color={COLORS.PRIMARY}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});