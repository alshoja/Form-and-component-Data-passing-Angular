/* tslint:disable:no-unused-variable */
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { PostsService } from 'src/app/core/services/posts.service';
import { SharedService } from 'src/app/core/services/shared.service';
import { PostComponent } from 'src/app/post/post.component';
import { HomeComponent } from '../home.component';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const spyPayLoad = {
    "userId": 1,
    "id": 9,
    "title": "nesciunt iure omnis dolorem tempora et accusantium",
    "body": "consectetur animi nesciunt "
  }

  const spyPayLoad2 = {
    "userId": 1,
    "id": 9,
  }

  let postsServiceSpy = jasmine.createSpyObj('PostsService', ['getPost']);
  let dataServiceSpy = jasmine.createSpyObj('SharedService', ['sendPostToComponent']);
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
    postsServiceSpy.getPost.and.returnValue(of(spyPayLoad));
    component.form.setValue(formData);
    component.onSubmit();
    expect(postsServiceSpy.getPost).toHaveBeenCalledWith(formData.id);
    expect(dataServiceSpy.sendPostToComponent).toHaveBeenCalledWith(spyPayLoad);
    expect(component.errorState).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should not get a post when body or title is missing', () => {
    const formData = {
      "id": 2,
    };
    postsServiceSpy.getPost.and.returnValue(of(spyPayLoad2));
    component.form.setValue(formData);
    component.onSubmit();
    expect(postsServiceSpy.getPost).toHaveBeenCalledWith(formData.id);
    expect(component.errorState).toBe(true);
    expect(component.errorMessage).toBe('Either Body or Title is Missing');
  });


  it('should through error message on 404 status', () => {
    const formData = {
      "id": 2,
    };
    postsServiceSpy.getPost.and.returnValue(throwError({ status: 404, error: { message: 'some message' } }));
    component.form.setValue(formData);
    component.onSubmit();
    expect(component.errorState).toBe(true);
    expect(component.errorMessage).not.toBe('');
  });

  it('should through message on server is not up', () => {
    const formData = {
      "id": 2,
    };
    postsServiceSpy.getPost.and.returnValue(throwError({ status: 500 }));
    component.form.setValue(formData);
    component.onSubmit();
    expect(component.errorState).toBe(true);
    expect(component.errorMessage).toBe('Internal Server Error Or Something went wrong!');
  });

});
