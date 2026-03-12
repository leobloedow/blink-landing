const translations = {
    'en': {
        'hero-title': '<div><span class="highlight">Reading</span> becomes <span class="highlight">easier</span>.</div><div>One <span class="highlight">word</span> at a time.</div>',
        'hero-desc': 'Experience a new way to read your favorite books, one word at a time — minimizing distractions and boosting your reading speed.',
        'download-label': 'Download:',
        'btn-how-to': 'How to use',
        'feat1-title': 'Purposefully Minimal',
        'feat1-desc': "We removed everything that doesn't strictly serve to enhance your workflow. No feeds, no popups.",
        'feat2-title': 'Zero Configuration',
        'feat2-desc': "Start working immediately. Sane defaults mean you don't spend hours tweaking your settings.",
        'feat3-title': 'Uncompromising Speed',
        'feat3-desc': 'Built with performance as the primary goal. Blink opens instantly and uses barely any memory.',
        'footer-copy': '&copy; 2026 Leonardo Littig',
        'tutorial-title': 'How to use',
        'import-title': 'How to import books',
        'import-desc': "Tap the 'Add book' button in the app and select your EPUB or PDF files from your device.",
        'download-where-title': 'Where to find books',
        'download-where-desc': 'You can find free EPUB and PDF books on sites like <a href="https://www.gutenberg.org/" target="_blank" class="text-link">Project Gutenberg</a>, <a href="https://standardebooks.org/" target="_blank" class="text-link">Standard Ebooks</a>, <a href="https://dlivros.com/" target="_blank" class="text-link">dLivros</a>, or <a href="https://openlibrary.org/" target="_blank" class="text-link">Open Library</a>.'
    },
    'pt': {
        'hero-title': '<div>A <span class="highlight">leitura</span> fica mais <span class="highlight">fácil</span>.</div><div>Uma <span class="highlight">palavra</span> de cada vez.</div>',
        'hero-desc': 'Experimente um novo jeito de ler seus livros favoritos, uma palavra por vez, minimizando distrações e aumentando a velocidade de leitura.',
        'download-label': 'Baixar:',
        'btn-how-to': 'Como usar',
        'feat1-title': 'Propositalmente Minimalista',
        'feat1-desc': 'Removemos tudo o que não serve estritamente para melhorar seu fluxo de trabalho. Sem feeds, sem popups.',
        'feat2-title': 'Zero Configuração',
        'feat2-desc': 'Comece a trabalhar imediatamente. Padrões sensatos significam que você não gasta horas ajustando suas configurações.',
        'feat3-title': 'Velocidade Incomparável',
        'feat3-desc': 'Construído com desempenho como objetivo principal. O Blink abre instantaneamente e quase não usa memória.',
        'footer-copy': '&copy; 2026 Leonardo Littig',
        'tutorial-title': 'Como usar',
        'import-title': 'Como importar livros',
        'import-desc': "Toque no botão 'Adicionar livro' no app e selecione seus arquivos EPUB ou PDF do seu dispositivo.",
        'download-where-title': 'Onde encontrar livros',
        'download-where-desc': 'Você pode encontrar livros EPUB e PDF gratuitos em sites como <a href="https://www.gutenberg.org/" target="_blank" class="text-link">Project Gutenberg</a>, <a href="https://standardebooks.org/" target="_blank" class="text-link">Standard Ebooks</a>, <a href="https://dlivros.com/" target="_blank" class="text-link">dLivros</a> ou <a href="https://openlibrary.org/" target="_blank" class="text-link">Open Library</a>.'
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const osToggle = document.getElementById('os-toggle');

    // Auto OS detection
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let autoOs = 'desktop';
    if (/android/i.test(userAgent)) {
        autoOs = 'android';
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        autoOs = 'ios';
    }

    // Current state
    let currentLang = 'en';
    let currentOs = 'auto'; // 'auto', 'android', 'ios', 'desktop'

    const userLang = navigator.language || navigator.userLanguage;
    if (userLang.toLowerCase().startsWith('pt')) {
        currentLang = 'pt';
    }

    langToggle.value = currentLang;
    osToggle.value = currentOs;

    function updateUI() {
        // Update language attribute
        document.documentElement.lang = currentLang === 'pt' ? 'pt-BR' : 'en';
        // Update page title
        const pageTitle = document.getElementById('page-title');
        if (pageTitle) {
            pageTitle.textContent = currentLang === 'pt' ? 'Blink - Leitura Rápida' : 'Blink - Speed Reading';
        } else {
            document.title = currentLang === 'pt' ? 'Blink - Leitura Rápida' : 'Blink - Speed Reading';
        }

        // Determine active OS
        const activeOs = currentOs === 'auto' ? autoOs : currentOs;

        // Update i18n text nodes
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[currentLang][key]) {
                if (key === 'footer-copy' || key === 'hero-title' || key === 'download-where-desc') {
                    el.innerHTML = translations[currentLang][key];
                } else {
                    el.textContent = translations[currentLang][key];
                }
            }
        });

        // Update store badges
        const badgesContainer = document.getElementById('badges-container');
        badgesContainer.innerHTML = '';

        const appleLink = 'https://apple.co/46Sr38N';
        const playLink = 'https://play.google.com/store/apps/details?id=com.leonardolittig.blink';

        const appleBadgeEn = 'Assets/download-on-the-app-store-black-en-us/black.svg';
        const appleBadgePt = 'Assets/download-on-the-app-store-black-pt-br/black.svg';
        const playBadgeEn = 'Assets/GetItOnGooglePlay_Badge_Web_color_English.svg';
        const playBadgePt = 'Assets/GetItOnGooglePlay_Badge_Web_color_Portuguese-Brazil.svg';

        const currentAppleBadge = currentLang === 'pt' ? appleBadgePt : appleBadgeEn;
        const currentPlayBadge = currentLang === 'pt' ? playBadgePt : playBadgeEn;

        const appleHtml = `<a href="${appleLink}" target="_blank" rel="noopener noreferrer"><img src="${currentAppleBadge}" alt="Download on the App Store" class="store-badge" onerror="this.onerror=null;this.src='Assets/download-on-the-app-store-black-en-us/black.png'" /></a>`;
        const playHtml = `<a href="${playLink}"  target="_blank" rel="noopener noreferrer"><img src="${currentPlayBadge}"  alt="Get it on Google Play"  class="store-badge" onerror="this.onerror=null;this.src='Assets/googleplay-en.png'" /></a>`;

        if (activeOs === 'android') {
            badgesContainer.innerHTML = playHtml;
        } else if (activeOs === 'ios') {
            badgesContainer.innerHTML = appleHtml;
        } else {
            badgesContainer.innerHTML = appleHtml + playHtml;
        }
    }

    // Initial render
    updateUI();

    // Listeners
    langToggle.addEventListener('change', (e) => {
        currentLang = e.target.value;
        updateUI();
    });

    osToggle.addEventListener('change', (e) => {
        currentOs = e.target.value;
        updateUI();
    });

    // Smooth scroll for "How to use" button
    document.addEventListener('click', (e) => {
        if (e.target.closest('#how-to-use-btn')) {
            e.preventDefault();
            const tutorialSection = document.getElementById('tutorial');
            if (tutorialSection) {
                tutorialSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
