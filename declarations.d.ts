declare module 'react-native-websocket' {
  import { Component } from 'react';

  interface WebSocketProps {
    url: string;
    reconnect?: boolean;
    reconnectInterval?: number;
    reconnectAttempts?: number;
    onOpen?: (event: WebSocketEventMap['open']) => void;
    onClose?: (event: WebSocketEventMap['close']) => void;
    onMessage?: (event: WebSocketEventMap['message']) => void;
    onError?: (event: WebSocketEventMap['error']) => void;
    children?: React.ReactNode;
  }

  export default class WebSocket extends Component<WebSocketProps> {}
}
