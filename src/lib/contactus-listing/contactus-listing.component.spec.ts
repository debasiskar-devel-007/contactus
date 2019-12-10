import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusListingComponent } from './contactus-listing.component';

describe('ContactusListingComponent', () => {
  let component: ContactusListingComponent;
  let fixture: ComponentFixture<ContactusListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
