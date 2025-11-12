import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';

// Data
import { MENU_ITEMS } from '@constants/menu';

export default function ReactNativeAz() {
  const router = useRouter();
  const stepItems = MENU_ITEMS.find(item => item.key === 'az')?.children || [];

  const handleStepPress = (path) => {
    router.push(path);
  };

  return (
    <Layout_ReactNativeAz label="리액트 네이티브 A-Z" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {stepItems.map((item) => (
          <TouchableOpacity
            key={item.key}
            style={styles.card}
            onPress={() => handleStepPress(item.path)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityHint={`${item.label} 화면으로 이동합니다.`}
          >
            <Text
              fontSize={FONT_SIZE.SMALL}
              fontWeight="700"
              style={styles.cardText}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.MEDIUM,
  },
  card: {
    borderRadius: SPACING.XS,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    backgroundColor: '#fff',
    padding: SPACING.MEDIUM,
  },
});