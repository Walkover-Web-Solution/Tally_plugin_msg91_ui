import { ComponentFixture, TestBed } from '@angular/core/testing';

import { footerComponent } from '../footer/footer.component';

describe('AuthComponent', () => {
  let component: footerComponent;
  let fixture: ComponentFixture<footerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [footerComponent]
    });
    fixture = TestBed.createComponent(footerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
