/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PostsService } from '../core/services/posts.service';
import { SharedService } from '../core/services/shared.service';
import { PostComponent } from '../post/post.component';
import { HomeComponent } from './home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const spyPayLoad = {
    "userId": 1,
    "id": 9,
    "title": "nesciunt iure omnis dolorem tempora et accusantium",
    "body": "consectetur animi nesciunt "
  }

  let postsServiceSpy = jasmine.createSpyObj('PostsService', ['getPost']);
  let dataServiceSpy = jasmine.createSpyObj('SharedService', ['sendPostToComponent']);

  postsServiceSpy.getPost.and.returnValue(of(spyPayLoad));
  dataServiceSpy.sendPostToComponent.and.returnValue(of(spyPayLoad));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([{ path: 'post/detail', component: PostComponent }]),
      ],
      providers: [
        {
          provide: PostsService, useValue: postsServiceSpy
        },
        {
          provide: SharedService, useValue: dataServiceSpy
        }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should require valid number', () => {
    component.form.setValue({
      "id": "invalidID",
    });
    expect(component.form.valid).toEqual(false);
  });

  it('should be valid if form value is valid', () => {
    component.form.setValue({
      "id": 2,
    });
    expect(component.form.valid).toEqual(true);
    expect(component.hasError('id', 'required')).toEqual(false);
  });

  it('should get a post', () => {
    const formData = {
      "id": 2,
    };

    component.form.setValue(formData);
    component.onSubmit();
    expect(postsServiceSpy.getPost).toHaveBeenCalledWith(formData.id);
    expect(dataServiceSpy.sendPostToComponent).toHaveBeenCalledWith(spyPayLoad);
  });

});
