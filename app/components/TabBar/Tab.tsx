import { Reorder } from "motion/react";
import { IoClose, IoEarthOutline } from "react-icons/io5";

export function Tab({
  id,
  pinned,
  active,
  setActive
}: {
  id: string;
  pinned: boolean;
  active: string;
  setActive: (id: string) => void;
}) {
  return (
    <Reorder.Item
      as="div"
      key={id}
      value={id}
      className={`tab ${pinned ? "pinned" : ""} ${active === id ? "active" : ""}`}
      onMouseDown={() => {
        setActive(id);
      }}
    >
      <IoEarthOutline className="favicon" />
      <label className="text">{id}</label>
      <div className="button">
        <IoClose />
      </div>
    </Reorder.Item>
  );
}
