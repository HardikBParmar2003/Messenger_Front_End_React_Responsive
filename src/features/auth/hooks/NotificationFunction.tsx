import React, { useContext, createContext, useState } from "react";

interface NotificationType {
  permission: NotificationPermission;
  askPermission: () => Promise<void>;
  sendNotification: (title: string, options?: NotificationOptions) => void;
}

const NotificationCntext = createContext<NotificationType>({
  permission: "default",
  askPermission: async () => {},
  sendNotification: () => {},
});

export function NotificationContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [permission, setPermission] = useState<NotificationPermission>(
    Notification.permission
  );

  const askPermission = async () => {
    if (Notification.permission === "default") {
      const perm = await Notification.requestPermission();
      setPermission(perm);
    } else {
      setPermission(Notification.permission);
    }
  };

  const sendNotification = (title: string, options?: NotificationOptions) => {
    if (permission == "granted") {
      new Notification(title, options);
    }
  };

  return (
    <NotificationCntext.Provider
      value={{ permission, askPermission, sendNotification }}
    >
      {children}
    </NotificationCntext.Provider>
  );
}

export const useNotifictionContext = () => useContext(NotificationCntext);
