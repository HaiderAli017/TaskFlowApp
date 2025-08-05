export interface TreeStage {
  key: 'seed' | 'roots' | 'leaf' | 'tree' | 'bloom';
  icon: string;
  label: string;
  requiredSessions: number;
}

export const stages: TreeStage[] = [
  { key: 'seed', icon: '🌱', label: 'Seed', requiredSessions: 1 },
  { key: 'roots', icon: '🌿', label: 'Roots', requiredSessions: 3 },
  { key: 'leaf', icon: '🍃', label: 'Leaf', requiredSessions: 7 },
  { key: 'tree', icon: '🌳', label: 'Tree', requiredSessions: 15 },
  { key: 'bloom', icon: '🌸', label: 'Bloom', requiredSessions: 30 },
];

export function getTreeStage(sessionCount: number): TreeStage['key'] {
  let cumulativeSessions = 0;
  for (let i = 0; i < stages.length; i++) {
    cumulativeSessions += stages[i].requiredSessions;
    if (sessionCount < cumulativeSessions) {
      return stages[i].key;
    }
  }
  return stages[stages.length - 1].key; // Return bloom if sessionCount meets or exceeds all requirements
}

export function getTotalRequiredSessions(): number {
  return stages.reduce((sum, stage) => sum + stage.requiredSessions, 0);
}
