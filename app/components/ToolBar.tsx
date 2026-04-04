import {
  IoBookmarkOutline,
  IoChevronBack,
  IoChevronForward,
  IoExtensionPuzzleOutline,
  IoHomeOutline,
  IoInformation,
  IoInformationCircleOutline,
  IoMenuOutline,
  IoReload
} from "react-icons/io5";
import "./toolBar.css";

export function ToolBar() {
  return (
    <>
      <div className="tool-bar">
        <div className="browser-button disabled">
          <IoChevronBack />
        </div>
        <div className="browser-button disabled">
          <IoChevronForward />
        </div>
        <div className="browser-button">
          <IoReload />
        </div>
        <div className="browser-button">
          <IoBookmarkOutline />
        </div>
        <div className="browser-button">
          <IoHomeOutline />
        </div>
        <div className="url-bar">
          <div className="browser-button">
            <IoInformationCircleOutline />
          </div>
          <input placeholder="nucleon://newtab" />
        </div>
        <div className="browser-button">
          <IoExtensionPuzzleOutline />
        </div>
        <div className="browser-button">
          <IoMenuOutline />
        </div>
      </div>
      <div className="tool-bar"></div>
    </>
  );
}
