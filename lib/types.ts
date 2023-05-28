export type RangeOfLength<Num extends number, Result extends Array<unknown> = []> =
    Result['length'] extends Num ? Result : RangeOfLength<Num, [...Result, Result['length']]>

export type CustomizeEach<U, C> = U extends number ? U & Partial<C> : never;