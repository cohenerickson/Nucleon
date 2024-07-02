import { Reorder, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiX, FiPlus } from "react-icons/fi";
import { TabModel } from "~/util/TabModel";

export function TabBar() {
  const [tabs, setTabs] = useState<TabModel[]>([]);

  useEffect(() => {
    TabModel._on("new", (tab) => {
      setTabs([...tabs, tab]);
    });
  });

  useEffect(() => {
    tabs.forEach((tab) => {
      tab.removeAllListeners("update");

      tab.on("update", () => {
        setTabs([...tabs]);
      });
    });

    // const orderedURLs = tabs.map((tab) => tab.url);
    // const activeIndex = Math.max(
    //   tabs.findIndex((tab) => tab.active),
    //   0
    // );

    // localStorage.setItem("tabs", JSON.stringify(orderedURLs));
    // localStorage.setItem("activeTab", activeIndex.toString());
  }, [tabs]);

  return (
    <section className="flex gap-2 p-2">
      <Reorder.Group
        axis="x"
        values={tabs}
        onReorder={setTabs}
        className="flex flex-1 flex-grow gap-2"
      >
        <AnimatePresence initial={false}>
          {tabs.map((tab) => (
            <Reorder.Item
              key={tab.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.1 }
              }}
              exit={{ opacity: 0, x: -20, transition: { duration: 0.1 } }}
              value={tab}
              title={tab.url}
              onMouseDown={() => {
                tab.setActive(true);
              }}
              className={`flex h-10 max-w-[250px] flex-1 flex-nowrap items-center justify-between overflow-clip whitespace-nowrap rounded-md ${tab.active ? "bg-tab-selected" : "bg-tab-deselected hover:bg-tab-hover"} p-2 shadow-lg`}
            >
              <div className="flex items-center gap-2">
                <img src={tab.favicon} className="aspect-square h-4"></img>
                <span className="text-sm">{tab.title}</span>
              </div>
              <button
                className="aspect-square rounded-md p-1 transition-colors hover:bg-button-hover"
                onClick={() => {
                  tab.close();
                  setTabs(tabs.filter((t) => t.id !== tab.id));
                }}
              >
                <FiX />
              </button>
            </Reorder.Item>
          ))}
        </AnimatePresence>
      </Reorder.Group>
      <button
        id="new-tab-button"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-tab-deselected p-1 shadow-lg transition-colors hover:bg-button-hover"
        onClick={() => {
          new TabModel("https://www.google.com/");
        }}
      >
        <FiPlus />
      </button>
    </section>
  );
}
