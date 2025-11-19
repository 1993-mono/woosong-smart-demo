import { useState } from 'react'
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native'
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz'
import Text from '@components/Text'
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme'

export default function ReactNativeAz_Step07_01() {
  // 로딩 상태 관리
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // 이미지 에러 상태
  const [imageError, setImageError] = useState(false)

  return (
    <Layout_ReactNativeAz label="Step 07-01. 이미지 컴포넌트 (기본)" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 로컬 이미지 표시 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>로컬 이미지 표시</Text>
          <View style={styles.sectionContent}>
            <Image
              source={require('@assets/images/icon.png')}
              style={styles.image}
            />
          </View>
        </View>

        {/* 원격 이미지 표시 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>원격 이미지 표시</Text>
          <View style={styles.sectionContent}>
            <Image
              source={{
                uri: 'https://picsum.photos/200/200',
              }}
              style={styles.image}
            />
          </View>
        </View>

        {/* 로딩 상태 처리 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>로딩 상태 처리</Text>
          <View style={styles.sectionContent}>
            <View style={styles.imageContainer}>
              {loading && (
                <ActivityIndicator
                  style={styles.loader}
                  size="large"
                  color={COLORS.PRIMARY}
                />
              )}
              {error && (
                <Text style={styles.errorText}>이미지를 불러올 수 없습니다</Text>
              )}
              <Image
                source={{
                  uri: 'https://picsum.photos/300/300',
                }}
                style={[styles.image, loading && styles.hidden]}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false)
                  setError(true)
                }}
              />
            </View>
          </View>
        </View>

        {/* 플레이스홀더 이미지 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>플레이스홀더 이미지</Text>
          <View style={styles.sectionContent}>
            {imageError ? (
              <View style={styles.placeholderContainer}>
                <Text style={styles.placeholderText}>이미지 없음</Text>
              </View>
            ) : (
              <Image
                source={{
                  uri: 'https://picsum.photos/200/200',
                }}
                style={styles.image}
                onError={() => setImageError(true)}
              />
            )}
          </View>
        </View>

        {/* 원형 이미지 (프로필 사진) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>원형 이미지 (프로필 사진)</Text>
          <View style={styles.sectionContent}>
            <Image
              source={{
                uri: 'https://picsum.photos/200/200',
              }}
              style={styles.profileImage}
            />
          </View>
        </View>

        {/* 이미지 스타일링 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>이미지 스타일링 예제</Text>
          <View style={styles.sectionContent}>
            <Image
              source={{
                uri: 'https://picsum.photos/200/200',
              }}
              style={styles.styledImage}
            />
          </View>
        </View>
      </View>
    </Layout_ReactNativeAz>
  );
}

const IMAGE_SIZE = 200
const PROFILE_IMAGE_SIZE = 100

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
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND,
  },

  // 로딩 상태 처리
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  loader: {
    position: 'absolute',
  },
  errorText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.RED,
  },
  hidden: {
    opacity: 0,
  },

  // 플레이스홀더 이미지
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.BACKGROUND,
  },
  placeholderText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
  },

  // 원형 이미지 (프로필 사진)
  profileImage: {
    width: PROFILE_IMAGE_SIZE,
    height: PROFILE_IMAGE_SIZE,
    borderRadius: PROFILE_IMAGE_SIZE / 2,
    borderWidth: 3,
    borderColor: '#fff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
  },

  // 이미지 스타일링
  styledImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: SPACING.XS,
    borderWidth: 2,
    borderColor: COLORS.PRIMARY,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.25,
  },
})