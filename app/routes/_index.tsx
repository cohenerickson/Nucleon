import type { MetaFunction } from "@remix-run/node";
import { Loader } from "~/components/Loader";
import { UtilityBar } from "~/components/UtilityBar";

export const meta: MetaFunction = () => {
  return [{ title: "Nucleon" }, { name: "description", content: "tee hee" }];
};

export default function Inxex() {
  return (
    <main className="flex h-full flex-col overflow-hidden">
      <Loader />
      <UtilityBar />
      <section id="iframes" className="flex-1"></section>
    </main>
  );
}
