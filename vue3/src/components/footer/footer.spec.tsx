import { test, expect } from '@playwright/experimental-ct-vue';
import Footer from './footer.vue';

test.use({ viewport: { width: 1280, height: 1024 } });

test.describe('<Footer>', (): void => {
  const props = {
    numEntries: 10,
    positionInList: 0, // 0 indexed
  };

  test('should show correct percentage 1', async ({ mount }) => {
    const component = await mount(<Footer {...props} />);

    await expect(component.getByRole('paragraph')).not.toBeEmpty();

    await expect(component.getByRole('paragraph')).toContainText('01');
    await expect(component.getByRole('paragraph')).toContainText('10');
  });

  test('should show correct percentage 2', async ({ mount }) => {
    const component = await mount(<Footer numEntries={10} positionInList={8} />);

    await expect(component.getByRole('paragraph')).not.toBeEmpty();

    await expect(component.getByRole('paragraph')).toContainText('09');
    await expect(component.getByRole('paragraph')).toContainText('10');
  });

  test.skip('should have correct background size', async ({ mount }) => {
    const component = await mount(<Footer numEntries={10} positionInList={4} />);

    await expect(component.getAttribute('style')).toContain('50');
  });
});
