import { Reorder } from "motion/react";
import { IoClose, IoEarthOutline } from "react-icons/io5";

export function Tab({ id, pinned }: { id: string; pinned: boolean }) {
  return (
    <Reorder.Item
      as="div"
      key={id}
      value={id}
      className={`tab ${pinned ? "pinned" : ""} active`}
    >
      <IoEarthOutline className="favicon" />
      <label className="text">{id}</label>
      <div className="button">
        <IoClose />
      </div>
    </Reorder.Item>
  );
}
