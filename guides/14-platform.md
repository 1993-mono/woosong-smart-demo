# 14. 플랫폼별 처리 (Platform API)

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   `Platform` API를 사용한 플랫폼 감지
-   iOS와 Android 차이점 처리
-   플랫폼별 스타일 적용
-   플랫폼별 컴포넌트 사용
-   OS 버전 확인 및 처리

## 📱 Platform API

**Platform**은 현재 실행 중인 플랫폼을 감지하고 플랫폼별 코드를 작성할 수 있게 해주는 API입니다.

### 기본 사용법

```javascript
import { Platform } from "react-native";

// 플랫폼 확인
if (Platform.OS === "ios") {
    console.log("iOS에서 실행 중");
} else if (Platform.OS === "android") {
    console.log("Android에서 실행 중");
}

// 플랫폼별 값 선택
const padding = Platform.OS === "ios" ? 20 : 10;
```

## 🔑 Platform.OS

현재 실행 중인 플랫폼을 반환합니다.

```javascript
import { Platform } from "react-native";

console.log(Platform.OS); // "ios" 또는 "android"
```

### 플랫폼별 분기 처리

```javascript
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: Platform.OS === "ios" ? 20 : 10,
        backgroundColor: Platform.OS === "ios" ? "#f0f0f0" : "#fff",
    },
});
```

## 📝 Platform.select()

플랫폼별로 다른 값을 선택할 수 있습니다.

```javascript
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        padding: Platform.select({
            ios: 20,
            android: 10,
            default: 15, // 웹 등 기타 플랫폼
        }),
    },
});
```

### 객체 선택

```javascript
const styles = StyleSheet.create({
    text: Platform.select({
        ios: {
            fontSize: 16,
            fontFamily: "System",
        },
        android: {
            fontSize: 14,
            fontFamily: "Roboto",
        },
    }),
});
```

## 💡 실전 예제

### 플랫폼별 스타일

```javascript
import { Platform, StyleSheet, View, Text } from "react-native";

function PlatformSpecificView() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {Platform.OS === "ios" ? "iOS" : "Android"}에서 실행 중
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Platform.select({
            ios: "#f0f0f0",
            android: "#fff",
        }),
        padding: Platform.select({
            ios: 20,
            android: 10,
        }),
    },
    text: {
        fontSize: Platform.select({
            ios: 18,
            android: 16,
        }),
        fontWeight: Platform.OS === "ios" ? "600" : "normal",
    },
});
```

### 플랫폼별 컴포넌트

```javascript
import { Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";

// iOS는 Picker를 다르게 처리해야 할 수 있음
function CustomPicker({ items, selectedValue, onValueChange }) {
    if (Platform.OS === "ios") {
        // iOS 전용 Picker 구현
        return (
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={styles.iosPicker}
            >
                {items.map((item) => (
                    <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </Picker>
        );
    } else {
        // Android 전용 Picker 구현
        return (
            <Picker
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                style={styles.androidPicker}
            >
                {items.map((item) => (
                    <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </Picker>
        );
    }
}
```

### 플랫폼별 그림자 처리

```javascript
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        // iOS 그림자
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            // Android 그림자
            android: {
                elevation: 4,
            },
        }),
    },
});
```

### 플랫폼별 폰트

```javascript
import { Platform, StyleSheet, Text } from "react-native";

function PlatformText({ children, style }) {
    return (
        <Text
            style={[
                styles.text,
                style,
                Platform.select({
                    ios: { fontFamily: "System" },
                    android: { fontFamily: "Roboto" },
                }),
            ]}
        >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
    },
});
```

### 플랫폼별 SafeArea 처리

```javascript
import { Platform, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function SafeAreaView({ children }) {
    const insets = useSafeAreaInsets();

    return (
        <View
            style={[
                styles.container,
                {
                    paddingTop: Platform.select({
                        ios: insets.top,
                        android: 0,
                    }),
                    paddingBottom: Platform.select({
                        ios: insets.bottom,
                        android: 0,
                    }),
                },
            ]}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
```

## 🔢 Platform.Version

플랫폼 버전을 확인할 수 있습니다.

```javascript
import { Platform } from "react-native";

console.log(Platform.OS); // "ios" 또는 "android"
console.log(Platform.Version); // iOS: "15.0", Android: 30 (API level)

// iOS 버전별 처리
if (Platform.OS === "ios") {
    const majorVersion = parseInt(Platform.Version.split(".")[0]);
    if (majorVersion >= 15) {
        console.log("iOS 15 이상");
    }
}

// Android API 레벨별 처리
if (Platform.OS === "android") {
    if (Platform.Version >= 30) {
        console.log("Android 11 (API 30) 이상");
    }
}
```

### 버전별 기능 분기

```javascript
import { Platform } from "react-native";

function useFeature() {
    if (Platform.OS === "ios") {
        const majorVersion = parseInt(Platform.Version.split(".")[0]);
        return majorVersion >= 14; // iOS 14 이상에서만 사용 가능
    } else {
        return Platform.Version >= 29; // Android 10 (API 29) 이상
    }
}
```

## 🎨 플랫폼별 디자인 패턴

### iOS 스타일

```javascript
import { Platform, StyleSheet } from "react-native";

const iosStyles = StyleSheet.create({
    button: {
        backgroundColor: "#007AFF",
        borderRadius: 8,
        padding: 12,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});
```

### Android 스타일

```javascript
const androidStyles = StyleSheet.create({
    button: {
        backgroundColor: "#6200EE",
        borderRadius: 4,
        padding: 12,
        elevation: 2,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 4,
        elevation: 2,
    },
});
```

### 통합 스타일

```javascript
const styles = StyleSheet.create({
    button: Platform.select({
        ios: iosStyles.button,
        android: androidStyles.button,
    }),
    card: Platform.select({
        ios: iosStyles.card,
        android: androidStyles.card,
    }),
});
```

## 🔧 플랫폼별 유틸리티 함수

```javascript
// utils/platform.js
import { Platform } from "react-native";

export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";

export const platformSelect = Platform.select;

export const getPlatformValue = (iosValue, androidValue) => {
    return Platform.select({
        ios: iosValue,
        android: androidValue,
    });
};

export const isIOSVersion = (version) => {
    if (!isIOS) return false;
    const majorVersion = parseInt(Platform.Version.split(".")[0]);
    return majorVersion >= version;
};

export const isAndroidVersion = (apiLevel) => {
    if (!isAndroid) return false;
    return Platform.Version >= apiLevel;
};

// 사용 예시
import { isIOS, getPlatformValue } from "./utils/platform";

const padding = getPlatformValue(20, 10);
const fontSize = isIOS ? 18 : 16;
```

## 📱 플랫폼별 컴포넌트 예제

### 플랫폼별 버튼

```javascript
import {
    Platform,
    TouchableOpacity,
    TouchableNativeFeedback,
    Text,
    StyleSheet,
} from "react-native";

function PlatformButton({ title, onPress }) {
    if (Platform.OS === "android") {
        return (
            <TouchableNativeFeedback onPress={onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{title}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Platform.select({
            ios: "#007AFF",
            android: "#6200EE",
        }),
        padding: 15,
        borderRadius: Platform.select({
            ios: 8,
            android: 4,
        }),
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

## ⚠️ 주의사항

### 플랫폼별 차이점

1. **그림자**: iOS는 `shadow*` 속성, Android는 `elevation` 사용
2. **SafeArea**: iOS는 노치/홈 인디케이터 고려 필요
3. **폰트**: iOS는 System 폰트, Android는 Roboto 기본
4. **터치 피드백**: Android는 `TouchableNativeFeedback` 사용 가능
5. **백 버튼**: Android는 하드웨어 백 버튼 존재

### 테스트

-   iOS와 Android 모두에서 테스트해야 합니다
-   시뮬레이터/에뮬레이터와 실제 기기에서 모두 테스트
-   다양한 OS 버전에서 테스트

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. Platform API로 플랫폼 감지하기
2. 플랫폼별 스타일 적용하기
3. 플랫폼별 컴포넌트 구현하기
4. OS 버전 확인 및 처리하기
5. 플랫폼별 유틸리티 함수 만들기

## 📝 정리

-   **Platform.OS**: 현재 플랫폼 확인 ("ios" 또는 "android")
-   **Platform.select()**: 플랫폼별 값 선택
-   **Platform.Version**: 플랫폼 버전 확인
-   iOS와 Android는 디자인 가이드라인이 다름
-   그림자, 폰트, SafeArea 등 플랫폼별 차이 고려 필요
-   두 플랫폼 모두에서 테스트 필수
