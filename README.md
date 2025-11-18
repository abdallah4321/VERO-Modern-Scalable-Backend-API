ERD Diagram (Entity Relationship Diagram)
┌──────────────────┐
│      USERS       │
├──────────────────┤
│ id (PK)          │
│ name             │
│ email (unique)   │
│ password_hash    │
│ created_at       │
└──────────────────┘
          │ 1
          │
          │
          │ M
┌──────────────────┐
│    MESSAGES      │
├──────────────────┤
│ id (PK)          │
│ sender_id (FK→Users.id) │
│ receiver_id (FK→Users.id) │ 
│ text             │
│ timestamp        │
│ conversation_id  │
└──────────────────┘
          │ 1
          │
          │
          │ 1
┌──────────────────┐
│    INSIGHTS      │
├──────────────────┤
│ id (PK)          │
│ conversation_id  │
│ summary          │
│ sentiment        │
│ created_at       │
└──────────────────┘
