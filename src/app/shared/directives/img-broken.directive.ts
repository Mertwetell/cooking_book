import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @HostListener('error') handleError(): void {
    const elNative = this.elHost.nativeElement

    elNative.src = "../../../assets/images/image-not-found.png"

  }

  constructor(private elHost: ElementRef) {
  }

}
