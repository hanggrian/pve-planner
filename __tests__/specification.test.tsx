import {beforeEach, describe, expect, it} from 'vitest';
import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import SpecificationRow from '../src/specification';

describe(
  'Specification',
  () => {
    beforeEach(() =>
      render(
        <SpecificationRow
          label='Lorem'
          value='Ipsum'
          darkMode={false}/>
      )
    );

    it(
      'test rows',
      async () => {
        expect(await screen.findByText('Lorem:')).toBeInTheDocument();
        expect(await screen.findByText('Ipsum')).toBeInTheDocument();
      },
    );
  },
);
