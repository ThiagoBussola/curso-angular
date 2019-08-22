import { Directive, HostListener, ElementRef, Renderer, HostBinding } from '@angular/core';

@Directive({
    selector: '[highlightMouse]'
})
export class HighlightMouseDirective {
        
    constructor(
        // private _elementRef: ElementRef,
        // private _renderer: Renderer

    ) { }

    @HostListener('mouseenter') onMouseOver() {
        // this._renderer.setElementStyle(
        //     this._elementRef.nativeElement,
        //     'background-color',
        //     'yellow'
        // )
        this.backgroundColor = 'yellow';
    }
        
    @HostListener('mouseleave') onMouseLeave() {
        // this._renderer.setElementStyle(
        //     this._elementRef.nativeElement,
        //     'background-color',
        //     'white'
        // )
        this.backgroundColor = 'white';
    }

    @HostBinding('style.backgroundColor') backgroundColor: string;
        
}
    