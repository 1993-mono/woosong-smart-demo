# 10. 네트워크 요청과 API 통신

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   `fetch` API를 사용한 HTTP 요청
-   비동기 처리 (async/await)
-   API 호출 및 응답 처리
-   에러 처리 및 로딩 상태 관리
-   RESTful API와 통신하기

## 🌐 fetch API

**fetch**는 네트워크 요청을 위한 웹 표준 API입니다. React Native에서도 동일하게 사용할 수 있습니다.

### 기본 사용법

```javascript
// GET 요청
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("에러:", error));
```

### async/await 사용

```javascript
async function fetchUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("에러:", error);
    }
}
```

## 🔑 HTTP 메서드

### GET 요청

```javascript
async function getUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("GET 요청 실패:", error);
        throw error;
    }
}
```

### POST 요청

```javascript
async function createUser(userData) {
    try {
        const response = await fetch("https://api.example.com/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("POST 요청 실패:", error);
        throw error;
    }
}
```

### PUT 요청

```javascript
async function updateUser(userId, userData) {
    try {
        const response = await fetch(
            `https://api.example.com/users/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("PUT 요청 실패:", error);
        throw error;
    }
}
```

### DELETE 요청

```javascript
async function deleteUser(userId) {
    try {
        const response = await fetch(
            `https://api.example.com/users/${userId}`,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            return { success: true };
        } else {
            throw new Error("삭제 실패");
        }
    } catch (error) {
        console.error("DELETE 요청 실패:", error);
        throw error;
    }
}
```

## 📝 헤더 설정

### 인증 토큰 포함

```javascript
async function fetchProtectedData() {
    const token = "your-auth-token";

    const response = await fetch("https://api.example.com/protected", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return data;
}
```

### 커스텀 헤더

```javascript
const response = await fetch("https://api.example.com/data", {
    headers: {
        "Content-Type": "application/json",
        "X-Custom-Header": "custom-value",
        "User-Agent": "MyApp/1.0",
    },
});
```

## 💡 실전 예제

### 기본 API 호출 컴포넌트

```javascript
import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("https://api.example.com/users");
            if (!response.ok) {
                throw new Error("데이터를 불러오는데 실패했습니다");
            }

            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#06c" />
                <Text>로딩 중...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorText}>에러: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {users.map((user) => (
                <Text key={user.id}>{user.name}</Text>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "#ff0000",
        fontSize: 16,
    },
});
```

### 폼 제출 및 API 호출

```javascript
import { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from "react-native";

function CreateUserForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email) {
            Alert.alert("오류", "모든 필드를 입력해주세요");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch("https://api.example.com/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "생성 실패");
            }

            const data = await response.json();
            Alert.alert("성공", "사용자가 생성되었습니다");
            setName("");
            setEmail("");
        } catch (error) {
            Alert.alert("오류", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="이름"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="이메일"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>제출</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

### API 유틸리티 함수

```javascript
// utils/api.js
const API_BASE_URL = "https://api.example.com";

class ApiClient {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            ...options,
        };

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("API 요청 실패:", error);
            throw error;
        }
    }

    async get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: "GET" });
    }

    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(data),
        });
    }

    async put(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.stringify(data),
        });
    }

    async delete(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: "DELETE" });
    }

    setAuthToken(token) {
        this.authToken = token;
    }

    getAuthHeaders() {
        if (this.authToken) {
            return {
                Authorization: `Bearer ${this.authToken}`,
            };
        }
        return {};
    }
}

export const apiClient = new ApiClient();

// 사용 예시
export const userApi = {
    getAll: () => apiClient.get("/users"),
    getById: (id) => apiClient.get(`/users/${id}`),
    create: (userData) => apiClient.post("/users", userData),
    update: (id, userData) => apiClient.put(`/users/${id}`, userData),
    delete: (id) => apiClient.delete(`/users/${id}`),
};
```

### 커스텀 훅으로 API 호출

```javascript
import { useState, useEffect } from "react";
import { userApi } from "../utils/api";

function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await userApi.getAll();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const createUser = async (userData) => {
        try {
            const newUser = await userApi.create(userData);
            setUsers((prev) => [...prev, newUser]);
            return newUser;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const deleteUser = async (id) => {
        try {
            await userApi.delete(id);
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return {
        users,
        loading,
        error,
        refetch: fetchUsers,
        createUser,
        deleteUser,
    };
}

// 사용 예시
function UserListScreen() {
    const { users, loading, error, createUser, deleteUser } = useUsers();

    if (loading) return <ActivityIndicator />;
    if (error) return <Text>에러: {error}</Text>;

    return (
        <View>
            {users.map((user) => (
                <View key={user.id}>
                    <Text>{user.name}</Text>
                    <TouchableOpacity onPress={() => deleteUser(user.id)}>
                        <Text>삭제</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}
```

## 🔄 에러 처리

### 네트워크 에러 처리

```javascript
async function fetchData() {
    try {
        const response = await fetch("https://api.example.com/data");
        const data = await response.json();
        return data;
    } catch (error) {
        if (error.message === "Network request failed") {
            console.error("네트워크 연결을 확인해주세요");
        } else {
            console.error("알 수 없는 오류:", error);
        }
        throw error;
    }
}
```

### HTTP 상태 코드 처리

```javascript
async function fetchData() {
    const response = await fetch("https://api.example.com/data");

    if (response.status === 404) {
        throw new Error("데이터를 찾을 수 없습니다");
    } else if (response.status === 401) {
        throw new Error("인증이 필요합니다");
    } else if (response.status === 500) {
        throw new Error("서버 오류가 발생했습니다");
    } else if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}
```

## ⏱️ 타임아웃 설정

```javascript
function fetchWithTimeout(url, options = {}, timeout = 10000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("요청 시간 초과")), timeout)
        ),
    ]);
}

// 사용 예시
try {
    const response = await fetchWithTimeout(
        "https://api.example.com/data",
        {},
        5000
    );
    const data = await response.json();
} catch (error) {
    console.error("타임아웃:", error);
}
```

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. fetch API로 GET 요청하기
2. POST 요청으로 데이터 생성하기
3. 에러 처리 및 로딩 상태 관리하기
4. API 유틸리티 함수 만들기
5. 커스텀 훅으로 API 호출 관리하기

## 📝 정리

-   **fetch**: 네트워크 요청을 위한 웹 표준 API
-   **async/await**: 비동기 코드를 동기처럼 작성
-   **GET**: 데이터 조회
-   **POST**: 데이터 생성
-   **PUT**: 데이터 수정
-   **DELETE**: 데이터 삭제
-   **에러 처리**: try-catch로 에러 처리
-   **로딩 상태**: 사용자 경험을 위해 로딩 상태 관리 필요
