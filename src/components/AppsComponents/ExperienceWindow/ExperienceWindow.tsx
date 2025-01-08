import { WindowTypes } from "../../../types/windowTypes";
import WindowComponent from "../../WindowComponent.tsx/WindowComponent";

function ExperienceWindow({item, onClose, onMinimize}: WindowTypes) {
  return (
    <WindowComponent item={item} onClose={onClose} onMinimize={onMinimize}>
        <div>
            <p>hola</p>
        </div>
    </WindowComponent>
  );
}

export default ExperienceWindow;