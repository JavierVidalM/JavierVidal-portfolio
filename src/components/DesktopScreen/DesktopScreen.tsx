import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/6201771.jpg";
// import chevronRight from "../../assets/chevron_right.svg";
import { defaultItems } from "../../utils/desktopItems";
import "./DesktopScreen.css";

function DesktopScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState<string>("00:00");
  const [date, setDate] = useState<string>("01/01/2025");
  // const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0,});
  const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  // const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  // const [viewSubMenuVisible, setViewSubMenuVisible] = useState(false);
  // const [sortSubMenuVisible, setSortSubMenuVisible] = useState(false);
  const [items, setItems] = useState(defaultItems);
  // const [gridSize, setGridSize] = useState({ cols: 18, rows: 8 });

  const TASKBAR_HEIGHT = window.innerHeight * 0.055;
  const gridSize = { cols: 18, rows: 8 };
  const GRID_SIZE = {
    width: window.innerWidth / gridSize.cols,
    height: (window.innerHeight - TASKBAR_HEIGHT) / gridSize.rows,
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      console.log(now);

      setTime(
        now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0")
      );

      setDate(
        now.getDate().toString().padStart(2, "0") +
          "/" +
          (now.getMonth() + 1).toString().padStart(2, "0") +
          "/" +
          now.getFullYear()
      );
    };

    updateTime();
    const intervalId = setInterval(
      updateTime,
      60000 - new Date().getSeconds() * 1000
    );

    return () => clearInterval(intervalId);
  }, []);

  // const handleRightClick = (event: React.MouseEvent) => {
  //   event.preventDefault();
  //   setContextMenuPosition({ x: event.clientX, y: event.clientY });
  //   setIsContextMenuVisible(true);
  // };

  // const handleClickOutsideContextMenu = () => {
  //   setIsContextMenuVisible(false);
  // };

  const snapToGrid = (
    row: number,
    col: number,
    items: typeof defaultItems,
    id: number
  ) => {
    const maxRow = gridSize.rows;
    const maxCol = gridSize.cols;

    const clampedRow = Math.min(Math.max(row, 1), maxRow);
    const clampedCol = Math.min(Math.max(col, 1), maxCol);

    const isOccupied = items.some(
      (item) =>
        item.id !== id && item.row === clampedRow && item.col === clampedCol
    );

    if (isOccupied) {
      const currentItem = items.find((item) => item.id === id);
      return currentItem
        ? { row: currentItem.prevRow, col: currentItem.prevCol }
        : { row: 1, col: 1 };
    }

    return { row: clampedRow, col: clampedCol };
  };

  const handleDragStart = (event: React.DragEvent, id: number) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setDragStartOffset({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
    event.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const id = parseInt(event.dataTransfer.getData("text/plain"), 10);

    const item = items.find((item) => item.id === id);
    if (!item) return;

    const col = Math.floor(event.clientX / GRID_SIZE.width) + 1;
    const row = Math.floor(event.clientY / GRID_SIZE.height) + 1;

    const snappedPos = snapToGrid(row, col, items, id);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              ...snappedPos,
              prevRow: snappedPos.row,
              prevCol: snappedPos.col,
            }
          : item
      )
    );
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  // const handleResizeGrid = (size: string) => {
  //   {
  //     /*
  //     on large icons: 18x6
  //     on medium icons: 25x8
  //     on small icons: 25x12
  //     */
  //   }
  //   switch (size) {
  //     case "large-icons":
  //       setGridSize({ cols: 18, rows: 6 });
  //       break;
  //     case "medium-icons":
  //       setGridSize({ cols: 25, rows: 8 });
  //       break;
  //     case "small-icons":
  //       setGridSize({ cols: 25, rows: 12 });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleSelectItem = (id: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleDoubleClick = (id: number) => {
    
  }

  return (
    <div
      className={`flex overflow-hidden w-screen h-screen${
        !backgroundImage ? "bg-violet-700" : ""
      } align-middle  justify-center select-none ${
        isVisible ? "opacity-100" : "opacity-100"
      }`}
      // style={{
      //   width: windowWidth,
      //   height: windowHeight,
      // }}
      // onClick={handleClickOutsideContextMenu}
    >
      <img
        src={backgroundImage}
        alt="desktop screen image"
        className="w-full h-full object-cover fixed top-0 left-0 -z-10"
      />
      <div
        className="desktop-container p-10"
        style={{ position: "relative", width: "100%", height: "100%" }}
        // onContextMenu={(event) => handleRightClick(event)}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Desktop icons */}
        {items.map((item) => (
          <div
            key={item.id}
            className={`absolute desktop-item items-center justify-center hover:bg-slate-200/20 rounded-md align-bottom ${
              item.selected ? "bg-slate-200/30" : ""
            }`}
            onDragStart={(event) => handleDragStart(event, item.id)}
            onClick={() => handleSelectItem(item.id)}
            onDoubleClick={}
            draggable
            style={{
              position: "absolute",
              left: (item.col - 1) * GRID_SIZE.width,
              top: (item.row - 1) * GRID_SIZE.height,
              width: GRID_SIZE.width - 5,
              height: GRID_SIZE.height - 5,
              margin: 10,
            }}
          >
            <div className="flex w-full items-center justify-center text-6xl align-top">
              {item.icon}
            </div>
            <p className="absolute w-full text-center text-white bottom-0">
              {item.name}
            </p>
          </div>
        ))}
      </div>
      {/* Taskbar */}
      <div className="absolute w-full h-[5.5%] bottom-0 bg-black/30 backdrop-blur-lg items-center">
        {/* Taskbar home button */}
        <div className="flex aboluste w-full h-full items-center justify-start px-[1%]">
          <div className="flex items-center justify-center button-inner-shadow px-[6px] h-[82%] rounded-md">
            <button className="bg-gradient-to-tl from-[#0277d3] to-[#4bd0fe] aspect-square h-[75%] text-slate-200 font-bold rounded-md text-center items-center justify-center ">
              JV
            </button>
          </div>
          {/* taskbar date/hour */}
          <div className="absolute right-0 px-[1%] items-center justify-center text-white font-light text-sm text-center">
            <p>{time}</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
      {/* {isContextMenuVisible && (
        <div
          className="absolute bg-white w-2/12 rounded-md p-2 justify-center items-center"
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
          onMouseLeave={() => {
            setViewSubMenuVisible(false);
            setSortSubMenuVisible(false);
          }}
        >
          <p
            className="flex font-normal w-full h-11/12 px-2 py-1 rounded hover:bg-slate-200"
            onMouseEnter={() => setViewSubMenuVisible(true)}
          >
            Ver
            <span className="absolute right-0 mr-4">
              <img src={chevronRight} className="w-6 h-6" />
            </span>
            {viewSubMenuVisible && (
              <div className="absolute bg-white left-full top-0 min-w-max rounded-md p-2">
                <p
                  className="px-2 py-1 hover:bg-slate-200"
                  id="large-icons"
                  onClick={(event) => handleResizeGrid(event.currentTarget.id)}
                >
                  <span>{"."}</span>
                  Iconos grandes
                </p>
                <p
                  className="px-2 py-1 hover:bg-slate-200"
                  id="medium-icons"
                  onClick={(event) => handleResizeGrid(event.currentTarget.id)}
                >
                  <span>{"."}</span>
                  Iconos medianos
                </p>
                <p
                  className="px-2 py-1 hover:bg-slate-200"
                  id="small-icons"
                  onClick={(event) => handleResizeGrid(event.currentTarget.id)}
                >
                  <span>{"."}</span>
                  Iconos pequeños
                </p>
              </div>
            )}
          </p>
          <p
            className="flex font-normal w-full h-11/12 px-2 py-1 rounded hover:bg-slate-200"
            onMouseEnter={() => setSortSubMenuVisible(true)}
          >
            Ordenar por
            <span className="absolute right-0 mr-4">
              <img src={chevronRight} className="w-6 h-6" />
            </span>
          </p>
        </div>
      )} */}
    </div>
  );
}

export default DesktopScreen;
