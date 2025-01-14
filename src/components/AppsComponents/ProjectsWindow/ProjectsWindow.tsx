import React, { useState } from "react";
import { PointerTypes, WindowTypes } from "../../../types/windowTypes";
import WindowComponent from "../../WindowComponent.tsx/WindowComponent";

function ProjectsWindow({ item, onClose, onMinimize }: WindowTypes) {
  const [filesPanelWidth, setFilesPanelWidth] = useState(300);
  const [isFilesPanelShow, setIsFilesPanelShow] = useState(false);
  // const [isResizing, setIsResizing] = useState(false);
  const [pointer, setPointer] = useState<PointerTypes>("pointer");

  const handleFilesPanelResize = (event: React.MouseEvent) => {
    const edge = filesPanelWidth + 48;

    const nearEdge = (x: number) => {
      return x > edge - 10 && x < edge + 10;
    };

    if (nearEdge(event.clientX)) {
      setPointer("cursor-e-resize");
      if (event.buttons === 1) handleReziseFilePanel(event);
      console.log(true);
    } else {
      setPointer("pointer");
    }
  };

  const handleReziseFilePanel = (event: React.MouseEvent) => {
    // if (event.clientX < 50 || event.clientX > (window.screenX*0.9)) return;
    setPointer("cursor-e-resize");
    setFilesPanelWidth(event.clientX);
  }

  return (
    <WindowComponent
      item={item}
      onClose={onClose}
      onMinimize={onMinimize}
      className="bg-[#1e1e1e] overflow-hidden"
    >
      <div className="flex h-full w-full">
        {/* 
        panel de iconos
        */}
        <div className="flex h-full w-12 left-0 bg-[#333333] ">1</div>
        {/* 
        panel de archivos
        */}
        <div
          className={`flex flex-col h-full w-[${filesPanelWidth}px] bg-[#252526] ${pointer}`}
          onMouseMoveCapture={handleFilesPanelResize}
        >
          <div className="flex w-full p-3 text-neutral-500 bg-red-500/20">
          Proyectos
          </div>
          <div>
            <button onClick={() => setIsFilesPanelShow(!isFilesPanelShow)} className="flex w-full bg-white/20 text-lg text-gray-400">
              {isFilesPanelShow 
              // agrega las flechas usando iconos
              ? (
                <img src="https://files.codesandbox.io/arrow-left.svg" alt="arrow-left" />
              )
              : (
                <img src="https://files.codesandbox.io/arrow-right.svg" alt="arrow-right" />
              )
              }
            </button>
          </div>
        </div>

        {/* 
        barra inferior de estado
        */}
        <div className="flex absolute bottom-0 left-0 w-full h-[3%] bg-blue-400">
          3
        </div>
      </div>
    </WindowComponent>
  );
}

export default ProjectsWindow;