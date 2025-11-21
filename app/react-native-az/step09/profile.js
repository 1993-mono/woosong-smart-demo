import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, usePathname, useSegments } from 'expo-router';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ProfileScreen() {
  // 네비게이션 훅 사용 예제
  const pathname = usePathname();
  const segments = useSegments();
  const params = useLocalSearchParams();

  return (
    <Layout_ReactNativeAz label="Profile 화면" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>네비게이션 훅 예제</Text>
          <View style={styles.sectionContent}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>usePathname():</Text>
              <Text lineHeight={1.2} style={styles.infoValue}>{pathname}</Text>
            </View>
            <View style={[styles.infoRow, { marginTop: SPACING.SMALL }]}>
              <Text style={styles.infoLabel}>useSegments():</Text>
              <Text lineHeight={1.2} style={styles.infoValue}>{JSON.stringify(segments)}</Text>
            </View>
            <View style={[styles.infoRow, { marginTop: SPACING.SMALL }]}>
              <Text style={styles.infoLabel}>useLocalSearchParams():</Text>
              <Text lineHeight={1.2} style={styles.infoValue}>{JSON.stringify(params, null, 2)}</Text>
            </View>
          </View>
        </View>

        {params.userId && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>전달받은 파라미터</Text>
            <View style={styles.sectionContent}>
              {params.userId && (
                <>
                  <Text style={styles.infoLabel}>사용자 ID</Text>
                  <Text lineHeight={1.2} style={styles.infoValue}>{params.userId}</Text>
                </>
              )}
              {params.name && (
                <>
                  <Text style={styles.infoLabel}>이름</Text>
                  <Text lineHeight={1.2} style={styles.infoValue}>{params.name}</Text>
                </>
              )}
            </View>
          </View>
        )}
      </View>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.LARGE,
  },
  section: {
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.MEDIUM,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  sectionContent: {
    marginTop: SPACING.SMALL,
  },
  infoValue: {
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND,
    padding: SPACING.SMALL,
    fontFamily: 'monospace',
    fontSize: FONT_SIZE.TINY,
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.XS,
  },
});

