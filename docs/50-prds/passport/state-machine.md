# State Machine

## Objective
Authoritative reference for Forge.

## Sections
- Context
- Motivation
- Functional requirements
- Non-functional requirements
- Business rules
- Domain events
- Edge cases
- Acceptance criteria
- Future evolution

```mermaid
stateDiagram-v2
[*]-->Idle
Idle-->Active
Active-->Completed
Completed-->[*]
```
