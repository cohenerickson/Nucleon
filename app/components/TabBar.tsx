import { Tab } from "./Tab";
// The styling for tabs is too complex to justify using inline tailwind classes,
// so we use a separate CSS file with nested properties to help simplify.
// This technique will be used across the app for other components.
import "./tabBar.css";
import { Reorder, useDragControls } from "motion/react";
import { useState } from "react";
import { IoAdd } from "react-icons/io5";

export function TabBar() {
  // Only store state of the tab ID's, we will use a function to lookup the
  // actual information like the favicon and title of the tab within each component.
  const [pinnedTabs, setPinnedTabs] = useState(["0"]);
  const [tabs, setTabs] = useState(["Nucleon Web Browser", "1"]);
  const [active, setActive] = useState("Nucleon Web Browser");

  return (
    <div className="tab-bar">
      <div className="overlay-spacer-left"></div>

      <Reorder.Group
        as="div"
        className="tab-section pinned-section"
        axis="x"
        values={pinnedTabs}
        onReorder={setPinnedTabs}
      >
        {pinnedTabs.map((tabId) => (
          <Tab
            key={tabId}
            id={tabId}
            pinned={true}
            active={active}
            setActive={setActive}
          />
        ))}
      </Reorder.Group>

      <Reorder.Group
        as="div"
        className="tab-section normal-section"
        axis="x"
        values={tabs}
        onReorder={setTabs}
      >
        {tabs.map((tabId) => (
          <Tab
            key={tabId}
            id={tabId}
            pinned={false}
            active={active}
            setActive={setActive}
          />
        ))}
        <div className="new-tab-button">
          <IoAdd />
        </div>
      </Reorder.Group>

      <div className="overlay-spacer-right"></div>
    </div>
  );
}
