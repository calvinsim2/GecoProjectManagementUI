import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndProjectComponent } from './ind-project.component';

describe('IndProjectComponent', () => {
  let component: IndProjectComponent;
  let fixture: ComponentFixture<IndProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
