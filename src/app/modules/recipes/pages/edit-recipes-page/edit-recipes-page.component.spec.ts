import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipesPageComponent } from './edit-recipes-page.component';

describe('EditRecipesPageComponent', () => {
  let component: EditRecipesPageComponent;
  let fixture: ComponentFixture<EditRecipesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditRecipesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditRecipesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
