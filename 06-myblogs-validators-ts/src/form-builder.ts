// import { ValidStatus, ChangedStatus, Validator } from './validate';
// export type FormComponents<Entity> = {
//     [Prop in keyof Entity]?: FormComponent<Prop>
// }

// export interface FormComponent<State> {
//     id: string;
//     value: State;
//     valid: ValidStatus;
//     changed: ChangedStatus;
//     readonly initialValue?: State;
//     validators?: Validator | Validator [];
//     reset(): void;
//     validate(): string[]; // validation errors, empty [] in no errors
//     render(): string;
// }

// interface FormTextComponentType extends FormComponent<string> {
//     multiline: boolean;
// }
// type FormCheckboxComponentType = FormComponent<boolean>;
// interface FormNumberComponentType extends FormComponent<number> {
//     min: number;
//     max: number;
// }
// interface FormUrlComponentType extends FormComponent<string> {
//     allowRelative: boolean;
//     allowInsecure: boolean;
// }

// export type FormComponentType<Prop> =
//     Prop extends string ? FormTextComponent | FormUrlComponentType :
//     Prop extends number ? FormNumberComponentType :
//     Prop extends boolean ? FormCheckboxComponentType : never;

// export class FormTextComponent implements FormTextComponentType {
//     constructor(
//         public id: string,
//         public value: string,
//         public initialValue = '',
//         public multiline: boolean = false,
//         public validators: Validator | Validator [], 
//         public valid: ValidStatus = ValidStatus.INVALID,
//         public changed: ChangedStatus = ChangedStatus.PRISTINE
//     ) {}
//     reset(): void {
//         this.value = this.initialValue;
//     }
//     validate(): string[] {
//         if(Array.isArray(this.validators)) {
//             for(const validator of this.validators) {
//                 try {
//                     validator(this.value, this.id);
//                 } catch (err) {
//                     errors.push(err);
//                 }
//             }
//         }

//     }
//     render(): string {

//     }

// }