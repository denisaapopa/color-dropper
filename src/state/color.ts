import { atom, useRecoilState } from 'recoil';

const color = atom<string | undefined>({
  key: 'color',
  default: undefined,
});

export function useColor() {
  return useRecoilState(color);
}
