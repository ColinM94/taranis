import * as React from "react";
import { useGameStore } from "store";

import { GeometryProps } from "./type";
import { BackSide, DoubleSide, FrontSide, Mesh } from "three";

export const Geometry = React.forwardRef(
  (props: GeometryProps, ref: React.Ref<Mesh> | null) => {
    const { type, size, color, wireframe, side, transparent, ...rest } = props;

    const { showWireframes } = useGameStore();

    const meshSide = React.useMemo(() => {
      if (props.side === "front") {
        return FrontSide;
      } else if (props.side === "back") {
        return BackSide;
      } else if (props.side === "double") {
        return DoubleSide;
      }
    }, [side]);

    return (
      <mesh {...rest} ref={ref}>
        {type === "cube" && <boxGeometry args={size} />}
        {type === "sphere" && <sphereGeometry args={size} />}
        {type === "torus" && <torusGeometry args={size} />}
        {type === "torusKnot" && <torusKnotGeometry args={size} />}
        {type === "plane" && <planeGeometry args={size} />}
        <meshStandardMaterial
          color={color}
          wireframe={showWireframes || wireframe}
          side={meshSide}
          transparent={transparent}
        />
      </mesh>
    );
  }
);
