import { create } from 'zustand';
import { getTreeStage, TreeStage, stages, getTotalRequiredSessions } from '../utils/getTreeStage';

interface TreeState {
  sessionCount: number;
  stage: TreeStage['key'];
  incrementSession: () => void;
  resetTree: () => void;
  loadSessionCount: () => void; // Placeholder for actual loading logic
}

export const useTreeStore = create<TreeState>((set, get) => ({
  sessionCount: 0,
  stage: getTreeStage(0),
  incrementSession: () => {
    set((state) => {
      const newSessionCount = state.sessionCount + 1;
      const newStageKey = getTreeStage(newSessionCount);
      const totalRequired = getTotalRequiredSessions();

      if (newSessionCount >= totalRequired && state.stage !== 'bloom') {
        console.log('Tree bloomed! Resetting tree...');
        return { sessionCount: 0, stage: getTreeStage(0) }; // Reset after bloom
      }

      return { sessionCount: newSessionCount, stage: newStageKey };
    });
  },
  resetTree: () => set({ sessionCount: 0, stage: getTreeStage(0) }),
  loadSessionCount: () => {
    // In a real app, you would load this from AsyncStorage or similar
    console.log('Loading session count...');
    // For now, just initialize or keep current state
  },
}));
