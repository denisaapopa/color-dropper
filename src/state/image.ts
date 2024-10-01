import { atom, useRecoilState } from 'recoil';

const imageSrc = atom<string>({
  key: 'imageSrc',
  default: undefined,
});

export function useImageSrc() {
  return useRecoilState(imageSrc);
}
