import { describe, expect, it } from 'vitest';

import { mouserChiefMapSchema } from './mouser-chiefs';

const validList = {
  Larry: [
    {
      beganTenure: '2011-02-15',
      endedTenure: 'present',
      timeInOffice: '13 years',
      primeMinisters: ['David Cameron', 'Theresa May', 'Boris Johnson', 'Rishi Sunak'],
    },
  ],
};

describe('MouserChiefMapSchema', () => {
  it('parses a valid entry entry correctly', () => {
    const result = mouserChiefMapSchema.safeParse(validList);

    expect(result.success).toBe(true);
  });

  it('does not parse an empty record', () => {
    expect(mouserChiefMapSchema.safeParse({}).success).toBe(false);
  });

  it.each(['beganTenure', 'endedTenure', 'timeInOffice', 'primeMinisters'] as const)(
    'rejects an entry with a missing "%s" field',
    (field) => {
      const invalidList = structuredClone(validList);
      delete invalidList['Larry'][0][field];

      const result = mouserChiefMapSchema.safeParse(invalidList);

      expect(result.success).toBe(false);
    },
  );

  it('does not parse when list of prime ministers is empty', () => {
    const invalidList = structuredClone(validList);
    invalidList['Larry'][0]['primeMinisters'] = [];

    const result = mouserChiefMapSchema.safeParse(invalidList);

    expect(result.success).toBe(false);
  });
});
