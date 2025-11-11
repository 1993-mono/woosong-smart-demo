import { StyleSheet, View } from 'react-native';
import Text from '@components/Text';
import { FONT_SIZE } from '@constants/theme';

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
      <Text fontSize={FONT_SIZE.MEDIUM} fontWeight="700" style={styles.title}>
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
    marginBottom: 20,
  },
  content: {
    flex: 1,
  },
});