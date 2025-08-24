// script.js
// Lesson data for B1 level
const lessons = [
    {
        id: 1,
        title: "Lesson 1: Work and Profession",
        content: `
            <h3>Discussing Careers and Employment</h3>
            <p>At B1 level, you should be able to talk about your profession, career aspirations, and work environment in some detail.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Berufsfelder</strong> - Professional fields</p>
            <p><strong>Bewerbungsprozess</strong> - Application process</p>
            <p><strong>Arbeitsbedingungen</strong> - Working conditions</p>
            <p><strong>Karriereentwicklung</strong> - Career development</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Präpositionen mit dem Dativ und Akkusativ</strong> - Prepositions with dative and accusative</p>
            <p><strong>Nebensätze mit "weil" und "dass"</strong> - Subordinate clauses with "because" and "that"</p>
            
            <h3>Cultural Note</h3>
            <p>In Germany, it's common to have an extensive interview process, often including multiple rounds and sometimes practical assignments. The work culture values punctuality, efficiency, and direct communication.</p>
        `,
        vocabulary: [
            { german: "der Beruf", english: "profession" },
            { german: "die Karriere", english: "career" },
            { german: "die Bewerbung", english: "application" },
            { german: "der Lebenslauf", english: "CV/resume" },
            { german: "das Vorstellungsgespräch", english: "job interview" },
            { german: "die Gehaltsvorstellung", english: "salary expectation" },
            { german: "die Arbeitserfahrung", english: "work experience" },
            { german: "die Qualifikation", english: "qualification" },
            { german: "die Beförderung", english: "promotion" },
            { german: "kündigen", english: "to quit a job" }
        ],
        sentences: [
            { german: "Ich habe mich bei mehreren Unternehmen beworben.", english: "I have applied to several companies." },
            { german: "Mein Beruf erfordert viel Geduld und Kommunikationsfähigkeit.", english: "My profession requires a lot of patience and communication skills." },
            { german: "Nächste Woche habe ich ein Vorstellungsgespräch bei einer Marketingfirma.", english: "Next week I have a job interview at a marketing firm." },
            { german: "Ich habe vor, in den nächsten Jahren beruflich weiterzukommen.", english: "I plan to advance professionally in the coming years." },
            { german: "Weil ich zusätzliche Qualifikationen erworben habe, erhoffe ich mir eine Gehaltserhöhung.", english: "Because I've acquired additional qualifications, I'm hoping for a salary increase." }
        ]
    },
    {
        id: 2,
        title: "Lesson 2: Health and Fitness",
        content: `
            <h3>Discussing Health and Lifestyle</h3>
            <p>At B1 level, you should be able to describe health issues, discuss healthy lifestyles, and understand medical advice.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Körperliche Gesundheit</strong> - Physical health</p>
            <p><strong>Psychisches Wohlbefinden</strong> - Mental wellbeing</p>
            <p><strong>Ernährungsgewohnheiten</strong> - Dietary habits</p>
            <p><strong>Sportliche Aktivitäten</strong> - Sports activities</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Imperativ</strong> - Imperative mood</p>
            <p><strong>Adjektivdeklination</strong> - Adjective declension</p>
            
            <h3>Cultural Note</h3>
            <p>Germans generally place high importance on health and prevention. The country has an excellent healthcare system, and many people regularly participate in sports activities. "Vereine" (clubs) are popular for organizing sports and other recreational activities.</p>
        `,
        vocabulary: [
            { german: "die Gesundheit", english: "health" },
            { german: "die Krankenversicherung", english: "health insurance" },
            { german: "der Arzttermin", english: "doctor's appointment" },
            { german: "die Symptome", english: "symptoms" },
            { german: "die Behandlung", english: "treatment" },
            { german: "die Ernährung", english: "nutrition" },
            { german: "die Fitness", english: "fitness" },
            { german: "das Wohlbefinden", english: "wellbeing" },
            { german: "vorbeugen", english: "to prevent" },
            { german: "sich erholen", english: "to recover" }
        ],
        sentences: [
            { german: "Seit ich regelmäßig Sport treibe, fühle ich mich viel besser.", english: "Since I exercise regularly, I feel much better." },
            { german: "Der Arzt riet mir, mehr auf meine Ernährung zu achten.", english: "The doctor advised me to pay more attention to my diet." },
            { german: "Bei starken Schmerzen sollten Sie sofort einen Arzt aufsuchen.", english: "If you have severe pain, you should see a doctor immediately." },
            { german: "Ich achte auf ausreichend Schlaf, um mein Immunsystem zu stärken.", english: "I make sure to get enough sleep to strengthen my immune system." },
            { german: "Viele Menschen meditieren, um ihr psychisches Wohlbefinden zu verbessern.", english: "Many people meditate to improve their mental wellbeing." }
        ]
    },
    {
        id: 3,
        title: "Lesson 3: Environmental Issues",
        content: `
            <h3>Discussing Ecology and Sustainability</h3>
            <p>At B1 level, you should be able to participate in discussions about environmental protection, climate change, and sustainable practices.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Klimawandel</strong> - Climate change</p>
            <p><strong>Nachhaltigkeit</strong> - Sustainability</p>
            <p><strong>Umweltschutz</strong> - Environmental protection</p>
            <p><strong>Energiequellen</strong> - Energy sources</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Passiv</strong> - Passive voice</p>
            <p><strong>Indirekte Rede</strong> - Indirect speech</p>
            
            <h3>Cultural Note</h3>
            <p>Germany is a world leader in environmental protection and renewable energy. The "Energiewende" (energy transition) is a significant national policy aimed at phasing out nuclear power and fossil fuels. Recycling is taken very seriously, with a complex but efficient waste separation system.</p>
        `,
        vocabulary: [
            { german: "die Umwelt", english: "environment" },
            { german: "der Klimawandel", english: "climate change" },
            { german: "die Nachhaltigkeit", english: "sustainability" },
            { german: "die erneuerbaren Energien", english: "renewable energy" },
            { german: "die CO2-Emissionen", english: "CO2 emissions" },
            { german: "der Umweltschutz", english: "environmental protection" },
            { german: "die Mülltrennung", english: "waste separation" },
            { german: "der ökologische Fußabdruck", english: "ecological footprint" },
            { german: "recyceln", english: "to recycle" },
            { german: "umweltfreundlich", english: "environmentally friendly" }
        ],
        sentences: [
            { german: "Der Klimawandel ist eine der größten Herausforderungen unserer Zeit.", english: "Climate change is one of the biggest challenges of our time." },
            { german: "Viele Länder investieren in erneuerbare Energien, um CO2-Emissionen zu reduzieren.", english: "Many countries are investing in renewable energy to reduce CO2 emissions." },
            { german: "Es wird erwartet, dass die Temperaturen in den nächsten Jahrzehnten weiter steigen werden.", english: "It is expected that temperatures will continue to rise in the coming decades." },
            { german: "Durch Mülltrennung können wertvolle Ressourcen wiederverwendet werden.", english: "Valuable resources can be reused through waste separation." },
            { german: "Man sollte umweltfreundliche Verkehrsmittel wie Fahrräder oder öffentliche Verkehrsmittel nutzen.", english: "One should use environmentally friendly means of transportation like bicycles or public transport." }
        ]
    },
    {
        id: 4,
        title: "Lesson 4: Travel and Tourism",
        content: `
            <h3>Discussing Travel Experiences</h3>
            <p>At B1 level, you should be able to describe travel experiences, make travel arrangements, and handle situations while traveling.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Reisevorbereitungen</strong> - Travel preparations</p>
            <p><strong>Unterkünfte</strong> - Accommodations</p>
            <p><strong>Kulturelle Erfahrungen</strong> - Cultural experiences</p>
            <p><strong>Probleme beim Reisen</strong> - Travel problems</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Perfekt und Präteritum</strong> - Perfect and simple past tenses</p>
            <p><strong>Wechselpräpositionen</strong> - Two-way prepositions</p>
            
            <h3>Cultural Note</h3>
            <p>Germans are known for being avid travelers, with an average of over 30 days of paid vacation per year. They often prioritize cultural experiences and outdoor activities when traveling. Germany itself is a popular tourist destination, known for its castles, Christmas markets, and diverse landscapes from the Alps to the Baltic Sea.</p>
        `,
        vocabulary: [
            { german: "die Reise", english: "trip" },
            { german: "der Urlaub", english: "vacation" },
            { german: "die Unterkunft", english: "accommodation" },
            { german: "das Reiseziel", english: "destination" },
            { german: "die Sehenswürdigkeit", english: "sight/attraction" },
            { german: "die Buchung", english: "booking" },
            { german: "der Koffer", english: "suitcase" },
            { german: "der Reisepass", english: "passport" },
            { german: "die Verpflegung", english: "catering/food provisions" },
            { german: "die Gepäckaufgabe", english: "baggage drop" }
        ],
        sentences: [
            { german: "Letztes Jahr habe ich eine Rundreise durch Asien gemacht.", english: "Last year I took a tour through Asia." },
            { german: "Wir haben ein Hotelzimmer mit Meerblick gebucht.", english: "We booked a hotel room with a sea view." },
            { german: "Während meines Aufenthalts in Berlin habe ich viele Museen besucht.", english: "During my stay in Berlin, I visited many museums." },
            { german: "Wenn man früh bucht, kann man oft günstigere Flüge finden.", english: "If you book early, you can often find cheaper flights." },
            { german: "Wir sind mit dem Zug gereist, weil das umweltfreundlicher ist.", english: "We traveled by train because it's more environmentally friendly." }
        ]
    },
    {
        id: 5,
        title: "Lesson 5: Education System",
        content: `
            <h3>Discussing Learning and Studies</h3>
            <p>At B1 level, you should be able to talk about educational systems, describe your learning experiences, and discuss academic topics.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Bildungssysteme</strong> - Education systems</p>
            <p><strong>Schulische Ausbildung</strong> - School education</p>
            <p><strong>Hochschulbildung</strong> - Higher education</p>
            <p><strong>Weiterbildung</strong> - Continuing education</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Nebensätze mit "obwohl" und "trotzdem"</strong> - Subordinate clauses with "although" and "nevertheless"</p>
            <p><strong>Komparativ und Superlativ</strong> - Comparative and superlative</p>
            
            <h3>Cultural Note</h3>
            <p>Germany's education system is decentralized, with each state (Bundesland) setting its own policies. After primary school, students are typically divided into different school types based on academic ability. University education is mostly tuition-free, even for international students, making Germany a popular study destination.</p>
        `,
        vocabulary: [
            { german: "die Ausbildung", english: "training/education" },
            { german: "das Studium", english: "university studies" },
            { german: "der Bildungsweg", english: "educational path" },
            { german: "der Abschluss", english: "degree/qualification" },
            { german: "die Grundschule", english: "elementary school" },
            { german: "die weiterführende Schule", english: "secondary school" },
            { german: "die Universität", english: "university" },
            { german: "der Lehrplan", english: "curriculum" },
            { german: "die Prüfung", english: "exam" },
            { german: "der Notendurchschnitt", english: "grade average" }
        ],
        sentences: [
            { german: "In Deutschland beginnt die Schulpflicht mit sechs Jahren.", english: "In Germany, compulsory education begins at age six." },
            { german: "Nach der Grundschule wechseln die Schüler auf verschiedene Schulformen.", english: "After elementary school, students transfer to different types of schools." },
            { german: "Obwohl das Studium in Deutschland meist kostenlos ist, müssen Studenten ihren Lebensunterhalt finanzieren.", english: "Although studying in Germany is mostly free, students have to finance their living expenses." },
            { german: "Viele Berufe erforden eine duale Ausbildung, die theoretisches und praktisches Lernen kombiniert.", english: "Many professions require a dual education that combines theoretical and practical learning." },
            { german: "Lebenslanges Lernen wird in der heutigen Arbeitswelt immer wichtiger.", english: "Lifelong learning is becoming increasingly important in today's working world." }
        ]
    },
    {
        id: 6,
        title: "Lesson 6: Media and Communication",
        content: `
            <h3>Discussing Media and Technology</h3>
            <p>At B1 level, you should be able to talk about different media forms, express opinions about content, and discuss communication technologies.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Medienlandschaft</strong> - Media landscape</p>
            <p><strong>Nachrichtenquellen</strong> - News sources</p>
            <p><strong>Soziale Medien</strong> - Social media</p>
            <p><strong>Digitale Kommunikation</strong> - Digital communication</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Indirekte Fragen</strong> - Indirect questions</p>
            <p><strong>Konjunktiv II</strong> - Subjunctive II</p>
            
            <h3>Cultural Note</h3>
            <p>Germany has a diverse media landscape with strong public broadcasting services (ARD, ZDF) alongside private networks. Print media remains popular, with many Germans still reading newspapers regularly. Germany has strict data protection laws, reflecting the population's general concern about privacy in the digital age.</p>
        `,
        vocabulary: [
            { german: "die Medien", english: "media" },
            { german: "die Nachrichten", english: "news" },
            { german: "die Zeitung", english: "newspaper" },
            { german: "der Journalist", english: "journalist" },
            { german: "die Berichterstattung", english: "reporting" },
            { german: "soziale Netzwerke", english: "social networks" },
            { german: "digitale Kommunikation", english: "digital communication" },
            { german: "der Informationsfluss", english: "flow of information" },
            { german: "verbreiten", english: "to spread/distribute" },
            { german: "kommentieren", english: "to comment" }
        ],
        sentences: [
            { german: "Viele Menschen informieren sich heutzutage über soziale Medien über aktuelle Ereignisse.", english: "Many people nowadays learn about current events through social media." },
            { german: "Qualitätsjournalismus sollte unabhängig und objektiv sein.", english: "Quality journalism should be independent and objective." },
            { german: "Ich würde dir raten, Nachrichten aus verschiedenen Quellen zu vergleichen.", english: "I would advise you to compare news from different sources." },
            { german: "Durch das Internet hat sich die Geschwindigkeit der Informationsverbreitung stark erhöht.", english: "The speed of information dissemination has increased greatly through the internet." },
            { german: "Man sollte kritisch hinterfragen, what man in den Medien liest oder sieht.", english: "One should critically question what one reads or sees in the media." }
        ]
    },
    {
        id: 7,
        title: "Lesson 7: Housing and Living",
        content: `
            <h3>Discussing Homes and Living Situations</h3>
            <p>At B1 level, you should be able to describe different types of housing, discuss living arrangements, and talk about household tasks.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Wohnungssuche</strong> - Apartment hunting</p>
            <p><strong>Mietverhältnis</strong> - Rental agreement</p>
            <p><strong>Wohnungseinrichtung</strong> - Apartment furnishing</p>
            <p><strong>Nachbarschaft</strong> - Neighborhood</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Präpositionaladverbien (damit, dafür, etc.)</strong> - Prepositional adverbs</p>
            <p><strong>Relativsätze</strong> - Relative clauses</p>
            
            <h3>Cultural Note</h3>
            <p>In Germany, renting is more common than in many other countries, with over half the population living in rented accommodation. Rental contracts often offer strong tenant protections. It's common to rent apartments without kitchens, light fixtures, or sometimes even flooring - these are typically brought by tenants when they move in.</p>
        `,
        vocabulary: [
            { german: "die Wohnung", english: "apartment" },
            { german: "das Haus", english: "house" },
            { german: "die Miete", english: "rent" },
            { german: "der Vermieter", english: "landlord" },
            { german: "der Mieter", english: "tenant" },
            { german: "der Mietvertrag", english: "lease agreement" },
            { german: "die Kaution", english: "security deposit" },
            { german: "die Nachbarschaft", english: "neighborhood" },
            { german: "die Haushaltsarbeit", english: "housework" },
            { german: "umziehen", english: "to move" }
        ],
        sentences: [
            { german: "In Großstädten ist die Wohnungssuche oft schwierig und teuer.", english: "In big cities, apartment hunting is often difficult and expensive." },
            { german: "Bevor man einen Mietvertrag unterschreibt, sollte man alle Klauseln genau lesen.", english: "Before signing a lease agreement, one should read all clauses carefully." },
            { german: "Die Wohnung, die ich mir angesehen habe, hatte einen großen Balkon mit Südausrichtung.", english: "The apartment I viewed had a large balcony facing south." },
            { german: "Ich ziehe nächsten Monat um, deshalb muss ich viele Kartons packen.", english: "I'm moving next month, so I have to pack many boxes." },
            { german: "In meiner Nachbarschaft gibt es viele Familien mit Kindern, deshalb ist es manchmal laut.", english: "In my neighborhood there are many families with children, so it's sometimes noisy." }
        ]
    },
    {
        id: 8,
        title: "Lesson 8: Cultural Life",
        content: `
            <h3>Discussing Arts and Culture</h3>
            <p>At B1 level, you should be able to talk about cultural events, express preferences in arts, and discuss cultural differences.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Kunstformen</strong> - Art forms</p>
            <p><strong>Musik und Theater</strong> - Music and theater</p>
            <p><strong>Literatur</strong> - Literature</p>
            <p><strong>Kulturelle Veranstaltungen</strong> - Cultural events</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Adverbiale Bestimmungen</strong> - Adverbial clauses</p>
            <p><strong>Partizipien als Adjektive</strong> - Participles as adjectives</p>
            
            <h3>Cultural Note</h3>
            <p>Germany has a rich cultural life with strong public support for the arts. There are over 130 professional theater companies and approximately 700 musical theaters and orchestras. Many cities have their own opera houses and philharmonic orchestras. The country also hosts numerous world-class museums, particularly in Berlin, Munich, and Cologne.</p>
        `,
        vocabulary: [
            { german: "die Kultur", english: "culture" },
            { german: "die Kunst", english: "art" },
            { german: "das Museum", english: "museum" },
            { german: "die Ausstellung", english: "exhibition" },
            { german: "die Veranstaltung", english: "event" },
            { german: "die Galerie", english: "gallery" },
            { german: "das Konzert", english: "concert" },
            { german: "die Aufführung", english: "performance" },
            { german: "kulturelles Erbe", english: "cultural heritage" },
            { german: "künstlerisch", english: "artistic" }
        ],
        sentences: [
            { german: "Deutschland hat ein reiches kulturelles Erbe mit vielen UNESCO-Welterbestätten.", english: "Germany has a rich cultural heritage with many UNESCO World Heritage Sites." },
            { german: "Viele Städte bieten kostenlose Museumseintritte an bestimmten Tagen an.", english: "Many cities offer free museum entry on certain days." },
            { german: "Während des Berlinale Filmfestivals strömen cineastische Enthusiasten aus der ganzen Welt nach Berlin.", english: "During the Berlinale film festival, cinema enthusiasts flock to Berlin from all over the world." },
            { german: "Die documenta in Kassel ist eine der wichtigsten Ausstellungen für zeitgenössische Kunst.", english: "The documenta in Kassel is one of the most important exhibitions of contemporary art." },
            { german: "Klassische Musik hat in Deutschland eine lange Tradition, mit Komponisten wie Bach, Beethoven und Brahms.", english: "Classical music has a long tradition in Germany, with composers like Bach, Beethoven, and Brahms." }
        ]
    },
    {
        id: 9,
        title: "Lesson 9: Economics and Finance",
        content: `
            <h3>Discussing Money and Economy</h3>
            <p>At B1 level, you should be able to talk about economic concepts, personal finance, and understand basic financial news.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Wirtschaftssysteme</strong> - Economic systems</p>
            <p><strong>Persönliche Finanzen</strong> - Personal finances</p>
            <p><strong>Bankwesen</strong> - Banking</p>
            <p><strong>Verbraucherschutz</strong> - Consumer protection</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Passiv mit Modalverben</strong> - Passive with modal verbs</p>
            <p><strong>Finite Verben im Nebensatz</strong> - Finite verbs in subordinate clauses</p>
            
            <h3>Cultural Note</h3>
            <p>Germany has a social market economy and is Europe's largest economy. Germans tend to be fiscally conservative, with a high savings rate compared to other countries. Cash is still widely used, though digital payment methods are becoming more common. Germany is known for its "Mittelstand" - small and medium-sized enterprises that are often world leaders in their niche markets.</p>
        `,
        vocabulary: [
            { german: "die Wirtschaft", english: "economy" },
            { german: "die Finanzen", english: "finances" },
            { german: "das Budget", english: "budget" },
            { german: "das Einkommen", english: "income" },
            { german: "die Ausgaben", english: "expenses" },
            { german: "das Bankkonto", english: "bank account" },
            { german: "die Versicherung", english: "insurance" },
            { german: "die Steuer", english: "tax" },
            { german: "sparen", english: "to save" },
            { german: "investieren", english: "to invest" }
        ],
        sentences: [
            { german: "Deutschland hat eine soziale Marktwirtschaft, die Wettbewerb mit sozialem Ausgleich verbindet.", english: "Germany has a social market economy that combines competition with social balance." },
            { german: "Viele Menschen legen Wert auf finanzielle Sicherheit und sparen regelmäßig einen Teil ihres Einkommens.", english: "Many people value financial security and regularly save a portion of their income." },
            { german: "Bevor man größere Anschaffungen macht, sollte man ein Budget erstellen.", english: "Before making larger purchases, one should create a budget." },
            { german: "Die Inflation kann dazu führen, dass die Kaufkraft des Geldes sinkt.", english: "Inflation can cause the purchasing power of money to decrease." },
            { german: "Es ist wichtig, sich über verschiedene Anlageformen zu informieren, bevor man investiert.", english: "It's important to learn about different forms of investment before investing." }
        ]
    },
    {
        id: 10,
        title: "Lesson 10: Politics and Society",
        content: `
            <h3>Discussing Social and Political Issues</h3>
            <p>At B1 level, you should be able to understand and discuss basic political concepts, social issues, and current affairs.</p>
            
            <h3>Key Topics</h3>
            <p><strong>Politisches System</strong> - Political system</p>
            <p><strong>Gesellschaftliche Herausforderungen</strong> - Societal challenges</p>
            <p><strong>Soziale Gerechtigkeit</strong> - Social justice</p>
            <p><strong>Bürgerrechte</strong> - Civil rights</p>
            
            <h3>Grammar Focus</h3>
            <p>This lesson focuses on:</p>
            <p><strong>Konditionalsätze</strong> - Conditional clauses</p>
            <p><strong>Finalsätze</strong> - Final clauses (um...zu, damit)</p>
            
            <h3>Cultural Note</h3>
            <p>Germany is a federal parliamentary republic with a strong emphasis on consensus-building in politics. The country has a multi-party system, with coalition governments being the norm. Germans generally value stability and continuity in politics. Voter turnout is typically high compared to many other democracies, reflecting engagement with the political process.</p>
        `,
        vocabulary: [
            { german: "die Politik", english: "politics" },
            { german: "die Gesellschaft", english: "society" },
            { german: "die Demokratie", english: "democracy" },
            { german: "die Wahl", english: "election" },
            { german: "die Partei", english: "political party" },
            { german: "die Regierung", english: "government" },
            { german: "die Opposition", english: "opposition" },
            { german: "das Gesetz", english: "law" },
            { german: "die Menschenrechte", english: "human rights" },
            { german: "beteiligen", english: "to participate" }
        ],
        sentences: [
            { german: "Deutschland ist eine föderale Demokratie mit Gewaltenteilung.", english: "Germany is a federal democracy with separation of powers." },
            { german: "Alle deutschen Bürger ab 18 Jahren haben das Recht, an Wahlen teilzunehmen.", english: "All German citizens aged 18 and over have the right to participate in elections." },
            { german: "Um soziale Gerechtigkeit zu fördern, hat Deutschland ein umfassendes Sozialsystem entwickelt.", english: "To promote social justice, Germany has developed a comprehensive social system." },
            { german: "Wenn mehr Menschen sich politisch engagieren würden, könnte die Gesellschaft gerechter werden.", english: "If more people were politically active, society could become fairer." },
            { german: "Die Pressefreiheit ist ein grundlegendes Menschenrecht, das in der Verfassung verankert ist.", english: "Freedom of the press is a fundamental human right that is enshrined in the constitution." }
        ]
    }
];

// App state
let currentLessonId = 1;
let completedLessons = new Set();

// DOM Elements
const lessonsList = document.getElementById('lessons-list');
const lessonTitle = document.getElementById('lesson-title');
const lessonContent = document.getElementById('lesson-content');
const vocabularySection = document.getElementById('vocabulary-section');
const vocabularyList = document.getElementById('vocabulary-list');
const sentencesSection = document.getElementById('sentences-section');
const sentencesList = document.getElementById('sentences-list');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress');

// Initialize the application
function initApp() {
    renderLessonsList();
    loadLesson(currentLessonId);
    updateProgress();
    
    // Event listeners
    prevBtn.addEventListener('click', goToPreviousLesson);
    nextBtn.addEventListener('click', goToNextLesson);
}

// Render the lessons list in the sidebar
function renderLessonsList() {
    lessonsList.innerHTML = '';
    
    lessons.forEach(lesson => {
        const li = document.createElement('li');
        li.className = `lesson-item ${lesson.id === currentLessonId ? 'active' : ''} ${completedLessons.has(lesson.id) ? 'completed' : ''}`;
        li.dataset.id = lesson.id;
        
        li.innerHTML = `
            <span class="lesson-number">${lesson.id}</span>
            ${lesson.title}
        `;
        
        li.addEventListener('click', () => loadLesson(lesson.id));
        lessonsList.appendChild(li);
    });
}

// Load a lesson by ID
function loadLesson(id) {
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) return;
    
    currentLessonId = id;
    
    // Update lesson content
    lessonTitle.textContent = lesson.title;
    lessonContent.innerHTML = lesson.content;
    
    // Update vocabulary
    vocabularyList.innerHTML = '';
    lesson.vocabulary.forEach(word => {
        const vocabItem = document.createElement('div');
        vocabItem.className = 'vocab-item';
        vocabItem.innerHTML = `
            <div class="german-word">${word.german}</div>
            <div class="translation">${word.english}</div>
        `;
        
        vocabItem.addEventListener('click', () => {
            vocabItem.classList.toggle('show-translation');
        });
        
        vocabularyList.appendChild(vocabItem);
    });
    
    vocabularySection.style.display = 'block';
    
    // Update sentences
    sentencesList.innerHTML = '';
    lesson.sentences.forEach(sentence => {
        const sentenceItem = document.createElement('div');
        sentenceItem.className = 'sentence-item';
        sentenceItem.innerHTML = `
            <div class="german-word">${sentence.german}</div>
            <div class="translation">${sentence.english}</div>
        `;
        
        sentenceItem.addEventListener('click', () => {
            sentenceItem.classList.toggle('show-translation');
        });
        
        sentencesList.appendChild(sentenceItem);
    });
    
    sentencesSection.style.display = 'block';
    
    // Mark lesson as completed
    completedLessons.add(id);
    
    // Update UI
    renderLessonsList();
    updateNavigation();
    updateProgress();
}

// Update navigation buttons
function updateNavigation() {
    prevBtn.disabled = currentLessonId === 1;
    nextBtn.disabled = currentLessonId === lessons.length;
}

// Update progress bar
function updateProgress() {
    const progress = (completedLessons.size / lessons.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Go to the previous lesson
function goToPreviousLesson() {
    if (currentLessonId > 1) {
        loadLesson(currentLessonId - 1);
    }
}

// Go to the next lesson
function goToNextLesson() {
    if (currentLessonId < lessons.length) {
        loadLesson(currentLessonId + 1);
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);
