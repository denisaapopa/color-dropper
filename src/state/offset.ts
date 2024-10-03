import { atom, useRecoilState } from 'recoil';

const offset = atom<{
  x: number;
  y: number;
}>({
  key: 'offset',
  default: {
    x: 0,
    y: 0,
  },
});

export function useOffset() {
  return useRecoilState(offset);
}
