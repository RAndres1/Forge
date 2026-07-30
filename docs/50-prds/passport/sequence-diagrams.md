# Sequence Diagrams

```mermaid
sequenceDiagram
User->>App: Open
App->>API: GET Passport
API->>Progress Engine: Build Projection
Progress Engine-->>API: Snapshot
API-->>App: Passport DTO
```
