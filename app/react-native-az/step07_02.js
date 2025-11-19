import { StyleSheet, View, Image, ImageBackground } from 'react-native'
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz'
import ScrollView from '@components/ScrollView'
import Text from '@components/Text'
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme'

export default function ReactNativeAz_Step07_02() {
  // 이미지 갤러리 데이터
  const galleryImages = [
    { id: 1, uri: 'https://picsum.photos/300/300?random=1' },
    { id: 2, uri: 'https://picsum.photos/300/300?random=2' },
    { id: 3, uri: 'https://picsum.photos/300/300?random=3' },
    { id: 4, uri: 'https://picsum.photos/300/300?random=4' },
    { id: 5, uri: 'https://picsum.photos/300/300?random=5' },
  ]

  return (
    <Layout_ReactNativeAz label="Step 07-02. 이미지 컴포넌트 (고급)" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* resizeMode 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>resizeMode 예제</Text>
          <View style={styles.sectionContent}>
            <View style={styles.resizeExample}>
              <Text style={styles.label}>cover</Text>
              <Image
                source={{
                  uri: 'https://picsum.photos/400/200',
                }}
                style={styles.resizeImage}
                resizeMode="cover"
              />
            </View>
            <View style={[styles.resizeExample, styles.resizeExampleMargin]}>
              <Text style={styles.label}>contain</Text>
              <Image
                source={{
                  uri: 'https://picsum.photos/400/200',
                }}
                style={styles.resizeImage}
                resizeMode="contain"
              />
            </View>
            <View style={[styles.resizeExample, styles.resizeExampleMargin]}>
              <Text style={styles.label}>stretch</Text>
              <Image
                source={{
                  uri: 'https://picsum.photos/400/200',
                }}
                style={styles.resizeImage}
                resizeMode="stretch"
              />
            </View>
          </View>
        </View>

        {/* 이미지 갤러리 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이미지 갤러리 (가로 스크롤)</Text>
          <View style={styles.sectionContent}>
            <ScrollView
              contentContainerStyle={styles.galleryContainer}
              horizontal
              nestedScrollEnabled={true}
            >
              {galleryImages.map((image, index) => (
                <Image
                  key={image.id}
                  source={{ uri: image.uri }}
                  style={[
                    styles.galleryImage,
                    index !== 0 && styles.galleryImageMargin
                  ]}
                />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* 정사각형 이미지 그리드 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>정사각형 이미지 그리드</Text>
          <View style={styles.sectionContent}>
            <View style={styles.gridContainer}>
              {galleryImages.slice(0, 4).map((image) => (
                <View key={image.id} style={styles.gridImageWrapper}>
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.gridImage}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* ImageBackground 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ImageBackground 예제</Text>
          <View style={styles.sectionContent}>
            <ImageBackground
              source={{
                uri: 'https://picsum.photos/400/300',
              }}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <View style={styles.overlay}>
                <Text style={styles.overlayTitle}>제목</Text>
                <Text style={styles.overlaySubtitle}>부제목</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>
    </Layout_ReactNativeAz>
  )
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

  // resizeMode 예제
  resizeExampleMargin: {
    marginTop: SPACING.MEDIUM,
  },
  label: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: '600',
    marginBottom: SPACING.XS,
  },
  resizeImage: {
    width: 200,
    height: 150,
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND,
  },

  // 이미지 갤러리
  galleryContainer: {
    paddingVertical: SPACING.SMALL,
  },
  galleryImage: {
    width: 200,
    height: 200,
    borderRadius: SPACING.XS,
  },
  galleryImageMargin: {
    marginLeft: SPACING.SMALL,
  },

  // 정사각형 이미지 그리드
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SPACING.MEDIUM,
    columnGap: '4%',
  },
  gridImageWrapper: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND,
    overflow: 'hidden',
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },

  // ImageBackground 예제
  backgroundImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 200,
    borderRadius: SPACING.XS,
    overflow: 'hidden',
  },
  overlay: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SPACING.MEDIUM,
  },
  overlayTitle: {
    fontSize: FONT_SIZE.LARGE,
    color: '#fff',
    fontWeight: '700',
  },
  overlaySubtitle: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    marginTop: SPACING.XS,
  },
})