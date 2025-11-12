import { create } from 'zustand'; // 전역 상태 스토어를 생성

export const useScrollStore = create((set) => ({
  scrollY: 0,
  lastScrollY: 0,
  setScrollY: (y) => set((state) => {
    const newLastScrollY = state.scrollY;
    return {
      scrollY: y,
      lastScrollY: newLastScrollY,
    };
  }),
}));