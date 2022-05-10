import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndUserComponent } from './ind-user.component';

describe('IndUserComponent', () => {
  let component: IndUserComponent;
  let fixture: ComponentFixture<IndUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
