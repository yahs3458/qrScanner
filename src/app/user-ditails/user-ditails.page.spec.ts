import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDitailsPage } from './user-ditails.page';

describe('UserDitailsPage', () => {
  let component: UserDitailsPage;
  let fixture: ComponentFixture<UserDitailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserDitailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
