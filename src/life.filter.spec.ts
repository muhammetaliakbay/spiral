import { expect } from 'chai';
import {filterCyclicIndex} from './life';

describe('filter', () => {
    const length = 10;
    it('cyclicIndex', () => {
        expect(
            filterCyclicIndex(0, length)
        ).equal(0);

        expect(
            filterCyclicIndex(1, length)
        ).equal(1);

        expect(
            filterCyclicIndex(-1, length)
        ).equal(9);

        expect(
            filterCyclicIndex(0.5, length)
        ).equal(1);

        expect(
            filterCyclicIndex(-0.50, length)
        ).equal(0);

        expect(
            filterCyclicIndex(-0.51, length)
        ).equal(9);
    });
});
