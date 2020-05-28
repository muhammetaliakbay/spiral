import {DefineProtein, Protein} from '../protein';
import {Life} from '../life';

@DefineProtein
export class DieProtein extends Protein {
    synthesize(life: Life, label: number): void {
        life.die();
    }
}
