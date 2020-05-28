import {Protein} from '../../protein';
import {Life, padValues} from '../../life';

export abstract class MathProtein extends Protein {
    abstract readonly operandLength: number;
    abstract calculate(...operands: number[]): number;
    synthesize(life: Life): void {
        const operands = padValues(life.read(0, this.operandLength), this.operandLength, 0);
        const result = this.calculate(...operands);
        life.write(0, result);
    }
}

export abstract class BinaryMathProtein extends MathProtein {
    operandLength = 2;
    abstract calculate(left: number, right: number): number;
}

export abstract class UnaryMathProtein extends MathProtein {
    operandLength = 1;
    abstract calculate(term: number): number;
}
