import { StyleSheet, TextInput, View, Pressable, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function MemoScreen() {
  const [noteText, setNoteText] = useState('');
  const textColor = useThemeColor({}, 'text');
  
  const handleSend = () => {
    if (!noteText.trim()) {
      Alert.alert('提示', '请输入内容');
      return;
    }
    // TODO: 处理发送逻辑
    setNoteText('');
  };

  const handleToolbarPress = (tool: string) => {
    switch (tool) {
      case 'hashtag':
        setNoteText(prev => prev + '#');
        break;
      case 'list':
        setNoteText(prev => prev + '\n- ');
        break;
      case 'bold':
        setNoteText(prev => prev + '**');
        break;
      case 'image':
        Alert.alert('提示', '图片上传功能开发中');
        break;
    }
  };

  const handleMoreOptions = () => {
    Alert.alert('更多选项', '选择操作', [
      { text: '编辑', onPress: () => console.log('编辑') },
      { text: '删除', onPress: () => console.log('删除'), style: 'destructive' },
      { text: '取消', style: 'cancel' },
    ]);
  };
  
  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable 
          onPress={() => Alert.alert('菜单', '菜单功能开发中')}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.buttonPressed
          ]}>
          <Ionicons name="menu-outline" size={24} color={textColor} />
        </Pressable>
        <ThemedText type="title" style={styles.headerTitle}>MEMO</ThemedText>
        <Pressable 
          onPress={() => Alert.alert('搜索', '搜索功能开发中')}
          style={({ pressed }) => [
            styles.headerButton,
            pressed && styles.buttonPressed
          ]}>
          <Ionicons name="search-outline" size={24} color={textColor} />
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Editor Card */}
        <View style={styles.editorCard}>
          <TextInput
            style={styles.input}
            placeholder="What's in your mind?"
            placeholderTextColor="#999"
            multiline
            value={noteText}
            onChangeText={setNoteText}
          />
          
          {/* Toolbar */}
          <View style={styles.toolbar}>
            <Pressable 
              onPress={() => handleToolbarPress('hashtag')}
              style={({ pressed }) => [
                styles.toolbarButton,
                pressed && styles.buttonPressed
              ]}>
              <ThemedText style={styles.hashTag}>#</ThemedText>
            </Pressable>
            <Pressable 
              onPress={() => handleToolbarPress('list')}
              style={({ pressed }) => [
                styles.toolbarButton,
                pressed && styles.buttonPressed
              ]}>
              <Ionicons name="list" size={24} color="#666" />
            </Pressable>
            <Pressable 
              onPress={() => handleToolbarPress('bold')}
              style={({ pressed }) => [
                styles.toolbarButton,
                pressed && styles.buttonPressed
              ]}>
              <ThemedText style={styles.boldB}>B</ThemedText>
            </Pressable>
            <Pressable 
              onPress={() => handleToolbarPress('image')}
              style={({ pressed }) => [
                styles.toolbarButton,
                pressed && styles.buttonPressed
              ]}>
              <Ionicons name="image-outline" size={24} color="#666" />
            </Pressable>
            <View style={styles.spacer} />
            <Pressable 
              onPress={handleSend}
              style={({ pressed }) => [
                styles.sendButton,
                pressed && styles.sendButtonPressed
              ]}>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Content Cards */}
        <View style={styles.contentCard}>
          <View style={styles.contentHeader}>
            <ThemedText style={styles.timestamp}>2021-07-26 17:52:05</ThemedText>
            <Pressable 
              onPress={handleMoreOptions}
              style={({ pressed }) => [
                styles.moreButton,
                pressed && styles.buttonPressed
              ]}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
            </Pressable>
          </View>
          
          <ThemedText style={styles.contentText}>
            Normal is just a construct, and to the extent that you can see normal as a construct in yourself, you have freed yourself from the constraints of thinking this is the way the world is. Because it isn't. This is the way we are.
          </ThemedText>

          <View style={styles.tags}>
            <Pressable>
              <ThemedText style={styles.tag}>#Alan_kay</ThemedText>
            </Pressable>
            <Pressable>
              <ThemedText style={styles.tag}>#QUOTE</ThemedText>
            </Pressable>
          </View>

          <Pressable>
            <ThemedText style={styles.link}>www.goodreads.com</ThemedText>
          </Pressable>
        </View>

        <View style={styles.contentCard}>
          <View style={styles.contentHeader}>
            <ThemedText style={styles.timestamp}>2021-07-26 17:49:03</ThemedText>
            <Pressable 
              onPress={handleMoreOptions}
              style={({ pressed }) => [
                styles.moreButton,
                pressed && styles.buttonPressed
              ]}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
            </Pressable>
          </View>
          
          <ThemedText style={styles.contentText}>
            Independent-mindedness seems to be more a matter of nature than nurture. Which means if you pick the wrong type of work, you're going to be unhappy. If you're naturally independent-minded, you're going to find it frustrating to be a middle manager. And if you're naturally
          </ThemedText>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  editorCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    fontSize: 16,
    minHeight: 40,
    color: '#333',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  toolbarButton: {
    padding: 8,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hashTag: {
    fontSize: 22,
    fontWeight: '500',
    color: '#666',
  },
  boldB: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  spacer: {
    flex: 1,
  },
  sendButton: {
    backgroundColor: '#4CAF50',
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    color: '#6B7AED',
    fontSize: 14,
  },
  link: {
    color: '#6B7AED',
    fontSize: 14,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  sendButtonPressed: {
    backgroundColor: '#3d8c40',
  },
  headerButton: {
    padding: 8,
  },
  moreButton: {
    padding: 4,
  },
});
