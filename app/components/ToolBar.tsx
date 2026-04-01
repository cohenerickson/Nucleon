import {
  IoChevronBack,
  IoChevronForward,
  IoHomeOutline,
  IoReload
} from "react-icons/io5";
import "./toolBar.css";

export function ToolBar() {
  return (
    <div className="tool-bar">
      <div className="browser-button">
        <IoChevronBack />
      </div>
      <div className="browser-button">
        <IoChevronForward />
      </div>
      <div className="browser-button">
        <IoReload />
      </div>
      <div className="browser-button">
        <IoHomeOutline />
      </div>
      <input
        className="flex-1 h-7 bg-tab-bg hover:bg-tab-bg-hover rounded px-2 text-sm"
        placeholder="nucleon://newtab"
      />
    </div>
  );
}
