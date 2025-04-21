// import { Injectable } from '@angular/core';
// import { ComponentStore, tapResponse } from '@ngrx/component-store';
// import { ServicesProxyLogsService } from '../../services/services-proxy-logs.service';
// import { Observable, switchMap, catchError, EMPTY } from 'rxjs';

// export interface ProxyLogsState {
//   logs: any | null;
//   logsLoading: boolean;
// }

// @Injectable()
// export class ProxyLogsComponentStore extends ComponentStore<ProxyLogsState> {
//   constructor(private logsService: ServicesProxyLogsService) {
//     super({ logs: null, logsLoading: false });
//   }

//   // Selectors
//   readonly logsData$: Observable<any | null> = this.select(state => state.logs);
//   readonly isLoading$: Observable<boolean> = this.select(state => state.logsLoading);

//   // Updater to set logs state
//   readonly setLogs = this.updater((state, logs: any | null) => ({
//     ...state,
//     logs,
//   }));

//   // Effect to fetch logs
//   readonly getLogs = this.effect((params$: Observable<Record<string, string | number>>) =>
//     params$.pipe(
//       switchMap((params) => {
//         this.patchState({ logsLoading: true });
//         return this.logsService.getProxyLogs(params).pipe(
//           tapResponse(
//             (res) => this.patchState({ logs: res, logsLoading: false }),
//             () => this.patchState({ logs: null, logsLoading: false })
//           ),
//           catchError(() => EMPTY)
//         );
//       })
//     )
//   );
// }

