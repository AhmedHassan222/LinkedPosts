import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { SigninComponent } from './Components/signin/signin.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { CreatePostComponent } from './Components/create-post/create-post.component';
import { PostsComponent } from './Components/posts/posts.component';

export const routes: Routes = [
    {path:'', redirectTo:'home' , pathMatch:'full'},
    {path:'home', component:HomeComponent, title:'Home - Linked Posts'},
    {path:'register', component:SignupComponent, title:'Sign Up - Linked Posts'},
    {path:'login', component:SigninComponent, title:'Sign In - Linked Posts'},
    {path:'change-password', component:ChangePasswordComponent, title:'Change Password - Linked Posts'},
    {path:'profile', component:ProfileComponent, title:'Profile - Linked Posts'},
    {path:'create-post', component:CreatePostComponent, title:'Create Post - Linked Posts'},
    {path:'posts', component:PostsComponent, title:'Posts - Linked Posts'},
    {path:'**', component:NotfoundComponent, title:'Page Not Found - Linked Posts'},
];
