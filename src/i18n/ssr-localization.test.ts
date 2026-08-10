import { describe, expect, it } from 'vitest';

import { spawn } from 'node:child_process';
import { createServer, type Server } from 'node:http';
import { once } from 'node:events';

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

describe('SSR localization', () => {
  it('exposes translated content in localized route initial HTML', async () => {
    const api = await startMockTranslationsApi();
    const appPort = await getFreePort();
    const env = {
      ...process.env,
      NEXT_PUBLIC_API_BASE_URL: api.url,
      NEXT_PUBLIC_SITE_URL: `http://127.0.0.1:${appPort}`,
    };

    await runCommand('pnpm', ['exec', 'next', 'build'], env);

    const app = spawn(
      'pnpm',
      ['exec', 'next', 'start', '-p', String(appPort)],
      {
        env,
        stdio: ['ignore', 'pipe', 'pipe'],
      },
    );

    try {
      await waitForHttp(`http://127.0.0.1:${appPort}/health`);

      for (const expected of Object.values(translatedValues)) {
        const html = await fetchText(
          `http://127.0.0.1:${appPort}${expected.path}`,
        );

        expect(html).toMatch(
          new RegExp(`<html[^>]*lang="${expected.htmlLang}"`),
        );
        expect(html).toMatch(new RegExp(expected.aboutTitle));
        expect(html).toMatch(new RegExp(expected.aboutParagraph));
        expect(html).toMatch(new RegExp(expected.menuHome));
        expect(html).not.toMatch(/>\s*Texts\.[^<]*</);
      }
    } finally {
      app.kill();
      api.server.close();
    }
  }, 90_000);
});

interface IMockTranslationsApi {
  server: Server;
  url: string;
}

async function startMockTranslationsApi(): Promise<IMockTranslationsApi> {
  const server = createServer((request, response) => {
    const language = request.url?.split('/').pop();

    if (!isTranslatedLanguage(language)) {
      response.writeHead(404);
      response.end();
      return;
    }

    const values = translatedValues[language];

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
  expect(address && typeof address === 'object').toBe(true);

  if (!address || typeof address !== 'object') {
    throw new Error('Mock translations API did not bind a TCP port');
  }

  return {
    server,
    url: `http://127.0.0.1:${address.port}`,
  };
}

async function getFreePort(): Promise<number> {
  const server = createServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');

  const address = server.address();
  expect(address && typeof address === 'object').toBe(true);

  if (!address || typeof address !== 'object') {
    throw new Error('Temporary server did not bind a TCP port');
  }

  const { port } = address;

  server.close();
  await once(server, 'close');

  return port;
}

async function runCommand(
  command: string,
  args: string[],
  env: NodeJS.ProcessEnv,
): Promise<void> {
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

  expect(code, output).toBe(0);
}

async function waitForHttp(url: string): Promise<void> {
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

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  expect(response.status).toBe(200);

  return response.text();
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTranslatedLanguage(
  language: string | undefined,
): language is keyof typeof translatedValues {
  return language !== undefined && language in translatedValues;
}
