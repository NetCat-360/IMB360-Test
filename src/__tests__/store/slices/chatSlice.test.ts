import chatReducer, {
  sendMessage,
  receiveMessage,
  deleteChat,
} from '../../../store/slices/chatSlice';

describe('chatSlice', () => {
  it('should return initial state with 3 chats', () => {
    const state = chatReducer(undefined, { type: 'unknown' });
    expect(state.chats).toHaveLength(3);
    expect(state.chats[0].name).toBe('Shashank Meena');
    expect(state.chats[2].messages).toEqual([]);
  });

  it('should handle sendMessage to existing chat', () => {
    const state = chatReducer(undefined, sendMessage({ chatId: '1', text: 'Hello!' }));
    const chat = state.chats.find(c => c.id === '1');
    expect(chat?.messages).toHaveLength(2);
    expect(chat?.messages[1].text).toBe('Hello!');
    expect(chat?.messages[1].sender).toBe('me');
  });

  it('should not add message for empty text', () => {
    const state = chatReducer(undefined, sendMessage({ chatId: '1', text: '   ' }));
    const chat = state.chats.find(c => c.id === '1');
    expect(chat?.messages).toHaveLength(1);
  });

  it('should not add message for non-existent chat', () => {
    const state = chatReducer(undefined, sendMessage({ chatId: '999', text: 'Hello' }));
    expect(state.chats).toHaveLength(3);
  });

  it('should handle receiveMessage', () => {
    const state = chatReducer(undefined, receiveMessage({ chatId: '2', text: 'Got it!' }));
    const chat = state.chats.find(c => c.id === '2');
    expect(chat?.messages).toHaveLength(2);
    expect(chat?.messages[1].text).toBe('Got it!');
    expect(chat?.messages[1].sender).toBe('other');
  });

  it('should handle receiveMessage with empty text', () => {
    const state = chatReducer(undefined, receiveMessage({ chatId: '2', text: '' }));
    const chat = state.chats.find(c => c.id === '2');
    expect(chat?.messages).toHaveLength(1);
  });

  it('should handle deleteChat', () => {
    const state = chatReducer(undefined, deleteChat('1'));
    expect(state.chats).toHaveLength(2);
    expect(state.chats.find(c => c.id === '1')).toBeUndefined();
  });

  it('should handle deleteChat with non-existent id', () => {
    const state = chatReducer(undefined, deleteChat('999'));
    expect(state.chats).toHaveLength(3);
  });

  it('should handle sendMessage to empty messages chat', () => {
    const state = chatReducer(undefined, sendMessage({ chatId: '3', text: 'First message' }));
    const chat = state.chats.find(c => c.id === '3');
    expect(chat?.messages).toHaveLength(1);
    expect(chat?.messages[0].sender).toBe('me');
  });
});
