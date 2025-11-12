import { StyleSheet, View, Image } from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS } from '@constants/theme';

export default function Step02() {
  return (
    <Layout_ReactNativeAz label="Step 02. 기본 컴포넌트" backgroundColor={COLORS.BACKGROUND}>
      {/* 프로필 카드 예제 */}
      <View style={styles.card}>
        <Image
          source={require('@assets/images/screens/Step02/profile.jpg')}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text fontSize={FONT_SIZE.MEDIUM} fontWeight="700" style={styles.name}>홍길동</Text>
          <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.email}>hong@example.com</Text>
          <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHTER} style={styles.address}>React Native를 배우고 있는 개발자입니다.</Text>
        </View>
      </View>

      {/* 간단한 카드 예제 */}
      <View style={styles.simpleCard}>
        <Text fontSize={FONT_SIZE.LARGE} fontWeight="700" style={styles.cardTitle}>카드 제목</Text>
        <Text color={COLORS.TEXT_LIGHT} style={styles.cardContent}>이것은 View와 Text 컴포넌트로 만든 간단한 카드입니다.</Text>
      </View>
    </Layout_ReactNativeAz>
  );
}

const AVATAR_SIZE = 60;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 10,
    backgroundColor: '#fff',
    // Android 그림자 효과
    elevation: 3,
    // iOS 그림자 효과
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: 20,
    marginBottom: 20,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    marginBottom: 4,
  },
  email: {
    marginBottom: 8,
  },
  simpleCard: {
    borderRadius: 10,
    backgroundColor: '#fff',
    // Android 그림자 효과
    elevation: 3,
    // iOS 그림자 효과
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: 20,
  },
  cardTitle: {
    marginBottom: 10,
  },
});

