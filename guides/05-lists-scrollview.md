# 05. 리스트와 스크롤뷰

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   ScrollView 컴포넌트의 사용법과 특징
-   FlatList 컴포넌트의 사용법과 성능 최적화
-   ScrollView와 FlatList의 차이점과 사용 시기
-   리스트 아이템 상호작용 구현 방법
-   Pull-to-refresh와 무한 스크롤 구현

## 📜 ScrollView

**ScrollView**는 스크롤 가능한 컨테이너 컴포넌트입니다. 모든 자식 요소를 한 번에 렌더링합니다.

### 특징

-   모든 자식 요소를 한 번에 렌더링
-   적은 수의 아이템에 적합 (10~20개 이하)
-   세로/가로 스크롤 지원
-   스크롤 이벤트 감지 가능
-   고정된 레이아웃의 스크롤 콘텐츠에 적합

### 기본 사용법

```javascript
import { ScrollView, View, Text } from "react-native";

function ScrollExample() {
    return (
        <ScrollView>
            <View>
                <Text>아이템 1</Text>
            </View>
            <View>
                <Text>아이템 2</Text>
            </View>
            <View>
                <Text>아이템 3</Text>
            </View>
        </ScrollView>
    );
}
```

### 주요 속성

-   `contentContainerStyle`: 콘텐츠 컨테이너의 스타일
-   `showsVerticalScrollIndicator`: 세로 스크롤바 표시 여부 (기본값: true)
-   `showsHorizontalScrollIndicator`: 가로 스크롤바 표시 여부 (기본값: true)
-   `onScroll`: 스크롤 이벤트 발생 시 호출되는 함수
-   `scrollEventThrottle`: 스크롤 이벤트 호출 빈도 (밀리초, 기본값: 0)
-   `horizontal`: 가로 스크롤 여부 (기본값: false)

### ScrollView 스타일링

```javascript
import { ScrollView, StyleSheet } from "react-native";

<ScrollView
    contentContainerStyle={styles.contentContainer}
    showsVerticalScrollIndicator={false}
>
    {/* 내용 */}
</ScrollView>;

const styles = StyleSheet.create({
    contentContainer: {
        padding: 20,
        gap: 10,
    },
});
```

### 스크롤 이벤트 처리

```javascript
import { useState } from "react";
import { ScrollView, Text } from "react-native";

function ScrollWithEvent() {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = (event) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        setScrollY(currentScrollY);
    };

    return (
        <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={16} // 16ms마다 이벤트 발생
        >
            <Text>스크롤 위치: {scrollY}</Text>
            {/* 내용 */}
        </ScrollView>
    );
}
```

## 📋 FlatList

**FlatList**는 효율적인 리스트 렌더링을 위한 컴포넌트입니다. 가상화(Virtualization) 기능을 통해 화면에 보이는 아이템만 렌더링합니다.

### 특징

-   가상화: 화면에 보이는 아이템만 렌더링
-   대량 데이터 처리에 적합
-   자동 성능 최적화
-   Pull-to-refresh, 무한 스크롤 등 기능 제공
-   동적 리스트에 최적화

### 기본 사용법

```javascript
import { FlatList, Text, View } from "react-native";

const data = [
    { id: "1", name: "아이템 1" },
    { id: "2", name: "아이템 2" },
    { id: "3", name: "아이템 3" },
];

function ListExample() {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View>
                    <Text>{item.name}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}
```

### 필수 속성

#### data

렌더링할 데이터 배열입니다.

```javascript
const data = [
    { id: "1", title: "제목 1" },
    { id: "2", title: "제목 2" },
];

<FlatList data={data} />;
```

#### renderItem

각 아이템을 렌더링하는 함수입니다. `{ item, index }` 객체를 매개변수로 받습니다.

```javascript
renderItem={({ item, index }) => (
    <View>
        <Text>{index + 1}. {item.title}</Text>
    </View>
)}
```

#### keyExtractor

각 아이템의 고유 키를 추출하는 함수입니다. React의 key prop에 사용됩니다.

```javascript
keyExtractor={(item, index) => item.id} // id를 키로 사용
keyExtractor={(item, index) => index.toString()} // 인덱스를 키로 사용 (권장하지 않음)
```

### 주요 속성

#### 스타일링

-   `ItemSeparatorComponent`: 아이템 사이에 표시할 구분선 컴포넌트
-   `ListHeaderComponent`: 리스트 상단에 표시할 컴포넌트
-   `ListFooterComponent`: 리스트 하단에 표시할 컴포넌트
-   `contentContainerStyle`: 콘텐츠 컨테이너의 스타일

```javascript
<FlatList
    data={data}
    renderItem={({ item }) => <Text>{item.name}</Text>}
    keyExtractor={(item) => item.id}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    ListHeaderComponent={() => <Text style={styles.header}>목록</Text>}
    ListFooterComponent={() => <Text style={styles.footer}>끝</Text>}
    contentContainerStyle={styles.listContainer}
/>
```

#### 성능 최적화

-   `getItemLayout`: 아이템의 크기를 미리 알 때 성능 향상
-   `initialNumToRender`: 초기 렌더링할 아이템 수 (기본값: 10)
-   `maxToRenderPerBatch`: 한 번에 렌더링할 최대 아이템 수 (기본값: 10)
-   `windowSize`: 렌더링할 윈도우 크기 (기본값: 21)

```javascript
<FlatList
    data={data}
    renderItem={({ item }) => <Text>{item.name}</Text>}
    keyExtractor={(item) => item.id}
    getItemLayout={(data, index) => ({
        length: 50, // 각 아이템의 높이
        offset: 50 * index, // 현재 위치
        index,
    })}
    initialNumToRender={10}
    maxToRenderPerBatch={10}
/>
```

#### 기능

-   `onRefresh`: Pull-to-refresh 핸들러
-   `refreshing`: 새로고침 중 상태
-   `onEndReached`: 끝에 도달했을 때 호출 (무한 스크롤)
-   `onEndReachedThreshold`: 끝 도달 감지 임계값 (0.0 ~ 1.0, 기본값: 0.5)

```javascript
const [refreshing, setRefreshing] = useState(false);

const handleRefresh = () => {
    setRefreshing(true);
    // 데이터 새로고침
    setTimeout(() => {
        setRefreshing(false);
    }, 2000);
};

const handleEndReached = () => {
    // 더 많은 데이터 로드
    loadMoreData();
};

<FlatList
    data={data}
    renderItem={({ item }) => <Text>{item.name}</Text>}
    keyExtractor={(item) => item.id}
    onRefresh={handleRefresh}
    refreshing={refreshing}
    onEndReached={handleEndReached}
    onEndReachedThreshold={0.5}
/>;
```

## 🔄 ScrollView vs FlatList 비교

| 항목            | ScrollView                     | FlatList                           |
| --------------- | ------------------------------ | ---------------------------------- |
| 렌더링 방식     | 모든 아이템 한 번에 렌더링     | 화면에 보이는 것만 렌더링 (가상화) |
| 성능            | 적은 데이터에 적합             | 많은 데이터에 적합                 |
| 사용 케이스     | 고정된 레이아웃, 폼, 설정 화면 | 동적 리스트, 피드, 대량 데이터     |
| 메모리 사용     | 높음 (모든 아이템 로드)        | 낮음 (필요한 것만 로드)            |
| 스크롤 성능     | 아이템이 많으면 느려짐         | 대량 데이터도 부드러움             |
| Pull-to-refresh | 직접 구현 필요                 | 내장 기능 제공                     |
| 무한 스크롤     | 직접 구현 필요                 | 내장 기능 제공                     |

### 언제 무엇을 사용할까?

**ScrollView 사용:**

-   아이템이 10~20개 이하일 때
-   고정된 레이아웃의 스크롤 콘텐츠
-   폼이나 설정 화면처럼 아이템 수가 적을 때

**FlatList 사용:**

-   아이템이 많거나 동적으로 변할 때
-   성능이 중요한 리스트
-   데이터가 배열 형태일 때
-   Pull-to-refresh나 무한 스크롤이 필요할 때

## 💡 실전 예제

### 간단한 리스트

```javascript
import { FlatList, View, Text, StyleSheet } from "react-native";

const users = [
    { id: "1", name: "홍길동", email: "hong@example.com" },
    { id: "2", name: "김철수", email: "kim@example.com" },
    { id: "3", name: "이영희", email: "lee@example.com" },
];

function UserList() {
    return (
        <FlatList
            data={users}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.email}>{item.email}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    email: {
        fontSize: 14,
        color: "#666",
        marginTop: 5,
    },
});
```

### 리스트 아이템 클릭 이벤트

```javascript
import {
    FlatList,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from "react-native";

function ItemList() {
    const data = [
        { id: "1", title: "아이템 1" },
        { id: "2", title: "아이템 2" },
        { id: "3", title: "아이템 3" },
    ];

    const handleItemPress = (item) => {
        console.log("선택된 아이템:", item.title);
        // 상세 화면으로 이동하거나 다른 작업 수행
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.item}
                    onPress={() => handleItemPress(item)}
                    activeOpacity={0.7}
                >
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    title: {
        fontSize: 16,
    },
});
```

### Pull-to-refresh

```javascript
import { useState } from "react";
import { FlatList, View, Text, RefreshControl, StyleSheet } from "react-native";

function RefreshableList() {
    const [data, setData] = useState([
        { id: "1", title: "아이템 1" },
        { id: "2", title: "아이템 2" },
        { id: "3", title: "아이템 3" },
    ]);
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        // API 호출 시뮬레이션
        setTimeout(() => {
            // 새로운 데이터로 업데이트
            setData([
                { id: "1", title: "새 아이템 1" },
                { id: "2", title: "새 아이템 2" },
                { id: "3", title: "새 아이템 3" },
            ]);
            setRefreshing(false);
        }, 2000);
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text>{item.title}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
            }
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
});
```

### 무한 스크롤 (Infinite Scroll)

```javascript
import { useState, useEffect } from "react";
import {
    FlatList,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

function InfiniteList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadData(1);
    }, []);

    const loadData = async (pageNum) => {
        setLoading(true);
        // API 호출 시뮬레이션
        setTimeout(() => {
            const newData = Array.from({ length: 10 }, (_, i) => ({
                id: `${pageNum}-${i}`,
                title: `아이템 ${(pageNum - 1) * 10 + i + 1}`,
            }));
            setData((prev) => [...prev, ...newData]);
            setLoading(false);
        }, 1000);
    };

    const handleEndReached = () => {
        if (!loading) {
            const nextPage = page + 1;
            setPage(nextPage);
            loadData(nextPage);
        }
    };

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text>{item.title}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loading ? <ActivityIndicator size="large" /> : null
            }
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
});
```

### 구분선이 있는 리스트

```javascript
import { FlatList, View, Text, StyleSheet } from "react-native";

function SeparatedList() {
    const data = [
        { id: "1", title: "아이템 1" },
        { id: "2", title: "아이템 2" },
        { id: "3", title: "아이템 3" },
    ];

    const Separator = () => <View style={styles.separator} />;

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => (
                <View style={styles.item}>
                    <Text>{item.title}</Text>
                </View>
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={Separator}
        />
    );
}

const styles = StyleSheet.create({
    item: {
        padding: 15,
        backgroundColor: "#fff",
    },
    separator: {
        height: 1,
        backgroundColor: "#eee",
        marginLeft: 15,
    },
});
```

## 🎨 리스트 스타일링 팁

### 리스트 아이템 스타일

```javascript
const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff",
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    itemContent: {
        flex: 1,
        marginLeft: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    itemSubtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
});
```

### 리스트 컨테이너 스타일

```javascript
<FlatList
    data={data}
    renderItem={({ item }) => <ItemComponent item={item} />}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.listContainer}
/>;

const styles = StyleSheet.create({
    listContainer: {
        padding: 15,
        gap: 10,
    },
});
```

## 📝 실습 준비

다음 실습에서는 다음을 해볼 것입니다:

1. ScrollView로 스크롤 가능한 콘텐츠 만들기
2. FlatList로 리스트 구현하기
3. 리스트 아이템 클릭 이벤트 처리
4. Pull-to-refresh 기능 구현
5. 무한 스크롤 구현

## 📝 정리

-   **ScrollView**: 모든 아이템을 한 번에 렌더링하는 스크롤 컨테이너
-   **FlatList**: 가상화를 통한 효율적인 리스트 렌더링
-   **data**: 렌더링할 데이터 배열
-   **renderItem**: 각 아이템을 렌더링하는 함수
-   **keyExtractor**: 각 아이템의 고유 키 추출 함수
-   **ItemSeparatorComponent**: 아이템 사이 구분선
-   **onRefresh**: Pull-to-refresh 핸들러
-   **onEndReached**: 무한 스크롤 핸들러
-   적은 데이터는 ScrollView, 많은 데이터는 FlatList 사용
