import { useEffect, useRef, useState } from "react";
// @ts-ignore
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three";

export function Sky(props: any & { children: React.ReactNode }) {
  const [vantaEffect, setVantaEffect] = useState<CLOUDS>(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        CLOUDS({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          skyColor: 0xe4efff,
          cloudColor: 0xdce9ff,
          cloudShadowColor: 0x1b3752,
          sunColor: 0xf79419,
          sunGlareColor: 0xfa6331,
          sunlightColor: 0xfa942f,
          speed: 0.5
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect!.destroy();
    };
  }, [vantaEffect]);

  return (
    <div ref={vantaRef} {...props}>
      {props.children}
    </div>
  );
}
