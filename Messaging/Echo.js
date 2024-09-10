import React, { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const WebSocketProvider = () => {
  useEffect(() => {
    window.Pusher = Pusher;

      window.Echo = new Echo({
          broadcaster: 'reverb',
          key: process.env.VITE_REVERB_APP_KEY,
          wsHost: process.env.VITE_REVERB_HOST,
          wsPort: process.env.VITE_REVERB_PORT || 80,
          wssPort: process.env.VITE_REVERB_PORT || 443,
          forceTLS: (process.env.VITE_REVERB_SCHEME || 'https') === 'https',
          enabledTransports: ['ws', 'wss'],
          authorizer: (channel) => {
              return {
                  authorize: (socketId, callback) => {
                      window.axios
                          .post('/broadcasting/auth', {
                              socket_id: socketId,
                              channel_name: channel.name,
                          })
                          .then((response) => {
                              callback(false, response.data);
                          })
                          .catch((error) => {
                              callback(true, error);
                          });
                  },
              };
          },
      });


    return () => {
      if (window.Echo) {
        window.Echo.disconnect();
      }
    };
  }, []);

  return null; 
};

export default WebSocketProvider;
