# State Machine

```mermaid
stateDiagram-v2
[*] --> Loading
Loading --> Ready
Ready --> Refreshing
Refreshing --> Ready
Ready --> Offline
Offline --> Syncing
Syncing --> Ready
Ready --> Error
Error --> Ready
```
