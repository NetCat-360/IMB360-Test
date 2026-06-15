import {
    createSlice,
    PayloadAction,
  } from "@reduxjs/toolkit";
  
  type Message = {
    id: string;
    text: string;
    sender:
      | "me"
      | "other";
    timestamp: string;
  };
  
  type Chat = {
    id: string;
    name: string;
    initials: string;
    avatarColor: string;
  
    status:
      | "Online"
      | "Offline";
  
    messages: Message[];
  };
  
  type ChatState = {
    chats: Chat[];
  };
  
  const initialState:
    ChatState = {
    chats: [
      {
        id: "1",
  
        name:
          "Shashank Meena",
  
        initials:
          "SM",
  
        avatarColor:
          "#15803D",
  
        status:
          "Offline",
  
        messages: [
          {
            id: "1",
  
            text:
              "Hey! Looking forward to working with your brand.",
  
            sender:
              "other",
  
            timestamp:
              "10:30 AM",
          },
        ],
      },
  
      {
        id: "2",
  
        name:
          "Divansh",
  
        initials:
          "D",
  
        avatarColor:
          "#6B21A8",
  
        status:
          "Online",
  
        messages: [
          {
            id: "1",
  
            text:
              "Hi, I sent the campaign draft.",
  
            sender:
              "other",
  
            timestamp:
              "9:15 AM",
          },
        ],
      },
  
      {
        id: "3",
  
        name:
          "Ankit",
  
        initials:
          "A",
  
        avatarColor:
          "#2563EB",
  
        status:
          "Online",
  
        messages: [],
      },
    ],
  };
  
  const getTime =
    () => {
      return new Date()
        .toLocaleTimeString(
          [],
          {
            hour:
              "2-digit",
  
            minute:
              "2-digit",
          }
        );
    };
  
  const chatSlice =
    createSlice({
      name: "chat",
  
      initialState,
  
      reducers: {
        sendMessage: (
          state,
          action:
            PayloadAction<{
              chatId: string;
              text: string;
            }>
        ) => {
          const {
            chatId,
            text,
          } =
            action.payload;
  
          const chat =
            state.chats.find(
              item =>
                item.id ===
                chatId
            );
  
          if (
            chat &&
            text.trim()
          ) {
            chat.messages.push(
              {
                id:
                  Date.now().toString(),
  
                text:
                  text.trim(),
  
                sender:
                  "me",
  
                timestamp:
                  getTime(),
              }
            );
          }
        },
  
        receiveMessage:
          (
            state,
            action:
              PayloadAction<{
                chatId: string;
                text: string;
              }>
          ) => {
            const {
              chatId,
              text,
            } =
              action.payload;
  
            const chat =
              state.chats.find(
                item =>
                  item.id ===
                  chatId
              );
  
            if (
              chat &&
              text.trim()
            ) {
              chat.messages.push(
                {
                  id:
                    Date.now().toString(),
  
                  text:
                    text.trim(),
  
                  sender:
                    "other",
  
                  timestamp:
                    getTime(),
                }
              );
            }
          },
  
        deleteChat:
          (
            state,
            action:
              PayloadAction<string>
          ) => {
            state.chats =
              state.chats.filter(
                item =>
                  item.id !==
                  action.payload
              );
          },
      },
    });
  
  export const {
    sendMessage,
    receiveMessage,
    deleteChat,
  } =
    chatSlice.actions;
  
  export default
  chatSlice.reducer;