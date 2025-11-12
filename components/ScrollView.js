import { ScrollView as NativeScrollView } from 'react-native';
import { useScrollStore } from '@store/scrollStore';
import { LAYOUT } from '@constants/theme';

export default function ScrollView({
  style,
  contentStyle,
  children,
  showVerticalScrollIndicator = false,
  showHorizontalScrollIndicator = false,
  onScroll,
  ...props
}) {
  const setScrollY = useScrollStore((state) => state.setScrollY);
  const handleScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    setScrollY(currentScrollY);

    if (onScroll) {
      onScroll(event);
    }
  };

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
      onScroll={handleScroll} // 스크롤 이벤트 발생 시 handleScroll 함수 실행
      scrollEventThrottle={16} // 스크롤 이벤트를 16ms마다 한 번씩만 실행
      {...props}
    >
      {children}
    </NativeScrollView>
  );
}