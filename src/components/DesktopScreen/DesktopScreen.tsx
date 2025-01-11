import React, { useEffect, useState } from "react";
import backgroundImage from "../../assets/6201771.jpg";
// import chevronRight from "../../assets/chevron_right.svg";
import { defaultItems } from "../../utils/desktopItems";
import "./DesktopScreen.css";
import { ItemType } from "../../types/windowTypes";
import Apps from "../AppsComponents/appIndex";

function DesktopScreen({ onLock }: { onLock: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const [time, setTime] = useState<string>("00:00");
  const [date, setDate] = useState<string>("01/01/2025");
  // const [contextMenuPosition, setContextMenuPosition] = useState({x: 0, y: 0,});
  // const [dragStartOffset, setDragStartOffset] = useState({ x: 0, y: 0 });
  // const [isContextMenuVisible, setIsContextMenuVisible] = useState(false);
  // const [viewSubMenuVisible, setViewSubMenuVisible] = useState(false);
  // const [sortSubMenuVisible, setSortSubMenuVisible] = useState(false);
  const [isStartMenuVisible, setIsStartMenuVisible] = useState(false);
  const [isMenuExiting, setIsMenuExiting] = useState(false);
  const [items, setItems] = useState(defaultItems);
  // const [gridSize, setGridSize] = useState({ cols: 18, rows: 8 });
  const [oppenedWindows, setOppenedWindows] = useState<ItemType[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<ItemType[]>([]);
  const [isPowerMenuVisible, setIsPowerMenuVisible] = useState(false);

  const TASKBAR_HEIGHT = window.innerHeight * 0.055;
  const gridSize = { cols: 18, rows: 8 };
  const GRID_SIZE = {
    width: window.innerWidth / gridSize.cols,
    height: (window.innerHeight - TASKBAR_HEIGHT) / gridSize.rows,
  };

  const windowComponents = {
    1: Apps.AboutMeWindow,
    2: Apps.ExperienceWindow,
    3: Apps.SkillsWindow,
    4: Apps.ProjectsWindow,
    5: Apps.EducationWindow,
    6: Apps.ContactWindow,
  };

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

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
    // const rect = (event.target as HTMLElement).getBoundingClientRect();
    // setDragStartOffset({
    //   x: event.clientX - rect.left,
    //   y: event.clientY - rect.top,
    // });
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

  const handleDoubleClick = (item: ItemType) => {
    setOppenedWindows([...oppenedWindows, item]);
  };

  const handleMinimize = (item: ItemType) => {
    setMinimizedWindows([...minimizedWindows, item]);
    setOppenedWindows(oppenedWindows.filter((i) => i.id !== item.id));
  };

  const handleRestore = (item: ItemType) => {
    setMinimizedWindows(minimizedWindows.filter((win) => win.id !== item.id));
    setOppenedWindows([...oppenedWindows, item]);
  };
  const onClose = (item: ItemType) => {
    setOppenedWindows(oppenedWindows.filter((i) => i.id !== item.id));
    oppenedWindows.filter((i) => i.id !== item.id);
  };

  const handleStartMenuToggle = () => {
    if (isStartMenuVisible) {
      setIsMenuExiting(true);
    } else {
      setIsPowerMenuVisible(false);
      setIsStartMenuVisible(true);
      setIsMenuExiting(false);
    }
  };

  // Add animation end handler
  const handleAnimationEnd = () => {
    if (isMenuExiting) {
      setIsStartMenuVisible(false);
      setIsMenuExiting(false);
    }
  };

  const handlePowerMenuToggle = () => {
    if (isStartMenuVisible) {
      setIsMenuExiting(true);
    } else {
      setIsPowerMenuVisible(false);
      setIsStartMenuVisible(true);
      setIsMenuExiting(false);
    }
  };

  return (
    <div
      className={`flex absolute overflow-hidden w-screen h-screen${
        !backgroundImage ? "bg-violet-700" : ""
      } align-middle  justify-center select-none ${
        isVisible ? "opacity-100" : "opacity-100"
      }`}
      onContextMenu={(event) => event.preventDefault()}
      // style={{
      //   width: windowWidth,
      //   height: windowHeight,
      // }}
      // onClick={handleClickOutsideContextMenu}
      onClick={() => {
        if (isStartMenuVisible) {
          handleStartMenuToggle();
        }
      }}
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
            onDoubleClick={() => handleDoubleClick(item)}
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
            <div className="w-full items-center justify-center text-center self-center p-4">
              {/* EDITAR AL CAMBIAR LOS ICONOS */}

              <img
                src={item.icon}
                alt={item.name}
                className="aspect-square rounded-md"
              />

              {/* ================================= */}

              <p className="flex w-full text-base text-center items-center justify-center text-white align-text-bottom text-ellipsis">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {oppenedWindows.map((item) => {
          const WindowComponent =
            windowComponents[item.id as keyof typeof windowComponents];
          if (!WindowComponent) return null;
          return (
            <WindowComponent
              item={item}
              key={item.id}
              onClose={() => onClose(item)}
              onMinimize={() => handleMinimize(item)}
            />
          );
        })}
      </div>

      {/* Taskbar */}
      <div className="absolute w-full h-[5.5%] bottom-0 bg-black/30 backdrop-blur-lg items-center">
        {/* Taskbar home button */}
        <div className="flex absolute w-full h-full items-center justify-start px-[1%] space-x-2">
          <div className="flex items-center justify-center px-[6px] h-[82%] rounded-md hover:shadow-inner">
            <button
              className="bg-gradient-to-tl from-[#0277d3] to-[#4bd0fe] aspect-square h-[75%] text-slate-200 font-bold rounded-md text-center items-center justify-center"
              onClick={handleStartMenuToggle}
            >
              JV
            </button>
          </div>

          {/*
          
          Taskbar oppened windows
          
          */}
          <div className="flex h-full items-center justify-center mx-2">
            {oppenedWindows.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center shadow-inner px-[6px] h-[80%] rounded-md backdrop-blur-0 bg-slate-200/5 hover:bg-slate-200/10 transition-all duration-100"
                onClick={() => handleMinimize(item)}
              >
                <button className="aspect-square h-[75%] rounded-md items-center justify-center ">
                  <img src={item.icon} alt={item.name} />
                </button>
              </div>
            ))}
            {minimizedWindows.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-center hover:shadow-inner px-[6px] h-[82%] rounded-md transition-all duration-100"
                onClick={() => handleRestore(item)}
              >
                <button className="aspect-square h-[75%] text-slate-200 font-bold rounded-md text-center items-center justify-center">
                <img
                src={item.icon}
                alt={item.name}
                className="aspect-square rounded-md"
              />
                </button>
              </div>
            ))}
          </div>

          {/* 
          ========================================
          */}

          {/* 

          taskbar date/hour

          */}

          <div className="absolute right-0 px-[1%] items-center justify-center text-white font-light text-sm text-center">
            <p>{time}</p>
            <p>{date}</p>
          </div>
        </div>
      </div>
      {/* 

      ========================================

      */}

      {/* Start Menu */}
      {isStartMenuVisible && (
        <div
          className={`start-menu ${isMenuExiting ? "start-menu-exit" : ""}`}
          onAnimationEnd={handleAnimationEnd}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="h-[88%] p-8">
            <ul className="overflow-y-auto h-full scrollbar-hidden">
              {items
                .sort(function (a, b) {
                  if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase())
                    return -1;
                  if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase())
                    return 1;
                  return 0;
                })
                .map((item) => (
                  <div
                    className="hover:bg-slate-200/10 rounded-md px-4"
                    onClick={() => {
                      handleStartMenuToggle();
                      setTimeout(() => handleDoubleClick(item), 300);
                    }}
                  >
                    <li className="py-5 text-white font-thin" key={item.id}>
                      <span className="mr-2">{item.icon}</span>
                      {item.name}
                    </li>
                  </div>
                ))}
            </ul>
          </div>
          <div className="flex items-center justify-between h-[12%] text-2xl font-thin text-white bg-neutral-950/10 rounded-b-xl px-10 border-t-neutral-800/40 border-t-1">
            <div className="flex items-center space-x-2">
              <img
                src="https://unavatar.io/github/JavierVidalM"
                alt="Javier Profile Picture"
                className="aspect-square w-[12%] rounded-full bg-slate-600"
              />
              <p>Javier Vidal</p>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="hover:shadow-inner p-1 items-center justify-center align-middle rounded">
                <button className="w-7 rounded-full">
                  {/* settings icon */}
                  <img
                    src="https://img.icons8.com/?size=100&id=82535&format=png&color=ffffff"
                    alt="accesibility icon"
                    className="p-0.5"
                  />
                </button>
              </div>
              <div className="hover:shadow-inner p-1 items-center justify-center align-middle rounded">
                <button
                  className=" w-7 rounded-full"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsPowerMenuVisible(!isPowerMenuVisible);
                  }}
                >
                  {/* power icon */}
                  <img
                    src="https://img.icons8.com/?size=100&id=85077&format=png&color=ffffff"
                    alt="power icon"
                    className="p-0.5"
                  />
                </button>
              </div>
              {isPowerMenuVisible && (
                <div className="absolute bg-neutral-600 backdrop-blur w-2/12 rounded-md p-2 justify-center items-center">
                  <p
                    className="flex font-normal w-full h-11/12 px-2 py-1 rounded hover:bg-slate-200"
                    onClick={onLock}
                  >
                    Bloquear
                  </p>
                  <p
                    className="flex font-normal w-full h-11/12 px-2 py-1 rounded hover:bg-slate-200"
                    onClick={() => {
                      handlePowerMenuToggle();
                    }}
                  >
                    Apagar
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
