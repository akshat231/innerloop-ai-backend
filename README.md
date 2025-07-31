# 📓 AI Journaling Backend

A Node.js backend that lets users write journal entries, generates embeddings using OpenAI, detects mood trends, and provides personalized advice based on past entries.

---

## 🚀 Features

- 📝 **Journal Entry Submission**  
  Users can write daily journal entries in natural language.

- 🧠 **AI-Powered Embeddings**  
  Each entry is embedded using OpenAI to capture semantic meaning and emotional tone.

- 📊 **Mood Trend Detection**  
  Aggregates weekly/monthly mood scores and generates mood graphs over time.

- 💡 **Personalized Advice**  
  Suggests reflective insights and advice based on past entries and detected patterns.

- ⚡ Built with **Node.js**, **Express**, **OpenAI**, and **Prisma**

---

## 📦 Tech Stack

- **Node.js**
- **Express.js**
- **Prisma** – ORM for managing journal entries and mood data
- **OpenAI API** – For generating embeddings and mood/advice inference
- **PostgreSQL** – For storing entries and analysis
- **Dotenv** – For environment configuration

---

## 🛠️ Setup

```bash
git clone https://github.com/yourusername/innerloop-ai-backend.git
cd innerloop-ai-backend
npm install
```
Create a .env file with the required configuration:

```bash
OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/yourdb
```

## ▶️ Usage

The app will:

1. Generate an embedding for the entry using OpenAI. 
2. Detect emotional tone and classify mood (e.g., happy, anxious, calm).
3. Store the entry and its mood metadata in the database. 
4. Suggest Advice based on previous interaction

## 🧩 Example Use Cases

- Track how your mood changes over time based on your journaling.  
- Understand emotional patterns through mood summaries and trends.  
- Receive weekly reflections and personalized advice for self-improvement.


## 📄 License
MIT License

