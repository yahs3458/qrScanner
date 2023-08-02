import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DigitalSignPage } from './digital-sign.page';

describe('DigitalSignPage', () => {
  let component: DigitalSignPage;
  let fixture: ComponentFixture<DigitalSignPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DigitalSignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
