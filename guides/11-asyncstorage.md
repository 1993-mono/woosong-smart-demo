# 11. 데이터 저장 (AsyncStorage)

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   AsyncStorage를 사용한 로컬 데이터 저장
-   데이터 저장 및 불러오기
-   사용자 설정 저장
-   데이터 삭제 및 전체 삭제
-   AsyncStorage 활용 패턴

## 💾 AsyncStorage란?

**AsyncStorage**는 React Native에서 제공하는 비동기 키-값 저장소입니다. 간단한 데이터를 로컬에 저장하고 불러올 수 있습니다.

### 특징

-   비동기 처리: 모든 작업이 비동기로 처리됨
-   키-값 저장: 문자열 키와 값으로 저장
-   영구 저장: 앱을 재시작해도 데이터 유지
-   용량 제한: 약 6MB 정도 (플랫폼에 따라 다름)

### 설치

Expo 프로젝트에서는 `@react-native-async-storage/async-storage`를 설치해야 합니다.

```bash
npx expo install @react-native-async-storage/async-storage
```

## 🔑 기본 사용법

### 데이터 저장

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

// 문자열 저장
await AsyncStorage.setItem("key", "value");

// 객체 저장 (JSON.stringify 필요)
const user = { name: "홍길동", age: 30 };
await AsyncStorage.setItem("user", JSON.stringify(user));
```

### 데이터 불러오기

```javascript
// 문자열 불러오기
const value = await AsyncStorage.getItem("key");

// 객체 불러오기 (JSON.parse 필요)
const userString = await AsyncStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;
```

### 데이터 삭제

```javascript
// 특정 키 삭제
await AsyncStorage.removeItem("key");

// 모든 데이터 삭제
await AsyncStorage.clear();
```

## 💡 실전 예제

### 기본 저장/불러오기

```javascript
import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function StorageExample() {
    const [inputValue, setInputValue] = useState("");
    const [storedValue, setStoredValue] = useState("");

    // 저장된 값 불러오기
    useEffect(() => {
        loadStoredValue();
    }, []);

    const loadStoredValue = async () => {
        try {
            const value = await AsyncStorage.getItem("myKey");
            if (value !== null) {
                setStoredValue(value);
            }
        } catch (error) {
            console.error("불러오기 실패:", error);
        }
    };

    const saveValue = async () => {
        try {
            await AsyncStorage.setItem("myKey", inputValue);
            setStoredValue(inputValue);
            setInputValue("");
            alert("저장되었습니다!");
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장에 실패했습니다");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="저장할 값 입력"
                value={inputValue}
                onChangeText={setInputValue}
            />
            <TouchableOpacity style={styles.button} onPress={saveValue}>
                <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
            {storedValue && (
                <Text style={styles.storedText}>저장된 값: {storedValue}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
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
    storedText: {
        marginTop: 20,
        fontSize: 16,
    },
});
```

### 사용자 설정 저장

```javascript
import { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SETTINGS_KEY = "user_settings";

function SettingsScreen() {
    const [settings, setSettings] = useState({
        notifications: false,
        darkMode: false,
        language: "ko",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const stored = await AsyncStorage.getItem(SETTINGS_KEY);
            if (stored) {
                setSettings(JSON.parse(stored));
            }
        } catch (error) {
            console.error("설정 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveSettings = async (newSettings) => {
        try {
            await AsyncStorage.setItem(
                SETTINGS_KEY,
                JSON.stringify(newSettings)
            );
            setSettings(newSettings);
        } catch (error) {
            console.error("설정 저장 실패:", error);
        }
    };

    const toggleNotification = async (value) => {
        const newSettings = { ...settings, notifications: value };
        await saveSettings(newSettings);
    };

    const toggleDarkMode = async (value) => {
        const newSettings = { ...settings, darkMode: value };
        await saveSettings(newSettings);
    };

    if (loading) {
        return <Text>로딩 중...</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>알림</Text>
                <Switch
                    value={settings.notifications}
                    onValueChange={toggleNotification}
                />
            </View>
            <View style={styles.settingItem}>
                <Text style={styles.settingLabel}>다크 모드</Text>
                <Switch
                    value={settings.darkMode}
                    onValueChange={toggleDarkMode}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    settingLabel: {
        fontSize: 16,
    },
});
```

### 사용자 정보 저장

```javascript
import { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_KEY = "user_info";

function ProfileScreen() {
    const [user, setUser] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const stored = await AsyncStorage.getItem(USER_KEY);
            if (stored) {
                setUser(JSON.parse(stored));
            }
        } catch (error) {
            console.error("사용자 정보 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    const saveUser = async () => {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
            Alert.alert("성공", "프로필이 저장되었습니다");
        } catch (error) {
            Alert.alert("오류", "저장에 실패했습니다");
        }
    };

    const clearUser = async () => {
        try {
            await AsyncStorage.removeItem(USER_KEY);
            setUser({ name: "", email: "" });
            Alert.alert("성공", "프로필이 삭제되었습니다");
        } catch (error) {
            Alert.alert("오류", "삭제에 실패했습니다");
        }
    };

    if (loading) {
        return <Text>로딩 중...</Text>;
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="이름"
                value={user.name}
                onChangeText={(text) => setUser({ ...user, name: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="이메일"
                value={user.email}
                onChangeText={(text) => setUser({ ...user, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={saveUser}>
                <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, styles.clearButton]}
                onPress={clearUser}
            >
                <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    button: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10,
    },
    clearButton: {
        backgroundColor: "#ff0000",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

### 여러 키 한 번에 저장/불러오기

```javascript
import AsyncStorage from "@react-native-async-storage/async-storage";

// 여러 키 한 번에 저장
async function saveMultipleItems() {
    try {
        const items = [
            ["key1", "value1"],
            ["key2", "value2"],
            ["key3", "value3"],
        ];
        await AsyncStorage.multiSet(items);
    } catch (error) {
        console.error("저장 실패:", error);
    }
}

// 여러 키 한 번에 불러오기
async function loadMultipleItems() {
    try {
        const keys = ["key1", "key2", "key3"];
        const values = await AsyncStorage.multiGet(keys);
        // values는 [["key1", "value1"], ["key2", "value2"], ...] 형태
        const data = Object.fromEntries(values);
        return data;
    } catch (error) {
        console.error("불러오기 실패:", error);
    }
}

// 여러 키 한 번에 삭제
async function removeMultipleItems() {
    try {
        const keys = ["key1", "key2", "key3"];
        await AsyncStorage.multiRemove(keys);
    } catch (error) {
        console.error("삭제 실패:", error);
    }
}
```

### AsyncStorage 유틸리티 함수

```javascript
// utils/storage.js
import AsyncStorage from "@react-native-async-storage/async-storage";

class Storage {
    // 문자열 저장
    async setItem(key, value) {
        try {
            await AsyncStorage.setItem(key, value);
            return true;
        } catch (error) {
            console.error(`Storage setItem error: ${key}`, error);
            return false;
        }
    }

    // 문자열 불러오기
    async getItem(key) {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            console.error(`Storage getItem error: ${key}`, error);
            return null;
        }
    }

    // 객체 저장
    async setObject(key, object) {
        try {
            const json = JSON.stringify(object);
            await AsyncStorage.setItem(key, json);
            return true;
        } catch (error) {
            console.error(`Storage setObject error: ${key}`, error);
            return false;
        }
    }

    // 객체 불러오기
    async getObject(key) {
        try {
            const json = await AsyncStorage.getItem(key);
            if (json) {
                return JSON.parse(json);
            }
            return null;
        } catch (error) {
            console.error(`Storage getObject error: ${key}`, error);
            return null;
        }
    }

    // 삭제
    async removeItem(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Storage removeItem error: ${key}`, error);
            return false;
        }
    }

    // 모든 키 가져오기
    async getAllKeys() {
        try {
            return await AsyncStorage.getAllKeys();
        } catch (error) {
            console.error("Storage getAllKeys error", error);
            return [];
        }
    }

    // 전체 삭제
    async clear() {
        try {
            await AsyncStorage.clear();
            return true;
        } catch (error) {
            console.error("Storage clear error", error);
            return false;
        }
    }
}

export const storage = new Storage();
```

### 커스텀 훅으로 AsyncStorage 사용

```javascript
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useAsyncStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(initialValue);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStoredValue();
    }, [key]);

    const loadStoredValue = async () => {
        try {
            const item = await AsyncStorage.getItem(key);
            if (item !== null) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(`Error loading ${key}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const setValue = useCallback(
        async (value) => {
            try {
                const valueToStore =
                    value instanceof Function ? value(storedValue) : value;
                setStoredValue(valueToStore);
                await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
            } catch (error) {
                console.error(`Error saving ${key}:`, error);
            }
        },
        [key, storedValue]
    );

    const removeValue = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(key);
            setStoredValue(initialValue);
        } catch (error) {
            console.error(`Error removing ${key}:`, error);
        }
    }, [key, initialValue]);

    return [storedValue, setValue, removeValue, loading];
}

// 사용 예시
function MyComponent() {
    const [user, setUser, removeUser, loading] = useAsyncStorage("user", {
        name: "",
        email: "",
    });

    if (loading) {
        return <Text>로딩 중...</Text>;
    }

    return (
        <View>
            <Text>이름: {user.name}</Text>
            <Text>이메일: {user.email}</Text>
            <TouchableOpacity
                onPress={() =>
                    setUser({ name: "홍길동", email: "hong@example.com" })
                }
            >
                <Text>사용자 설정</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={removeUser}>
                <Text>삭제</Text>
            </TouchableOpacity>
        </View>
    );
}
```

## ⚠️ 주의사항

### 용량 제한

-   AsyncStorage는 약 6MB 정도의 용량 제한이 있습니다
-   큰 데이터는 저장하지 않는 것이 좋습니다
-   이미지나 파일은 파일 시스템에 저장해야 합니다

### 비동기 처리

-   모든 AsyncStorage 작업은 비동기입니다
-   await 또는 .then()을 사용해야 합니다
-   에러 처리를 항상 포함해야 합니다

### 데이터 형식

-   AsyncStorage는 문자열만 저장할 수 있습니다
-   객체나 배열은 JSON.stringify()로 변환해야 합니다
-   불러올 때는 JSON.parse()로 변환해야 합니다

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. AsyncStorage로 데이터 저장하기
2. 저장된 데이터 불러오기
3. 사용자 설정 저장하기
4. 데이터 삭제하기
5. 커스텀 훅으로 AsyncStorage 관리하기

## 📝 정리

-   **AsyncStorage**: 비동기 키-값 저장소
-   **setItem**: 데이터 저장
-   **getItem**: 데이터 불러오기
-   **removeItem**: 데이터 삭제
-   **clear**: 전체 삭제
-   객체는 JSON.stringify/parse 필요
-   모든 작업은 비동기로 처리됨
-   용량 제한 약 6MB
