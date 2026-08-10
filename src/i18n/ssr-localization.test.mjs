import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const translatedValues = {
  UA: {
    htmlLang: 'uk',
    path: '/ua/about',
    aboutTitle: 'UA SSR About Title',
    aboutParagraph: 'UA SSR localized about paragraph',
    menuHome: 'UA SSR Home',
  },
  PT: {
    htmlLang: 'pt',
    path: '/pt/about',
    aboutTitle: 'PT SSR About Title',
    aboutParagraph: 'PT SSR localized about paragraph',
    menuHome: 'PT SSR Home',
  },
};

test('localized routes expose translated content in initial HTML', async () => {
  const api = await startMockTranslationsApi();
  const appPort = await getFreePort();
  const env = {
    ...process.env,
    NEXT_PUBLIC_API_BASE_URL: api.url,
    NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${appPort}`,
  };

  await runCommand('pnpm', ['exec', 'next', 'build'], env);

  const app = spawn('pnpm', ['exec', 'next', 'start', '-p', String(appPort)], {
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  try {
    await waitForHttp(`http://127.0.0.1:${appPort}/health`);

    for (const expected of Object.values(translatedValues)) {
      const html = await fetchText(
        `http://127.0.0.1:${appPort}${expected.path}`,
      );

      assert.match(html, new RegExp(`<html[^>]*lang="${expected.htmlLang}"`));
      assert.match(html, new RegExp(expected.aboutTitle));
      assert.match(html, new RegExp(expected.aboutParagraph));
      assert.match(html, new RegExp(expected.menuHome));
      assert.doesNotMatch(html, />\s*Texts\.[^<]*</);
    }
  } finally {
    app.kill();
    api.server.close();
  }
});

async function startMockTranslationsApi() {
  const server = createServer((request, response) => {
    const language = request.url?.split('/').pop();
    const values = language ? translatedValues[language] : undefined;

    if (!values) {
      response.writeHead(404);
      response.end();
      return;
    }

    response.writeHead(200, {
      'content-type': 'application/json',
    });
    response.end(
      JSON.stringify({
        languages: {
          [language]: {
            language,
            title: language,
          },
        },
        translations: {
          'Texts.animate-label-about': values.aboutTitle,
          'Texts.side-menu-home': values.menuHome,
          'Texts.content-about-title': values.aboutTitle,
          'Texts.content-about-paragraph-1': values.aboutParagraph,
          'Texts.content-about-paragraph-2': `${language} SSR localized second paragraph`,
          'Texts.content-about-paragraph-3': `${language} SSR localized third paragraph`,
          'Texts.panels-text-about': `${language} SSR Panel`,
          'Texts.metadata-about-title': `${language} SSR Metadata Title`,
          'Texts.metadata-about-description': `${language} SSR Metadata Description`,
        },
      }),
    );
  });

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  assert(address && typeof address === 'object');

  return {
    server,
    url: `http://127.0.0.1:${address.port}`,
  };
}

async function getFreePort() {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  assert(address && typeof address === 'object');
  const { port } = address;

  server.close();
  await once(server, 'close');

  return port;
}

async function runCommand(command, args, env) {
  const child = spawn(command, args, {
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let output = '';

  child.stdout.on('data', (chunk) => {
    output += chunk;
  });
  child.stderr.on('data', (chunk) => {
    output += chunk;
  });

  const [code] = await once(child, 'exit');

  assert.equal(code, 0, output);
}

async function waitForHttp(url) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);

      if (response.ok) {
        return;
      }
    } catch {
      await delay(500);
    }
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function fetchText(url) {
  const response = await fetch(url);
  assert.equal(response.status, 200);

  return response.text();
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
