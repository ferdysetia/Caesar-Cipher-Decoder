function caesarDecode() {
    const inputText = document.getElementById('inputText').value;
    const resultTableBody = document.querySelector('#resultTable tbody');

    resultTableBody.innerHTML = '';

    for (let shift = -25; shift <= 25; shift++) {
        const decodedText = decodeText(inputText, shift);

        // Add a new row to the table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${shift}</td>
            <td>${decodedText}</td>
            <td><button class="copyBtn" onclick="copyText('${decodedText}')">Copy</button></td>
        `;
        resultTableBody.appendChild(row);
    }
}

function decodeText(text, shift) {
    let result = '';

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char.match(/[a-z]/i)) {
            const code = text.charCodeAt(i);

            if (code >= 65 && code <= 90) {
                result += String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
            }
            else if (code >= 97 && code <= 122) {
                result += String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
            }
        } else {
            result += char; // Non-alphabetic characters remain the same
        }
    }

    return result;
}

function copyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    Swal.fire({
        title: 'Copied!',
        text: 'Decoded text has been copied to clipboard.',
        icon: 'success',
        confirmButtonText: 'OK'
    });
}