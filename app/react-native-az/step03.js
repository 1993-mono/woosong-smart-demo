import { StyleSheet, View } from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step03() {
  return (
    <Layout_ReactNativeAz label="Step 03. 레이아웃과 스타일링" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* Flexbox 예제 1 : flexDirection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            flexDirection 예제
          </Text>
          <View style={[styles.sectionContent, styles.rowExample]}>
            <View style={[styles.box, styles.boxRed]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.box, styles.boxBlue]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.box, styles.boxGreen]}>
              <Text style={styles.boxText}>3</Text>
            </View>
          </View>
        </View>

        {/* Flexbox 예제 2 : justifyContent */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            justifyContent 예제
          </Text>
          <View style={[styles.sectionContent, styles.justifyExample]}>
            <View style={[styles.smallBox, styles.boxRed]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.smallBox, styles.boxBlue]}>
              <Text style={styles.boxText}>2</Text>
            </View>
            <View style={[styles.smallBox, styles.boxGreen]}>
              <Text style={styles.boxText}>3</Text>
            </View>
          </View>
        </View>

        {/* Flexbox 예제 3 : alignItems */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            alignItems 예제
          </Text>
          <View style={[styles.sectionContent, styles.alignExample]}>
            <View style={[styles.smallBox, styles.boxRed]}>
              <Text style={styles.boxText}>1</Text>
            </View>
            <View style={[styles.smallBox, styles.boxBlue]}>
              <Text style={styles.boxText}>2</Text>
            </View>
          </View>
        </View>

        {/* Flexbox 예제 4 : flex 속성 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            flex 예제
          </Text>
          <View style={[styles.sectionContent, styles.flexExample]}>
            <View style={[styles.flexBox, styles.boxRed, { flex: 1 }]}>
              <Text style={styles.boxText}>flex: 1</Text>
            </View>
            <View style={[styles.flexBox, styles.boxBlue, { flex: 2 }]}>
              <Text style={styles.boxText}>flex: 2</Text>
            </View>
            <View style={[styles.flexBox, styles.boxGreen, { flex: 1 }]}>
              <Text style={styles.boxText}>flex: 1</Text>
            </View>
          </View>
        </View>

        {/* 카드 그리드 레이아웃 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            카드 그리드 레이아웃
          </Text>
          <View style={[styles.sectionContent, styles.grid]}>
            <View style={styles.gridCard}>
              <Text style={styles.cardTitle}>카드 1</Text>
              <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.cardContent}>내용 1</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.cardTitle}>카드 2</Text>
              <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.cardContent}>내용 2</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.cardTitle}>카드 3</Text>
              <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.cardContent}>내용 3</Text>
            </View>
            <View style={styles.gridCard}>
              <Text style={styles.cardTitle}>카드 4</Text>
              <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.cardContent}>내용 4</Text>
            </View>
          </View>
        </View>

        {/* 스타일링 예제 : 그림자와 borderRadius */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            스타일링 예제
          </Text>
          <View style={[styles.sectionContent, styles.styledCard]}>
            <Text style={styles.cardTitle}>
              그림자와 둥근 모서리
            </Text>
            <Text fontSize={FONT_SIZE.SMALL} color={COLORS.TEXT_LIGHT} style={styles.cardContent}>
              elevation과 shadow 속성을 사용한 카드입니다.
            </Text>
          </View>
        </View>
      </View>
    </Layout_ReactNativeAz>
  );
}

const BOX_SIZE = 60;
const SMALL_BOX_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    gap: SPACING.LARGE,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  sectionContent: {
    marginTop: SPACING.SMALL,
  },

  // flexDirection 예제 스타일
  rowExample: {
    flexDirection: 'row',
    gap: SPACING.SMALL,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderRadius: SPACING.SMALL,
  },
  boxText: {
    color: '#fff',
    fontWeight: '700',
  },
  boxRed: {
    backgroundColor: '#ff6b6b',
  },
  boxBlue: {
    backgroundColor: '#4ecdc4',
  },
  boxGreen: {
    backgroundColor: '#45b7d1',
  },

  // justifyContent 예제 스타일
  justifyExample: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    pddingVertical: SPACING.MEDIUM,
  },
  smallBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SMALL_BOX_SIZE,
    height: SMALL_BOX_SIZE,
    borderRadius: SPACING.XS,
  },

  // alignItems 예제 스타일
  alignExample: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    borderRadius: SPACING.SMALL,
    backgroundColor: '#fff',
    paddingVertical: SPACING.MEDIUM,
  },

  // flex 속성 예제 스타일
  flexExample: {
    flexDirection: 'row',
    gap: SPACING.SMALL,
    height: 60,
  },
  flexBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SPACING.SMALL,
  },

  // 그리드 레이아웃 스타일
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: SPACING.MEDIUM,
    columnGap: '4%',
  },
  gridCard: {
    width: '48%',
    borderRadius: SPACING.SMALL,
    backgroundColor: '#fff',
    elevation: 2,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.MEDIUM,
  },
  cardTitle: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: '700',
  },
  cardContent: {
    marginTop: SPACING.XS,
  },

  // 스타일링 예제 카드
  styledCard: {
    borderRadius: SPACING.MEDIUM,
    backgroundColor: '#fff',
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    padding: SPACING.LARGE,
  },
});