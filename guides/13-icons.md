# 13. 아이콘과 벡터 그래픽

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   `@expo/vector-icons` 사용법
-   다양한 아이콘 패밀리 활용
-   아이콘 스타일링 및 크기 조정
-   아이콘 버튼 구현
-   커스텀 아이콘 사용

## 🎨 @expo/vector-icons

**@expo/vector-icons**는 Expo에서 제공하는 아이콘 라이브러리입니다. 여러 아이콘 패밀리를 포함하고 있습니다.

### 포함된 아이콘 패밀리

-   **Ionicons**: iOS 스타일 아이콘 (가장 많이 사용)
-   **MaterialIcons**: Material Design 아이콘
-   **FontAwesome**: Font Awesome 아이콘
-   **Feather**: 미니멀한 선 스타일 아이콘
-   **AntDesign**: Ant Design 아이콘
-   **Entypo**: 다양한 스타일 아이콘
-   **MaterialCommunityIcons**: Material Community 아이콘
-   **FontAwesome5**: Font Awesome 5 아이콘

### 설치

Expo 프로젝트에는 기본적으로 포함되어 있습니다. 별도 설치가 필요 없습니다.

## 🔑 기본 사용법

### Ionicons 사용

```javascript
import { Ionicons } from "@expo/vector-icons";

function MyComponent() {
    return <Ionicons name="home" size={24} color="#06c" />;
}
```

### 다른 아이콘 패밀리 사용

```javascript
import { MaterialIcons, FontAwesome, Feather } from "@expo/vector-icons";

function IconExamples() {
    return (
        <View>
            <MaterialIcons name="favorite" size={24} color="#ff0000" />
            <FontAwesome name="star" size={24} color="#ffd700" />
            <Feather name="heart" size={24} color="#ff0000" />
        </View>
    );
}
```

## 📝 주요 속성

### name

아이콘 이름을 지정합니다. 각 아이콘 패밀리마다 다른 이름을 사용합니다.

```javascript
<Ionicons name="home" />
<Ionicons name="home-outline" /> // 아웃라인 버전
```

### size

아이콘 크기를 지정합니다 (픽셀 단위).

```javascript
<Ionicons name="star" size={16} />  // 작은 아이콘
<Ionicons name="star" size={24} />  // 기본 크기
<Ionicons name="star" size={48} />  // 큰 아이콘
```

### color

아이콘 색상을 지정합니다.

```javascript
<Ionicons name="heart" color="#ff0000" />
<Ionicons name="heart" color="blue" />
<Ionicons name="heart" color="rgba(255, 0, 0, 0.5)" />
```

## 💡 실전 예제

### 기본 아이콘 사용

```javascript
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconExample() {
    return (
        <View style={styles.container}>
            <Ionicons name="home" size={24} color="#06c" />
            <Ionicons name="heart" size={24} color="#ff0000" />
            <Ionicons name="star" size={24} color="#ffd700" />
            <Ionicons name="settings" size={24} color="#666" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
    },
});
```

### 아이콘 버튼

```javascript
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, label, onPress, color = "#06c" }) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Ionicons name={icon} size={24} color={color} />
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

function IconButtonExample() {
    return (
        <View style={styles.container}>
            <IconButton
                icon="heart"
                label="좋아요"
                onPress={() => console.log("좋아요")}
                color="#ff0000"
            />
            <IconButton
                icon="share"
                label="공유"
                onPress={() => console.log("공유")}
            />
            <IconButton
                icon="bookmark"
                label="저장"
                onPress={() => console.log("저장")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
    },
    button: {
        alignItems: "center",
        padding: 10,
    },
    label: {
        marginTop: 5,
        fontSize: 12,
        color: "#666",
    },
});
```

### 아이콘과 텍스트 조합

```javascript
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconText({ icon, text, iconColor = "#06c" }) {
    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={20} color={iconColor} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

function IconTextExample() {
    return (
        <View style={styles.wrapper}>
            <IconText icon="location" text="서울시 강남구" />
            <IconText icon="call" text="010-1234-5678" />
            <IconText icon="mail" text="example@email.com" />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 20,
    },
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
    },
    text: {
        marginLeft: 10,
        fontSize: 16,
    },
});
```

### 아이콘 리스트

```javascript
import { FlatList, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const menuItems = [
    { id: "1", icon: "home", label: "홈", color: "#06c" },
    { id: "2", icon: "person", label: "프로필", color: "#06c" },
    { id: "3", icon: "settings", label: "설정", color: "#666" },
    { id: "4", icon: "help-circle", label: "도움말", color: "#666" },
];

function IconList() {
    return (
        <FlatList
            data={menuItems}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Ionicons name={item.icon} size={24} color={item.color} />
                    <Text style={styles.label}>{item.label}</Text>
                    <Ionicons name="chevron-forward" size={20} color="#ccc" />
                </View>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    label: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
    },
});
```

### 상태에 따른 아이콘 변경

```javascript
import { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function FavoriteButton() {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={() => setIsFavorite(!isFavorite)}
        >
            <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color={isFavorite ? "#ff0000" : "#666"}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
    },
});
```

### 아이콘 배지

```javascript
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconWithBadge({ icon, badgeCount }) {
    return (
        <View style={styles.container}>
            <Ionicons name={icon} size={24} color="#06c" />
            {badgeCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        {badgeCount > 99 ? "99+" : badgeCount}
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: -8,
        right: -8,
        backgroundColor: "#ff0000",
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 4,
    },
    badgeText: {
        color: "#fff",
        fontSize: 10,
        fontWeight: "bold",
    },
});
```

## 🎨 다양한 아이콘 패밀리 예제

### MaterialIcons

```javascript
import { MaterialIcons } from "@expo/vector-icons";

<MaterialIcons name="favorite" size={24} color="#ff0000" />
<MaterialIcons name="home" size={24} color="#06c" />
<MaterialIcons name="search" size={24} color="#666" />
```

### FontAwesome

```javascript
import { FontAwesome } from "@expo/vector-icons";

<FontAwesome name="star" size={24} color="#ffd700" />
<FontAwesome name="user" size={24} color="#06c" />
<FontAwesome name="bell" size={24} color="#666" />
```

### Feather

```javascript
import { Feather } from "@expo/vector-icons";

<Feather name="heart" size={24} color="#ff0000" />
<Feather name="home" size={24} color="#06c" />
<Feather name="settings" size={24} color="#666" />
```

### AntDesign

```javascript
import { AntDesign } from "@expo/vector-icons";

<AntDesign name="heart" size={24} color="#ff0000" />
<AntDesign name="home" size={24} color="#06c" />
<AntDesign name="setting" size={24} color="#666" />
```

## 🔍 아이콘 검색

아이콘 이름을 찾는 방법:

1. **공식 문서**: 각 아이콘 패밀리의 공식 웹사이트에서 검색
2. **Ionicons**: https://ionic.io/ionicons
3. **Material Icons**: https://fonts.google.com/icons
4. **Font Awesome**: https://fontawesome.com/icons

## 🎯 실용적인 패턴

### 네비게이션 아이콘

```javascript
import { Ionicons } from "@expo/vector-icons";

const navigationIcons = {
    home: "home",
    profile: "person",
    settings: "settings",
    search: "search",
    notifications: "notifications",
};
```

### 액션 아이콘

```javascript
const actionIcons = {
    like: "heart",
    share: "share",
    bookmark: "bookmark",
    comment: "chatbubble",
    delete: "trash",
};
```

### 상태 아이콘

```javascript
const statusIcons = {
    success: "checkmark-circle",
    error: "close-circle",
    warning: "warning",
    info: "information-circle",
};
```

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. 다양한 아이콘 패밀리 사용하기
2. 아이콘 버튼 구현하기
3. 아이콘과 텍스트 조합하기
4. 상태에 따른 아이콘 변경하기
5. 아이콘 배지 구현하기

## 📝 정리

-   **@expo/vector-icons**: Expo에서 제공하는 아이콘 라이브러리
-   **Ionicons**: 가장 많이 사용되는 아이콘 패밀리
-   **name**: 아이콘 이름 지정
-   **size**: 아이콘 크기 조정
-   **color**: 아이콘 색상 지정
-   여러 아이콘 패밀리 중 선택하여 사용 가능
-   아이콘은 벡터 그래픽이므로 크기 조정 시 깨지지 않음
