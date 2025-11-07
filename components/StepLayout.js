import { StyleSheet, Text, View } from 'react-native';
import { FONTS, FONT_SIZE, COLORS } from '@constants/theme';

export default function StepLayout({
  stepNumber,
  stepTitle,
  children,
  style
}) {
  return (
    <View
      style={[styles.container, style]}
    >
      <Text style={styles.title}>
        Step {stepNumber} : {stepTitle}
      </Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontFamily: FONTS.PRETENDARD,
    fontSize: FONT_SIZE.XXLARGE,
    color: COLORS.TEXT,
    fontWeight: '700',
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
});