import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { FONTS, COLORS } from '@constants/theme';

/*
  # SplashScreen : 앱이 시작될 때 보이는 초기 화면
    - 앱 로딩 중에 사용자에게 보여지는 화면입니다. (로고나 브랜드 이미지 등)
    - preventAutoHideAsync() : 스플래스 스크린이 자동으로 사라지지 않도록 합니다.
    - 폰트나 다른 리소스가 로드될 때까지 스플래시 스크린을 유지하기 위해 사용합니다.
    - 모든 준비가 끝나면 hideAsync()로 수동으로 숨깁니다.
*/
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  /*
    # useFonts : 커스텀 폰트를 로드하는 Hook
      - 폰트 파일을 비동기로 로드하고, 로드 완료 여부를 반환합니다.
      - fontsLoaded가 true가 되면 폰트 사용 가능.
  */
  const [fontsLoaded] = useFonts({
    'Pretendard': require('@assets/fonts/Pretendard/PretendardVariable.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    /*
      # Stack : Expo Router의 스택 네비게이션 컴포넌트
        - 파일 기반 라우팅을 사용하여 자동으로 화면을 등록합니다.
        - screenOptions로 모든 화면에 공통으로 적용될 스타일을 설정할 수 있습니다.
    */
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.PRIMARY }, // 헤더 배경색
        headerTintColor: '#fff', // 헤더 텍스트 색상
        headerTitleStyle: {
          fontFamily: FONTS.PRETENDARD,
          fontWeight: 'bold'
        }, // 헤더 제목 스타일
      }}
    />
  );
}

