import { atom, useRecoilState } from 'recoil';

const pickColor = atom<boolean>({
  key: 'pickColor',
  default: false,
});

export function usePickColor() {
  return useRecoilState(pickColor);
}
