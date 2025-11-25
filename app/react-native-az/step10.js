import { useState } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Layout_ReactNativeAz from '@components/Layout_ReactNativeAz';
import Text from '@components/Text';
import { FONT_SIZE, COLORS, SPACING } from '@constants/theme';

export default function ReactNativeAz_Step10() {
  // 상태 관리
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({ title: '', body: '' });
  const [createdPost, setCreatedPost] = useState(null);

  // 1. GET 요청 - 사용자 목록 가져오기
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다');
      }

      const data = await response.json();
      setUsers(data);
      Alert.alert('성공', `${data.length}명의 사용자를 불러왔습니다.`);
    } catch (err) {
      setError(err.message);
      Alert.alert('에러', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. GET 요청 - 특정 사용자 정보 가져오기
  const fetchUserById = async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://jsonplaceholder.typicode.com/users/${userId}`);

      if (!response.ok) {
        throw new Error('사용자 정보를 불러오는데 실패했습니다');
      }

      const user = await response.json();
      Alert.alert('사용자 정보', `이름: ${user.name}\n이메일: ${user.email}\n전화: ${user.phone}`);
    } catch (err) {
      setError('error', err.message);
      Alert.alert('에러', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. POST 요청 - 새 게시글 생성
  const createPost = async () => {
    if (!postData.title || !postData.body) {
      Alert.alert('오류', '제목과 내용을 모두 입력해주세요');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: postData.title,
          body: postData.body,
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('게시글 생성에 실패했습니다');
      }

      const newPost = await response.json();
      setCreatedPost(newPost);
      Alert.alert('성공', `게시글이 생성되었습니다!\nID: ${newPost.id}`);
      setPostData({ title: '', body: '' });
    } catch (err) {
      setError(err.message);
      Alert.alert('에러', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 4. PUT 요청 - 게시글 수정
  const updatePost = async (postId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: postId,
          title: '수정된 제목',
          body: '수정된 내용',
          userId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error('게시글 수정에 실패했습니다');
      }

      const updatedPost = await response.json();
      Alert.alert('성공', `게시글이 수정되었습니다!\nID: ${updatedPost.id}`);
    } catch (err) {
      setError(err.message);
      Alert.alert('에러', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 5. DELETE 요청 - 게시글 삭제
  const deletePost = async (postId) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('게시글 삭제에 실패했습니다');
      }

      Alert.alert('성공', `게시글(ID: ${postId})이 삭제되었습니다.`);
    } catch (err) {
      setError(err.message);
      Alert.alert('에러', err.message);
    } finally {
      setLoading(false);
    }
  };

  // 6. 에러 처리 예제 - 존재하지 않는 사용자 조회
  const fetchNonExistentUser = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://jsonplaceholder.typicode.com/users/99999');

      if (response.status === 404) {
        throw new Error('사용자를 찾을 수 없습니다 (404)');
      }

      if (!response.ok) {
        throw new Error(`HTTP 에러: ${response.status}`);
      }

      const user = await response.json();
      Alert.alert('사용자 정보', `이름: ${user.name}`);
    } catch (err) {
      setError(err.message);
      Alert.alert('에러', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout_ReactNativeAz label="10. 네트워크 요청과 API 통신" backgroundColor={COLORS.BACKGROUND}>
      <View style={styles.container}>
        {/* 에러 상태 표시 */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              에러: {error}
            </Text>
          </View>
        )}

        {/* 1. GET 요청 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. GET 요청 - 사용자 목록 가져오기</Text>
          <Text style={styles.description}>JSONPlaceholder API를 사용하여 사용자 목록을 가져옵니다.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={fetchUsers}
            disabled={loading}
          >
            <Text style={styles.buttonText}>사용자 목록 가져오기</Text>
          </TouchableOpacity>

          {users.length > 0 && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>
                불러온 사용자 ({users.length}명)
              </Text>
              {users.slice(0, 3).map((user, index) => (
                <TouchableOpacity
                  key={user.id}
                  style={[
                    styles.userItem,
                    index === 0 && styles.userItemFirst,
                  ]}
                  onPress={() => fetchUserById(user.id)}
                >
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userEmail}>{user.email}</Text>
                </TouchableOpacity>
              ))}
              {users.length > 3 && (
                <Text style={styles.userMoreText}>... 외 {users.length - 3}명</Text>
              )}
            </View>
          )}
        </View>

        {/* 2. POST 요청 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. POST 요청 - 새 게시글 생성</Text>
          <Text style={styles.description}>제목과 내용을 입력하여 새 게시글을 생성합니다.</Text>

          <TextInput
            style={styles.input}
            placeholder="제목을 입력하세요"
            placeholderTextColor={COLORS.TEXT_LIGHT}
            value={postData.title}
            onChangeText={(text) => setPostData({ ...postData, title: text })}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="내용을 입력하세요"
            placeholderTextColor={COLORS.TEXT_LIGHT}
            value={postData.body}
            onChangeText={(text) => setPostData({ ...postData, body: text })}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={createPost}
            disabled={loading}
          >
            <Text style={styles.buttonText}>게시글 생성하기</Text>
          </TouchableOpacity>

          {createdPost && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>생성된 게시글</Text>
              <View style={styles.postContainer}>
                <Text style={[styles.postName, styles.postNameFirst]}>ID</Text>
                <Text style={styles.postEmail}>{createdPost.id}</Text>
                <Text style={styles.postName}>제목</Text>
                <Text style={styles.postEmail}>{createdPost.title}</Text>
                <Text style={styles.postName}>내용</Text>
                <Text style={styles.postEmail}>{createdPost.body}</Text>
              </View>
            </View>
          )}
        </View>

        {/* 3. PUT 요청 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. PUT 요청 - 게시글 수정</Text>
          <Text style={styles.description}>게시글 ID 1번을 수정합니다.</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => updatePost(1)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>게시글 수정하기 (ID: 1)</Text>
          </TouchableOpacity>
        </View>

        {/* 4. DELETE 요청 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. DELETE 요청 - 게시글 삭제</Text>
          <Text style={styles.description}>게시글 ID 1번을 삭제합니다.</Text>
          <TouchableOpacity
            style={[styles.button, styles.deleteButton]}
            onPress={() => deletePost(1)}
            disabled={loading}
          >
            <Text style={styles.buttonText}>게시글 삭제하기 (ID: 1)</Text>
          </TouchableOpacity>
        </View>

        {/* 5. 에러 처리 예제 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. 에러 처리 예제</Text>
          <Text style={styles.description}>존재하지 않는 사용자(ID: 99999)를 조회하여 에러 처리를 확인합니다.</Text>
          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={fetchNonExistentUser}
            disabled={loading}
          >
            <Text style={styles.buttonText}>존재하지 않는 사용자 조회 (에러 발생)</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout_ReactNativeAz>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: SPACING.LARGE,
  },
  section: {
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    padding: SPACING.MEDIUM,
  },
  sectionTitle: {
    fontWeight: '700',
  },
  description: {
    marginTop: SPACING.XS,
  },
  button: {
    alignItems: 'center',
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.PRIMARY,
    padding: SPACING.XS,
    marginTop: SPACING.SMALL,
  },
  deleteButton: {
    backgroundColor: COLORS.RED,
  },
  errorButton: {
    backgroundColor: COLORS.RED,
  },
  buttonText: {
    fontSize: FONT_SIZE.SMALL,
    color: '#fff',
    fontWeight: '600',
  },
  resultContainer: {
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.BACKGROUND_SECONDARY,
    padding: SPACING.MEDIUM,
    marginTop: SPACING.MEDIUM,
  },
  resultTitle: {
    fontWeight: '600',
  },

  // 에러 상태 표시
  errorContainer: {
    borderRadius: SPACING.XS,
    backgroundColor: COLORS.RED_LIGHT,
    padding: SPACING.MEDIUM,
  },
  errorText: {
    color: '#fff',
    fontWeight: '600',
  },

  // 1. GET 요청 예제
  userItem: {
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    padding: SPACING.SMALL,
    marginTop: SPACING.XS,
  },
  userItemFirst: {
    marginTop: SPACING.SMALL,
  },
  userName: {
    fontSize: FONT_SIZE.SMALL,
    fontWeight: '600',
  },
  userEmail: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
  },
  userMoreText: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
    marginTop: SPACING.XS,
  },

  // 2. POST 요청 예제
  input: {
    borderRadius: SPACING.XS,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    paddingHorizontal: SPACING.MEDIUM,
    marginTop: SPACING.SMALL,
  },
  postContainer: {
    borderRadius: SPACING.XS,
    backgroundColor: '#fff',
    padding: SPACING.SMALL,
    marginTop: SPACING.SMALL,
  },
  postName: {
    borderTopWidth: 1,
    borderTopColor: COLORS.BORDER,
    paddingTop: SPACING.SMALL,
    fontSize: FONT_SIZE.SMALL,
    fontWeight: '600',
    marginTop: SPACING.SMALL,
  },
  postNameFirst: {
    borderTopWidth: 0,
    paddingTop: 0,
    marginTop: 0,
  },
  postEmail: {
    fontSize: FONT_SIZE.SMALL,
    color: COLORS.TEXT_LIGHT,
  },
});