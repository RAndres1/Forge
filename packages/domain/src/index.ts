export * from './types';
export * from './math/oneRepMax';
export * from './math/plateCalculator';
export * from './gamification/rankEngine';
export * from './gamification/questEngine';
export * from './social/circleEngine';
export * from './training/routineEngine';
export * from './economy/shopEngine';
export * from './analytics/exerciseRankEngine';
export * from './analytics/muscleHeatmapEngine';

// PURE DDD WORKOUT ENGINE
export * from './workout/value-objects/WorkoutValueObjects';
export * from './workout/events/WorkoutEvents';
export * from './workout/entities/WorkoutSetEntity';
export * from './workout/entities/WorkoutExerciseEntity';
export * from './workout/entities/WorkoutAggregate';
export * from './workout/use-cases/WorkoutEngineServices';
export * from './workout/routineCatalog';

// PROGRAM BOUNDED CONTEXT
export * from './program/value-objects/ProgramValueObjects';
export * from './program/entities/RoutineEntity';
export * from './program/entities/ProgramAggregate';
export * from './program/services/ProgramActivationService';

// ATHLETE KNOWLEDGE BOUNDED CONTEXT
export * from './knowledge/types/KnowledgeTypes';
export * from './knowledge/entities/AthleteKnowledgeAggregate';
export * from './knowledge/services/HabitLearningEngine';

// EVENT BUS
export * from './events/EventBus';

// DETERMINISTIC COACH ENGINE (PURE DDD)
export * from './coach/types/CoachTypes';
export * from './coach/rules/OverloadRule';
export * from './coach/rules/FatigueRule';
export * from './coach/rules/RestRule';
export * from './coach/rules/PRRule';
export * from './coach/rules/StreakRule';
export * from './coach/CoachEngine';
export * from './coach/DecisionHistory';

// STORAGE ADAPTER
export * from './storage/StorageAdapter';
