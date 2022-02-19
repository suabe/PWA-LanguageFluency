import {
    AbstractControl,
    AsyncValidatorFn,
    ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { DataUsuarioService } from '../../services/data-usuario.service';
  

  export class LfidValidator {
      static createValidator(dataServive: DataUsuarioService): AsyncValidatorFn {
          return (control: AbstractControl): Observable<ValidationErrors> => {                            
              return dataServive.checkLfIdExists(control.value).pipe(
                  first(),map(user => user ?{ lfidExists: true }: null)
              )
              
          }
      }
  }