import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { BaseResponse, Flow, IPaginatedResponse } from '../models/root-models';

@Injectable({
  providedIn: 'root'
})
export class ServicesProxyLogsService {
  // API endpoints
  readonly otpUrl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/send';
  readonly verifyurl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/verify';
  readonly registerUrl = 'https://routes.msg91.com/api/clientUsers?action=login';
  readonly walletUrl = 'https://routes.msg91.com/api/proxy/117230/37kxrfv2/walletBalance';
  readonly rechargeWalletUrl = 'https://routes.msg91.com/api/proxy/117230/37kxrfv2/rechargeWallet';
  readonly existingurl = 'https://routes.msg91.com/api/117230g173934031967ac3a1f486b4/otp/verify?action=login';
  readonly getLogs = 'https://routes.msg91.com/api/c/proxyLogs';
  readonly getLogsById = 'https://apitest.msg91.com/api/c/proxyLogDetails/:id';
  readonly getUserDetails = 'https://routes.msg91.com/api/c/getDetails';
  readonly getAllCampaignFlow = 'https://control.msg91.com/api/v5/campaign/api/campaigns';
  readonly getCampaignFields = 'https://control.msg91.com/api/v5/campaign/api/campaigns/:slug/fields';
  readonly logout = 'https://routes.msg91.com/api/c/logout';  

  constructor(private http: HttpClient) { }

  /**
   * Fetch list of proxy logs with optional query parameters.
   * @param params Optional key-value pairs for query params
   * @returns Observable of logs data
   */
  public getProxyLogs(params?: Record<string, string | number>): Observable<any> {
      const httpParams = new HttpParams({ fromObject: params || {} });
      return this.http.get<any>(this.getLogs, { params: httpParams });
  }
  
  /**
   * Fetch details of a proxy log by its ID.
   * @param id Unique identifier of the log
   * @returns Observable of single log data
   */
  public getProxyLogsById(id: string): Observable<any> {
    const url = this.getLogsById.replace(':id', id);
      return this.http.get<any>(url);
  }
  
  /**
   * Send OTP to the given mobile number.
   * Uses fixed authkey in headers for authorization.
   * @param mobile Phone number to send OTP to
   * @returns Observable of API response
   */
  public sendOtp(mobile: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
    });

    const body = { mobile };

    return this.http.post<any>(this.otpUrl, body, { headers })
  }

  /**
   * Verify OTP for the given mobile number.
   * @param mobile Phone number to verify OTP against
   * @param otp OTP code entered by user
   * @returns Observable of API response
   */
  public verfiyOtp(mobile:string, otp:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
    });
      
    const body = {mobile,otp};
      return this.http.post<any>(this.verifyurl, body, {headers})
  }

  /**
   * Verify existing user with mobile and OTP.
   * On success, stores the proxy_auth_token in local and session storage.
   * @param mobile Mobile number (removes '+' prefix if present)
   * @param otp OTP code
   * @returns Observable of response containing auth token
   */
  public existinguser(mobile:string, otp:string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
    });
    
    // Normalize mobile number by removing leading '+'
    const mobileNumber = mobile.startsWith('+') ? mobile.slice(1) : mobile;
    const body = {mobile: mobileNumber,otp};

    return this.http.post<{data:{proxy_auth_token:string}}>(this.existingurl, body, {headers}).pipe(
      tap((response)=> {
        const token = response?.data?.proxy_auth_token;

        if(token) {
          // Store token for authenticated requests
          localStorage.setItem('proxy_auth_token',token)
          sessionStorage.setItem('proxy_auth_token',token)
        }
      })
    )
  }

  /**
   * Register a new user with name, email, and mobile.
   * Stores returned proxy_auth_token on successful registration.
   * @param name User's full name
   * @param email User's email address
   * @param mobile User's mobile number
   * @returns Observable of registration response
   */
  public registerUser(name:string, email:string, mobile:string): Observable<any>{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'authkey': 'dbc2b79e90d5ee493948fcf6556c2c9a'
      });

      const requestBody = {
        name,
        email,
        mobile,
        feature_id: "117230g173934031967ac3a1f486b4"
      };

      return this.http.post<{data: {proxy_auth_token: string}}>(this.registerUrl, requestBody, {headers}).pipe(
        tap((response) => {
          const token = response?.data?.proxy_auth_token;

          if(token) {
            // Save the authentication token in storage
            localStorage.setItem('proxy_auth_token',token);
            sessionStorage.setItem('proxy_auth_token',token);
          }
        })       
      );
  }
  
  /**
   * Fetch the wallet balance for the authenticated user.
   * Adds 'proxy_auth_token' in request headers.
   * @returns Observable with wallet balance data
   */
  public getWalletBalance(): Observable<any> {
    const token = this.getAuthToken(); 
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'proxy_auth_token': token,  
    });
  
    return this.http.get(this.walletUrl, { headers });
  }
  
  /**
   * Recharge wallet with specified amount.
   * Requires valid 'proxy_auth_token' in headers.
   * @param amount Amount to recharge wallet with
   * @returns Observable of recharge response
   */
  public rechargeWallet(amount:string): Observable<string | any> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'proxy_auth_token': token
    });

    const body = {
          amount
    }
    return this.http.post(this.rechargeWalletUrl, body, {headers});
  }

  /**
   * Retrieve user details for authenticated user.
   * Uses stored proxy_auth_token in request headers.
   * @returns Observable of user details
   */
  public getUserDetailsData(): Observable<any> {
    const token = this.getAuthToken();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'proxy_auth_token': token
    });

    return this.http.get(this.getUserDetails, {headers});
  }

  /**
   * Fetch paginated list of campaign flows.
   * Requires passing authkey and optional query parameters.
   * @param param Query parameters as key-value pairs
   * @param authkey Authentication key to be sent in headers
   * @returns Observable with paginated list of campaign flows
   */
  public getAllCampaignFlowFromApi(param:any, authkey:string): Observable<BaseResponse<IPaginatedResponse<Flow[]>, void>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': authkey,
    });

    return this.http.get<BaseResponse<IPaginatedResponse<Flow[]>,void>>(this.getAllCampaignFlow, {headers, params:param});
  }
  
  /**
   * Fetch fields for a specific campaign identified by slug.
   * Optionally can pass 'sync' param.
   * @param request Object containing slug and optional sync flag
   * @param authkey Authentication key for headers
   * @returns Observable of campaign fields response
   */
  public getCampaignAllFields(request: { slug: string; sync?: boolean }, authkey:string): Observable<BaseResponse<any, string>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'authkey': authkey
    });

    // Build params object only if sync is defined
    const param = request.sync !== undefined ? { sync: request.sync } : undefined;

    return this.http.get<BaseResponse<any, string>>(
      this.getCampaignFields.replace(':slug', request.slug),
      {headers, params:param}
    );
  }

  /**
   * Logout the user by clearing the stored authentication token.
   * @returns Observable of logout response
   */
  public logoutuser(): Observable<any> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'proxy_auth_token': token
    });
    return this.http.delete(this.logout, { headers }).pipe(
      tap(() => {
        // Clear stored authentication token on logout
        localStorage.removeItem('proxy_auth_token');
        sessionStorage.removeItem('proxy_auth_token');
      }),
    )
  }
  
  /**
   * Helper method to get authentication token from storage.
   * Checks sessionStorage first, then localStorage.
   * @returns Stored proxy_auth_token or null if none found
   */
  private getAuthToken(): any {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('proxy_auth_token') || localStorage.getItem('proxy_auth_token') || null;
    }
    return null;
  }
}
