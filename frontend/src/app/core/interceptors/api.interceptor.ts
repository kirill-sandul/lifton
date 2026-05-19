import { HttpInterceptorFn } from "@angular/common/http";

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  return next(
    req.clone({
      url: `http://localhost:3000/api/${req.url}`
    })      
  )
}