import { useCallback, useEffect, useEffectEvent } from "react";

export function UseEffectEvent({ roomId, theme }) {
  useEffect(() => {
    const connection = createConnection(roomId);

    connection.on('connected', () => {
      showNotification('Connected!', theme); // reads `theme`
    });

    connection.connect();

    return () => connection.disconnect();
  }, [roomId, theme]); // theme forces reconnect when it shouldn't
}


export function UseEffectEventFix({ roomId, theme }) {
  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme); // always sees latest theme
  });

  // const onConnectedTwo = useCallback(() => {
  //   showNotification('Connected!', theme); // always sees latest theme
  // }, [theme])

  useEffect(() => {
    const connection = createConnection(roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // only roomId needed now
}