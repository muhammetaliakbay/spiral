import {UnaryMathProtein} from './math-protein';
import {DefineProtein} from '../../protein';

@DefineProtein
export class AbsoluteProtein extends UnaryMathProtein {
    calculate(term: number): number {
        return Math.abs(term);
    }
}
