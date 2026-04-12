import { Reorder } from "motion/react";
import { IoCloudOfflineOutline } from "react-icons/io5";

export function ActionButton({ id }: { id: string }) {
  // TODO: Pull addon icons and other information from the manifest, such as icon
  // and popup url's and handle clicks to open the popup or navigate to the url.

  return (
    <Reorder.Item as="div" value={id} key={id} className="browser-button">
      <IoCloudOfflineOutline />
    </Reorder.Item>
  );
}
