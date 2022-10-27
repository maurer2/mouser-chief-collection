import { test, expect } from '@playwright/experimental-ct-vue';
import Subentry from './subentry.vue';

test.use({ viewport: { width: 1280, height: 1024 } });

test.describe('<Subentry>', (): void => {
  const props = {
    fieldValue: 'test',
  };

  test('should render single entry', async ({ mount }) => {
    const component = await mount(<Subentry {...props} />);

    await expect(component.getByText('test')).toBeDefined();
  });

  test('should render multiple entries', async ({ mount }) => {
    const component = await mount(<Subentry filedValue={['test1', 'test2']} />);

    await expect(component.getByText('test1')).toBeDefined();
    await expect(component.getByText('test2')).toBeDefined();
  });
});
