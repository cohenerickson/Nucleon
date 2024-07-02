import { NavigationBar } from "./NavigationBar";
import { TabBar } from "./TabBar";

export function UtilityBar() {
  return (
    <section id="utility-bar" className="w-full flex-col">
      <section id="tab-bar">
        <TabBar />
      </section>
      <section id="navigation-bar">
        <NavigationBar />
      </section>
    </section>
  );
}
