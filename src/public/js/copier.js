/*
    * File: copier.js
    * Description: This file contains the functions used to copy text to the clipboard.
    * Author: Wriar
    * Last Modified: 2023-07-19 
    * License: SEE License.md
    * 
    * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
    * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
    * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
    * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/**
 * Copies the given text to the clipboard
 * @param {String} text Text to copy to clipboard
 * @param {Boolean} [doAlert=true] Use the ``createToast`` method to alert the user if the text was copied to the clipboard. Requires ``description`` and toast API.
 * @param {String} [description] When ``doAlert`` is true, this will be used to describe what was copied to the clipboard.
 * @returns 
 */
function cp(text, doAlert=false, description="data") {
    console.log(doAlert);
    // Check if the Clipboard API is supported by the browser
    if (!navigator.clipboard) {
        // Fallback for older browsers
        fallbackCopyToClipboard(text, doAlert, description);
        return;
    }

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log(`${description} copied to clipboard successfully: `, text);
            if (doAlert) {
                createToast(0, `Copied ${description} to clipboard!`);
            }
        })
        .catch((err) => {
            console.error('Error copying text to clipboard: ', err);
            createToast(1, `Unable to copy ${text} to clipboard!`);
        });
}

// Fallback function for browsers that do not support the Clipboard API
function fallbackCopyToClipboard(text, doAlert, description) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Prevent scrolling to bottom of page in Safari
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        const successful = document.execCommand('copy');
        const message = successful ? 'Text copied to clipboard successfully' : 'Unable to copy text to clipboard';
        console.log(message);
        if (doAlert && successful) {
            createToast(0, `Copied ${description} to clipboard!`);
        } else if (doAlert && !successful) {
            createToast(1, `Unable to copy ${text} to clipboard!`);
        }
    } catch (err) {
        console.error('Error copying text to clipboard: ', err);
    }

    document.body.removeChild(textarea);
}
