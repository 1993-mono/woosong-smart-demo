import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, BackHandler, Animated, Easing, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useScrollStore } from '@store/scrollStore';
import { FONT_SIZE, COLORS, SPACING, LAYOUT } from '@constants/theme';
import Text from '@components/Text';

// Data
import { MENU_ITEMS } from '@constants/menu';
import { USER_DATA } from '@constants/userData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function Header() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useScrollStore((state) => state.scrollY);
  const setScrollY = useScrollStore((state) => state.setScrollY);
  const headerTranslateY = useRef(new Animated.Value(0)).current;
  const isResettingRef = useRef(false);
  const isFirstScroll = useRef(true);

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

  useEffect(() => {
    if (!menuVisible) return;

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      handleMenuClose();
      return true;
    });

    return () => backHandler.remove();
  }, [menuVisible]);

  useEffect(() => {
    if (menuVisible) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [menuVisible]);

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleMenuClose = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      setMenuVisible(false);
    });
  };

  const handleMenuItemPress = (path) => {
    router.push(path);
    handleMenuClose(false);
  };

  const renderMenuItem = (item, depth = 0) => {
    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));

    return (
      <View
        key={item.key}
        style={styles[`menu${depth + 1}DepthItem`]}
      >
        <TouchableOpacity
          style={styles[`menu${depth + 1}DepthButton`]}
          onPress={() => handleMenuItemPress(item.path)}
          accessibilityRole="button"
          accessibilityLabel={item.label}
          accessibilityHint={`${item.label} 화면으로 이동합니다.`}
          accessibilityState={{ selected: isActive }}
        >
          <Text
            style={[
              styles[`menu${depth + 1}DepthText`],
              isActive && styles[`menu${depth + 1}DepthTextActive`],
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
        {item.children && (
          <View style={styles[`menu${depth + 2}DepthList`]}>
            {item.children.map((child) => renderMenuItem(child, depth + 1))}
          </View>
        )}
      </View>
    );
  };

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [SCREEN_WIDTH, 0],
  });

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
          <Text
            fontSize={FONT_SIZE.LARGE}
            fontWeight="700"
            style={styles.logoText}
            accessibilityRole="text"
            accessibilityLabel="로고"
          >
            LOGO
          </Text>
        </View>

        <View style={styles.rightContainer}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={handleMenuPress}
            accessibilityRole="button"
            accessibilityLabel="메뉴 버튼"
            accessibilityHint="메뉴를 엽니다."
            accessibilityState={{ expanded: menuVisible }}
          >
            <Ionicons name="menu" size={24} color={COLORS.TEXT} accessible={false} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.menu,
          {
            paddingBottom: insets.bottom,
            transform: [{ translateX }],
            pointerEvents: menuVisible ? 'auto' : 'none',
          }
        ]}
        accessibilityRole="menu"
        accessibilityLabel="메뉴"
        accessibilityViewIsModal={true}
      >
        <View
          style={styles.menuHeader}
          accessibilityRole="header"
          accessibilityLabel="메뉴 헤더"
        >
          <View style={styles.menuTitleWrapper}>
            <Text fontSize={FONT_SIZE.SMALL} fontWeight="700" style={styles.menuTitleName}>{USER_DATA.name}</Text>
            <Text fontSize={FONT_SIZE.SMALL} style={styles.menuTitleDepartment}>( {USER_DATA.department} )</Text>
          </View>
          <TouchableOpacity
            style={styles.menuButtonClose}
            onPress={handleMenuClose}
            accessibilityRole="button"
            accessibilityLabel="메뉴 닫기"
            accessibilityHint="메뉴를 닫습니다."
          >
            <Ionicons name="chevron-forward-outline" size={24} color={COLORS.TEXT} accessible={false} />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.menuItems}
          accessibilityRole="list"
          accessibilityLabel="메뉴 목록"
        >
          <View style={styles.menu1DepthList}>
            {MENU_ITEMS.map((item) => renderMenuItem(item, 0))}
          </View>
        </ScrollView>
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.SMALL,
    marginLeft: SPACING.LARGE,
  },
  menu: {
    width: SCREEN_WIDTH,
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 101,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: LAYOUT.HEADER_HEIGHT,
    paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
    marginBottom: SPACING.MEDIUM,
  },
  menuItems: {
    paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
  },
  menu1DepthText: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: '700',
  },
  menu2DepthList: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.BORDER,
    paddingLeft: SPACING.MEDIUM,
    marginVertical: SPACING.SMALL,
  },
  menu2DepthText: {
    paddingVertical: SPACING.XS,
    fontSize: FONT_SIZE.SMALL,
  },
});