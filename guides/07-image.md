# 07. 이미지 컴포넌트 (Image)

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   React Native의 `Image` 컴포넌트 사용법
-   로컬 이미지와 원격 이미지 로드 방법
-   이미지 최적화 및 캐싱
-   이미지 스타일링 및 레이아웃
-   이미지 로딩 상태 처리

## 🖼️ Image 컴포넌트

**Image**는 이미지를 표시하는 컴포넌트입니다. 웹의 `<img>` 태그와 유사하지만, React Native에서는 더 많은 제어가 가능합니다.

### 특징

-   로컬 이미지와 원격 이미지 모두 지원
-   자동 이미지 최적화 및 캐싱
-   로딩 상태 및 에러 처리 가능
-   다양한 이미지 포맷 지원 (PNG, JPG, GIF, WebP 등)

### 기본 사용법

```javascript
import { Image } from "react-native";

// 로컬 이미지
<Image source={require("./assets/logo.png")} />

// 원격 이미지
<Image source={{ uri: "https://example.com/image.jpg" }} />
```

## 🔑 주요 속성 (Props)

### source

이미지의 소스를 지정합니다.

#### 로컬 이미지

```javascript
<Image source={require("./assets/logo.png")} />
```

-   `require()`를 사용하여 로컬 이미지 파일을 불러옴
-   경로는 컴포넌트 파일 기준 상대 경로
-   빌드 시 번들에 포함됨

#### 원격 이미지

```javascript
<Image source={{ uri: "https://example.com/image.jpg" }} />
```

-   `uri` 속성에 이미지 URL을 지정
-   HTTPS URL 사용 권장
-   네트워크 권한 필요 (Android의 경우 `AndroidManifest.xml` 설정)

#### 여러 해상도 지원

```javascript
<Image
    source={{
        uri: "https://example.com/image.jpg",
        width: 200,
        height: 200,
    }}
/>
```

### style

이미지의 스타일을 지정합니다.

```javascript
<Image
    source={require("./assets/logo.png")}
    style={{ width: 100, height: 100 }}
/>
```

### 주요 스타일 속성

-   `width`: 이미지 너비
-   `height`: 이미지 높이
-   `resizeMode`: 이미지 크기 조정 방식
-   `borderRadius`: 모서리 둥글게
-   `tintColor`: 이미지 색상 변경 (PNG 투명 이미지에만 적용)

### resizeMode

이미지가 컨테이너보다 크거나 작을 때 어떻게 표시할지 결정합니다.

```javascript
<Image
    source={require("./assets/image.jpg")}
    style={{ width: 200, height: 200 }}
    resizeMode="cover"
/>
```

**값:**

-   `'cover'`: 컨테이너를 채우도록 확대/축소 (비율 유지, 잘릴 수 있음)
-   `'contain'`: 전체 이미지가 보이도록 확대/축소 (비율 유지, 빈 공간 생길 수 있음)
-   `'stretch'`: 컨테이너에 맞춰 늘림 (비율 무시)
-   `'repeat'`: 타일처럼 반복 (iOS만 지원)
-   `'center'`: 원본 크기로 중앙 정렬

### 이미지 로딩 이벤트

```javascript
<Image
    source={{ uri: "https://example.com/image.jpg" }}
    onLoadStart={() => console.log("로딩 시작")}
    onLoad={() => console.log("로딩 완료")}
    onError={(error) => console.log("에러:", error)}
    onLoadEnd={() => console.log("로딩 종료")}
/>
```

-   `onLoadStart`: 이미지 로딩 시작 시 호출
-   `onLoad`: 이미지 로딩 완료 시 호출
-   `onError`: 이미지 로딩 실패 시 호출
-   `onLoadEnd`: 이미지 로딩 종료 시 호출 (성공/실패 모두)

## 💡 실전 예제

### 기본 이미지 표시

```javascript
import { View, Image, StyleSheet } from "react-native";

function BasicImage() {
    return (
        <View style={styles.container}>
            <Image source={require("./assets/logo.png")} style={styles.image} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
});
```

### 원격 이미지 표시

```javascript
import { View, Image, StyleSheet } from "react-native";

function RemoteImage() {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: "https://picsum.photos/200/300",
                }}
                style={styles.image}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
});
```

### 로딩 상태 처리

```javascript
import { useState } from "react";
import { View, Image, ActivityIndicator, Text, StyleSheet } from "react-native";

function ImageWithLoading() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <View style={styles.container}>
            {loading && (
                <ActivityIndicator
                    style={styles.loader}
                    size="large"
                    color="#06c"
                />
            )}
            {error && (
                <Text style={styles.error}>이미지를 불러올 수 없습니다</Text>
            )}
            <Image
                source={{
                    uri: "https://picsum.photos/200/300",
                }}
                style={[styles.image, loading && styles.hidden]}
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                onError={() => {
                    setLoading(false);
                    setError(true);
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    image: {
        width: 200,
        height: 300,
        borderRadius: 10,
    },
    hidden: {
        opacity: 0,
    },
    loader: {
        position: "absolute",
    },
    error: {
        color: "#ff0000",
        marginTop: 10,
    },
});
```

### 플레이스홀더 이미지

```javascript
import { useState } from "react";
import { View, Image, StyleSheet } from "react-native";

function ImageWithPlaceholder() {
    const [imageError, setImageError] = useState(false);

    return (
        <View style={styles.container}>
            {imageError ? (
                <Image
                    source={require("./assets/placeholder.png")}
                    style={styles.image}
                />
            ) : (
                <Image
                    source={{
                        uri: "https://example.com/image.jpg",
                    }}
                    style={styles.image}
                    onError={() => setImageError(true)}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
});
```

### 원형 이미지 (프로필 사진)

```javascript
import { View, Image, StyleSheet } from "react-native";

function ProfileImage() {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: "https://picsum.photos/200/200",
                }}
                style={styles.profileImage}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50, // width/2 = 원형
        borderWidth: 3,
        borderColor: "#fff",
    },
});
```

### 이미지 갤러리 (여러 이미지)

```javascript
import { ScrollView, Image, StyleSheet, View } from "react-native";

function ImageGallery() {
    const images = [
        { id: 1, uri: "https://picsum.photos/300/300?random=1" },
        { id: 2, uri: "https://picsum.photos/300/300?random=2" },
        { id: 3, uri: "https://picsum.photos/300/300?random=3" },
        { id: 4, uri: "https://picsum.photos/300/300?random=4" },
    ];

    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {images.map((image) => (
                <Image
                    key={image.id}
                    source={{ uri: image.uri }}
                    style={styles.galleryImage}
                />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    galleryImage: {
        width: 200,
        height: 200,
        marginRight: 10,
        borderRadius: 10,
    },
});
```

### resizeMode 예제

```javascript
import { View, Image, Text, StyleSheet } from "react-native";

function ResizeModeExample() {
    const imageUri = "https://picsum.photos/400/200";

    return (
        <View style={styles.container}>
            <View style={styles.example}>
                <Text style={styles.label}>cover</Text>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.example}>
                <Text style={styles.label}>contain</Text>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.example}>
                <Text style={styles.label}>stretch</Text>
                <Image
                    source={{ uri: imageUri }}
                    style={styles.image}
                    resizeMode="stretch"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    example: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    image: {
        width: 200,
        height: 150,
        backgroundColor: "#f0f0f0",
    },
});
```

### 배경 이미지 (Background Image)

```javascript
import { View, ImageBackground, Text, StyleSheet } from "react-native";

function BackgroundImage() {
    return (
        <ImageBackground
            source={{
                uri: "https://picsum.photos/400/600",
            }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Text style={styles.title}>제목</Text>
                <Text style={styles.subtitle}>부제목</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
        marginTop: 8,
    },
});
```

## 🎨 Image 스타일링

### 기본 이미지 스타일

```javascript
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        backgroundColor: "#f0f0f0", // 로딩 중 배경색
    },
});
```

### 이미지에 그림자 효과

```javascript
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        // Android 그림자
        elevation: 5,
        // iOS 그림자
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
});
```

### 이미지에 테두리

```javascript
const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#06c",
    },
});
```

## 📱 이미지 최적화 팁

### 1. 적절한 이미지 크기 사용

-   화면에 표시할 크기보다 큰 이미지는 불필요한 메모리 사용
-   필요한 크기만큼만 로드

### 2. 이미지 포맷 선택

-   **PNG**: 투명 배경이 필요할 때
-   **JPG**: 사진 등 복잡한 이미지
-   **WebP**: 더 작은 파일 크기 (지원되는 경우)

### 3. 로컬 이미지 사용

-   자주 사용하는 이미지는 로컬에 저장하여 네트워크 요청 감소

### 4. 이미지 캐싱

-   React Native는 자동으로 이미지를 캐싱
-   원격 이미지는 한 번 로드하면 캐시에 저장됨

### 5. 로딩 상태 표시

-   사용자 경험을 위해 로딩 인디케이터 표시

## 🔧 ImageBackground 컴포넌트

**ImageBackground**는 배경 이미지로 사용할 수 있는 컴포넌트입니다.

### 기본 사용법

```javascript
import { ImageBackground, Text, View } from "react-native";

function BackgroundExample() {
    return (
        <ImageBackground
            source={{
                uri: "https://example.com/background.jpg",
            }}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.content}>
                <Text>내용</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: 20,
        borderRadius: 10,
    },
});
```

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. 로컬 이미지와 원격 이미지 표시하기
2. 이미지 로딩 상태 처리하기
3. 다양한 resizeMode 사용하기
4. 이미지 갤러리 만들기
5. 배경 이미지 사용하기

## 📝 정리

-   **Image**: 이미지를 표시하는 컴포넌트
-   **로컬 이미지**: `require()` 사용
-   **원격 이미지**: `{ uri: "URL" }` 사용
-   **resizeMode**: 이미지 크기 조정 방식 (cover, contain, stretch 등)
-   **onLoad/onError**: 이미지 로딩 이벤트 처리
-   **ImageBackground**: 배경 이미지용 컴포넌트
-   이미지 최적화를 위해 적절한 크기와 포맷 사용
