export class APIError {
    public error: { message: string };
    constructor(message: string) {
        this.error = { message };
    }
}