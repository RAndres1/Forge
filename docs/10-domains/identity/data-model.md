# Identity Data Model

Entidad principal
User

---

User
id
email
username
display_name
photo_url
birth_date
country
language
timezone
created_at

---

Passport
id
user_id
current_rank
forging_since
legacy_score
current_momentum
visibility
updated_at

---

Goals
id
user_id
title
type
status
target_value
current_value
deadline

---

Preferences
id
user_id
weight_unit
distance_unit
theme
notifications_enabled
privacy_level

---

Relationships
User
↓
Passport
↓
Goals
↓
Preferences
