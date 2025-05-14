const btn = document.getElementById('submit');
const geminiResponseContainer = document.getElementById('geminiResponse');

btn.addEventListener('click', async () => {
  const inputText = document.getElementById("userInput");
  const userQuery = inputText.value.trim();

  try {
    const response = await fetch('/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userQuery }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.status);
    }

    const rawData = await response.json();

    // Parse and extract text safely
    const parsed = JSON.parse(rawData); // since your backend does: JSON.stringify(...)
    const answer = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (answer) {
      geminiResponseContainer.innerHTML = `<p><strong>Gemini:</strong> ${answer}</p>`;
    } else {
      geminiResponseContainer.innerHTML = "<p style='color: red;'>❌ Gemini returned no usable response.</p>";
    }

  } catch (error) {
    console.error('Error during fetch:', error);
    geminiResponseContainer.innerHTML = "<p style='color: red;'>❌ Something went wrong. See console.</p>";
  }
});
