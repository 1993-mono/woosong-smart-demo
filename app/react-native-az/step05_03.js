import { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step05() {
  // FlatList용 데이터
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 초기 데이터 로드
  useEffect(() => {
    loadData(1);
  }, []);

  // 데이터 로드 함수
  const loadData = async (pageNum) => {
    if (loading || !hasMore) return;

    setLoading(true);

    // API 호출 시뮬레이션
    setTimeout(() => {
      const newData = Array.from({ length: 10 }, (_, i) => {
        const index = (pageNum - 1) * 10 + i + 1;
        return {
          id: `${pageNum}-${i}`,
          name: `사용자 ${index}`,
          email: `user${index}@example.com`,
        };
      });

      if (pageNum === 1) {
        setUsers(newData);
      } else {
        setUsers(prev => [...prev, ...newData]);
      }

      // 더 이상 데이터가 없으면 hasMore를 false로 설정
      if (pageNum >= 5) {
        setHasMore(false);
      }

      setLoading(false);
    }, 1000);
  };

  // 끝에 도달했을 때 호출
  const handleEndReached = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadData(nextPage);
    }
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

  // 하단 로딩 인디케이터
  const renderFooter = () => {
    if (!loading) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color={COLORS.PRIMARY} />
      </View>
    );
  };

  return (
    <Layout_ReactNativeAz label="Step 05-03. 플랫리스트 (무한 스크롤)" type="view" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* FlatList 예제 */}
        <View style={styles.section}>
          <View style={styles.sectionContent}>
            <FlatList
              data={users}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={ItemSeparator}
              onEndReached={handleEndReached}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
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
  footer: {
    paddingVertical: SPACING.MEDIUM,
    alignItems: 'center',
  },
});