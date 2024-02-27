import * as React from "react";

import { gameName } from "config";
import { navigate } from "utils";

import styles from "./styles.module.scss";

export const PreloaderScreen = () => {
  const [loadingMessage, setLoadingMessage] = React.useState("Loading");
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => prev + 1);

      if (loadingProgress >= 100) {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    if (loadingProgress >= 100) {
      navigate("mainMenu", { showClickToStart: true });
    }
  }, [loadingProgress]);

  return (
    <div className={styles.container}>
      <div className={styles.gameName}>{gameName}</div>
      <div className={styles.loader}>
        <div className={styles.loadingText}>{loadingMessage}</div>
        <div className={styles.progressBar}>
          <div
            style={{
              width: `${loadingProgress}%`,
            }}
            className={styles.progressBarInner}
          />
        </div>
      </div>
    </div>
  );
};
