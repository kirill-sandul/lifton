import { Component, inject, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { LucideDynamicIcon } from '@lucide/angular';
import { RouterLink } from '@angular/router';
import { WeekSchedule } from '@features/programs/programs-lib/components/week-schedule/week-schedule';
import { TrainingCycle } from '@core/models/training.models';
import { ProgramsLibFacade } from '@features/programs/programs-lib/facade/programs-lib.facade';
import { ClientsWhitelistModalComponent } from '@features/programs/programs-lib/components/clients-whitelist-modal/clients-whitelist-modal';
import { ClientChip } from '@features/programs/programs-lib/components/client-chip/client-chip';

@Component({
  selector: 'app-programs-lib-page',
  imports: [
    ButtonComponent,
    LucideDynamicIcon,
    RouterLink,
    WeekSchedule,
    ClientsWhitelistModalComponent,
    ClientsWhitelistModalComponent,
    ClientChip,
  ],
  templateUrl: './programs-lib-page.html',
  styleUrl: './programs-lib-page.scss',
})
export class ProgramsLibPageComponent {
  programsLibFacade = inject(ProgramsLibFacade);

  whitelistModal = signal<boolean>(false);

  ngOnInit() {
    this.programsLibFacade.init();
  }

  openWhitelistModal() {
    this.whitelistModal.set(true);
  }

  closeWhitelistModal() {
    this.whitelistModal.set(false);
  }

  displayProgramCycle(cycle: TrainingCycle) {
    switch (cycle) {
      case TrainingCycle.WEEK:
        return '1 week';
      case TrainingCycle.TWO_WEEKS:
        return '2 weeks';
      case TrainingCycle.THREE_WEEKS:
        return '3 weeks';
      case TrainingCycle.FOUR_WEEKS:
        return '4 weeks';

      default:
        return '1 week';
    }
  }
}
