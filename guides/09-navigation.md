# 09. 네비게이션 심화 (Expo Router)

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   Expo Router의 파일 기반 라우팅 이해
-   화면 간 이동 및 파라미터 전달
-   네비게이션 스택 관리
-   탭 네비게이션 구현
-   네비게이션 훅 사용법

## 🧭 Expo Router란?

**Expo Router**는 파일 시스템 기반의 라우팅 솔루션입니다. Next.js와 유사한 방식으로 파일 구조를 기반으로 자동으로 라우트를 생성합니다.

### 특징

-   파일 기반 라우팅: 폴더 구조가 라우트 구조가 됨
-   자동 코드 스플리팅
-   딥링크 지원
-   타입 안정성 (TypeScript 지원)
-   네이티브 네비게이션 성능

### 기본 파일 구조

```
app/
  _layout.js          # 루트 레이아웃
  index.js            # / 경로
  about.js            # /about 경로
  profile/
    index.js          # /profile 경로
    settings.js       # /profile/settings 경로
```

## 🔑 기본 네비게이션

### useRouter 훅

화면 간 이동을 위해 `useRouter` 훅을 사용합니다.

```javascript
import { useRouter } from "expo-router";

function MyComponent() {
    const router = useRouter();

    const navigateToAbout = () => {
        router.push("/about");
    };

    return (
        <TouchableOpacity onPress={navigateToAbout}>
            <Text>About로 이동</Text>
        </TouchableOpacity>
    );
}
```

### 주요 네비게이션 메서드

```javascript
const router = useRouter();

// 새 화면으로 이동 (스택에 추가)
router.push("/about");

// 현재 화면을 교체
router.replace("/about");

// 이전 화면으로 돌아가기
router.back();

// 특정 경로로 이동하고 이전 스택 제거
router.dismissAll();
router.replace("/home");
```

## 📝 화면 간 파라미터 전달

### 쿼리 파라미터로 전달

```javascript
// 파라미터 전달
router.push({
    pathname: "/profile",
    params: { userId: "123", name: "홍길동" },
});

// 또는
router.push("/profile?userId=123&name=홍길동");
```

### useLocalSearchParams로 받기

```javascript
import { useLocalSearchParams } from "expo-router";

function ProfileScreen() {
    const { userId, name } = useLocalSearchParams();

    return (
        <View>
            <Text>사용자 ID: {userId}</Text>
            <Text>이름: {name}</Text>
        </View>
    );
}
```

### 실전 예제

```javascript
// 리스트 화면
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, Text, View } from "react-native";

function UserListScreen() {
    const router = useRouter();
    const users = [
        { id: "1", name: "홍길동" },
        { id: "2", name: "김철수" },
        { id: "3", name: "이영희" },
    ];

    const handleUserPress = (user) => {
        router.push({
            pathname: "/user-detail",
            params: { userId: user.id, userName: user.name },
        });
    };

    return (
        <FlatList
            data={users}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleUserPress(item)}>
                    <Text>{item.name}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

// 상세 화면
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";

function UserDetailScreen() {
    const { userId, userName } = useLocalSearchParams();
    const router = useRouter();

    return (
        <View>
            <Text>사용자 ID: {userId}</Text>
            <Text>이름: {userName}</Text>
            <TouchableOpacity onPress={() => router.back()}>
                <Text>뒤로가기</Text>
            </TouchableOpacity>
        </View>
    );
}
```

## 📚 Stack Navigation

스택 네비게이션은 화면을 스택처럼 쌓아서 관리합니다.

### 기본 구조

```javascript
// app/_layout.js
import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: "#06c",
                },
                headerTintColor: "#fff",
            }}
        >
            <Stack.Screen name="index" options={{ title: "홈" }} />
            <Stack.Screen name="about" options={{ title: "소개" }} />
        </Stack>
    );
}
```

### 화면별 옵션 설정

```javascript
// app/_layout.js
<Stack>
    <Stack.Screen
        name="profile"
        options={{
            title: "프로필",
            headerShown: true,
            headerBackTitle: "뒤로", // iOS만
        }}
    />
    <Stack.Screen
        name="settings"
        options={{
            title: "설정",
            presentation: "modal", // 모달 형태로 표시
        }}
    />
</Stack>
```

## 🗂️ Tab Navigation

탭 네비게이션은 하단에 탭 바를 표시하여 여러 화면을 전환합니다.

### 기본 구조

```javascript
// app/(tabs)/_layout.js
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#06c",
                tabBarInactiveTintColor: "#999",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "홈",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "프로필",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
```

### 파일 구조

```
app/
  (tabs)/
    _layout.js    # 탭 레이아웃
    index.js      # 홈 탭
    profile.js    # 프로필 탭
    settings.js   # 설정 탭
```

### 탭 옵션

```javascript
<Tabs.Screen
    name="profile"
    options={{
        title: "프로필",
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
        ),
        tabBarBadge: 3, // 배지 표시
        tabBarBadgeStyle: { backgroundColor: "#ff0000" },
    }}
/>
```

## 🔄 네비게이션 훅

### usePathname

현재 경로를 가져옵니다.

```javascript
import { usePathname } from "expo-router";

function MyComponent() {
    const pathname = usePathname();
    // "/profile" 또는 "/about" 등

    return <Text>현재 경로: {pathname}</Text>;
}
```

### useSegments

경로 세그먼트 배열을 가져옵니다.

```javascript
import { useSegments } from "expo-router";

function MyComponent() {
    const segments = useSegments();
    // ["profile", "settings"] 등

    return <Text>세그먼트: {segments.join("/")}</Text>;
}
```

### router.canGoBack()

뒤로 갈 수 있는지 확인합니다.

```javascript
const router = useRouter();

if (router.canGoBack()) {
    router.back();
} else {
    router.replace("/home");
}
```

## 💡 실전 예제

### 네비게이션 바 구현

```javascript
import { useRouter, usePathname } from "expo-router";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

function NavigationBar() {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { path: "/", label: "홈" },
        { path: "/about", label: "소개" },
        { path: "/profile", label: "프로필" },
    ];

    return (
        <View style={styles.navBar}>
            {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <TouchableOpacity
                        key={item.path}
                        style={[
                            styles.navItem,
                            isActive && styles.navItemActive,
                        ]}
                        onPress={() => router.push(item.path)}
                    >
                        <Text
                            style={[
                                styles.navText,
                                isActive && styles.navTextActive,
                            ]}
                        >
                            {item.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    navBar: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingVertical: 10,
    },
    navItem: {
        flex: 1,
        alignItems: "center",
        paddingVertical: 10,
    },
    navItemActive: {
        borderTopWidth: 2,
        borderTopColor: "#06c",
    },
    navText: {
        fontSize: 14,
        color: "#999",
    },
    navTextActive: {
        color: "#06c",
        fontWeight: "600",
    },
});
```

### 뒤로가기 버튼

```javascript
import { useRouter } from "expo-router";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function BackButton() {
    const router = useRouter();

    const handleBack = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/");
        }
    };

    return (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Ionicons name="arrow-back" size={24} color="#06c" />
            <Text style={styles.backText}>뒤로</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    backButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
    },
    backText: {
        marginLeft: 5,
        fontSize: 16,
        color: "#06c",
    },
});
```

### 딥링크 처리

```javascript
import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";

function DeepLinkHandler() {
    const router = useRouter();
    const params = useLocalSearchParams();

    useEffect(() => {
        // 딥링크로 특정 화면으로 이동
        if (params.screen === "profile" && params.userId) {
            router.push({
                pathname: "/profile",
                params: { userId: params.userId },
            });
        }
    }, [params]);

    return null;
}
```

## 🎨 네비게이션 스타일링

### 헤더 커스터마이징

```javascript
<Stack.Screen
    name="profile"
    options={{
        title: "프로필",
        headerStyle: {
            backgroundColor: "#06c",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
            fontWeight: "bold",
        },
        headerRight: () => (
            <TouchableOpacity onPress={() => console.log("설정")}>
                <Ionicons name="settings" size={24} color="#fff" />
            </TouchableOpacity>
        ),
    }}
/>
```

### 탭 바 스타일링

```javascript
<Tabs
    screenOptions={{
        tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 1,
            borderTopColor: "#eee",
            height: 60,
            paddingBottom: 10,
            paddingTop: 10,
        },
        tabBarActiveTintColor: "#06c",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
        },
    }}
>
    {/* 탭 스크린들 */}
</Tabs>
```

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. Expo Router로 화면 간 이동 구현하기
2. 파라미터 전달 및 받기
3. Stack Navigation 설정하기
4. Tab Navigation 구현하기
5. 네비게이션 훅 활용하기

## 📝 정리

-   **Expo Router**: 파일 기반 라우팅 시스템
-   **useRouter**: 화면 간 이동을 위한 훅
-   **useLocalSearchParams**: 파라미터 받기
-   **usePathname**: 현재 경로 확인
-   **Stack**: 스택 네비게이션
-   **Tabs**: 탭 네비게이션
-   파일 구조가 라우트 구조가 됨
