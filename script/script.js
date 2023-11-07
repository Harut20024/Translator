const sourceLangSelect = document.getElementById('source_language');
const targetLangSelect = document.getElementById('target_language');

for (const [code, name] of Object.entries(languages)) {

    const sourceOption = document.createElement('option');
    sourceOption.value = code;
    sourceOption.textContent = name;
    sourceLangSelect.appendChild(sourceOption);

    if (code !== 'auto') {  // assuming 'auto' is the code you want to exclude
        const targetOption = document.createElement('option');
        targetOption.value = code;
        targetOption.textContent = name;
        targetLangSelect.appendChild(targetOption);
    }
}

document.getElementById('translatorForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const sourceLang = sourceLangSelect.value;
    const targetLang = targetLangSelect.value;
    const textToTranslate = document.getElementById('text_to_translate').value;

    translateText(sourceLang, targetLang, textToTranslate);
});

async function translateText(sourceLang, targetLang, textToTranslate) {
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'a32ae896cemshfabdc890010e92cp106818jsn2c2be475072c',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: sourceLang,
            target_language: targetLang,
            text: textToTranslate
        })
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        document.getElementById('translationResult').innerText = result.data.translatedText;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('translationResult').innerText = 'Error: Could not translate.';
    }
}