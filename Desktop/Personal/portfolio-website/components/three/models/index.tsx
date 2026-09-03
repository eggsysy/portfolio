"use client"

import { Bust } from "./bust"
import { MechanicalEye } from "./eye"
import { ImpossibleKnot } from "./knot"

export type AboutModel = "bust" | "eye" | "knot"

/**
 * Which sculpture stands in the About section.
 *
 * Change this one word to swap it — "bust" | "eye" | "knot". Each model owns
 * its own scale and framing, so nothing else needs touching.
 */
export const ABOUT_MODEL: AboutModel = "knot"

/** Per-model placement, so each one sits well in the left column. */
export const MODEL_PLACEMENT: Record<AboutModel, { position: [number, number, number] }> = {
  bust: { position: [-3.5, -0.5, 0] },
  eye: { position: [-3.6, -0.1, 0] },
  knot: { position: [-3.6, -0.2, 0] },
}

export function AboutSculpture({ which, scale }: { which: AboutModel; scale: number }) {
  if (which === "bust") return <Bust scale={scale} />
  if (which === "knot") return <ImpossibleKnot scale={scale} />
  return <MechanicalEye scale={scale} />
}
