function splitText() {
    const text = document.getElementById('inputText').value;
    const charLimit = parseInt(document.getElementById('charLimit').value, 10);

    if (!charLimit) {
        alert('Please enter a valid character limit.');
        return;
    }

    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = ''; // Clear previous output
    let startIndex = 0;
    let counter = 1;

    while (startIndex < text.length) {
        let endIndex = Math.min(startIndex + charLimit, text.length);
        let snippet;

        // If we're not at the end and the next character isn't a space, try to find the last space in the range
        if (endIndex < text.length && text[endIndex] !== ' ') {
            let lastSpaceIndex = text.lastIndexOf(' ', endIndex);
            if (lastSpaceIndex > startIndex) {
                snippet = text.substring(startIndex, lastSpaceIndex);
                startIndex = lastSpaceIndex + 1;
            } else {
                // If no space is found, just take the whole range and cut the word
                snippet = text.substring(startIndex, endIndex);
                startIndex = endIndex;
            }
        } else {
            // If we're at the end or the next character is a space, take the whole range
            snippet = text.substring(startIndex, endIndex);
            startIndex = endIndex;
        }

        createSnippetElement(snippet, counter++, outputContainer);
    }
}

function createSnippetElement(snippet, counter, outputContainer) {
    let snippetDiv = document.createElement('div');
    snippetDiv.classList.add('snippet-container');

    let counterSpan = document.createElement('span');
    counterSpan.innerText = counter + ': ';
    counterSpan.classList.add('counter');
    snippetDiv.appendChild(counterSpan);

    let snippetText = document.createElement('span');
    snippetText.innerText = snippet;
    snippetText.classList.add('snippet-text');
    snippetDiv.appendChild(snippetText);

    let copyButton = document.createElement('button');
    copyButton.innerText = 'Copy';
    copyButton.classList.add('copy-button');
    copyButton.onclick = function() {
        copyToClipboard(snippet, copyButton);
    };
    snippetDiv.appendChild(copyButton);

    outputContainer.appendChild(snippetDiv);
}

function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(function() {
        button.classList.add('copied');
        button.innerText = "Copied";
        // setTimeout(function() {
        //     button.classList.remove('copied');
        //     button.innerText = "Copy";
        // }, 2000);
    }, function(err) {
        console.error('Error in copying text: ', err);
    });
}
