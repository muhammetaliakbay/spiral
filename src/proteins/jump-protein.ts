import {DefineProtein, Protein} from '../protein';
import {Life} from '../life';

@DefineProtein
export class JumpProtein extends Protein {
    synthesize(life: Life, label: number): void {
        life.jump(label);
    }
}
