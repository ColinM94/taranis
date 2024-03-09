import * as React from "react";
import { MeshProps } from "@react-three/fiber";
import { Side } from "three";

export interface GeometryProps extends MeshProps {
  type: "cube" | "sphere" | "torus" | "torusKnot" | "plane";
  size?: [number, number, number, number];
  color?: string;
  wireframe?: boolean;
  side?: "front" | "back" | "double";
  transparent?: boolean;
}
