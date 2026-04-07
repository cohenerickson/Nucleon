import { XMLParser } from "fast-xml-parser";
import { unzip, type Unzipped } from "fflate";

const CHROME_VERSION = "148.0.7766.3";
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: ""
});

// get latest extension version
export async function getLatestVersion(
  platform: "firefox" | "chrome",
  id: string
): Promise<{
  version: string;
  sha256: string;
  size: number;
}> {
  if (platform === "chrome") {
    const res = await fetch(
      `https://clients2.google.com/service/update2/crx?response=updatecheck&prodversion=${CHROME_VERSION}&x=id=${id}%26uc&acceptformat=crx3`
    );
    if (!res.ok)
      throw new Error(`Failed to fetch extension metadata: ${res.status}`);

    const parsed = parser.parse(await res.text());
    const updatecheck = parsed?.gupdate?.app?.updatecheck;

    if (!updatecheck) throw new Error("No updatecheck element in response");

    return {
      version: updatecheck.version,
      sha256: updatecheck.hash_sha256,
      size: Number(updatecheck.size)
    };
  } else if (platform === "firefox") {
    const res = await fetch(
      `https://addons.mozilla.org/api/v5/addons/addon/${id}/?lang=en-US`
    );
    if (!res.ok)
      throw new Error(`Failed to fetch extension metadata: ${res.status}`);

    const json = await res.json();
    const file = json?.current_version?.file;

    if (!file) throw new Error("No file element in response");

    return {
      version: json.current_version.version,
      sha256: file.hash.replace("sha256:", ""),
      size: file.size
    };
  } else {
    throw new Error(`Unsupported platform: ${platform}`);
  }
}

export async function extract(
  buffer: ArrayBuffer
): Promise<Map<string, Uint8Array>> {
  return new Promise<Map<string, Uint8Array>>((resolve, reject) => {
    unzip(new Uint8Array(stripCrxHeader(buffer)), (err, files) => {
      if (err) reject(err);

      const result = new Map<string, Uint8Array>();
      for (const [name, data] of Object.entries(files)) {
        result.set(name, data);
      }
      resolve(result);
    });
  });
}

function stripCrxHeader(buffer: ArrayBuffer): ArrayBuffer {
  const view = new DataView(buffer);

  // CRX3 magic bytes: "Cr24"
  const magic = view.getUint32(0, false);
  if (magic !== 0x43723234) return buffer; // not a CRX, return as-is

  const headerSize = view.getUint32(8, true);
  return buffer.slice(12 + headerSize);
}
