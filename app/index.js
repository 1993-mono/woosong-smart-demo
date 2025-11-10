import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { FONTS, FONT_SIZE, COLORS } from '@constants/theme';

/*
  # Expo Router 파일 기반 라우팅
    - 파일 이름이 경로로 자동 매핑됩니다.
    - app/step01.js → /step01
    - app/step02.js → /step02
    - 새로운 step 파일을 추가하면 여기에만 추가하면 됩니다.
*/
const steps = [
  { number: '01', title: '새 페이지 및 컴포넌트 생성' },
  { number: '02', title: '기본 컴포넌트' },
];

export default function MenuScreen() {
  /*
    # useRouter : Expo Router의 라우터 Hook
      - navigation.navigate() 대신 router.push()를 사용하여 화면 이동을 처리합니다.
      - 파일 기반 라우팅에서 경로는 파일 경로와 동일합니다.
  */
  const router = useRouter();

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
        {steps.map((step) => {
          // 파일 기반 라우팅: step01.js → /step01
          const path = `/step${step.number}`;
          return (
            <TouchableOpacity
              key={path}
              style={styles.stepItem}
              onPress={() => router.push(path)} // router.push : 다른 화면으로 이동하는 함수 (파일 기반 라우팅)
            >
              <Text style={styles.stepNumber}>Step {step.number}</Text>
              <Text style={styles.stepTitle}>{step.title}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
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

