import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FONTS, FONT_SIZE, COLORS } from '@constants/theme';

import Step01 from '@screens/Step01';
import Step02 from '@screens/Step02';

/*
  # SplashScreen : 앱이 시작될 때 보이는 초기 화면
    - 앱 로딩 중에 사용자에게 보여지는 화면입니다. (로고나 브랜드 이미지 등)
    - preventAutoHideAsync() : 스플래스 스크린이 자동으로 사라지지 않도록 합니다.
    - 폰트나 다른 리소스가 로드될 때까지 스플래시 스크린을 유지하기 위해 사용합니다.
    - 모든 준비가 끝나면 hideAsync()로 수동으로 숨깁니다.
*/
SplashScreen.preventAutoHideAsync();

/*
  # createNativeStackNavigator : 네비게이션 스택을 생성하는 함수
    - 스택 네비게이션은 화면을 쌓아가는 방식으로, 뒤로가기 버튼으로 이전 화면으로 돌아갈 수 있습니다.
    - 예 : 메뉴 → Step01 → (뒤로가기) → 메뉴
*/
const Stack = createNativeStackNavigator();

const steps = [
  { id: 'Step01', number: '01', title: '새 페이지 및 컴포넌트 생성', component: Step01 },
  { id: 'Step02', number: '02', title: '기본 컴포넌트', component: Step02 },
];

// 메뉴 화면 컴포넌트
function MenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native A-Z</Text>
      {/*
        # ScrollView : 스크롤 가능한 컨테이너 컴포넌트
          - 내용이 화면보다 길 때 세로로 스크롤할 수 있게 해줍니다.
          - 웹의 <div style="overflow-y: scroll;">와 유사합니다.
      */}
      <ScrollView style={styles.listContainer}>
        {/*
          # TouchableOpacity : 터치 가능한 버튼 컴포넌트
            - onPress 이벤트를 처리할 수 있으며, 터치 시 약간 투명해지는 피드백 효과가 있습니다.
            - 웹의 <button>과 유사하지만, React Native에서는 버튼 대신 TouchableOpacity를 많이 사용합니다.
        */}
        {steps.map((step) => (
          <TouchableOpacity
            key={step.id}
            style={styles.stepItem}
            onPress={() => navigation.navigate(step.id)} // navigation.navigate : 다른 화면으로 이동하는 함수
          >
            <Text style={styles.stepNumber}>Step {step.number}</Text>
            <Text style={styles.stepTitle}>{step.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
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
    <>
      {/*
        # NavigationContainer : React Navigation의 최상위 컴포넌트
          - 모든 네비게이션 기능을 사용하려면 앱의 루트를 이 컴포넌트로 감싸야 합니다.
          - 네비게이션 상태를 관리하고 화면 전환을 처리합니다.
      */}
      <NavigationContainer>
        {/*
          # Stack.Navigator : 스택 네비게이션을 설정하는 컴포넌트
            - screenOptions로 모든 화면에 공통으로 적용될 스타일을 설정할 수 있습니다.
        */}
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.PRIMARY }, // 헤더 배경색
            headerTintColor: '#fff', // 헤더 텍스트 색상
            headerTitleStyle: {
              fontFamily: FONTS.PRETENDARD,
              fontWeight: 'bold'
            }, // 헤더 제목 스타일
          }}
        >
          {/*
            # Stack.Screen : 네비게이션 스택에 포함될 화면을 정의합니다
              - name : 화면의 고유 식별자 (navigation.navigate()에서 사용)
              - component : 화면으로 표시할 컴포넌트
              - options : 해당 화면에만 적용될 옵션 (제목 등)
          */}
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ title: '실습 메뉴' }}
          />
          {steps.map((step) => (
            <Stack.Screen
              key={step.id}
              name={step.id}
              component={step.component}
              options={{ title: `Step ${step.number} : ${step.title}` }}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    paddingTop: 20,
  },
  title: {
    fontFamily: FONTS.PRETENDARD,
    fontSize: FONT_SIZE.XXLARGE,
    color: COLORS.TEXT,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepItem: {
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
    backgroundColor: '#fff',
    // Android 그림자 효과
    elevation: 3,
    // iOS 그림자 효과
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: 20,
    marginBottom: 15,
  },
  stepNumber: {
    fontFamily: FONTS.PRETENDARD,
    fontSize: FONT_SIZE.BASE,
    color: COLORS.PRIMARY,
    fontWeight: '700',
    marginBottom: 5,
  },
  stepTitle: {
    fontFamily: FONTS.PRETENDARD,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.TEXT,
    fontWeight: '700',
  },
});