export class ApiResponse<T> {
    public message: string;
    public success: boolean;
    public code: number;
    public data: T;
}