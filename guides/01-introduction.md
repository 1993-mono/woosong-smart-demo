# 01. React Native와 Expo 소개

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   React Native가 무엇인지
-   Expo가 무엇이고 왜 사용하는지
-   React Native와 웹 React의 차이점
-   모바일 앱 개발의 기본 개념

## 🤔 React Native란?

React Native는 Facebook(현 Meta)에서 개발한 **모바일 앱 개발 프레임워크**입니다. JavaScript와 React를 사용하여 iOS와 Android 앱을 동시에 개발할 수 있습니다.

### 주요 특징

1. **크로스 플랫폼 개발**: 하나의 코드베이스로 iOS와 Android 앱을 만들 수 있습니다
2. **JavaScript 기반**: 웹 개발 경험이 있다면 쉽게 시작할 수 있습니다
3. **네이티브 성능**: JavaScript로 작성하지만 네이티브 컴포넌트를 사용하여 성능이 좋습니다
4. **Hot Reload**: 코드 변경 시 앱을 다시 빌드하지 않고도 변경사항을 바로 확인할 수 있습니다

### React와의 차이점

| React (웹)                     | React Native                            |
| ------------------------------ | --------------------------------------- |
| `<div>`, `<span>` 등 HTML 태그 | `<View>`, `<Text>` 등 네이티브 컴포넌트 |
| CSS로 스타일링                 | StyleSheet API 사용                     |
| 브라우저에서 실행              | 모바일 앱으로 실행                      |

## 🚀 Expo란?

Expo는 React Native 개발을 더 쉽게 만들어주는 **도구 모음**입니다. 복잡한 설정 없이 바로 개발을 시작할 수 있습니다.

### Expo의 장점

1. **간편한 설정**: 복잡한 네이티브 개발 환경 설정이 필요 없습니다
2. **빠른 개발**: Expo Go 앱으로 바로 테스트할 수 있습니다
3. **풍부한 API**: 카메라, 위치, 푸시 알림 등 다양한 기능을 쉽게 사용할 수 있습니다
4. **쉬운 배포**: Expo 서비스를 통해 앱을 쉽게 배포할 수 있습니다

### Expo vs 순수 React Native

**Expo를 사용하는 경우:**

-   빠르게 프로토타입을 만들고 싶을 때
-   복잡한 네이티브 모듈이 필요 없을 때
-   개발 환경 설정을 최소화하고 싶을 때

**순수 React Native를 사용하는 경우:**

-   특정 네이티브 모듈이 필요할 때
-   더 많은 커스터마이징이 필요할 때

## 📱 모바일 앱 개발의 기본 개념

### 컴포넌트 기반 개발

React Native는 **컴포넌트**를 조합하여 앱을 만듭니다. 각 컴포넌트는 재사용 가능한 UI 요소입니다.

```javascript
import { View, Text } from "react-native";

// 간단한 컴포넌트 예제
function WelcomeScreen() {
    return (
        <View>
            <Text>안녕하세요!</Text>
        </View>
    );
}
```

### 스타일링

React Native는 CSS와 비슷하지만 다른 방식으로 스타일을 적용합니다:

```javascript
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
```

### 플랫폼 차이

iOS와 Android는 디자인 가이드라인이 다릅니다:

-   **iOS**: Human Interface Guidelines
-   **Android**: Material Design

React Native는 두 플랫폼의 차이를 자동으로 처리하지만, 필요시 플랫폼별 코드를 작성할 수도 있습니다.

## 🎯 실습: 현재 프로젝트 살펴보기

현재 프로젝트의 `App.js` 파일을 열어보세요:

```1:21:App.js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

### 코드 분석

1. **import 문**: 필요한 컴포넌트와 모듈을 가져옵니다

    - `expo-status-bar`: Expo의 상태바 컴포넌트
    - `react-native`: React Native의 핵심 컴포넌트들

2. **App 컴포넌트**: 앱의 메인 컴포넌트입니다

    - `View`: 화면의 컨테이너 역할 (웹의 `<div>`와 유사)
    - `Text`: 텍스트를 표시하는 컴포넌트 (웹의 `<p>`와 유사)

3. **StyleSheet**: 스타일을 정의하는 객체입니다
    - `flex: 1`: 사용 가능한 공간을 모두 차지
    - `backgroundColor`: 배경색 설정
    - `alignItems`, `justifyContent`: 정렬 방식 설정

## ✏️ 연습 과제

1. `App.js`의 텍스트를 "안녕하세요, React Native!"로 변경해보세요
2. 배경색을 `#f0f0f0`로 변경해보세요
3. 텍스트 색상을 파란색으로 변경해보세요

**힌트**: `StyleSheet`에 새로운 스타일을 추가하고, `Text` 컴포넌트에 `style` prop을 전달하세요.

## 📝 정리

-   React Native는 JavaScript로 모바일 앱을 개발하는 프레임워크입니다
-   Expo는 React Native 개발을 쉽게 만들어주는 도구입니다
-   컴포넌트 기반으로 앱을 구성합니다
-   스타일링은 StyleSheet API를 사용합니다

## ➡️ 다음 단계

다음 가이드에서는 개발 환경에 대해 자세히 알아보겠습니다.
👉 [02. 개발 환경 이해하기](./02-development-environment.md)
