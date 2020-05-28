import {DefineProtein, Protein} from '../protein';
import {Life} from '../life';

@DefineProtein
export class PullProtein extends Protein {
    synthesize(life: Life, distance: number = 0): void {
        life.write(0, life.get(distance));
    }
}
