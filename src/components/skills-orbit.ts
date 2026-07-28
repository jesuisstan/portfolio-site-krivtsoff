import type { Technology } from '@/constants/technologies';

// Rings as a fraction of the outermost radius, widest last. Three at most, so the radial gap stays
// wider than an icon plus its label; laps get slower outwards to keep the linear speed roughly equal,
// and directions alternate so neighbouring rings read as separate.
const RING_SPECS = [
  { scale: 0.42, duration: 50, reverse: false },
  { scale: 0.71, duration: 65, reverse: true },
  { scale: 1, duration: 80, reverse: false }
];

// How many rings a given number of items earns, and the box that suits them. Tuned by eye: the point
// is that a small category gets a tighter system rather than three near-empty circles.
const SIZE_STEPS = [
  { maxItems: 5, rings: 1, boxSize: 400 },
  { maxItems: 11, rings: 2, boxSize: 540 },
  { maxItems: Infinity, rings: 3, boxSize: 680 }
];

export interface OrbitRing {
  radius: number;
  duration: number;
  reverse: boolean;
  items: Technology[];
}

const stepFor = (count: number) =>
  SIZE_STEPS.find((step) => count <= step.maxItems) ?? SIZE_STEPS.at(-1)!;

/**
 * Returns the square box edge, in pixels, that suits a given number of technologies.
 * @param count How many technologies will be placed.
 * @returns Box edge in pixels — a small category gets a smaller system rather than dead space.
 */
export const orbitBoxSize = (count: number): number => stepFor(count).boxSize;

/**
 * Splits technologies across the concentric rings, weighted by radius so arc spacing stays even.
 * @param technologies Items to place, in the order they should appear outwards.
 * @param outerRadius Radius of the widest ring, in pixels.
 * @returns One entry per ring, innermost first; empty when there is nothing to place.
 */
export const buildOrbitRings = (
  technologies: Technology[],
  outerRadius: number
): OrbitRing[] => {
  const specs = RING_SPECS.slice(-stepFor(technologies.length).rings);
  const weightSum = specs.reduce((sum, ring) => sum + ring.scale, 0);
  const exactCounts = specs.map(
    (ring) => (technologies.length * ring.scale) / weightSum
  );
  const counts = exactCounts.map((count) => Math.floor(count));

  // Largest remainder, widest ring wins ties: a missing slot shows least where the arc is longest.
  const byRemainder = exactCounts
    .map((count, index) => ({ index, remainder: count % 1 }))
    .sort((a, b) => b.remainder - a.remainder || b.index - a.index);

  let leftover = technologies.length - counts.reduce((sum, n) => sum + n, 0);
  for (const { index } of byRemainder) {
    if (leftover === 0) break;
    counts[index] += 1;
    leftover -= 1;
  }

  let cursor = 0;
  return specs.map((ring, index) => {
    const items = technologies.slice(cursor, cursor + counts[index]);
    cursor += counts[index];

    return {
      radius: Math.round(outerRadius * ring.scale),
      duration: ring.duration,
      reverse: ring.reverse,
      items
    };
  });
};
