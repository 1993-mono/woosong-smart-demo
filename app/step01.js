import { StyleSheet } from 'react-native';
import StepLayout from '@components/StepLayout';
import Text from '@components/Text';
import { FONT_SIZE, COLORS } from '@constants/theme';

/*
  # Expo Router 파일 기반 라우팅
    - 이 파일은 app/step01.js로 저장되어 /step01 경로로 자동 매핑됩니다.
    - Stack.Screen의 options를 설정하려면 아래와 같이 export const options를 사용합니다.
*/
export const options = {
  title: 'Step 01 : 새 페이지 및 컴포넌트 생성',
};

export default function Step01() {
  return (
    <StepLayout stepNumber="01" stepTitle="새 페이지 및 컴포넌트 생성">
      <Text>
        여기에 실습 내용이 들어갑니다.
      </Text>

      {/* fontSize 확장 예시 */}
      <Text fontSize={18} fontWeight="700" lineHeight={1.8}>
        더 큰 텍스트
      </Text>

      {/* style로 추가 커스터마이징 */}
      <Text style={{ color: COLORS.TEXT_LIGHT, marginTop: 10 }}>
        색상과 여백을 추가한 텍스트
      </Text>

      {/* StyleSheet로 스타일을 적용한 텍스트 */}
      <Text style={styles.highlight}>
        StyleSheet로 스타일을 적용한 텍스트
      </Text>
    </StepLayout>
  );
}

const styles = StyleSheet.create({
  highlight: {
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    fontWeight: '600',
    marginTop: 20,
  },
});

