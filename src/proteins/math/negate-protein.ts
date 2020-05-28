import {UnaryMathProtein} from './math-protein';
import {DefineProtein} from '../../protein';

@DefineProtein
export class NegateProtein extends UnaryMathProtein {
    calculate(term: number): number {
        return -term;
    }
}
