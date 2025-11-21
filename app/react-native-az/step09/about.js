import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function AboutScreen() {
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/react-native-az/step09');
    }
  };

  return (
    <Layout_ReactNativeAz label="About 화면" backgroundColor={COLORS.BACKGROUND}>
      <Text style={styles.title}>
        About 페이지입니다.
      </Text>
      <Text style={styles.description}>
        이 화면은 router.push()로 이동한 화면입니다.
      </Text>
      <Text style={styles.description}>
        router.back()을 사용하여 이전 화면으로 돌아갈 수 있습니다.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleBack}>
        <Text style={styles.buttonText}>뒤로가기</Text>
      </TouchableOpacity>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
  description: {
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.SMALL,
  },
  button: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: '#fff',
    padding: SPACING.SMALL,
    marginTop: SPACING.LARGE,
  },
  buttonText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.PRIMARY,
    fontWeight: '600',
  },
});

