import { useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useScrollStore } from '@store/scrollStore';
import { COLORS, LAYOUT } from '@constants/theme';

export default function SubHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const scrollY = useScrollStore((state) => state.scrollY);
  const setScrollY = useScrollStore((state) => state.setScrollY);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const isResettingRef = useRef(false);
  const isFirstScroll = useRef(true);

  const handleBackPress = () => {
    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    if (pathSegments.length >= 2) {
      const parentPath = '/' + pathSegments.slice(0, -1).join('/');
      router.push(parentPath);
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    isResettingRef.current = true;
    isFirstScroll.current = true;

    setScrollY(0);
    useScrollStore.setState({ lastScrollY: 0 });

    Animated.timing(headerTranslateY, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      isResettingRef.current = false;
    });
  }, [pathname]);

  useEffect(() => {
    if (isResettingRef.current) return;

    if (isFirstScroll.current) {
      useScrollStore.setState({ lastScrollY: scrollY });
      headerTranslateY.setValue(0);
      isFirstScroll.current = false;
      return;
    }

    const diff = scrollY - useScrollStore.getState().lastScrollY;
    const currentY = headerTranslateY._value || 0;
    let targetY = currentY;

    if (diff > 0) {
      targetY = Math.max(currentY - diff, -LAYOUT.HEADER_HEIGHT);
    } else if (diff < 0) {
      targetY = Math.min(currentY - diff, 0);
    }

    headerTranslateY.setValue(targetY);
  }, [scrollY]);

  return (
    <>
      <Animated.View
        style={[
          styles.header,
          {
            height: LAYOUT.HEADER_HEIGHT,
            transform: [{ translateY: headerTranslateY }],
          }
        ]}
        accessibilityRole="header"
        accessibilityLabel="앱 헤더"
      >
        <View style={styles.leftContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBackPress}
            accessibilityRole="button"
            accessibilityLabel="상위 페이지 이동 버튼"
            accessibilityHint="이전 화면으로 이동합니다."
          >
            <Ionicons name="arrow-back-outline" size={24} color={COLORS.TEXT} accessible={false} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
    backgroundColor: '#fff',
    paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
});