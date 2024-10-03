import { atom, useRecoilState } from 'recoil';

const scale = atom<number>({
  key: 'scale',
  default: 1,
});

export function useScale() {
  return useRecoilState(scale);
}
