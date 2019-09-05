import { Component, Input, forwardRef } from '@angular/core';
import { ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const INPUT_FIELD_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFieldComponent),
    multi: true
};

@Component({
    selector: 'app-input-field',
    templateUrl: './input-field.component.html',
    styleUrls: ['./input-field.component.scss'],
    providers: [INPUT_FIELD_VALUE_ACCESSOR]
})
export class InputFieldComponent implements ControlValueAccessor {
    
    @Input() classeCss;
    @Input() id: string;    
    @Input() label: string;
    @Input() type = 'text';
    @Input() control;
    @Input() isReadOnly = false;

    private innerValue: any;

    get value() {
        return this.innerValue;
    }

    set value(valor: any) {

        if(valor !== this.innerValue) {
            this.innerValue = valor;
            this.onChangeCb(valor);

        }
    }
    
    constructor() {}

    onChangeCb: (_: any) => void = () => {};
    onTouchedCb: (_: any) => void = () => {};

    writeValue(value: any): void {
        this.value = value
    }
    registerOnChange(fn: any): void {
        this.onChangeCb = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouchedCb = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        this.isReadOnly = isDisabled;
    }
 
}
