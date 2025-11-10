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
    <View>
      <Text>홈 화면입니다.</Text>
    </View>
  );
}