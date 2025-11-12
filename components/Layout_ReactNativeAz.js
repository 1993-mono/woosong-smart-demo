import { StyleSheet, View } from 'react-native';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING, LAYOUT } from '@constants/theme';

export default function Layout_ReactNativeAz({
  label,
  backgroundColor = '#fff',
  children
}) {
  return (
    <ScrollView style={[styles.background, { backgroundColor }]}>
      <View style={styles.container}>
        <Text fontSize={FONT_SIZE.MEDIUM} fontWeight="700">
          {label}
        </Text>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: LAYOUT.PADDING_HORIZONTAL,
  },
  content: {
    marginTop: SPACING.MEDIUM,
  },
});