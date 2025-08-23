// Helper functions for audio processing (PCM to WAV)
const lessons = [
  {
    id: 1,
    title: "Politik & Gesellschaft",
    theme: "violet",
    image: "assets/lesson1.jpg",
    overview: "In dieser Lektion lernen Sie die wichtigsten Strukturen und Mechanismen der deutschen Politik kennen.",
    vocabulary: [
      { word: "Gleichberechtigung", translation: "Equality", example: "Gleichberechtigung ist ein Grundrecht." },
      { word: "Sozialstaat", translation: "Welfare state", example: "Der Sozialstaat sorgt für Grundversorgung." }
    ],
    grammar: {
      topic: "Passiv",
      explanation: "Vorgangspassiv = werden + Partizip II, Zustandspassiv = sein + Partizip II",
      examples: ["Das Gesetz wird verabschiedet.", "Das Gesetz ist verabschiedet."]
    },
    reading: {
      title: "Demokratie und Bürgerbeteiligung",
      text: "In modernen Demokratien ist die Bürgerbeteiligung von zentraler Bedeutung. Initiativen, Wahlen, Volksabstimmungen, Bürgerräte und Online-Petitionen ermöglichen es den Bürgern, aktiv teilzunehmen."
    },
    tasks: [
      "Fassen Sie die Formen der Bürgerbeteiligung zusammen.",
      "Erklären Sie fünf Passivformen im Text.",
      "Diskutieren Sie die Vor- und Nachteile direkter Demokratie."
    ]
  }
];

// Populate lesson menu
const lessonMenu = document.getElementById("lesson-menu");
lessons.forEach(l => {
  const li = document.createElement("li");
  li.textContent = l.title;
  li.addEventListener("click", () => showLesson(l.id));
  lessonMenu.appendChild(li);
});

// Show lesson
function showLesson(id) {
  const lesson = lessons.find(l => l.id === id);
  if (!lesson) return;
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>${lesson.title}</h2>
    <img src="${lesson.image}" alt="${lesson.title}" style="width:100%;max-width:600px;">
    <p>${lesson.overview}</p>
    <h3>Vocabulary</h3>
    <ul>${lesson.vocabulary.map(v => `<li><span class="clickable-word" title="${v.translation}">${v.word}</span>: ${v.example}</li>`).join("")}</ul>
    <h3>Grammar</h3>
    <p>${lesson.grammar.explanation}</p>
    <ul>${lesson.grammar.examples.map(e => `<li>${e}</li>`).join("")}</ul>
    <h3>${lesson.reading.title}</h3>
    <p>${lesson.reading.text}</p>
    <h3>Tasks</h3>
    <ol>${lesson.tasks.map(t => `<li>${t}</li>`).join("")}</ol>
  `;
}


