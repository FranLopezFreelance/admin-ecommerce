import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceFormModalComponent } from './price-form-modal.component';

describe('PriceFormModalComponent', () => {
  let component: PriceFormModalComponent;
  let fixture: ComponentFixture<PriceFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
