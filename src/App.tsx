import { useState } from "react";
import LockScreen from "./components/LockScreen/LockScreen";
import DesktopScreen from "./components/DesktopScreen/DesktopScreen";

function App() {
  const [isLocked, setIsLocked] = useState(true);

  return <>{isLocked ? <LockScreen onUnlock={() => setIsLocked(false)} /> : <DesktopScreen onLock={() => setIsLocked(true)} />}</>;
}

export default App;
