# 06. 입력 컴포넌트 (TextInput)

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   React Native의 `TextInput` 컴포넌트 사용법
-   다양한 입력 타입과 키보드 설정
-   입력값 상태 관리 및 이벤트 처리
-   입력 검증 및 에러 처리 방법
-   포커스 관리 및 키보드 제어

## 📝 TextInput 컴포넌트

**TextInput**은 사용자로부터 텍스트 입력을 받는 컴포넌트입니다. 웹의 `<input>` 태그와 유사합니다.

### 특징

-   제어 컴포넌트: `value`와 `onChangeText`를 함께 사용해야 함
-   다양한 키보드 타입 지원
-   플레이스홀더, 라벨 등 UI 요소 지원
-   포커스 및 블러 이벤트 처리 가능

### 기본 사용법

```javascript
import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

function InputExample() {
    const [text, setText] = useState("");

    return (
        <TextInput
            style={styles.input}
            placeholder="이름을 입력하세요"
            value={text}
            onChangeText={setText}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        borderRadius: 5,
    },
});
```

## 🔑 주요 속성 (Props)

### 기본 속성

-   `value`: 입력 필드의 현재 값 (제어 컴포넌트 필수)
-   `onChangeText`: 텍스트 변경 시 호출되는 함수 `(text) => void`
-   `placeholder`: 입력 전 표시되는 힌트 텍스트
-   `placeholderTextColor`: 플레이스홀더 텍스트 색상
-   `defaultValue`: 비제어 컴포넌트일 때 초기값

### 키보드 관련 속성

-   `keyboardType`: 키보드 타입 설정
    -   `'default'`: 기본 키보드
    -   `'numeric'`: 숫자 키보드
    -   `'email-address'`: 이메일 키보드 (@ 포함)
    -   `'phone-pad'`: 전화번호 키보드
    -   `'number-pad'`: 숫자 패드
    -   `'decimal-pad'`: 소수점 포함 숫자 패드
-   `autoCapitalize`: 자동 대문자 변환
    -   `'none'`: 없음
    -   `'sentences'`: 문장 첫 글자
    -   `'words'`: 단어 첫 글자
    -   `'characters'`: 모든 글자
-   `autoCorrect`: 자동 수정 여부 (기본값: `true`)
-   `autoComplete`: 자동완성 타입
    -   `'off'`, `'username'`, `'password'`, `'email'`, `'name'` 등

### 보안 및 입력 제한

-   `secureTextEntry`: 비밀번호 입력 모드 (기본값: `false`)
-   `maxLength`: 최대 입력 길이
-   `editable`: 편집 가능 여부 (기본값: `true`)
-   `selectTextOnFocus`: 포커스 시 전체 텍스트 선택 (기본값: `false`)

### 여러 줄 입력

-   `multiline`: 여러 줄 입력 허용 (기본값: `false`)
-   `numberOfLines`: 초기 줄 수 (multiline일 때)
-   `textAlignVertical`: 세로 정렬 (`'top'`, `'center'`, `'bottom'`)

### 포커스 및 이벤트

-   `onFocus`: 포커스 시 호출되는 함수
-   `onBlur`: 포커스 해제 시 호출되는 함수
-   `onSubmitEditing`: 제출(완료) 버튼 클릭 시 호출되는 함수
-   `blurOnSubmit`: 제출 시 포커스 해제 여부 (기본값: `true`)

## 💡 실전 예제

### 기본 텍스트 입력

```javascript
import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

function BasicInput() {
    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.label}>이름</Text>
            <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요"
                value={text}
                onChangeText={setText}
            />
            <Text style={styles.result}>입력한 값: {text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    result: {
        marginTop: 10,
        fontSize: 14,
        color: "#666",
    },
});
```

### 숫자 입력

```javascript
import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

function NumberInput() {
    const [number, setNumber] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.label}>나이</Text>
            <TextInput
                style={styles.input}
                placeholder="나이를 입력하세요"
                value={number}
                onChangeText={setNumber}
                keyboardType="numeric"
                maxLength={3}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});
```

### 이메일 입력

```javascript
import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

function EmailInput() {
    const [email, setEmail] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
                style={styles.input}
                placeholder="example@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});
```

### 비밀번호 입력 (보기/숨기기 토글)

```javascript
import { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

function PasswordInput() {
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>비밀번호</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!isVisible}
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="password"
                />
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={() => setIsVisible(!isVisible)}
                >
                    <Text style={styles.toggleText}>
                        {isVisible ? "숨기기" : "보기"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    toggleButton: {
        padding: 10,
    },
    toggleText: {
        color: "#06c",
        fontSize: 14,
    },
});
```

### 여러 줄 텍스트 입력 (TextArea)

```javascript
import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

function TextAreaInput() {
    const [text, setText] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.label}>메모</Text>
            <TextInput
                style={styles.textArea}
                placeholder="메모를 입력하세요"
                value={text}
                onChangeText={setText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        minHeight: 100,
    },
});
```

### 입력 검증 및 에러 처리

```javascript
import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

function ValidatedInput() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const validateEmail = (text) => {
        setEmail(text);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (text && !emailRegex.test(text)) {
            setError("올바른 이메일 형식이 아닙니다");
        } else {
            setError("");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="example@email.com"
                value={email}
                onChangeText={validateEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                onBlur={() => {
                    if (!email) {
                        setError("이메일을 입력해주세요");
                    }
                }}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    inputError: {
        borderColor: "#ff0000",
    },
    errorText: {
        color: "#ff0000",
        fontSize: 12,
        marginTop: 4,
    },
});
```

### 포커스 관리

```javascript
import { useState, useRef } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

function FocusManagement() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const emailInputRef = useRef(null);

    const handleNameSubmit = () => {
        // 이름 입력 후 이메일 필드로 포커스 이동
        emailInputRef.current?.focus();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>이름</Text>
            <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요"
                value={name}
                onChangeText={setName}
                onSubmitEditing={handleNameSubmit}
                returnKeyType="next"
            />

            <Text style={[styles.label, styles.labelMargin]}>이메일</Text>
            <TextInput
                ref={emailInputRef}
                style={styles.input}
                placeholder="이메일을 입력하세요"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                returnKeyType="done"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 8,
    },
    labelMargin: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
});
```

### 폼 예제 (여러 입력 필드)

```javascript
import { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

function FormExample() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = () => {
        console.log("제출된 데이터:", formData);
        // API 호출 등 처리
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>이름</Text>
            <TextInput
                style={styles.input}
                placeholder="이름을 입력하세요"
                value={formData.name}
                onChangeText={(value) => handleChange("name", value)}
            />

            <Text style={styles.label}>이메일</Text>
            <TextInput
                style={styles.input}
                placeholder="이메일을 입력하세요"
                value={formData.email}
                onChangeText={(value) => handleChange("email", value)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>전화번호</Text>
            <TextInput
                style={styles.input}
                placeholder="전화번호를 입력하세요"
                value={formData.phone}
                onChangeText={(value) => handleChange("phone", value)}
                keyboardType="phone-pad"
            />

            <Text style={styles.label}>메시지</Text>
            <TextInput
                style={styles.textArea}
                placeholder="메시지를 입력하세요"
                value={formData.message}
                onChangeText={(value) => handleChange("message", value)}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitButtonText}>제출</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        minHeight: 100,
    },
    submitButton: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

## 🎨 TextInput 스타일링

### 기본 스타일

```javascript
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: "#fff",
    },
});
```

### 포커스 상태 스타일

```javascript
import { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

function StyledInput() {
    const [text, setText] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    return (
        <TextInput
            style={[styles.input, isFocused && styles.inputFocused]}
            placeholder="입력하세요"
            value={text}
            onChangeText={setText}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />
    );
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    inputFocused: {
        borderColor: "#06c",
        borderWidth: 2,
    },
});
```

### 에러 상태 스타일

```javascript
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    inputError: {
        borderColor: "#ff0000",
        backgroundColor: "#fff5f5",
    },
});
```

## 📝 입력 검증 패턴

### 실시간 검증

```javascript
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const handleEmailChange = (text) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text && !emailRegex.test(text)) {
        setError("올바른 이메일 형식이 아닙니다");
    } else {
        setError("");
    }
};
```

### 포커스 해제 시 검증

```javascript
const handleBlur = () => {
    if (!email) {
        setError("이메일을 입력해주세요");
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("올바른 이메일 형식이 아닙니다");
        }
    }
};
```

### 제출 시 검증

```javascript
const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
        errors.name = "이름을 입력해주세요";
    }

    if (!formData.email.trim()) {
        errors.email = "이메일을 입력해주세요";
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = "올바른 이메일 형식이 아닙니다";
        }
    }

    return errors;
};

const handleSubmit = () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
    }
    // 제출 처리
};
```

## 🎯 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. 기본 TextInput 컴포넌트 사용하기
2. 다양한 키보드 타입 설정하기
3. 비밀번호 입력 필드 구현하기
4. 여러 줄 텍스트 입력 구현하기
5. 입력값 검증 및 에러 처리하기
6. 포커스 관리 및 폼 제출 처리하기

## 📝 정리

-   **TextInput**: 사용자로부터 텍스트 입력을 받는 컴포넌트
-   **제어 컴포넌트**: `value`와 `onChangeText`를 함께 사용해야 함
-   **keyboardType**: 키보드 타입 설정 (numeric, email-address, phone-pad 등)
-   **secureTextEntry**: 비밀번호 입력 모드
-   **multiline**: 여러 줄 입력 허용
-   **onFocus/onBlur**: 포커스 이벤트 처리
-   **입력 검증**: 실시간 또는 포커스 해제 시 검증 가능
-   **ref**: useRef를 사용하여 포커스 제어 가능

## ➡️ 다음 단계

다음 실습에서는 TextInput을 활용하여 실제 폼 화면을 만들어보겠습니다!
