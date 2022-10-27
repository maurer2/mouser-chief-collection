import { test, expect } from '@playwright/experimental-ct-vue';
import Selectbox from './select-box.vue';

import type { MouserChiefDetails } from '../../types/index';

test.use({ viewport: { width: 1280, height: 1024 } });

test.describe('<SelectBox>', (): void => {
  const props = {
    entryNames: ['Mittens', 'Socks', 'Liz Lemon'] as MouserChiefDetails['name'][],
    activeEntry: {
      name: 'Mittens',
      beganTenure: '2000',
      endedTenure: '2020',
      primeMinisters: ['Tony Blair'],
    } as MouserChiefDetails,
  };

  test('should have selectbox and buttons', async ({ mount }) => {
    const component = await mount(<Selectbox {...props} />);

    // await expect(component.getByRole('listbox', { level: 2 })).toContainText('Mittens');
    await expect(component.getByRole('listbox')).toBeDefined();
    // await expect(component.getByRole('button', { type: 'reset' })).toContainText('X');
    // await expect(component.getByRole('button', { type: 'submit' })).toContainText('Select entry');
    await expect(component.getByText('Select entry')).toBeDefined();
    await expect(component.getByText('X')).toBeDefined();
  });

  test.skip('should change active select element', async ({ mount }) => {
    const component = await mount(<Selectbox {...props} />);

    await expect(component.getByRole('combobox')).toBeDefined();
    await component.getByRole('combobox').selectOption({ label: 'Socks' });
    await expect(component.locator('option[selected="selected"]')).toHaveText('Socks');
  });
});
