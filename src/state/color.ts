import { atom, useRecoilState } from 'recoil';
import { Color } from '../types/Color';

const color = atom<Color>({
  key: 'color',
  default: undefined,
});

export function useColor() {
  return useRecoilState(color);
}
