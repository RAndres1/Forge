# Workout State Machine

```mermaid
stateDiagram-v2
[*] --> Draft
Draft --> Active
Active --> Resting
Resting --> Active
Active --> Paused
Paused --> Active
Active --> Completed
Completed --> Synced
```
