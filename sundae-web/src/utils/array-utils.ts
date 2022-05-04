export function sum(array: number[]): number {
  return array.reduce((acc, curr) => acc + curr, 0);
}
