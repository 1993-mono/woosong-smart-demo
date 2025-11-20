# 15. 실전 프로젝트 통합

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   지금까지 배운 내용을 통합하여 완성형 앱 만들기
-   컴포넌트 구조 설계
-   상태 관리 및 데이터 흐름
-   네비게이션과 화면 전환
-   API 통신 및 데이터 저장
-   사용자 경험 개선

## 🎯 프로젝트 개요

이번 단계에서는 지금까지 배운 모든 내용을 활용하여 **할 일 관리 앱(Todo App)**을 만들어보겠습니다.

### 주요 기능

1. 할 일 목록 보기
2. 할 일 추가하기
3. 할 일 완료/미완료 토글
4. 할 일 삭제하기
5. 할 일 수정하기
6. 데이터 로컬 저장 (AsyncStorage)
7. 네비게이션 (홈, 상세, 설정 화면)

## 📁 프로젝트 구조

```
app/
  _layout.js                    # 루트 레이아웃
  index.js                      # 홈 화면 (할 일 목록)
  todo-detail.js                # 할 일 상세 화면
  settings.js                   # 설정 화면
components/
  TodoItem.js                   # 할 일 아이템 컴포넌트
  TodoForm.js                   # 할 일 입력 폼 컴포넌트
  LoadingSpinner.js             # 로딩 스피너 컴포넌트
utils/
  storage.js                    # AsyncStorage 유틸리티
  api.js                        # API 호출 유틸리티 (선택사항)
constants/
  theme.js                      # 테마 상수
```

## 💡 핵심 컴포넌트 구현

### 1. 할 일 아이템 컴포넌트

```javascript
// components/TodoItem.js
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TodoItem({ todo, onToggle, onDelete, onPress }) {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <TouchableOpacity
                style={styles.checkbox}
                onPress={() => onToggle(todo.id)}
            >
                <Ionicons
                    name={
                        todo.completed ? "checkmark-circle" : "ellipse-outline"
                    }
                    size={24}
                    color={todo.completed ? "#06c" : "#ccc"}
                />
            </TouchableOpacity>
            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        todo.completed && styles.completedTitle,
                    ]}
                >
                    {todo.title}
                </Text>
                {todo.description && (
                    <Text style={styles.description}>{todo.description}</Text>
                )}
            </View>
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => onDelete(todo.id)}
            >
                <Ionicons name="trash-outline" size={20} color="#ff0000" />
            </TouchableOpacity>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    checkbox: {
        marginRight: 15,
    },
    content: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },
    completedTitle: {
        textDecorationLine: "line-through",
        color: "#999",
    },
    description: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    deleteButton: {
        padding: 5,
    },
});
```

### 2. 할 일 입력 폼 컴포넌트

```javascript
// components/TodoForm.js
import { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
    Modal,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TodoForm({ visible, onClose, onSubmit, initialData }) {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(
        initialData?.description || ""
    );

    const handleSubmit = () => {
        if (title.trim()) {
            onSubmit({
                title: title.trim(),
                description: description.trim(),
            });
            setTitle("");
            setDescription("");
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {initialData ? "할 일 수정" : "할 일 추가"}
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="제목"
                        value={title}
                        onChangeText={setTitle}
                        autoFocus
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="설명 (선택사항)"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                    >
                        <Text style={styles.submitButtonText}>
                            {initialData ? "수정" : "추가"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: Platform.select({ ios: 40, android: 20 }),
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    textArea: {
        minHeight: 100,
    },
    submitButton: {
        backgroundColor: "#06c",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

### 3. 홈 화면 (할 일 목록)

```javascript
// app/index.js
import { useState, useEffect, useCallback } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Platform,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";
import { storage } from "../utils/storage";

const STORAGE_KEY = "todos";

export default function HomeScreen() {
    const router = useRouter();
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formVisible, setFormVisible] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    // 데이터 불러오기
    const loadTodos = async () => {
        try {
            const stored = await storage.getObject(STORAGE_KEY);
            if (stored) {
                setTodos(stored);
            }
        } catch (error) {
            console.error("할 일 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    // 데이터 저장
    const saveTodos = async (newTodos) => {
        try {
            await storage.setObject(STORAGE_KEY, newTodos);
            setTodos(newTodos);
        } catch (error) {
            console.error("할 일 저장 실패:", error);
            Alert.alert("오류", "저장에 실패했습니다");
        }
    };

    useEffect(() => {
        loadTodos();
    }, []);

    // 화면 포커스 시 데이터 새로고침
    useFocusEffect(
        useCallback(() => {
            loadTodos();
        }, [])
    );

    // 할 일 추가
    const handleAdd = async (data) => {
        const newTodo = {
            id: Date.now().toString(),
            ...data,
            completed: false,
            createdAt: new Date().toISOString(),
        };
        const newTodos = [newTodo, ...todos];
        await saveTodos(newTodos);
    };

    // 할 일 수정
    const handleEdit = async (data) => {
        const newTodos = todos.map((todo) =>
            todo.id === editingTodo.id
                ? { ...todo, ...data, updatedAt: new Date().toISOString() }
                : todo
        );
        await saveTodos(newTodos);
        setEditingTodo(null);
    };

    // 할 일 토글
    const handleToggle = async (id) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        await saveTodos(newTodos);
    };

    // 할 일 삭제
    const handleDelete = (id) => {
        Alert.alert("삭제", "정말로 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: async () => {
                    const newTodos = todos.filter((todo) => todo.id !== id);
                    await saveTodos(newTodos);
                },
            },
        ]);
    };

    // 할 일 상세 화면으로 이동
    const handlePress = (todo) => {
        router.push({
            pathname: "/todo-detail",
            params: { id: todo.id },
        });
    };

    // 수정 모달 열기
    const openEditModal = (todo) => {
        setEditingTodo(todo);
        setFormVisible(true);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>로딩 중...</Text>
            </View>
        );
    }

    const completedCount = todos.filter((todo) => todo.completed).length;
    const totalCount = todos.length;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>할 일 목록</Text>
                <Text style={styles.headerSubtitle}>
                    {completedCount} / {totalCount} 완료
                </Text>
            </View>

            <FlatList
                data={todos}
                renderItem={({ item }) => (
                    <TodoItem
                        todo={item}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                        onPress={() => handlePress(item)}
                    />
                )}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Ionicons
                            name="checkmark-done-circle"
                            size={64}
                            color="#ccc"
                        />
                        <Text style={styles.emptyText}>할 일이 없습니다</Text>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => {
                    setEditingTodo(null);
                    setFormVisible(true);
                }}
            >
                <Ionicons name="add" size={32} color="#fff" />
            </TouchableOpacity>

            <TodoForm
                visible={formVisible}
                onClose={() => {
                    setFormVisible(false);
                    setEditingTodo(null);
                }}
                onSubmit={editingTodo ? handleEdit : handleAdd}
                initialData={editingTodo}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#fff",
        padding: 20,
        paddingTop: Platform.select({ ios: 60, android: 20 }),
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
    },
    headerSubtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    list: {
        padding: 15,
    },
    empty: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: "#999",
    },
    fab: {
        position: "absolute",
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#06c",
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            },
            android: {
                elevation: 8,
            },
        }),
    },
});
```

### 4. 할 일 상세 화면

```javascript
// app/todo-detail.js
import { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Platform,
    Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { storage } from "../utils/storage";

const STORAGE_KEY = "todos";

export default function TodoDetailScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadTodo();
    }, [id]);

    const loadTodo = async () => {
        try {
            const todos = (await storage.getObject(STORAGE_KEY)) || [];
            const found = todos.find((t) => t.id === id);
            if (found) {
                setTodo(found);
            } else {
                Alert.alert("오류", "할 일을 찾을 수 없습니다", [
                    { text: "확인", onPress: () => router.back() },
                ]);
            }
        } catch (error) {
            console.error("할 일 불러오기 실패:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async () => {
        try {
            const todos = (await storage.getObject(STORAGE_KEY)) || [];
            const newTodos = todos.map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
            );
            await storage.setObject(STORAGE_KEY, newTodos);
            setTodo({ ...todo, completed: !todo.completed });
        } catch (error) {
            Alert.alert("오류", "업데이트에 실패했습니다");
        }
    };

    const handleDelete = () => {
        Alert.alert("삭제", "정말로 삭제하시겠습니까?", [
            { text: "취소", style: "cancel" },
            {
                text: "삭제",
                style: "destructive",
                onPress: async () => {
                    try {
                        const todos =
                            (await storage.getObject(STORAGE_KEY)) || [];
                        const newTodos = todos.filter((t) => t.id !== id);
                        await storage.setObject(STORAGE_KEY, newTodos);
                        router.back();
                    } catch (error) {
                        Alert.alert("오류", "삭제에 실패했습니다");
                    }
                },
            },
        ]);
    };

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>로딩 중...</Text>
            </View>
        );
    }

    if (!todo) {
        return null;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#06c" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>할 일 상세</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.content}>
                <View style={styles.statusBadge}>
                    <Ionicons
                        name={
                            todo.completed
                                ? "checkmark-circle"
                                : "ellipse-outline"
                        }
                        size={20}
                        color={todo.completed ? "#06c" : "#ccc"}
                    />
                    <Text style={styles.statusText}>
                        {todo.completed ? "완료" : "미완료"}
                    </Text>
                </View>

                <Text style={styles.title}>{todo.title}</Text>
                {todo.description && (
                    <Text style={styles.description}>{todo.description}</Text>
                )}

                <View style={styles.meta}>
                    <Text style={styles.metaText}>
                        생성일: {new Date(todo.createdAt).toLocaleDateString()}
                    </Text>
                    {todo.updatedAt && (
                        <Text style={styles.metaText}>
                            수정일:{" "}
                            {new Date(todo.updatedAt).toLocaleDateString()}
                        </Text>
                    )}
                </View>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={[
                            styles.actionButton,
                            todo.completed
                                ? styles.completeButton
                                : styles.incompleteButton,
                        ]}
                        onPress={handleToggle}
                    >
                        <Ionicons
                            name={todo.completed ? "refresh" : "checkmark"}
                            size={20}
                            color="#fff"
                        />
                        <Text style={styles.actionButtonText}>
                            {todo.completed ? "미완료로 변경" : "완료로 변경"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.actionButton, styles.deleteButton]}
                        onPress={handleDelete}
                    >
                        <Ionicons name="trash" size={20} color="#fff" />
                        <Text style={styles.actionButtonText}>삭제</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 15,
        paddingTop: Platform.select({ ios: 60, android: 15 }),
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "600",
    },
    content: {
        backgroundColor: "#fff",
        margin: 15,
        padding: 20,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    statusText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#666",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 15,
    },
    description: {
        fontSize: 16,
        color: "#666",
        lineHeight: 24,
        marginBottom: 20,
    },
    meta: {
        borderTopWidth: 1,
        borderTopColor: "#eee",
        paddingTop: 15,
        marginBottom: 20,
    },
    metaText: {
        fontSize: 12,
        color: "#999",
        marginBottom: 5,
    },
    actions: {
        gap: 10,
    },
    actionButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
        borderRadius: 8,
        gap: 8,
    },
    completeButton: {
        backgroundColor: "#06c",
    },
    incompleteButton: {
        backgroundColor: "#28a745",
    },
    deleteButton: {
        backgroundColor: "#dc3545",
    },
    actionButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
});
```

## 📝 실습 준비

이제 완성된 할 일 관리 앱을 실행해보세요:

1. 할 일 추가하기
2. 할 일 완료/미완료 토글하기
3. 할 일 상세 보기
4. 할 일 삭제하기
5. 앱을 재시작해도 데이터가 유지되는지 확인하기

## 🎉 완성!

축하합니다! 지금까지 배운 모든 내용을 활용하여 완성형 앱을 만들었습니다.

### 배운 내용 요약

-   ✅ 기본 컴포넌트 (View, Text, Image)
-   ✅ 레이아웃과 스타일링 (Flexbox)
-   ✅ 상태 관리 (useState)
-   ✅ 이벤트 처리 (TouchableOpacity)
-   ✅ 리스트 (FlatList)
-   ✅ 입력 (TextInput)
-   ✅ 이미지 (Image)
-   ✅ 모달 (Modal)
-   ✅ 네비게이션 (Expo Router)
-   ✅ 데이터 저장 (AsyncStorage)
-   ✅ 플랫폼별 처리 (Platform API)
-   ✅ 아이콘 (@expo/vector-icons)

## 🚀 다음 단계

이제 더 많은 기능을 추가해보세요:

-   할 일 검색 기능
-   할 일 필터링 (완료/미완료)
-   할 일 정렬 (날짜, 제목 등)
-   카테고리/태그 기능
-   알림 기능
-   다크 모드
-   백업/복원 기능

## 📝 정리

-   모든 기능을 통합하여 완성형 앱 구현
-   컴포넌트 재사용성 고려
-   상태 관리 및 데이터 흐름 설계
-   사용자 경험 개선
-   플랫폼별 차이 고려
-   에러 처리 및 로딩 상태 관리

## 🎓 마무리

React Native의 기본기를 모두 배웠습니다! 이제 자신만의 앱을 만들어보세요!
