import { NgModule } from "@angular/core";
import { loginComponent } from "./login/login.component";
import { signupComponent } from "./signup/signup.component";
import { AngularMaterialModule } from "../angular-material.module";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
    declarations: [
        loginComponent,
        signupComponent
    ],
    imports: [
        AngularMaterialModule,
        CommonModule,
        FormsModule,
        AuthRoutingModule
    ]
})
export class AuthModule{

}