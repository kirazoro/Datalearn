import { Trophy, Star, Zap } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function ProgressBar() {
  const { userProgress } = useStore();
  const { totalPoints, currentStreak, earnedBadges } = userProgress;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <span className="text-lg font-semibold">{totalPoints} Points</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-orange-500" />
          <span className="text-lg font-semibold">{currentStreak} Day Streak</span>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="w-6 h-6 text-purple-500" />
          <span className="text-lg font-semibold">{earnedBadges.length} Badges</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${(totalPoints / 1000) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}