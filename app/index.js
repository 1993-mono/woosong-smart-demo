import { StyleSheet, View } from 'react-native';
import ScrollView from '@components/ScrollView';
import Text from '@components/Text';

export default function Home() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text>
          홈 화면입니다.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});