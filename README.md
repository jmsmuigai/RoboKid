# RoboKid 🤖🇰🇪

**AI-Powered CBC Learning Platform for Kenyan Children (Grade 1-3)**

RoboKid is an award-winning educational platform designed specifically for Kenyan children in Grade 1 to Grade 3. Built on the Kenya Institute of Curriculum Development (KICD) Competency-Based Curriculum (CBC), RoboKid brings learning to life through artificial intelligence, interactive games, and mother tongue support.

## 🌟 Features

- **📖 CBC Encyclopedia** — 41 sub-strands, 160 learning outcomes, 164 activities from the official KICD Targeter
- **🌐 5 Languages** — English, Kiswahili, Gĩkũyũ (Kikuyu), Dholuo (Luo), Somali with AI translation
- **🤖 AI Content Generation** — Google Gemini generates unlimited puzzles, stories, and quizzes
- **🎮 10+ Interactive Games** — Memory match, word search, math race, and more
- **📝 150+ Exam Questions** — KNEC/KEYA-aligned practice assessments
- **💻 Code Lab** — Python lessons with Kenyan examples
- **📚 Content Agent** — Self-learning content library (stories, riddles, poems, vocabulary)
- **🔤 Visual Dictionary** — 70+ words across 4 African languages with live translation
- **🎨 African-Themed Design** — 7+ original illustrations celebrating Kenyan culture

## 🛠️ Tech Stack

- **Frontend:** Next.js 15 (App Router) + TypeScript
- **AI:** Google Gemini 2.0 Flash API
- **Translation:** MyMemory API (free) + Gemini + Built-in Dictionary
- **Database:** Firebase Firestore (translation cache + learning model)
- **Styling:** Custom CSS Design System (Dark mode, Glassmorphism)
- **Images:** AI-generated African-themed educational illustrations

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/jmsmuigai/RoboKid.git
cd RoboKid/robokid-app

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Add your GOOGLE_API_KEY

# Run the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx          # Landing page
│   ├── dashboard/        # Interactive learning hub
│   ├── encyclopedia/     # CBC curriculum browser
│   ├── games/            # Games hub (10+ games)
│   ├── playbook/         # Project playbook
│   └── api/
│       ├── gemini/       # AI content generation
│       ├── encyclopedia/ # Curriculum API
│       ├── translate/    # Translation API
│       └── content/      # Content agent API
├── lib/
│   ├── cbc-encyclopedia.ts    # 41 KICD sub-strands
│   ├── translation-service.ts # Multi-engine translator
│   ├── content-agent.ts       # Self-learning content system
│   ├── curriculum-data.ts     # Topic data
│   ├── exam-bank.ts           # 150+ questions
│   └── constants.ts           # Global config
└── types/
    └── index.ts               # TypeScript interfaces
```

## 🇰🇪 Curriculum Coverage

| Subject | Strands | Sub-Strands |
|---------|---------|-------------|
| Mathematics | Numbers, Measurement, Geometry | 19 |
| Environmental | Social, Natural, Health/Hygiene | 15 |
| English | Listening, Reading, Writing, Comprehension | 4 |
| Kiswahili | Kusikiliza, Kusoma, Ufahamu | 3 |

## 📄 License

MIT License — Made with ❤️ in Kenya 🇰🇪

## 👤 Author

James Muigai ([@jmsmuigai](https://github.com/jmsmuigai))
