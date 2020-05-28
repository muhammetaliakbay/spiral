import {DefineProtein, Protein} from '../protein';
import {Life} from '../life';

@DefineProtein
export class ConstantProtein extends Protein {
    synthesize(life: Life, constantValue: number = 0): void {
        life.write(0, constantValue);
    }
}
