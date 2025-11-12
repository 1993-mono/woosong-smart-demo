import { StyleSheet, View } from 'react-native';
import { FONTS, FONT_SIZE, COLORS, SPACING } from '@constants/theme';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';

export default function Step01() {
  return (
    <Layout_ReactNativeAz label="Step 01. 새 페이지 및 컴포넌트 생성">
      <View style={styles.container}>
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
      </View>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND,
    padding: SPACING.MEDIUM,
  },
  highlight: {
    fontFamily: FONTS.PRETENDARD_MEDIUM,
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.PRIMARY,
    marginTop: 20,
  },
});

