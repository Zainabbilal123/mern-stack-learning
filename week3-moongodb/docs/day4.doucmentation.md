# DAY 4: Relationships & populate()

# WHAT I DID:
- Created Post model with author reference
- Used populate() to get full author data

SCHEMA REFERENCE:
author: {
    type: ObjectId,
    ref: 'User',
    required: true
}

# POPULATE:
Post.find().populate('author', 'name email')

# WHAT I LEARNED:
- ref must match model name exactly
- populate() works like SQL JOIN