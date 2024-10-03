import { atom, useRecoilState } from 'recoil';

const drag = atom<{
  x: number;
  y: number;
}>({
  key: 'drag',
  default: {
    x: 0,
    y: 0,
  },
});

export function useDrag() {
  return useRecoilState(drag);
}
