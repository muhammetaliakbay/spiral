import {Spiral} from '../spiral';
import {Life, padValues} from '../life';

export function live(spiral: Spiral, input: number[], outputLength: number, maxAge: number): {
    output: number[],
    maxStack: number,
    age: number
} {
    const life = new Life(spiral);
    for (const inp of input) {
        life.write(0, inp);
    }
    for (let age = 0; age < maxAge; age ++) {
        if (!life.beat()) {
            break;
        }
    }
    return {
        output: padValues(life.read(0, outputLength), outputLength, 0),
        maxStack: life.maxStack,
        age: life.age
    };
}

export function fitnessVector(output: number[], expected: number[]): number[] {
    const res: number[] = [];
    for (let i = 0; i < output.length; i++) {
        const out = output[i];
        const exp = expected[i];

        const distance = Math.abs(exp - out);
        const scale = Math.max(Math.abs(exp), Math.abs(out));

        const ftns = distance === 1 ? 0 : 1 - Math.max(0, Math.min(1, distance / scale));

        res.push(ftns);
    }
    return res;
}

export function fitness(output: number[], expected: number[]): number {
    let mul = 1;
    for(const ftns of fitnessVector(output, expected)) {
        mul *= ftns;
    }
    return mul;
}
