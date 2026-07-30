# Sequence

```mermaid
sequenceDiagram
User->>App: Add Set
App->>Local DB: Save
Local DB-->>App: OK
App->>Sync Queue: Enqueue
Sync Queue->>API: Upload
```
