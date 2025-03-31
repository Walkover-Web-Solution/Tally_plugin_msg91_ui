import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeftSideNavComponent } from './main-left-side-nav.component';

describe('MainLeftSideNavComponent', () => {
  let component: MainLeftSideNavComponent;
  let fixture: ComponentFixture<MainLeftSideNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainLeftSideNavComponent]
    });
    fixture = TestBed.createComponent(MainLeftSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
