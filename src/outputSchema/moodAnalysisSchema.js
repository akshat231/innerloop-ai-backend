const { z } = require('zod');

const moodAnalysisSchema = z.object({
    mood: z.string(),
    emotions: z.array([z.string()]),
    themes: z.array([z.string()]),
    tone: z.string(),
    summary: z.string()
});

module.exports = moodAnalysisSchema;