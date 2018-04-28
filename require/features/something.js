import { my_command } from './my_command';
import { CommandCoordinator } from '@dolittle/commands';
import { inject } from 'aurelia-framework';

@inject(CommandCoordinator)
export class something {
    constructor(commandCoordinator) {
        this.the_command = new my_command();
    }
}