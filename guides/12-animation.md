# 12. 애니메이션 (Animated API)

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   React Native의 `Animated` API 사용법
-   기본 애니메이션 구현 (페이드, 슬라이드, 스케일)
-   인터랙티브 애니메이션 구현
-   애니메이션 시퀀스 및 병렬 실행
-   성능 최적화 팁

## 🎬 Animated API란?

**Animated**는 React Native에서 제공하는 고성능 애니메이션 라이브러리입니다. 네이티브 드라이버를 사용하여 부드러운 애니메이션을 구현할 수 있습니다.

### 특징

-   네이티브 드라이버 지원으로 높은 성능
-   JavaScript 스레드와 독립적으로 실행
-   다양한 애니메이션 타입 지원
-   인터랙티브 제스처 애니메이션 지원

### 기본 구조

```javascript
import { Animated } from "react-native";

const fadeAnim = new Animated.Value(0); // 초기값 0

Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true, // 네이티브 드라이버 사용
}).start();
```

## 🔑 Animated.Value

애니메이션 값을 관리하는 기본 단위입니다.

```javascript
import { useRef } from "react";
import { Animated } from "react-native";

function MyComponent() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    // 초기값 0으로 시작

    return (
        <Animated.View style={{ opacity: fadeAnim }}>
            {/* 내용 */}
        </Animated.View>
    );
}
```

## 🎯 기본 애니메이션

### 페이드 인/아웃

```javascript
import { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

function FadeInView() {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <Text>페이드 인 애니메이션</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
```

### 슬라이드 애니메이션

```javascript
import { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

function SlideInView() {
    const slideAnim = useRef(new Animated.Value(-100)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ translateY: slideAnim }],
                },
            ]}
        >
            <Text>슬라이드 애니메이션</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
});
```

### 스케일 애니메이션

```javascript
import { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

function ScaleView() {
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        >
            <Text>스케일 애니메이션</Text>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 100,
        height: 100,
        backgroundColor: "#06c",
        justifyContent: "center",
        alignItems: "center",
    },
});
```

## 🔄 애니메이션 타입

### timing

일정한 속도로 애니메이션을 실행합니다.

```javascript
Animated.timing(animatedValue, {
    toValue: 1,
    duration: 1000, // 밀리초
    easing: Easing.linear, // 이징 함수
    useNativeDriver: true,
}).start();
```

### spring

스프링 효과로 애니메이션을 실행합니다.

```javascript
Animated.spring(animatedValue, {
    toValue: 1,
    friction: 7, // 마찰 (낮을수록 더 많이 튕김)
    tension: 40, // 장력 (높을수록 빠름)
    useNativeDriver: true,
}).start();
```

### decay

감쇠 효과로 애니메이션을 실행합니다.

```javascript
Animated.decay(animatedValue, {
    velocity: 0.5, // 초기 속도
    deceleration: 0.997, // 감쇠율
    useNativeDriver: true,
}).start();
```

## 💡 실전 예제

### 버튼 클릭 애니메이션

```javascript
import { useRef } from "react";
import { TouchableOpacity, Animated, Text, StyleSheet } from "react-native";

function AnimatedButton() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
        >
            <Animated.View
                style={[
                    styles.button,
                    {
                        transform: [{ scale: scaleAnim }],
                    },
                ]}
            >
                <Text style={styles.buttonText}>버튼</Text>
            </Animated.View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

### 로딩 스피너

```javascript
import { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

function LoadingSpinner() {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const rotate = Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            })
        );
        rotate.start();

        return () => rotate.stop();
    }, []);

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.spinner,
                    {
                        transform: [{ rotate }],
                    },
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    spinner: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: "#06c",
        borderTopColor: "transparent",
    },
});
```

### 펄스 애니메이션

```javascript
import { useRef, useEffect } from "react";
import { View, Animated, StyleSheet } from "react-native";

function PulseView() {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
            ])
        );
        pulse.start();

        return () => pulse.stop();
    }, []);

    return (
        <Animated.View
            style={[
                styles.pulse,
                {
                    transform: [{ scale: scaleAnim }],
                },
            ]}
        />
    );
}

const styles = StyleSheet.create({
    pulse: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#06c",
    },
});
```

### 슬라이드 토글

```javascript
import { useState, useRef } from "react";
import {
    View,
    TouchableOpacity,
    Animated,
    Text,
    StyleSheet,
} from "react-native";

function SlideToggle() {
    const [isOn, setIsOn] = useState(false);
    const slideAnim = useRef(new Animated.Value(0)).current;

    const toggle = () => {
        const toValue = isOn ? 0 : 1;
        setIsOn(!isOn);

        Animated.spring(slideAnim, {
            toValue,
            useNativeDriver: true,
        }).start();
    };

    const translateX = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 20], // 슬라이더 너비에 맞게 조정
    });

    return (
        <TouchableOpacity
            style={[styles.toggle, isOn && styles.toggleOn]}
            onPress={toggle}
        >
            <Animated.View
                style={[
                    styles.slider,
                    {
                        transform: [{ translateX }],
                    },
                ]}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    toggle: {
        width: 50,
        height: 30,
        borderRadius: 15,
        backgroundColor: "#ccc",
        justifyContent: "center",
        padding: 2,
    },
    toggleOn: {
        backgroundColor: "#06c",
    },
    slider: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: "#fff",
    },
});
```

## 🔀 애니메이션 조합

### sequence (순차 실행)

```javascript
Animated.sequence([
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    }),
]).start();
```

### parallel (병렬 실행)

```javascript
Animated.parallel([
    Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }),
    Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
    }),
]).start();
```

### stagger (지연 실행)

```javascript
Animated.stagger(100, [
    Animated.timing(anim1, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }),
    Animated.timing(anim2, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }),
    Animated.timing(anim3, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }),
]).start();
```

## 🎯 인터랙티브 애니메이션

### PanResponder와 함께 사용

```javascript
import { useRef } from "react";
import { Animated, PanResponder, View, StyleSheet } from "react-native";

function DraggableBox() {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                });
            },
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                pan.flattenOffset();
            },
        })
    ).current;

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [
                            { translateX: pan.x },
                            { translateY: pan.y },
                        ],
                    },
                ]}
                {...panResponder.panHandlers}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: "#06c",
        borderRadius: 10,
    },
});
```

## 📊 interpolate

값의 범위를 다른 범위로 변환합니다.

```javascript
const animatedValue = useRef(new Animated.Value(0)).current;

const opacity = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
});

const rotate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
});

const scale = animatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1],
});
```

## ⚡ 성능 최적화

### useNativeDriver

가능한 한 `useNativeDriver: true`를 사용하세요.

```javascript
// ✅ 좋음 - 네이티브 드라이버 사용 가능
Animated.timing(opacityAnim, {
    toValue: 1,
    useNativeDriver: true, // opacity, transform 등
}).start();

// ❌ 나쁨 - 네이티브 드라이버 사용 불가
Animated.timing(widthAnim, {
    toValue: 100,
    useNativeDriver: false, // width, height 등 레이아웃 속성
}).start();
```

### 네이티브 드라이버 사용 가능한 속성

-   `transform` (translateX, translateY, scale, rotate 등)
-   `opacity`
-   `backgroundColor` (일부 플랫폼)

### 네이티브 드라이버 사용 불가능한 속성

-   `width`, `height`
-   `top`, `left`, `right`, `bottom`
-   `margin`, `padding`

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. 페이드 인/아웃 애니메이션 구현하기
2. 슬라이드 애니메이션 구현하기
3. 스케일 애니메이션 구현하기
4. 애니메이션 시퀀스 및 병렬 실행하기
5. 인터랙티브 애니메이션 구현하기

## 📝 정리

-   **Animated.Value**: 애니메이션 값 관리
-   **Animated.timing**: 일정한 속도 애니메이션
-   **Animated.spring**: 스프링 효과 애니메이션
-   **Animated.sequence**: 순차 실행
-   **Animated.parallel**: 병렬 실행
-   **interpolate**: 값 범위 변환
-   **useNativeDriver**: 성능 최적화 필수
