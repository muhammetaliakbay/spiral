import {BinaryMathProtein} from './math-protein';
import {DefineProtein} from '../../protein';

@DefineProtein
export class DivideProtein extends BinaryMathProtein {
    calculate(left: number, right: number): number {
        return left / right;
    }
}
