import { DoCheck } from '@angular/core';
import { Component } from '@angular/core';
import { Product } from './product.module';
import { PromoCode } from './promo-code.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements DoCheck {
  products: Product[] = [
    {
      id: 1,
      name: 'Iphone 11',
      description: 'Apple',
      image: '/assets/ip11.jpg',
      price: 799.99,
      quantity: 2,
    },
    {
      id: 2,
      name: 'Airpod',
      description: 'Apple',
      image: '/assets/airpods.jpg',
      price: 29.99,
      quantity: 10,
    },
  ];

  promoCodes: PromoCode[] = [
    {
      code: 'KAITO',
      discountPercent: 10,
    },
    {
      code: 'KHUONG',
      discountPercent: 20,
    },
  ];

  numberItems: number = 0;
  subTotal: number = 0;
  discountPercent: number = 0;
  discount: number = 0;
  taxPercent: number = 10;
  tax: number = 0;

  ngDoCheck() {
    this.numberItems = 0;
    this.subTotal = 0;

    for (const product of this.products) {
      this.numberItems += product.quantity;
      this.subTotal += product.price * product.quantity;
    }

    this.discount = (this.subTotal * this.discountPercent) / 100;
    this.tax = ((this.subTotal - this.discount) * this.taxPercent) / 100;
  }

  handleUpdateQuantity(p: { id: number; quantity: number }) {
    const product = this.products.find((product) => product.id === p.id);
    if (product) {
      product.quantity = p.quantity || 0;
    }
  }

  handleRemoveProduct(id: number) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  handleApplyPromoCode(code: string) {
    const promoCode = this.promoCodes.find(
      (promoCode) => promoCode.code === code
    );
    this.discountPercent = promoCode ? promoCode.discountPercent : 0;
    this.discount = (this.subTotal * this.discountPercent) / 100;

    if (this.discount > 0) {
      alert(`Successfully!`);
    } else {
      alert('Invalid code!');
    }
  }
}
