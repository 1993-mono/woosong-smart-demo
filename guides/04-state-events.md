# 04. 상태 관리와 이벤트 처리

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   React의 useState Hook을 사용한 상태 관리
-   TouchableOpacity와 Pressable을 사용한 버튼 구현
-   이벤트 핸들러 작성 방법
-   상태에 따른 UI 업데이트

## 🔄 상태 관리 (State)

React Native에서는 **상태(State)**를 사용하여 컴포넌트의 데이터를 관리하고, 상태가 변경되면 화면이 자동으로 업데이트됩니다.

### useState Hook

`useState`는 React의 Hook 중 하나로, 컴포넌트의 상태를 관리합니다.

### 기본 사용법

```javascript
import { useState } from "react";
import { View, Text } from "react-native";

function Counter() {
    const [count, setCount] = useState(0); // 초기값 0

    return (
        <View>
            <Text>카운트: {count}</Text>
        </View>
    );
}
```

### useState 구조

```javascript
const [상태변수, 상태변경함수] = useState(초기값);
```

-   **상태변수**: 현재 상태 값
-   **상태변경함수**: 상태를 변경하는 함수 (보통 `set` 접두사 사용)
-   **초기값**: 상태의 초기 값

### 상태 변경하기

```javascript
const [count, setCount] = useState(0);

// 상태 변경
setCount(count + 1); // 직접 값 설정
setCount((prev) => prev + 1); // 이전 값 기반으로 변경
```

## 🎯 이벤트 처리

React Native에서는 사용자의 터치, 클릭 등의 이벤트를 처리하기 위한 여러 컴포넌트를 제공합니다.

### TouchableOpacity

**TouchableOpacity**는 터치 시 투명도가 변하는 버튼 컴포넌트입니다.

#### 특징

-   터치 시 자동으로 투명도 변경 (시각적 피드백)
-   `onPress` 이벤트로 클릭 처리
-   간단한 버튼 구현에 적합

#### 기본 사용법

```javascript
import { TouchableOpacity, Text } from "react-native";

function Button() {
    const handlePress = () => {
        console.log("버튼이 눌렸습니다!");
    };

    return (
        <TouchableOpacity onPress={handlePress}>
            <Text>버튼</Text>
        </TouchableOpacity>
    );
}
```

#### 주요 속성

-   `onPress`: 터치 시 실행할 함수
-   `onPressIn`: 터치 시작 시 실행
-   `onPressOut`: 터치 종료 시 실행
-   `activeOpacity`: 터치 시 투명도 (0.0 ~ 1.0, 기본값 0.2)
-   `disabled`: 비활성화 여부

### Pressable

**Pressable**은 더 세밀한 터치 이벤트를 제어할 수 있는 컴포넌트입니다.

#### 특징

-   더 많은 터치 이벤트 제어 가능
-   플랫폼별 커스터마이징 가능
-   최신 React Native에서 권장

#### 기본 사용법

```javascript
import { Pressable, Text } from "react-native";

function Button() {
    return (
        <Pressable
            onPress={() => console.log("눌렸습니다!")}
            style={({ pressed }) => [
                {
                    opacity: pressed ? 0.5 : 1,
                },
            ]}
        >
            <Text>버튼</Text>
        </Pressable>
    );
}
```

#### 주요 속성

-   `onPress`: 터치 시 실행할 함수
-   `onPressIn`: 터치 시작 시 실행
-   `onPressOut`: 터치 종료 시 실행
-   `onLongPress`: 길게 누를 때 실행
-   `style`: 함수로 받아 동적 스타일 적용 가능

## 💡 실전 예제

### 카운터 앱

```javascript
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    const decrement = () => {
        setCount(count - 1);
    };

    const reset = () => {
        setCount(0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.count}>{count}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={decrement}>
                    <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={reset}>
                    <Text style={styles.buttonText}>리셋</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={increment}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    count: {
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
    },
    button: {
        backgroundColor: "#06c",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
    },
});
```

### 토글 버튼

```javascript
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function ToggleButton() {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(!isOn);
    };

    return (
        <TouchableOpacity
            style={[styles.toggle, isOn && styles.toggleOn]}
            onPress={toggle}
        >
            <Text style={styles.toggleText}>{isOn ? "켜짐" : "꺼짐"}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toggle: {
        backgroundColor: "#ccc",
        padding: 15,
        borderRadius: 5,
    },
    toggleOn: {
        backgroundColor: "#06c",
    },
    toggleText: {
        color: "#fff",
        fontWeight: "bold",
    },
});
```

### 버튼 비활성화

```javascript
import { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

function SubmitButton() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = () => {
        setIsSubmitting(true);
        // API 호출 등 작업 수행
        setTimeout(() => {
            setIsSubmitting(false);
        }, 2000);
    };

    return (
        <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
        >
            <Text style={styles.buttonText}>
                {isSubmitting ? "제출 중..." : "제출"}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
    },
    buttonDisabled: {
        backgroundColor: "#ccc",
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
});
```

## 🎨 버튼 스타일링

### 기본 버튼 스타일

```javascript
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#06c",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

### 활성/비활성 상태

```javascript
<TouchableOpacity
    style={[
        styles.button,
        isActive && styles.buttonActive,
        isDisabled && styles.buttonDisabled,
    ]}
    disabled={isDisabled}
    onPress={handlePress}
>
    <Text style={styles.buttonText}>버튼</Text>
</TouchableOpacity>
```

## 📝 이벤트 핸들러 작성 팁

### 1. 함수 선언 방식

```javascript
// 화살표 함수 (권장)
const handlePress = () => {
  console.log('눌렸습니다');
};

// 일반 함수
function handlePress() {
  console.log('눌렸습니다');
}

// 인라인 함수 (간단한 경우만)
<TouchableOpacity onPress={() => console.log('눌렸습니다')}>
```

### 2. 매개변수 전달

```javascript
const handleItemPress = (itemId) => {
    console.log("아이템 ID:", itemId);
};

<TouchableOpacity onPress={() => handleItemPress(123)}>
    <Text>아이템</Text>
</TouchableOpacity>;
```

### 3. 여러 이벤트 처리

```javascript
<TouchableOpacity
    onPress={() => console.log("터치")}
    onPressIn={() => console.log("터치 시작")}
    onPressOut={() => console.log("터치 종료")}
    onLongPress={() => console.log("길게 누름")}
>
    <Text>버튼</Text>
</TouchableOpacity>
```

## 🎯 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. useState를 사용한 상태 관리
2. TouchableOpacity로 버튼 만들기
3. 상태에 따른 UI 업데이트
4. 다양한 이벤트 처리

## 📝 정리

-   **useState**: 컴포넌트의 상태를 관리하는 Hook
-   **TouchableOpacity**: 터치 시 투명도가 변하는 버튼 컴포넌트
-   **Pressable**: 더 세밀한 터치 이벤트 제어가 가능한 컴포넌트
-   **onPress**: 버튼 클릭 시 실행할 함수
-   상태가 변경되면 컴포넌트가 자동으로 다시 렌더링됨
