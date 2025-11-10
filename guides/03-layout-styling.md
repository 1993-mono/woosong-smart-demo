# 03. 레이아웃과 스타일링

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   Flexbox 레이아웃의 기본 개념과 사용법
-   주요 Flexbox 속성들 (flex, flexDirection, justifyContent, alignItems)
-   스타일링 심화 (padding, margin, borderRadius, 그림자)
-   반응형 레이아웃 구현 방법

## 📐 Flexbox 레이아웃

React Native는 **Flexbox**를 기본 레이아웃 시스템으로 사용합니다. Flexbox는 유연한 레이아웃을 만들기 위한 강력한 도구입니다.

### Flexbox 기본 개념

Flexbox는 **컨테이너**와 **아이템**으로 구성됩니다:

-   **컨테이너**: `flexDirection`, `justifyContent`, `alignItems` 속성을 가진 부모 요소
-   **아이템**: `flex` 속성을 가진 자식 요소들

### 주요 Flexbox 속성

#### flexDirection

아이템들이 배치되는 방향을 결정합니다.

```javascript
const styles = StyleSheet.create({
    container: {
        flexDirection: "row", // 가로 배치 (기본값: 'column' - 세로 배치)
    },
});
```

**값:**

-   `'row'`: 가로 배치 (왼쪽 → 오른쪽)
-   `'column'`: 세로 배치 (위 → 아래, 기본값)
-   `'row-reverse'`: 가로 역순 배치
-   `'column-reverse'`: 세로 역순 배치

#### justifyContent

**주축(main axis)** 방향으로 아이템들을 정렬합니다.

```javascript
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center", // 주축(가로) 중앙 정렬
    },
});
```

**값:**

-   `'flex-start'`: 시작점 정렬 (기본값)
-   `'flex-end'`: 끝점 정렬
-   `'center'`: 중앙 정렬
-   `'space-between'`: 양 끝 정렬, 중간은 균등 분배
-   `'space-around'`: 균등 분배 (양 끝에도 공간)
-   `'space-evenly'`: 완전 균등 분배

#### alignItems

**교차축(cross axis)** 방향으로 아이템들을 정렬합니다.

```javascript
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center", // 교차축(세로) 중앙 정렬
    },
});
```

**값:**

-   `'flex-start'`: 시작점 정렬
-   `'flex-end'`: 끝점 정렬
-   `'center'`: 중앙 정렬
-   `'stretch'`: 늘려서 채우기 (기본값)
-   `'baseline'`: 텍스트 기준선 정렬

#### flex

아이템이 차지할 공간의 비율을 결정합니다.

```javascript
const styles = StyleSheet.create({
    item1: {
        flex: 1, // 1배 공간 차지
    },
    item2: {
        flex: 2, // 2배 공간 차지 (item1보다 2배 큼)
    },
    item3: {
        flex: 0, // 공간 차지 안 함 (내용 크기만큼만)
    },
});
```

**값:**

-   `0`: 내용 크기만큼만 차지
-   `1 이상`: 사용 가능한 공간을 비율로 나눔
-   `flex: 1`: 남은 공간을 모두 차지

### Flexbox 예시

```javascript
import { View, Text, StyleSheet } from "react-native";

function FlexboxExample() {
    return (
        <View style={styles.container}>
            <View style={styles.item1}>
                <Text>Item 1</Text>
            </View>
            <View style={styles.item2}>
                <Text>Item 2</Text>
            </View>
            <View style={styles.item3}>
                <Text>Item 3</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row", // 가로 배치
        justifyContent: "space-between", // 양 끝 정렬
        alignItems: "center", // 세로 중앙 정렬
        padding: 20,
    },
    item1: {
        flex: 1,
        backgroundColor: "#ff6b6b",
        padding: 10,
    },
    item2: {
        flex: 2,
        backgroundColor: "#4ecdc4",
        padding: 10,
    },
    item3: {
        flex: 1,
        backgroundColor: "#45b7d1",
        padding: 10,
    },
});
```

## 🎨 스타일링 심화

### Padding과 Margin

**Padding**: 요소 내부 여백 (요소와 내용 사이)
**Margin**: 요소 외부 여백 (요소와 다른 요소 사이)

```javascript
const styles = StyleSheet.create({
    container: {
        padding: 20, // 모든 방향 20
        paddingTop: 10, // 위만 10
        paddingHorizontal: 15, // 좌우 15
        paddingVertical: 20, // 위아래 20
        margin: 10, // 모든 방향 10
        marginTop: 5, // 위만 5
        marginHorizontal: 15, // 좌우 15
        marginVertical: 10, // 위아래 10
    },
});
```

### BorderRadius

모서리를 둥글게 만듭니다.

```javascript
const styles = StyleSheet.create({
    card: {
        borderRadius: 10, // 모든 모서리 10
        borderTopLeftRadius: 20, // 왼쪽 위만 20
        borderTopRightRadius: 20, // 오른쪽 위만 20
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30, // width/2 = 원형
    },
});
```

### Border

테두리를 만듭니다.

```javascript
const styles = StyleSheet.create({
    container: {
        borderWidth: 1, // 테두리 두께
        borderColor: "#ccc", // 테두리 색상
        borderStyle: "solid", // 테두리 스타일 (기본값)
    },
    // 특정 방향만 테두리
    leftBorder: {
        borderLeftWidth: 4,
        borderLeftColor: "#06c",
    },
});
```

### 그림자 효과

**Android**: `elevation` 사용
**iOS**: `shadow*` 속성 사용

```javascript
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        // Android 그림자
        elevation: 3,
        // iOS 그림자
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});
```

## 📱 반응형 레이아웃

### Dimensions API

화면 크기를 측정하여 반응형 레이아웃을 만들 수 있습니다.

```javascript
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        width: width * 0.9, // 화면 너비의 90%
        height: height * 0.5, // 화면 높이의 50%
    },
});
```

### 화면 크기에 따른 조건부 스타일

```javascript
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const isTablet = width >= 768;

const styles = StyleSheet.create({
    container: {
        flexDirection: isTablet ? "row" : "column",
        padding: isTablet ? 30 : 20,
    },
});
```

## 🔄 레이아웃 패턴

### 카드 레이아웃

```javascript
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 15,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
});
```

### 그리드 레이아웃

```javascript
const styles = StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap", // 줄바꿈 허용
        justifyContent: "space-between",
    },
    gridItem: {
        width: "48%", // 2열 그리드
        marginBottom: 15,
    },
});
```

### 중앙 정렬 레이아웃

```javascript
const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center", // 세로 중앙
        alignItems: "center", // 가로 중앙
    },
});
```

## 🎯 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. Flexbox로 다양한 레이아웃 구성
2. 카드 그리드 레이아웃 만들기
3. 반응형 레이아웃 구현
4. 복잡한 화면 구성

## 📝 정리

-   **Flexbox**: React Native의 기본 레이아웃 시스템
-   **flexDirection**: 아이템 배치 방향 (row, column)
-   **justifyContent**: 주축 정렬
-   **alignItems**: 교차축 정렬
-   **flex**: 공간 배분 비율
-   **padding/margin**: 여백 처리
-   **borderRadius**: 모서리 둥글게
-   **그림자**: elevation (Android), shadow\* (iOS)
-   **반응형**: Dimensions API 사용

## ➡️ 다음 단계

다음 실습에서는 레이아웃과 스타일링을 활용하여 실제 화면을 만들어보겠습니다!
