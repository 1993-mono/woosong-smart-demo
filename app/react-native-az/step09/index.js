import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step09() {
  const router = useRouter();

  // 예제 데이터: 사용자 리스트
  const users = [
    { id: '1', name: '홍길동', email: 'hong@example.com', age: 25 },
    { id: '2', name: '김철수', email: 'kim@example.com', age: 30 },
    { id: '3', name: '이영희', email: 'lee@example.com', age: 28 },
    { id: '4', name: '박민수', email: 'park@example.com', age: 32 },
  ];

  // 1-1. 기본 네비게이션 - push 사용
  const handleBasicNavigation = () => {
    router.push('/react-native-az/step09/about');
  };

  // 1-2. replace 사용 - 현재 화면 교체
  const handleReplaceNavigation = () => {
    router.replace('/react-native-az/step09/profile');
  };

  // 2. 파라미터 전달 - 객체 형태로 전달
  const handleUserPress = (user) => {
    router.push({
      pathname: '/react-native-az/step09/user-detail',
      params: {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userAge: user.age.toString(),
      },
    });
  };

  // 3. 파라미터 전달 - 쿼리 스트링
  const handleQueryStringNavigation = () => {
    router.push('/react-native-az/step09/profile?userId=123&name=홍길동');
  };

  return (
    <Layout_ReactNativeAz label="09. 네비게이션 심화 (Expo Router)" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 기본 네비게이션 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. 기본 네비게이션</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.button} onPress={handleBasicNavigation}>
              <Text style={styles.buttonText}>About 화면으로 이동 (push)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { marginTop: SPACING.SMALL }]} onPress={handleReplaceNavigation}>
              <Text style={styles.buttonText}>Profile 화면으로 교체 (replace)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 파라미터 전달 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. 파라미터 전달 - 객체 형태</Text>
          <View style={styles.sectionContent}>
            <FlatList
              data={users}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[styles.userCard, { marginTop: index === 0 ? 0 : SPACING.SMALL }]}
                  onPress={() => handleUserPress(item)}
                >
                  <Text style={styles.userCardName}>{item.name}</Text>
                  <Text style={styles.userCardEmail}>{item.email}</Text>
                </TouchableOpacity>
              )}
              scrollEnabled={false}
            />
          </View>
        </View>

        {/* 쿼리 스트링 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. 파라미터 전달 - 쿼리 스트링</Text>
          <View style={styles.sectionContent}>
            <TouchableOpacity style={styles.button} onPress={handleQueryStringNavigation}>
              <Text style={styles.buttonText}>쿼리 스트링으로 이동</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  userCard: {
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: '#fff',
    paddingVertical: SPACING.SMALL,
    paddingHorizontal: SPACING.MEDIUM,
  },
  userCardName: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT,
    fontWeight: '600',
  },
  userCardEmail: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHTER,
  },
});

