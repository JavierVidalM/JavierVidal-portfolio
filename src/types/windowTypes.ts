export interface ItemType {
  id: number;
  name: string;
  row: number;
  col: number;
  prevRow: number;
  prevCol: number;
  icon: string;
  selected: boolean;
}

export interface WindowTypes {
  onClose: () => void;
  onMinimize: () => void;
  // prevSize: { width: number; height: number };
  // prevPosition: { x: number; y: number };
  children?: React.ReactNode;
  item: ItemType;
}

export type PointerTypes =
  | "pointer"
  | "cursor-n-resize"
  | "cursor-s-resize"
  | "cursor-e-resize"
  | "cursor-w-resize"
  | "cursor-ne-resize"
  | "cursor-nw-resize"
  | "cursor-se-resize"
  | "cursor-sw-resize";
