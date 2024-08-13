document.addEventListener('DOMContentLoaded', (event) => {

  const encryptButton = document.getElementById('encryptButton');
  const decryptButton = document.getElementById('decryptButton');
  const inputText = document.getElementById('inputText');
  const outputText = document.getElementById('outputText');
  const copyButton = document.getElementById('copyButton');
  const noTextImageContainer = document.getElementById('noTextImageContainer');

  if (encryptButton && decryptButton && inputText && outputText && copyButton && noTextImageContainer) {

    const encryptText = (text) => {
      return text
        .replace(/e/g, 'enter')
        .replace(/i/g, 'imes')
        .replace(/a/g, 'ai')
        .replace(/o/g, 'ober')
        .replace(/u/g, 'ufat');
    };

    const decryptText = (text) => {
      return text
        .replace(/enter/g, 'e')
        .replace(/imes/g, 'i')
        .replace(/ai/g, 'a')
        .replace(/ober/g, 'o')
        .replace(/ufat/g, 'u');
    };

    const isTextEncrypted = (text) => {
      const encryptedPatterns = /enter|imes|ai|ober|ufat/;
      return encryptedPatterns.test(text);
    };

    const updateUI = () => {
      if (outputText.value.trim() === "") {
        copyButton.style.display = "none";
        outputText.style.display = "none"; // Ocultar el textarea
        noTextImageContainer.style.display = "block"; // Mostrar la imagen
        decryptButton.style.backgroundColor = "#aab3c4";
        decryptButton.style.color = "white";
      } else {
        copyButton.style.display = "block";
        outputText.style.display = "block"; // Mostrar el textarea
        noTextImageContainer.style.display = "none"; // Ocultar la imagen
        decryptButton.style.backgroundColor = "white";
        decryptButton.style.color = "#003bff";
      }
    };

    const validateInput = (text) => {
      const regex = /^[a-z\s]*$/;
      return regex.test(text);
    };

    const adjustTextareaHeight = (textarea) => {
      textarea.style.height = 'auto'; // Reset height to auto to calculate the scrollHeight
      textarea.style.height = `${textarea.scrollHeight}px`; // Set the height to the scrollHeight
    };

    inputText.addEventListener('input', () => {
      adjustTextareaHeight(inputText);
    });

    encryptButton.addEventListener('click', () => {
      const textToEncrypt = inputText.value;
      if (!validateInput(textToEncrypt)) {
        alert('Error: Sólo letras minúsculas y sin acentos');
        return;
      }
      if (isTextEncrypted(textToEncrypt)) {
        alert('El texto ya está encriptado');
        return;
      }
      if (textToEncrypt.trim() === "") {
        outputText.value = "";
      } else {
        const encryptedText = encryptText(textToEncrypt);
        outputText.value = encryptedText;
      }
      updateUI();
    });

    decryptButton.addEventListener('click', () => {
      const textToDecrypt = inputText.value;
      if (textToDecrypt.trim() === "") {
        outputText.value = "";
        // Actualizar la UI al desencriptar y el textarea está vacío
        updateUI();
        return;
      }
      if (!isTextEncrypted(textToDecrypt)) {
        alert('El texto no está encriptado');
        return; // No hacer nada más
      }
      const decryptedText = decryptText(textToDecrypt);
      outputText.value = decryptedText;
      updateUI();
    });

    copyButton.addEventListener('click', () => {
      navigator.clipboard.writeText(outputText.value)
        .then(() => {
          alert('Texto copiado al portapapeles!');
        })
        .catch(err => {
          console.error('Error al copiar el texto: ', err);
        });
    });

    // Mostrar inicialmente la imagen en el contenedor derecho
    noTextImageContainer.style.display = "block";
    outputText.style.display = "none";
    copyButton.style.display = "none";

    // Ajustar la altura del textarea al cargar la página
    adjustTextareaHeight(inputText);

  } else {
    console.error('Uno o más elementos no se encontraron en el DOM.');
  }
});
