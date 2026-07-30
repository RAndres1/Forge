import { AthleteKnowledgeSummary, DetectedHabit } from '../types/KnowledgeTypes';

export class AthleteKnowledgeAggregate {
  public athleteId: string;
  public favoriteExercises: { exerciseName: string; count: number }[];
  public averageDurationMinutes: number;
  public totalSessionsCompleted: number;
  public habits: DetectedHabit[];
  public lastUpdatedOn: string;

  constructor(summary: AthleteKnowledgeSummary) {
    this.athleteId = summary.athleteId;
    this.favoriteExercises = summary.favoriteExercises;
    this.averageDurationMinutes = summary.averageDurationMinutes;
    this.totalSessionsCompleted = summary.totalSessionsCompleted;
    this.habits = summary.habits;
    this.lastUpdatedOn = summary.lastUpdatedOn;
  }

  static createEmpty(athleteId: string): AthleteKnowledgeAggregate {
    return new AthleteKnowledgeAggregate({
      athleteId,
      favoriteExercises: [],
      averageDurationMinutes: 0,
      totalSessionsCompleted: 0,
      habits: [],
      lastUpdatedOn: new Date().toISOString(),
    });
  }

  addHabit(habit: DetectedHabit): void {
    const idx = this.habits.findIndex((h) => h.id === habit.id || (h.type === habit.type && h.exerciseName === habit.exerciseName));
    if (idx >= 0) {
      this.habits[idx] = habit;
    } else {
      this.habits.push(habit);
    }
    this.lastUpdatedOn = new Date().toISOString();
  }
}
