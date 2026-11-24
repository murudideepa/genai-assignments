# Quality Review

Review software test cases against a user story and its acceptance criteria using Groq's OpenAI-compatible chat-completions API.

## Load in Chrome

1. Open `chrome://extensions`.
2. Turn on **Developer mode**.
3. Select **Load unpacked** and choose this folder.

## Configure a provider

1. Create a Groq API key in the [Groq Console](https://console.groq.com/keys).
2. Load the extension in Chrome using the steps above.
3. Open **Provider settings** from the extension popup. The Groq endpoint and `openai/gpt-oss-120b` model are prefilled; change the model if needed.
4. In the popup, enter the user story, acceptance criteria, test cases, and Groq API key, then select **Review test cases**.
5. Approve the Groq host permission when Chrome asks.

The API key is entered for each review, sent as a bearer token, and cleared from the popup after the request. The endpoint and model are saved in Chrome sync storage. Story, criteria, and test-case text are sent to Groq; only submit information you are authorized to share. HTTPS is required except for localhost development servers.

The review report assesses acceptance-criteria coverage, test-case quality, gaps, and ambiguities. AI-generated findings should be checked by a human.

## Structure

- `manifest.json` — Manifest V3 metadata and permissions.
- `src/popup/` — review form and results.
- `src/options/` — provider endpoint and model settings.
- `src/background/` — reserved service-worker entry point.
- `src/content/` — reserved content-script entry point.
- `assets/icons/` — extension icons.
- `tests/` — automated tests.
