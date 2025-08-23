// Helper functions for audio processing (PCM to WAV)
const base64ToArrayBuffer = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
};

const pcmToWav = (pcmData, sampleRate) => {
    const numChannels = 1;
    const bytesPerSample = 2; // PCM 16-bit
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;

    const wavHeader = new ArrayBuffer(44);
    const view = new DataView(wavHeader);

    const writeString = (view, offset, string) => {
        for (let i = 0; i < string.length; i++) {
            view.setUint8(offset + i, string.charCodeAt(i));
        }
    };

    // RIFF chunk descriptor
    writeString(view, 0, 'RIFF'); // ChunkID
    view.setUint32(4, 36 + pcmData.byteLength, true); // ChunkSize
    writeString(view, 8, 'WAVE'); // Format
    // FMT sub-chunk
    writeString(view, 12, 'fmt '); // Subchunk1ID
    view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
    view.setUint16(20, 1, true); // AudioFormat (1 for PCM)
    view.setUint16(22, numChannels, true); // NumChannels
    view.setUint32(24, sampleRate, true); // SampleRate
    view.setUint16(32, blockAlign, true); // BlockAlign
    view.setUint16(34, bytesPerSample * 8, true); // BitsPerSample
    // Data sub-chunk
    writeString(view, 36, 'data'); // Subchunk2ID
    view.setUint32(40, pcmData.byteLength, true); // Subchunk2Size

    const combinedBuffer = new Uint8Array(wavHeader.byteLength + pcmData.byteLength);
    combinedBuffer.set(new Uint8Array(wavHeader), 0);
    combinedBuffer.set(new Uint8Array(pcmData.buffer), wavHeader.byteLength);

    return new Blob([combinedBuffer], { type: 'audio/wav' });
};

// Color Themes (used for dynamic styling in CSS)
const colorThemes = {
    violet: { bg: 'bg-violet-100', text: 'text-violet-800', border: 'border-violet-600', gradient: 'from-violet-500 to-purple-500' },
    sky: { bg: 'bg-sky-100', text: 'text-sky-800', border: 'border-sky-600', gradient: 'from-sky-500 to-cyan-500' },
    amber: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-600', gradient: 'from-amber-500 to-orange-500' },
    emerald: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-600', gradient: 'from-emerald-500 to-green-500' },
    rose: { bg: 'bg-rose-100', text: 'text-rose-800', border: 'border-rose-600', gradient: 'from-rose-500 to-pink-500' },
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-600', gradient: 'from-indigo-500 to-blue-500' },
    teal: { bg: 'bg-teal-100', text: 'text-teal-800', border: 'border-teal-600', gradient: 'from-teal-500 to-cyan-500' },
    fuchsia: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800', border: 'border-fuchsia-600', gradient: 'from-fuchsia-500 to-purple-500' },
    lime: { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-600', gradient: 'from-lime-500 to-green-500' },
    cyan: { bg: 'bg-cyan-100', text: 'text-cyan-800', border: 'border-cyan-600', gradient: 'from-cyan-500 to-sky-500' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-600', gradient: 'from-orange-500 to-red-500' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-600', gradient: 'from-pink-500 to-rose-500' },
};

// SVG Icons (replacing lucide-react)
const icons = {
    BookOpen: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-open"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zm12 0h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3h-7zm-2 0v14"></path></svg>`,
    CheckCircle2: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>`,
    ListChecks: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-list-checks"><path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M11 12h9"/><path d="M11 18h9"/><path d="M11 6h9"/></svg>`,
    Search: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`,
    Sparkles: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles"><path d="M9.9 12.5 7 15.4"/><path d="M13.1 12.5 16 15.4"/><path d="m15.4 7 2.9 2.9"/><path d="m7 15.4-2.9 2.9"/><path d="M14.5 6.1 17.4 3.2"/><path d="M7 15.4 4.1 18.3"/><path d="M13.1 12.5 16 15.4"/><path d="m15.4 7 2.9 2.9"/><path d="M15.4 7 12.5 4.1"/><path d="M7 15.4 4.1 18.3"/><path d="M11 20 12 22"/><path d="M12 2h1"/><path d="M20 11v1"/><path d="M2 12h2"/><path d="M7 20 6 22"/><path d="M17 20 18 22"/><path d="M22 7 20 6"/><path d="M20 17 22 18"/><path d="M2 7 4 6"/><path d="M2 17 4 18"/><path d="M6 4 7 2"/><path d="M18 4 17 2"/></svg>`,
    ChevronRight: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>`,
    ChevronLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>`,
    Languages: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-languages"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/></svg>`,
    Library: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-library"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/><path d="M18 2h-2"/><path d="M20 2h-2"/><path d="M16 2h-2"/><path d="M6 2H4"/><path d="M8 2H6"/><path d="M4 2H2"/></svg>`,
    Palette: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-palette"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.83 0 1.64-.1 2.4-.28 2.34-.7 4.14-2.5 4.84-4.79.62-2.03-.53-4.14-2.61-4.74H15.5L12 6.5l-2 3h.5Z"/><path d="M18 15.7a4 4 0 1 1 0 6H6"/></svg>`,
    Mic: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mic"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>`,
    FileText: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>`,
    Pencil: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
    BrainCircuit: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-circuit"><path d="M12 5a3 3 0 1 0-3 3"/><path d="M12 5a3 3 0 1 1 3 3"/><path d="M12 22a3 3 0 1 0 3-3"/><path d="M12 22a3 3 0 1 1-3-3"/><path d="M12 17v-2"/><path d="M12 12V9"/><path d="M12 8a4 4 0 1 0-4 4V9a2 2 0 0 1 2-2h2Z"/><path d="M12 12a4 4 0 1 1 4-4V9a2 2 0 0 1-2 2h-2Z"/><path d="M12 12v3"/><path d="M12 12v3"/><path d="M16 20h2c.6 0 1-.4 1-1v-2"/><path d="M6 20H4c-.6 0-1-.4-1-1v-2"/><path d="M9 4H7c-.6 0-1 .4-1 1v2"/><path d="M15 4h2c.6 0 1 .4 1 1v2"/></svg>`,
    Heart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>`,
    Film: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-film"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 3v18"/><path d="M3 7h18"/><path d="M3 17h18"/><path d="M17 3v18"/></svg>`,
    Globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-globe"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    Bot: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bot"><path d="M12 8V4H8"/><path d="M22 7.26V4l-2 2-2-2-2 2-2-2H8l-2 2-2-2-2 2H2v3.26A2 2 0 0 0 3 9a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2 2 2 0 0 0-1 1.74V20h2c0-1.78 1-4 4-4h4c3 0 4 2.22 4 4h2v-3.26A2 2 0 0 0 21 15a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2 2 2 0 0 0 1-1.74Z"/><path d="M10 16v4"/><path d="M14 16v4"/></svg>`,
    Play: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
    StopCircle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-stop-circle"><circle cx="12" cy="12" r="10"/><rect width="6" height="6" x="9" y="9"/></svg>`,
    TrendingUp: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`, // For the new unit
    Banknote: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-banknote"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>`, // For the new unit
};


// C1 German Grammar Library (General for AI usage)
const grammarLibraryGerman = [
    {
        key: "konjunktiv_ii",
        topicDe: "Konjunktiv II",
        explanationDe: "Der Konjunktiv II wird für hypothetische Situationen, Wünsche, irreale Bedingungen und höfliche Bitten verwendet. Er wird oft mit 'würde' + Infinitiv oder den speziellen Konjunktiv-Formen von Modalverben und starken Verben gebildet. Beispiele: 'Ich wäre gern reich.' (I would like to be rich.) 'Wenn ich Zeit hätte, würde ich dich besuchen.' (If ich had time, ich would visit you.) Der Konjunktiv II ist ein zentrales Element, um im Deutschen komplexe und nuancierte Aussagen zu treffen, insbesondere in wissenschaftlichen oder diplomatischen Kontexten, wo Direktheit oft vermieden wird. Er erlaubt es, Distanz zur Realität auszudrücken oder Vorschläge vorsichtiger zu formulieren.",
        examples: [
            { de: "Ich wäre jetzt gerne im Urlaub." },
            { de: "Wenn du mich gefragt hättest, hätte ich geholfen." },
            { de: "Könntest du mir bitte das Salz reichen?" },
            { de: "Man sollte die Umwelt schützen." },
            { de: "Er sähe die Lage anders, wenn er alle Fakten kennte." }
        ],
    },
    {
        key: "passiv_form",
        topicDe: "Passiv (Zustands- und Vorgangspassiv)",
        explanationDe: "Das Vorgangspassiv (werden + Partizip II) beschreibt eine Handlung, die gerade stattfindet oder vollzogen wird, wobei der Handelnde unwichtig ist oder nicht genannt werden soll. Beispiel: 'Das Haus wird gebaut.' (The house is being built.) Das Zustandspassiv (sein + Partizip II) beschreibt das Ergebnis einer abgeschlossenen Handlung, also den Zustand, der nach einer Handlung eingetreten ist. Beispiel: 'Das Haus ist gebaut.' (The house is built/finished). Die Unterscheidung zwischen diesen beiden Passivformen ist entscheidend für das Verständnis der zeitlichen Dimension von Ereignissen im Deutschen und wird häufig in Berichten, wissenschaftlichen Texten und offiziellen Mitteilungen verwendet.",
        examples: [
            { de: "Das Buch wird gelesen. (Vorgangspassiv)" },
            { de: "Das Fenster ist geschlossen. (Zustandspassiv)" },
            { de: "Das Problem wurde gelöst." },
            { de: "Der Bericht wird bis morgen fertiggestellt sein." },
            { de: "Die Straße ist wegen Bauarbeiten gesperrt." }
        ],
    },
    {
        key: "nominalisierung",
        topicDe: "Nominalisierung",
        explanationDe: "Nominalisierung ist die Umwandlung von Verben oder Adjektiven in Nomen. Dies ist ein häufiges Stilmittel in formeller Sprache, Verwaltungstexten und Zeitungsartikeln. Beispiele: 'lesen' wird zu 'das Lesen', 'gut' wird zu 'das Gute'. Oft wird ein Artikel vorangestellt und das nominalisierte Wort großgeschrieben. Diese Struktur ermöglicht eine dichtere und präzisere Ausdrucksweise und ist typisch für den C1-Stil.",
        examples: [
            { de: "Das schnelle Laufen ist gesund. (statt: schnell laufen)" },
            { de: "Die Entwicklung des Projekts dauert an. (statt: Das Projekt entwickelt sich)" },
            { de: "Nach langem Überlegen traf er eine Entscheidung." },
            { de: "Beim Ankommen informierte er sich." },
            { de: "Das kritische Hinterfragen ist essenziell." }
        ],
    },
    {
        key: "partizipialsatze",
        topicDe: "Erweiterte Partizipialkonstruktionen",
        explanationDe: "Partizipialsätze sind verkürzte Nebensätze, die Informationen über eine Person oder Sache geben und dabei einen ganzen Nebensatz kompakt zusammenfassen. Partizip I (Infinitiv + -d) drückt Gleichzeitigkeit oder Aktivität aus (z.B. 'Der lachende Mann' - the laughing man). Partizip II (ge- + Stamm + -t/-en) drückt Vorzeitigkeit oder Passivität aus (z.B. 'Der gekaufte Wagen' - the bought car). Diese Konstruktionen sind typisch für einen fortgeschrittenen, prägnanten Schreibstil.",
        examples: [
            { de: "Das schlafende Kind weinte." },
            { de: "Der von ihm gelesene Roman war spannend." },
            { de: "Die am Tisch sitzende Frau ist meine Mutter." },
            { de: "Die gestern gelieferte Ware ist defekt." },
            { de: "Die schnell wachsende Wirtschaft schafft neue Arbeitsplätze." }
        ],
    },
    {
        key: "konjunktionen",
        topicDe: "Komplexe Konjunktionen",
        explanationDe: "C1-Niveau erfordert die Beherrschung komplexer Konjunktionen für die Verknüpfung von Sätzen und die Darstellung komplexer Zusammenhänge. Beispiele sind: 'obwohl' (although), 'während' (while/whereas), 'damit' (so that), 'bevor' (before), 'nachdem' (after), 'sobald' (as soon as), 'je... desto...' (the... the...), 'indem', 'sofern', 'insofern', 'vielmehr', 'gleichwohl', 'demzufolge'. Auch die korrekte Verwendung von doppelten Konjunktionen ('weder... noch...', 'entweder... oder...', 'sowohl... als auch...') ist wichtig, um Argumente klar zu strukturieren und Beziehungen zwischen Ideen auszudrücken. Diese sprachlichen Mittel ermöglichen eine sehr präzise und differenzierte Kommunikation.",
        examples: [
            { de: "Obwohl es regnete, gingen wir spazieren." },
            { de: "Er lernt fleißig, damit er die Prüfung besteht." },
            { de: "Nachdem sie gegessen hatte, ging sie ins Bett." },
            { de: "Je mehr man übt, desto besser wird man." },
            { de: "Sie blieb zu Hause, da sie sich unwohl fühlte." }
        ],
    },
    {
        key: "satzbau_nebensatz",
        topicDe: "Komplexer Satzbau (Nebensätze)",
        explanationDe: "Auf C1-Niveau ist die Beherrschung komplexer Satzstrukturen mit verschiedenen Nebensatztypen essenziell. Dazu gehören z.B. Konzessivsätze (obwohl), Kausalsätze (weil, da), Finalsätze (damit, um... zu), Konsekutivsätze (sodass), Konditionalsätze (wenn, falls), Temporalsätze (während, als, nachdem) und Modalsätze (indem, ohne dass). Das Beherrschen dieser Strukturen ermöglicht es, sehr detaillierte und präzise Informationen zu vermitteln und logische Verbindungen klar darzustellen.",
        examples: [
            { de: "Obwohl es spät war, arbeiteten sie weiter." },
            { de: "Da er müde war, ging er früh ins Bett." },
            { de: "Sie trainiert hart, um den Marathon zu schaffen." },
            { de: "Er sprach so leise, dass niemand ihn verstand." }
        ],
    },
    {
        key: "präpositionen_kasus",
        topicDe: "Präpositionen mit festem Kasus",
        explanationDe: "Ein fortgeschrittenes Verständnis der deutschen Präpositionen erfordert die Kenntnis der Präpositionen mit festem Kasus (Dativ, Akkusativ oder Genitiv) und der Wechselpräpositionen, die je nach Kontext den Kasus ändern. C1-Niveau legt Wert auf seltene Präpositionen und präpositionale Ausdrücke, deren korrekte Anwendung oft den Unterschied zwischen einem nativen und einem nicht-nativen Sprecher ausmacht.",
        examples: [
            { de: "Er interessiert sich für Geschichte. (für + Akkusativ)" },
            { de: "Sie wartet auf den Bus. (auf + Akkusativ)" },
            { de: "Trotz des Regens gingen wir spazieren. (trotz + Genitiv)" },
            { de: "Sie geht zum Arzt. (zu + Dativ)" }
        ],
    },
    {
        key: "verb_mit_präposition",
        topicDe: "Verben mit Präposition",
        explanationDe: "Viele deutsche Verben sind untrennbar mit einer bestimmten Präposition verbunden und bilden mit ihr eine feste Redewendung, deren Bedeutung sich oft nicht direkt aus den Einzelteilen erschließt. Der Kasus nach der Präposition ist dabei festgelegt. Dies ist ein wichtiger Aspekt des C1-Niveaus, da das Beherrschen dieser Konstruktionen für eine korrekte und idiomatische Ausdrucksweise unerlässlich ist.",
        examples: [
            { de: "Ich freue mich auf den Urlaub." },
            { de: "Er ärgert sich über seinen Fehler." },
            { de: "Sie spricht über Politik." },
            { de: "Es kommt auf die Einstellung an." }
        ],
    },
    {
        key: "adjektivdeklination",
        topicDe: "Adjektivdeklination (fortgeschritten)",
        explanationDe: "Die C1-Adjektivdeklination geht über die Grundregeln hinaus und beinhaltet komplexere Fälle, wie die Deklination von mehreren Adjektiven vor einem Nomen, Adjektive nach unbestimmten Mengenangaben oder in speziellen Konstruktionen. Eine fehlerfreie Anwendung ist hier entscheidend, um präzise und grammatisch korrekte Sätze zu bilden, insbesondere in schriftlichen Kontexten.",
        examples: [
            { de: "Das neue, rote Auto steht vor der Tür." },
            { de: "Er hat viel frisches, leckeres Obst gekauft." },
            { de: "Mit den neuen, schnellen Computern arbeitet es sich besser." },
            { de: "Sie sprachen über das Gute und das Böse." }
        ],
    },
    {
        key: "subjektlose_sätze",
        topicDe: "Subjektlose Sätze und unpersönliche Ausdrücke",
        explanationDe: "Im Deutschen gibt es viele unpersönliche Konstruktionen, die oft ohne ein echtes Subjekt auskommen oder das unpersönliche 'es' verwenden. Dazu gehören Ausdrücke wie 'Es regnet', 'Es ist kalt', 'Es geht um...', 'Es gibt...', oder Konstruktionen mit Passiv ohne Agens.",
        examples: [
            { de: "Es klingelt an der Tür." },
            { de: "Es wird viel geredet." },
            { de: "Es ist wichtig, pünktlich zu sein." },
            { de: "Mir ist kalt." }
        ],
    },
    {
        key: "finanzwesen_vokabular",
        topicDe: "Finanzwesen und Wirtschaftsvokabular",
        explanationDe: "Ein umfassendes Verständnis des Finanz- und Wirtschaftswesens erfordert spezifisches Vokabular. Dazu gehören Begriffe wie 'Aktienmarkt', 'BIP', 'Inflation', 'Konjunktur', 'Zinssatz' und 'Investition'. Die Beherrschung dieser Begriffe ist unerlässlich, um Finanznachrichten zu verstehen und an Diskussionen über wirtschaftliche Entwicklungen teilzunehmen.",
        examples: [
            { de: "Der Aktienmarkt reagierte empfindlich auf die Nachrichten." },
            { de: "Das Bruttoinlandsprodukt ist ein Indikator für die Wirtschaftsleistung." },
            { de: "Die Inflation ist in den letzten Monaten stark gestiegen." },
            { de: "Die Konjunkturprognose für das nächste Jahr ist positiv." },
            { de: "Die Europäische Zentralbank hat den Leitzins erhöht." }
        ],
    }
];

// C1 German Course Data (Units)
const courseDataGerman = [
    {
        id: 1,
        title: "Umwelt & Gesellschaft",
        theme: "violet",
        icon: "Globe", // Changed from generic icon to Globe
        overview: "In dieser Einheit befassen wir uns mit aktuellen Umweltproblemen und gesellschaftlichen Herausforderungen. Wir lernen Vokabular und grammatische Strukturen, um komplexe Zusammenhänge zu beschreiben, Lösungsansätze zu diskutieren und die eigene Meinung zu äußern. Der Fokus liegt auf erweiterter Satzbildung und dem Gebrauch des Konjunktivs. Wir werden uns insbesondere mit den globalen Auswirkungen des Klimawandels, der Notwendigkeit nachhaltiger Lebensweisen und den sozialen Aspekten der Integration in einer multikulturellen Gesellschaft auseinandersetzen.",
        vocabulary: [
            "Nachhaltigkeit", "Klimawandel", "Umweltschutz", "erneuerbare Energien",
            "Ressourcenknappheit", "Mülltrennung", "Luftverschmutzung", "Artensterben", "Biodiversität", "ökologischer Fußabdruck",
            "gesellschaftlicher Wandel", "Integration", "Globalisierung", "demographischer Wandel",
            "soziale Gerechtigkeit", "Bürgerbeteiligung", "Zivilgesellschaft", "Diskriminierung", "Vorurteile", "Toleranz",
            "ethische Grundsätze", "Klimagipfel", "Emissionen", "Klimaneutralität", "Wassermangel", "Abfallwirtschaft"
        ],
        vocabExamples: {
            de: [
                "Die Förderung der Nachhaltigkeit ist entscheidend für unsere Zukunft und die nachfolgenden Generationen.",
                "Der Klimawandel stellt eine globale Bedrohung dar, die sofortiges Handeln erfordert.",
                "Viele Initiativen setzen sich aktiv für den Umweltschutz und den Erhalt unserer natürlichen Lebensgrundlagen ein.",
                "Der Ausbau erneuerbarer Energien ist notwendig, um die Abhängigkeit von fossilen Brennstoffen zu reduzieren.",
                "Ressourcenknappheit ist ein wachsendes Problem, das innovative Lösungen verlangt.",
                "Mülltrennung trägt aktiv zum Umweltschutz und zur Schonung wertvoller Rohstoffe bei.",
                "Die Luftverschmutzung in Großstädten ist besorgniserregend und wirkt sich negativ auf die Gesundheit aus.",
                "Das Artensterben beschleunigt sich weltweit und gefährdet das ökologische Gleichgewicht.",
                "Die Biodiversität muss unbedingt erhalten bleiben, um die Stabilität der Ökosysteme zu gewährleisten.",
                "Reduzieren Sie Ihren ökologischen Fußabdruck, indem Sie bewusste Konsumentscheidungen treffen!",
                "Der gesellschaftliche Wandel vollzieht sich rasant und bringt neue Herausforderungen mit sich.",
                "Eine gelungene Integration ist von großer Bedeutung für den sozialen Zusammenhalt einer Gesellschaft.",
                "Die Globalisierung hat Vor- und Nachteile, die sorgfältig abgewogen werden müssen.",
                "Der demographische Wandel beeinflusst die Rentensysteme und den Arbeitsmarkt nachhaltig.",
                "Soziale Gerechtigkeit ist ein hohes Gut, das in einer Gesellschaft angestrebt werden sollte.",
                "Bürgerbeteiligung stärkt die Demokratie und fördert das Vertrauen in politische Prozesse.",
                "Die Zivilgesellschaft spielt eine wichtige Rolle bei der Lösung gesellschaftlicher Probleme.",
                "Diskriminierung muss bekämpft werden, um Chancengleichheit für alle zu schaffen.",
                "Vorurteile können den gesellschaftlichen Zusammenhalt gefährden und Konflikte schüren.",
                "Toleranz ist die Basis für ein friedliches Miteinander in einer vielfältigen Gesellschaft.",
                "Ethische Grundsätze sollten stets beachtet werden, um verantwortungsvoll zu handeln.",
                "Auf dem letzten Klimagipfel wurden wichtige Beschlüsse gefasst.",
                "Die Reduktion von Emissionen ist ein zentrales Ziel der Klimapolitik.",
                "Viele Unternehmen streben Klimaneutralität bis 2030 an.",
                "Wassermangel wird in einigen Regionen zu einem ernsten Problem.",
                "Eine effektive Abfallwirtschaft ist für den Umweltschutz unerlässlich."
            ],
        },
        grammar: {
            key: "konjunktiv_ii", // Link to grammarLibraryGerman
            topicEn: "Konjunktiv II (Hypothetical Situations, Wishes, Politeness)",
            topicDe: "Konjunktiv II (Hypothetische Situationen, Wünsche, Höflichkeit)",
            explanationDe: "Der Konjunktiv II wird verwendet, um auszudrücken, was nicht der Realität entspricht (irreale Bedingungssätze), um Wünsche zu formulieren oder um höfliche Bitten zu äußern. Er wird auch für die indirekte Rede verwendet, wenn der Konjunktiv I nicht möglich ist. Bildungsformen sind 'würde' + Infinitiv für die meisten Verben oder spezielle Formen für Modalverben und einige starke Verben (z.B. wäre, hätte). Das Beherrschen des Konjunktiv II ist entscheidend, um im Deutschen komplexe und nuancierte Aussagen zu treffen, besonders in formellen oder akademischen Kontexten, wo eine direkte Ausdrucksweise oft zu stark oder unhöflich wirken könnte.",
            examples: [
                { de: "Wenn ich mehr Geld hätte, würde ich reisen." },
                { de: "Er täte gut daran, sich zu entschuldigen." },
                { de: "Ich wünschte, ich könnte fliegen." },
                { de: "Könnten Sie mir bitte helfen?" },
                { de: "Es wäre schön, wenn das Wetter besser wäre." }
            ],
        },
        reading: {
            title: "Die Herausforderungen des Klimawandels und die Rolle der Gesellschaft",
            text: "Der Klimawandel ist zweifellos eine der drängendsten globalen Herausforderungen unserer Zeit, die weitreichende Konsequenzen für unseren Planeten und die Menschheit mit sich bringt. Wissenschaftler warnen unermüdlich davor, dass die Auswirkungen wie extreme Wetterereignisse, der Anstieg des Meeresspiegels, die Versauerung der Ozeane und der alarmierende Verlust der Biodiversität immer gravierender werden könnten, sollten wir unsere derzeitigen Anstrengungen nicht drastisch verstärken. Um diesem Szenario entgegenzuwirken, müssten Staaten weltweit ihre Anstrengungen im Bereich des Umweltschutzes signifikant erhöhen und entschieden auf erneuerbare Energien umsteigen. Eine umfassende Energiewende, die den Ausstieg aus fossilen Brennstoffen vorantreibt, wäre dabei von größter Bedeutung. Viele Experten sind sich einig, dass es ohne eine solche Transformation kaum möglich wäre, die Erderwärmung auf ein verträgliches Maß zu begrenzen und somit katastrophale Folgen abzuwenden. Die Rolle jedes Einzelnen sollte dabei keineswegs unterschätzt werden: Wenn jeder seinen ökologischen Fußabdruck reduzierte, könnte ein kumulativer, signifikanter Unterschied erzielt werden. Es wäre wünschenswert, ja sogar unerlässlich, wenn das Bewusstsein für Nachhaltigkeit und Umweltschutz in allen Gesellschaftsschichten weiter wüchse und zu konkreten Handlungen führte. Nur durch gemeinsame und entschlossene Maßnahmen auf globaler und individueller Ebene können wir hoffen, die Zukunft unseres Planeten positiv zu gestalten und die Lebensgrundlagen für kommende Generationen zu sichern.",
            task: "Fassen Sie die Hauptaussagen des Textes zusammen und erläutern Sie die Dringlichkeit des Problems. Welche spezifischen Maßnahmen zur Bekämpfung des Klimawandels werden im Text genannt, sowohl auf staatlicher als auch auf individueller Ebene? Identifizieren Sie mindestens fünf Beispiele für den Konjunktiv II im Text und erklären Sie deren Funktion im jeweiligen Satzkontext.",
        },
        speaking: [
            "Diskutieren Sie die Vor- und Nachteile von erneuerbaren Energien und bewerten Sie deren Potenzial für die Zukunft. Begründen Sie Ihre Meinung ausführlich.",
            "Stellen Sie sich vor, Sie könnten ein globales Umweltproblem lösen. Welches Problem würden Sie wählen und welche konkreten Schritte würden Sie unternehmen, um es zu bewältigen? Erläutern Sie Ihre Strategie detailliert.",
            "Erörtern Sie, wie gesellschaftlicher Wandel gefördert werden kann, um eine nachhaltigere und gerechtere Welt zu schaffen. Welche Akteure spielen dabei eine Rolle?",
            "Sprechen Sie über die Rolle der Zivilgesellschaft im Umweltschutz und welche konkreten Beiträge sie leisten kann. Nennen Sie Beispiele.",
            "Wie wichtig ist individuelle Verantwortung im Kampf gegen den Klimawandel? Diskutieren Sie die Balance zwischen individuellen Handlungen und politischen Entscheidungen."
        ],
        writing: "Verfassen Sie einen ausführlichen Kommentar (ca. 200-250 Wörter) für eine Online-Zeitung zum Thema 'Nachhaltigkeit im Alltag: Eine Notwendigkeit für die Zukunft'. Nehmen Sie Stellung dazu, welche Rolle jeder Einzelne bei der Bewältigung der Klimakrise spielen kann und sollte, und welche Hürden dabei bestehen. Verwenden Sie dabei mindestens fünf Konjunktiv-II-Formen und fünf C1-Vokabeln aus dieser Einheit, um Ihre Argumentation zu untermauern.",
        quiz: [
            {
                q: "Wenn ich Zeit , ich dich besuchen.",
                choices: ["hätte / würde", "hatte / würde", "hätte / werde", "hatte / werde"],
                answer: 0,
                explanation: "Der Konjunktiv II in Bedingungssätzen wird mit 'hätte' (Konjunktiv II von haben) und 'würde' + Infinitiv gebildet.",
            },
            {
                q: "Das Auto gestern (reparieren).",
                choices: ["wird repariert", "wurde repariert", "ist repariert", "hat repariert"],
                answer: 1,
                explanation: "Vergangenheit Vorgangspassiv: 'wurde' + Partizip II ('repariert').",
            },
            {
            q: "Ich wünschte, ich (können) dir helfen.",
                choices: ["kann", "könnte", "konnte", "werde können"],
                answer: 1,
                explanation: "Wunschsatz mit Konjunktiv II: 'könnte' (Konjunktiv II von können).",
            },
            {
                q: "Das (lesen) dieses Buches hat mich begeistert.",
                choices: ["lesen", "gelesen", "Lesen", "Las"],
                answer: 2,
                explanation: "Nominalisierung des Verbs 'lesen' zu 'das Lesen'.",
            },
            {
                q: "Die von den Wissenschaftlern (entwickeln) Studie ist sehr relevant.",
                choices: ["entwickelnd", "entwickelt", "entwickelte", "entwickelten"],
                answer: 3,
                explanation: "Partizip II in einer erweiterten Partizipialkonstruktion ('entwickelten') im Dativ Plural.",
            }
        ],
    },
    {
        id: 2,
        title: "Wissenschaft & Technologie",
        theme: "sky",
        icon: "BrainCircuit", // Changed from generic icon to BrainCircuit
        overview: "In dieser Einheit tauchen wir in die Welt der Wissenschaft und Technologie ein. Wir behandeln Themen wie künstliche Intelligenz, Biotechnologie, Weltraumforschung und digitale Transformation. Ziel ist es, komplexe wissenschaftliche und technische Konzepte zu verstehen und darüber präzise in deutscher Sprache zu kommunizieren, insbesondere unter Verwendung von Nominalisierung und erweiterten Partizipialkonstruktionen. Wir werden die Auswirkungen dieser Entwicklungen auf Gesellschaft, Ethik und den Arbeitsmarkt detailliert beleuchten.",
        vocabulary: [
            "Künstliche Intelligenz", "Algorithmus", "Datenanalyse", "Cybersecurity", "Blockchain",
            "virtuelle Realität", "Augmented Reality", "Digitalisierung", "Automatisierung", "Robotik",
            "Biotechnologie", "Genforschung", "Medizin", "Pharmazie", "Klinische Studien",
            "Nanotechnologie",
            "Weltraumforschung", "Astronomie", "Raumfahrt", "Innovation", "Durchbruch",
            "Forschungsergebnisse",
            "Patent", "Ethikdebatte", "technologischer Fortschritt", "Interdisziplinär", "Quantencomputer", "Big Data", "Maschinelles Lernen"
        ],
        vocabExamples: {
            de: [
                "Die Künstliche Intelligenz verändert viele Bereiche unseres Lebens und bietet enorme Potenziale.",
                "Ein komplexer Algorithmus steuert das System und optimiert die Prozesse.",
                "Die Datenanalyse liefert wichtige Erkenntnisse für strategische Entscheidungen.",
                "Cybersecurity ist heute wichtiger denn je, um sensible Daten zu schützen.",
                "Die Blockchain-Technologie hat viele Anwendungsmöglichkeiten jenseits von Kryptowährungen.",
                "Virtuelle Realität wird zunehmend populärer in der Unterhaltung und Ausbildung.",
                "Augmented Reality erweitert unsere Wahrnehmung durch digitale Überlagerungen in der realen Welt.",
                "Die Digitalisierung der Gesellschaft schreitet voran und verändert unsere Arbeitsweise und Kommunikation.",
                "Automatisierung kann die Effizienz in der Produktion erheblich steigern.",
                "Die Robotik entwickelt sich rasant und findet Anwendung in immer mehr Industriebereichen.",
                "Biotechnologie bietet neue Lösungen für Gesundheitsprobleme und die Lebensmittelproduktion.",
                "Die Genforschung hat ethische Fragen aufgeworfen, die intensiv diskutiert werden müssen.",
                "Moderne Medizin erzielt große Fortschritte bei der Behandlung vieler Krankheiten.",
                "Die Pharmaindustrie ist ein wichtiger Wirtschaftszweig, der Medikamente entwickelt und herstellt.",
                "Klinische Studien sind unerlässlich für die Zulassung neuer Medikamente und Therapien.",
                "Nanotechnologie eröffnet neue Möglichkeiten in der Materialwissenschaft und Medizin.",
                "Die Weltraumforschung fasziniert die Menschheit seit jeher und treibt technologische Innovationen voran.",
                "Astronomie ist die Wissenschaft von den Himmelskörpern und dem Universum.",
                "Die Raumfahrt hat die Grenzen des Möglichen erweitert und unseren Blick auf die Erde verändert.",
                "Innovation ist der Motor der Wirtschaft und führt zu neuen Produkten und Dienstleistungen.",
                "Ein wissenschaftlicher Durchbruch wurde erzielt, der neue Forschungsfelder eröffnet.",
                "Die Forschungsergebnisse wurden in renommierten Fachzeitschriften veröffentlicht.",
                "Ein Patent schützt die Erfindung und sichert dem Erfinder Exklusivrechte.",
                "Die Ethikdebatte über KI ist sehr aktuell und betrifft grundlegende Fragen unserer Gesellschaft.",
                "Der technologische Fortschritt ist unaufhaltsam und prägt unsere Zukunft.",
                "Interdisziplinäre Zusammenarbeit ist oft entscheidend, um komplexe Probleme zu lösen.",
                "Quantencomputer versprechen revolutionäre Rechenleistungen für die Zukunft.",
                "Big Data ermöglicht die Analyse riesiger Datenmengen für neue Erkenntnisse.",
                "Maschinelles Lernen ist ein Teilbereich der KI, der Algorithmen das Lernen aus Daten ermöglicht."
            ],
        },
        grammar: {
            key: "nominalisierung", // Link to grammarLibraryGerman
            topicEn: "Nominalization & Extended Participle Constructions",
            topicDe: "Nominalisierung & Erweiterte Partizipialkonstruktionen",
            explanationDe: "Die Nominalisierung von Verben und Adjektiven ist ein Kennzeichen des C1-Niveaus und wird häufig in der Schriftsprache verwendet (z.B. 'das Sprechen', 'das Gute'). Sie ermöglicht eine verdichtete und formelle Ausdrucksweise. Erweiterte Partizipialkonstruktionen fassen Informationen kompakt zusammen, indem sie einen ganzen Nebensatz zu einer Partizipgruppe verdichten (z.B. 'Der gestern angekommene Zug' statt 'Der Zug, der gestern angekommen ist'). Diese Strukturen sind typisch für wissenschaftliche und technische Texte.",
            examples: [
                { de: "Das Schreiben langer Texte fällt ihm leicht. (Nominalisierung)" },
                { de: "Der von der Firma entwickelte Algorithmus ist sehr effizient. (Erweiterte Partizipialkonstruktion)" },
                { de: "Nach dem Essen gingen wir spazieren." },
                { de: "Die von der Sonne gewärmten Steine speichern die Wärme." },
                { de: "Das ständige Lernen neuer Fähigkeiten ist heutzutage unerlässlich." }
            ],
        },
        reading: {
            title: "Künstliche Intelligenz: Chancen, Risiken und die Zukunft",
            text: "Künstliche Intelligenz (KI) ist längst keine bloße Science-Fiction mehr, sondern prägt zunehmend unseren Alltag und alle Bereiche der modernen Gesellschaft. Die von komplexen Algorithmen gesteuerte Entscheidungsfindung revolutioniert zahlreiche Branchen, von der Medizin über die Finanzwelt bis hin zur Automobilindustrie, und verspricht enorme Effizienzsteigerungen. Die immense Menge an Daten, die täglich generiert wird, ermöglicht das Training immer leistungsfähigerer und autonomer agierender KI-Systeme, die in der Lage sind, Muster zu erkennen und Vorhersagen zu treffen, die menschliche Fähigkeiten übersteigen. Diesem rasanten technologischen Fortschritt stehen jedoch auch erhebliche Bedenken gegenüber, insbesondere im Hinblick auf Datenschutz, die Sicherheit sensibler Informationen und die ethischen Implikationen des breiten Einsatzes von KI. Die automatisierte Überwachung von Prozessen könnte einerseits die Effizienz massiv steigern, andererseits aber auch die Privatsphäre der Nutzer gefährden und die Gefahr der Diskriminierung durch algorithmische Voreingenommenheit bergen. Die Notwendigkeit einer umfassenden und vorausschauenden Regulierung des KI-Sektors wird von vielen Experten nachdrücklich hervorgehoben, um Missbrauch zu verhindern und die immensen Vorteile dieser transformativen Technologie zum Wohle der gesamten Gesellschaft nutzbar zu machen. Die in den letzten Jahren rasant gewachsenen Investitionen in die KI-Forschung lassen vermuten, dass die Entwicklung exponentiell weitergehen wird und wir erst am Anfang dieser technologischen Revolution stehen.",
            task: "Fassen Sie die Hauptaussagen des Textes zusammen und diskutieren Sie die zentralen Chancen und Risiken von Künstlicher Intelligenz, wie sie im Text dargestellt werden. Erläutern Sie die Bedeutung von Datenschutz und ethischen Implikationen im Kontext von KI. Finden Sie drei Beispiele für Nominalisierung und drei Beispiele für erweiterte Partizipialkonstruktionen im Text und erklären Sie jeweils ihre Funktion und ihren Beitrag zur prägnanten Ausdrucksweise.",
        },
        speaking: [
            "Diskutieren Sie die ethischen Aspekte der künstlichen Intelligenz. Wo sehen Sie Grenzen und welche Regeln sollten gelten?",
            "Welche Rolle spielt die Technologie in Ihrem Berufsalltag oder Studium? Beschreiben Sie konkrete Beispiele und Ihre Erfahrungen.",
            "Stellen Sie sich vor, Sie leben im Jahr 2050. Welche technologischen Entwicklungen haben Ihren Alltag am stärksten verändert und wie bewerten Sie diese Veränderungen?",
            "Erörtern Sie die Vor- und Nachteile der Digitalisierung für die Gesellschaft und einzelne Individuen. Wo liegen die größten Herausforderungen?",
            "Wie können wir sicherstellen, dass technologischer Fortschritt allen zugutekommt und soziale Ungleichheiten nicht verstärkt werden? Diskutieren Sie Lösungsansätze."
        ],
        writing: "Verfassen Sie einen Zeitungsartikel (ca. 200-250 Wörter) über 'Die Zukunft der Weltraumforschung: Neue Horizonte und alte Herausforderungen'. Diskutieren Sie die Bedeutung neuer Entdeckungen, die potenziellen Vorteile für die Menschheit und die technologischen sowie finanziellen Herausforderungen der Raumfahrt. Verwenden Sie dabei Nominalisierung und mindestens drei erweiterte Partizipialkonstruktionen sowie fünf C1-Vokabeln aus dieser Einheit.",
        quiz: [
            {
                q: "Das (lesen) vieler Bücher ist wichtig für die Bildung.",
                choices: ["lesen", "gelesen", "Lesen", "lesend"],
                answer: 2,
                explanation: "Die Nominalisierung des Verbs 'lesen' ist 'das Lesen', welches großgeschrieben wird.",
            },
            {
                q: "Die von den Studenten (schreiben) Arbeiten waren sehr gut.",
                choices: ["schreibende", "geschriebenen", "geschrieben", "schrieben"],
                answer: 1,
                explanation: "Partizip II in einer erweiterten Partizipialkonstruktion ('geschriebenen') passt hier, da es sich auf die 'Arbeiten' bezieht, die 'geschrieben wurden' und im Dativ Plural stehen.",
            },
            {
                q: "Sein (kommen) war unerwartet.",
                choices: ["gekommen", "ankommen", "Ankommen", "kommend"],
                answer: 2,
                explanation: "Nominalisierung des Verbs 'ankommen' zu 'das Ankommen'.",
            },
            {
                q: "Der gestern (liefern) Kuchen schmeckte hervorragend.",
                choices: ["liefern", "liefernd", "gelieferte", "geliefert"],
                answer: 2,
                explanation: "Partizip II in einer erweiterten Partizipialkonstruktion ('gelieferte') ist hier richtig, da es sich auf den 'Kuchen' bezieht, der 'geliefert wurde'.",
            },
            {
                q: "Die (diskutieren) Themen waren sehr komplex.",
                choices: ["diskutierende", "diskutiert", "diskutierten", "diskutierende"],
                answer: 2,
                explanation: "Partizip II in einer erweiterten Partizipialkonstruktion ('diskutierten') im Plural.",
            }
        ],
    },
    {
        id: 3,
        title: "Kultur & Medien",
        theme: "amber",
        icon: "Film", // Changed from generic icon to Film
        overview: "In dieser Einheit werden wir uns mit verschiedenen Aspekten der deutschen und internationalen Kultur sowie der Medienlandschaft befassen. Wir analysieren literarische Texte, Kunstwerke, Musik und diskutieren die Rolle der Medien in der modernen Gesellschaft. Der Schwerpunkt liegt auf der differenzierten Ausdrucksweise und der kritischen Auseinandersetzung mit kulturellen Phänomenen, einschließlich der Herausforderungen durch Fake News und der Chancen des kulturellen Austauschs im digitalen Zeitalter.",
        vocabulary: [
            "Literatur", "Bildende Kunst", "Musik", "Theater", "Film", "Architektur", "Tradition", "Brauchtum",
            "Kulturerbe", "Globalisierung der Kultur", "Medienlandschaft", "Nachrichten", "Journalismus", "Fake News",
            "soziale Medien", "Zensur", "Pressefreiheit", "Öffentlichkeit", "Rezipient", "Inszenierung", "Subvention",
            "kultureller Austausch", "Kritiker", "Rezeption", "Populärkultur", "Medienkompetenz", "Ethik im Journalismus"
        ],
        vocabExamples: {
            de: [
                "Die deutsche Literatur hat viele berühmte Schriftsteller wie Goethe und Schiller hervorgebracht.",
                "Die Bildende Kunst umfasst Malerei, Skulptur, Grafik und digitale Kunstformen.",
                "Musik verbindet Menschen über kulturelle Grenzen hinweg und drückt universelle Gefühle aus.",
                "Das Theaterstück wurde vom Publikum gefeiert und erhielt hervorragende Kritiken.",
                "Dieser Film wurde auf einem internationalen Festival ausgezeichnet und fand weltweit Beachtung.",
                "Die Architektur der Stadt ist beeindruckend und spiegelt ihre lange Geschichte wider.",
                "Viele Traditionen werden von Generation zu Generation weitergegeben und prägen die lokale Identität.",
                "Das immaterielle Kulturerbe umfasst Bräuche, Darstellungen, Ausdrucksformen und Wissen.",
                "Die Globalisierung der Kultur führt zu einer Vermischung und einem Austausch von Traditionen.",
                "Die Medienlandschaft ist vielfältig und umfasst Print, Radio, Fernsehen und Online-Medien.",
                "Nachrichten informieren die Öffentlichkeit über aktuelle Ereignisse und Entwicklungen.",
                "Journalismus hat die Aufgabe, objektiv zu berichten und Sachverhalte kritisch zu hinterfragen.",
                "Fake News sind Falschmeldungen, die bewusst verbreitet werden, um Meinungen zu manipulieren.",
                "Soziale Medien spielen eine immer größere Rolle bei der Informationsverbreitung und Meinungsbildung.",
                "Zensur beschränkt die Meinungsfreiheit und den Zugang zu Informationen.",
                "Pressefreiheit ist ein Grundrecht und unerlässlich für eine funktionierende Demokratie.",
                "Die Öffentlichkeit hat ein Recht auf umfassende und wahrheitsgemäße Information.",
                "Der Rezipient ist der Empfänger von Nachrichten oder kulturellen Inhalten.",
                "Die Inszenierung eines Theaterstücks kann die Botschaft maßgeblich beeinflussen.",
                "Subventionen unterstützen kulturelle Einrichtungen und Künstler finanziell.",
                "Kultureller Austausch fördert das gegenseitige Verständnis und die Toleranz zwischen Völkern.",
                "Kritiker bewerten Kunstwerke, Filme und Bücher und geben Empfehlungen ab.",
                "Die Rezeption eines Werkes beschreibt, wie es von der Öffentlichkeit aufgenommen wird.",
                "Populärkultur prägt den Alltag vieler Menschen und ist oft kurzlebig.",
                "Medienkompetenz ist die Fähigkeit, Medien kritisch zu nutzen und zu bewerten.",
                "Ethik im Journalismus ist entscheidend für Vertrauen und Glaubwürdigkeit."
            ],
        },
        grammar: {
            key: "konjunktionen", // Link to grammarLibraryGerman
            topicEn: "Complex Conjunctions and Adverbs",
            topicDe: "Komplexe Konjunktionen und Adverbien (Fortgeschritten)",
            explanationDe: "Auf C1-Niveau ist die präzise Anwendung komplexer Konjunktionen und Konjunktionaladverbien für die logische Verknüpfung von Sätzen und die Darstellung nuancierter Beziehungen unerlässlich. Beispiele sind 'indem' (by doing), 'sofern' (provided that), 'insofern' (insofar as), 'vielmehr' (rather/instead), 'gleichwohl' (nevertheless), 'demzufolge' (consequently). Auch die korrekte Verwendung von doppelten Konjunktionen ('weder... noch...', 'entweder... oder...', 'sowohl... als auch...') ist wichtig, um Argumente klar zu strukturieren und Beziehungen zwischen Ideen auszudrücken. Diese sprachlichen Mittel ermöglichen eine sehr präzise und differenzierte Kommunikation.",
            examples: [
                { de: "Er verbesserte seine Sprachkenntnisse, indem er täglich übte." },
                { de: "Obwohl sie müde war, arbeitete sie weiter." },
                { de: "Sofern das Wetter gut ist, machen wir einen Ausflug." },
                { de: "Weder Fisch noch Fleisch, das war das Ergebnis." },
                { de: "Sie ist nicht nur intelligent, sondern auch sehr fleißig." }
            ],
        },
        reading: {
            title: "Die Macht der Medien im digitalen Zeitalter: Chancen, Risiken und Verantwortung",
            text: "Im digitalen Zeitalter hat sich die Medienlandschaft grundlegend gewandelt, was sowohl faszinierende Chancen als auch ernste Risiken mit sich bringt. Soziale Medien spielen eine immer größere und entscheidendere Rolle bei der Verbreitung von Informationen, wobei die Unterscheidung zwischen seriösen Nachrichten und bewusst gestreuten 'Fake News' für den durchschnittlichen Rezipienten zunehmend schwieriger wird. Journalisten sehen sich mit neuen und komplexen Herausforderungen konfrontiert, indem sie Inhalte nicht nur schnell und präzise aufbereiten müssen, sondern gleichzeitig auch ihre Glaubwürdigkeit in einem Umfeld voller Desinformation wahren wollen. Die Frage nach der 'Wahrheit' in der schieren Informationsflut wird immer komplexer und erfordert ein hohes Maß an kritischem Denken. Insofern ist Medienkompetenz heutzutage wichtiger denn je, um Nachrichten kritisch zu hinterfragen, Quellen zu überprüfen und sich nicht von Meinungsblasen isolieren oder manipulieren zu lassen. Gleichwohl bietet das digitale Zeitalter auch enorme Chancen für den kulturellen Austausch, die Förderung von Vielfalt und die Stärkung der Bürgerbeteiligung, indem es neue Plattformen für Diskussionen, kreative Ausdrucksformen und den direkten Dialog schafft. Die Auseinandersetzung mit der Medienethik und die Verantwortung aller Akteure sind daher von zentraler Bedeutung, um die positiven Potenziale der digitalen Transformation voll ausschöpfen und gleichzeitig ihre Gefahren minimieren zu können. Es gilt, ein Gleichgewicht zwischen Freiheit und Verantwortung zu finden, um eine informierte und partizipative Gesellschaft zu gewährleisten.",
            task: "Fassen Sie die Hauptaussagen des Textes über die Medienlandschaft im digitalen Zeitalter zusammen. Welche spezifischen Herausforderungen und Chancen des digitalen Zeitalters werden genannt? Erläutern Sie die Rolle der Medienkompetenz. Finden Sie mindestens vier Beispiele für komplexe Konjunktionen oder Konjunktionaladverbien im Text und erklären Sie deren Funktion für die Satzverbindung und Sinngebung.",
        },
        speaking: [
            "Diskutieren Sie die Rolle sozialer Medien in der heutigen Gesellschaft. Wie beeinflussen sie die Meinungsbildung und den Alltag?",
            "Wie können wir Fake News erkennen und uns davor schützen? Welche Strategien sind hier effektiv?",
            "Stellen Sie sich vor, Sie sind ein Journalist in der heutigen Zeit. Welche ethischen Grundsätze würden Sie bei Ihrer Arbeit besonders beachten und warum?",
            "Erörtern Sie die Bedeutung der Pressefreiheit für eine Demokratie und welche Gefahren sie bedrohen können.",
            "Sprechen Sie über die Chancen und Risiken der Globalisierung der Kultur. Welche positiven und negativen Auswirkungen sehen Sie?"
        ],
        writing: "Verfassen Sie einen ausführlichen Essay (ca. 200-250 Wörter) zum Thema 'Die Zukunft des Journalismus im digitalen Zeitalter: Überleben durch Anpassung'. Diskutieren Sie, wie sich der Journalismus an die neuen Herausforderungen anpassen muss, um relevant und glaubwürdig zu bleiben. Welche neuen Formate und Arbeitsweisen sind denkbar? Verwenden Sie dabei mindestens fünf komplexe Konjunktionen und fünf C1-Vokabeln aus dieser Einheit.",
        quiz: [
            {
                q: "Er verbesserte seine Deutschkenntnisse, ____ er täglich übte.",
                choices: ["indem", "während", "damit", "obwohl"],
                answer: 0,
                explanation: "'Indem' leitet einen Modalsatz ein und beschreibt, auf welche Weise etwas geschieht.",
            },
            {
                q: "____ er reich ist, ist er nicht glücklich.",
                choices: ["Damit", "Sobald", "Obwohl", "Während"],
                answer: 2,
                explanation: "'Obwohl' leitet einen Konzessivsatz ein und drückt einen Gegensatz aus.",
            },
            {
                q: "____ er kommt heute Abend noch.",
                choices: ["Weder", "Sowohl", "Entweder", "Als auch"],
                answer: 2,
                explanation: "'Entweder... oder...' ist eine disjunktive Konjunktion, die eine Wahlmöglichkeit ausdrückt.",
            },
            {
                q: "Je mehr man lernt, ____ man weiß.",
                choices: ["desto", "umso", "mehr", "weniger"],
                answer: 0,
                explanation: "'Je... desto...' ist eine Korrelation, die eine proportionale Beziehung ausdrückt.",
            },
            {
                q: "Das Team arbeitete fleißig, ____ der Zeitplan sehr eng war.",
                choices: ["denn", "weil", "obwohl", "damit"],
                answer: 2,
                explanation: "'Obwohl' drückt einen Gegensatz aus, der zum Hauptsatz in Relation steht.",
            }
        ],
    },
    {
        id: 4,
        title: "Politik & Gesellschaft",
        theme: "rose",
        icon: "Library", // Changed from generic icon to Library
        overview: "In dieser Einheit befassen wir uns mit politischen Systemen, gesellschaftlichen Strukturen und aktuellen Debatten. Wir lernen Vokabular und grammatische Strukturen, um politische Prozesse zu analysieren, Meinungen zu äußern und sich an Diskussionen über soziale Gerechtigkeit, Menschenrechte und internationale Beziehungen zu beteiligen. Der Fokus liegt auf komplexem Satzbau, Passivformen und der differenzierten Ausdrucksweise, um politische Diskurse präzise führen zu können.",
        vocabulary: [
            "Demokratie", "Diktatur", "Parlament", "Regierung", "Opposition", "Wahlen", "Verfassung", "Gesetzgebung",
            "Politische Parteien", "Lobbyismus", "Bürgerrechte", "Menschenrechte", "Gleichberechtigung", "Sozialstaat",
            "Steuersystem", "Wirtschaftspolitik", "Außenpolitik", "Internationale Beziehungen", "Diplomatie", "Konfliktlösung",
            "Pressefreiheit", "Meinungsfreiheit", "Protest", "Streik", "Gewerkschaft", "Zivilgesellschaft", "NGO",
            "Koalition", "Föderalismus", "Bürokratie", "Grundgesetz"
        ],
        vocabExamples: {
            de: [
                "Die Demokratie ist eine Staatsform, in der das Volk durch gewählte Vertreter regiert.",
                "In einer Diktatur hat eine einzelne Person oder eine kleine Gruppe die uneingeschränkte Macht.",
                "Das Parlament ist das legislative Organ, das Gesetze verabschiedet und die Regierung kontrolliert.",
                "Die Regierung ist für die Führung des Staates und die Umsetzung der Politik zuständig.",
                "Die Opposition kontrolliert die Regierung und bietet alternative politische Konzepte an.",
                "Wahlen finden regelmäßig statt, um die Volksvertreter zu bestimmen und die Legitimität der Regierung zu sichern.",
                "Die Verfassung ist das höchste Gesetz eines Staates und legt die Grundrechte sowie die Staatsorganisation fest.",
                "Die Gesetzgebung ist der Prozess der Schaffung, Änderung und Aufhebung von Gesetzen.",
                "Politische Parteien vertreten unterschiedliche Interessen und Ideologien in der Gesellschaft.",
                "Lobbyismus kann die Gesetzgebung beeinflussen, indem Interessenverbände Druck auf politische Entscheidungsträger ausüben.",
                "Bürgerrechte garantieren die Freiheit und Gleichheit der Individuen gegenüber dem Staat.",
                "Menschenrechte sind universell und unteilbar und stehen jedem Menschen von Geburt an zu.",
                "Gleichberechtigung ist ein wichtiges Ziel der Gesellschaft, um allen Menschen die gleichen Chancen zu ermöglichen.",
                "Der Sozialstaat sichert die Grundversorgung der Bürger und bietet soziale Absicherung.",
                "Das Steuersystem finanziert öffentliche Leistungen wie Infrastruktur, Bildung und Gesundheitswesen.",
                "Die Wirtschaftspolitik steuert die wirtschaftliche Entwicklung eines Landes und fördert Wachstum und Beschäftigung.",
                "Die Außenpolitik regelt die Beziehungen zu anderen Staaten und internationalen Organisationen.",
                "Internationale Beziehungen sind komplex und vielfältig und umfassen Diplomatie, Handel und kulturellen Austausch.",
                "Diplomatie ist die Kunst der Konfliktlösung durch Verhandlungen und friedliche Mittel.",
                "Pressefreiheit ist ein Grundpfeiler der Demokratie und ermöglicht eine freie Berichterstattung.",
                "Meinungsfreiheit erlaubt jedem Bürger, seine Meinung frei zu äußern, solange dies nicht gegen Gesetze verstößt.",
                "Proteste sind ein Mittel der Bürger, ihren Unmut auszudrücken und auf politische Missstände aufmerksam zu machen.",
                "Streiks werden von Gewerkschaften organisiert, um bessere Arbeitsbedingungen und höhere Löhne zu fordern.",
                "Gewerkschaften vertreten die Interessen der Arbeitnehmer und setzen sich für soziale Gerechtigkeit ein.",
                "Die Zivilgesellschaft engagiert sich für soziale, ökologische und politische Belange außerhalb staatlicher Institutionen.",
                "NGOs (Nichtregierungsorganisationen) spielen eine wichtige Rolle in der internationalen Entwicklung und im Katastrophenschutz.",
                "Eine Koalition ist ein Zusammenschluss mehrerer Parteien zur Bildung einer Regierung.",
                "Der Föderalismus verteilt die Macht zwischen Zentralstaat und Gliedstaaten.",
                "Bürokratie bezieht sich auf die Verwaltung in Behörden und Unternehmen.",
                "Das Grundgesetz ist die Verfassung der Bundesrepublik Deutschland."
            ],
        },
        grammar: {
            key: "passiv_form", // Link to grammarLibraryGerman
            topicEn: "Passive Voice (Process and State Passive)",
            topicDe: "Passiv (Vorgangs- und Zustandspassiv)",
            explanationDe: "Das Vorgangspassiv (werden + Partizip II) beschreibt eine Handlung oder einen Prozess, bei dem der Fokus auf der Handlung selbst liegt und der Handelnde oft unbekannt oder unwichtig ist. Beispiel: 'Das Gesetz wird verabschiedet.' (The law is being passed.) Das Zustandspassiv (sein + Partizip II) beschreibt das Ergebnis einer abgeschlossenen Handlung, also den Zustand, der nach einer Handlung eingetreten ist. Beispiel: 'Das Gesetz ist verabschiedet.' (The law is passed). Die Beherrschung dieser beiden Passivformen ist entscheidend für eine differenzierte Ausdrucksweise in offiziellen und analytischen Texten.",
            examples: [
                { de: "Der Bericht wird gerade geschrieben. (Vorgangspassiv)" },
                { de: "Das Problem ist gelöst. (Zustandspassiv)" },
                { de: "Die Entscheidung wurde getroffen." },
                { de: "Die Türen sind geschlossen." },
                { de: "Neue Maßnahmen werden eingeführt." }
            ],
        },
        reading: {
            title: "Demokratie und Bürgerbeteiligung: Säulen einer stabilen Gesellschaft",
            text: "In modernen Demokratien ist die **Bürgerbeteiligung** von zentraler Bedeutung, um die **Legitimität** politischer Entscheidungen zu stärken und eine breite Akzeptanz in der Bevölkerung zu gewährleisten. Oftmals werden Initiativen ins Leben gerufen, damit Bürger aktiv an der Gestaltung ihrer Gesellschaft teilhaben können. Während **Wahlen** die grundlegendste und direkteste Form der Beteiligung darstellen, sind auch andere Mechanismen wie **Volksabstimmungen**, Bürgerforen, Online-Petitionen oder konsensorientierte Planungsverfahren wie **Bürgerräte** in vielen Ländern etabliert worden, um die direkte Einflussnahme der Bevölkerung zu fördern. Kritiker befürchten jedoch, dass eine zu starke Betonung direkter Demokratieformen zu **Populismus** führen könnte, indem komplexe Sachverhalte vereinfacht und emotionale Debatten geschürt werden, anstatt fundierte Entscheidungen zu ermöglichen. Dies könnte die Stabilität des Systems gefährden. Dennoch wird die Stärkung der **Zivilgesellschaft** als unerlässlich erachtet, um die Vielfalt der Meinungen widerzuspiegeln, unterschiedliche Perspektiven zu berücksichtigen und eine ausgewogene Entscheidungsfindung zu gewährleisten. Die Rolle der **Medien** ist hierbei nicht zu unterschätzen, da sie Informationen aufbereiten, Debatten anstoßen und als vierte Gewalt die Macht kontrollieren. Letztendlich muss ein sensibles **Gleichgewicht** gefunden werden zwischen **repräsentativer Demokratie**, die Effizienz und Stabilität bietet, und direkter Bürgerbeteiligung, die Partizipation und Legitimität erhöht, sodass die politischen Prozesse sowohl effizient als auch bürgernah gestaltet werden können, um den Herausforderungen des 21. Jahrhunderts gerecht zu werden.",
            task: "Fassen Sie die verschiedenen Formen der Bürgerbeteiligung zusammen, die im Text genannt werden, und erläutern Sie deren jeweilige Funktion. Welche Vor- und Nachteile der direkten Demokratie werden diskutiert? Erklären Sie die Bedeutung der Zivilgesellschaft und der Medien. Finden Sie mindestens fünf Passivformen im Text und erklären Sie deren Funktion (Vorgangs- oder Zustandspassiv) im jeweiligen Satzkontext.",
        },
        speaking: [
            "Diskutieren Sie die Vor- und Nachteile von direkter Demokratie im Vergleich zur repräsentativen Demokratie. Welche Form halten Sie für effektiver und warum?",
            "Wie können junge Menschen für Politik begeistert werden? Welche konkreten Maßnahmen könnten ergriffen werden, um ihr Interesse zu wecken?",
            "Welche Rolle spielen soziale Bewegungen und Bürgerinitiativen in einer Demokratie? Nennen Sie aktuelle Beispiele und bewerten Sie ihren Einfluss.",
            "Erörtern Sie die Bedeutung von Menschenrechten in der heutigen Welt und welche Herausforderungen bei ihrer Umsetzung bestehen.",
            "Sprechen Sie über die Herausforderungen der internationalen Diplomatie bei der Lösung globaler Konflikte. Welche Strategien sind hier am vielversprechendsten?"
        ],
        writing: "Verfassen Sie eine ausführliche Meinungsäußerung (ca. 200-250 Wörter) für ein politisches Forum zum Thema 'Jugend und Politik: Wege zu mehr Beteiligung'. Diskutieren Sie, wie die politische Beteiligung junger Menschen gefördert werden kann, welche Hürden dabei bestehen und welche Vorteile eine stärkere Einbindung junger Menschen für die Demokratie hätte. Verwenden Sie dabei mindestens fünf Passivformen und fünf C1-Vokabeln aus dieser Einheit.",
        quiz: [
            {
                q: "Das neue Gesetz (verabschieden) letzte Woche.",
                choices: ["wird verabschiedet", "wurde verabschiedet", "ist verabschiedet", "hat verabschiedet"],
                answer: 1,
                explanation: "Vergangenheit Vorgangspassiv: 'wurde' + Partizip II ('verabschiedet') beschreibt eine Handlung in der Vergangenheit.",
            },
            {
                q: "Die Türen (schließen) schon.",
                choices: ["werden geschlossen", "wurden geschlossen", "sind geschlossen", "haben geschlossen"],
                answer: 2,
                explanation: "Zustandspassiv: 'sind' + Partizip II ('geschlossen') beschreibt den aktuellen Zustand als Ergebnis einer Handlung.",
            },
            {
                q: "Der Antrag (bearbeiten) im Moment.",
                choices: ["wird bearbeitet", "wurde bearbeitet", "ist bearbeitet", "hat bearbeitet"],
                answer: 0,
                explanation: "Gegenwart Vorgangspassiv: 'wird' + Partizip II ('bearbeitet') beschreibt eine aktuell stattfindende Handlung.",
            },
            {
                q: "Viele Bücher (lesen) jährlich.",
                choices: ["werden gelesen", "wurden gelesen", "sind gelesen", "haben gelesen"],
                answer: 0,
                explanation: "Gegenwart Vorgangspassiv: 'werden' + Partizip II ('gelesen') beschreibt eine regelmäßig stattfindende Handlung.",
            },
            {
                q: "Die Entscheidung (treffen) gestern.",
                choices: ["wird getroffen", "wurde getroffen", "ist getroffen", "hat getroffen"],
                answer: 1,
                explanation: "Vergangenheit Vorgangspassiv: 'wurde' + Partizip II ('getroffen') für eine abgeschlossene Handlung in der Vergangenheit.",
            }
        ],
    },
    {
        id: 5,
        title: "Wirtschaft & Finanzen",
        theme: "emerald",
        icon: "Banknote",
        overview: "In dieser Einheit konzentrieren wir uns auf die deutsche und globale Wirtschaft sowie das Finanzwesen. Wir lernen spezifisches Vokabular und komplexe grammatische Strukturen, um wirtschaftliche Zusammenhänge zu analysieren, Finanznachrichten zu verstehen und über ökonomische Entwicklungen zu diskutieren. Schwerpunkte sind Themen wie Konjunkturzyklen, Inflation, Finanzmärkte und Unternehmensführung. Die Präzision der Ausdrucksweise und das Verständnis von Fachterminologie sind hierbei essenziell.",
        vocabulary: [
            "Wirtschaftswachstum", "Bruttoinlandsprodukt (BIP)", "Inflation", "Deflation", "Rezession",
            "Konjunktur", "Finanzmarkt", "Aktien", "Anleihen", "Investition", "Kapital", "Zinssatz",
            "Devisen", "Export", "Import", "Handelsbilanz", "Globalisierung der Wirtschaft",
            "Steuern", "Subventionen", "Haushaltspolitik", "Geldpolitik", "Zentralbank",
            "Unternehmen", "Management", "Arbeitsmarkt", "Arbeitslosigkeit", "Fachkräftemangel", "Gewerkschaften",
            "Konsum", "Produktion", "Supply Chain", "Nachhaltige Wirtschaft"
        ],
        vocabExamples: {
            de: [
                "Ein starkes Wirtschaftswachstum ist oft mit steigendem Wohlstand verbunden.",
                "Das Bruttoinlandsprodukt (BIP) misst die gesamte Wirtschaftsleistung eines Landes.",
                "Die Inflation beschreibt den Anstieg des allgemeinen Preisniveaus für Güter und Dienstleistungen.",
                "Deflation ist ein Rückgang der Preise und kann ein Zeichen für eine schwache Wirtschaft sein.",
                "Eine Rezession ist eine Phase des wirtschaftlichen Abschwungs.",
                "Die Konjunktur eines Landes unterliegt ständigen Schwankungen.",
                "Der Finanzmarkt ist ein zentraler Ort für den Handel mit Wertpapieren und Devisen.",
                "Aktien repräsentieren Anteile an einem Unternehmen und können gehandelt werden.",
                "Anleihen sind Schuldverschreibungen, die von Staaten oder Unternehmen ausgegeben werden.",
                "Eine Investition ist die Anlage von Kapital mit der Erwartung zukünftiger Gewinne.",
                "Kapital ist ein wichtiger Faktor für die Produktion von Gütern und Dienstleistungen.",
                "Der Zinssatz beeinflusst die Kosten für Kredite und die Rendite von Spareinlagen.",
                "Devisen sind ausländische Währungen und spielen eine Rolle im internationalen Handel.",
                "Ein hoher Exportüberschuss stärkt die Wirtschaft eines Landes.",
                "Importe sind Waren und Dienstleistungen, die aus dem Ausland bezogen werden.",
                "Die Handelsbilanz zeigt den Unterschied zwischen Exporten und Importen an.",
                "Die Globalisierung der Wirtschaft führt zu einer stärkeren Vernetzung der Weltmärkte.",
                "Steuern sind Abgaben, die Bürger und Unternehmen an den Staat entrichten.",
                "Subventionen sind finanzielle Hilfen des Staates zur Förderung bestimmter Sektoren.",
                "Haushaltspolitik befasst sich mit Einnahmen und Ausgaben des Staates.",
                "Geldpolitik wird von der Zentralbank gesteuert, um die Preisstabilität zu gewährleisten.",
                "Die Europäische Zentralbank ist die Zentralbank der Eurozone.",
                "Ein Unternehmen ist eine wirtschaftliche Einheit zur Herstellung von Gütern oder Dienstleistungen.",
                "Management ist die Führung und Organisation eines Unternehmens.",
                "Der Arbeitsmarkt umfasst alle Arbeitnehmer und Arbeitgeber.",
                "Arbeitslosigkeit ist ein Zustand, in dem arbeitsfähige Personen keine Beschäftigung finden.",
                "Fachkräftemangel kann das Wirtschaftswachstum bremsen.",
                "Gewerkschaften vertreten die Interessen der Arbeitnehmer.",
                "Konsum ist der Verbrauch von Gütern und Dienstleistungen.",
                "Produktion ist die Herstellung von Gütern und Dienstleistungen.",
                "Die Supply Chain umfasst alle Schritte von der Rohstoffgewinnung bis zum Endprodukt.",
                "Eine nachhaltige Wirtschaft berücksichtigt ökologische und soziale Aspekte."
            ],
        },
        grammar: {
            key: "satzbau_nebensatz", // Link to grammarLibraryGerman
            topicEn: "Complex Sentence Structure (Subordinate Clauses)",
            topicDe: "Komplexer Satzbau (Nebensätze)",
            explanationDe: "Im Finanz- und Wirtschaftsbereich ist die präzise Formulierung komplexer Sachverhalte mittels Nebensätzen unerlässlich. Dazu gehören Kausalsätze (da, weil), Konsekutivsätze (sodass), Konditionalsätze (wenn, falls), Finalsätze (damit, um... zu) und Konzessivsätze (obwohl), die oft verwendet werden, um Beziehungen zwischen wirtschaftlichen Faktoren zu erklären. Das Beherrschen dieser Strukturen ermöglicht es, Analysen, Prognosen und Erklärungen mit hoher Genauigkeit zu formulieren.",
            examples: [
                { de: "Da die Zinsen niedrig sind, investieren viele Unternehmen." },
                { de: "Obwohl der Aktienmarkt volatil ist, bleiben viele Anleger optimistisch." },
                { de: "Die Regierung senkt die Steuern, damit die Wirtschaft angekurbelt wird." },
                { de: "Wenn die Nachfrage steigt, erhöhen die Unternehmen die Produktion." },
                { de: "Die Wirtschaft wuchs so stark, dass neue Arbeitsplätze geschaffen wurden." }
            ],
        },
        reading: {
            title: "Globale Wirtschaftstrends und ihre Auswirkungen",
            text: "Die **globale Wirtschaft** ist einem stetigen Wandel unterworfen, der durch **Technologisierung**, **Digitalisierung** und **geopolitische Entwicklungen** maßgeblich beeinflusst wird. Ein zentraler Trend ist die zunehmende **Globalisierung der Wirtschaft**, wodurch Länder und Märkte immer stärker miteinander verflochten sind. Dies führt einerseits zu effizienteren **Supply Chains** und einem breiteren Angebot für Konsumenten, andererseits aber auch zu einer erhöhten Anfälligkeit für externe Schocks, wie die jüngsten **Krisen** gezeigt haben. Die **Inflation** hat in vielen Industrieländern zugenommen, da die **Zentralbanken** auf die wirtschaftlichen Herausforderungen reagieren mussten. Obwohl die **Arbeitslosigkeit** in einigen Sektoren niedrig ist, bleibt der **Fachkräftemangel** eine große Sorge für viele **Unternehmen**, sodass dringend in **Ausbildung** und **Qualifizierung** investiert werden muss. Des Weiteren spielt die **Nachhaltige Wirtschaft** eine immer größere Rolle, da Investoren und Konsumenten zunehmend Wert auf ökologische und soziale Kriterien legen. Die **Haushaltspolitik** der Staaten muss sich diesen Trends anpassen, um Stabilität und **Wachstum** zu gewährleisten, wobei **Subventionen** für zukunftsweisende Technologien und die Anpassung des **Steuersystems** wichtige Instrumente sind. Es wird erwartet, dass die **digitale Transformation** weitere Sektoren revolutionieren wird, indem neue Geschäftsmodelle entstehen und traditionelle Arbeitsweisen sich grundlegend verändern. Wenn diese Herausforderungen nicht proaktiv angegangen werden, könnten langfristige negative **Auswirkungen** auf den **Wohlstand** die Folge sein.",
            task: "Fassen Sie die wichtigsten globalen Wirtschaftstrends zusammen, die im Text genannt werden. Erläutern Sie die Chancen und Risiken der Globalisierung der Wirtschaft. Welche Rolle spielen Inflation, Arbeitslosigkeit und Fachkräftemangel? Identifizieren Sie mindestens fünf Beispiele für komplexe Nebensätze im Text und erklären Sie deren Funktion (z.B. kausal, konsekutiv, konditional, konzessiv).",
        },
        speaking: [
            "Diskutieren Sie die aktuellen Wirtschaftstrends in Deutschland oder der Welt. Welche Auswirkungen haben sie auf den Alltag der Menschen?",
            "Erörtern Sie die Rolle von Zentralbanken in der Steuerung der Geldpolitik. Wie können sie Inflation bekämpfen?",
            "Stellen Sie sich vor, Sie sind ein Unternehmensberater. Welche Strategien würden Sie einem Unternehmen empfehlen, um im aktuellen Wirtschaftsumfeld erfolgreich zu sein?",
            "Sprechen Sie über die Vor- und Nachteile der Globalisierung der Wirtschaft für Entwicklungsländer.",
            "Wie wichtig ist eine nachhaltige Wirtschaft für die Zukunft? Welche Maßnahmen sollten ergriffen werden, um sie zu fördern?"
        ],
        writing: "Verfassen Sie einen Bericht (ca. 200-250 Wörter) für eine Wirtschaftszeitung zum Thema 'Die Herausforderungen des Arbeitsmarktes im digitalen Wandel'. Diskutieren Sie die Auswirkungen der Digitalisierung auf den Arbeitsmarkt, den Fachkräftemangel und die Notwendigkeit der Weiterbildung. Verwenden Sie dabei mindestens fünf komplexe Nebensätze und fünf C1-Vokabeln aus dieser Einheit.",
        quiz: [
            {
                q: "Wenn die **Nachfrage** steigt, ____ die Unternehmen die **Produktion**.",
                choices: ["sinkt", "erhöhen", "stabilisieren", "reduzieren"],
                answer: 1, // Corrected to 1 for "erhöhen"
                explanation: "Im Konjunktiv II Konditionalsatz folgt auf 'wenn' ein Verb in konjugierter Form. Wenn die Nachfrage steigt, erhöhen die Unternehmen die Produktion.",
            },
            {
                q: "Obwohl der **Aktienmarkt** ____ ist, bleiben viele **Anleger** optimistisch.",
                choices: ["stabil", "volatil", "steigend", "sinkend"],
                answer: 1,
                explanation: "'Obwohl' leitet einen Konzessivsatz ein. 'Volatil' (schwankend) passt hier am besten zum Kontrast des Optimismus.",
            },
            {
                q: "Die **Regierung** senkt die **Steuern**, ____ die **Wirtschaft** angekurbelt wird.",
                choices: ["damit", "obwohl", "während", "als"],
                answer: 0,
                explanation: "'Damit' leitet einen Finalsatz ein und drückt den Zweck aus.",
            },
            {
                q: "Das **Bruttoinlandsprodukt (BIP)** misst die gesamte ____ eines Landes.",
                choices: ["Bevölkerung", "Politik", "Wirtschaftsleistung", "Arbeitslosigkeit"],
                answer: 2,
                explanation: "Das BIP ist der wichtigste Indikator für die Wirtschaftsleistung.",
            },
            {
                q: "Die ____ der **Wirtschaft** führt zu einer stärkeren Vernetzung der **Weltmärkte**.",
                choices: ["Regionalisierung", "Lokalisierung", "Globalisierung", "Nationalisierung"],
                answer: 2,
                explanation: "Die Globalisierung beschreibt die zunehmende Vernetzung von Weltmärkten und Volkswirtschaften.",
            }
        ],
    },
];


// Global state management
const state = {
    currentPage: 'home', // 'home', 'unitDetail', 'grammarDetail', 'quiz', 'speaking', 'writing'
    currentUnit: null, // The currently selected unit object
    currentGrammarTopic: null, // The currently selected grammar topic object
    currentQuizUnit: null, // The unit object for the current quiz
    currentQuizIndex: 0,
    quizScore: 0,
    selectedAnswerIndex: null,
    quizFeedback: '',
    audioLoading: false,
    audioPlayer: new Audio(), // HTML Audio element
};

// DOM Elements
const appDiv = document.getElementById('app');
const translationTooltip = document.getElementById('translation-tooltip');


// --- Translation Tooltip ---
let hideTooltipTimer;

function showTranslationTooltip(word, event) {
    clearTimeout(hideTooltipTimer); // Clear any existing timer

    // Simulate translation - in a real app, this would call an API
    // For now, we'll just show the German word and a placeholder.
    const simulatedTranslation = `**${word}**: [English translation placeholder]`; // Bold the German word

    translationTooltip.innerHTML = simulatedTranslation; // Use innerHTML to allow bolding
    
    // Position the tooltip near the cursor but account for its size
    const tooltipWidth = translationTooltip.offsetWidth;
    const tooltipHeight = translationTooltip.offsetHeight;
    
    // Default position: slightly above and to the right of the cursor
    let newLeft = event.clientX + 10;
    let newTop = event.clientY - tooltipHeight - 10;

    // Adjust if it goes off the right edge
    if (newLeft + tooltipWidth > window.innerWidth - 20) { // 20px margin from edge
        newLeft = window.innerWidth - tooltipWidth - 20;
    }
    // Adjust if it goes off the top edge
    if (newTop < 10) { // 10px margin from top
        newTop = event.clientY + 20; // Position below the cursor instead
    }


    translationTooltip.style.left = `${newLeft}px`;
    translationTooltip.style.top = `${newTop}px`;
    translationTooltip.classList.add('show'); // Use 'show' class for opacity and transform
    
    // Hide tooltip after a short delay
    hideTooltipTimer = setTimeout(() => {
        hideTranslationTooltip();
    }, 3000); // 3 seconds
}

function hideTranslationTooltip() {
    translationTooltip.classList.remove('show');
}

// Function to wrap German words for clickability and colorization
function wrapWordsForTranslation(text) {
    // Regex to split by word boundaries, capturing words, spaces, and specific punctuation.
    // This allows for precise wrapping of words while keeping punctuation separate.
    return text.split(/(\b\w+\b|\s|\.\.\.|\(|\)|,|\.|!|\?|;|\:|"|'|„|“|»|«|-)/g).map(part => {
        // Only wrap actual words (contains at least one letter)
        if (/[a-zA-ZäöüÄÖÜß]/.test(part) && part.trim().length > 0) {
            return `<span class="clickable-word" onclick="event.stopPropagation(); showTranslationTooltip('${part}', event)">${part}</span>`;
        }
        return part;
    }).join('');
}


// --- Core Rendering Functions ---

/**
 * Clears the app container and renders the new content.
 * @param {string} viewId - The ID of the div to render inside the app.
 * @param {string} contentHtml - The HTML content to insert.
 */
function renderView(viewId, contentHtml) {
    appDiv.innerHTML = `<div id="${viewId}" class="page-enter-from">${contentHtml}</div>`;
    // Trigger CSS transition
    setTimeout(() => {
        const newView = document.getElementById(viewId);
        if (newView) {
            newView.classList.remove('page-enter-from');
            newView.classList.add('page-enter-to');
        }
    }, 10);
}

/**
 * Renders the home view with all course units.
 */
function renderHome() {
    state.currentPage = 'home';
    state.currentUnit = null;
    state.currentGrammarTopic = null;
    state.currentQuizUnit = null;

    let unitsHtml = courseDataGerman.map(unit => {
        const themeClass = `theme-${unit.theme}`;
        const unitIcon = icons[unit.icon || 'BookOpen']; // Fallback to BookOpen if icon not specified
        return `
            <button class="card unit-card ${themeClass} flex flex-col justify-between items-start text-left cursor-pointer" onclick="showUnitDetail(${unit.id})">
                <div class="icon-container p-3 rounded-lg mb-4">
                    ${unitIcon}
                </div>
                <h3 class="card-title text-violet-800">${unit.title}</h3>
                <p class="card-description text-gray-700">${wrapWordsForTranslation(unit.overview.substring(0, 100) + '...')}</p>
                <span class="mt-4 text-violet-600 font-semibold flex items-center gap-2">
                    Start Lernen ${icons.ChevronRight}
                </span>
            </button>
        `;
    }).join('');

    renderView('home-view', `
        <h1 class="text-4xl font-bold mb-8 text-center text-violet-700">C1 Deutsch Lern-App</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            ${unitsHtml}
        </div>
    `);
}

/**
 * Renders the detail view for a specific unit.
 * @param {number} unitId - The ID of the unit to display.
 */
function showUnitDetail(unitId) {
    const unit = courseDataGerman.find(u => u.id === unitId);
    if (!unit) {
        console.error('Unit not found:', unitId);
        return;
    }
    state.currentPage = 'unitDetail';
    state.currentUnit = unit;

    const themeClass = `text-${colorThemes[unit.theme].text.replace('text-', '')}`;

    // Vocab section
    const vocabListHtml = unit.vocabulary.map((vocab, index) => `
        <li>
            <span class="font-semibold clickable-word" onclick="event.stopPropagation(); showTranslationTooltip('${vocab}', event)">${vocab}</span>
            ${unit.vocabExamples.de[index] ? `<p class="example-sentence">${wrapWordsForTranslation(unit.vocabExamples.de[index])}</p>` : ''}
        </li>
    `).join('');

    // Grammar section (linked to global grammar library)
    const linkedGrammar = grammarLibraryGerman.find(g => g.key === unit.grammar.key);
    const grammarHtml = linkedGrammar ? `
        <button class="btn btn-secondary btn-icon mt-4" onclick="showGrammarDetail('${linkedGrammar.key}')">
            ${icons.BookOpen} Detaillierte Grammatik: ${linkedGrammar.topicDe}
        </button>
    ` : `
        <p class="text-gray-700">${wrapWordsForTranslation('Grammatik: ' + unit.grammar.topicDe)}</p>
        <p class="text-gray-600 italic mt-2">${wrapWordsForTranslation(unit.grammar.explanationDe)}</p>
        <ul class="mt-4 list-disc list-inside text-gray-800">
            ${unit.grammar.examples.map(ex => `<li>${wrapWordsForTranslation(ex.de)}</li>`).join('')}
        </ul>
    `;

    // Speaking section
    const speakingHtml = unit.speaking.map((prompt, index) => `
        <li class="speaking-prompt flex justify-between items-center bg-gray-100 p-3 rounded-lg mb-2 cursor-pointer transition-colors"
            onclick="speakText('${prompt}', 'Kore')">
            <span>${wrapWordsForTranslation(prompt)}</span>
            ${icons.Mic}
            <span id="audio-loading-${unit.id}-${index}" class="hidden-visually spinner"></span>
        </li>
    `).join('');


    renderView('unit-detail-view', `
        <button class="btn btn-secondary btn-icon mb-6 self-start" onclick="renderHome()">
            ${icons.ChevronLeft} Zurück zu den Einheiten
        </button>
        <h2 class="text-3xl font-bold mb-6 text-center ${themeClass}">${unit.title}</h2>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 ${themeClass}">
                ${icons.BookOpen} Überblick
            </h3>
            <p class="text-gray-700">${wrapWordsForTranslation(unit.overview)}</p>
        </section>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 ${themeClass}">
                ${icons.Languages} Wortschatz
            </h3>
            <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${vocabListHtml}
            </ul>
        </section>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 ${themeClass}">
                ${icons.Sparkles} Grammatik: ${unit.grammar.topicDe}
            </h3>
            ${grammarHtml}
        </section>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 ${themeClass}">
                ${icons.FileText} Leseverständnis
            </h3>
            <h4 class="font-semibold text-lg mb-2">${wrapWordsForTranslation(unit.reading.title)}</h4>
            <p class="text-gray-700">${wrapWordsForTranslation(unit.reading.text)}</p>
            <p class="mt-4 font-semibold text-gray-800">Aufgabe:</p>
            <p class="text-gray-700">${wrapWordsForTranslation(unit.reading.task)}</p>
        </section>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 ${themeClass}">
                ${icons.Mic} Sprechen
            </h3>
            <ul class="text-gray-700">
                ${speakingHtml}
            </ul>
            <div id="audio-player-message" class="audio-player-container hidden-visually">
                <span id="audio-status-message"></span>
                <button id="audio-play-button" class="btn btn-sm hidden-visually">${icons.Play} Abspielen</button>
                <button id="audio-stop-button" class="btn btn-sm hidden-visually">${icons.StopCircle} Stoppen</button>
            </div>
        </section>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 ${themeClass}">
                ${icons.Pencil} Schreiben
            </h3>
            <p class="text-gray-700">${wrapWordsForTranslation(unit.writing)}</p>
            <textarea class="w-full p-4 mt-4 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all" rows="8" placeholder="Schreiben Sie hier Ihren Text..."></textarea>
        </section>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto flex justify-center">
            <button class="btn btn-icon ${colorThemes[unit.theme].bg.replace('bg-', 'bg-')} ${colorThemes[unit.theme].text}"
                    onclick="startQuiz(${unit.id})">
                ${icons.ListChecks} Starte Quiz für diese Einheit
            </button>
        </section>
    `);
}

/**
 * Renders the detailed explanation of a grammar topic.
 * @param {string} grammarKey - The key of the grammar topic.
 */
function showGrammarDetail(grammarKey) {
    const grammarTopic = grammarLibraryGerman.find(g => g.key === grammarKey);
    if (!grammarTopic) {
        console.error('Grammar topic not found:', grammarKey);
        return;
    }
    state.currentPage = 'grammarDetail';
    state.currentGrammarTopic = grammarTopic;

    const examplesHtml = grammarTopic.examples.map(ex => `<li>${wrapWordsForTranslation(ex.de)}</li>`).join('');

    renderView('grammar-detail-view', `
        <button class="btn btn-secondary btn-icon mb-6 self-start" onclick="state.currentUnit ? showUnitDetail(state.currentUnit.id) : renderHome()">
            ${icons.ChevronLeft} Zurück
        </button>
        <h2 class="text-3xl font-bold mb-6 text-center text-violet-700">Grammatik: ${wrapWordsForTranslation(grammarTopic.topicDe)}</h2>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 text-violet-700">
                ${icons.BookOpen} Erklärung
            </h3>
            <p class="text-gray-700">${wrapWordsForTranslation(grammarTopic.explanationDe)}</p>
        </section>

        <section class="mb-10 p-6 bg-white rounded-xl shadow-md w-full max-w-4xl mx-auto">
            <h3 class="flex items-center gap-3 mb-5 text-violet-700">
                ${icons.CheckCircle2} Beispiele
            </h3>
            <ul class="list-disc list-inside text-gray-700">
                ${examplesHtml}
            </ul>
        </section>
    `);
}

/**
 * Starts the quiz for a given unit.
 * @param {number} unitId - The ID of the unit for which to start the quiz.
 */
function startQuiz(unitId) {
    const unit = courseDataGerman.find(u => u.id === unitId);
    if (!unit || !unit.quiz || unit.quiz.length === 0) {
        console.error('Quiz not found or empty for unit:', unitId);
        return;
    }
    state.currentPage = 'quiz';
    state.currentQuizUnit = unit;
    state.currentQuizIndex = 0;
    state.quizScore = 0;
    state.selectedAnswerIndex = null;
    state.quizFeedback = '';
    renderQuizQuestion();
}

/**
 * Renders the current quiz question.
 */
function renderQuizQuestion() {
    const unit = state.currentQuizUnit;
    const currentQuestion = unit.quiz[state.currentQuizIndex];
    if (!currentQuestion) {
        renderQuizResults();
        return;
    }

    const themeClass = `text-${colorThemes[unit.theme].text.replace('text-', '')}`;

    const choicesHtml = currentQuestion.choices.map((choice, index) => `
        <button class="quiz-option p-4 rounded-lg mb-3 border text-left transition-colors cursor-pointer
            ${state.selectedAnswerIndex === index ? (index === currentQuestion.answer ? 'correct selected' : 'incorrect selected') : ''}"
            data-index="${index}"
            onclick="selectQuizAnswer(${index})">
            ${wrapWordsForTranslation(choice)}
        </button>
    `).join('');

    renderView('quiz-view', `
        <button class="btn btn-secondary btn-icon mb-6 self-start" onclick="showUnitDetail(${unit.id})">
            ${icons.ChevronLeft} Zurück zur Einheit
        </button>
        <h2 class="text-3xl font-bold mb-6 text-center ${themeClass}">Quiz: ${wrapWordsForTranslation(unit.title)}</h2>
        <div class="card w-full max-w-2xl mx-auto">
            <p class="text-lg font-semibold mb-4">Frage ${state.currentQuizIndex + 1} von ${unit.quiz.length}:</p>
            <p class="text-xl font-bold mb-6">${wrapWordsForTranslation(currentQuestion.q)}</p>
            <div class="quiz-options flex flex-col gap-2">
                ${choicesHtml}
            </div>
            <div id="quiz-feedback-container" class="mt-4">
                ${state.quizFeedback ? `<div class="quiz-feedback">${state.quizFeedback}</div>` : ''}
            </div>
            <div class="flex justify-end mt-6 gap-4">
                <button class="btn btn-secondary" onclick="skipQuizQuestion()">
                    ${state.currentQuizIndex < unit.quiz.length - 1 ? 'Frage überspringen' : 'Quiz beenden'}
                </button>
                <button class="btn" onclick="submitQuizAnswer()" id="submit-quiz-btn"
                        ${state.selectedAnswerIndex === null ? 'disabled' : ''}>
                    Antwort prüfen
                </button>
            </div>
        </div>
    `);
    updateSubmitButtonState();
}

/**
 * Updates the state of the submit button.
 */
function updateSubmitButtonState() {
    const submitBtn = document.getElementById('submit-quiz-btn');
    if (submitBtn) {
        submitBtn.disabled = state.selectedAnswerIndex === null;
    }
}

/**
 * Selects an answer for the current quiz question.
 * @param {number} index - The index of the selected answer.
 */
function selectQuizAnswer(index) {
    state.selectedAnswerIndex = index;
    state.quizFeedback = ''; // Clear feedback on new selection
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((btn, i) => {
        btn.classList.remove('selected', 'correct', 'incorrect');
        if (i === index) {
            btn.classList.add('selected');
        }
    });
    updateSubmitButtonState();
}

/**
 * Submits the selected answer and provides feedback.
 */
function submitQuizAnswer() {
    const unit = state.currentQuizUnit;
    const currentQuestion = unit.quiz[state.currentQuizIndex];
    const feedbackContainer = document.getElementById('quiz-feedback-container');

    if (state.selectedAnswerIndex === null) {
        feedbackContainer.innerHTML = '<div class="quiz-feedback text-rose-800 bg-rose-50 border-rose-200">Bitte wählen Sie eine Antwort aus.</div>';
        return;
    }

    const options = document.querySelectorAll('.quiz-option');
    options.forEach(btn => btn.disabled = true); // Disable all options after submission

    if (state.selectedAnswerIndex === currentQuestion.answer) {
        state.quizScore++;
        state.quizFeedback = `<div class="quiz-feedback correct bg-emerald-100 border-emerald-500 text-emerald-800">Richtig! ${icons.CheckCircle2}</div>`;
    } else {
        state.quizFeedback = `<div class="quiz-feedback incorrect bg-rose-100 border-rose-500 text-rose-800">Falsch. Die richtige Antwort wäre: "${wrapWordsForTranslation(currentQuestion.choices[currentQuestion.answer])}". ${wrapWordsForTranslation(currentQuestion.explanation)}</div>`;
    }

    // Apply classes for visual feedback
    options.forEach((btn, i) => {
        if (i === currentQuestion.answer) {
            btn.classList.add('correct');
        } else if (i === state.selectedAnswerIndex) {
            btn.classList.add('incorrect');
        }
    });

    feedbackContainer.innerHTML = state.quizFeedback;

    // Change submit button to "Next Question" or "Show Results"
    const submitBtn = document.getElementById('submit-quiz-btn');
    submitBtn.textContent = state.currentQuizIndex < unit.quiz.length - 1 ? 'Nächste Frage' : 'Quiz beenden';
    submitBtn.onclick = () => {
        state.selectedAnswerIndex = null; // Reset selection for next question
        state.quizFeedback = ''; // Clear feedback for next question
        if (state.currentQuizIndex < unit.quiz.length - 1) {
            state.currentQuizIndex++;
            renderQuizQuestion();
        } else {
            renderQuizResults();
        }
    };
    submitBtn.disabled = false; // Enable for next action
    submitBtn.classList.remove('btn');
    submitBtn.classList.add('btn', 'bg-violet-600', 'text-white'); // Reset style to default for next action
}


/**
 * Skips the current quiz question and moves to the next or finishes the quiz.
 */
function skipQuizQuestion() {
    if (state.currentQuizIndex < state.currentQuizUnit.quiz.length - 1) {
        state.currentQuizIndex++;
        state.selectedAnswerIndex = null;
        state.quizFeedback = '';
        renderQuizQuestion();
    } else {
        renderQuizResults();
    }
}

/**
 * Renders the quiz results.
 */
function renderQuizResults() {
    const unit = state.currentQuizUnit;
    const themeClass = `text-${colorThemes[unit.theme].text.replace('text-', '')}`;

    renderView('quiz-results-view', `
        <button class="btn btn-secondary btn-icon mb-6 self-start" onclick="showUnitDetail(${unit.id})">
            ${icons.ChevronLeft} Zurück zur Einheit
        </button>
        <h2 class="text-3xl font-bold mb-6 text-center ${themeClass}">Quiz Ergebnisse für ${unit.title}</h2>
        <div class="card w-full max-w-2xl mx-auto text-center">
            <p class="text-2xl font-bold mb-4">Dein Ergebnis:</p>
            <p class="text-5xl font-extrabold ${state.quizScore / unit.quiz.length > 0.7 ? 'text-emerald-600' : 'text-rose-600'} mb-6">
                ${state.quizScore} / ${unit.quiz.length}
            </p>
            <p class="text-lg text-gray-700 mb-8">
                ${state.quizScore / unit.quiz.length > 0.7
                    ? 'Super gemacht! Du hast die meisten Fragen richtig beantwortet.'
                    : 'Bleib dran! Mit etwas mehr Übung wirst du dich verbessern.'}
            </p>
            <div class="flex flex-col sm:flex-row justify-center gap-4">
                <button class="btn btn-secondary btn-icon" onclick="startQuiz(${unit.id})">
                    ${icons.ListChecks} Quiz wiederholen
                </button>
                <button class="btn btn-icon bg-violet-600 text-white hover:bg-violet-700" onclick="renderHome()">
                    ${icons.ChevronLeft} Zurück zur Startseite
                </button>
            </div>
        </div>
    `);
}

// --- Text-to-Speech (TTS) Functionality ---
let currentAudioBlob = null;
let currentAudioElement = null;

async function speakText(text, voiceName = "Kore") {
    const audioPlayerMessage = document.getElementById('audio-player-message');
    const audioStatusMessage = document.getElementById('audio-status-message');
    const playButton = document.getElementById('audio-play-button');
    const stopButton = document.getElementById('audio-stop-button');
    // Identify the specific spinner for the clicked speaking prompt
    const spinnerId = `audio-loading-${state.currentUnit.id}-${Array.from(state.currentUnit.speaking).findIndex(p => wrapWordsForTranslation(p) === wrapWordsForTranslation(text))}`;
    const spinner = document.getElementById(spinnerId);


    if (state.audioLoading) {
        console.warn('Audio is already loading. Please wait.');
        return;
    }

    state.audioLoading = true;
    audioPlayerMessage.classList.remove('hidden-visually');
    audioPlayerMessage.classList.add('flex');
    audioStatusMessage.innerHTML = `<span class="spinner mr-2"></span> Audio wird generiert...`;
    playButton.classList.add('hidden-visually');
    stopButton.classList.add('hidden-visually');
    if (spinner) {
        spinner.classList.remove('hidden-visually');
    }

    let retries = 0;
    const maxRetries = 5;
    const initialDelay = 1000; // 1 second

    const payload = {
        contents: [{
            parts: [{ text: text }]
        }],
        generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: voiceName }
                }
            }
        },
        model: "gemini-2.5-flash-preview-tts"
    };

    const apiKey = ""; // Canvas will provide this at runtime
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

    while (retries < maxRetries) {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                if (response.status === 429) { // Too Many Requests
                    const delay = initialDelay * Math.pow(2, retries);
                    retries++;
                    await new Promise(res => setTimeout(res, delay));
                    continue; // Retry the request
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            const part = result?.candidates?.[0]?.content?.parts?.[0];
            const audioData = part?.inlineData?.data;
            const mimeType = part?.inlineData?.mimeType;

            if (audioData && mimeType && mimeType.startsWith("audio/")) {
                const match = mimeType.match(/rate=(\d+)/);
                const sampleRate = match ? parseInt(match[1], 10) : 16000; // Default to 16000 if not found

                const pcmBuffer = base64ToArrayBuffer(audioData);
                const pcm16 = new Int16Array(pcmBuffer);
                const wavBlob = pcmToWav(pcm16, sampleRate);
                currentAudioBlob = URL.createObjectURL(wavBlob);

                if (currentAudioElement) {
                    currentAudioElement.pause();
                    currentAudioElement.removeAttribute('src');
                    currentAudioElement.load();
                }
                currentAudioElement = new Audio(currentAudioBlob);
                currentAudioElement.play();

                currentAudioElement.onended = () => {
                    audioStatusMessage.textContent = 'Wiedergabe beendet.';
                    playButton.innerHTML = icons.Play + ' Abspielen';
                    playButton.onclick = () => { currentAudioElement.play(); };
                    playButton.classList.remove('hidden-visually');
                    stopButton.classList.add('hidden-visually');
                };

                audioStatusMessage.textContent = 'Audio wird abgespielt...';
                playButton.classList.add('hidden-visually');
                stopButton.innerHTML = icons.StopCircle + ' Stoppen'; // Changed to StopCircle icon
                stopButton.onclick = () => { currentAudioElement.pause(); audioStatusMessage.textContent = 'Wiedergabe pausiert.'; playButton.classList.remove('hidden-visually'); stopButton.classList.add('hidden-visually');}; // Simple pause
                stopButton.classList.remove('hidden-visually');

            } else {
                audioStatusMessage.textContent = 'Fehler: Audio-Daten nicht gefunden.';
                console.error('API response structure unexpected or audio data missing:', result);
            }
            break; // Exit retry loop on success

        } catch (error) {
            audioStatusMessage.textContent = `Fehler beim Abrufen des Audios: ${error.message}`;
            console.error('Error fetching TTS audio:', error);
            const delay = initialDelay * Math.pow(2, retries);
            retries++;
            if (retries < maxRetries) {
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }

    if (retries === maxRetries) {
        audioStatusMessage.textContent = 'Fehler: Maximale Wiederholungsversuche erreicht.';
    }

    state.audioLoading = false;
    if (spinner) {
        spinner.classList.add('hidden-visually');
    }
}

// Global functions for audio control
window.playCurrentAudio = () => {
    if (currentAudioElement && currentAudioBlob) {
        currentAudioElement.play();
        document.getElementById('audio-status-message').textContent = 'Audio wird abgespielt...';
        document.getElementById('audio-play-button').classList.add('hidden-visually');
        document.getElementById('audio-stop-button').classList.remove('hidden-visually');
    }
};

window.stopCurrentAudio = () => {
    if (currentAudioElement) {
        currentAudioElement.pause();
        document.getElementById('audio-status-message').textContent = 'Wiedergabe pausiert.';
        document.getElementById('audio-play-button').classList.remove('hidden-visually');
        document.getElementById('audio-stop-button').classList.add('hidden-visually');
    }
};


// Expose functions to the global scope for onclick attributes
window.renderHome = renderHome;
window.showUnitDetail = showUnitDetail;
window.showGrammarDetail = showGrammarDetail;
window.startQuiz = startQuiz;
window.selectQuizAnswer = selectQuizAnswer;
window.submitQuizAnswer = submitQuizAnswer;
window.skipQuizQuestion = skipQuizQuestion;
window.speakText = speakText;
window.showTranslationTooltip = showTranslationTooltip; // Expose for onclick
window.hideTranslationTooltip = hideTranslationTooltip; // Expose for general mouseleave handling (optional)


// Initialize the app on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    // Add event listener to the document to hide the tooltip when clicking anywhere else
    document.addEventListener('click', (event) => {
        // Check if the click was outside the tooltip and not on a clickable word
        if (!translationTooltip.contains(event.target) && !event.target.classList.contains('clickable-word')) {
            clearTimeout(hideTooltipTimer);
            hideTranslationTooltip();
        }
    });
});
