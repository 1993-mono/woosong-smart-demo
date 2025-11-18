# 02. 기본 컴포넌트

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   React Native의 핵심 컴포넌트들 (View, Text, Image 등)
-   각 컴포넌트의 용도와 사용법
-   컴포넌트에 스타일을 적용하는 방법
-   컴포넌트를 조합하여 화면을 만드는 방법

## 🧩 React Native의 핵심 컴포넌트

React Native는 웹의 HTML 태그 대신 **네이티브 컴포넌트**를 사용합니다. 각 컴포넌트는 플랫폼에 맞게 자동으로 변환됩니다.

### 주요 컴포넌트 비교

| 웹 (HTML)       | React Native                        | 용도               |
| --------------- | ----------------------------------- | ------------------ |
| `<div>`         | `<View>`                            | 컨테이너, 레이아웃 |
| `<p>`, `<span>` | `<Text>`                            | 텍스트 표시        |
| `<img>`         | `<Image>`                           | 이미지 표시        |
| `<button>`      | `<TouchableOpacity>`, `<Pressable>` | 버튼, 터치 영역    |
| `<input>`       | `<TextInput>`                       | 텍스트 입력        |
| `<ul>`, `<li>`  | `<FlatList>`, `<ScrollView>`        | 리스트             |

## 📦 View 컴포넌트

**View**는 가장 기본적인 컨테이너 컴포넌트입니다. 웹의 `<div>`와 유사합니다.

### 특징

-   다른 컴포넌트들을 감싸는 컨테이너 역할
-   레이아웃과 스타일링의 기본 단위
-   기본적으로 `flexbox` 레이아웃 사용

### 기본 사용법

```javascript
import { View } from "react-native";

<View style={styles.container}>
    <Text>내용</Text>
</View>;
```

### 주요 스타일 속성

-   `flex`: 공간 배분
-   `backgroundColor`: 배경색
-   `padding`, `margin`: 여백
-   `borderRadius`: 모서리 둥글게
-   `width`, `height`: 크기

## 📝 Text 컴포넌트

**Text**는 텍스트를 표시하는 컴포넌트입니다. React Native에서는 텍스트를 반드시 `<Text>` 컴포넌트 안에 넣어야 합니다.

### 특징

-   텍스트는 반드시 `<Text>` 안에 있어야 함
-   중첩 가능 (텍스트 안에 텍스트)
-   스타일 상속 가능

### 기본 사용법

```javascript
import { Text } from 'react-native';

<Text style={styles.title}>제목</Text>
<Text>
  일반 텍스트{' '}
  <Text style={styles.bold}>굵은 텍스트</Text>
</Text>
```

### 주요 스타일 속성

-   `fontSize`: 글자 크기
-   `fontWeight`: 글자 굵기 ('normal', 'bold', '600' 등)
-   `color`: 글자 색상
-   `textAlign`: 정렬 ('left', 'center', 'right')
-   `lineHeight`: 줄 간격

## 🖼️ Image 컴포넌트

**Image**는 이미지를 표시하는 컴포넌트입니다.

### 특징

-   로컬 이미지와 원격 이미지 모두 지원
-   반드시 `source` prop 필요
-   `width`와 `height` 지정 필요 (또는 `resizeMode` 사용)

### 기본 사용법

```javascript
import { Image } from 'react-native';

// 로컬 이미지
<Image
  source={require('./assets/icon.png')}
  style={styles.image}
/>

// 원격 이미지
<Image
  source={{ uri: 'https://example.com/image.jpg' }}
  style={styles.image}
/>
```

### 주요 속성

-   `source`: 이미지 소스 (require() 또는 { uri: '...' })
-   `style`: 스타일 (width, height 필수)
-   `resizeMode`: 이미지 크기 조정 방식 ('cover', 'contain', 'stretch', 'repeat', 'center')

## 🎨 StyleSheet API

React Native에서는 CSS 파일 대신 **StyleSheet API**를 사용합니다.

### StyleSheet.create() 사용법

```javascript
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
    },
});
```

### 장점

-   성능 최적화 (스타일 객체를 한 번만 생성)
-   타입 체크 가능
-   코드 자동완성 지원

### 인라인 스타일 vs StyleSheet

**인라인 스타일 (비권장):**

```javascript
<View style={{ backgroundColor: '#fff', padding: 20 }}>
```

**StyleSheet 사용 (권장):**

```javascript
<View style={styles.container}>
```

## 🔄 컴포넌트 조합하기

여러 컴포넌트를 조합하여 화면을 만들 수 있습니다:

```javascript
import { View, Text, Image, StyleSheet } from "react-native";

function ProfileCard() {
    return (
        <View style={styles.card}>
            <Image
                source={require("./assets/profile.jpg")}
                style={styles.avatar}
            />
            <View style={styles.info}>
                <Text style={styles.name}>홍길동</Text>
                <Text style={styles.email}>hong@example.com</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    info: {
        marginLeft: 15,
        justifyContent: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
});
```

## 📋 컴포넌트 속성 (Props)

모든 컴포넌트는 **props**를 통해 동작을 제어합니다.

### 공통 Props

-   `style`: 스타일 적용
-   `testID`: 테스트용 ID
-   `accessible`: 접근성 설정

### 예시

```javascript
<Text
  style={styles.text}
  numberOfLines={2}  // 최대 2줄만 표시
  ellipsizeMode="tail"  // 말줄임표 위치
>
  긴 텍스트 내용...
</Text>

<View
  style={styles.container}
  onLayout={(event) => {
    // 레이아웃 변경 시 호출
    console.log(event.nativeEvent.layout);
  }}
>
  내용
</View>
```

## 🎯 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. View와 Text 컴포넌트로 카드 만들기
2. Image 컴포넌트로 이미지 추가하기
3. 여러 컴포넌트를 조합하여 프로필 카드 만들기
4. StyleSheet로 스타일 적용하기

## 📝 정리

-   **View**: 컨테이너 역할, 레이아웃의 기본 단위
-   **Text**: 텍스트 표시 (반드시 Text 안에 텍스트 작성)
-   **Image**: 이미지 표시 (width, height 필요)
-   **StyleSheet**: 스타일을 정의하는 API
-   컴포넌트를 조합하여 복잡한 UI 만들기 가능
