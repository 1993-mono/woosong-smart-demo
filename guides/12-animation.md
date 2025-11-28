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
            activeOpacity={1} // 터치 시 적용되는 투명도 기본값
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

### PanResponder란?

**PanResponder**는 React Native에서 제공하는 제스처 처리 시스템입니다. 터치 이벤트를 감지하고 처리하여 드래그, 스와이프 등의 인터랙티브 애니메이션을 구현할 수 있습니다.

#### 특징

-   터치 이벤트를 JavaScript 레벨에서 처리
-   드래그, 스와이프, 핀치 등 다양한 제스처 지원
-   여러 터치 포인트 동시 처리 가능
-   제스처 충돌 해결 및 우선순위 관리

#### 주요 핸들러

1. **onMoveShouldSetPanResponder**: 터치 이동 시 PanResponder를 활성화할지 결정
2. **onPanResponderGrant**: 터치가 시작될 때 호출 (터치 승인)
3. **onPanResponderMove**: 터치가 이동하는 동안 호출
4. **onPanResponderRelease**: 터치가 끝날 때 호출
5. **onPanResponderTerminate**: 다른 제스처에 의해 취소될 때 호출

#### setOffset과 flattenOffset

-   **setOffset()**: 현재 위치를 기준점으로 설정하여 상대적 이동을 가능하게 함
-   **flattenOffset()**: offset을 실제 값에 합산하고 offset을 0으로 리셋

#### 주의사항

-   PanResponder는 `useNativeDriver: false`를 사용해야 합니다
-   레이아웃 속성(width, height 등)을 애니메이션할 때도 `useNativeDriver: false` 필요
-   성능을 위해 가능한 한 transform 속성만 사용하는 것이 좋습니다

### PanResponder와 함께 사용

```javascript
import { useRef } from "react";
import { Animated, PanResponder, View, StyleSheet } from "react-native";

function DraggableBox() {
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            // 터치 이동 시 PanResponder 활성화 여부 결정
            onMoveShouldSetPanResponder: () => true,

            // 터치가 시작될 때 호출 (현재 위치를 기준점으로 설정)
            onPanResponderGrant: () => {
                pan.setOffset({
                    x: pan.x._value,
                    y: pan.y._value,
                });
            },

            // 터치가 이동하는 동안 호출 (dx, dy는 이동 거리)
            onPanResponderMove: Animated.event(
                [null, { dx: pan.x, dy: pan.y }],
                { useNativeDriver: false } // PanResponder는 false 사용
            ),

            // 터치가 끝날 때 호출 (offset을 실제 값에 합산)
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
```

#### `{...panResponder.panHandlers}` 설명

`{...panResponder.panHandlers}`는 **스프레드 연산자(spread operator)**를 사용하여 PanResponder가 생성한 모든 이벤트 핸들러를 컴포넌트에 전개하여 적용합니다.

**panHandlers가 포함하는 핸들러들:**

-   `onStartShouldSetResponder`: 터치 시작 시 응답할지 결정
-   `onMoveShouldSetResponder`: 터치 이동 시 응답할지 결정
-   `onResponderGrant`: 터치가 승인될 때 호출
-   `onResponderMove`: 터치가 이동하는 동안 호출
-   `onResponderRelease`: 터치가 끝날 때 호출
-   `onResponderTerminate`: 다른 제스처에 의해 취소될 때 호출

**사용 이유:**

-   여러 핸들러를 한 번에 적용할 수 있음
-   코드가 간결해짐
-   PanResponder가 자동으로 필요한 모든 핸들러를 생성

**동일한 효과 (전개 연산자 없이):**

```javascript
<Animated.View
    onStartShouldSetResponder={
        panResponder.panHandlers.onStartShouldSetResponder
    }
    onMoveShouldSetResponder={panResponder.panHandlers.onMoveShouldSetResponder}
    onResponderGrant={panResponder.panHandlers.onResponderGrant}
    onResponderMove={panResponder.panHandlers.onResponderMove}
    onResponderRelease={panResponder.panHandlers.onResponderRelease}
    // ... 등등
/>
```

**스프레드 연산자 사용:**

```javascript
{...panResponder.panHandlers}  // 모든 핸들러를 한 번에 적용
```

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

````

### PanResponder 활용 예시

#### 스와이프 감지

```javascript
const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
        // 수평 이동이 수직 이동보다 클 때만 활성화
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
        // 오른쪽으로 스와이프 (dx > 50)
        if (gestureState.dx > 50) {
            console.log("오른쪽 스와이프");
        }
        // 왼쪽으로 스와이프 (dx < -50)
        else if (gestureState.dx < -50) {
            console.log("왼쪽 스와이프");
        }
    },
});
````

#### 제스처 속도 감지

```javascript
onPanResponderRelease: (evt, gestureState) => {
    // 속도 계산 (vx, vy는 초당 픽셀 단위)
    const velocity = Math.sqrt(
        gestureState.vx * gestureState.vx + gestureState.vy * gestureState.vy
    );

    if (velocity > 0.5) {
        // 빠른 스와이프 처리
        console.log("빠른 제스처");
    }
},
```

#### 경계 제한

```javascript
// 컨테이너 레이아웃 상태 관리
const containerRef = useRef(null);
const [containerLayout, setContainerLayout] = useState({ width: 0, height: 0 });

const panResponder = PanResponder.create({
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
        listener: (evt, gestureState) => {
            // 경계 제한: 박스가 컨테이너 밖으로 나가지 않도록
            const maxX = containerLayout.width - BOX_SIZE;
            const maxY = containerLayout.height - BOX_SIZE;

            // 현재 위치 계산 (offset + dx)
            const currentX = pan.x._value + gestureState.dx;
            const currentY = pan.y._value + gestureState.dy;

            // 경계 체크 및 제한
            const clampedX = Math.max(0, Math.min(currentX, maxX));
            const clampedY = Math.max(0, Math.min(currentY, maxY));

            // 경계를 벗어나면 값 제한
            if (currentX !== clampedX || currentY !== clampedY) {
                pan.x.setValue(clampedX);
                pan.y.setValue(clampedY);
            }
        },
    }),
});

// 컨테이너에 레이아웃 측정
<View
    ref={containerRef}
    onLayout={(event) => {
        const { width, height } = event.nativeEvent.layout;
        setContainerLayout({ width, height });
    }}
>
    <Animated.View {...panResponder.panHandlers} />
</View>;
```

**핵심 포인트:**

-   `onLayout`: 컨테이너의 실제 크기를 측정
-   `Math.max(0, ...)`: 최소값을 0으로 제한 (왼쪽/위 경계)
-   `Math.min(..., maxX)`: 최대값을 컨테이너 크기로 제한 (오른쪽/아래 경계)
-   `clampedX`, `clampedY`: 경계 내로 제한된 값

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
