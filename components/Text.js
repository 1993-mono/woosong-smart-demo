import { Text as NativeText, StyleSheet } from 'react-native'; // Text 명칭 중복 피하기 위해 as NativeText로 별칭 지정
import { FONTS, FONT_SIZE, COLORS } from '@constants/theme';

export default function Text({
  style,
  children,
  fontSize = FONT_SIZE.BASE,
  color = COLORS.TEXT,
  fontWeight = '400',
  lineHeight = 1.5,
  ...props
}) {
  const calculatedLineHeight = fontSize * lineHeight;

  return (
    <NativeText style={[
      styles.default,
      {
        fontSize,
        color,
        fontWeight,
        lineHeight: calculatedLineHeight,
      },
      style
    ]}
      {...props}>
      {children}
    </NativeText>
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: FONTS.PRETENDARD,
    fontSize: FONT_SIZE.BASE,
    color: COLORS.TEXT,
    fontWeight: '400',
  }
});