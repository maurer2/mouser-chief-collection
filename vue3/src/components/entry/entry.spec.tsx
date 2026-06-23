import { test, expect } from '@playwright/experimental-ct-vue';
import Entry from './entry.vue';

import type { MouserChiefDetails } from '../../types/index';

test.use({ viewport: { width: 1280, height: 1024 } });

test.describe('<Entry>', (): void => {
  const name = 'Mittens';
  const tenures: MouserChiefDetails[] = [
    {
      beganTenure: '2000',
      endedTenure: '2020',
      timeInOffice: '20 years',
      primeMinisters: ['Tony Blair'],
    },
  ];

  test('should have title with name of cat', async ({ mount }) => {
    const component = await mount(<Entry name={name} tenures={tenures} />);

    await expect(component.getByRole('heading', { level: 2 })).toContainText('Mittens');
  });

  test('should have all MouserChiefDetails keys', async ({ mount }) => {
    const component = await mount(<Entry name={name} tenures={tenures} />);

    await expect(component).toContainText('Start of tenure');
    await expect(component).toContainText('End of tenure');
    await expect(component).toContainText('Time in office');
    await expect(component).toContainText('Prime ministers');
  });

  test('should have all MouserChiefDetails values', async ({ mount }) => {
    const component = await mount(<Entry name={name} tenures={tenures} />);

    await expect(component).toContainText('Mittens');
    await expect(component).toContainText('2000');
    await expect(component).toContainText('2020');
    await expect(component).toContainText('Tony Blair');
  });
});
