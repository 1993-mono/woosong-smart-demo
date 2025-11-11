import { Text as NativeText } from 'react-native'; // Text 명칭 중복 피하기 위해 as NativeText로 별칭 지정
import { FONTS, FONT_SIZE, COLORS } from '@constants/theme';

const getPretendardFont = (fontWeight) => {
  const weight = typeof fontWeight === 'string' ? fontWeight.toLowerCase() : fontWeight;

  if (weight === '100' || weight === 100) return FONTS.PRETENDARD_THIN;
  if (weight === '200' || weight === 200) return FONTS.PRETENDARD_EXTRA_LIGHT;
  if (weight === '300' || weight === 300) return FONTS.PRETENDARD_LIGHT;
  if (weight === '500' || weight === 500) return FONTS.PRETENDARD_MEDIUM;
  if (weight === '600' || weight === 600) return FONTS.PRETENDARD_SEMI_BOLD;
  if (weight === '700' || weight === 700) return FONTS.PRETENDARD_BOLD;
  if (weight === '800' || weight === 800) return FONTS.PRETENDARD_EXTRA_BOLD;

  return FONTS.PRETENDARD_REGULAR;
};

export default function Text({
  style,
  children,
  fontSize = FONT_SIZE.BASE,
  color = COLORS.TEXT,
  fontWeight = '500',
  lineHeight = 1.5,
  ...props
}) {
  const calculatedLineHeight = fontSize * lineHeight;
  const styleFontWeight = style?.fontWeight || fontWeight;
  const fontFamily = getPretendardFont(styleFontWeight);

  return (
    <NativeText style={[
      {
        fontFamily,
        fontSize,
        color,
        lineHeight: calculatedLineHeight,
      },
      style
    ]}
      {...props}>
      {children}
    </NativeText>
  );
}