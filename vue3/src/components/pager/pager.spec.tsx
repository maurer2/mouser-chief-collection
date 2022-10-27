import { test, expect } from '@playwright/experimental-ct-vue';
import Pager from './pager.vue';

test.use({ viewport: { width: 1280, height: 1024 } });

test.describe('<Pager>', (): void => {
  const props = {
    isPrevButton: true,
    isDisabled: false,
  };

  test('should have previous button', async ({ mount }) => {
    const component = await mount(<Pager {...props} />);

    await expect(component).toContainText('Previous');
  });

  test('should have next button', async ({ mount }) => {
    const component = await mount(<Pager {...props} isPrevButton={false} />);

    await expect(component).toContainText('Next');
  });

  test('should disable button, when isDisabled prop is set', async ({ mount }) => {
    const component = await mount(<Pager {...props} isDisabled={true} />);

    await expect(component).toBeDisabled();
  });

  test.skip('should emit event when clicked when not disabled', async ({ mount }) => {
    const emits: string[] = [];
    const component = await mount(<Pager {...props} />, {
      on: {
        'pager-clicked': () => emits.push('test'),
        'pagerClicked': () => emits.push('test'),
        'pagerclicked': () => emits.push('test'),
      },
    });

    await component.click();
    expect(emits).toContain('test');
  });
});

// expect(wrapper.emitted()).toHaveProperty('greet')
//   expect(wrapper.emitted().greet).toHaveLength(2)
