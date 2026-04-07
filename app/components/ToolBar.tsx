import {
  IoBookmarkOutline,
  IoChevronBack,
  IoChevronForward,
  IoExtensionPuzzleOutline,
  IoHomeOutline,
  IoInformationCircleOutline,
  IoMenuOutline,
  IoReload
} from "react-icons/io5";
import "./toolBar.css";
import { use, useEffect, useRef, useState } from "react";

export function ToolBar() {
  const urlRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState("nucleon://newtab");

  function generateStyledValue(): void {
    if (!urlRef.current) return;
    try {
      const parsed = new URL(url);

      urlRef.current.innerHTML = "";

      const protocol = document.createElement("span");
      protocol.className = "protocol";
      protocol.textContent = parsed.protocol + "//";
      const hostname = document.createElement("span");
      hostname.className = "hostname";
      hostname.textContent = parsed.hostname;
      const port = document.createElement("span");
      port.className = "port";
      port.textContent = parsed.port ? ":" + parsed.port : "";
      const pathname = document.createElement("span");
      pathname.className = "pathname";
      pathname.textContent = parsed.pathname;
      const search = document.createElement("span");
      search.className = "search";
      search.textContent = parsed.search;
      const hash = document.createElement("span");
      hash.className = "hash";
      hash.textContent = parsed.hash;

      urlRef.current.appendChild(protocol);
      urlRef.current.appendChild(hostname);
      urlRef.current.appendChild(port);
      urlRef.current.appendChild(pathname);
      urlRef.current.appendChild(search);
      urlRef.current.appendChild(hash);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    // Eventually also update the styling when the user types but for now
    // we'll only update styles when the user is not focused on the url bar
    const isFocused = urlRef.current === document.activeElement;

    if (!isFocused) {
      generateStyledValue();
    }
  }, [url]);

  useEffect(() => {
    const handleBlur = () => {
      const text = urlRef.current?.textContent || "";
      setUrl(text);
    };

    const current = urlRef.current;
    current?.addEventListener("blur", handleBlur);
    return () => {
      current?.removeEventListener("blur", handleBlur);
    };
  }, []);

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
          <div className="input" contentEditable="plaintext-only" ref={urlRef}></div>
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
