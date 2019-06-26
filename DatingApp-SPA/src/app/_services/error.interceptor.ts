import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(err => {
                console.log(err);
                if (err instanceof HttpErrorResponse) { // ako je greska sa API-ja(hendlovana) => http error
                    if (err.status === 401) {
                        return throwError(err.statusText);
                    }
                    const applicationError = err.headers.get('Application-Error');
                    if (applicationError) {
                        console.error(applicationError);
                        return throwError(applicationError);
                    }

                    const serverError = err.error.errors; // serverska greska(nehendlovana) - za core < 2.2 je samo err.error;
                    let modelStateErrors = '';
                    if (serverError && typeof serverError === 'object') {
                        // modelstate-validacija se vraca kroz obican objekat{propName: valMessage}
                        for (const key in serverError) {
                            if (serverError[key]) {
                                modelStateErrors += serverError[key] + '\n';
                            }
                        }
                    }

                    return throwError(modelStateErrors || serverError || 'Server error');
                }
            })
        );
    }

}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
