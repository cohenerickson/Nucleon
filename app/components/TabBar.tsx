import { IoClose } from "react-icons/io5";
import { IoEarthOutline } from "react-icons/io5";
// The styling for tabs is too complex to justify using inline tailwind classes,
// so we use a separate CSS file with nested properties to help simplify.
// This technique will be used across the app for other complex components.
import "./tabBar.css";

export function TabBar() {
  return (
    <div className="tab-bar">
      <div className="tab pinned active">
        <IoEarthOutline className="favicon" />
        <label className="flex-1">New Tab</label>
        <div className="button">
          <IoClose />
        </div>
      </div>
      <div className="tab pinned">
        <IoEarthOutline className="favicon" />
        <label className="flex-1">New Tab</label>
        <div className="button">
          <IoClose />
        </div>
      </div>
      <div className="tab">
        <IoEarthOutline className="favicon" />
        <label className="flex-1">New Tab</label>
        <div className="button">
          <IoClose />
        </div>
      </div>
      <div className="tab active">
        <IoEarthOutline className="favicon" />
        <label className="flex-1">New Tab</label>
        <div className="button">
          <IoClose />
        </div>
      </div>
    </div>
  );
}
