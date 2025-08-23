import { useEffect, useState } from "react";

export const useOnline = () => {
  const [isOnline, SetIsOnline] = useState(true);
  useEffect(() => {
    window.addEventListener("offline", () => {
      SetIsOnline(false);
    });
    window.addEventListener("online", () => {
      SetIsOnline(true);
    })

    //cleanup
    return () => {
      window.removeEventListener("offline", () => {
      SetIsOnline(false);
    });
    window.removeEventListener("online", () => {
      SetIsOnline(false);
    })
    }
  }, [isOnline]);

  return isOnline
};