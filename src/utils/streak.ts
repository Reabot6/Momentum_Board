interface StreakData {
  count: number;
  lastUpdate: string;
  lastSevenDays: boolean[];
  todayCompleted: boolean;
}

export function updateStreak() {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  // Get existing streak data
  const streakDataStr = localStorage.getItem('streakData');
  const streakData: StreakData = streakDataStr ? JSON.parse(streakDataStr) : {
    count: 0,
    lastUpdate: '',
    lastSevenDays: [false, false, false, false, false, false, false],
    todayCompleted: false
  };

  // If this is the first action of the day
  if (streakData.lastUpdate !== today && !streakData.todayCompleted) {
    // Update streak count
    if (isConsecutiveDay(streakData.lastUpdate, today)) {
      streakData.count += 1;
    } else if (!streakData.lastUpdate) {
      // First time using the app
      streakData.count = 1;
    } else {
      // Streak broken
      streakData.count = 1;
    }

    // Update last seven days
    streakData.lastSevenDays.pop();
    streakData.lastSevenDays.unshift(true);
    
    // Update last update timestamp and mark today as completed
    streakData.lastUpdate = today;
    streakData.todayCompleted = true;
    
    // Save updated streak data
    localStorage.setItem('streakData', JSON.stringify(streakData));
  }

  // Check if it's a new day
  if (streakData.lastUpdate !== today) {
    streakData.todayCompleted = false;
    localStorage.setItem('streakData', JSON.stringify(streakData));
  }
}

export function getStreakData(): StreakData {
  const streakDataStr = localStorage.getItem('streakData');
  return streakDataStr ? JSON.parse(streakDataStr) : {
    count: 0,
    lastUpdate: '',
    lastSevenDays: [false, false, false, false, false, false, false],
    todayCompleted: false
  };
}

function isConsecutiveDay(lastUpdate: string, today: string): boolean {
  if (!lastUpdate) return false;
  
  const lastDate = new Date(lastUpdate);
  const currentDate = new Date(today);
  
  // Set time to midnight for accurate day comparison
  lastDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  
  // Calculate difference in days
  const diffTime = currentDate.getTime() - lastDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  
  return diffDays === 1;
}