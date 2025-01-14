import { WindowTypes } from "../../../types/windowTypes";
import WindowComponent from "../../WindowComponent.tsx/WindowComponent";

function SettingsWindow({onClose, onMinimize, item}: WindowTypes) {
    return (
        <WindowComponent onClose={onClose} onMinimize={onMinimize} item={item} className="bg-[#1e1e1e]">
        <div>
        </div>
        </WindowComponent>
    );
}

export default SettingsWindow;