import { StyleSheet, View, Image } from 'react-native';
import StepLayout from '@components/StepLayout';
import Text from '@components/Text';
import { FONT_SIZE, COLORS } from '@constants/theme';

/*
  # Expo Router 파일 기반 라우팅
    - 이 파일은 app/step02.js로 저장되어 /step02 경로로 자동 매핑됩니다.
    - Stack.Screen의 options를 설정하려면 아래와 같이 export const options를 사용합니다.
*/
export const options = {
  title: 'Step 02 : 기본 컴포넌트',
};

export default function Step02() {
  return (
    <StepLayout
      stepNumber="02"
      stepTitle="기본 컴포넌트"
      style={{ backgroundColor: COLORS.BACKGROUND }}
    >
      {/* 프로필 카드 예제 */}
      <View style={styles.card}>
        <Image
          source={require('@assets/images/screens/Step02/profile.jpg')}
          style={styles.avatar}
        />
        <View style={styles.info}>
          <Text style={styles.name}>홍길동</Text>
          <Text style={styles.email}>hong@example.com</Text>
          <Text style={styles.address}>React Native를 배우고 있는 개발자입니다.</Text>
        </View>
      </View>

      {/* 간단한 카드 예제 */}
      <View style={styles.simpleCard}>
        <Text style={styles.cardTitle}>카드 제목</Text>
        <Text style={styles.cardContent}>이것은 View와 Text 컴포넌트로 만든 간단한 카드입니다.</Text>
      </View>
    </StepLayout>
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
    fontSize: FONT_SIZE.MEDIUM,
    color: COLORS.TEXT,
    fontWeight: '700',
    lineHeight: FONT_SIZE.MEDIUM * 1.5,
    marginBottom: 4,
  },
  email: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    lineHeight: FONT_SIZE.SMALL * 1.5,
    marginBottom: 8,
  },
  address: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHTER,
    lineHeight: FONT_SIZE.SMALL * 1.5,
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
    fontSize: FONT_SIZE.LARGE,
    color: COLORS.TEXT,
    fontWeight: '700',
    lineHeight: FONT_SIZE.LARGE * 1.5,
    marginBottom: 10,
  },
  cardContent: {
    fontSize: FONT_SIZE.BASE,
    color: COLORS.TEXT_LIGHT,
    lineHeight: FONT_SIZE.BASE * 1.5,
  },
});

