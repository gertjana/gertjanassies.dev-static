// Success icon SVG
const SUCCESS_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
const COPY_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';

// Inject copy buttons into all <pre><code> blocks
function injectCopyButtons() {
    document.querySelectorAll('pre > code').forEach(function(code) {
        const pre = code.parentElement;
        // Skip if already wrapped
        if (pre.parentElement && pre.parentElement.classList.contains('code-block-wrapper')) return;

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';

        // Create button
        const button = document.createElement('button');
        button.className = 'copy-code-button';
        button.setAttribute('aria-label', 'Copy code');
        button.innerHTML = COPY_ICON_SVG;

        button.addEventListener('click', async function(e) {
            e.preventDefault();
            e.stopPropagation();

            const codeText = code.textContent;
            if (!codeText) return;

            try {
                await navigator.clipboard.writeText(codeText);
                showSuccess(button);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = codeText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showSuccess(button);
                } catch (err2) {
                    console.error('Copy failed:', err2);
                }
                document.body.removeChild(textArea);
            }
        });

        // Wrap the pre element
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(button);
        wrapper.appendChild(pre);
    });
}

function showSuccess(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = SUCCESS_ICON_SVG;
    button.classList.add('copied');
    setTimeout(function() {
        button.innerHTML = originalHTML;
        button.classList.remove('copied');
    }, 2000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', injectCopyButtons);
