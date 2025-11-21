import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function UserDetailScreen() {
  const router = useRouter();
  // useLocalSearchParams로 파라미터 받기
  const { userId, userName, userEmail, userAge } = useLocalSearchParams();

  const handleBack = () => {
    router.back();
  };

  return (
    <Layout_ReactNativeAz label="사용자 상세" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        <View style={styles.section}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID</Text>
            <Text style={styles.infoValue}>{userId}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>이름</Text>
            <Text style={styles.infoValue}>{userName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>이메일</Text>
            <Text style={styles.infoValue}>{userEmail}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>나이</Text>
            <Text style={styles.infoValue}>{userAge}세</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleBack}>
          <Text style={styles.buttonText}>뒤로가기</Text>
        </TouchableOpacity>
      </View>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.LARGE,
  },
  section: {
    gap: SPACING.SMALL,
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: '#fff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.LARGE,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.MEDIUM,
  },
  infoLabel: {
    minWidth: 60,
    fontWeight: '600',
  },
  infoValue: {
    color: COLORS.TEXT_LIGHT,
  },
  button: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: '#fff',
    padding: SPACING.SMALL,
  },
  buttonText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});

