import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
    selector:'[appdropdown]'
})
export class Dropdown{
    @HostBinding('style.backgroundColor') backgroundColor="Transparent";
    @HostListener('mouseenter') mouseover(){
        this.backgroundColor="red";
    }
    @HostListener('mouseleave') mouseleave(){
        this.backgroundColor="transparent";
    }

}