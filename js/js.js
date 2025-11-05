document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Логика SPA-навигации ---
    
    const pageContainer = document.getElementById('page-container');
    const pages = pageContainer.querySelectorAll('section[id^="page-"]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Функция для отображения страницы
    function showPage(pageId) {
        // Скрываем все страницы
        pages.forEach(page => {
            page.classList.remove('page-active');
            // Добавляем задержку для плавной анимации
            setTimeout(() => {
                if (!page.classList.contains('page-active')) {
                    page.style.visibility = 'hidden';
                }
            }, 500); // 500ms - длительность transition
        });

        // Показываем нужную страницу
        const activePage = document.getElementById(`page-${pageId}`);
        if (activePage) {
            activePage.style.visibility = 'visible';
            // Небольшая задержка перед добавлением класса 'page-active'
            // чтобы CSS-анимация 'page-transition' успела сработать
            setTimeout(() => {
                activePage.classList.add('page-active');
            }, 10);
        }

        // Обновляем активную ссылку в навигации
        navLinks.forEach(link => {
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Обновляем хэш в URL
        try {
            window.location.hash = pageId;
        } catch (error) {
            // В песочнице (iframe) это может быть запрещено.
            // Игнорируем ошибку, чтобы приложение не "упало".
            console.warn("Не удалось установить location.hash:", error.message);
        }
    }

    // Обработка кликов по ссылкам навигации
    document.querySelectorAll('a[data-page]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = e.currentTarget.dataset.page;
            showPage(pageId);
        });
    });

    // --- 2. Инициализация при загрузке ---
    
    // Определяем, какую страницу показать при первой загрузке
    const initialPageId = window.location.hash.substring(1) || 'home';
    showPage(initialPageId);

    // --- 3. Анимация "Печатная машинка" (Typing) ---

    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const words = ['Дизайн', 'Код', 'Простота'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 150;
        const erasingSpeed = 100;
        const delay = 2000;

        function type() {
            const currentWord = words[wordIndex];
            const displayedText = currentWord.substring(0, charIndex);

            typingElement.textContent = displayedText;

            if (isDeleting) {
                // Удаление
                charIndex--;
            } else {
                // Печать
                charIndex++;
            }

            // Логика смены слова
            if (!isDeleting && charIndex === currentWord.length) {
                // Слово напечатано
                setTimeout(() => isDeleting = true, delay);
            } else if (isDeleting && charIndex === 0) {
                // Слово удалено
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }

            const speed = isDeleting ? erasingSpeed : typingSpeed;
            setTimeout(type, speed);
        }
        
        // Запускаем анимацию
        type();
    }

    // --- 4. Обработка отправки формы ---
    
    const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Предотвращаем реальную отправку
            
            // Здесь могла бы быть логика отправки (fetch,
            // AJAX),
            // но мы просто покажем сообщение об успехе.

            form.reset(); // Очищаем форму
            form.style.display = 'none'; // Скрываем форму
            successMessage.classList.remove('hidden'); // Показываем сообщение
        });
    }
});