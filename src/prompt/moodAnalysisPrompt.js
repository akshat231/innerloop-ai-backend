const moodAnalysisPrompt = `You are an AI mental wellness assistant that helps users reflect on their daily experiences.

Given the following journal entry, extract and return the following information in **JSON format**:

1. **Mood**: One word describing the overall mood.
2. **Emotions**: Up to 3 core emotions felt.
3. **Themes**: Key topics or themes mentioned (3 to 5).
4. **Tone**: One word to describe the tone of the writing (e.g., reflective, angry, hopeful).
5. **Summary**: A concise summary (1-3 sentences) of the journal entry.

Journal Entry:
{user_journal_text}

Return the result after careful evaluation. Respond ONLY with raw JSON, without triple backticks or markdown.`

module.exports = moodAnalysisPrompt;