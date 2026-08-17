import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { ButtonComponent } from '@shared/components/button/button';
import { TrainingCycle } from '@core/models/training.models';
import { CreateProgramFacade } from '@features/programs/create-program/facade/create-program.facade';
import { TabOption, TabsButtonComponent } from '@shared/components/tabs-button/tabs-button';
import { LucideDynamicIcon } from '@lucide/angular';
import { ScheduleStepComponent } from '@features/programs/create-program/components/schedule/schedule-step/schedule-step';
import { BaseInfoStep } from '@features/programs/create-program/components/base-info/base-info-step/base-info-step';
import { TargetsStepComponent } from '@features/programs/create-program/components/targets/targets-step/targets-step';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-create-program-page',
  imports: [
    ButtonComponent,
    TabsButtonComponent,
    LucideDynamicIcon,
    ScheduleStepComponent,
    BaseInfoStep,
    TargetsStepComponent,
  ],
  templateUrl: './create-program-page.html',
  styleUrl: './create-program-page.scss',
})
export class CreateProgramPageComponent {
  createProgramFacade = inject(CreateProgramFacade);
  router = inject(Router);

  createProgramTabs: TabOption[] = [
    {
      label: 'Base info',
    },
    {
      label: 'Schedule',
    },
    {
      label: 'Targets',
    },
  ];

  weekOptions = [
    {
      span: TrainingCycle.WEEK,
      weeksRequired: 1,
    },
    {
      span: TrainingCycle.TWO_WEEKS,
      weeksRequired: 2,
    },
    {
      span: TrainingCycle.THREE_WEEKS,
      weeksRequired: 3,
    },
    {
      span: TrainingCycle.FOUR_WEEKS,
      weeksRequired: 4,
    },
  ];

  selectedTabIdx = signal(0);
  nextTabDisabled = computed(() => this.selectedTabIdx() === this.maxTabIdx);
  prevTabDisabled = computed(() => this.selectedTabIdx() === 0);
  readonly maxTabIdx = 2;

  ngOnInit() {
    this.createProgramFacade.loadProgramDraft();

    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.createProgramFacade.saveProgramModel();
    });
  }

  @HostListener('window:beforeunload')
  beforeRefresh() {
    this.createProgramFacade.saveProgramModel();
  }

  onChangeTabs(index: number) {
    if (this.createProgramFacade.trainingProgramValidation().baseInfoInvalid) return;

    this.selectedTabIdx.set(index);
  }

  prevTab() {
    if (this.selectedTabIdx() === 0) return;
    this.selectedTabIdx.update((t) => (t -= 1));
  }

  nextTab() {
    if (this.selectedTabIdx() === this.maxTabIdx) {
      return this.createProgram();
    }

    this.selectedTabIdx.update((t) => (t += 1));
  }

  isThisStepInvalid() {
    if (this.selectedTabIdx() === 0)
      return this.createProgramFacade.trainingProgramValidation().baseInfoInvalid;
    else if (this.selectedTabIdx() === 1)
      return (
        this.createProgramFacade.trainingProgramValidation().scheduleInvalid() ||
        this.createProgramFacade.trainingProgramValidation().dateRangeInvalid()
      );

    return this.createProgramFacade.isProgramInvalid();
  }

  createProgram() {
    this.createProgramFacade.createProgram();
  }
}
