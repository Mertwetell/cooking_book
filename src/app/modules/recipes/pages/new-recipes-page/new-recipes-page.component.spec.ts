import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipesPageComponent } from './new-recipes-page.component';

describe('NewRecipesPageComponent', () => {
  let component: NewRecipesPageComponent;
  let fixture: ComponentFixture<NewRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRecipesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
