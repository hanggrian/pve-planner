import {describe, expect, it} from 'vitest';
import '@testing-library/jest-dom';
import {IMAGES} from '../src/image';

describe(
  'Image',
  () =>
    it(
      'ensure allocation within range',
      () =>
        IMAGES.forEach(image => {
          expect(image.cpu).toBeLessThanOrEqual(4);
          expect(image.ram % 256).toBe(0);
          expect(image.disk % 512).toBe(0);
        }),
    ),
);
