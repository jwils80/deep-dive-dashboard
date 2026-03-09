// Data Models and Default Placeholders
const defaultData = {
    overview: {
        focus: "Exploring the Origins, Evolution, and Mechanics of Learning Sciences.",
        question: "How do Cognitive Load Theory and Human Memory Functions influence effective instructional design?",
        goals: "1. Understand the foundations and evolution of Learning Sciences.\n2. Analyze Cognitive Load Theory and its applications.\n3. Explore human memory functions (Encoding, Storage, Retrieval).\n4. Apply these concepts to course design (e.g., Moodle) and experimental learning (Vertical Build).",
        summary: "A deep dive into the theoretical foundations of learning and memory, translating cognitive principles into practical design strategies and synthesis."
    },
    library: [
        { id: Date.now(), title: "How AI and Anthropology Created Learning Sciences", author: "Learning Sciences Origins", link: "", tags: "history, foundations", status: "finished", notes: "Audio file. Traces the origins and evolution of the field. Student found the reading confusing but preferred the audio version." },
        { id: Date.now() + 1, title: "Mastering the Mind: A Teacher's Guide to Cognitive Load Theory", author: "Instructional Design", link: "", tags: "cognitive load, theory", status: "finished", notes: "Infographic covering Intrinsic, Extraneous, and Germane load and their interaction with working/long-term memory." },
        { id: Date.now() + 2, title: "2017 Cognitive Load Theory PDF", author: "NSW Government", link: "https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf", tags: "cognitive load, government report", status: "reading", notes: "External resource on cognitive load theory." },
        { id: Date.now() + 3, title: "Human Memory Functions and Stages", author: "Memory Mechanics", link: "", tags: "memory, psychology", status: "finished", notes: "Mind map covering Encoding, Storage, Retrieval, and the Atkinson-Shiffrin Model (Sensory, Short-term, Long-term)." },
        { id: Date.now() + 4, title: "Designing for the Mind (Moodle)", author: "Course Design", link: "", tags: "Moodle, cognitive load, design", status: "finished", notes: "Infographic on streamlining course formats, sequencing with 'Restrict Access', and design consistency. Accompanied by audio 'Optimizing_Moodle_with_Cognitive_Load_Theory.m4a'." },
        { id: Date.now() + 5, title: "Understanding Cognitive Load Theory for Better Online Course Design", author: "Moodle", link: "https://moodle.com/us/news/understanding-cognitive-load-theory-for-better-online-course-design/", tags: "Moodle, cognitive load", status: "to-read", notes: "External resource for practical Moodle application." },
        { id: Date.now() + 6, title: "The Zone of Proximal Development", author: "Simply Psychology", link: "https://www.simplypsychology.org/zone-of-proximal-development.html", tags: "ZPD, Vygotsky", status: "finished", notes: "Finding the 'Goldilocks' zone—challenging but manageable." },
        { id: Date.now() + 7, title: "Retrieval Practice: Free Recall", author: "The Learning Scientists", link: "https://www.learningscientists.org/blog/2016/6/23-1", tags: "retrieval practice, synthesis", status: "finished", notes: "Using 'Brain Dumps' as a stabilization gate for learning." }

    ],
    weeklyPlan: {
        1: { goal: "Understand the Origins and Evolution of Learning Sciences", reading: "Ai notes.pdf, How AI and Anthropology Created Learning Sciences (Audio)", experiment: "Try doodling while listening to audio to manage ADHD/overstimulation.", reflection: "Visual notes are a struggle; audio + doodling helps focus." },
        2: { goal: "Grasp Cognitive Load Theory", reading: "flashcards (1).csv, 2017 Cognitive Load Theory PDF (NSW), Mastering the Mind Infographic", experiment: "Differentiate Intrinsic, Extraneous, and Germane loads.", reflection: "Need to manage intrinsic, minimize extraneous, and maximize germane load." },
        3: { goal: "Learn Core Functions and Stages of Human Memory", reading: "Mind map: Atkinson-Shiffrin Model", experiment: "Map out Encoding, Storage, and Retrieval processes.", reflection: "Visualizing the pipeline from sensory to long-term memory is key." },
        4: { goal: "Apply Cognitive Load in Design (Moodle)", reading: "flashcards (3).csv, Optimizing Moodle audio, Designing for the Mind infographic", experiment: "Design a Moodle module using 'Restrict Access' to sequence learning.", reflection: "Streamlining formats and maintaining consistency reduces extraneous load." },
        5: { goal: "The Vertical Build & Synthesis", reading: "ZPD (Simply Psychology), Retrieval Practice (The Learning Scientists), Vygotsky audio", experiment: "The 'Tower' Experiment: Learn a sub-step, do a 60-second brain dump, then move to next step.", reflection: "Brain dumps act as a stabilization gate." }
    },
    prompts: [
        { id: Date.now(), prompt: "Explain the Atkinson-Shiffrin Model using a simple analogy for a beginner.", model: "Claude 3.5 Sonnet", summary: "Used a computer hard drive analogy for long-term storage and RAM for working memory.", next: "Try a post office routing metaphor", timestamp: new Date().toLocaleDateString() },
        { id: Date.now() + 1, prompt: "How can I apply Zone of Proximal Development to teaching bread-making ratios?", model: "ChatGPT 4", summary: "Suggested breaking down hydration percentages into visual, tactile steps before introducing the math.", next: "Create a visual step-by-step ratio guide.", timestamp: new Date().toLocaleDateString() }
    ],
    experiments: [
        { id: Date.now(), tried: "The 'Tower' Experiment: 60-second brain dump between complex task steps.", notes: "Applied to learning bread-making ratios.", outcome: "Helped stabilize the previous step before introducing new information. Reduced feeling of being overwhelmed.", next: "Try increasing the brain dump time to 90 seconds for highly complex steps." },
        { id: Date.now() + 1, tried: "Listening to audio notes while doodling instead of taking strict visual notes.", notes: "Week 1 Foundations reading.", outcome: "Kept focus better. Reduced overstimulation common with ADHD.", next: "Use this method for all dense theoretical readings." }
    ],
    links: [
        { id: Date.now(), label: "Milanote Research Board", url: "https://app.milanote.com/1VSSvs1Ht2oB5w/deep-research-readings?p=o2yThyu2sHh" },
        { id: Date.now() + 1, label: "2017 Cognitive Load Theory (NSW)", url: "https://education.nsw.gov.au/content/dam/main-education/about-us/educational-data/cese/2017-cognitive-load-theory.pdf" },
        { id: Date.now() + 2, label: "Moodle Cognitive Load Guide", url: "https://moodle.com/us/news/understanding-cognitive-load-theory-for-better-online-course-design/" }
    ]
};

// Storage Key
const STORAGE_KEY = 'project2_deepdive_data';

// App State
let appData = {};

// Initialization
function init() {
    loadData();
    bindOverviewInputs();
    renderLibrary();
    renderWeeklyPlan();
    renderPrompts();
    renderExperiments();
    renderLinks();
    setupModals();
    setupReset();
}

// Data Management
function loadData() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        appData = JSON.parse(stored);
        // Ensure all keys exist (in case of new schema)
        appData = { ...defaultData, ...appData };
    } else {
        appData = JSON.parse(JSON.stringify(defaultData));
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
    showSaveIndicator();
}

function showSaveIndicator() {
    const indicator = document.querySelector('.status-indicator');
    if (indicator) {
        indicator.textContent = "Saved";
        indicator.classList.add('show');
        setTimeout(() => {
            indicator.classList.remove('show');
            setTimeout(() => indicator.textContent = "Auto-saving...", 300);
        }, 2000);
    }
}

// 1. Overview Section
function bindOverviewInputs() {
    ['focus', 'question', 'goals', 'summary'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = appData.overview[id] || '';
            el.addEventListener('input', (e) => {
                appData.overview[id] = e.target.value;
                saveData();
            });
        }
    });
}

// 2. Reading Library
function renderLibrary(filterText = '') {
    const grid = document.getElementById('library-grid');
    if (!grid) return;
    grid.innerHTML = '';

    appData.library.forEach(item => {
        if (filterText && !item.title.toLowerCase().includes(filterText.toLowerCase()) && !item.tags.toLowerCase().includes(filterText.toLowerCase())) {
            return;
        }

        const tagsHtml = item.tags.split(',').filter(t => t.trim() !== '').map(t => `<span class="tag">${t.trim()}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom: 10px;">
                <h3 style="margin-bottom:0;">${item.title}</h3>
                <span class="status-chip ${item.status}">${item.status.replace('-', ' ')}</span>
            </div>
            <div style="font-size: 0.8rem; margin-bottom: 15px; font-weight:bold;">${item.author}</div>
            <div style="margin-bottom: 10px;">${tagsHtml}</div>
            <div style="margin-bottom: 15px; font-size: 0.9rem; flex-grow:1;">${item.notes}</div>
            <div class="card-actions">
                ${item.link ? `<a href="${item.link}" target="_blank" class="btn" style="padding: 5px 10px; font-size: 0.8rem;">Link</a>` : ''}
                <button class="btn btn-danger" onclick="deleteItem('library', ${item.id})">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

document.getElementById('library-search')?.addEventListener('input', (e) => {
    renderLibrary(e.target.value);
});

// 3. Weekly Plan
function renderWeeklyPlan() {
    const container = document.getElementById('weekly-container');
    if (!container) return;
    container.innerHTML = '';

    for (let week = 1; week <= 5; week++) {
        const data = appData.weeklyPlan[week] || { goal: "", reading: "", experiment: "", reflection: "" };
        const row = document.createElement('div');
        row.className = 'week-row';
        row.innerHTML = `
            <div class="week-label">W${week}</div>
            <div class="week-content">
                <div class="week-col">
                    <label>Goal</label>
                    <textarea data-week="${week}" data-field="goal" rows="3" placeholder="Set a goal...">${data.goal}</textarea>
                </div>
                <div class="week-col">
                    <label>Reading</label>
                    <textarea data-week="${week}" data-field="reading" rows="3" placeholder="What to read...">${data.reading}</textarea>
                </div>
                <div class="week-col">
                    <label>Experiment</label>
                    <textarea data-week="${week}" data-field="experiment" rows="3" placeholder="What to try...">${data.experiment}</textarea>
                </div>
                <div class="week-col">
                    <label>Reflection</label>
                    <textarea data-week="${week}" data-field="reflection" rows="3" placeholder="What happened...">${data.reflection}</textarea>
                </div>
            </div>
        `;
        container.appendChild(row);
    }

    container.querySelectorAll('textarea').forEach(ta => {
        ta.addEventListener('input', (e) => {
            const week = e.target.dataset.week;
            const field = e.target.dataset.field;
            if (!appData.weeklyPlan[week]) appData.weeklyPlan[week] = {};
            appData.weeklyPlan[week][field] = e.target.value;
            saveData();
        });
    });
}

// 4. Prompt Log
function renderPrompts() {
    const container = document.getElementById('prompt-list');
    if (!container) return;
    container.innerHTML = '';

    appData.prompts.forEach(item => {
        const el = document.createElement('div');
        el.className = 'list-item';
        el.innerHTML = `
            <div class="prompt-meta">
                <span>Model: ${item.model}</span>
                <span>${item.timestamp}</span>
            </div>
            <div>
                <strong>Prompt:</strong><br><br>
                <div style="background:var(--white); padding:10px; border:2px solid var(--black); border-radius:4px; font-size:0.9rem;">${item.prompt}</div>
            </div>
            <div style="display:flex; flex-direction:column; gap:10px;">
                <div><strong>Outcome Summary:</strong><br><span style="font-size:0.9rem;">${item.summary}</span></div>
                <div><strong>Next Iteration:</strong><br><span style="font-size:0.9rem; color:var(--primary); font-weight:bold;">${item.next}</span></div>
                <div style="margin-top:auto; text-align:right;">
                    <button class="btn btn-danger" onclick="deleteItem('prompts', ${item.id})" style="padding:4px 8px; font-size:0.8rem;">Delete</button>
                </div>
            </div>
        `;
        container.appendChild(el);
    });
}

// 5. Experiment Log
function renderExperiments() {
    const grid = document.getElementById('experiment-grid');
    if (!grid) return;
    grid.innerHTML = '';

    appData.experiments.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3 style="margin-bottom:10px; border-bottom:2px solid var(--black); padding-bottom:5px; font-family:var(--font-heading);">Experiment Log</h3>
            <div style="margin-bottom: 10px;"><strong>Tried:</strong> ${item.tried}</div>
            <div style="margin-bottom: 10px; background:var(--bg-color); padding:10px; border:2px dashed var(--black); font-size:0.9rem;">
                <em>Notes/Media:</em><br>${item.notes}
            </div>
            <div style="margin-bottom: 10px;"><strong>Outcome:</strong> ${item.outcome}</div>
            <div style="margin-bottom: 15px; font-weight:bold; color:var(--primary);">Next: ${item.next}</div>
            <div class="card-actions">
                <button class="btn btn-danger" onclick="deleteItem('experiments', ${item.id})">Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 6. Links
function renderLinks() {
    const grid = document.getElementById('links-grid');
    if (!grid) return;
    grid.innerHTML = '';

    appData.links.forEach(item => {
        const a = document.createElement('a');
        a.href = item.url;
        a.target = "_blank";
        a.className = 'link-card';
        a.innerHTML = `
            ${item.label}
            <button class="link-delete" onclick="event.preventDefault(); event.stopPropagation(); deleteItem('links', ${item.id})">×</button>
        `;
        grid.appendChild(a);
    });
}

// Generic Delete
window.deleteItem = function (collection, id) {
    if (confirm("Are you sure you want to delete this item?")) {
        appData[collection] = appData[collection].filter(item => item.id !== id);
        saveData();
        // Re-render appropriate section
        if (collection === 'library') renderLibrary();
        if (collection === 'prompts') renderPrompts();
        if (collection === 'experiments') renderExperiments();
        if (collection === 'links') renderLinks();
    }
}

// Modal Handlers
function setupModals() {
    // Library
    const libForm = document.getElementById('libraryForm');
    if (libForm) {
        libForm.addEventListener('submit', (e) => {
            e.preventDefault();
            appData.library.unshift({
                id: Date.now(),
                title: document.getElementById('lib-title').value,
                author: document.getElementById('lib-author').value,
                link: document.getElementById('lib-link').value,
                tags: document.getElementById('lib-tags').value,
                status: document.getElementById('lib-status').value,
                notes: document.getElementById('lib-notes').value
            });
            saveData();
            renderLibrary();
            document.getElementById('libraryModal').close();
            e.target.reset();
        });
    }

    // Prompt
    const prForm = document.getElementById('promptForm');
    if (prForm) {
        prForm.addEventListener('submit', (e) => {
            e.preventDefault();
            appData.prompts.unshift({
                id: Date.now(),
                prompt: document.getElementById('pr-prompt').value,
                model: document.getElementById('pr-model').value,
                summary: document.getElementById('pr-output').value,
                next: document.getElementById('pr-next').value,
                timestamp: new Date().toLocaleDateString()
            });
            saveData();
            renderPrompts();
            document.getElementById('promptModal').close();
            e.target.reset();
        });
    }

    // Experiment
    const expForm = document.getElementById('experimentForm');
    if (expForm) {
        expForm.addEventListener('submit', (e) => {
            e.preventDefault();
            appData.experiments.unshift({
                id: Date.now(),
                tried: document.getElementById('exp-tried').value,
                notes: document.getElementById('exp-notes').value,
                outcome: document.getElementById('exp-outcome').value,
                next: document.getElementById('exp-next').value
            });
            saveData();
            renderExperiments();
            document.getElementById('experimentModal').close();
            e.target.reset();
        });
    }

    // Link
    const lkForm = document.getElementById('linkForm');
    if (lkForm) {
        lkForm.addEventListener('submit', (e) => {
            e.preventDefault();
            appData.links.push({
                id: Date.now(),
                label: document.getElementById('lk-label').value,
                url: document.getElementById('lk-url').value
            });
            saveData();
            renderLinks();
            document.getElementById('linkModal').close();
            e.target.reset();
        });
    }
}

// Reset
function setupReset() {
    const btn = document.getElementById('reset-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            if (confirm("DANGER: This will wipe all data and restore placeholders. Are you sure?")) {
                if (confirm("Are you REALLY sure? This cannot be undone.")) {
                    localStorage.removeItem(STORAGE_KEY);
                    location.reload();
                }
            }
        });
    }
}

// Boot
init();
