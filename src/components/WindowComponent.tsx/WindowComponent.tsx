import React, { useEffect, useRef, useState } from "react";
import { PointerTypes, WindowTypes } from "../../types/windowTypes";
import { lightIcons, darkIcons } from "../../assets/windowIcons";

function WindowComponent({
  onClose,
  onMinimize,
  children,
  item,
  className,
}: WindowTypes) {
  const [windowSize, setWindowSize] = useState({ width: 300, height: 400 });
  const [windowPrevSize, setWindowPrevSize] = useState({
    width: 600,
    height: 400,
  });
  const [position, setPosition] = useState({ x: 32, y: 20 });
  const [prevPosition, setPrevPosition] = useState({ x: 32, y: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [pointer, setPointer] = useState<PointerTypes>("pointer");
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const isDarkTheme = useRef<boolean>(window.localStorage.getItem("isDarkTheme") === "true");

  const maxSize = { width: window.innerWidth, height: window.innerHeight };
  const TASKBAR_SIZE = window.innerHeight * 0.055;

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
    } else {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [isResizing]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    if (!isMaximized) {
      setDragStart({
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      });
    } else {
      setIsMaximized(false);
      setWindowSize(windowPrevSize);
      setPosition({
        x: event.clientX - windowPrevSize.width / 2,
        y: event.clientY - 10,
      });
      setDragStart({
        x: windowPrevSize.width / 2,
        y: 10,
      });
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      if (
        event.clientX - dragStart.x + windowSize.width * 0.9 < 0 ||
        event.clientY - dragStart.y < 0 ||
        event.clientX - dragStart.x > maxSize.width - windowSize.width / 10 ||
        event.clientY - dragStart.y > maxSize.height - windowSize.height / 5
      ) {
        return;
      }
      setPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y,
      });
      setPrevPosition({
        x: event.clientX - dragStart.x,
        y: event.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleWindowMaximized = () => {
    if (!isMaximized) {
      setWindowPrevSize(windowSize);
      setPrevPosition(position);
      setIsMaximized(true);
      setWindowSize({
        width: maxSize.width,
        height: maxSize.height - TASKBAR_SIZE,
      });
      setPosition({ x: 0, y: 0 });
    } else {
      setIsMaximized(false);
      setPosition(prevPosition);
      setWindowSize(windowPrevSize);
    }
  };

  const handleResizeStart = (event: React.MouseEvent, type: PointerTypes) => {
    if (isMaximized) return;
    setIsResizing(true);
    setPointer(type);
    setResizeStart({ x: event.clientX, y: event.clientY });
    setWindowPrevSize(windowSize);
  };

  const handleResize = (event: MouseEvent) => {
    console.log(item.name);
    if (!isResizing) return;

    const deltaX = event.clientX - resizeStart.x;
    const deltaY = event.clientY - resizeStart.y;

    switch (pointer) {
      case "cursor-e-resize":
        setWindowSize({
          ...windowSize,
          width: Math.max(300, windowPrevSize.width + deltaX),
        });
        break;
      case "cursor-w-resize": {
        const newWidth = Math.max(300, windowPrevSize.width - deltaX);
        setWindowSize({ ...windowSize, width: newWidth });
        setPosition({
          ...position,
          x: position.x + (windowPrevSize.width - newWidth),
        });
        break;
      }
      case "cursor-s-resize":
        setWindowSize({
          ...windowSize,
          height: Math.max(300, windowPrevSize.height + deltaY),
        });
        break;
      case "cursor-n-resize": {
        if (position.y + deltaY < 0) {
          setIsMaximized(true);
          setWindowSize({
            width: maxSize.width,
            height: maxSize.height - TASKBAR_SIZE,
          });
          setPosition({ x: 0, y: 0 });
          setIsResizing(false);
          setPointer("pointer");
          return;
        }
        const newHeight = Math.max(300, windowPrevSize.height - deltaY);
        setWindowSize({ ...windowSize, height: newHeight });
        setPosition({
          ...position,
          y: position.y + (windowPrevSize.height - newHeight),
        });
        break;
      }
      // Add similar cases for diagonal resizing
      case "cursor-se-resize":
        setWindowSize({
          width: Math.max(300, windowPrevSize.width + deltaX),
          height: Math.max(240, windowPrevSize.height + deltaY),
        });
        break;
      case "cursor-sw-resize":
        setWindowSize({
          width: Math.max(300, windowPrevSize.width - deltaX),
          height: Math.max(240, windowPrevSize.height + deltaY),
        });
        setPosition({
          ...position,
          x: position.x + deltaX,
        });
        break;
      case "cursor-ne-resize":
        setWindowSize({
          width: Math.max(300, windowPrevSize.width + deltaX),
          height: Math.max(240, windowPrevSize.height - deltaY),
        });
        setPosition({
          ...position,
          y: position.y + deltaY,
        });
        break;
      case "cursor-nw-resize":
        setWindowSize({
          width: Math.max(300, windowPrevSize.width - deltaX),
          height: Math.max(240, windowPrevSize.height - deltaY),
        });
        setPosition({
          ...position,
          x: position.x + deltaX,
          y: position.y + deltaY,
        });
        break;
    }
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setPointer("pointer");
  };

  const handleReziseWindow = (event: React.MouseEvent) => {
    if (isResizing || isMaximized) return;

    const edges = {
      left: position.x,
      right: position.x + windowSize.width,
      top: position.y,
      bottom: position.y + windowSize.height,
    };

    const isNear = (value: number, target: number, range: number = 10) =>
      value > target - range && value < target + range;

    // Corners
    // Bottom right corner
    if (
      isNear(event.clientX, edges.right) &&
      isNear(event.clientY, edges.top)
    ) {
      setPointer("cursor-ne-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-ne-resize");
    }
    // Bottom left corner
    else if (
      isNear(event.clientX, edges.left) &&
      isNear(event.clientY, edges.top)
    ) {
      setPointer("cursor-nw-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-nw-resize");
    }
    // Bottom right corner
    else if (
      isNear(event.clientX, edges.right) &&
      isNear(event.clientY, edges.bottom)
    ) {
      setPointer("cursor-se-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-se-resize");
    }
    // Bottom left corner
    else if (
      isNear(event.clientX, edges.left) &&
      isNear(event.clientY, edges.bottom)
    ) {
      setPointer("cursor-sw-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-sw-resize");
    }

    // Edges
    // Top edge
    else if (isNear(event.clientY, edges.top)) {
      setPointer("cursor-n-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-n-resize");
    }
    // Bottom edge
    else if (isNear(event.clientY, edges.bottom)) {
      setPointer("cursor-s-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-s-resize");
    }
    // Right edge
    else if (isNear(event.clientX, edges.right)) {
      setPointer("cursor-e-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-e-resize");
    }
    // Left edge
    else if (isNear(event.clientX, edges.left)) {
      setPointer("cursor-w-resize");
      if (event.buttons === 1) handleResizeStart(event, "cursor-w-resize");
    }
    // Default
    else {
      setPointer("pointer");
    }
  };


  return (
    <div
      className={`absolute shadow-xl
        ${className}
        ${
          isMaximized
            ? "rounded-none transition-all duration-150"
            : "rounded-lg border-1 border-gray-400"
        } 
      ${pointer}`}
      style={{
        width: windowSize.width,
        height: windowSize.height,
        top: position.y,
        left: position.x,
      }}
    >
      <div
        className={`absolute inset-0 ${pointer}`}
        onMouseMove={handleReziseWindow}
        onMouseLeave={() => setPointer("pointer")}
      >
        <div
          className={`flex absolute w-full h-8 items-center bg-slate-300 ${
            isMaximized ? "rounded-none" : "rounded-t-lg"
          }`}
          onMouseDown={handleMouseDown}
          onDoubleClick={toggleWindowMaximized}
          // onMouseMove={(event) => handleMouseMove(event)}
          // onMouseUp={handleMouseUp}
        >
          {/* Window title */}
          <div className="flex absolute left-0 align-middle space-x-2 pl-2">
            {/* Window Icon */}
            <img src={item.icon} alt={item.name} className="w-6 h-6" />
            {/* Window App Name */}
            <p onClick={console.log}>{item ? item.name : "Window title"}</p>
          </div>

          {/* Window controls */}
          <div className="flex absolute h-full space-x-1 right-0 pb-1">
            {/* 
              // Minimize button
            */}
            <button
              className="aspect-square p-1.5 hover:bg-black/30 transition-all duration-100"
              onClick={onMinimize}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <img
                src={
                  isDarkTheme
                    ? darkIcons.minimizeIconDark
                    : lightIcons.minimizeIconLight
                }
                alt="minimize"
              />
            </button>

            {/* 
              // Maximize button
            */}
            <button
              className="aspect-square p-1.5 items-center justify-center  hover:bg-black/30 transition-all duration-100"
              onClick={toggleWindowMaximized}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <img
                src={
                  
                  isMaximized
                    ? (isDarkTheme ? darkIcons.restoreIconDark : lightIcons.restoreIconLight)
                    : (isDarkTheme ? darkIcons.maximizeIconDark : lightIcons.maximizeIconLight)
                }
                alt={isMaximized ? "restore" : "maximize"}
                className="items-center justify-center"
              />
            </button>

            {/* 
              // Close button
            */}
            <button
              className={`aspect-square p-1.5 items-center justify-center hover:bg-red-400 hover:bg-black/30  transition-all duration-100 ${
                isMaximized ? "rounded-r-none" : "rounded-tr-lg"
              }`}
              onClick={onClose}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <img src={isDarkTheme ? darkIcons.closeIconDark : lightIcons.closeIconLight} alt="close" />
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute inset-0 mt-8 overflow-auto ${className} ${isMaximized ? "rounded-none" : "rounded-b-lg"}`}
      >
        {children}
      </div>
    </div>
  );
}

export default WindowComponent;
