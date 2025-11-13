import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, LAYOUT } from '@constants/theme';

export default function BottomNavigation() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { key: 'home', icon: 'home', label: '홈', path: '/' },
    { key: 'az', icon: 'library', label: '리액트 네이티브 A-Z', path: '/react-native-az' },
  ];

  const isActive = (itemPath) => {
    if (itemPath === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(itemPath);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {menuItems.map((item) => {
        const active = isActive(item.path);
        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.menuItem, active && styles.menuItemActive]}
            onPress={() => {
              if (router.canGoBack()) {
                router.dismissAll();
              }
              router.replace(item.path);
            }}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityHint={`${item.label} 화면으로 이동합니다.`}
            accessibilityState={{ selected: active }}
          >
            <Ionicons
              name={active ? item.icon : `${item.icon}-outline`}
              size={24}
              color={active ? COLORS.PRIMARY : COLORS.TEXT_LIGHT}
              accesible={false}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    backgroundColor: '#fff',
  },
  menuItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: LAYOUT.BOTTOM_NAV_HEIGHT,
  },
});