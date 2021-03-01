import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SectionsService } from 'src/app/core/services/sections.service';
import { SwalService } from 'src/app/core/services/swal.service';
import { Section } from 'src/app/models/Section';

@Component({
  selector: 'app-sections-list',
  templateUrl: './sections-list.component.html'
})
export class SectionsListComponent implements OnInit {

  sections: Section[] = [];
  sectionForm?: FormGroup;
  items: Item[] = [];
  sectionNameChange?: Subscription;

  @BlockUI() blockUI?: NgBlockUI;

  constructor(
    private sectionsService: SectionsService,
    private toastr: ToastrService,
    private swalService: SwalService
  ) { }

  ngOnInit(): void {
    this.getSections();
  }

  get id(): FormControl {
    return this.sectionForm?.get('id') as FormControl;
  }

  get name(): FormControl {
    return this.sectionForm?.get('name') as FormControl;
  }

  get url(): FormControl {
    return this.sectionForm?.get('url') as FormControl;
  }

  getSections(): void {
    this.blockUI?.start();
    this.sectionsService.getSections().subscribe(sections => {
      this.sections = sections;
      this.setItems();
      this.blockUI?.stop();
    }, () => {
      this.blockUI?.stop();
      this.toastr.error('Ha ocurrido un error en la carga de datos. (secciones)');
    });
  }

  createSection(): void {
    const section = new Section();
    this.unselectItems();
    this.unsubscribeChanges();
    this.sectionForm = section.toForm();
    this.url.disable();
    this.sectionNameChange = this.name.valueChanges.subscribe(val => {
      this.makeURL(val);
    });
  }

  seclectSection(section: Section, i: number): void {
    this.unselectItems();
    this.unsubscribeChanges();
    this.sectionForm = section.toForm();
    this.url.disable();
    this.items[i].selected = true;
    this.sectionNameChange = this.name.valueChanges.subscribe(val => {
      this.makeURL(val);
    });
  }

  save(): void {
    this.prepareForm();
    if (!this.sectionForm?.valid) {
      return;
    }

    if (this.id.value) {
      this.update();
    } else {
      this.create();
    }
  }

  cancel(): void {
    this.unselectItems();
    this.unsubscribeChanges();
    this.sectionForm = undefined;
  }

  deleteSection(id: number | null): void {
    this.swalService.confirm(
      '¿Seguro que quiere eliminar la sección?',
      'Una vez que confirme la acción, la sección se eliminará definitivamente.',
      'Si', 'No').then((result: any) => {
        this.cancel();
        if (result.isConfirmed) {
          if (id) {
            this.blockUI?.start();
            this.sectionsService.deleteSection(id).subscribe(() => {
              this.toastr.success('La sección se eliminó correctamente.');
              this.blockUI?.stop();
              this.getSections();
            }, () => {
              this.toastr.success('Ha ocurrido un error al intentar eliminar la sección.');
              this.blockUI?.stop();
            });
          } else {
            this.toastr.success('Ha ocurrido un error al intentar eliminar la sección.');
          }
        }
    });
  }

  private setItems(): void {
    this.sections.forEach(() => {
      this.items.push({selected: false});
    });
  }

  private unselectItems(): void {
    this.items.forEach((i) => {
      i.selected = false;
    });
  }

  private unsubscribeChanges(): void {
    if (this.sectionNameChange) {
      this.sectionNameChange.unsubscribe();
    }
  }

  private makeURL(sn: string): void {
    const url = sn
      .toLowerCase()
      .replace(/ñ/g, 'n')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s]/gi, '')
      .replace(/\s\s+/g, ' ')
      .replace(/ /g, '-');
    if (url.length) {
      this.url.setValue(url);
    } else {
      this.url.setValue(null);
    }
  }

  private prepareForm(): void {
    this.name.markAsDirty();
    this.sectionForm?.markAllAsTouched();
  }

  private update(): void {
    this.blockUI?.start();
    this.sectionsService.updateSection(this.id.value, this.buildRequestData()).subscribe(() => {
      this.blockUI?.stop();
      this.getSections();
      this.toastr.success('Los datos se editaron correctamente');
      this.cancel();
    }, () => {
      this.blockUI?.stop();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  private create(): void {
    this.blockUI?.start();
    this.sectionsService.createSection(this.buildRequestData()).subscribe(() => {
      this.blockUI?.stop();
      this.getSections();
      this.toastr.success('Los datos se guardaron correctamente');
    }, () => {
      this.blockUI?.stop();
      this.toastr.error('Ha ocurrido un error');
    });
  }

  private buildRequestData(): Section {
    this.url.enable();
    this.makeURL(this.name.value);
    const data: Section = this.sectionForm?.value;
    data.active = Number(data.active);
    return data;
  }

}

export interface Item {
  selected: boolean;
}
