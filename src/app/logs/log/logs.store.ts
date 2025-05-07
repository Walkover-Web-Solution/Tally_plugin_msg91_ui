import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ServicesProxyLogsService } from '../../services/services-proxy-logs.service';
import { Observable, switchMap, catchError, EMPTY } from 'rxjs';

export interface ProxyLogsState {
  logs: any | null;
  logsLoading: boolean;
  reqLogs: null;
  reqLogsInProcess: boolean
}

@Injectable()
export class ProxyLogsComponentStore extends ComponentStore<ProxyLogsState> {
  constructor(private logsService: ServicesProxyLogsService) {
    super({ logs: null, 
            logsLoading: false,
            reqLogs: null,
            reqLogsInProcess: false
          });
  }

  // Selectors
  readonly logsData$: Observable<any | null> = this.select(state => state.logs);
  readonly isLoading$: Observable<boolean> = this.select(state => state.logsLoading);
  readonly reqLogs$: Observable<any> = this.select((state) => state.reqLogs);
  readonly reqLogsInProcess$: Observable<any> = this.select((state) => state.reqLogsInProcess)

  // Updater to set logs state
  readonly setLogs = this.updater((state, logs: any | null) => ({
    ...state,
      logs,
  }));

  // Effect to fetch logs
  readonly getLogs = this.effect((params$: Observable<Record<string, string | number>>) =>
    params$.pipe(
      switchMap((params) => {
        this.patchState({ logsLoading: true });
        return this.logsService.getProxyLogs(params).pipe(
          tapResponse(
            (res) => this.patchState({ logs: res, logsLoading: false }),
            () => this.patchState({ logs: null, logsLoading: false })
          ),
          catchError(() => EMPTY)
        );
      })
    )
  );

  readonly getLogsById = this.effect((data: Observable<any>) => {
    return data.pipe(
      switchMap((req: any) => {
        this.patchState({ reqLogsInProcess: true, reqLogs: null });
  
        return this.logsService.getProxyLogsById(req).pipe(
          tapResponse(
            (res: any) => {
              this.patchState({
                reqLogsInProcess: false,
                reqLogs: {
                   ...res.data,
        
                }
              });
            },
            (error) => {
              this.patchState({ reqLogsInProcess: false });
            }
          )
        );
      })
    );
  });
  
}


