import { useEffect, useState } from "react";
import LockScreen from "./components/LockScreen/LockScreen";
import DesktopScreen from "./components/DesktopScreen/DesktopScreen";


function App() {
  const [isLocked, setIsLocked] = useState(true);

  useEffect(() => {
    setIsLocked(
      window.localStorage.getItem("isLocked") === "true" ? true : false
    )
  }, [])

  console.log("isLocked", isLocked);
  

  return <>{isLocked ? <LockScreen onUnlock={() => setIsLocked(false)} /> : <DesktopScreen onLock={() => setIsLocked(true)} />}</>;

}

export default App;
