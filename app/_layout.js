import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Stack } from 'expo-router';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomSplashScreen from '@components/SplashScreen';
import Header from '@components/Header';
import BottomNavigation from '@components/BottomNavigation';
import { LAYOUT } from '@constants/theme';

/*
  # SplashScreen : 앱이 시작될 때 보이는 초기 화면
    - preventAutoHideAsync() : 네이티브 스플래시 스크린이 자동으로 사라지지 않도록 합니다.
    - 네이티브 스플래시를 즉시 숨기고 커스텀 스플래시로 대체합니다.
*/
SplashScreen.preventAutoHideAsync();

// 네이티브 스플래시를 즉시 숨김 (컴포넌트 렌더링 전에 실행)
SplashScreen.hideAsync();

export default function RootLayout() {
  const insets = useSafeAreaInsets();

  /*
    # useFonts : 커스텀 폰트를 로드하는 Hook
      - 폰트 파일을 비동기로 로드하고, 로드 완료 여부를 반환합니다.
      - fontsLoaded가 true가 되면 폰트 사용 가능.
  */
  const [fontsLoaded] = useFonts({
    'Pretendard': require('@assets/fonts/Pretendard/PretendardVariable.ttf'),
  });

  if (!fontsLoaded) {
    return <CustomSplashScreen />;
  }

  return (
    <View style={styles.container}>
      <Header />
      {/*
        # ScrollView : Header와 Stack을 감싸서 스크롤 가능하게 만듦
          - Header가 스크롤과 함께 움직입니다.
          - Stack의 각 화면도 스크롤 가능합니다.
      */}
      <ScrollView
        style={[styles.scrollView, { paddingTop: insets.top + LAYOUT.HEADER_HEIGHT }]}
        contentContainerStyle={styles.scrollContent}
        shwsVerticalScrollIndicator={false}
      >
        {/*
          # Stack : Expo Router의 스택 네비게이션 컴포넌트
            - 파일 기반 라우팅을 사용하여 자동으로 화면을 등록합니다.
            - screenOptions로 모든 화면에 공통으로 적용될 스타일을 설정할 수 있습니다.
        */}
        <View style={styles.stackContainer}>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomNavContainer}>
        <BottomNavigation />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  stackContainer: {
    flex: 1,
    minHeight: '100%',
  },
});