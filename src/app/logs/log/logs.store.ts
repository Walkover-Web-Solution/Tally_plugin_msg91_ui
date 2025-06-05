import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ServicesProxyLogsService } from '../../services/services-proxy-logs.service';
import { Observable, switchMap, catchError, EMPTY } from 'rxjs';


/**
 * Interface defining the shape of the proxy logs state.
 */
export interface ProxyLogsState {
  logs: any | null;        // Stores fetched logs data
  logsLoading: boolean;     // Indicates whether logs are currently loading
  reqLogs: null;           // Stores individual log details by ID
  reqLogsInProcess: boolean   // Indicates whether a specific log fetch is in progress
}

@Injectable()
export class ProxyLogsComponentStore extends ComponentStore<ProxyLogsState> {
  constructor(private logsService: ServicesProxyLogsService) {
      // Initial state setup for the store
    super({ logs: null, 
            logsLoading: false,
            reqLogs: null,
            reqLogsInProcess: false
          });
  }

  // Selectors
    /** Emits the current logs list from state */
  readonly logsData$: Observable<any | null> = this.select(state => state.logs);

   /** Emits the loading state for fetching logs */
  readonly isLoading$: Observable<boolean> = this.select(state => state.logsLoading);

   /** Emits the selected/requested log by ID */
  readonly reqLogs$: Observable<any> = this.select((state) => state.reqLogs);

   /** Emits the loading state for an individual log detail request */
  readonly reqLogsInProcess$: Observable<any> = this.select((state) => state.reqLogsInProcess)

  // Updater 
    /**
   * Sets the logs state with the fetched logs data.
   * @param logs The logs data to store
   */
  readonly setLogs = this.updater((state, logs: any | null) => ({
    ...state,
      logs,
  }));

   /**
   * Effect to fetch proxy logs from the backend using provided params.
   * Automatically manages the loading state and handles errors gracefully.
   */
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

   /**
   * Effect to fetch detailed log data by ID.
   * Updates the request state and resets after loading is complete.
   */
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


