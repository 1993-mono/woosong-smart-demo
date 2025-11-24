# 10. 네트워크 요청과 API 통신

## 📖 학습 목표

이 가이드를 마치면 다음을 이해할 수 있습니다:

-   `fetch` API를 사용한 HTTP 요청
-   Promise, .then(), .catch()의 개념과 사용법
-   async/await를 사용한 비동기 처리
-   try-catch-finally를 사용한 에러 처리
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

### Response 객체와 json() 메서드

`fetch()`는 **Response 객체**를 반환합니다. 이 객체는 서버로부터 받은 응답에 대한 정보를 담고 있습니다.

#### Response 객체의 주요 속성

```javascript
const response = await fetch("https://api.example.com/users");

// Response 객체의 주요 속성들
console.log(response.ok); // true 또는 false (200-299 범위면 true)
console.log(response.status); // HTTP 상태 코드 (200, 404, 500 등)
console.log(response.statusText); // 상태 텍스트 ("OK", "Not Found" 등)
console.log(response.headers); // 응답 헤더 정보
```

#### json() 메서드란?

**`json()`**은 Response 객체의 메서드로, 응답 본문(body)을 **JSON 형식으로 파싱**하여 JavaScript 객체로 변환합니다.

**왜 필요한가?**

서버에서 받은 데이터는 아직 **문자열 형태**입니다. 예를 들어:

```javascript
// 서버에서 받은 원시 데이터 (문자열)
'{"users":[{"id":1,"name":"홍길동"}]}';

// json()으로 파싱하면 JavaScript 객체로 변환됨
{
    users: [{ id: 1, name: "홍길동" }];
}
```

**사용법:**

```javascript
// 방법 1: .then() 사용
fetch("https://api.example.com/users")
    .then((response) => response.json()) // JSON 파싱
    .then((data) => {
        // data는 이미 JavaScript 객체
        console.log(data.users);
    });

// 방법 2: async/await 사용
const response = await fetch("https://api.example.com/users");
const data = await response.json(); // JSON 파싱
console.log(data.users);
```

**중요한 점:**

1. **`json()`은 Promise를 반환합니다**: 비동기 작업이므로 `await`나 `.then()`을 사용해야 합니다
2. **한 번만 호출 가능**: Response 본문은 스트림이므로 한 번만 읽을 수 있습니다
3. **에러 처리 필요**: 잘못된 JSON 형식이면 에러가 발생합니다

```javascript
// ❌ 잘못된 사용: json()을 두 번 호출하면 에러 발생
const response = await fetch("https://api.example.com/users");
const data1 = await response.json(); // 첫 번째 호출: 성공
const data2 = await response.json(); // 두 번째 호출: 에러!

// ✅ 올바른 사용: 한 번만 호출하고 변수에 저장
const response = await fetch("https://api.example.com/users");
const data = await response.json();
console.log(data); // 여러 번 사용 가능
```

#### 다른 Response 메서드들

Response 객체에는 `json()` 외에도 다른 메서드들이 있습니다:

```javascript
const response = await fetch("https://api.example.com/data");

// JSON으로 파싱
const jsonData = await response.json();

// 텍스트로 읽기
const textData = await response.text();

// Blob으로 읽기 (이미지, 파일 등)
const blobData = await response.blob();

// ArrayBuffer로 읽기 (바이너리 데이터)
const bufferData = await response.arrayBuffer();
```

**언제 어떤 메서드를 사용하나?**

-   **`json()`**: JSON 형식의 데이터 (대부분의 REST API)
-   **`text()`**: 일반 텍스트 데이터
-   **`blob()`**: 이미지, PDF 등 파일 데이터
-   **`arrayBuffer()`**: 바이너리 데이터

```javascript
// JSON API 응답
const jsonResponse = await fetch("/api/users");
const users = await jsonResponse.json();

// 텍스트 파일
const textResponse = await fetch("/data.txt");
const text = await textResponse.text();

// 이미지
const imageResponse = await fetch("/image.jpg");
const imageBlob = await imageResponse.blob();
const imageUrl = URL.createObjectURL(imageBlob);
```

## ⚡ 비동기 처리 개념 상세 설명

네트워크 요청은 시간이 걸리는 작업이므로, JavaScript에서는 **비동기 처리**를 사용합니다. 비동기 처리를 위한 주요 개념들을 자세히 알아보겠습니다.

### 비동기 작업이란?

**비동기 작업(Asynchronous Operation)**은 작업이 완료될 때까지 기다리지 않고, 다른 코드를 계속 실행할 수 있는 작업입니다.

#### "동기"와 "비동기"의 의미

**동기(Synchronous)**와 **비동기(Asynchronous)**라는 단어는 **시간의 흐름**과 관련이 있습니다.

**어원:**

-   **Synchronous (동기)**:

    -   `syn` (함께) + `chronous` (시간) = **"시간을 맞춘다"**, **"동시에 일어나는"**
    -   여러 작업이 **같은 시간에 맞춰서** 순차적으로 실행됨
    -   한 작업이 끝나야 다음 작업이 시작됨 (시간을 맞춤)

-   **Asynchronous (비동기)**:
    -   `a` (부정) + `syn` (함께) + `chronous` (시간) = **"시간을 맞추지 않는"**, **"동시에 일어나지 않는"**
    -   여러 작업이 **시간을 맞추지 않고** 독립적으로 실행됨
    -   한 작업이 끝나기를 기다리지 않고 다른 작업을 시작함 (시간을 맞추지 않음)

**실생활 비유:**

**동기 (Synchronous)** - 줄서기:

```
사람1: 주문 → 대기 → 받음 → 끝
사람2:          주문 → 대기 → 받음 → 끝
사람3:                   주문 → 대기 → 받음 → 끝
```

-   한 사람이 끝나야 다음 사람이 시작 (시간을 맞춤)
-   순서대로 진행

**비동기 (Asynchronous)** - 여러 카운터:

```
카운터1: 사람1 주문 → 대기 → 받음
카운터2: 사람2 주문 → 대기 → 받음  (동시에 진행)
카운터3: 사람3 주문 → 대기 → 받음
```

-   여러 사람이 동시에 주문 가능 (시간을 맞추지 않음)
-   독립적으로 진행

**프로그래밍에서의 의미:**

```javascript
// 동기 (Synchronous) - 시간을 맞춤
console.log("1번"); // 완료될 때까지 기다림
console.log("2번"); // 1번 완료 후 실행 (시간 맞춤)
console.log("3번"); // 2번 완료 후 실행 (시간 맞춤)

// 비동기 (Asynchronous) - 시간을 맞추지 않음
console.log("1번");
setTimeout(() => {
    console.log("2번"); // 1번을 기다리지 않고 독립적으로 실행
}, 1000);
console.log("3번"); // 2번을 기다리지 않고 바로 실행
```

#### 동기 vs 비동기

**동기 작업 (Synchronous)**: 작업이 완료될 때까지 다음 코드가 실행되지 않습니다.

```javascript
// 동기 작업 예시
console.log("1번");
console.log("2번"); // 1번이 끝난 후 실행
console.log("3번"); // 2번이 끝난 후 실행

// 결과:
// 1번
// 2번
// 3번
```

**비동기 작업 (Asynchronous)**: 작업이 완료되기를 기다리지 않고 다음 코드를 실행합니다.

```javascript
// 비동기 작업 예시
console.log("1번");

setTimeout(() => {
    console.log("2번 (비동기)");
}, 1000); // 1초 후 실행

console.log("3번"); // 2번을 기다리지 않고 바로 실행

// 결과:
// 1번
// 3번
// (1초 후) 2번 (비동기)
```

#### 왜 비동기가 필요한가?

**네트워크 요청**은 시간이 오래 걸리는 작업입니다:

```javascript
// 동기 방식이라면 (실제로는 불가능)
console.log("요청 시작");
const data = fetch("https://api.example.com/users"); // 3초 걸림
console.log("데이터:", data); // 3초 동안 아무것도 못함!
console.log("다른 작업"); // 3초 후에야 실행됨

// 문제점: 3초 동안 앱이 멈춤 (사용자는 아무것도 할 수 없음)
```

**시간 관점에서 보면:**

**동기 방식 (시간을 맞춤):**

```
시간: 0초 ──────────────── 3초 ──────────────── 4초
      │                      │                      │
      요청 시작              데이터 받음            다른 작업
      (3초 동안 대기)        (시간 맞춤)           (시간 맞춤)
```

-   모든 작업이 **시간을 맞춰서** 순차적으로 실행
-   한 작업이 끝나야 다음 작업 시작

**비동기 방식 (시간을 맞추지 않음):**

```
시간: 0초 ──────────────── 3초
      │                      │
      요청 시작              데이터 받음
      다른 작업 (바로 실행)  (독립적으로 실행)
```

-   작업들이 **시간을 맞추지 않고** 독립적으로 실행
-   요청을 기다리는 동안 다른 작업도 실행 가능

**비동기 방식**을 사용하면:

```javascript
console.log("요청 시작");

fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => {
        console.log("데이터:", data); // 3초 후 실행
    });

console.log("다른 작업"); // 바로 실행됨! (3초 기다리지 않음)

// 결과:
// 요청 시작
// 다른 작업
// (3초 후) 데이터: {...}
```

**장점:**

-   앱이 멈추지 않음 (사용자는 다른 작업을 계속할 수 있음)
-   여러 작업을 동시에 처리 가능
-   사용자 경험이 좋아짐

#### 비동기 작업의 예시

JavaScript에서 비동기 작업의 대표적인 예시들:

```javascript
// 1. 네트워크 요청
fetch("https://api.example.com/users");

// 2. 타이머
setTimeout(() => {
    console.log("1초 후 실행");
}, 1000);

// 3. 파일 읽기
fs.readFile("file.txt", (err, data) => {
    console.log(data);
});

// 4. 데이터베이스 쿼리
db.query("SELECT * FROM users", (results) => {
    console.log(results);
});
```

#### 비동기 작업의 특징

1. **즉시 반환**: 작업이 완료되지 않아도 함수는 바로 반환됩니다
2. **콜백 또는 Promise**: 작업 완료 후 실행할 코드를 지정해야 합니다
3. **순서 보장 안 됨**: 비동기 작업은 시작 순서와 완료 순서가 다를 수 있습니다

```javascript
console.log("시작");

// 비동기 작업들
setTimeout(() => console.log("작업 1"), 3000); // 3초
setTimeout(() => console.log("작업 2"), 1000); // 1초
setTimeout(() => console.log("작업 3"), 2000); // 2초

console.log("끝");

// 결과:
// 시작
// 끝
// (1초 후) 작업 2
// (2초 후) 작업 3
// (3초 후) 작업 1
```

#### 실제 예시: 네트워크 요청

```javascript
// 동기 방식 (가상의 예시 - 실제로는 불가능)
function fetchUsersSync() {
    console.log("요청 시작...");
    const data = fetchSync("https://api.example.com/users"); // 3초 걸림
    console.log("데이터 받음:", data);
    console.log("다른 작업");
    // 문제: 3초 동안 앱이 멈춤
}

// 비동기 방식 (실제 사용) - async/await
async function fetchUsersAsync() {
    console.log("요청 시작...");

    const response = await fetch("https://api.example.com/users"); // Response 객체 받음
    const data = await response.json(); // JSON 데이터로 변환
    console.log("데이터 받음:", data); // data가 준비된 후 실행

    console.log("다른 작업"); // 위의 await들이 모두 완료된 후 실행
}

// 또는 .then() 사용 (동일한 결과)
function fetchUsersThen() {
    console.log("요청 시작...");

    fetch("https://api.example.com/users")
        .then((response) => response.json()) // Response 객체를 JSON으로 변환
        .then((data) => {
            console.log("데이터 받음:", data);
        });

    console.log("다른 작업"); // 바로 실행됨
}
```

**핵심 개념:**

-   비동기 작업은 **시간이 걸리는 작업**을 **기다리지 않고** 다른 코드를 실행할 수 있게 합니다
-   네트워크 요청, 파일 읽기, 타이머 등이 비동기 작업입니다
-   JavaScript는 **단일 스레드**이지만, 비동기 처리를 통해 **동시성**을 구현합니다

### Promise란?

**Promise**는 비동기 작업의 최종 완료(또는 실패)를 나타내는 객체입니다. Promise는 세 가지 상태를 가집니다:

-   **pending(대기)**: 초기 상태, 아직 완료되지 않음
-   **fulfilled(이행)**: 작업이 성공적으로 완료됨
-   **rejected(거부)**: 작업이 실패함

```javascript
// Promise 생성 예시
const promise = new Promise((resolve, reject) => {
    // 비동기 작업 수행
    setTimeout(() => {
        const success = true;
        if (success) {
            resolve("성공!"); // fulfilled 상태로 변경
        } else {
            reject("실패!"); // rejected 상태로 변경
        }
    }, 1000);
});
```

### .then()과 .catch()

**`.then()`**과 **`.catch()`**는 Promise의 결과를 처리하는 메서드입니다.

#### .then() - 성공 처리

`.then()`은 Promise가 성공적으로 완료되었을 때 실행됩니다. 여러 개의 `.then()`을 체이닝하여 순차적으로 처리할 수 있습니다.

```javascript
fetch("https://api.example.com/users")
    .then((response) => {
        // 첫 번째 then: 응답 객체를 받음
        console.log("응답 받음:", response);
        return response.json(); // 다음 then으로 전달
    })
    .then((data) => {
        // 두 번째 then: JSON 데이터를 받음
        console.log("데이터:", data);
        return data.users; // 다음 then으로 전달
    })
    .then((users) => {
        // 세 번째 then: 사용자 배열을 받음
        console.log("사용자 목록:", users);
    });
```

**데이터 가공 과정:**

이 코드는 네트워크 응답을 단계적으로 가공해나가는 과정을 보여줍니다:

1. **첫 번째 `.then()`**: `fetch()`가 반환한 **Response 객체**를 받습니다

    - `response`는 아직 JSON이 아닌 원시 응답 객체입니다
    - `response.json()`을 호출하여 JSON으로 파싱하고, 그 결과를 다음 단계로 전달합니다

2. **두 번째 `.then()`**: `response.json()`이 반환한 **파싱된 JSON 데이터**를 받습니다

    - `data`는 이미 JavaScript 객체로 변환된 데이터입니다
    - 예: `{ users: [{ id: 1, name: "홍길동" }], total: 1 }`
    - `data.users`를 추출하여 다음 단계로 전달합니다

3. **세 번째 `.then()`**: **사용자 배열**을 받습니다
    - `users`는 `data.users`에서 추출한 배열입니다
    - 예: `[{ id: 1, name: "홍길동" }]`
    - 최종적으로 필요한 데이터만 남게 됩니다

**실제 데이터 흐름 예시:**

```javascript
// 1단계: Response 객체 (아직 JSON 아님)
response = Response {
    ok: true,
    status: 200,
    json: function() { ... }
}

// 2단계: JSON 파싱 후 JavaScript 객체
data = {
    users: [
        { id: 1, name: "홍길동", email: "hong@example.com" },
        { id: 2, name: "김철수", email: "kim@example.com" }
    ],
    total: 2,
    page: 1
}

// 3단계: 필요한 부분만 추출
users = [
    { id: 1, name: "홍길동", email: "hong@example.com" },
    { id: 2, name: "김철수", email: "kim@example.com" }
]
```

**특징:**

-   이전 `.then()`의 반환값이 다음 `.then()`의 인자로 전달됩니다
-   각 `.then()`은 새로운 Promise를 반환할 수 있습니다
-   비동기 작업을 순차적으로 처리할 수 있습니다

**매개변수 이름은 자유롭게 정할 수 있습니다:**

`.then()` 안의 매개변수 이름(`response`, `data`, `users` 등)은 개발자가 임의로 정한 것입니다. 의미를 명확히 하기 위해 보통 `response`, `data` 같은 이름을 사용하지만, 다른 이름을 사용해도 됩니다.

```javascript
// 모두 동일하게 동작합니다 - 매개변수 이름만 다름

// 예시 1: response, data 사용 (일반적)
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => console.log(data));

// 예시 2: res, result 사용
fetch("https://api.example.com/users")
    .then((res) => res.json())
    .then((result) => console.log(result));

// 예시 3: x, y 사용 (권장하지 않음 - 의미가 불명확)
fetch("https://api.example.com/users")
    .then((x) => x.json())
    .then((y) => console.log(y));

// 예시 4: 한 글자로도 가능 (짧은 코드에서 자주 사용)
fetch("https://api.example.com/users")
    .then((r) => r.json())
    .then((d) => console.log(d));
```

**권장 사항:**

-   **의미 있는 이름 사용**: `response`, `data`, `user`, `error` 등
-   **일관성 유지**: 프로젝트 전체에서 같은 패턴 사용
-   **너무 짧지 않게**: `x`, `y` 같은 이름은 피하기
-   **컨텍스트에 맞게**: 사용자 데이터면 `user`, 배열이면 `users`

```javascript
// 좋은 예: 의미가 명확함
fetch("/users/1")
    .then((response) => response.json())
    .then((user) => console.log(user.name));

// 나쁜 예: 의미가 불명확함
fetch("/users/1")
    .then((x) => x.json())
    .then((y) => console.log(y.name));
```

#### .catch() - 에러 처리

`.catch()`는 Promise가 실패했을 때 실행됩니다. 체인 어디서든 에러가 발생하면 가장 가까운 `.catch()`로 이동합니다.

```javascript
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        // 만약 여기서 에러가 발생하면
        throw new Error("데이터 처리 실패");
    })
    .catch((error) => {
        // 위의 모든 에러를 여기서 처리
        console.error("에러 발생:", error);
    });
```

**에러 처리 흐름:**

```javascript
fetch("https://api.example.com/users")
    .then((response) => {
        if (!response.ok) {
            throw new Error("HTTP 에러!");
        }
        return response.json();
    })
    .then((data) => {
        // 성공 시 실행
        console.log("성공:", data);
    })
    .catch((error) => {
        // 네트워크 에러, HTTP 에러, JSON 파싱 에러 등
        // 모든 에러를 여기서 처리
        console.error("에러:", error.message);
    });
```

#### .finally() - 최종 처리

`.finally()`는 성공하든 실패하든 상관없이 항상 실행됩니다. 정리 작업에 유용합니다.

```javascript
let loading = true;

fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error))
    .finally(() => {
        // 성공/실패 여부와 관계없이 항상 실행
        loading = false;
        console.log("요청 완료");
    });
```

### async와 await

**`async`**와 **`await`**는 Promise를 더 읽기 쉽게 만드는 문법입니다. `.then()` 체인 대신 동기 코드처럼 작성할 수 있습니다.

#### async 함수

함수 앞에 `async`를 붙이면 그 함수는 항상 Promise를 반환합니다.

```javascript
// 일반 함수
function normalFunction() {
    return "일반 값";
}

// async 함수
async function asyncFunction() {
    return "일반 값"; // 자동으로 Promise로 감싸짐
}

// 위의 asyncFunction은 다음과 동일합니다:
function asyncFunction() {
    return Promise.resolve("일반 값");
}
```

#### await 키워드

`await`는 Promise가 완료될 때까지 기다립니다. `await`는 `async` 함수 내부에서만 사용할 수 있습니다.

```javascript
// .then() 사용 (Promise 체이닝)
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

// async/await 사용 (더 읽기 쉬움)
async function fetchUsers() {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log(data);
}
```

**await의 동작:**

-   `await`는 Promise가 완료될 때까지 함수 실행을 일시 중지합니다
-   Promise가 성공하면 결과값을 반환합니다
-   Promise가 실패하면 에러를 던집니다 (throw)

```javascript
async function example() {
    // await는 Promise가 완료될 때까지 기다림
    const result = await someAsyncFunction();

    // 위의 코드가 완료된 후에야 아래 코드가 실행됨
    console.log("완료:", result);
}
```

**중요: `await fetch()`는 Response 객체를 반환합니다**

`await fetch()`를 사용하면 **Response 객체**를 받습니다. 실제 JSON 데이터를 얻으려면 `response.json()`을 추가로 호출해야 합니다.

```javascript
// ❌ 잘못된 예: data는 Response 객체 (공란이 아님, 하지만 원하는 데이터가 아님)
async function fetchUsersWrong() {
    const data = await fetch("https://api.example.com/users");
    console.log("데이터:", data); // Response 객체가 출력됨 (원하는 JSON 데이터 아님)
}

// ✅ 올바른 예: response.json()을 호출해야 함
async function fetchUsersCorrect() {
    const response = await fetch("https://api.example.com/users"); // Response 객체
    const data = await response.json(); // 실제 JSON 데이터
    console.log("데이터:", data); // 원하는 데이터 출력
}
```

**`.then()`을 사용하지 않아도 됩니다**

`.then()`과 `async/await`는 **동일한 결과**를 얻는 **두 가지 다른 방법**입니다. 둘 중 하나를 선택하면 됩니다.

```javascript
// 방법 1: .then() 사용
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => {
        console.log("데이터:", data);
    })
    .catch((error) => {
        console.error("에러:", error);
    });

// 방법 2: async/await 사용 (동일한 결과)
async function fetchUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        console.log("데이터:", data);
    } catch (error) {
        console.error("에러:", error);
    }
}
```

**`await`의 핵심: 기다린다!**

**중요한 질문:** `await`는 비동기이고, `console.log()`는 동기인데, 그럼 `console.log()`가 데이터가 준비되기 전에 실행되어서 아무것도 출력 못하는 거 아니냐?

**답변:** `await`는 **기다립니다**! Promise가 완료될 때까지 다음 코드 실행을 **일시 중지**합니다.

```javascript
async function fetchUsers() {
    console.log("1. 요청 시작");

    // await는 여기서 기다립니다!
    const response = await fetch("https://api.example.com/users"); // 3초 걸림
    // ↑ 3초 동안 여기서 멈춤! 다음 줄로 넘어가지 않음

    console.log("2. 응답 받음"); // 3초 후에 실행됨
    const data = await response.json(); // JSON 파싱 (0.1초 걸림)
    // ↑ 여기서도 기다림! 다음 줄로 넘어가지 않음

    console.log("3. 데이터:", data); // JSON 파싱 완료 후 실행됨
}

// 실행 순서:
// 1. 요청 시작 (즉시)
// (3초 대기...)
// 2. 응답 받음 (3초 후)
// (0.1초 대기...)
// 3. 데이터: {...} (3.1초 후)
```

**`await` 없이 사용하면:**

```javascript
// ❌ await 없이 사용하면 문제 발생
async function fetchUsersWrong() {
    console.log("1. 요청 시작");

    const response = fetch("https://api.example.com/users"); // Promise 객체만 받음
    // ↑ await가 없으면 기다리지 않음! 바로 다음 줄 실행

    console.log("2. 응답:", response); // Promise 객체 출력 (아직 완료 안 됨)
    const data = response.json(); // 에러! response는 아직 Response 객체가 아님
    console.log("3. 데이터:", data); // 실행 안 됨
}

// 실행 순서:
// 1. 요청 시작 (즉시)
// 2. 응답: Promise {<pending>} (즉시, 아직 완료 안 됨)
// 에러 발생!
```

**비유로 이해하기:**

```javascript
// 동기 작업 (일반적인 코드)
console.log("커피 주문");
const coffee = makeCoffee(); // 3분 걸림, 기다림
console.log("커피 받음:", coffee); // 3분 후 실행

// 비동기 작업 (await 사용)
console.log("커피 주문");
const coffee = await makeCoffeeAsync(); // 3분 걸림, 기다림!
console.log("커피 받음:", coffee); // 3분 후 실행 (await가 기다려줌)

// 비동기 작업 (await 없이)
console.log("커피 주문");
const coffee = makeCoffeeAsync(); // Promise 객체만 받음, 기다리지 않음
console.log("커피 받음:", coffee); // 즉시 실행, 하지만 coffee는 아직 준비 안 됨
```

**`await`의 영향 범위: 다음 줄부터 모두 영향받습니다**

**질문:** `await` 다다음 줄에 있는 건 `await` 상관 없이 진행되고? `await` 다음 줄에만 영향을 미치는 거야?

**답변:** `await`는 **해당 줄에서 기다리고**, 그 **다음 줄부터 모든 코드**가 `await`가 완료된 **후에** 실행됩니다.

```javascript
async function example() {
    console.log("1. 시작");

    const response = await fetch("https://api.example.com/users"); // 3초 걸림
    // ↑ 여기서 3초 동안 멈춤!

    console.log("2. 응답 받음"); // await 완료 후 실행 (3초 후)
    const data = await response.json(); // await 완료 후 실행 (3초 후)
    console.log("3. 데이터:", data); // await 완료 후 실행 (3초 후)
    console.log("4. 처리 완료"); // await 완료 후 실행 (3초 후)
    console.log("5. 끝"); // await 완료 후 실행 (3초 후)
}

// 실행 순서:
// 1. 시작 (즉시)
// (3초 대기... - 여기서 모든 코드가 멈춤)
// 2. 응답 받음 (3초 후)
// 3. 데이터: {...} (3초 후)
// 4. 처리 완료 (3초 후)
// 5. 끝 (3초 후)
```

**여러 `await`가 있을 때:**

```javascript
async function example() {
    console.log("1. 시작");

    const response = await fetch("https://api.example.com/users"); // 3초 걸림
    // ↑ 여기서 3초 동안 멈춤! 다음 줄부터 모두 기다림

    console.log("2. 첫 번째 await 완료"); // 3초 후 실행
    const data = await response.json(); // 0.1초 걸림
    // ↑ 여기서 0.1초 동안 멈춤! 다음 줄부터 모두 기다림

    console.log("3. 두 번째 await 완료"); // 3.1초 후 실행
    console.log("4. 데이터:", data); // 3.1초 후 실행
    console.log("5. 끝"); // 3.1초 후 실행
}

// 실행 순서:
// 1. 시작 (즉시)
// (3초 대기...)
// 2. 첫 번째 await 완료 (3초 후)
// (0.1초 대기...)
// 3. 두 번째 await 완료 (3.1초 후)
// 4. 데이터: {...} (3.1초 후)
// 5. 끝 (3.1초 후)
```

**`await` 없이 비동기 함수를 호출하면:**

```javascript
async function example() {
    console.log("1. 시작");

    const response = fetch("https://api.example.com/users"); // await 없음!
    // ↑ 기다리지 않음! 바로 다음 줄 실행

    console.log("2. 즉시 실행"); // 즉시 실행 (기다리지 않음)
    console.log("3. 즉시 실행"); // 즉시 실행
    console.log("4. 즉시 실행"); // 즉시 실행

    // response는 아직 Promise 객체 (완료 안 됨)
    console.log("5. response:", response); // Promise {<pending>} 출력
}

// 실행 순서:
// 1. 시작 (즉시)
// 2. 즉시 실행 (즉시)
// 3. 즉시 실행 (즉시)
// 4. 즉시 실행 (즉시)
// 5. response: Promise {<pending>} (즉시)
```

**비교 예시:**

```javascript
// 예시 1: await 있음 - 다음 줄부터 모두 기다림
async function withAwait() {
    console.log("1");
    const data = await fetchData(); // 3초 걸림, 여기서 멈춤
    console.log("2"); // 3초 후 실행
    console.log("3"); // 3초 후 실행
    console.log("4"); // 3초 후 실행
}

// 예시 2: await 없음 - 기다리지 않고 계속 진행
async function withoutAwait() {
    console.log("1");
    const data = fetchData(); // 기다리지 않음
    console.log("2"); // 즉시 실행
    console.log("3"); // 즉시 실행
    console.log("4"); // 즉시 실행
    // data는 아직 준비 안 됨
}
```

**핵심 정리:**

-   `await`는 **해당 줄에서 기다립니다** - Promise가 완료될 때까지 멈춥니다
-   `await` **다음 줄부터 모든 코드**가 `await`가 완료된 **후에** 실행됩니다
-   `await` 다음 줄, 다다음 줄, 그 이후 모든 줄은 모두 영향받습니다
-   `await` 없이 비동기 함수를 호출하면 기다리지 않고 다음 줄로 넘어갑니다

**중요한 질문: `await`는 비동기라고 말하기엔 애매한 거 아냐? 코드 진행이 순서대로 가게는 하잖아.**

**답변:** 맞습니다! `await`는 **비동기 작업을 동기처럼 보이게 만드는 문법 설탕(Syntactic Sugar)**입니다. 하지만 실제로는 여전히 **비동기로 동작**합니다.

**동기처럼 보이지만 비동기로 동작:**

```javascript
// await를 사용하면 코드가 동기처럼 보임
async function fetchUsers() {
    console.log("1. 시작");
    const response = await fetch("https://api.example.com/users"); // 3초 걸림
    console.log("2. 응답 받음"); // 순차적으로 실행됨
    const data = await response.json();
    console.log("3. 데이터:", data);
}
// 코드는 순차적으로 실행되지만, 실제로는 비동기로 동작!
```

**왜 여전히 비동기인가?**

1. **다른 함수는 계속 실행됩니다**: `await`가 기다리는 동안 다른 코드는 블로킹되지 않습니다

```javascript
async function fetchUsers() {
    console.log("1. 요청 시작");
    const response = await fetch("https://api.example.com/users"); // 3초 걸림
    console.log("2. 응답 받음");
}

// 다른 함수는 await를 기다리지 않고 실행됨
function doOtherWork() {
    console.log("다른 작업 실행");
}

fetchUsers(); // 비동기로 실행 시작
doOtherWork(); // 즉시 실행됨! await를 기다리지 않음

// 실행 순서:
// 1. 요청 시작 (즉시)
// 다른 작업 실행 (즉시, fetchUsers를 기다리지 않음)
// (3초 후) 2. 응답 받음
```

2. **여러 비동기 작업을 동시에 실행할 수 있습니다**

```javascript
async function fetchMultiple() {
    // 두 요청을 동시에 시작 (병렬 처리)
    const promise1 = fetch("https://api.example.com/users");
    const promise2 = fetch("https://api.example.com/posts");

    // 두 요청이 모두 완료될 때까지 기다림
    const response1 = await promise1; // 3초 걸림
    const response2 = await promise2; // 2초 걸림
    // 총 3초 (동시에 실행되므로)

    console.log("모두 완료");
}
```

3. **이벤트 루프를 통해 동작**: JavaScript의 이벤트 루프가 비동기 작업을 관리합니다

**비유로 이해하기:**

```javascript
// 동기 작업 (진짜 동기) - 모든 것이 멈춤
function syncExample() {
    console.log("커피 주문");
    makeCoffee(); // 3분 걸림, 모든 것이 멈춤
    console.log("커피 받음"); // 3분 후
    // 이 동안 다른 일을 할 수 없음
}

// await 사용 (동기처럼 보이지만 비동기) - 다른 일을 할 수 있음
async function asyncExample() {
    console.log("커피 주문");
    await makeCoffeeAsync(); // 3분 걸림, 하지만 다른 일을 할 수 있음
    console.log("커피 받음"); // 3분 후
    // 이 동안 다른 함수는 계속 실행됨
}
```

**정리:**

-   **`await`는 비동기 작업을 동기처럼 보이게 만듭니다** (코드 작성 관점)
-   **하지만 실제로는 여전히 비동기로 동작합니다** (실행 관점)
-   **다른 코드는 블로킹되지 않습니다** - `await`가 기다리는 동안 다른 함수는 계속 실행됨
-   **여러 비동기 작업을 동시에 실행할 수 있습니다** - 병렬 처리 가능

**결론:** `await`는 **"비동기를 동기처럼 작성하는 문법"**이지, **"비동기를 동기로 만드는 것"**이 아닙니다. 코드는 순차적으로 보이지만, 실제 실행은 여전히 비동기입니다.

**`.then()`과 비교:**

```javascript
// .then() 방식: 콜백 함수 안에서 실행
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => {
        // 여기는 데이터가 준비된 후에 실행됨
        console.log("데이터:", data);
    });

// async/await 방식: await가 기다려줌
async function fetchUsers() {
    const response = await fetch("https://api.example.com/users");
    // ↑ 여기서 기다림, 완료되면 다음 줄 실행

    const data = await response.json();
    // ↑ 여기서도 기다림, 완료되면 다음 줄 실행

    // 여기는 데이터가 준비된 후에 실행됨
    console.log("데이터:", data);
}
```

**코드에서 병렬/직렬 구분하는 방법**

**질문:** 해당 `await`가 병렬로 처리되는지, 직렬로 처리되는지 어떻게 구분해? 내 눈엔 똑같이 보여.

**답변:** 핵심은 **`await`를 언제 사용하느냐**입니다!

**직렬 처리 - `await`를 바로 사용:**

```javascript
// 직렬 처리: await를 바로 사용
async function sequential() {
    const response1 = await fetch("/api/users"); // 3초 걸림
    // ↑ 여기서 3초 동안 멈춤! 완료되면 다음 줄 실행

    const response2 = await fetch("/api/posts"); // 2초 걸림
    // ↑ 위의 await가 완료된 후에 시작 (직렬)

    // 총 시간: 3초 + 2초 = 5초
}

// 구분 방법: await가 바로 있으면 직렬!
// await fetch(...) ← 직렬
```

**병렬 처리 - Promise를 먼저 만들고 나중에 `await`:**

```javascript
// 병렬 처리: Promise를 먼저 만들고 나중에 await
async function parallel() {
    const promise1 = fetch("/api/users"); // 3초 걸림
    // ↑ await 없음! 즉시 Promise 객체 반환, 요청 시작

    const promise2 = fetch("/api/posts"); // 2초 걸림
    // ↑ await 없음! 즉시 Promise 객체 반환, 요청 시작
    // 두 요청이 동시에 시작됨!

    const response1 = await promise1; // 3초 걸림
    const response2 = await promise2; // 2초 걸림 (이미 시작됨)
    // 총 시간: 3초 (가장 오래 걸리는 것)
}

// 구분 방법: await 없이 Promise를 먼저 만들면 병렬!
// const promise = fetch(...) ← 병렬 시작
// await promise ← 나중에 기다림
```

**비교: 코드만 봐도 구분 가능**

```javascript
// 직렬 처리 - await를 바로 사용
const response1 = await fetch("/api/users"); // ← await가 바로 있음
const response2 = await fetch("/api/posts"); // ← 위가 끝나야 시작

// 병렬 처리 - Promise를 먼저 만들고 나중에 await
const promise1 = fetch("/api/users"); // ← await 없음!
const promise2 = fetch("/api/posts"); // ← await 없음!
const response1 = await promise1; // ← 나중에 await
const response2 = await promise2; // ← 나중에 await
```

**핵심 구분법:**

1. **`await`를 바로 사용** = 직렬 처리

    ```javascript
    await fetch(...) // 직렬
    ```

2. **Promise를 먼저 만들고 나중에 `await`** = 병렬 처리
    ```javascript
    const promise = fetch(...) // 병렬 시작
    await promise // 나중에 기다림
    ```

**실전 예시:**

```javascript
// 예시 1: 직렬 처리
async function example1() {
    const user = await fetch("/api/users/1"); // 3초
    const posts = await fetch(`/api/posts?userId=${user.id}`); // 2초
    // 총 5초 (직렬)
}

// 예시 2: 병렬 처리
async function example2() {
    const userPromise = fetch("/api/users/1"); // 3초, 즉시 시작
    const postsPromise = fetch("/api/posts"); // 2초, 즉시 시작
    // 두 요청 동시에 시작!

    const user = await userPromise; // 3초
    const posts = await postsPromise; // 2초 (이미 시작됨)
    // 총 3초 (병렬)
}
```

**`.then()`과 `async/await`의 관계:**

-   `await`는 내부적으로 `.then()`을 사용합니다
-   `await response.json()`은 `response.json().then((data) => data)`와 동일합니다
-   두 방법 모두 Promise를 기반으로 하므로 함께 사용할 수 있습니다

```javascript
// .then()과 async/await 혼합 사용도 가능 (하지만 권장하지 않음)
async function mixedExample() {
    const response = await fetch("https://api.example.com/users");

    // await 대신 .then() 사용 가능
    response.json().then((data) => {
        console.log("데이터:", data);
    });
}
```

**Promise를 직접 사용하는 경우 vs async/await 사용**

**질문:** Promise를 그대로 쓰는 경우는 거의 없고, async/await로 사용되는 편인가요?

**답변:** 네, 맞습니다! 현대 JavaScript에서는 **`async/await`를 주로 사용**합니다. 하지만 Promise를 직접 사용하는 경우도 있습니다.

**현실적인 사용 비율:**

-   **`async/await`**: 90% 이상 (대부분의 경우)
-   **`.then()/.catch()`**: 10% 미만 (특정 상황에서)

**언제 `async/await`를 사용하나?**

대부분의 경우 `async/await`를 사용합니다:

```javascript
// ✅ 권장: async/await 사용
async function fetchUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("에러:", error);
        throw error;
    }
}
```

**언제 `.then()/.catch()`를 사용하나?**

다음과 같은 특정 상황에서 `.then()`을 사용할 수 있습니다:

1. **간단한 한 줄 처리**

```javascript
// 간단한 경우 .then()이 더 간결할 수 있음
fetch("https://api.example.com/users")
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```

2. **Promise 체이닝이 더 명확한 경우**

```javascript
// 여러 조건부 처리가 필요한 경우
fetch("https://api.example.com/users")
    .then((response) => {
        if (!response.ok) throw new Error("에러");
        return response.json();
    })
    .then((data) => data.users)
    .then((users) => users.filter((u) => u.active))
    .catch((error) => console.error(error));
```

3. **Promise.all()과 함께 사용**

```javascript
// Promise.all()과 함께 사용할 때
Promise.all([fetch("/api/users"), fetch("/api/posts")])
    .then((responses) => Promise.all(responses.map((r) => r.json())))
    .then(([users, posts]) => {
        console.log(users, posts);
    });
```

**하지만 `async/await`로도 가능합니다:**

```javascript
// 위의 예시를 async/await로 작성
async function fetchData() {
    try {
        const responses = await Promise.all([
            fetch("/api/users"),
            fetch("/api/posts"),
        ]);
        const [users, posts] = await Promise.all(
            responses.map((r) => r.json())
        );
        console.log(users, posts);
    } catch (error) {
        console.error(error);
    }
}
```

**Promise에 대해 얼마나 알아야 하나?**

**현재 가이드에 있는 정도면 충분합니다!** 다음만 이해하면 됩니다:

1. **Promise의 기본 개념**: pending, fulfilled, rejected 상태
2. **`.then()`, `.catch()`, `.finally()`**: Promise 처리 메서드
3. **`async/await`**: Promise를 더 쉽게 사용하는 문법
4. **`Promise.all()`**: 여러 Promise를 동시에 처리

**Promise를 직접 생성하는 경우는 거의 없습니다:**

```javascript
// ❌ 거의 사용하지 않음: Promise 직접 생성
const promise = new Promise((resolve, reject) => {
    // ...
});

// ✅ 대부분 이렇게 사용: 이미 Promise를 반환하는 함수 사용
const data = await fetch("https://api.example.com/users");
const result = await someAsyncFunction();
```

**실전에서 Promise를 직접 생성하는 경우:**

1. **타임아웃 만들기**

```javascript
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

await delay(1000); // 1초 대기
```

2. **콜백을 Promise로 변환**

```javascript
function readFilePromise(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}
```

하지만 이런 경우도 **라이브러리나 유틸리티 함수**로 제공되는 경우가 많아 직접 만들 일은 거의 없습니다.

**정리:**

-   **`async/await`를 주로 사용**합니다 (90% 이상)
-   **`.then()/.catch()`는 특정 상황에서만** 사용합니다
-   **Promise를 직접 생성하는 경우는 거의 없습니다**
-   **현재 가이드에 있는 정도면 충분합니다** - Promise의 기본 개념과 `async/await` 사용법만 알면 됩니다

**변수 이름도 자유롭게 정할 수 있습니다:**

`await`로 받는 변수 이름(`response`, `data`, `result` 등)도 개발자가 임의로 정한 것입니다.

```javascript
// 모두 동일하게 동작합니다 - 변수 이름만 다름

// 예시 1: response, data 사용 (일반적)
async function fetchUsers() {
    const response = await fetch("https://api.example.com/users");
    const data = await response.json();
    console.log(data);
}

// 예시 2: res, result 사용
async function fetchUsers() {
    const res = await fetch("https://api.example.com/users");
    const result = await res.json();
    console.log(result);
}

// 예시 3: r, d 사용 (짧지만 의미가 덜 명확)
async function fetchUsers() {
    const r = await fetch("https://api.example.com/users");
    const d = await r.json();
    console.log(d);
}
```

**catch의 error 매개변수도 마찬가지입니다:**

```javascript
// error 대신 다른 이름 사용 가능
try {
    const data = await fetchData();
} catch (err) {
    // err, error, e 등 모두 가능
    console.error(err);
}

// 또는
catch (e) {
    console.error(e);
}
```

### try, catch, finally

**`try-catch-finally`**는 에러를 처리하는 JavaScript의 기본 문법입니다. `async/await`와 함께 사용하면 에러 처리가 더 명확해집니다.

#### try - 시도할 코드

`try` 블록 안에 실행할 코드를 작성합니다. 에러가 발생할 수 있는 코드를 여기에 넣습니다.

```javascript
async function fetchUsers() {
    try {
        // 에러가 발생할 수 있는 코드
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        // 에러 처리
    }
}
```

#### catch - 에러 처리

`catch` 블록은 `try` 블록에서 에러가 발생했을 때 실행됩니다.

```javascript
async function fetchUsers() {
    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        // 모든 종류의 에러를 여기서 처리
        console.error("에러 발생:", error);

        // 사용자에게 친화적인 메시지 표시
        if (error.message === "Network request failed") {
            alert("네트워크 연결을 확인해주세요");
        } else {
            alert("데이터를 불러오는데 실패했습니다");
        }
    }
}
```

**`throw`란?**

**`throw`**는 에러를 발생시키는 JavaScript 키워드입니다. 에러가 발생하면 코드 실행이 중단되고, 가장 가까운 `catch` 블록으로 이동합니다.

**기본 사용법:**

```javascript
// 에러 발생시키기
throw new Error("에러 메시지");

// 또는
throw "에러 메시지"; // 문자열도 가능하지만 권장하지 않음
```

**`throw`의 동작:**

```javascript
function example() {
    console.log("1. 시작");

    throw new Error("에러 발생!"); // 에러 발생
    // ↑ 여기서 코드 실행 중단

    console.log("2. 이 코드는 실행되지 않음"); // 실행 안 됨
}

try {
    example();
} catch (error) {
    console.log("에러 잡음:", error.message); // "에러 발생!"
}
```

**에러 타입별 처리:**

```javascript
async function fetchUsers() {
    try {
        const response = await fetch("https://api.example.com/users");

        if (!response.ok) {
            // HTTP 에러를 명시적으로 처리
            throw new Error(`HTTP 에러: ${response.status}`);
            // ↑ throw로 에러 발생 → catch 블록으로 이동
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // 네트워크 에러, HTTP 에러, JSON 파싱 에러 등
        // 모든 에러가 여기로 옴
        console.error("에러 타입:", error.name);
        console.error("에러 메시지:", error.message);
        throw error; // 필요시 다시 던지기 (상위로 에러 전달)
    }
}
```

**`throw`의 사용 예시:**

1. **조건에 맞지 않을 때 에러 발생**

```javascript
async function fetchUser(userId) {
    if (!userId) {
        throw new Error("사용자 ID가 필요합니다");
        // ↑ 에러 발생 → catch 블록으로 이동
    }

    const response = await fetch(`/api/users/${userId}`);
    return response.json();
}
```

2. **에러를 다시 던지기 (re-throw)**

```javascript
async function fetchUsers() {
    try {
        const response = await fetch("/api/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("에러 로그:", error);
        throw error; // 에러를 다시 던져서 상위로 전달
        // ↑ 이렇게 하면 호출한 쪽에서도 에러를 처리할 수 있음
    }
}

// 사용하는 쪽
try {
    const users = await fetchUsers();
} catch (error) {
    // fetchUsers에서 throw한 에러를 여기서 처리
    alert("사용자 목록을 불러올 수 없습니다");
}
```

3. **커스텀 에러 메시지**

```javascript
async function fetchUsers() {
    try {
        const response = await fetch("/api/users");

        if (response.status === 404) {
            throw new Error("사용자를 찾을 수 없습니다");
        } else if (response.status === 401) {
            throw new Error("인증이 필요합니다");
        } else if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("에러:", error.message);
        throw error; // 에러를 다시 던지기
    }
}
```

**`throw` vs `return`:**

```javascript
// throw: 에러 발생, 코드 실행 중단
function example1() {
    throw new Error("에러!");
    console.log("이 코드는 실행 안 됨");
}

// return: 함수 종료, 정상적인 반환
function example2() {
    return "성공";
    console.log("이 코드는 실행 안 됨");
}
```

**핵심 정리:**

-   **`throw`**: 에러를 발생시키는 키워드
-   **에러 발생 시**: 코드 실행이 중단되고 가장 가까운 `catch` 블록으로 이동
-   **`throw error`**: 에러를 다시 던져서 상위로 전달 (re-throw)
-   **`throw new Error("메시지")`**: 새로운 에러 객체 생성하여 발생

#### finally - 최종 처리

`finally` 블록은 성공하든 실패하든 항상 실행됩니다. 정리 작업(로딩 상태 해제 등)에 사용합니다.

```javascript
async function fetchUsers() {
    let loading = true;

    try {
        const response = await fetch("https://api.example.com/users");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("에러:", error);
        throw error;
    } finally {
        // 성공/실패 여부와 관계없이 항상 실행
        loading = false;
        console.log("요청 완료");
    }
}
```

**실전 예시:**

```javascript
async function fetchUsers() {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch("https://api.example.com/users");

        if (!response.ok) {
            throw new Error("데이터를 불러오는데 실패했습니다");
        }

        const data = await response.json();
        setUsers(data);
    } catch (err) {
        setError(err.message);
    } finally {
        // 성공하든 실패하든 로딩 상태는 항상 해제
        setLoading(false);
    }
}
```

### 비교: .then() vs async/await

같은 작업을 두 가지 방법으로 작성해보겠습니다.

#### .then() 방식

```javascript
function fetchUserData(userId) {
    return fetch(`https://api.example.com/users/${userId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("사용자를 찾을 수 없습니다");
            }
            return response.json();
        })
        .then((user) => {
            return fetch(`https://api.example.com/posts?userId=${user.id}`);
        })
        .then((response) => response.json())
        .then((posts) => {
            return { user, posts };
        })
        .catch((error) => {
            console.error("에러:", error);
            throw error;
        });
}
```

#### async/await 방식

```javascript
async function fetchUserData(userId) {
    try {
        const response = await fetch(`https://api.example.com/users/${userId}`);

        if (!response.ok) {
            throw new Error("사용자를 찾을 수 없습니다");
        }

        const user = await response.json();
        const postsResponse = await fetch(
            `https://api.example.com/posts?userId=${user.id}`
        );
        const posts = await postsResponse.json();

        return { user, posts };
    } catch (error) {
        console.error("에러:", error);
        throw error;
    }
}
```

**차이점:**

-   **가독성**: `async/await`가 더 읽기 쉽고 이해하기 쉽습니다
-   **에러 처리**: `try-catch`가 더 직관적입니다
-   **디버깅**: `async/await`는 스택 트레이스가 더 명확합니다
-   **호환성**: 둘 다 Promise를 기반으로 하므로 함께 사용 가능합니다

### 병렬 처리

### Promise.all() - 여러 Promise를 동시에 처리

**`Promise.all()`**은 여러 Promise를 동시에 실행하고, 모두 완료될 때까지 기다리는 메서드입니다.

**기본 사용법:**

```javascript
Promise.all([promise1, promise2, promise3])
    .then((results) => {
        // 모든 Promise가 완료되면 실행
        console.log(results); // [result1, result2, result3]
    })
    .catch((error) => {
        // 하나라도 실패하면 실행
        console.error("에러:", error);
    });
```

**async/await와 함께 사용:**

```javascript
const [result1, result2, result3] = await Promise.all([
    promise1,
    promise2,
    promise3,
]);
```

**순차 처리 vs 병렬 처리:**

```javascript
// 순차 처리 (느림)
async function fetchSequential() {
    const user1 = await fetch("/users/1"); // 1초
    const user2 = await fetch("/users/2"); // 1초
    const user3 = await fetch("/users/3"); // 1초
    // 총 시간: 3초 (1초 + 1초 + 1초)
}

// 병렬 처리 (빠름) - Promise.all 사용
async function fetchParallel() {
    const [user1, user2, user3] = await Promise.all([
        fetch("/users/1"), // 1초
        fetch("/users/2"), // 1초
        fetch("/users/3"), // 1초
    ]);
    // 총 시간: 1초 (동시에 실행되므로 가장 오래 걸리는 것)
}
```

**Promise.all()의 특징:**

1. **모든 Promise가 성공해야 성공**: 하나라도 실패하면 전체가 실패합니다

```javascript
Promise.all([
    fetch("/api/users"), // 성공
    fetch("/api/posts"), // 성공
    fetch("/api/comments"), // 실패
])
    .then((results) => {
        // 실행 안 됨 (하나가 실패했으므로)
    })
    .catch((error) => {
        // 여기서 실행됨 (comments 요청 실패)
        console.error("에러:", error);
    });
```

2. **결과는 배열로 반환**: Promise의 순서대로 결과가 배열에 담깁니다

```javascript
const [users, posts, comments] = await Promise.all([
    fetch("/api/users").then((r) => r.json()),
    fetch("/api/posts").then((r) => r.json()),
    fetch("/api/comments").then((r) => r.json()),
]);

console.log(users); // 첫 번째 Promise의 결과
console.log(posts); // 두 번째 Promise의 결과
console.log(comments); // 세 번째 Promise의 결과
```

3. **동시에 실행**: 모든 Promise가 동시에 시작됩니다

```javascript
// 시간: 0초 ────────── 1초 ────────── 2초 ────────── 3초
//       │              │              │              │
//       요청1 시작      요청2 완료      요청1 완료      요청3 완료
//       요청2 시작
//       요청3 시작
//       (동시에 시작)
```

**실전 예시:**

```javascript
// 예시 1: 여러 사용자 정보를 동시에 가져오기
async function fetchUsers(userIds) {
    const promises = userIds.map((id) =>
        fetch(`/api/users/${id}`).then((r) => r.json())
    );
    const users = await Promise.all(promises);
    return users;
}

// 사용
const users = await fetchUsers([1, 2, 3]);
```

```javascript
// 예시 2: 사용자와 게시글을 동시에 가져오기
async function fetchUserAndPosts(userId) {
    try {
        // 두 요청을 동시에 실행
        const [userResponse, postsResponse] = await Promise.all([
            fetch(`https://api.example.com/users/${userId}`),
            fetch(`https://api.example.com/posts?userId=${userId}`),
        ]);

        const user = await userResponse.json();
        const posts = await postsResponse.json();

        return { user, posts };
    } catch (error) {
        console.error("에러:", error);
        throw error;
    }
}
```

```javascript
// 예시 3: 여러 단계의 병렬 처리
async function fetchAllData(userId) {
    // 1단계: 사용자 정보 가져오기
    const user = await fetch(`/api/users/${userId}`).then((r) => r.json());

    // 2단계: 사용자 관련 데이터를 동시에 가져오기
    const [posts, comments, likes] = await Promise.all([
        fetch(`/api/posts?userId=${userId}`).then((r) => r.json()),
        fetch(`/api/comments?userId=${userId}`).then((r) => r.json()),
        fetch(`/api/likes?userId=${userId}`).then((r) => r.json()),
    ]);

    return { user, posts, comments, likes };
}
```

**중요한 질문: user까지 한 번에 병렬로 처리하면 안 돼?**

**답변:** **의존성**에 따라 다릅니다! user 정보가 다른 요청에 필요하면 직렬, 필요 없으면 모두 병렬로 처리할 수 있습니다.

**경우 1: user 정보가 필요 없는 경우 - 모두 병렬 처리 가능**

```javascript
// ✅ 모두 병렬 처리 가능: userId를 파라미터로 받고 있음
async function fetchAllData(userId) {
    // user 정보 없이도 posts, comments, likes를 가져올 수 있음
    const [user, posts, comments, likes] = await Promise.all([
        fetch(`/api/users/${userId}`).then((r) => r.json()),
        fetch(`/api/posts?userId=${userId}`).then((r) => r.json()),
        fetch(`/api/comments?userId=${userId}`).then((r) => r.json()),
        fetch(`/api/likes?userId=${userId}`).then((r) => r.json()),
    ]);

    return { user, posts, comments, likes };
    // 총 시간: 가장 오래 걸리는 요청의 시간 (빠름!)
}
```

**경우 2: user 정보가 필요한 경우 - 직렬 처리 필요**

```javascript
// ❌ 직렬 처리 필요: user 정보에서 userId를 가져와야 함
async function fetchAllData(userEmail) {
    // 1단계: 이메일로 사용자 찾기
    const user = await fetch(`/api/users?email=${userEmail}`).then((r) =>
        r.json()
    );
    // user.id가 필요함!

    // 2단계: user.id를 사용하여 다른 데이터 가져오기
    const [posts, comments, likes] = await Promise.all([
        fetch(`/api/posts?userId=${user.id}`).then((r) => r.json()),
        fetch(`/api/comments?userId=${user.id}`).then((r) => r.json()),
        fetch(`/api/likes?userId=${user.id}`).then((r) => r.json()),
    ]);

    return { user, posts, comments, likes };
    // 총 시간: user 요청 시간 + 병렬 요청 시간
}
```

**비교:**

```javascript
// 방법 1: 직렬 + 병렬 (느림)
async function method1(userId) {
    const user = await fetch(`/api/users/${userId}`); // 1초
    const [posts, comments] = await Promise.all([
        fetch(`/api/posts?userId=${userId}`), // 1초
        fetch(`/api/comments?userId=${userId}`), // 1초
    ]);
    // 총 2초 (1초 + 1초)
}

// 방법 2: 모두 병렬 (빠름) - userId를 이미 알고 있으면 가능
async function method2(userId) {
    const [user, posts, comments] = await Promise.all([
        fetch(`/api/users/${userId}`), // 1초
        fetch(`/api/posts?userId=${userId}`), // 1초
        fetch(`/api/comments?userId=${userId}`), // 1초
    ]);
    // 총 1초 (모두 동시에 실행)
}
```

**실전 예시:**

```javascript
// ✅ 좋은 예: 모두 병렬 처리 (userId를 이미 알고 있음)
async function fetchUserData(userId) {
    const [user, posts, comments, likes] = await Promise.all([
        fetch(`/api/users/${userId}`).then((r) => r.json()),
        fetch(`/api/posts?userId=${userId}`).then((r) => r.json()),
        fetch(`/api/comments?userId=${userId}`).then((r) => r.json()),
        fetch(`/api/likes?userId=${userId}`).then((r) => r.json()),
    ]);
    return { user, posts, comments, likes };
}

// ✅ 좋은 예: user 정보가 필요한 경우 (직렬 처리 필요)
async function fetchUserDataByEmail(email) {
    // 먼저 user를 가져와서 userId를 알아야 함
    const user = await fetch(`/api/users?email=${email}`).then((r) => r.json());

    // user.id를 사용하여 다른 데이터 가져오기
    const [posts, comments] = await Promise.all([
        fetch(`/api/posts?userId=${user.id}`).then((r) => r.json()),
        fetch(`/api/comments?userId=${user.id}`).then((r) => r.json()),
    ]);

    return { user, posts, comments };
}
```

**핵심 정리:**

-   **의존성이 없으면**: 모두 병렬 처리 가능 (빠름)
-   **의존성이 있으면**: 직렬 처리 필요 (느리지만 필수)
-   **userId를 이미 알고 있으면**: user까지 병렬 처리 가능
-   **user 정보에서 userId를 가져와야 하면**: 먼저 user를 가져온 후 병렬 처리

**에러 처리:**

```javascript
async function fetchData() {
    try {
        const [users, posts] = await Promise.all([
            fetch("/api/users").then((r) => r.json()),
            fetch("/api/posts").then((r) => r.json()),
        ]);
        return { users, posts };
    } catch (error) {
        // 하나라도 실패하면 여기로 옴
        console.error("에러 발생:", error);
        throw error;
    }
}
```

**Promise.all() vs 개별 await:**

```javascript
// 방법 1: 개별 await (직렬 처리, 느림)
async function slow() {
    const user1 = await fetch("/users/1"); // 1초
    const user2 = await fetch("/users/2"); // 1초
    const user3 = await fetch("/users/3"); // 1초
    // 총 3초
}

// 방법 2: Promise.all (병렬 처리, 빠름)
async function fast() {
    const [user1, user2, user3] = await Promise.all([
        fetch("/users/1"), // 1초
        fetch("/users/2"), // 1초
        fetch("/users/3"), // 1초
    ]);
    // 총 1초
}
```

**주의사항:**

1. **하나라도 실패하면 전체 실패**: 모든 요청이 성공해야 합니다

```javascript
// 하나가 실패하면 전체가 실패
Promise.all([
    fetch("/api/users"), // 성공
    fetch("/api/posts"), // 실패
])
    .then(() => {
        // 실행 안 됨
    })
    .catch((error) => {
        // 여기서 실행됨
    });
```

2. **결과 순서 보장**: Promise의 순서대로 결과가 배열에 담깁니다

```javascript
const [result1, result2] = await Promise.all([
    fetch("/api/slow"), // 3초 걸림
    fetch("/api/fast"), // 1초 걸림
]);

// result1은 slow의 결과
// result2는 fast의 결과
// 순서는 보장되지만, fast가 먼저 완료되어도 result1이 첫 번째
```

**핵심 정리:**

-   **`Promise.all()`**: 여러 Promise를 동시에 실행하고 모두 완료될 때까지 기다림
-   **병렬 처리**: 모든 Promise가 동시에 시작되어 시간 절약
-   **모두 성공해야 성공**: 하나라도 실패하면 전체 실패
-   **결과는 배열**: Promise의 순서대로 결과가 배열에 담김
-   **사용 시기**: 여러 독립적인 비동기 작업을 동시에 실행할 때

### 정리

| 개념           | 설명                               | 사용 시기                      |
| -------------- | ---------------------------------- | ------------------------------ |
| **Promise**    | 비동기 작업의 결과를 나타내는 객체 | 모든 비동기 작업의 기반        |
| **.then()**    | Promise 성공 시 실행               | Promise 체이닝 방식 사용 시    |
| **.catch()**   | Promise 실패 시 실행               | 에러 처리 필요 시              |
| **.finally()** | 성공/실패 관계없이 실행            | 정리 작업 필요 시              |
| **async**      | 함수를 비동기 함수로 만듦          | 함수가 비동기 작업을 포함할 때 |
| **await**      | Promise 완료를 기다림              | async 함수 내에서 사용         |
| **try**        | 에러가 발생할 수 있는 코드 블록    | 에러 처리 필요 시              |
| **catch**      | 에러를 처리하는 블록               | try 블록의 에러 처리           |
| **finally**    | 항상 실행되는 블록                 | 정리 작업 필요 시              |

## 🔑 HTTP 메서드

HTTP 메서드는 서버에 어떤 작업을 수행할지 알려주는 명령입니다. RESTful API에서 가장 많이 사용하는 4가지 메서드를 알아보겠습니다.

### GET 요청

**GET**은 서버에서 데이터를 **조회(읽기)**할 때 사용합니다.

**특징:**

-   데이터를 읽기만 함 (변경하지 않음)
-   요청 본문(body)이 없음
-   URL에 파라미터를 포함할 수 있음
-   캐시 가능 (같은 요청은 캐시에서 가져올 수 있음)
-   멱등성(idempotent): 여러 번 호출해도 결과가 같음

**사용 예시:**

-   사용자 목록 조회
-   특정 사용자 정보 조회
-   게시글 목록 조회
-   검색 결과 조회

**기본 사용법:**

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

**POST**는 서버에 새로운 데이터를 **생성(추가)**할 때 사용합니다.

**특징:**

-   새로운 리소스를 생성함
-   요청 본문(body)에 데이터를 포함함
-   멱등성이 없음: 같은 요청을 여러 번 하면 여러 개가 생성됨
-   캐시되지 않음

**사용 예시:**

-   새 사용자 생성
-   새 게시글 작성
-   로그인 (인증 정보 전송)
-   파일 업로드

**기본 사용법:**

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

**headers와 body 설명:**

**질문:** POST에서 header, body 설명해줘. 그리고 이 경우엔 userData라는 문자열 형태를 클라이언트에게서 가져와서 변환해서 서버에 전달하는 거야?

**답변:** `userData`는 **JavaScript 객체**입니다. `JSON.stringify()`로 **문자열로 변환**해서 서버에 전송합니다.

**headers (헤더):**

**헤더**는 요청에 대한 **메타데이터(추가 정보)**를 담는 부분입니다.

```javascript
headers: {
    "Content-Type": "application/json", // 전송하는 데이터의 형식
    "Authorization": "Bearer token123",  // 인증 토큰
    "X-Custom-Header": "custom-value",  // 커스텀 헤더
}
```

**주요 헤더:**

-   **`Content-Type`**: 전송하는 데이터의 형식을 알려줌
    -   `"application/json"`: JSON 형식의 데이터를 전송한다는 의미
    -   서버가 데이터를 어떻게 파싱할지 알 수 있게 해줌

```javascript
// Content-Type이 없으면 서버가 데이터 형식을 모름
headers: {
    "Content-Type": "application/json", // JSON 형식이라고 알려줌
}
```

**body (본문):**

**body**는 서버에 전송할 **실제 데이터**를 담는 부분입니다.

```javascript
// userData는 JavaScript 객체
const userData = {
    name: "홍길동",
    email: "hong@example.com",
    age: 25,
};

// JSON.stringify()로 문자열로 변환
const jsonString = JSON.stringify(userData);
// 결과: '{"name":"홍길동","email":"hong@example.com","age":25}'

// body에 문자열로 전송
body: JSON.stringify(userData),
```

**데이터 변환 과정:**

```javascript
// 1단계: 클라이언트에서 JavaScript 객체 생성
const userData = {
    name: "홍길동",
    email: "hong@example.com",
};
// userData는 객체 (JavaScript 객체)

// 2단계: JSON.stringify()로 문자열로 변환
const jsonString = JSON.stringify(userData);
// 결과: '{"name":"홍길동","email":"hong@example.com"}'
// jsonString은 문자열 (JSON 문자열)

// 3단계: 서버에 전송
fetch("/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json", // JSON 형식이라고 알려줌
    },
    body: jsonString, // 문자열로 전송
});

// 4단계: 서버에서 JSON 문자열을 받아서 파싱
// 서버: JSON.parse(body) → { name: "홍길동", email: "hong@example.com" }
```

**왜 JSON.stringify()를 사용하나?**

HTTP 요청의 body는 **문자열**만 전송할 수 있습니다. JavaScript 객체를 그대로 보낼 수 없으므로 문자열로 변환해야 합니다.

```javascript
// ❌ 잘못된 예: 객체를 그대로 전송할 수 없음
const userData = { name: "홍길동" };
fetch("/api/users", {
    method: "POST",
    body: userData, // 에러! 객체는 전송할 수 없음
});

// ✅ 올바른 예: 문자열로 변환해서 전송
const userData = { name: "홍길동" };
fetch("/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json", // JSON 형식이라고 알려줌
    },
    body: JSON.stringify(userData), // 문자열로 변환
});
```

**전체 흐름:**

```javascript
// 클라이언트 (JavaScript)
const userData = {
    name: "홍길동",
    email: "hong@example.com",
}; // JavaScript 객체

const response = await fetch("/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json", // JSON 형식이라고 알려줌
    },
    body: JSON.stringify(userData), // 객체 → JSON 문자열로 변환
    // body: '{"name":"홍길동","email":"hong@example.com"}'
});

// 서버 (예시)
// 1. body에서 JSON 문자열을 받음: '{"name":"홍길동","email":"hong@example.com"}'
// 2. JSON.parse()로 객체로 변환: { name: "홍길동", email: "hong@example.com" }
// 3. 데이터베이스에 저장
```

**실전 예시:**

```javascript
// 사용자 생성 함수
async function createUser(name, email) {
    // 1. JavaScript 객체 생성
    const userData = {
        name: name,
        email: email,
    };

    // 2. POST 요청으로 전송
    const response = await fetch("https://api.example.com/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json", // JSON 형식
        },
        body: JSON.stringify(userData), // 객체 → 문자열 변환
    });

    // 3. 서버 응답 받기
    const newUser = await response.json();
    return newUser;
}

// 사용
const user = await createUser("홍길동", "hong@example.com");
```

**중요한 질문: 서버 응답은 왜 받는 거야? response로 이미 서버에 전달한 거 아냐?**

**답변:** `fetch()`는 **요청을 보내고 응답을 받는** 양방향 통신입니다. `response`는 서버로부터 받은 응답 객체입니다.

**HTTP 요청/응답 흐름:**

```javascript
// 1. 클라이언트가 서버에 요청을 보냄
const response = await fetch("https://api.example.com/users", {
    method: "POST",
    body: JSON.stringify({ name: "홍길동", email: "hong@example.com" }),
});
// ↑ 요청을 보냄 (클라이언트 → 서버)

// 2. 서버가 요청을 처리하고 응답을 보냄
// 서버: 사용자를 생성하고, 생성된 사용자 정보를 응답으로 보냄
// response = 서버로부터 받은 응답 객체 (서버 → 클라이언트)

// 3. 응답에서 데이터 추출
const newUser = await response.json();
// newUser = { id: 1, name: "홍길동", email: "hong@example.com", createdAt: "..." }
```

**왜 서버 응답을 받아야 하나?**

1. **생성된 데이터 확인**: 서버가 생성한 사용자의 ID, 생성 시간 등을 받을 수 있음

```javascript
// 클라이언트가 보낸 데이터
const userData = {
    name: "홍길동",
    email: "hong@example.com",
};

// 서버 응답 (서버가 추가한 정보 포함)
const newUser = {
    id: 1, // 서버가 생성한 ID
    name: "홍길동",
    email: "hong@example.com",
    createdAt: "2024-01-01T00:00:00Z", // 서버가 생성한 시간
    updatedAt: "2024-01-01T00:00:00Z",
};
```

2. **성공/실패 확인**: 요청이 성공했는지 실패했는지 알 수 있음

```javascript
const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(userData),
});

if (!response.ok) {
    // 응답을 받아야 성공/실패를 알 수 있음
    throw new Error("생성 실패");
}
```

3. **에러 메시지 확인**: 실패한 경우 서버가 보낸 에러 메시지를 받을 수 있음

```javascript
const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(userData),
});

if (!response.ok) {
    const errorData = await response.json();
    // errorData = { message: "이메일이 이미 사용 중입니다" }
    throw new Error(errorData.message);
}
```

**요청과 응답의 차이:**

```javascript
// 요청 (클라이언트 → 서버)
fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ name: "홍길동" }), // 보내는 데이터
});

// 응답 (서버 → 클라이언트)
const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ name: "홍길동" }),
});
// response = 서버로부터 받은 응답 객체

const data = await response.json();
// data = 서버가 보낸 데이터 (생성된 사용자 정보 등)
```

**실전 예시:**

```javascript
async function createUser(name, email) {
    // 1. 요청 보내기 (클라이언트 → 서버)
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email }),
    });
    // ↑ 요청을 보냄

    // 2. 응답 받기 (서버 → 클라이언트)
    const newUser = await response.json();
    // ↑ 서버가 보낸 응답 데이터를 받음
    // newUser = { id: 1, name: "홍길동", email: "hong@example.com" }

    // 3. 생성된 사용자 ID를 사용할 수 있음
    console.log("생성된 사용자 ID:", newUser.id);
    return newUser;
}
```

**비유로 이해하기:**

```javascript
// 편지 보내기와 답장 받기
// 1. 편지 보내기 (요청)
const 편지 = "안녕하세요, 사용자를 생성해주세요";
우체통에_넣기(편지); // 요청 보내기

// 2. 답장 받기 (응답)
const 답장 = 우체함에서_꺼내기(); // 응답 받기
// 답장 = "사용자가 생성되었습니다. ID는 1입니다."

// 편지를 보냈다고 끝이 아니라, 답장을 받아야 결과를 알 수 있음!
```

**중요한 질문: return newUser를 하는 이유가 생성한 데이터를 다시 클라이언트가 돌려받는 거라는 거지? PUT은 서버에 저장하기만 하면 끝 아냐? 왜 돌려받아야 돼?**

**답변:** 네, 맞습니다! 하지만 **성공/실패 확인**뿐만 아니라 **여러 이유**가 있습니다.

**서버 응답을 받는 이유:**

1. **성공/실패 확인** (가장 중요!)

```javascript
const response = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(userData),
});

// 응답을 받아야 성공/실패를 알 수 있음
if (!response.ok) {
    throw new Error("생성 실패");
}
// response.ok가 false면 실패, true면 성공
```

2. **서버가 생성/수정한 데이터 확인**

```javascript
// 클라이언트가 보낸 데이터
const userData = {
    name: "홍길동",
    email: "hong@example.com",
};

// 서버 응답 (서버가 추가한 정보)
const newUser = {
    id: 1, // 서버가 생성한 ID (클라이언트는 모름!)
    name: "홍길동",
    email: "hong@example.com",
    createdAt: "2024-01-01T00:00:00Z", // 서버가 생성한 시간
    updatedAt: "2024-01-01T00:00:00Z",
};

// ID를 사용해야 할 때 필요함
console.log("생성된 사용자 ID:", newUser.id);
```

3. **클라이언트에서 업데이트된 데이터 사용**

```javascript
async function createUser(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    const newUser = await response.json();
    // newUser를 반환해야 호출한 쪽에서 사용할 수 있음
    return newUser;
}

// 사용하는 쪽
const user = await createUser({ name: "홍길동" });
console.log(user.id); // 생성된 ID 사용
setUsers([...users, user]); // 화면에 추가
```

**PUT도 마찬가지로 응답을 받아야 합니다:**

```javascript
// PUT 요청도 응답을 받아야 함
async function updateUser(userId, userData) {
    const response = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify(userData),
    });

    // 응답을 받아야:
    // 1. 성공/실패 확인 가능
    if (!response.ok) {
        throw new Error("수정 실패");
    }

    // 2. 서버가 수정한 데이터 확인 가능
    const updatedUser = await response.json();
    // updatedUser = { id: 1, name: "김철수", updatedAt: "2024-01-02T00:00:00Z" }
    // 서버가 수정한 시간, 검증된 데이터 등을 받을 수 있음

    return updatedUser;
}
```

**중요한 질문: POST에서 try에 return 값을 안 줘도 서버에 있는 데이터는 삽입된 상태인 거지?**

**답변:** 네, 맞습니다! **`return`은 클라이언트에게 데이터를 반환하는 것**이고, **서버에 데이터를 저장하는 것과는 별개**입니다.

**서버 저장 vs 클라이언트 반환:**

```javascript
// 서버 저장: fetch 요청이 성공하면 서버에 저장됨
async function createUser(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    // 서버는 이미 여기서 데이터를 저장함!
    // response.ok가 true면 서버에 저장 완료

    // return은 클라이언트에게 데이터를 반환하는 것
    const newUser = await response.json();
    return newUser; // 클라이언트가 사용할 수 있도록 반환
}
```

**return을 안 해도 서버에는 저장됩니다:**

```javascript
// return 없이도 서버에는 저장됨
async function createUserWithoutReturn(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("생성 실패");
    }

    // return 없음!
    // 하지만 서버에는 이미 데이터가 저장되어 있음!
}

// 사용
await createUserWithoutReturn({ name: "홍길동" });
// 서버에는 저장됨, 하지만 클라이언트는 데이터를 받지 못함
```

**비교:**

```javascript
// 방법 1: return 없음 (서버에는 저장됨)
async function createUser1(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("실패");
    // return 없음 - 서버에는 저장됨, 클라이언트는 데이터를 받지 못함
}

// 방법 2: return 있음 (서버에 저장 + 클라이언트가 데이터 받음)
async function createUser2(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error("실패");
    const newUser = await response.json();
    return newUser; // 클라이언트가 데이터를 받을 수 있음
}

// 사용
await createUser1({ name: "홍길동" });
// 서버에는 저장됨, 하지만 생성된 사용자 정보를 받지 못함

const user = await createUser2({ name: "홍길동" });
// 서버에 저장됨 + 생성된 사용자 정보를 받음
console.log(user.id); // 생성된 ID 사용 가능
```

**언제 return을 안 해도 되나?**

```javascript
// 단순히 저장만 하면 되는 경우
async function saveUser(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("저장 실패");
    }

    // return 없음 - 서버에 저장만 하면 됨
    // 호출하는 쪽에서 데이터를 사용할 필요가 없음
}

// 사용
await saveUser({ name: "홍길동" });
// 서버에 저장됨, 끝!
```

**언제 return을 해야 하나?**

```javascript
// 생성된 데이터를 사용해야 하는 경우
async function createUser(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("생성 실패");
    }

    const newUser = await response.json();
    return newUser; // 생성된 데이터를 반환해야 함
}

// 사용
const user = await createUser({ name: "홍길동" });
// 생성된 사용자 정보를 받아서 사용
setUsers([...users, user]); // 화면에 추가
console.log(user.id); // ID 사용
```

**실전 예시: 생성한 데이터를 반환받아서 실제로 사용하기**

**웹 예시 1: 사용자 생성 후 화면에 추가하기**

```javascript
// React 컴포넌트 예시
import { useState } from "react";

function UserList() {
    const [users, setUsers] = useState([]); // 사용자 목록 상태

    // 사용자 생성 함수
    async function createUser(name, email) {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });

        if (!response.ok) {
            throw new Error("생성 실패");
        }

        const newUser = await response.json();
        // newUser = { id: 1, name: "홍길동", email: "hong@example.com", createdAt: "..." }
        return newUser; // 생성된 사용자 정보 반환
    }

    // 폼 제출 핸들러
    async function handleSubmit(name, email) {
        try {
            // 1. 사용자 생성 (서버에 저장)
            const newUser = await createUser(name, email);
            // ↑ 생성된 사용자 정보를 받음

            // 2. 화면에 추가 (받은 데이터 사용)
            setUsers([...users, newUser]);
            // ↑ 생성된 사용자를 목록에 추가
            // newUser.id를 사용할 수 있음!

            // 3. 성공 메시지
            alert(`사용자가 생성되었습니다! ID: ${newUser.id}`);
        } catch (error) {
            alert("생성 실패: " + error.message);
        }
    }

    return (
        <div>
            <button onClick={() => handleSubmit("홍길동", "hong@example.com")}>
                사용자 생성
            </button>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email}) - ID: {user.id}
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

**웹 예시 2: 게시글 작성 후 목록에 추가하기**

```javascript
function PostList() {
    const [posts, setPosts] = useState([]);

    async function createPost(title, content) {
        const response = await fetch("/api/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, content }),
        });

        if (!response.ok) {
            throw new Error("작성 실패");
        }

        const newPost = await response.json();
        // newPost = { id: 1, title: "제목", content: "내용", author: "홍길동", createdAt: "..." }
        return newPost;
    }

    async function handleCreatePost(title, content) {
        try {
            // 1. 게시글 작성
            const newPost = await createPost(title, content);
            // ↑ 생성된 게시글 정보를 받음

            // 2. 목록 맨 위에 추가 (받은 데이터 사용)
            setPosts([newPost, ...posts]);
            // ↑ 새 게시글을 맨 위에 추가
            // newPost.id를 key로 사용할 수 있음!

            // 3. 작성한 게시글 페이지로 이동
            window.location.href = `/posts/${newPost.id}`;
            // ↑ 생성된 게시글 ID로 페이지 이동
        } catch (error) {
            alert("작성 실패: " + error.message);
        }
    }

    return (
        <div>
            <button onClick={() => handleCreatePost("제목", "내용")}>
                게시글 작성
            </button>
            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                    <span>작성일: {post.createdAt}</span>
                </div>
            ))}
        </div>
    );
}
```

**웹 예시 3: 댓글 작성 후 화면에 즉시 표시하기**

```javascript
function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);

    async function createComment(text) {
        const response = await fetch(`/api/posts/${postId}/comments`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error("댓글 작성 실패");
        }

        const newComment = await response.json();
        // newComment = { id: 1, text: "댓글 내용", author: "홍길동", createdAt: "..." }
        return newComment;
    }

    async function handleSubmitComment(text) {
        try {
            // 1. 댓글 작성
            const newComment = await createComment(text);
            // ↑ 생성된 댓글 정보를 받음

            // 2. 화면에 즉시 추가 (받은 데이터 사용)
            setComments([...comments, newComment]);
            // ↑ 새 댓글을 목록에 추가
            // 서버에서 다시 불러오지 않아도 됨!

            // 3. 입력 필드 초기화
            document.getElementById("comment-input").value = "";
        } catch (error) {
            alert("댓글 작성 실패: " + error.message);
        }
    }

    return (
        <div>
            <input id="comment-input" placeholder="댓글을 입력하세요" />
            <button onClick={() => handleSubmitComment("댓글 내용")}>
                작성
            </button>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>{comment.text}</p>
                    <span>
                        {comment.author} - {comment.createdAt}
                    </span>
                </div>
            ))}
        </div>
    );
}
```

**웹 예시 4: 쇼핑몰 장바구니에 상품 추가하기**

```javascript
function ShoppingCart() {
    const [cartItems, setCartItems] = useState([]);

    async function addToCart(productId, quantity) {
        const response = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId, quantity }),
        });

        if (!response.ok) {
            throw new Error("장바구니 추가 실패");
        }

        const cartItem = await response.json();
        // cartItem = { id: 1, productId: 123, quantity: 2, price: 10000, total: 20000 }
        return cartItem;
    }

    async function handleAddToCart(productId, quantity) {
        try {
            // 1. 장바구니에 추가
            const cartItem = await addToCart(productId, quantity);
            // ↑ 추가된 장바구니 항목 정보를 받음

            // 2. 장바구니 목록에 추가 (받은 데이터 사용)
            setCartItems([...cartItems, cartItem]);
            // ↑ 새 항목을 장바구니에 추가

            // 3. 총 금액 업데이트
            const total =
                cartItems.reduce((sum, item) => sum + item.total, 0) +
                cartItem.total;
            // ↑ 받은 cartItem.total을 사용하여 총 금액 계산

            // 4. 성공 메시지
            alert(`장바구니에 추가되었습니다! 총 금액: ${total}원`);
        } catch (error) {
            alert("추가 실패: " + error.message);
        }
    }

    return (
        <div>
            <button onClick={() => handleAddToCart(123, 2)}>
                장바구니에 추가
            </button>
            <div>
                {cartItems.map((item) => (
                    <div key={item.id}>
                        상품 ID: {item.productId} - 수량: {item.quantity} -
                        금액: {item.total}원
                    </div>
                ))}
            </div>
        </div>
    );
}
```

**return 없이 사용하면 어떻게 될까?**

```javascript
// ❌ return 없이 사용하면
async function createUserWithoutReturn(name, email) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email }),
    });
    if (!response.ok) throw new Error("실패");
    // return 없음!
}

async function handleSubmit() {
    await createUserWithoutReturn("홍길동", "hong@example.com");
    // 문제: 생성된 사용자 정보를 받지 못함!
    // 문제: ID를 알 수 없음!
    // 문제: 화면에 추가할 수 없음!
    // 해결책: 서버에서 다시 전체 목록을 불러와야 함 (비효율적)
    const allUsers = await fetch("/api/users").then((r) => r.json());
    setUsers(allUsers); // 전체 목록을 다시 불러옴
}

// ✅ return 있으면
async function createUserWithReturn(name, email) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({ name, email }),
    });
    if (!response.ok) throw new Error("실패");
    const newUser = await response.json();
    return newUser; // 생성된 사용자 정보 반환
}

async function handleSubmit() {
    const newUser = await createUserWithReturn("홍길동", "hong@example.com");
    // 장점: 생성된 사용자 정보를 바로 받음!
    // 장점: 서버에서 다시 불러올 필요 없음!
    setUsers([...users, newUser]); // 바로 추가
}
```

**핵심 정리:**

-   **서버 저장**: `fetch` 요청이 성공하면 서버에 데이터가 저장됨 (return과 무관)
-   **클라이언트 반환**: `return`은 클라이언트가 서버 응답을 받아서 사용하기 위한 것
-   **return 없어도 서버에는 저장됨**: return은 클라이언트 편의를 위한 것
-   **return이 필요한 경우**: 생성된 데이터(ID, 타임스탬프 등)를 사용해야 할 때
-   **실제 사용 예시**:
    -   화면에 즉시 추가 (서버에서 다시 불러올 필요 없음)
    -   생성된 ID로 페이지 이동
    -   생성된 데이터로 상태 업데이트
    -   사용자에게 피드백 제공 (생성된 ID 표시 등)

**응답을 받지 않으면 어떻게 될까?**

```javascript
// ❌ 응답을 받지 않으면
async function createUserWrong(userData) {
    await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });
    // 응답을 받지 않음
    // 문제: 성공했는지 실패했는지 모름!
    // 문제: 생성된 ID를 알 수 없음!
    // 문제: 에러 메시지를 받을 수 없음!
    // 하지만 서버에는 저장될 수도 있음 (서버 구현에 따라)
}

// ✅ 응답을 받아야 함
async function createUserCorrect(userData) {
    const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        throw new Error("생성 실패"); // 성공/실패 확인
    }

    const newUser = await response.json();
    return newUser; // 생성된 데이터 반환
}
```

**실전 예시:**

```javascript
// 사용자 생성 후 화면에 추가하기
async function handleCreateUser() {
    try {
        const newUser = await createUser({
            name: "홍길동",
            email: "hong@example.com",
        });

        // newUser를 받아야 화면에 추가할 수 있음
        setUsers([...users, newUser]);

        // 생성된 ID를 사용할 수 있음
        console.log("생성된 사용자:", newUser.id);
    } catch (error) {
        // 에러 메시지를 받아야 사용자에게 알릴 수 있음
        alert(error.message);
    }
}
```

**정리:**

-   **성공/실패 확인**: 응답을 받아야 요청이 성공했는지 알 수 있음
-   **서버가 생성/수정한 데이터**: ID, 타임스탬프 등 서버가 추가한 정보를 받을 수 있음
-   **에러 메시지**: 실패한 경우 서버가 보낸 에러 메시지를 받을 수 있음
-   **클라이언트에서 사용**: 받은 데이터를 화면에 표시하거나 다른 작업에 사용할 수 있음
-   **PUT도 마찬가지**: 수정 요청도 응답을 받아야 성공/실패와 수정된 데이터를 확인할 수 있음

**핵심 정리:**

-   **`fetch()`는 양방향 통신**: 요청을 보내고 응답을 받음
-   **`response`는 서버로부터 받은 응답 객체**: 서버에 보낸 게 아님
-   **서버 응답에는 생성된 데이터가 포함됨**: ID, 생성 시간 등
-   **성공/실패 확인**: 응답을 받아야 요청이 성공했는지 알 수 있음
-   **에러 메시지 확인**: 실패한 경우 서버가 보낸 에러 메시지를 받을 수 있음
-   **PUT도 마찬가지**: 수정 요청도 응답을 받아야 함

**핵심 정리:**

-   **`headers`**: 요청에 대한 메타데이터 (데이터 형식, 인증 정보 등)
-   **`Content-Type: "application/json"`**: JSON 형식의 데이터를 전송한다는 의미
-   **`body`**: 서버에 전송할 실제 데이터
-   **`userData`**: JavaScript 객체 (문자열 아님)
-   **`JSON.stringify(userData)`**: 객체를 JSON 문자열로 변환
-   **HTTP 요청의 body는 문자열만 전송 가능**: 객체를 문자열로 변환해야 함

### PUT 요청

**PUT**은 서버의 기존 데이터를 **전체 수정(교체)**할 때 사용합니다.

**특징:**

-   기존 리소스를 전체적으로 교체함
-   요청 본문(body)에 전체 데이터를 포함함
-   멱등성: 같은 요청을 여러 번 해도 결과가 같음
-   리소스가 없으면 생성할 수도 있음 (서버 구현에 따라)

**사용 예시:**

-   사용자 정보 전체 수정
-   게시글 전체 수정
-   설정 전체 업데이트

**PATCH와의 차이:**

-   **PUT**: 전체 데이터를 교체 (모든 필드 필요)
-   **PATCH**: 부분 데이터만 수정 (일부 필드만 필요)

**기본 사용법:**

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

**DELETE**는 서버의 데이터를 **삭제**할 때 사용합니다.

**특징:**

-   리소스를 삭제함
-   요청 본문(body)이 없거나 선택적임
-   멱등성: 같은 요청을 여러 번 해도 결과가 같음 (이미 삭제된 것은 삭제할 수 없음)
-   캐시되지 않음

**사용 예시:**

-   사용자 삭제
-   게시글 삭제
-   댓글 삭제
-   파일 삭제

**기본 사용법:**

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

**HTTP 메서드 비교:**

| 메서드     | 용도             | 요청 본문 | 멱등성 | 캐시 | 사용 예시             |
| ---------- | ---------------- | --------- | ------ | ---- | --------------------- |
| **GET**    | 조회 (읽기)      | 없음      | ✅     | ✅   | 사용자 목록 조회      |
| **POST**   | 생성 (추가)      | 있음      | ❌     | ❌   | 새 사용자 생성        |
| **PUT**    | 전체 수정 (교체) | 있음      | ✅     | ❌   | 사용자 정보 전체 수정 |
| **DELETE** | 삭제             | 없음/선택 | ✅     | ❌   | 사용자 삭제           |

**CRUD 작업과의 매핑:**

-   **Create (생성)**: POST
-   **Read (읽기)**: GET
-   **Update (수정)**: PUT 또는 PATCH
-   **Delete (삭제)**: DELETE

**실전 예시:**

```javascript
// 사용자 관리 API 예시
const userId = 1;

// GET: 사용자 조회
const user = await fetch(`/api/users/${userId}`).then((r) => r.json());

// POST: 새 사용자 생성
const newUser = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "홍길동", email: "hong@example.com" }),
}).then((r) => r.json());

// PUT: 사용자 정보 전체 수정
const updatedUser = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "김철수", email: "kim@example.com" }),
}).then((r) => r.json());

// DELETE: 사용자 삭제
await fetch(`/api/users/${userId}`, {
    method: "DELETE",
});
```

**멱등성(Idempotent)이란?**

같은 요청을 여러 번 실행해도 결과가 같은 것을 의미합니다.

-   **GET**: 여러 번 호출해도 같은 데이터를 반환 (멱등)
-   **PUT**: 여러 번 호출해도 같은 상태가 됨 (멱등)
-   **DELETE**: 여러 번 호출해도 삭제된 상태 유지 (멱등)
-   **POST**: 여러 번 호출하면 여러 개가 생성됨 (멱등 아님)

**예시:**

```javascript
// GET: 멱등성 있음
await fetch("/api/users/1"); // 사용자 1 반환
await fetch("/api/users/1"); // 사용자 1 반환 (같은 결과)

// POST: 멱등성 없음
await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ name: "홍길동" }),
}); // 사용자 1 생성
await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify({ name: "홍길동" }),
}); // 사용자 2 생성 (다른 결과!)
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

API 유틸리티 함수를 만드는 주된 이유는 **코드 중복을 제거**하고 **유지보수성**을 높이기 위해서입니다. 실무에서는 `fetch`를 직접 호출하기보다 이렇게 감싸서 사용하는 것이 일반적입니다.

**왜 필요한가요?**

1.  **Base URL 관리**: 서버 주소(`https://api.example.com`)가 변경되었을 때, 유틸리티 파일 하나만 수정하면 모든 요청에 적용됩니다.
2.  **공통 헤더 설정**: 인증 토큰(Token), Content-Type 등 모든 요청에 들어가는 헤더를 매번 적지 않아도 됩니다.
3.  **일관된 에러 처리**: 에러 발생 시 로그를 남기거나, 특정 에러(예: 401 Unauthorized)에 대해 공통적으로 대응할 수 있습니다.
4.  **응답 데이터 가공**: `response.json()`을 매번 호출하는 번거로움을 줄일 수 있습니다.

```javascript
// utils/api.js
const API_BASE_URL = "https://api.example.com";

class ApiClient {
    constructor(baseURL = API_BASE_URL) {
        this.baseURL = baseURL;
        this.authToken = null;
    }

    // 공통 요청 메서드
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        // 기본 헤더 설정
        const config = {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...this.getAuthHeaders(), // 인증 헤더 자동 추가
                ...options.headers,
            },
        };

        try {
            const response = await fetch(url, config);

            // 공통 에러 처리
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.message ||
                        `HTTP error! status: ${response.status}`
                );
            }

            // 응답 데이터 반환 (204 No Content 등의 경우 처리 필요 시 추가 로직 작성)
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("API 요청 실패:", error);
            throw error; // 컴포넌트에서 처리할 수 있도록 에러를 다시 던짐
        }
    }

    // HTTP 메서드별 단축 함수
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

    // 인증 토큰 관리
    setAuthToken(token) {
        this.authToken = token;
    }

    getAuthHeaders() {
        return this.authToken
            ? { Authorization: `Bearer ${this.authToken}` }
            : {};
    }
}

// 싱글톤 인스턴스로 내보내기
export const apiClient = new ApiClient();

// 도메인별 API 모음 (사용하기 쉽게 정리)
export const userApi = {
    getAll: () => apiClient.get("/users"),
    getById: (id) => apiClient.get(`/users/${id}`),
    create: (userData) => apiClient.post("/users", userData),
    update: (id, userData) => apiClient.put(`/users/${id}`, userData),
    delete: (id) => apiClient.delete(`/users/${id}`),
};
```

### 🤔 심화: 왜 `class`를 만들고 `new`로 내보내나요?

JavaScript/React를 처음 접하시는 분들은 이 패턴이 낯설 수 있습니다.

```javascript
// 1. 클래스 정의
class ApiClient { ... }

// 2. 인스턴스를 생성해서 내보냄 (Singleton 패턴)
export const apiClient = new ApiClient();
```

이렇게 하는 이유는 **"기억하기 위해서(Stateful)"** 입니다.

**1. 함수형 방식의 한계**
만약 그냥 함수로만 만들었다면, 로그인 후 받은 **토큰(Token)**을 관리하기가 까다롭습니다.

```javascript
// 함수형 방식
export function getData(token) { ... } // 매번 토큰을 넘겨줘야 함
export function postData(token, data) { ... } // 매번 토큰을 넘겨줘야 함

// 사용할 때 불편함
getData("abc-123");
postData("abc-123", { ... });
```

**2. 클래스 + 인스턴스 방식의 장점**
클래스로 만든 객체는 **변수(상태)를 저장**할 수 있습니다.

```javascript
// 사용할 때
apiClient.setAuthToken("abc-123"); // 토큰을 한 번만 저장해두면

// 이후에는 토큰 신경 안 쓰고 편하게 사용
apiClient.get("/users"); // 알아서 토큰을 넣어서 요청함
apiClient.post("/posts", { ... }); // 알아서 토큰을 넣어서 요청함
```

**3. `new ApiClient()`로 내보내는 이유 (Singleton)**
앱 전체에서 **단 하나의 `apiClient`**만 존재하게 하기 위해서입니다.

-   A 컴포넌트에서 `setAuthToken`을 하면,
-   B 컴포넌트에서 `apiClient`를 쓸 때도 그 토큰이 적용되어 있습니다.
-   즉, **모든 파일에서 같은 설정을 공유**하게 됩니다.

### 커스텀 훅으로 API 호출

커스텀 훅(Custom Hook)을 사용하면 **데이터 가져오기(Fetching) 로직**과 **UI 렌더링 로직**을 완벽하게 분리할 수 있습니다.

**장점:**

1.  **관심사의 분리**: 컴포넌트는 "어떻게 데이터를 가져오는지" 몰라도 됩니다. "데이터가 무엇인지"만 신경 쓰면 됩니다.
2.  **상태 관리 자동화**: 로딩(`loading`), 에러(`error`), 데이터(`data`) 상태 관리를 훅 내부에서 처리하므로 컴포넌트 코드가 매우 간결해집니다.
3.  **재사용성**: 여러 컴포넌트에서 동일한 데이터가 필요할 때 훅만 호출하면 됩니다.

```javascript
import { useState, useEffect, useCallback } from "react";
import { userApi } from "../utils/api";

function useUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 데이터 불러오기 함수
    const fetchUsers = useCallback(async () => {
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
    }, []);

    // 컴포넌트 마운트 시 자동 실행
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    // 사용자 생성 (낙관적 업데이트 또는 재조회)
    const createUser = async (userData) => {
        try {
            // 1. 서버 요청
            const newUser = await userApi.create(userData);

            // 2. 상태 업데이트 (서버에서 다시 불러오지 않고 리스트에 추가)
            setUsers((prev) => [...prev, newUser]);
            return newUser;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // 사용자 삭제
    const deleteUser = async (id) => {
        try {
            await userApi.delete(id);
            // 삭제된 항목을 리스트에서 제거
            setUsers((prev) => prev.filter((user) => user.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // 컴포넌트에서 필요한 것만 반환
    return {
        users,
        loading,
        error,
        refetch: fetchUsers, // 수동으로 다시 불러오고 싶을 때 사용
        createUser,
        deleteUser,
    };
}

// 사용 예시: 컴포넌트가 매우 깔끔해집니다!
function UserListScreen() {
    // 로직은 훅 안에 다 숨겨져 있음
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

### 동기와 비동기

-   **동기 (Synchronous)**: `syn`(함께) + `chronous`(시간) = **시간을 맞춘다**
    -   작업이 완료될 때까지 다음 코드가 실행되지 않음
    -   순차적으로 실행됨
-   **비동기 (Asynchronous)**: `a`(부정) + `syn`(함께) + `chronous`(시간) = **시간을 맞추지 않는다**
    -   작업이 완료되기를 기다리지 않고 다음 코드를 실행
    -   독립적으로 실행됨
-   **왜 필요한가**: 네트워크 요청 등 시간이 걸리는 작업에서 앱이 멈추지 않도록 하기 위해

### 비동기 처리

-   **Promise**: 비동기 작업의 결과를 나타내는 객체
-   **.then()**: Promise 성공 시 실행되는 메서드
-   **.catch()**: Promise 실패 시 실행되는 메서드
-   **.finally()**: 성공/실패 관계없이 항상 실행되는 메서드
-   **async**: 함수를 비동기 함수로 만드는 키워드
-   **await**: Promise 완료를 기다리는 키워드 (async 함수 내에서만 사용)
-   **try-catch-finally**: 에러를 처리하는 JavaScript 기본 문법

### 네트워크 요청

-   **fetch**: 네트워크 요청을 위한 웹 표준 API
-   **GET**: 데이터 조회
-   **POST**: 데이터 생성
-   **PUT**: 데이터 수정
-   **DELETE**: 데이터 삭제

### 에러 처리 및 상태 관리

-   **에러 처리**: try-catch 또는 .catch()로 에러 처리
-   **로딩 상태**: 사용자 경험을 위해 로딩 상태 관리 필요
-   **병렬 처리**: Promise.all()로 여러 요청을 동시에 처리
