import { StyleSheet, View, Image } from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step02() {
  return (
    <Layout_ReactNativeAz label="Step 02. 기본 컴포넌트" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 프로필 카드 예제 */}
        <View style={styles.card}>
          <Image
            source={require('@assets/images/screens/Step02/profile.jpg')}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text fontWeight="700" style={styles.name}>홍길동</Text>
            <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.email}>hong@example.com</Text>
            <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHTER} style={styles.address}>React Native를 배우고 있는 개발자입니다.</Text>
          </View>
        </View>

        {/* 간단한 카드 예제 */}
        <View style={styles.simpleCard}>
          <Text fontWeight="700" style={styles.cardTitle}>카드 제목</Text>
          <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.cardContent}>이것은 View와 Text 컴포넌트로 만든 간단한 카드입니다.</Text>
        </View>
      </View>
    </Layout_ReactNativeAz>
  );
}

const AVATAR_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.LARGE,
  },
  card: {
    flexDirection: 'row',
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    // Android 그림자 효과
    elevation: 3,
    // iOS 그림자 효과
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.MEDIUM,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: '#e0e0e0',
  },
  info: {
    flex: 1,
    marginLeft: SPACING.MEDIUM,
  },
  email: {
    marginTop: SPACING.XS,
  },
  address: {
    marginTop: SPACING.XS,
  },
  simpleCard: {
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    // Android 그림자 효과
    elevation: 3,
    // iOS 그림자 효과
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.MEDIUM,
  },
  cardContent: {
    marginTop: SPACING.XS,
  },
});

