import { useState } from 'react';
import { StyleSheet, View, FlatList, RefreshControl } from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step05() {
  // FlatList용 데이터
  const [users, setUsers] = useState([
    { id: '1', name: '홍길동', email: 'hong@example.com' },
    { id: '2', name: '김철수', email: 'kim@example.com' },
    { id: '3', name: '이영희', email: 'lee@example.com' },
    { id: '4', name: '박민수', email: 'park@example.com' },
    { id: '5', name: '정수진', email: 'jung@example.com' },
    { id: '6', name: '최재영', email: 'choi@example.com' },
    { id: '7', name: '박서준', email: 'park@example.com' },
    { id: '8', name: '이지우', email: 'lee@example.com' },
    { id: '9', name: '정현우', email: 'jung@example.com' },
    { id: '10', name: '최지우', email: 'choi@example.com' },
    { id: '11', name: '이지우', email: 'lee@example.com' },
    { id: '12', name: '정현우', email: 'jung@example.com' },
    { id: '13', name: '최지우', email: 'choi@example.com' },
    { id: '14', name: '이지우', email: 'lee@example.com' },
    { id: '15', name: '정현우', email: 'jung@example.com' },
    { id: '16', name: '최지우', email: 'choi@example.com' },
    { id: '17', name: '이지우', email: 'lee@example.com' },
    { id: '18', name: '정현우', email: 'jung@example.com' },
    { id: '19', name: '최지우', email: 'choi@example.com' },
    { id: '20', name: '이지우', email: 'lee@example.com' },
  ]);

  // Pull-to-refresh 상태
  const [refreshing, setRefreshing] = useState(false);

  // 새로고침 핸들러
  const handleRefresh = () => {
    setRefreshing(true);
    // API 호출 시뮬레이션
    setTimeout(() => {
      // 데이터 새로고침 로직 (예 : API 호출 후 setUsers)
      setRefreshing(false);
    }, 2000);
  };

  // 구분선 컴포넌트
  const ItemSeparator = () => <View style={styles.separator} />;

  // 리스트 아이템 렌더링
  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text fontSize={FONT_SIZE.SMALL} fontWeight="700" style={styles.itemName}>{item.name}</Text>
      <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.itemEmail}>{item.email}</Text>
    </View>
  );

  return (
    <Layout_ReactNativeAz label="Step 05-02. 플랫리스트 (Pull-to-refresh)" type="view" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* FlatList 예제 */}
        <View style={styles.section}>
          <View style={styles.sectionContent}>
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSeparator}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
            />
          </View>
        </View>
      </View>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SPACING.LARGE,
  },
  section: {
    flex: 1,
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.MEDIUM,
  },

  // FlatList 스타일
  flatListContainer: {
    maxHeight: 150,
  },
  listItem: {
    padding: SPACING.SMALL,
  },
  itemEmail: {
    marginTop: SPACING.XS,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});