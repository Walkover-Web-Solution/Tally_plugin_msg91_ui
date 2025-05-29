export interface IUserModel {
    uid: string;
    displayName: string;
    email: string;
    phoneNumber: string;
    photoURL: string;
    emailVerified: boolean;
    jwtToken: string;
}

export type errorType = string[] | string | { [key: string]: [] };

export class BaseResponse<T, TRequest> {
    public data!: T;
    public status!: 'success' | 'fail';
    public hasError!: boolean;
    public errors!: errorType;
    public request?: TRequest;
    public queryString?: any;
}


export interface IPaginatedResponse<P> {
    data: P;
    itemsPerPage: number;
    pageNumber: number;
    pageNo?: number;
    totalEntityCount: number;
    totalEntityCountWithoutFilter?: number;
    totalPageCount: number; // Total records of p in database without applying filters
    is_active?: boolean;
}

export interface Flow {
    module_type: string;
    id: number;
    name: string;
    style: FlowStyle;
    module_data: any;
    modules: any;
    slug?: string;
    token?: { name: string; token: string };
    is_complete?: boolean;
    variables?: { [key: string]: string };
    is_active?: boolean;
    globalVariables: any;
}

export interface FlowStyle {
    x: number;
    y: number;
    width: number;
}

export interface ISegmentGetAllCampaignReqModel {
    name?: string;
    is_active?: number | boolean;
    [key: string]: any;
}

export function errorResolver(params: string[] | string | { [key: string]: [] }): string[] {
    if (typeof params === 'string') {
        return [params];
    } else if (params instanceof Array) {
        return params;
    } else if (params instanceof Object) {
        return [].concat(
            ...Object.keys(params).map((p) => {
                return params[p];
            })
        );
    } else {
        return ['Something went wrong.'];
    }
}