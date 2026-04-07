import { Tab } from "./Tab";
// The styling for tabs is too complex to justify using inline tailwind classes,
// so we use a separate CSS file with nested properties to help simplify.
// This technique will be used across the app for other components.
import "./tabBar.css";
import { Reorder, useDragControls } from "motion/react";
import { useState } from "react";

export function TabBar() {
  // Only store state of the tab ID's, we will use a function to lookup the
  // actual information like the favicon and title of the tab.
  const [pinnedTabs, setPinnedTabs] = useState(["0", "1"]);
  const [tabs, setTabs] = useState(["2", "3"]);

  return (
    <div className="tab-bar">
      <div className="overlay-spacer-left"></div>

      <Reorder.Group
        as="div"
        className="tab-section"
        axis="x"
        values={pinnedTabs}
        onReorder={setPinnedTabs}
      >
        {pinnedTabs.map((tabId) => (
          <Tab key={tabId} id={tabId} pinned={true} />
        ))}
      </Reorder.Group>

      <Reorder.Group
        as="div"
        className="tab-section"
        axis="x"
        values={tabs}
        onReorder={setTabs}
      >
        {tabs.map((tabId) => (
          <Tab key={tabId} id={tabId} pinned={false} />
        ))}
      </Reorder.Group>

      <div className="overlay-spacer-right"></div>
    </div>
  );
}
