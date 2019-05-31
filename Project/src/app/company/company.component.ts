import { Component, OnInit } from '@angular/core';
import { Coupon } from '../shared/models/Coupon';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CompanyService } from '../shared/services/company.service';
import { CouponService } from '../shared/services/coupon.service';
import { Router } from '@angular/router';
import { Company } from '../shared/models/Company';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  public myName: string;
  public token: number;
  public id: number;
  public companyId: number;

  //create coupon && update
  private couponId: number = null;
  private category: string = null;
  private title: string = null;
  private description: string = null;
  private startDate: Date = null;
  private endDate: Date = null;
  private amount: number = null;
  private price: number = null;
  private image: string = null;

  private maxPrice: number = null;


  //update user
  private userName: string = null;
  private password: string = null;

  // objects
  public user: User;
  public company: Company;
  public companyCouponsByCompanyId: Coupon[];
  public companyCouponsByCategory: Coupon[];
  public companyCouponsByMaxPrice: Coupon[];

  constructor(private userService: UserService, private companyService: CompanyService, private couponService: CouponService, private router: Router) {

    this.token = <number><unknown>sessionStorage.getItem("token");
    this.id = <number><unknown>sessionStorage.getItem("id");
    this.companyId = <number><unknown>sessionStorage.getItem("company");

  }

  ngOnInit(): void {

    this.userService.getUserName(this.id, this.token).subscribe(

      res => this.myName = res,

      err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

    );

  }

  public logOut(): void {

    this.userService.logOut(this.token).subscribe

      (

        () => {

          alert("You are log out!\nWe are waiting for next visit");
          sessionStorage.clear();
          this.router.navigate(["/login"]);

        },

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public createCoupon(): void {

    let coupon: Coupon = new Coupon();
    coupon.companyId = this.companyId;
    coupon.title = this.title;
    coupon.description = this.description;
    coupon.category = this.category;
    coupon.startDate = this.startDate;
    coupon.endDate = this.endDate;
    coupon.amount = this.amount;
    coupon.price = this.price;
    coupon.image = this.image;

    this.couponService.createCoupon(coupon, this.token).subscribe

      (

        () => alert("Your coupon has been created"),

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public updateCoupon(): void {

    let coupon: Coupon = new Coupon();
    coupon.id = this.couponId;
    coupon.companyId = this.companyId;
    coupon.title = this.title;
    coupon.description = this.description;
    coupon.category = this.category;
    coupon.startDate = this.startDate;
    coupon.endDate = this.endDate;
    coupon.amount = this.amount;
    coupon.price = this.price;
    coupon.image = this.image;

    this.couponService.updateCoupon(coupon, this.token).subscribe

      (

        () => alert("Your coupon has been updated"),

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public updateUser(): void {

    let user: User = new User();
    user.id = this.id;
    user.userName = this.userName;
    user.password = this.password;

    this.userService.updateUser(user, this.token);

  }

  public deleteCoupon(couponId: number, type: string, index: number): void {

    this.couponService.deleteCoupon(couponId, this.companyId, this.token).subscribe

      (

        () => {

          alert("Your coupon has been deleted")

          if (type === "id")
            this.updateCouponsArray(this.companyCouponsByCompanyId, index);

          else if (type === "category")
            this.updateCouponsArray(this.companyCouponsByCategory, index);

          else
            this.updateCouponsArray(this.companyCouponsByMaxPrice, index);

        },
        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public deleteMyUser(): void {

    this.userService.deleteMyUser(this.id, this.token).subscribe

      (

        () => {

          alert("Your user has been deleted");
          this.router.navigate(["/login"]);

        },
        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCompany(): void {

    this.companyService.getCompany(this.companyId, this.token).subscribe

      (

        res => this.company = res,

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getUser(): void {

    this.userService.getUser(this.id, this.token).subscribe

      (

        res => this.user = res,

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCompanyCouponsByCompanyId(): void {

    this.couponService.getCompanyCouponsByCompanyId(this.companyId, this.token).subscribe

      (

        res => this.companyCouponsByCompanyId = res,

        err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public getCompanyCouponsByCategory(): void {

    if (this.category == null)
      alert("Enter category plz");
    else {

      this.couponService.getCompanyCouponsByCategory(this.companyId, this.category, this.token).subscribe

        (

          res => this.companyCouponsByCategory = res,

          err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

        );

    }

  }

  public getCompanyCouponsByMaxPrice(): void {

    if (this.maxPrice == null)
      alert("Enter max price plz");

    else {

      this.couponService.getCompanyCouponsByMaxPrice(this.companyId, this.maxPrice, this.token).subscribe

        (

          res => this.companyCouponsByMaxPrice = res,

          err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

        );

    }

  }

  private updateCouponsArray(array: Coupon[], indexToDelete: number): void {

    array.splice(indexToDelete, 1);

  }

}
