export interface Exercise {
  id: string;
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TestCase {
  input: any;
  expectedOutput: any;
  description: string;
}

export interface UserProgress {
  completedExercises: string[];
  earnedBadges: string[];
  currentStreak: number;
  totalPoints: number;
}