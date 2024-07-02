import {
  FiArrowLeft,
  FiArrowRight,
  FiRotateCw,
  FiSettings
} from "react-icons/fi";

export function NavigationBar() {
  return (
    <section className="flex gap-2 p-2 pt-0">
      <button
        id="navigate-back-button"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-tab-deselected p-1 shadow-lg transition-colors hover:bg-button-hover"
      >
        <FiArrowLeft />
      </button>
      <button
        id="navigate-reload-button"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-tab-deselected p-1 shadow-lg transition-colors hover:bg-button-hover"
      >
        <FiRotateCw />
      </button>
      <button
        id="navigate-forward-button"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-tab-deselected p-1 shadow-lg transition-colors hover:bg-button-hover"
      >
        <FiArrowRight />
      </button>
      <input
        id="new-tab-button"
        className="flex h-10 w-10 flex-1 items-center justify-center rounded-md bg-tab-deselected p-1 shadow-lg transition-colors hover:bg-button-hover"
      ></input>
      <button
        id="open-settings-button"
        className="flex h-10 w-10 items-center justify-center rounded-md bg-tab-deselected p-1 shadow-lg transition-colors hover:bg-button-hover"
      >
        <FiSettings />
      </button>
    </section>
  );
}
