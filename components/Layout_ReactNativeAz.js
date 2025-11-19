import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';
import { FONT_SIZE, SPACING, LAYOUT } from '@constants/theme';

export default function Layout_ReactNativeAz({
  label,
  type = 'scroll', // 'scroll' || 'view' || 'form'
  backgroundColor = '#fff',
  children
}) {
  const content = (
    <View style={styles.container}>
      <Text fontSize={FONT_SIZE.MEDIUM} fontWeight="700">
        {label}
      </Text>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );

  if (type === 'view') {
    return (
      <View style={[
        styles.background, {
          backgroundColor,
          paddingTop: LAYOUT.HEADER_HEIGHT,
          paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
        }
      ]}>
        {content}
      </View>
    );
  }

  if (type === 'form') {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView style={[styles.background, { backgroundColor }]} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScrollView style={[styles.background, { backgroundColor }]}>
      {content}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingVertical: LAYOUT.PADDING_HORIZONTAL,
  },
  content: {
    flex: 1,
    marginTop: SPACING.MEDIUM,
  },
});