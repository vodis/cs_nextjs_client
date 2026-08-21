import axios from 'axios';
import { describe, expect, it, vi } from 'vitest';

import { getTranslationsAndLanguages } from './language';

vi.mock('axios', () => ({
  default: {
    get: vi.fn(),
  },
}));

describe('getTranslationsAndLanguages', () => {
  it('requests translations from the site root', async () => {
    const language = {
      translations: {
        key: 'value',
      },
    };

    vi.mocked(axios.get).mockResolvedValueOnce({ data: language });

    await expect(getTranslationsAndLanguages('PT')).resolves.toBe(language);
    expect(axios.get).toHaveBeenCalledWith('/api/v1/translations/PT');
  });
});
