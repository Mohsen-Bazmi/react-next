export const A = <T>(obj: T, customizations: Partial<T>): T =>
    ({ ...obj, ...customizations });