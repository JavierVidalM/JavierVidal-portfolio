import { WindowTypes } from "../../../types/windowTypes";
import WindowComponent from "../../WindowComponent.tsx/WindowComponent";

function ProjectsWindow({ item, onClose, onMinimize }: WindowTypes) {
  return (
    <WindowComponent
      item={item}
      onClose={onClose}
      onMinimize={onMinimize}
      className="bg-[#1e1e1e] rounded-b-lg flex"
    >
      <div className="absolute top-0 w-full h-9 bg-blue-400"></div>
      <div className="flex h-full w-12 left-0 pt-9 bg-[#333333] ">a</div>
      <div className="flex h-full w-[300px] pt-9 bg-[#252526]">a</div>
    </WindowComponent>
  );
}

export default ProjectsWindow;
