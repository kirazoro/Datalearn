import { create } from 'zustand';
import { UserProgress } from '../types';

interface Store {
  userProgress: UserProgress;
  updateProgress: (exerciseId: string) => void;
  currentExerciseId: string;
  setCurrentExerciseId: (id: string) => void;
}

export const useStore = create<Store>((set) => ({
  userProgress: {
    completedExercises: [],
    earnedBadges: [],
    currentStreak: 0,
    totalPoints: 0,
  },
  updateProgress: (exerciseId) =>
    set((state) => ({
      userProgress: {
        ...state.userProgress,
        completedExercises: [...state.userProgress.completedExercises, exerciseId],
        totalPoints: state.userProgress.totalPoints + 10,
      },
    })),
  currentExerciseId: 'intro-to-data',
  setCurrentExerciseId: (id) => set({ currentExerciseId: id }),
}));