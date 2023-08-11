import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DigitalsignaturePage } from './digitalsignature.page';

describe('DigitalsignaturePage', () => {
  let component: DigitalsignaturePage;
  let fixture: ComponentFixture<DigitalsignaturePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DigitalsignaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
