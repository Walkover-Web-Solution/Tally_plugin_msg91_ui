import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesProxyLogsService {
  private readonly logsUrl = 'https://apitest.msg91.com/api/proxyLogs';
  private readonly otpUrl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/send';
  readonly verifyurl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/verify';
  readonly registerUrl = 'https://routes.msg91.com/api/clientUsers?action=login';
  readonly walletUrl = 'https://routes.msg91.com/api/proxy/117230/37kxrfv2/walletBalance';
  readonly rechargeWalletUrl = 'https://routes.msg91.com/api/proxy/117230/37kxrfv2/rechargeWallet';
  readonly existingurl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/verify?action=login'

  constructor(private http: HttpClient) { }

  getProxyLogs(params?: Record<string, string | number>): Observable<any> {
    const httpParams = new HttpParams({ fromObject: params || {} });

    const headers = new HttpHeaders({
      Authorization: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjo2NywiZW1haWwiOiJhbGlhc2dhckB3aG96emF0LmNvbSIsImNyZWF0ZWRfYXQiOiIyMDI1LTAzLTAzVDA0OjA1OjEwLjAwMDAwMFoifX0.G34ZrQKaPX4v-tvOVqiRBPZQTEiLPe8Apqs1UdPhooI` // Replace with actual token
    });

    return this.http.get<any>(this.logsUrl, { params: httpParams, headers });
  }

  sendOtp(mobile: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
    });

    const body = { mobile };

    return this.http.post<any>(this.otpUrl, body, { headers })
  }

  verfiyOtp(mobile:string, otp:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
    });
      
    const body = {mobile,otp};
      return this.http.post<any>(this.verifyurl, body, {headers})
  }

  existinguser(mobile:string, otp:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
    });
      
    const body = {mobile,otp};
      return this.http.post<{data:{proxy_auth_token:string}}>(this.existingurl, body, {headers}).pipe(
            tap((response)=> {
                  const token = response?.data?.proxy_auth_token;

                  if(token) {
                        localStorage.setItem('proxy_auth_token',token)
                        sessionStorage.setItem('proxy_auth_token',token)
                  }
            })

      )
  }

  registerUser(name:string, email:string, mobile:string): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
      });

       const requestBody = {
            name,email,mobile,
            feature_id: "117230g173934031967ac3a1f486b4"
       }
       return this.http.post<{data: {proxy_auth_token: string}}>(this.registerUrl, requestBody, {headers}).pipe(
                tap((response) => {
                        const token = response?.data?.proxy_auth_token;

                        if(token) {
                              localStorage.setItem('proxy_auth_token',token)
                              sessionStorage.setItem('proxy_auth_token',token)
                        }
                })       
       );
  }

  getWalletBalance(): Observable<any> {
    const token = this.getAuthToken(); 
    if (!token) {
      console.warn("No auth token found, wallet balance API won't be called!");
      return throwError(() => new Error("No auth token available"));
    }
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'proxy_auth_token': token,  
    });
  
    return this.http.get(this.walletUrl, { headers }).pipe(
      tap(response => console.log("Wallet Balance API Response:", response)),
      catchError(error => {
        console.error("Wallet Balance API Error:", error);
        return throwError(() => error);
      })
    );
  }
  

  rechargeWallet(amount:string): Observable<string | any> {
    const token = this.getAuthToken();
    if(!token) {
        console.warn("No auth Token Found")
    }

    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'proxy_auth_token': token
    });

    const body = {
          amount
    }
    return this.http.post(this.rechargeWalletUrl, body, {headers})
  }
  
  private getAuthToken():any {
        return sessionStorage.getItem('proxy_auth_token') || localStorage.getItem('proxy_auth_token') || null;
  }
}
