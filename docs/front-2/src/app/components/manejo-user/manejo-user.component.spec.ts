import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManejoUserComponent } from './manejo-user.component';

describe('ManejoUserComponent', () => {
  let component: ManejoUserComponent;
  let fixture: ComponentFixture<ManejoUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManejoUserComponent]
    });
    fixture = TestBed.createComponent(ManejoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
