import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolNavBarComponent } from './tool-nav-bar.component';

describe('ToolNavBarComponent', () => {
  let component: ToolNavBarComponent;
  let fixture: ComponentFixture<ToolNavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolNavBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
