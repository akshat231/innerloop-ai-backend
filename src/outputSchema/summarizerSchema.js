const { z } = require('zod');

const summarizerSchema =  z.object({
    mood: z.string(),
    emotions: z.array([z.string()]),
    themes: z.array([z.string()]),
    patterns: z.string(),
    suggestion: z.string(),
    affirmation: z.string()
});

module.exports = summarizerSchema