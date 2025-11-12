import { ScrollView as NativeScrollView } from 'react-native';
import { LAYOUT } from '@constants/theme';

export default function ScrollView({
  style,
  contentStyle,
  children,
  showVerticalScrollIndicator = true,
  showHorizontalScrollIndicator = false,
  ...props
}) {
  return (
    <NativeScrollView
      style={[
        {
          flex: 1,
          backgroundColor: '#fff',
        },
        style,
      ]}
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingTop: LAYOUT.HEADER_HEIGHT,
          paddingHorizontal: LAYOUT.PADDING_HORIZONTAL,
        },
        contentStyle,
      ]}
      showsVerticalScrollIndicator={showVerticalScrollIndicator} // 세로 스크롤바 표시 여부
      showsHorizontalScrollIndicator={showHorizontalScrollIndicator} // 가로 스크롤바 표시 여부
      {...props}
    >
      {children}
    </NativeScrollView>
  );
}