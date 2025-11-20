# 08. 모달과 알림 (Modal, Alert, ActionSheet)

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   React Native의 `Modal` 컴포넌트 사용법
-   `Alert` API를 사용한 알림 표시
-   `ActionSheet`로 선택 메뉴 구현
-   모달 상태 관리 및 닫기 처리
-   다양한 모달 패턴 구현

## 🪟 Modal 컴포넌트

**Modal**은 화면 위에 오버레이로 표시되는 컴포넌트입니다. 팝업, 다이얼로그, 바텀시트 등을 구현할 때 사용합니다.

### 특징

-   화면 위에 오버레이로 표시
-   배경을 어둡게 처리 가능
-   애니메이션 지원
-   사용자 상호작용 제어 가능

### 기본 사용법

```javascript
import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

function ModalExample() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>모달 열기</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>모달 내용</Text>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                        >
                            <Text>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
```

## 🔑 주요 속성 (Props)

### animationType

모달이 나타날 때의 애니메이션 타입입니다.

```javascript
<Modal animationType="slide" />
```

**값:**

-   `'none'`: 애니메이션 없음
-   `'slide'`: 아래에서 위로 슬라이드 (기본값)
-   `'fade'`: 페이드 인/아웃

### transparent

모달 배경을 투명하게 할지 결정합니다.

```javascript
<Modal transparent={true} />
```

-   `true`: 배경 투명 (오버레이 효과 구현 가능)
-   `false`: 배경 불투명 (기본값)

### visible

모달 표시 여부를 제어합니다.

```javascript
const [modalVisible, setModalVisible] = useState(false);

<Modal visible={modalVisible} />;
```

### onRequestClose

사용자가 뒤로가기 버튼(Android)을 누를 때 호출되는 함수입니다.

```javascript
<Modal onRequestClose={() => setModalVisible(false)} />
```

## 💡 실전 예제

### 기본 모달

```javascript
import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

function BasicModal() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>모달 열기</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>모달 제목</Text>
                        <Text style={styles.modalText}>
                            이것은 모달 내용입니다.
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        width: "80%",
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: "#06c",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    closeButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});
```

### 바텀시트 모달

```javascript
import { useState } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

function BottomSheetModal() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>바텀시트 열기</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback
                    onPress={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <TouchableWithoutFeedback>
                            <View style={styles.bottomSheet}>
                                <View style={styles.handle} />
                                <Text style={styles.title}>바텀시트</Text>
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        console.log("옵션 1 선택");
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text>옵션 1</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.option}
                                    onPress={() => {
                                        console.log("옵션 2 선택");
                                        setModalVisible(false);
                                    }}
                                >
                                    <Text>옵션 2</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.cancelButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.cancelText}>취소</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    bottomSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 40,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: "#ccc",
        borderRadius: 2,
        alignSelf: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    cancelButton: {
        marginTop: 20,
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        alignItems: "center",
    },
    cancelText: {
        fontSize: 16,
        fontWeight: "600",
    },
});
```

### 확인/취소 다이얼로그

```javascript
import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

function ConfirmDialog() {
    const [modalVisible, setModalVisible] = useState(false);

    const handleConfirm = () => {
        console.log("확인됨");
        setModalVisible(false);
        // 확인 후 처리할 작업
    };

    const handleCancel = () => {
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>다이얼로그 열기</Text>
            </TouchableOpacity>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={handleCancel}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.dialog}>
                        <Text style={styles.dialogTitle}>확인</Text>
                        <Text style={styles.dialogMessage}>
                            정말로 삭제하시겠습니까?
                        </Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.dialogButton,
                                    styles.cancelButton,
                                ]}
                                onPress={handleCancel}
                            >
                                <Text style={styles.cancelButtonText}>
                                    취소
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.dialogButton,
                                    styles.confirmButton,
                                ]}
                                onPress={handleConfirm}
                            >
                                <Text style={styles.confirmButtonText}>
                                    확인
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    dialog: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: "80%",
    },
    dialogTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    dialogMessage: {
        fontSize: 16,
        marginBottom: 20,
        color: "#666",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
    },
    dialogButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: "#f0f0f0",
    },
    confirmButton: {
        backgroundColor: "#06c",
    },
    cancelButtonText: {
        color: "#333",
        fontSize: 16,
    },
    confirmButtonText: {
        color: "#fff",
        fontSize: 16,
    },
});
```

## 🔔 Alert API

**Alert**는 간단한 알림을 표시하는 API입니다. 모달보다 간단한 경우에 사용합니다.

### 기본 사용법

```javascript
import { Alert } from "react-native";

// 기본 알림
Alert.alert("제목", "메시지");

// 버튼이 있는 알림
Alert.alert("제목", "메시지", [
    { text: "확인", onPress: () => console.log("확인됨") },
]);

// 확인/취소 알림
Alert.alert("제목", "메시지", [
    { text: "취소", style: "cancel" },
    { text: "확인", onPress: () => console.log("확인됨") },
]);
```

### Alert.alert() 매개변수

```javascript
Alert.alert(title, message?, buttons?, options?);
```

-   `title`: 알림 제목 (필수)
-   `message`: 알림 메시지 (선택)
-   `buttons`: 버튼 배열 (선택)
-   `options`: 추가 옵션 (선택)

### 버튼 속성

```javascript
{
    text: "버튼 텍스트",
    onPress: () => {}, // 버튼 클릭 시 실행할 함수
    style: "default" | "cancel" | "destructive" // iOS만 지원
}
```

### 버튼 개수와 배치 규칙

**Alert.alert는 최대 3개의 버튼을 지원합니다.** 버튼 개수에 따라 레이아웃이 자동으로 결정되며, 개발자가 직접 위치를 지정할 수 없습니다.

#### iOS 버튼 배치

1. **1개 버튼**

    - 중앙에 배치
    - 예: `[{ text: "확인" }]`

2. **2개 버튼**

    - 좌우로 나란히 배치
    - 왼쪽: 첫 번째 버튼
    - 오른쪽: 두 번째 버튼
    - 예: `[{ text: "취소" }, { text: "확인" }]`

3. **3개 버튼**
    - 세로로 나열 (스택)
    - 위에서 아래 순서로 배치
    - 예: `[{ text: "취소" }, { text: "옵션 1" }, { text: "옵션 2" }]`

#### Android 버튼 배치

1. **1개 버튼**

    - 중앙에 배치

2. **2개 버튼**

    - 좌우로 나란히 배치
    - 왼쪽: 첫 번째 버튼
    - 오른쪽: 두 번째 버튼

3. **3개 이상 버튼**
    - 세로로 나열 (리스트 형태)
    - 위에서 아래 순서로 배치

#### 중요 사항

-   **최대 3개**: iOS는 최대 3개까지만 지원 (3개 초과 시 무시됨)
-   **자동 배치**: 버튼 위치는 플랫폼이 자동으로 결정
-   **순서 중요**: 배열의 순서가 화면에 표시되는 순서를 결정
-   **cancel 스타일**: `style: "cancel"`인 버튼은 iOS에서 항상 왼쪽(2개) 또는 맨 아래(3개)에 배치

### 실전 예제

```javascript
import { View, TouchableOpacity, Text, Alert, StyleSheet } from "react-native";

function AlertExample() {
    const showBasicAlert = () => {
        Alert.alert("알림", "기본 알림입니다.");
    };

    const showConfirmAlert = () => {
        Alert.alert("확인", "정말로 삭제하시겠습니까?", [
            {
                text: "취소",
                style: "cancel",
            },
            {
                text: "삭제",
                style: "destructive",
                onPress: () => {
                    console.log("삭제됨");
                },
            },
        ]);
    };

    const showThreeButtonAlert = () => {
        Alert.alert("선택", "원하는 옵션을 선택하세요", [
            {
                text: "취소",
                style: "cancel",
            },
            {
                text: "옵션 1",
                onPress: () => console.log("옵션 1 선택"),
            },
            {
                text: "옵션 2",
                onPress: () => console.log("옵션 2 선택"),
            },
        ]);
    };

    // 버튼 배치 예제
    const showButtonLayoutExamples = () => {
        // 1개 버튼: 중앙 배치
        Alert.alert("알림", "1개 버튼은 중앙에 배치됩니다", [{ text: "확인" }]);

        // 2개 버튼: 좌우 배치
        // iOS: [취소(왼쪽)] [확인(오른쪽)]
        // Android: [취소(왼쪽)] [확인(오른쪽)]
        Alert.alert("확인", "2개 버튼은 좌우로 배치됩니다", [
            { text: "취소", style: "cancel" },
            { text: "확인", onPress: () => console.log("확인") },
        ]);

        // 3개 버튼: 세로 배치
        // iOS: 세로로 나열 (취소가 맨 아래)
        // Android: 세로로 나열
        Alert.alert("선택", "3개 버튼은 세로로 배치됩니다", [
            { text: "옵션 1", onPress: () => console.log("옵션 1") },
            { text: "옵션 2", onPress: () => console.log("옵션 2") },
            { text: "취소", style: "cancel" },
        ]);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={showBasicAlert}>
                <Text style={styles.buttonText}>기본 알림</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={showConfirmAlert}>
                <Text style={styles.buttonText}>확인 알림</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={showThreeButtonAlert}
            >
                <Text style={styles.buttonText}>3개 버튼 알림</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
    },
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
        width: "80%",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
});
```

## 📋 ActionSheet (iOS)

**ActionSheet**는 iOS에서 여러 옵션 중 하나를 선택할 수 있게 해주는 컴포넌트입니다. Android에서는 `ActionSheetIOS`를 사용하거나 커스텀 모달로 구현합니다.

### ActionSheet 이름의 의미와 유래

**ActionSheet**라는 이름은 두 단어의 조합입니다:

1. **Action (액션)**

    - 사용자가 수행할 수 있는 **동작** 또는 **작업**을 의미
    - 예: "삭제", "공유", "편집", "보관" 등
    - 여러 액션 옵션을 한 곳에 모아서 보여줌

2. **Sheet (시트)**
    - 종이 시트처럼 화면 하단에서 **슬라이드되어 올라오는 형태**를 의미
    - 마치 종이 한 장을 아래에서 위로 들어 올리는 것처럼 보임
    - iOS의 디자인 언어에서 "Sheet"는 하단에서 올라오는 패널을 지칭

**비유로 이해하기:**

-   📄 **종이 시트**처럼 화면 하단에서 올라옴
-   📋 **액션 목록**이 적힌 메뉴판
-   🎯 사용자가 **선택할 수 있는 작업들**을 나열

**실생활 비유:**

-   레스토랑의 **메뉴판**처럼 여러 옵션을 보여주고 선택하게 함
-   사진을 길게 누르면 나타나는 **"공유", "삭제", "복사"** 등의 옵션 메뉴
-   마치 종이 한 장에 액션 목록을 적어서 보여주는 것과 같음

**다른 이름들과의 비교:**

-   **Alert**: 알림/경고 (확인/취소만)
-   **Modal**: 전체 화면을 덮는 팝업
-   **ActionSheet**: 여러 액션 옵션을 선택할 수 있는 하단 시트

### 기본 사용법 (iOS)

```javascript
import { ActionSheetIOS, Platform } from "react-native";

if (Platform.OS === "ios") {
    ActionSheetIOS.showActionSheetWithOptions(
        {
            options: ["취소", "옵션 1", "옵션 2", "삭제"],
            destructiveButtonIndex: 3,
            cancelButtonIndex: 0,
        },
        (buttonIndex) => {
            if (buttonIndex === 1) {
                console.log("옵션 1 선택");
            } else if (buttonIndex === 2) {
                console.log("옵션 2 선택");
            } else if (buttonIndex === 3) {
                console.log("삭제 선택");
            }
        }
    );
}
```

### ActionSheetIOS.showActionSheetWithOptions() 매개변수

```javascript
ActionSheetIOS.showActionSheetWithOptions(options, callback);
```

**options 객체 속성:**

-   `options` (필수): 버튼 텍스트 배열

    ```javascript
    options: ["취소", "옵션 1", "옵션 2", "삭제"];
    ```

-   `destructiveButtonIndex` (선택): 위험한 작업(삭제 등) 버튼 인덱스

    -   해당 버튼이 빨간색으로 표시됨

    ```javascript
    destructiveButtonIndex: 3; // "삭제" 버튼
    ```

-   `cancelButtonIndex` (선택): 취소 버튼 인덱스

    -   일반적으로 첫 번째 또는 마지막 버튼

    ```javascript
    cancelButtonIndex: 0; // "취소" 버튼
    ```

-   `title` (선택): ActionSheet 제목

    ```javascript
    title: "선택하세요";
    ```

-   `message` (선택): ActionSheet 메시지

    ```javascript
    message: "원하는 옵션을 선택하세요";
    ```

-   `tintColor` (선택): 버튼 색상 (iOS 13+)
    ```javascript
    tintColor: "#06c";
    ```

**callback 함수:**

-   `buttonIndex`: 선택된 버튼의 인덱스 (0부터 시작)
-   취소 버튼을 누르면 `cancelButtonIndex` 값이 전달됨

### 크로스 플랫폼 ActionSheet

**크로스 플랫폼 ActionSheet**는 iOS와 Android 모두에서 동일한 사용자 경험을 제공하기 위한 패턴입니다.

#### 왜 크로스 플랫폼이 필요한가?

-   **iOS**: `ActionSheetIOS`가 네이티브로 제공되어 간편하게 사용 가능
-   **Android**: `ActionSheetIOS`가 없어서 커스텀 모달로 구현해야 함
-   **목표**: 두 플랫폼에서 동일한 인터페이스로 사용할 수 있도록 통합

#### 구현 방법

1. **Platform.OS로 플랫폼 구분**

    - `Platform.OS === "ios"`: iOS 네이티브 ActionSheet 사용
    - `Platform.OS === "android"`: 커스텀 Modal로 구현

2. **공통 핸들러 함수**

    - 두 플랫폼에서 동일한 로직을 처리하기 위해 `handleAction` 함수 사용
    - 버튼 인덱스를 통일하여 일관된 동작 보장

3. **Android 커스텀 구현**
    - Modal을 사용하여 바텀시트 스타일의 ActionSheet 구현
    - iOS와 유사한 UI/UX 제공

```javascript
import { useState } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Platform,
    ActionSheetIOS,
} from "react-native";

function CrossPlatformActionSheet() {
    // Android용 모달 상태 관리
    const [modalVisible, setModalVisible] = useState(false);

    // ActionSheet 표시 함수
    const showActionSheet = () => {
        if (Platform.OS === "ios") {
            // iOS: 네이티브 ActionSheet 사용
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ["취소", "옵션 1", "옵션 2", "삭제"],
                    destructiveButtonIndex: 3, // 삭제 버튼을 빨간색으로 표시
                    cancelButtonIndex: 0, // 취소 버튼 인덱스
                },
                (buttonIndex) => {
                    handleAction(buttonIndex);
                }
            );
        } else {
            // Android: 커스텀 모달 표시
            setModalVisible(true);
        }
    };

    // 공통 액션 처리 함수
    const handleAction = (index) => {
        switch (index) {
            case 1:
                console.log("옵션 1 선택");
                break;
            case 2:
                console.log("옵션 2 선택");
                break;
            case 3:
                console.log("삭제 선택");
                break;
            default:
                // 취소 또는 다른 경우
                break;
        }
        // Android 모달 닫기
        setModalVisible(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={showActionSheet}>
                <Text style={styles.buttonText}>액션시트 열기</Text>
            </TouchableOpacity>

            {/* Android 전용 커스텀 ActionSheet */}
            {Platform.OS === "android" && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.actionSheet}>
                            <TouchableOpacity
                                style={styles.actionItem}
                                onPress={() => handleAction(1)}
                            >
                                <Text>옵션 1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.actionItem}
                                onPress={() => handleAction(2)}
                            >
                                <Text>옵션 2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.actionItem, styles.destructive]}
                                onPress={() => handleAction(3)}
                            >
                                <Text style={styles.destructiveText}>삭제</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelText}>취소</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    actionSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    actionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    destructive: {
        borderBottomWidth: 0,
    },
    destructiveText: {
        color: "#ff0000",
    },
    cancelButton: {
        marginTop: 10,
        padding: 15,
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        alignItems: "center",
        marginHorizontal: 15,
    },
    cancelText: {
        fontSize: 16,
        fontWeight: "600",
    },
});
```

#### 크로스 플랫폼 ActionSheet 구현 시 주의사항

1. **버튼 인덱스 통일**

    - iOS와 Android에서 동일한 인덱스를 사용하여 일관성 유지
    - `handleAction` 함수에서 인덱스 기반으로 처리

2. **취소 버튼 처리**

    - iOS: `cancelButtonIndex`로 자동 처리
    - Android: 별도로 취소 버튼을 구현하고 `setModalVisible(false)` 호출

3. **destructive 버튼 스타일링**

    - iOS: `destructiveButtonIndex`로 자동 빨간색 표시
    - Android: 커스텀 스타일로 빨간색 텍스트 적용 필요

4. **모달 닫기 처리**

    - Android 모달의 배경 터치 시 닫기: `TouchableWithoutFeedback` 사용
    - 뒤로가기 버튼 처리: `onRequestClose` prop 사용

5. **애니메이션**
    - iOS: 네이티브 애니메이션 자동 적용
    - Android: `animationType="slide"`로 하단에서 슬라이드 효과

#### 실전 팁

**재사용 가능한 ActionSheet 컴포넌트 만들기:**

```javascript
// useActionSheet.js - 커스텀 훅
import { useState } from "react";
import { Platform, ActionSheetIOS } from "react-native";

export const useActionSheet = () => {
    const [visible, setVisible] = useState(false);

    const showActionSheet = (options, onSelect) => {
        if (Platform.OS === "ios") {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: options.map((opt) => opt.label),
                    destructiveButtonIndex: options.findIndex(
                        (opt) => opt.destructive
                    ),
                    cancelButtonIndex: options.findIndex((opt) => opt.cancel),
                },
                (buttonIndex) => {
                    if (options[buttonIndex]?.onPress) {
                        options[buttonIndex].onPress();
                    }
                    onSelect?.(buttonIndex);
                }
            );
        } else {
            setVisible(true);
        }
    };

    return { visible, setVisible, showActionSheet };
};
```

**사용 예시:**

```javascript
const { visible, setVisible, showActionSheet } = useActionSheet();

const handleShowActionSheet = () => {
    showActionSheet(
        [
            { label: "취소", cancel: true },
            { label: "옵션 1", onPress: () => console.log("옵션 1") },
            { label: "옵션 2", onPress: () => console.log("옵션 2") },
            {
                label: "삭제",
                destructive: true,
                onPress: () => console.log("삭제"),
            },
        ],
        (index) => {
            console.log("선택된 인덱스:", index);
        }
    );
};
```

## 🎨 모달 스타일링 팁

### 중앙 모달

```javascript
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        width: "80%",
        maxWidth: 400,
    },
});
```

### 바텀시트 모달

```javascript
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    bottomSheet: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
});
```

### 전체 화면 모달

```javascript
<Modal animationType="slide" transparent={false} visible={modalVisible}>
    <View style={styles.fullScreenModal}>{/* 내용 */}</View>
</Modal>;

const styles = StyleSheet.create({
    fullScreenModal: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
```

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. 기본 모달 구현하기
2. 바텀시트 모달 만들기
3. 확인/취소 다이얼로그 구현하기
4. Alert API 사용하기
5. ActionSheet 구현하기 (크로스 플랫폼)

## 📝 정리

-   **Modal**: 화면 위에 오버레이로 표시되는 컴포넌트
-   **animationType**: 모달 애니메이션 타입 (slide, fade, none)
-   **transparent**: 배경 투명 여부
-   **visible**: 모달 표시 여부 제어
-   **Alert.alert()**: 간단한 알림 표시 API
-   **ActionSheetIOS**: iOS 액션시트 (Android는 커스텀 모달 사용)
-   모달은 상태로 관리하며, 닫기 처리를 명확히 해야 함
