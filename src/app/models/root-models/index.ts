// Represents the structure of a user model returned from authentication or user service
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

// A generic class to standardize API responses
export class BaseResponse<T, TRequest> {
    public data!: T;
    public status!: 'success' | 'fail';
    public hasError!: boolean;
    public errors!: errorType;
    public request?: TRequest;
    public queryString?: any;
}

// Interface to define paginated response structure
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

// Represents a flow object used in campaign builder
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

// Defines the layout/positioning style for a flow component in the UI
export interface FlowStyle {
    x: number;
    y: number;
    width: number;
}

// Request model for fetching all campaigns with optional filters
export interface ISegmentGetAllCampaignReqModel {
    name?: string;
    is_active?: number | boolean;
    [key: string]: any;
}

// Utility function to normalize and resolve error messages into a string array
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