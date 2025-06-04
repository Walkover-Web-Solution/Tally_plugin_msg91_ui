import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseResponse, Flow, IPaginatedResponse } from '../models/root-models';

@Injectable({
  providedIn: 'root'
})
export class ServicesProxyLogsService {
  readonly otpUrl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/send';
  readonly verifyurl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/verify';
  readonly registerUrl = 'https://routes.msg91.com/api/clientUsers?action=login';
  readonly walletUrl = 'https://routes.msg91.com/api/proxy/117230/37kxrfv2/walletBalance';
  readonly rechargeWalletUrl = 'https://routes.msg91.com/api/proxy/117230/37kxrfv2/rechargeWallet';
  readonly existingurl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/verify?action=login';
  readonly getLogs = 'https://routes.msg91.com/api/c/proxyLogs';
  readonly getLogsById = 'https://apitest.msg91.com/api/c/proxyLogDetails/:id';
  readonly getUserDetails = 'https://routes.msg91.com/api/c/getDetails';
  readonly getAllCampaignFlow = 'https://test.msg91.com/api/v5/campaign/api/campaigns';
  readonly getCampaignFields = 'https://test.msg91.com/api/v5/campaign/api/campaigns/:slug/fields';  

  constructor(private http: HttpClient) { }

  getProxyLogs(params?: Record<string, string | number>): Observable<any> {
      const httpParams = new HttpParams({ fromObject: params || {} });
      return this.http.get<any>(this.getLogs, { params: httpParams });
  }

  getProxyLogsById(id: string): Observable<any> {
    const url = this.getLogsById.replace(':id', id);
      return this.http.get<any>(url);
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
    
    const mobileNumber = mobile.startsWith('+') ? mobile.slice(1) : mobile;
    const body = {mobile: mobileNumber,otp};
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
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'proxy_auth_token': token,  
    });
  
    return this.http.get(this.walletUrl, { headers })
  }
  

  rechargeWallet(amount:string): Observable<string | any> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'proxy_auth_token': token
    });

    const body = {
          amount
    }
    return this.http.post(this.rechargeWalletUrl, body, {headers})
  }

  public getUserDetailsData(): Observable<any> {
        const token = this.getAuthToken();

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'proxy_auth_token': token
       });
       return this.http.get(this.getUserDetails, {headers})
  }

  public getAllCampaignFlowFromApi(param:any,authkey:string): Observable<BaseResponse<IPaginatedResponse<Flow[]>, void>> {
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': authkey,
    });

    return this.http.get<BaseResponse<IPaginatedResponse<Flow[]>,void>>(this.getAllCampaignFlow, {headers, params:param})
  }
  

  public getCampaignAllFields(request: { slug: string; sync?: boolean }, authkey:string): Observable<BaseResponse<any, string>> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'authkey': authkey
        })
        const param = request.sync !== undefined ? { sync: request.sync } : undefined;
        return this.http.get<BaseResponse<any, string>>(
            this.getCampaignFields.replace(':slug', request.slug),
            {headers, params:param}
        );
    }
  
  private getAuthToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('proxy_auth_token') || localStorage.getItem('proxy_auth_token') || null;
    }
    return null;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }
}
