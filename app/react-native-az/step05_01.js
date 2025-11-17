import { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step05_01() {
  // ScrollView 스크롤 상태
  const [scrollState, setScrollState] = useState({
    scrollY: 0,
    contentHeight: 0,
    layoutHeight: 0,
  });

  // Gradient 마스크 opacity 애니메이션
  const topMaskOpacity = useRef(new Animated.Value(0)).current;
  const bottomMaskOpacity = useRef(new Animated.Value(0)).current;

  // 스크롤 핸들러
  const handleScroll = (event) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    setScrollState({
      scrollY: contentOffset.y,
      contentHeight: contentSize.height,
      layoutHeight: layoutMeasurement.height,
    });
  };

  // 스크롤 가능 여부 확인
  const canScroll = () => {
    return scrollState.contentHeight > scrollState.layoutHeight;
  };

  // 상단에 스크롤할 것이 있는지 확인
  const showTopMask = () => {
    return canScroll() && scrollState.scrollY > 0;
  };

  // 하단에 스크롤할 것이 있는지 확인
  const showBottomMask = () => {
    if (!canScroll()) return false;
    const maxScrollY = scrollState.contentHeight - scrollState.layoutHeight;
    return scrollState.scrollY < maxScrollY - 1; // 1px 여유
  };

  // 상단 마스크 애니메이션
  useEffect(() => {
    Animated.timing(topMaskOpacity, {
      toValue: showTopMask() ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [scrollState.scrollY, scrollState.contentHeight, scrollState.layoutHeight]);

  // 하단 마스크 애니메이션
  useEffect(() => {
    Animated.timing(bottomMaskOpacity, {
      toValue: showBottomMask() ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [scrollState.scrollY, scrollState.contentHeight, scrollState.layoutHeight]);

  return (
    <Layout_ReactNativeAz label="Step 05-01. 스크롤뷰" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* ScrollView 예제 */}
        <View style={styles.section}>
          <View style={styles.sectionContent}>
            {(showTopMask() || topMaskOpacity._value > 0) && (
              <Animated.View style={[styles.topMask, { opacity: topMaskOpacity }]}>
                <LinearGradient
                  colors={['#fff', 'rgba(255, 255, 255, 0)']}
                  style={styles.gradient}
                  pointerEvents="none"
                />
              </Animated.View>
            )}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true} // 중첩 스크롤 허용
              onScroll={handleScroll}
              scrollEventThrottle={16}
              onContentSizeChange={(w, h) => {
                setScrollState(prev => ({ ...prev, contentHeight: h }));
              }}
              onLayout={(event) => {
                const { height } = event.nativeEvent.layout;
                setScrollState(prev => ({ ...prev, layoutHeight: height }));
              }}
            >
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 1</Text>
              </View>
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 2</Text>
              </View>
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 3</Text>
              </View>
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 4</Text>
              </View>
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 5</Text>
              </View>
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 6</Text>
              </View>
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 7</Text>
              </View>
              <View style={styles.scrollItem}>
                <Text style={styles.scrollItemText}>아이템 8</Text>
              </View>
            </ScrollView>
            {(showBottomMask() || bottomMaskOpacity._value > 0) && (
              <Animated.View style={[styles.bottomMask, { opacity: bottomMaskOpacity }]}>
                <LinearGradient
                  colors={['rgba(255, 255, 255, 0)', '#fff']}
                  style={styles.gradient}
                  pointerEvents="none"
                />
              </Animated.View>
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

  // ScrollView 스타일
  scrollView: {
    maxHeight: 175,
  },
  scrollContent: {
    gap: SPACING.XS,
    paddingBottom: SPACING.XS,
  },
  scrollItem: {
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND,
    paddingVertical: SPACING.XS,
    paddingHorizontal: SPACING.SMALL,
  },
  scrollItemText: {
    fontSize: FONT_SIZE.SMALL,
  },

  // Gradient 마스크 스타일
  topMask: {
    height: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  bottomMask: {
    height: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  gradient: {
    flex: 1,
  },
});