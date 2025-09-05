
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Internship
 * 
 */
export type Internship = $Result.DefaultSelection<Prisma.$InternshipPayload>
/**
 * Model Achievement
 * 
 */
export type Achievement = $Result.DefaultSelection<Prisma.$AchievementPayload>
/**
 * Model Admin
 * 
 */
export type Admin = $Result.DefaultSelection<Prisma.$AdminPayload>
/**
 * Model Alumni
 * 
 */
export type Alumni = $Result.DefaultSelection<Prisma.$AlumniPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserAcademicYear: {
  Y2022_26: 'Y2022_26',
  Y2023_27: 'Y2023_27',
  Y2024_28: 'Y2024_28',
  Y2025_29: 'Y2025_29',
  Y2026_30: 'Y2026_30',
  Y2027_31: 'Y2027_31'
};

export type UserAcademicYear = (typeof UserAcademicYear)[keyof typeof UserAcademicYear]

}

export type UserAcademicYear = $Enums.UserAcademicYear

export const UserAcademicYear: typeof $Enums.UserAcademicYear

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.internship`: Exposes CRUD operations for the **Internship** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Internships
    * const internships = await prisma.internship.findMany()
    * ```
    */
  get internship(): Prisma.InternshipDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.achievement`: Exposes CRUD operations for the **Achievement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Achievements
    * const achievements = await prisma.achievement.findMany()
    * ```
    */
  get achievement(): Prisma.AchievementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.admin`: Exposes CRUD operations for the **Admin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Admins
    * const admins = await prisma.admin.findMany()
    * ```
    */
  get admin(): Prisma.AdminDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.alumni`: Exposes CRUD operations for the **Alumni** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alumni
    * const alumni = await prisma.alumni.findMany()
    * ```
    */
  get alumni(): Prisma.AlumniDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.15.0
   * Query Engine version: 85179d7826409ee107a6ba334b5e305ae3fba9fb
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Internship: 'Internship',
    Achievement: 'Achievement',
    Admin: 'Admin',
    Alumni: 'Alumni'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "internship" | "achievement" | "admin" | "alumni"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Internship: {
        payload: Prisma.$InternshipPayload<ExtArgs>
        fields: Prisma.InternshipFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InternshipFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InternshipFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>
          }
          findFirst: {
            args: Prisma.InternshipFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InternshipFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>
          }
          findMany: {
            args: Prisma.InternshipFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>[]
          }
          create: {
            args: Prisma.InternshipCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>
          }
          createMany: {
            args: Prisma.InternshipCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InternshipCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>[]
          }
          delete: {
            args: Prisma.InternshipDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>
          }
          update: {
            args: Prisma.InternshipUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>
          }
          deleteMany: {
            args: Prisma.InternshipDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InternshipUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InternshipUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>[]
          }
          upsert: {
            args: Prisma.InternshipUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InternshipPayload>
          }
          aggregate: {
            args: Prisma.InternshipAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInternship>
          }
          groupBy: {
            args: Prisma.InternshipGroupByArgs<ExtArgs>
            result: $Utils.Optional<InternshipGroupByOutputType>[]
          }
          count: {
            args: Prisma.InternshipCountArgs<ExtArgs>
            result: $Utils.Optional<InternshipCountAggregateOutputType> | number
          }
        }
      }
      Achievement: {
        payload: Prisma.$AchievementPayload<ExtArgs>
        fields: Prisma.AchievementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AchievementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AchievementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findFirst: {
            args: Prisma.AchievementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AchievementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          findMany: {
            args: Prisma.AchievementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          create: {
            args: Prisma.AchievementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          createMany: {
            args: Prisma.AchievementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AchievementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          delete: {
            args: Prisma.AchievementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          update: {
            args: Prisma.AchievementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          deleteMany: {
            args: Prisma.AchievementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AchievementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AchievementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>[]
          }
          upsert: {
            args: Prisma.AchievementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AchievementPayload>
          }
          aggregate: {
            args: Prisma.AchievementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAchievement>
          }
          groupBy: {
            args: Prisma.AchievementGroupByArgs<ExtArgs>
            result: $Utils.Optional<AchievementGroupByOutputType>[]
          }
          count: {
            args: Prisma.AchievementCountArgs<ExtArgs>
            result: $Utils.Optional<AchievementCountAggregateOutputType> | number
          }
        }
      }
      Admin: {
        payload: Prisma.$AdminPayload<ExtArgs>
        fields: Prisma.AdminFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findFirst: {
            args: Prisma.AdminFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          findMany: {
            args: Prisma.AdminFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          create: {
            args: Prisma.AdminCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          createMany: {
            args: Prisma.AdminCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          delete: {
            args: Prisma.AdminDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          update: {
            args: Prisma.AdminUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          deleteMany: {
            args: Prisma.AdminDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>[]
          }
          upsert: {
            args: Prisma.AdminUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminPayload>
          }
          aggregate: {
            args: Prisma.AdminAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdmin>
          }
          groupBy: {
            args: Prisma.AdminGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminCountArgs<ExtArgs>
            result: $Utils.Optional<AdminCountAggregateOutputType> | number
          }
        }
      }
      Alumni: {
        payload: Prisma.$AlumniPayload<ExtArgs>
        fields: Prisma.AlumniFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlumniFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlumniFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          findFirst: {
            args: Prisma.AlumniFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlumniFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          findMany: {
            args: Prisma.AlumniFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>[]
          }
          create: {
            args: Prisma.AlumniCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          createMany: {
            args: Prisma.AlumniCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlumniCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>[]
          }
          delete: {
            args: Prisma.AlumniDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          update: {
            args: Prisma.AlumniUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          deleteMany: {
            args: Prisma.AlumniDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlumniUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AlumniUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>[]
          }
          upsert: {
            args: Prisma.AlumniUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlumniPayload>
          }
          aggregate: {
            args: Prisma.AlumniAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlumni>
          }
          groupBy: {
            args: Prisma.AlumniGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlumniGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlumniCountArgs<ExtArgs>
            result: $Utils.Optional<AlumniCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    internship?: InternshipOmit
    achievement?: AchievementOmit
    admin?: AdminOmit
    alumni?: AlumniOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    achievements: number
    internships: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievements?: boolean | UserCountOutputTypeCountAchievementsArgs
    internships?: boolean | UserCountOutputTypeCountInternshipsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAchievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInternshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InternshipWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    cgpa: number | null
  }

  export type UserSumAggregateOutputType = {
    cgpa: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    fullName: string | null
    legalName: string | null
    contactNo: string | null
    emailId: string | null
    password: string | null
    cgpa: number | null
    studentId: string | null
    department: string | null
    academicYear: $Enums.UserAcademicYear | null
    profilePic: string | null
    resumeUrl: string | null
    isVerified: boolean | null
    createdAt: Date | null
    socialProfile: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    fullName: string | null
    legalName: string | null
    contactNo: string | null
    emailId: string | null
    password: string | null
    cgpa: number | null
    studentId: string | null
    department: string | null
    academicYear: $Enums.UserAcademicYear | null
    profilePic: string | null
    resumeUrl: string | null
    isVerified: boolean | null
    createdAt: Date | null
    socialProfile: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    legalName: number
    contactNo: number
    emailId: number
    password: number
    cgpa: number
    studentId: number
    department: number
    academicYear: number
    skills: number
    profilePic: number
    resumeUrl: number
    isVerified: number
    createdAt: number
    socialProfile: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    cgpa?: true
  }

  export type UserSumAggregateInputType = {
    cgpa?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    legalName?: true
    contactNo?: true
    emailId?: true
    password?: true
    cgpa?: true
    studentId?: true
    department?: true
    academicYear?: true
    profilePic?: true
    resumeUrl?: true
    isVerified?: true
    createdAt?: true
    socialProfile?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    legalName?: true
    contactNo?: true
    emailId?: true
    password?: true
    cgpa?: true
    studentId?: true
    department?: true
    academicYear?: true
    profilePic?: true
    resumeUrl?: true
    isVerified?: true
    createdAt?: true
    socialProfile?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    legalName?: true
    contactNo?: true
    emailId?: true
    password?: true
    cgpa?: true
    studentId?: true
    department?: true
    academicYear?: true
    skills?: true
    profilePic?: true
    resumeUrl?: true
    isVerified?: true
    createdAt?: true
    socialProfile?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    fullName: string
    legalName: string | null
    contactNo: string | null
    emailId: string
    password: string
    cgpa: number | null
    studentId: string
    department: string | null
    academicYear: $Enums.UserAcademicYear | null
    skills: string[]
    profilePic: string | null
    resumeUrl: string | null
    isVerified: boolean
    createdAt: Date
    socialProfile: string | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    legalName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
    cgpa?: boolean
    studentId?: boolean
    department?: boolean
    academicYear?: boolean
    skills?: boolean
    profilePic?: boolean
    resumeUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    socialProfile?: boolean
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    alumni?: boolean | User$alumniArgs<ExtArgs>
    internships?: boolean | User$internshipsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    legalName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
    cgpa?: boolean
    studentId?: boolean
    department?: boolean
    academicYear?: boolean
    skills?: boolean
    profilePic?: boolean
    resumeUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    socialProfile?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    legalName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
    cgpa?: boolean
    studentId?: boolean
    department?: boolean
    academicYear?: boolean
    skills?: boolean
    profilePic?: boolean
    resumeUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    socialProfile?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    legalName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
    cgpa?: boolean
    studentId?: boolean
    department?: boolean
    academicYear?: boolean
    skills?: boolean
    profilePic?: boolean
    resumeUrl?: boolean
    isVerified?: boolean
    createdAt?: boolean
    socialProfile?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "fullName" | "legalName" | "contactNo" | "emailId" | "password" | "cgpa" | "studentId" | "department" | "academicYear" | "skills" | "profilePic" | "resumeUrl" | "isVerified" | "createdAt" | "socialProfile", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    achievements?: boolean | User$achievementsArgs<ExtArgs>
    alumni?: boolean | User$alumniArgs<ExtArgs>
    internships?: boolean | User$internshipsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      achievements: Prisma.$AchievementPayload<ExtArgs>[]
      alumni: Prisma.$AlumniPayload<ExtArgs> | null
      internships: Prisma.$InternshipPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      fullName: string
      legalName: string | null
      contactNo: string | null
      emailId: string
      password: string
      cgpa: number | null
      studentId: string
      department: string | null
      academicYear: $Enums.UserAcademicYear | null
      skills: string[]
      profilePic: string | null
      resumeUrl: string | null
      isVerified: boolean
      createdAt: Date
      socialProfile: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    achievements<T extends User$achievementsArgs<ExtArgs> = {}>(args?: Subset<T, User$achievementsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    alumni<T extends User$alumniArgs<ExtArgs> = {}>(args?: Subset<T, User$alumniArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    internships<T extends User$internshipsArgs<ExtArgs> = {}>(args?: Subset<T, User$internshipsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly legalName: FieldRef<"User", 'String'>
    readonly contactNo: FieldRef<"User", 'String'>
    readonly emailId: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly cgpa: FieldRef<"User", 'Float'>
    readonly studentId: FieldRef<"User", 'String'>
    readonly department: FieldRef<"User", 'String'>
    readonly academicYear: FieldRef<"User", 'UserAcademicYear'>
    readonly skills: FieldRef<"User", 'String[]'>
    readonly profilePic: FieldRef<"User", 'String'>
    readonly resumeUrl: FieldRef<"User", 'String'>
    readonly isVerified: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly socialProfile: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.achievements
   */
  export type User$achievementsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    cursor?: AchievementWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * User.alumni
   */
  export type User$alumniArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    where?: AlumniWhereInput
  }

  /**
   * User.internships
   */
  export type User$internshipsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    where?: InternshipWhereInput
    orderBy?: InternshipOrderByWithRelationInput | InternshipOrderByWithRelationInput[]
    cursor?: InternshipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InternshipScalarFieldEnum | InternshipScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Internship
   */

  export type AggregateInternship = {
    _count: InternshipCountAggregateOutputType | null
    _min: InternshipMinAggregateOutputType | null
    _max: InternshipMaxAggregateOutputType | null
  }

  export type InternshipMinAggregateOutputType = {
    id: string | null
    title: string | null
    companyName: string | null
    duration: string | null
    studentId: string | null
  }

  export type InternshipMaxAggregateOutputType = {
    id: string | null
    title: string | null
    companyName: string | null
    duration: string | null
    studentId: string | null
  }

  export type InternshipCountAggregateOutputType = {
    id: number
    title: number
    companyName: number
    duration: number
    studentId: number
    _all: number
  }


  export type InternshipMinAggregateInputType = {
    id?: true
    title?: true
    companyName?: true
    duration?: true
    studentId?: true
  }

  export type InternshipMaxAggregateInputType = {
    id?: true
    title?: true
    companyName?: true
    duration?: true
    studentId?: true
  }

  export type InternshipCountAggregateInputType = {
    id?: true
    title?: true
    companyName?: true
    duration?: true
    studentId?: true
    _all?: true
  }

  export type InternshipAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Internship to aggregate.
     */
    where?: InternshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Internships to fetch.
     */
    orderBy?: InternshipOrderByWithRelationInput | InternshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InternshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Internships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Internships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Internships
    **/
    _count?: true | InternshipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InternshipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InternshipMaxAggregateInputType
  }

  export type GetInternshipAggregateType<T extends InternshipAggregateArgs> = {
        [P in keyof T & keyof AggregateInternship]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInternship[P]>
      : GetScalarType<T[P], AggregateInternship[P]>
  }




  export type InternshipGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InternshipWhereInput
    orderBy?: InternshipOrderByWithAggregationInput | InternshipOrderByWithAggregationInput[]
    by: InternshipScalarFieldEnum[] | InternshipScalarFieldEnum
    having?: InternshipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InternshipCountAggregateInputType | true
    _min?: InternshipMinAggregateInputType
    _max?: InternshipMaxAggregateInputType
  }

  export type InternshipGroupByOutputType = {
    id: string
    title: string | null
    companyName: string | null
    duration: string | null
    studentId: string | null
    _count: InternshipCountAggregateOutputType | null
    _min: InternshipMinAggregateOutputType | null
    _max: InternshipMaxAggregateOutputType | null
  }

  type GetInternshipGroupByPayload<T extends InternshipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InternshipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InternshipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InternshipGroupByOutputType[P]>
            : GetScalarType<T[P], InternshipGroupByOutputType[P]>
        }
      >
    >


  export type InternshipSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    companyName?: boolean
    duration?: boolean
    studentId?: boolean
    student?: boolean | Internship$studentArgs<ExtArgs>
  }, ExtArgs["result"]["internship"]>

  export type InternshipSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    companyName?: boolean
    duration?: boolean
    studentId?: boolean
    student?: boolean | Internship$studentArgs<ExtArgs>
  }, ExtArgs["result"]["internship"]>

  export type InternshipSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    companyName?: boolean
    duration?: boolean
    studentId?: boolean
    student?: boolean | Internship$studentArgs<ExtArgs>
  }, ExtArgs["result"]["internship"]>

  export type InternshipSelectScalar = {
    id?: boolean
    title?: boolean
    companyName?: boolean
    duration?: boolean
    studentId?: boolean
  }

  export type InternshipOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "companyName" | "duration" | "studentId", ExtArgs["result"]["internship"]>
  export type InternshipInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Internship$studentArgs<ExtArgs>
  }
  export type InternshipIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Internship$studentArgs<ExtArgs>
  }
  export type InternshipIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Internship$studentArgs<ExtArgs>
  }

  export type $InternshipPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Internship"
    objects: {
      student: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string | null
      companyName: string | null
      duration: string | null
      studentId: string | null
    }, ExtArgs["result"]["internship"]>
    composites: {}
  }

  type InternshipGetPayload<S extends boolean | null | undefined | InternshipDefaultArgs> = $Result.GetResult<Prisma.$InternshipPayload, S>

  type InternshipCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InternshipFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InternshipCountAggregateInputType | true
    }

  export interface InternshipDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Internship'], meta: { name: 'Internship' } }
    /**
     * Find zero or one Internship that matches the filter.
     * @param {InternshipFindUniqueArgs} args - Arguments to find a Internship
     * @example
     * // Get one Internship
     * const internship = await prisma.internship.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InternshipFindUniqueArgs>(args: SelectSubset<T, InternshipFindUniqueArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Internship that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InternshipFindUniqueOrThrowArgs} args - Arguments to find a Internship
     * @example
     * // Get one Internship
     * const internship = await prisma.internship.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InternshipFindUniqueOrThrowArgs>(args: SelectSubset<T, InternshipFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Internship that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternshipFindFirstArgs} args - Arguments to find a Internship
     * @example
     * // Get one Internship
     * const internship = await prisma.internship.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InternshipFindFirstArgs>(args?: SelectSubset<T, InternshipFindFirstArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Internship that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternshipFindFirstOrThrowArgs} args - Arguments to find a Internship
     * @example
     * // Get one Internship
     * const internship = await prisma.internship.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InternshipFindFirstOrThrowArgs>(args?: SelectSubset<T, InternshipFindFirstOrThrowArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Internships that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternshipFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Internships
     * const internships = await prisma.internship.findMany()
     * 
     * // Get first 10 Internships
     * const internships = await prisma.internship.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const internshipWithIdOnly = await prisma.internship.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InternshipFindManyArgs>(args?: SelectSubset<T, InternshipFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Internship.
     * @param {InternshipCreateArgs} args - Arguments to create a Internship.
     * @example
     * // Create one Internship
     * const Internship = await prisma.internship.create({
     *   data: {
     *     // ... data to create a Internship
     *   }
     * })
     * 
     */
    create<T extends InternshipCreateArgs>(args: SelectSubset<T, InternshipCreateArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Internships.
     * @param {InternshipCreateManyArgs} args - Arguments to create many Internships.
     * @example
     * // Create many Internships
     * const internship = await prisma.internship.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InternshipCreateManyArgs>(args?: SelectSubset<T, InternshipCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Internships and returns the data saved in the database.
     * @param {InternshipCreateManyAndReturnArgs} args - Arguments to create many Internships.
     * @example
     * // Create many Internships
     * const internship = await prisma.internship.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Internships and only return the `id`
     * const internshipWithIdOnly = await prisma.internship.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InternshipCreateManyAndReturnArgs>(args?: SelectSubset<T, InternshipCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Internship.
     * @param {InternshipDeleteArgs} args - Arguments to delete one Internship.
     * @example
     * // Delete one Internship
     * const Internship = await prisma.internship.delete({
     *   where: {
     *     // ... filter to delete one Internship
     *   }
     * })
     * 
     */
    delete<T extends InternshipDeleteArgs>(args: SelectSubset<T, InternshipDeleteArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Internship.
     * @param {InternshipUpdateArgs} args - Arguments to update one Internship.
     * @example
     * // Update one Internship
     * const internship = await prisma.internship.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InternshipUpdateArgs>(args: SelectSubset<T, InternshipUpdateArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Internships.
     * @param {InternshipDeleteManyArgs} args - Arguments to filter Internships to delete.
     * @example
     * // Delete a few Internships
     * const { count } = await prisma.internship.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InternshipDeleteManyArgs>(args?: SelectSubset<T, InternshipDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Internships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternshipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Internships
     * const internship = await prisma.internship.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InternshipUpdateManyArgs>(args: SelectSubset<T, InternshipUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Internships and returns the data updated in the database.
     * @param {InternshipUpdateManyAndReturnArgs} args - Arguments to update many Internships.
     * @example
     * // Update many Internships
     * const internship = await prisma.internship.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Internships and only return the `id`
     * const internshipWithIdOnly = await prisma.internship.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InternshipUpdateManyAndReturnArgs>(args: SelectSubset<T, InternshipUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Internship.
     * @param {InternshipUpsertArgs} args - Arguments to update or create a Internship.
     * @example
     * // Update or create a Internship
     * const internship = await prisma.internship.upsert({
     *   create: {
     *     // ... data to create a Internship
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Internship we want to update
     *   }
     * })
     */
    upsert<T extends InternshipUpsertArgs>(args: SelectSubset<T, InternshipUpsertArgs<ExtArgs>>): Prisma__InternshipClient<$Result.GetResult<Prisma.$InternshipPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Internships.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternshipCountArgs} args - Arguments to filter Internships to count.
     * @example
     * // Count the number of Internships
     * const count = await prisma.internship.count({
     *   where: {
     *     // ... the filter for the Internships we want to count
     *   }
     * })
    **/
    count<T extends InternshipCountArgs>(
      args?: Subset<T, InternshipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InternshipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Internship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternshipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InternshipAggregateArgs>(args: Subset<T, InternshipAggregateArgs>): Prisma.PrismaPromise<GetInternshipAggregateType<T>>

    /**
     * Group by Internship.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternshipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InternshipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InternshipGroupByArgs['orderBy'] }
        : { orderBy?: InternshipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InternshipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInternshipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Internship model
   */
  readonly fields: InternshipFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Internship.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InternshipClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends Internship$studentArgs<ExtArgs> = {}>(args?: Subset<T, Internship$studentArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Internship model
   */
  interface InternshipFieldRefs {
    readonly id: FieldRef<"Internship", 'String'>
    readonly title: FieldRef<"Internship", 'String'>
    readonly companyName: FieldRef<"Internship", 'String'>
    readonly duration: FieldRef<"Internship", 'String'>
    readonly studentId: FieldRef<"Internship", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Internship findUnique
   */
  export type InternshipFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * Filter, which Internship to fetch.
     */
    where: InternshipWhereUniqueInput
  }

  /**
   * Internship findUniqueOrThrow
   */
  export type InternshipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * Filter, which Internship to fetch.
     */
    where: InternshipWhereUniqueInput
  }

  /**
   * Internship findFirst
   */
  export type InternshipFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * Filter, which Internship to fetch.
     */
    where?: InternshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Internships to fetch.
     */
    orderBy?: InternshipOrderByWithRelationInput | InternshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Internships.
     */
    cursor?: InternshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Internships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Internships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Internships.
     */
    distinct?: InternshipScalarFieldEnum | InternshipScalarFieldEnum[]
  }

  /**
   * Internship findFirstOrThrow
   */
  export type InternshipFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * Filter, which Internship to fetch.
     */
    where?: InternshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Internships to fetch.
     */
    orderBy?: InternshipOrderByWithRelationInput | InternshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Internships.
     */
    cursor?: InternshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Internships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Internships.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Internships.
     */
    distinct?: InternshipScalarFieldEnum | InternshipScalarFieldEnum[]
  }

  /**
   * Internship findMany
   */
  export type InternshipFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * Filter, which Internships to fetch.
     */
    where?: InternshipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Internships to fetch.
     */
    orderBy?: InternshipOrderByWithRelationInput | InternshipOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Internships.
     */
    cursor?: InternshipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Internships from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Internships.
     */
    skip?: number
    distinct?: InternshipScalarFieldEnum | InternshipScalarFieldEnum[]
  }

  /**
   * Internship create
   */
  export type InternshipCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * The data needed to create a Internship.
     */
    data?: XOR<InternshipCreateInput, InternshipUncheckedCreateInput>
  }

  /**
   * Internship createMany
   */
  export type InternshipCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Internships.
     */
    data: InternshipCreateManyInput | InternshipCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Internship createManyAndReturn
   */
  export type InternshipCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * The data used to create many Internships.
     */
    data: InternshipCreateManyInput | InternshipCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Internship update
   */
  export type InternshipUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * The data needed to update a Internship.
     */
    data: XOR<InternshipUpdateInput, InternshipUncheckedUpdateInput>
    /**
     * Choose, which Internship to update.
     */
    where: InternshipWhereUniqueInput
  }

  /**
   * Internship updateMany
   */
  export type InternshipUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Internships.
     */
    data: XOR<InternshipUpdateManyMutationInput, InternshipUncheckedUpdateManyInput>
    /**
     * Filter which Internships to update
     */
    where?: InternshipWhereInput
    /**
     * Limit how many Internships to update.
     */
    limit?: number
  }

  /**
   * Internship updateManyAndReturn
   */
  export type InternshipUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * The data used to update Internships.
     */
    data: XOR<InternshipUpdateManyMutationInput, InternshipUncheckedUpdateManyInput>
    /**
     * Filter which Internships to update
     */
    where?: InternshipWhereInput
    /**
     * Limit how many Internships to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Internship upsert
   */
  export type InternshipUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * The filter to search for the Internship to update in case it exists.
     */
    where: InternshipWhereUniqueInput
    /**
     * In case the Internship found by the `where` argument doesn't exist, create a new Internship with this data.
     */
    create: XOR<InternshipCreateInput, InternshipUncheckedCreateInput>
    /**
     * In case the Internship was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InternshipUpdateInput, InternshipUncheckedUpdateInput>
  }

  /**
   * Internship delete
   */
  export type InternshipDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
    /**
     * Filter which Internship to delete.
     */
    where: InternshipWhereUniqueInput
  }

  /**
   * Internship deleteMany
   */
  export type InternshipDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Internships to delete
     */
    where?: InternshipWhereInput
    /**
     * Limit how many Internships to delete.
     */
    limit?: number
  }

  /**
   * Internship.student
   */
  export type Internship$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Internship without action
   */
  export type InternshipDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Internship
     */
    select?: InternshipSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Internship
     */
    omit?: InternshipOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InternshipInclude<ExtArgs> | null
  }


  /**
   * Model Achievement
   */

  export type AggregateAchievement = {
    _count: AchievementCountAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  export type AchievementMinAggregateOutputType = {
    id: string | null
    title: string | null
    details: string | null
    time: Date | null
    studentId: string | null
  }

  export type AchievementMaxAggregateOutputType = {
    id: string | null
    title: string | null
    details: string | null
    time: Date | null
    studentId: string | null
  }

  export type AchievementCountAggregateOutputType = {
    id: number
    title: number
    details: number
    time: number
    studentId: number
    _all: number
  }


  export type AchievementMinAggregateInputType = {
    id?: true
    title?: true
    details?: true
    time?: true
    studentId?: true
  }

  export type AchievementMaxAggregateInputType = {
    id?: true
    title?: true
    details?: true
    time?: true
    studentId?: true
  }

  export type AchievementCountAggregateInputType = {
    id?: true
    title?: true
    details?: true
    time?: true
    studentId?: true
    _all?: true
  }

  export type AchievementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievement to aggregate.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Achievements
    **/
    _count?: true | AchievementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AchievementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AchievementMaxAggregateInputType
  }

  export type GetAchievementAggregateType<T extends AchievementAggregateArgs> = {
        [P in keyof T & keyof AggregateAchievement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAchievement[P]>
      : GetScalarType<T[P], AggregateAchievement[P]>
  }




  export type AchievementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AchievementWhereInput
    orderBy?: AchievementOrderByWithAggregationInput | AchievementOrderByWithAggregationInput[]
    by: AchievementScalarFieldEnum[] | AchievementScalarFieldEnum
    having?: AchievementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AchievementCountAggregateInputType | true
    _min?: AchievementMinAggregateInputType
    _max?: AchievementMaxAggregateInputType
  }

  export type AchievementGroupByOutputType = {
    id: string
    title: string | null
    details: string | null
    time: Date | null
    studentId: string
    _count: AchievementCountAggregateOutputType | null
    _min: AchievementMinAggregateOutputType | null
    _max: AchievementMaxAggregateOutputType | null
  }

  type GetAchievementGroupByPayload<T extends AchievementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AchievementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AchievementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AchievementGroupByOutputType[P]>
            : GetScalarType<T[P], AchievementGroupByOutputType[P]>
        }
      >
    >


  export type AchievementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    details?: boolean
    time?: boolean
    studentId?: boolean
    student?: boolean | Achievement$studentArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    details?: boolean
    time?: boolean
    studentId?: boolean
    student?: boolean | Achievement$studentArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    details?: boolean
    time?: boolean
    studentId?: boolean
    student?: boolean | Achievement$studentArgs<ExtArgs>
  }, ExtArgs["result"]["achievement"]>

  export type AchievementSelectScalar = {
    id?: boolean
    title?: boolean
    details?: boolean
    time?: boolean
    studentId?: boolean
  }

  export type AchievementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "details" | "time" | "studentId", ExtArgs["result"]["achievement"]>
  export type AchievementInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Achievement$studentArgs<ExtArgs>
  }
  export type AchievementIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Achievement$studentArgs<ExtArgs>
  }
  export type AchievementIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Achievement$studentArgs<ExtArgs>
  }

  export type $AchievementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Achievement"
    objects: {
      student: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string | null
      details: string | null
      time: Date | null
      studentId: string
    }, ExtArgs["result"]["achievement"]>
    composites: {}
  }

  type AchievementGetPayload<S extends boolean | null | undefined | AchievementDefaultArgs> = $Result.GetResult<Prisma.$AchievementPayload, S>

  type AchievementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AchievementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AchievementCountAggregateInputType | true
    }

  export interface AchievementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Achievement'], meta: { name: 'Achievement' } }
    /**
     * Find zero or one Achievement that matches the filter.
     * @param {AchievementFindUniqueArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AchievementFindUniqueArgs>(args: SelectSubset<T, AchievementFindUniqueArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Achievement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AchievementFindUniqueOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AchievementFindUniqueOrThrowArgs>(args: SelectSubset<T, AchievementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AchievementFindFirstArgs>(args?: SelectSubset<T, AchievementFindFirstArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Achievement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindFirstOrThrowArgs} args - Arguments to find a Achievement
     * @example
     * // Get one Achievement
     * const achievement = await prisma.achievement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AchievementFindFirstOrThrowArgs>(args?: SelectSubset<T, AchievementFindFirstOrThrowArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Achievements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Achievements
     * const achievements = await prisma.achievement.findMany()
     * 
     * // Get first 10 Achievements
     * const achievements = await prisma.achievement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const achievementWithIdOnly = await prisma.achievement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AchievementFindManyArgs>(args?: SelectSubset<T, AchievementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Achievement.
     * @param {AchievementCreateArgs} args - Arguments to create a Achievement.
     * @example
     * // Create one Achievement
     * const Achievement = await prisma.achievement.create({
     *   data: {
     *     // ... data to create a Achievement
     *   }
     * })
     * 
     */
    create<T extends AchievementCreateArgs>(args: SelectSubset<T, AchievementCreateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Achievements.
     * @param {AchievementCreateManyArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AchievementCreateManyArgs>(args?: SelectSubset<T, AchievementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Achievements and returns the data saved in the database.
     * @param {AchievementCreateManyAndReturnArgs} args - Arguments to create many Achievements.
     * @example
     * // Create many Achievements
     * const achievement = await prisma.achievement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AchievementCreateManyAndReturnArgs>(args?: SelectSubset<T, AchievementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Achievement.
     * @param {AchievementDeleteArgs} args - Arguments to delete one Achievement.
     * @example
     * // Delete one Achievement
     * const Achievement = await prisma.achievement.delete({
     *   where: {
     *     // ... filter to delete one Achievement
     *   }
     * })
     * 
     */
    delete<T extends AchievementDeleteArgs>(args: SelectSubset<T, AchievementDeleteArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Achievement.
     * @param {AchievementUpdateArgs} args - Arguments to update one Achievement.
     * @example
     * // Update one Achievement
     * const achievement = await prisma.achievement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AchievementUpdateArgs>(args: SelectSubset<T, AchievementUpdateArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Achievements.
     * @param {AchievementDeleteManyArgs} args - Arguments to filter Achievements to delete.
     * @example
     * // Delete a few Achievements
     * const { count } = await prisma.achievement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AchievementDeleteManyArgs>(args?: SelectSubset<T, AchievementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AchievementUpdateManyArgs>(args: SelectSubset<T, AchievementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Achievements and returns the data updated in the database.
     * @param {AchievementUpdateManyAndReturnArgs} args - Arguments to update many Achievements.
     * @example
     * // Update many Achievements
     * const achievement = await prisma.achievement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Achievements and only return the `id`
     * const achievementWithIdOnly = await prisma.achievement.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AchievementUpdateManyAndReturnArgs>(args: SelectSubset<T, AchievementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Achievement.
     * @param {AchievementUpsertArgs} args - Arguments to update or create a Achievement.
     * @example
     * // Update or create a Achievement
     * const achievement = await prisma.achievement.upsert({
     *   create: {
     *     // ... data to create a Achievement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Achievement we want to update
     *   }
     * })
     */
    upsert<T extends AchievementUpsertArgs>(args: SelectSubset<T, AchievementUpsertArgs<ExtArgs>>): Prisma__AchievementClient<$Result.GetResult<Prisma.$AchievementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Achievements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementCountArgs} args - Arguments to filter Achievements to count.
     * @example
     * // Count the number of Achievements
     * const count = await prisma.achievement.count({
     *   where: {
     *     // ... the filter for the Achievements we want to count
     *   }
     * })
    **/
    count<T extends AchievementCountArgs>(
      args?: Subset<T, AchievementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AchievementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AchievementAggregateArgs>(args: Subset<T, AchievementAggregateArgs>): Prisma.PrismaPromise<GetAchievementAggregateType<T>>

    /**
     * Group by Achievement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AchievementGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AchievementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AchievementGroupByArgs['orderBy'] }
        : { orderBy?: AchievementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AchievementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAchievementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Achievement model
   */
  readonly fields: AchievementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Achievement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AchievementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends Achievement$studentArgs<ExtArgs> = {}>(args?: Subset<T, Achievement$studentArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Achievement model
   */
  interface AchievementFieldRefs {
    readonly id: FieldRef<"Achievement", 'String'>
    readonly title: FieldRef<"Achievement", 'String'>
    readonly details: FieldRef<"Achievement", 'String'>
    readonly time: FieldRef<"Achievement", 'DateTime'>
    readonly studentId: FieldRef<"Achievement", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Achievement findUnique
   */
  export type AchievementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findUniqueOrThrow
   */
  export type AchievementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement findFirst
   */
  export type AchievementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findFirstOrThrow
   */
  export type AchievementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievement to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Achievements.
     */
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement findMany
   */
  export type AchievementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter, which Achievements to fetch.
     */
    where?: AchievementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Achievements to fetch.
     */
    orderBy?: AchievementOrderByWithRelationInput | AchievementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Achievements.
     */
    cursor?: AchievementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Achievements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Achievements.
     */
    skip?: number
    distinct?: AchievementScalarFieldEnum | AchievementScalarFieldEnum[]
  }

  /**
   * Achievement create
   */
  export type AchievementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to create a Achievement.
     */
    data: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
  }

  /**
   * Achievement createMany
   */
  export type AchievementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Achievement createManyAndReturn
   */
  export type AchievementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to create many Achievements.
     */
    data: AchievementCreateManyInput | AchievementCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Achievement update
   */
  export type AchievementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The data needed to update a Achievement.
     */
    data: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
    /**
     * Choose, which Achievement to update.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement updateMany
   */
  export type AchievementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
  }

  /**
   * Achievement updateManyAndReturn
   */
  export type AchievementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * The data used to update Achievements.
     */
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyInput>
    /**
     * Filter which Achievements to update
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Achievement upsert
   */
  export type AchievementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * The filter to search for the Achievement to update in case it exists.
     */
    where: AchievementWhereUniqueInput
    /**
     * In case the Achievement found by the `where` argument doesn't exist, create a new Achievement with this data.
     */
    create: XOR<AchievementCreateInput, AchievementUncheckedCreateInput>
    /**
     * In case the Achievement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AchievementUpdateInput, AchievementUncheckedUpdateInput>
  }

  /**
   * Achievement delete
   */
  export type AchievementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
    /**
     * Filter which Achievement to delete.
     */
    where: AchievementWhereUniqueInput
  }

  /**
   * Achievement deleteMany
   */
  export type AchievementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Achievements to delete
     */
    where?: AchievementWhereInput
    /**
     * Limit how many Achievements to delete.
     */
    limit?: number
  }

  /**
   * Achievement.student
   */
  export type Achievement$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Achievement without action
   */
  export type AchievementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Achievement
     */
    select?: AchievementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Achievement
     */
    omit?: AchievementOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AchievementInclude<ExtArgs> | null
  }


  /**
   * Model Admin
   */

  export type AggregateAdmin = {
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  export type AdminMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    contactNo: string | null
    emailId: string | null
    password: string | null
  }

  export type AdminMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    contactNo: string | null
    emailId: string | null
    password: string | null
  }

  export type AdminCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    contactNo: number
    emailId: number
    password: number
    _all: number
  }


  export type AdminMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    contactNo?: true
    emailId?: true
    password?: true
  }

  export type AdminMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    contactNo?: true
    emailId?: true
    password?: true
  }

  export type AdminCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    contactNo?: true
    emailId?: true
    password?: true
    _all?: true
  }

  export type AdminAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admin to aggregate.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Admins
    **/
    _count?: true | AdminCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminMaxAggregateInputType
  }

  export type GetAdminAggregateType<T extends AdminAggregateArgs> = {
        [P in keyof T & keyof AggregateAdmin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdmin[P]>
      : GetScalarType<T[P], AggregateAdmin[P]>
  }




  export type AdminGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminWhereInput
    orderBy?: AdminOrderByWithAggregationInput | AdminOrderByWithAggregationInput[]
    by: AdminScalarFieldEnum[] | AdminScalarFieldEnum
    having?: AdminScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminCountAggregateInputType | true
    _min?: AdminMinAggregateInputType
    _max?: AdminMaxAggregateInputType
  }

  export type AdminGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    contactNo: string
    emailId: string
    password: string
    _count: AdminCountAggregateOutputType | null
    _min: AdminMinAggregateOutputType | null
    _max: AdminMaxAggregateOutputType | null
  }

  type GetAdminGroupByPayload<T extends AdminGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminGroupByOutputType[P]>
            : GetScalarType<T[P], AdminGroupByOutputType[P]>
        }
      >
    >


  export type AdminSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
  }, ExtArgs["result"]["admin"]>

  export type AdminSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    contactNo?: boolean
    emailId?: boolean
    password?: boolean
  }

  export type AdminOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "contactNo" | "emailId" | "password", ExtArgs["result"]["admin"]>

  export type $AdminPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Admin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      contactNo: string
      emailId: string
      password: string
    }, ExtArgs["result"]["admin"]>
    composites: {}
  }

  type AdminGetPayload<S extends boolean | null | undefined | AdminDefaultArgs> = $Result.GetResult<Prisma.$AdminPayload, S>

  type AdminCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminCountAggregateInputType | true
    }

  export interface AdminDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Admin'], meta: { name: 'Admin' } }
    /**
     * Find zero or one Admin that matches the filter.
     * @param {AdminFindUniqueArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminFindUniqueArgs>(args: SelectSubset<T, AdminFindUniqueArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Admin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminFindUniqueOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminFindFirstArgs>(args?: SelectSubset<T, AdminFindFirstArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Admin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindFirstOrThrowArgs} args - Arguments to find a Admin
     * @example
     * // Get one Admin
     * const admin = await prisma.admin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Admins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Admins
     * const admins = await prisma.admin.findMany()
     * 
     * // Get first 10 Admins
     * const admins = await prisma.admin.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminWithIdOnly = await prisma.admin.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminFindManyArgs>(args?: SelectSubset<T, AdminFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Admin.
     * @param {AdminCreateArgs} args - Arguments to create a Admin.
     * @example
     * // Create one Admin
     * const Admin = await prisma.admin.create({
     *   data: {
     *     // ... data to create a Admin
     *   }
     * })
     * 
     */
    create<T extends AdminCreateArgs>(args: SelectSubset<T, AdminCreateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Admins.
     * @param {AdminCreateManyArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminCreateManyArgs>(args?: SelectSubset<T, AdminCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Admins and returns the data saved in the database.
     * @param {AdminCreateManyAndReturnArgs} args - Arguments to create many Admins.
     * @example
     * // Create many Admins
     * const admin = await prisma.admin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Admin.
     * @param {AdminDeleteArgs} args - Arguments to delete one Admin.
     * @example
     * // Delete one Admin
     * const Admin = await prisma.admin.delete({
     *   where: {
     *     // ... filter to delete one Admin
     *   }
     * })
     * 
     */
    delete<T extends AdminDeleteArgs>(args: SelectSubset<T, AdminDeleteArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Admin.
     * @param {AdminUpdateArgs} args - Arguments to update one Admin.
     * @example
     * // Update one Admin
     * const admin = await prisma.admin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminUpdateArgs>(args: SelectSubset<T, AdminUpdateArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Admins.
     * @param {AdminDeleteManyArgs} args - Arguments to filter Admins to delete.
     * @example
     * // Delete a few Admins
     * const { count } = await prisma.admin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminDeleteManyArgs>(args?: SelectSubset<T, AdminDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminUpdateManyArgs>(args: SelectSubset<T, AdminUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Admins and returns the data updated in the database.
     * @param {AdminUpdateManyAndReturnArgs} args - Arguments to update many Admins.
     * @example
     * // Update many Admins
     * const admin = await prisma.admin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Admins and only return the `id`
     * const adminWithIdOnly = await prisma.admin.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Admin.
     * @param {AdminUpsertArgs} args - Arguments to update or create a Admin.
     * @example
     * // Update or create a Admin
     * const admin = await prisma.admin.upsert({
     *   create: {
     *     // ... data to create a Admin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Admin we want to update
     *   }
     * })
     */
    upsert<T extends AdminUpsertArgs>(args: SelectSubset<T, AdminUpsertArgs<ExtArgs>>): Prisma__AdminClient<$Result.GetResult<Prisma.$AdminPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Admins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminCountArgs} args - Arguments to filter Admins to count.
     * @example
     * // Count the number of Admins
     * const count = await prisma.admin.count({
     *   where: {
     *     // ... the filter for the Admins we want to count
     *   }
     * })
    **/
    count<T extends AdminCountArgs>(
      args?: Subset<T, AdminCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminAggregateArgs>(args: Subset<T, AdminAggregateArgs>): Prisma.PrismaPromise<GetAdminAggregateType<T>>

    /**
     * Group by Admin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminGroupByArgs['orderBy'] }
        : { orderBy?: AdminGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Admin model
   */
  readonly fields: AdminFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Admin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Admin model
   */
  interface AdminFieldRefs {
    readonly id: FieldRef<"Admin", 'String'>
    readonly firstName: FieldRef<"Admin", 'String'>
    readonly lastName: FieldRef<"Admin", 'String'>
    readonly contactNo: FieldRef<"Admin", 'String'>
    readonly emailId: FieldRef<"Admin", 'String'>
    readonly password: FieldRef<"Admin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Admin findUnique
   */
  export type AdminFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findUniqueOrThrow
   */
  export type AdminFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin findFirst
   */
  export type AdminFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findFirstOrThrow
   */
  export type AdminFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admin to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Admins.
     */
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin findMany
   */
  export type AdminFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter, which Admins to fetch.
     */
    where?: AdminWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Admins to fetch.
     */
    orderBy?: AdminOrderByWithRelationInput | AdminOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Admins.
     */
    cursor?: AdminWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Admins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Admins.
     */
    skip?: number
    distinct?: AdminScalarFieldEnum | AdminScalarFieldEnum[]
  }

  /**
   * Admin create
   */
  export type AdminCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to create a Admin.
     */
    data: XOR<AdminCreateInput, AdminUncheckedCreateInput>
  }

  /**
   * Admin createMany
   */
  export type AdminCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin createManyAndReturn
   */
  export type AdminCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to create many Admins.
     */
    data: AdminCreateManyInput | AdminCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Admin update
   */
  export type AdminUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data needed to update a Admin.
     */
    data: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
    /**
     * Choose, which Admin to update.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin updateMany
   */
  export type AdminUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin updateManyAndReturn
   */
  export type AdminUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The data used to update Admins.
     */
    data: XOR<AdminUpdateManyMutationInput, AdminUncheckedUpdateManyInput>
    /**
     * Filter which Admins to update
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to update.
     */
    limit?: number
  }

  /**
   * Admin upsert
   */
  export type AdminUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * The filter to search for the Admin to update in case it exists.
     */
    where: AdminWhereUniqueInput
    /**
     * In case the Admin found by the `where` argument doesn't exist, create a new Admin with this data.
     */
    create: XOR<AdminCreateInput, AdminUncheckedCreateInput>
    /**
     * In case the Admin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminUpdateInput, AdminUncheckedUpdateInput>
  }

  /**
   * Admin delete
   */
  export type AdminDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
    /**
     * Filter which Admin to delete.
     */
    where: AdminWhereUniqueInput
  }

  /**
   * Admin deleteMany
   */
  export type AdminDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Admins to delete
     */
    where?: AdminWhereInput
    /**
     * Limit how many Admins to delete.
     */
    limit?: number
  }

  /**
   * Admin without action
   */
  export type AdminDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Admin
     */
    select?: AdminSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Admin
     */
    omit?: AdminOmit<ExtArgs> | null
  }


  /**
   * Model Alumni
   */

  export type AggregateAlumni = {
    _count: AlumniCountAggregateOutputType | null
    _min: AlumniMinAggregateOutputType | null
    _max: AlumniMaxAggregateOutputType | null
  }

  export type AlumniMinAggregateOutputType = {
    id: string | null
    placedBy: string | null
    package: string | null
  }

  export type AlumniMaxAggregateOutputType = {
    id: string | null
    placedBy: string | null
    package: string | null
  }

  export type AlumniCountAggregateOutputType = {
    id: number
    placedBy: number
    pastOrg: number
    currentOrg: number
    package: number
    _all: number
  }


  export type AlumniMinAggregateInputType = {
    id?: true
    placedBy?: true
    package?: true
  }

  export type AlumniMaxAggregateInputType = {
    id?: true
    placedBy?: true
    package?: true
  }

  export type AlumniCountAggregateInputType = {
    id?: true
    placedBy?: true
    pastOrg?: true
    currentOrg?: true
    package?: true
    _all?: true
  }

  export type AlumniAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alumni to aggregate.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alumni
    **/
    _count?: true | AlumniCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlumniMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlumniMaxAggregateInputType
  }

  export type GetAlumniAggregateType<T extends AlumniAggregateArgs> = {
        [P in keyof T & keyof AggregateAlumni]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlumni[P]>
      : GetScalarType<T[P], AggregateAlumni[P]>
  }




  export type AlumniGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlumniWhereInput
    orderBy?: AlumniOrderByWithAggregationInput | AlumniOrderByWithAggregationInput[]
    by: AlumniScalarFieldEnum[] | AlumniScalarFieldEnum
    having?: AlumniScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlumniCountAggregateInputType | true
    _min?: AlumniMinAggregateInputType
    _max?: AlumniMaxAggregateInputType
  }

  export type AlumniGroupByOutputType = {
    id: string
    placedBy: string
    pastOrg: string[]
    currentOrg: string[]
    package: string
    _count: AlumniCountAggregateOutputType | null
    _min: AlumniMinAggregateOutputType | null
    _max: AlumniMaxAggregateOutputType | null
  }

  type GetAlumniGroupByPayload<T extends AlumniGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlumniGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlumniGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlumniGroupByOutputType[P]>
            : GetScalarType<T[P], AlumniGroupByOutputType[P]>
        }
      >
    >


  export type AlumniSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placedBy?: boolean
    pastOrg?: boolean
    currentOrg?: boolean
    package?: boolean
    student?: boolean | Alumni$studentArgs<ExtArgs>
  }, ExtArgs["result"]["alumni"]>

  export type AlumniSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placedBy?: boolean
    pastOrg?: boolean
    currentOrg?: boolean
    package?: boolean
    student?: boolean | Alumni$studentArgs<ExtArgs>
  }, ExtArgs["result"]["alumni"]>

  export type AlumniSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    placedBy?: boolean
    pastOrg?: boolean
    currentOrg?: boolean
    package?: boolean
    student?: boolean | Alumni$studentArgs<ExtArgs>
  }, ExtArgs["result"]["alumni"]>

  export type AlumniSelectScalar = {
    id?: boolean
    placedBy?: boolean
    pastOrg?: boolean
    currentOrg?: boolean
    package?: boolean
  }

  export type AlumniOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "placedBy" | "pastOrg" | "currentOrg" | "package", ExtArgs["result"]["alumni"]>
  export type AlumniInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Alumni$studentArgs<ExtArgs>
  }
  export type AlumniIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Alumni$studentArgs<ExtArgs>
  }
  export type AlumniIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | Alumni$studentArgs<ExtArgs>
  }

  export type $AlumniPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alumni"
    objects: {
      student: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      placedBy: string
      pastOrg: string[]
      currentOrg: string[]
      package: string
    }, ExtArgs["result"]["alumni"]>
    composites: {}
  }

  type AlumniGetPayload<S extends boolean | null | undefined | AlumniDefaultArgs> = $Result.GetResult<Prisma.$AlumniPayload, S>

  type AlumniCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AlumniFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AlumniCountAggregateInputType | true
    }

  export interface AlumniDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alumni'], meta: { name: 'Alumni' } }
    /**
     * Find zero or one Alumni that matches the filter.
     * @param {AlumniFindUniqueArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlumniFindUniqueArgs>(args: SelectSubset<T, AlumniFindUniqueArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Alumni that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AlumniFindUniqueOrThrowArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlumniFindUniqueOrThrowArgs>(args: SelectSubset<T, AlumniFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alumni that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniFindFirstArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlumniFindFirstArgs>(args?: SelectSubset<T, AlumniFindFirstArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Alumni that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniFindFirstOrThrowArgs} args - Arguments to find a Alumni
     * @example
     * // Get one Alumni
     * const alumni = await prisma.alumni.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlumniFindFirstOrThrowArgs>(args?: SelectSubset<T, AlumniFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Alumni that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alumni
     * const alumni = await prisma.alumni.findMany()
     * 
     * // Get first 10 Alumni
     * const alumni = await prisma.alumni.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alumniWithIdOnly = await prisma.alumni.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlumniFindManyArgs>(args?: SelectSubset<T, AlumniFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Alumni.
     * @param {AlumniCreateArgs} args - Arguments to create a Alumni.
     * @example
     * // Create one Alumni
     * const Alumni = await prisma.alumni.create({
     *   data: {
     *     // ... data to create a Alumni
     *   }
     * })
     * 
     */
    create<T extends AlumniCreateArgs>(args: SelectSubset<T, AlumniCreateArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Alumni.
     * @param {AlumniCreateManyArgs} args - Arguments to create many Alumni.
     * @example
     * // Create many Alumni
     * const alumni = await prisma.alumni.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlumniCreateManyArgs>(args?: SelectSubset<T, AlumniCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alumni and returns the data saved in the database.
     * @param {AlumniCreateManyAndReturnArgs} args - Arguments to create many Alumni.
     * @example
     * // Create many Alumni
     * const alumni = await prisma.alumni.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alumni and only return the `id`
     * const alumniWithIdOnly = await prisma.alumni.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlumniCreateManyAndReturnArgs>(args?: SelectSubset<T, AlumniCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Alumni.
     * @param {AlumniDeleteArgs} args - Arguments to delete one Alumni.
     * @example
     * // Delete one Alumni
     * const Alumni = await prisma.alumni.delete({
     *   where: {
     *     // ... filter to delete one Alumni
     *   }
     * })
     * 
     */
    delete<T extends AlumniDeleteArgs>(args: SelectSubset<T, AlumniDeleteArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Alumni.
     * @param {AlumniUpdateArgs} args - Arguments to update one Alumni.
     * @example
     * // Update one Alumni
     * const alumni = await prisma.alumni.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlumniUpdateArgs>(args: SelectSubset<T, AlumniUpdateArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Alumni.
     * @param {AlumniDeleteManyArgs} args - Arguments to filter Alumni to delete.
     * @example
     * // Delete a few Alumni
     * const { count } = await prisma.alumni.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlumniDeleteManyArgs>(args?: SelectSubset<T, AlumniDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alumni
     * const alumni = await prisma.alumni.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlumniUpdateManyArgs>(args: SelectSubset<T, AlumniUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alumni and returns the data updated in the database.
     * @param {AlumniUpdateManyAndReturnArgs} args - Arguments to update many Alumni.
     * @example
     * // Update many Alumni
     * const alumni = await prisma.alumni.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Alumni and only return the `id`
     * const alumniWithIdOnly = await prisma.alumni.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AlumniUpdateManyAndReturnArgs>(args: SelectSubset<T, AlumniUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Alumni.
     * @param {AlumniUpsertArgs} args - Arguments to update or create a Alumni.
     * @example
     * // Update or create a Alumni
     * const alumni = await prisma.alumni.upsert({
     *   create: {
     *     // ... data to create a Alumni
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alumni we want to update
     *   }
     * })
     */
    upsert<T extends AlumniUpsertArgs>(args: SelectSubset<T, AlumniUpsertArgs<ExtArgs>>): Prisma__AlumniClient<$Result.GetResult<Prisma.$AlumniPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniCountArgs} args - Arguments to filter Alumni to count.
     * @example
     * // Count the number of Alumni
     * const count = await prisma.alumni.count({
     *   where: {
     *     // ... the filter for the Alumni we want to count
     *   }
     * })
    **/
    count<T extends AlumniCountArgs>(
      args?: Subset<T, AlumniCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlumniCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlumniAggregateArgs>(args: Subset<T, AlumniAggregateArgs>): Prisma.PrismaPromise<GetAlumniAggregateType<T>>

    /**
     * Group by Alumni.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlumniGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlumniGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlumniGroupByArgs['orderBy'] }
        : { orderBy?: AlumniGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlumniGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlumniGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alumni model
   */
  readonly fields: AlumniFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alumni.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlumniClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends Alumni$studentArgs<ExtArgs> = {}>(args?: Subset<T, Alumni$studentArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alumni model
   */
  interface AlumniFieldRefs {
    readonly id: FieldRef<"Alumni", 'String'>
    readonly placedBy: FieldRef<"Alumni", 'String'>
    readonly pastOrg: FieldRef<"Alumni", 'String[]'>
    readonly currentOrg: FieldRef<"Alumni", 'String[]'>
    readonly package: FieldRef<"Alumni", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Alumni findUnique
   */
  export type AlumniFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni findUniqueOrThrow
   */
  export type AlumniFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni findFirst
   */
  export type AlumniFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alumni.
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alumni.
     */
    distinct?: AlumniScalarFieldEnum | AlumniScalarFieldEnum[]
  }

  /**
   * Alumni findFirstOrThrow
   */
  export type AlumniFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alumni.
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alumni.
     */
    distinct?: AlumniScalarFieldEnum | AlumniScalarFieldEnum[]
  }

  /**
   * Alumni findMany
   */
  export type AlumniFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter, which Alumni to fetch.
     */
    where?: AlumniWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alumni to fetch.
     */
    orderBy?: AlumniOrderByWithRelationInput | AlumniOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alumni.
     */
    cursor?: AlumniWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alumni from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alumni.
     */
    skip?: number
    distinct?: AlumniScalarFieldEnum | AlumniScalarFieldEnum[]
  }

  /**
   * Alumni create
   */
  export type AlumniCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * The data needed to create a Alumni.
     */
    data: XOR<AlumniCreateInput, AlumniUncheckedCreateInput>
  }

  /**
   * Alumni createMany
   */
  export type AlumniCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alumni.
     */
    data: AlumniCreateManyInput | AlumniCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alumni createManyAndReturn
   */
  export type AlumniCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * The data used to create many Alumni.
     */
    data: AlumniCreateManyInput | AlumniCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alumni update
   */
  export type AlumniUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * The data needed to update a Alumni.
     */
    data: XOR<AlumniUpdateInput, AlumniUncheckedUpdateInput>
    /**
     * Choose, which Alumni to update.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni updateMany
   */
  export type AlumniUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alumni.
     */
    data: XOR<AlumniUpdateManyMutationInput, AlumniUncheckedUpdateManyInput>
    /**
     * Filter which Alumni to update
     */
    where?: AlumniWhereInput
    /**
     * Limit how many Alumni to update.
     */
    limit?: number
  }

  /**
   * Alumni updateManyAndReturn
   */
  export type AlumniUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * The data used to update Alumni.
     */
    data: XOR<AlumniUpdateManyMutationInput, AlumniUncheckedUpdateManyInput>
    /**
     * Filter which Alumni to update
     */
    where?: AlumniWhereInput
    /**
     * Limit how many Alumni to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alumni upsert
   */
  export type AlumniUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * The filter to search for the Alumni to update in case it exists.
     */
    where: AlumniWhereUniqueInput
    /**
     * In case the Alumni found by the `where` argument doesn't exist, create a new Alumni with this data.
     */
    create: XOR<AlumniCreateInput, AlumniUncheckedCreateInput>
    /**
     * In case the Alumni was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlumniUpdateInput, AlumniUncheckedUpdateInput>
  }

  /**
   * Alumni delete
   */
  export type AlumniDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
    /**
     * Filter which Alumni to delete.
     */
    where: AlumniWhereUniqueInput
  }

  /**
   * Alumni deleteMany
   */
  export type AlumniDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alumni to delete
     */
    where?: AlumniWhereInput
    /**
     * Limit how many Alumni to delete.
     */
    limit?: number
  }

  /**
   * Alumni.student
   */
  export type Alumni$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Alumni without action
   */
  export type AlumniDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alumni
     */
    select?: AlumniSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Alumni
     */
    omit?: AlumniOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlumniInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    legalName: 'legalName',
    contactNo: 'contactNo',
    emailId: 'emailId',
    password: 'password',
    cgpa: 'cgpa',
    studentId: 'studentId',
    department: 'department',
    academicYear: 'academicYear',
    skills: 'skills',
    profilePic: 'profilePic',
    resumeUrl: 'resumeUrl',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    socialProfile: 'socialProfile'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const InternshipScalarFieldEnum: {
    id: 'id',
    title: 'title',
    companyName: 'companyName',
    duration: 'duration',
    studentId: 'studentId'
  };

  export type InternshipScalarFieldEnum = (typeof InternshipScalarFieldEnum)[keyof typeof InternshipScalarFieldEnum]


  export const AchievementScalarFieldEnum: {
    id: 'id',
    title: 'title',
    details: 'details',
    time: 'time',
    studentId: 'studentId'
  };

  export type AchievementScalarFieldEnum = (typeof AchievementScalarFieldEnum)[keyof typeof AchievementScalarFieldEnum]


  export const AdminScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    contactNo: 'contactNo',
    emailId: 'emailId',
    password: 'password'
  };

  export type AdminScalarFieldEnum = (typeof AdminScalarFieldEnum)[keyof typeof AdminScalarFieldEnum]


  export const AlumniScalarFieldEnum: {
    id: 'id',
    placedBy: 'placedBy',
    pastOrg: 'pastOrg',
    currentOrg: 'currentOrg',
    package: 'package'
  };

  export type AlumniScalarFieldEnum = (typeof AlumniScalarFieldEnum)[keyof typeof AlumniScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'UserAcademicYear'
   */
  export type EnumUserAcademicYearFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserAcademicYear'>
    


  /**
   * Reference to a field of type 'UserAcademicYear[]'
   */
  export type ListEnumUserAcademicYearFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserAcademicYear[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    legalName?: StringNullableFilter<"User"> | string | null
    contactNo?: StringNullableFilter<"User"> | string | null
    emailId?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    cgpa?: FloatNullableFilter<"User"> | number | null
    studentId?: StringFilter<"User"> | string
    department?: StringNullableFilter<"User"> | string | null
    academicYear?: EnumUserAcademicYearNullableFilter<"User"> | $Enums.UserAcademicYear | null
    skills?: StringNullableListFilter<"User">
    profilePic?: StringNullableFilter<"User"> | string | null
    resumeUrl?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    socialProfile?: StringNullableFilter<"User"> | string | null
    achievements?: AchievementListRelationFilter
    alumni?: XOR<AlumniNullableScalarRelationFilter, AlumniWhereInput> | null
    internships?: InternshipListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    legalName?: SortOrderInput | SortOrder
    contactNo?: SortOrderInput | SortOrder
    emailId?: SortOrder
    password?: SortOrder
    cgpa?: SortOrderInput | SortOrder
    studentId?: SortOrder
    department?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    skills?: SortOrder
    profilePic?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    socialProfile?: SortOrderInput | SortOrder
    achievements?: AchievementOrderByRelationAggregateInput
    alumni?: AlumniOrderByWithRelationInput
    internships?: InternshipOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    emailId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    legalName?: StringNullableFilter<"User"> | string | null
    contactNo?: StringNullableFilter<"User"> | string | null
    password?: StringFilter<"User"> | string
    cgpa?: FloatNullableFilter<"User"> | number | null
    studentId?: StringFilter<"User"> | string
    department?: StringNullableFilter<"User"> | string | null
    academicYear?: EnumUserAcademicYearNullableFilter<"User"> | $Enums.UserAcademicYear | null
    skills?: StringNullableListFilter<"User">
    profilePic?: StringNullableFilter<"User"> | string | null
    resumeUrl?: StringNullableFilter<"User"> | string | null
    isVerified?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    socialProfile?: StringNullableFilter<"User"> | string | null
    achievements?: AchievementListRelationFilter
    alumni?: XOR<AlumniNullableScalarRelationFilter, AlumniWhereInput> | null
    internships?: InternshipListRelationFilter
  }, "id" | "emailId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    legalName?: SortOrderInput | SortOrder
    contactNo?: SortOrderInput | SortOrder
    emailId?: SortOrder
    password?: SortOrder
    cgpa?: SortOrderInput | SortOrder
    studentId?: SortOrder
    department?: SortOrderInput | SortOrder
    academicYear?: SortOrderInput | SortOrder
    skills?: SortOrder
    profilePic?: SortOrderInput | SortOrder
    resumeUrl?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    socialProfile?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    legalName?: StringNullableWithAggregatesFilter<"User"> | string | null
    contactNo?: StringNullableWithAggregatesFilter<"User"> | string | null
    emailId?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    cgpa?: FloatNullableWithAggregatesFilter<"User"> | number | null
    studentId?: StringWithAggregatesFilter<"User"> | string
    department?: StringNullableWithAggregatesFilter<"User"> | string | null
    academicYear?: EnumUserAcademicYearNullableWithAggregatesFilter<"User"> | $Enums.UserAcademicYear | null
    skills?: StringNullableListFilter<"User">
    profilePic?: StringNullableWithAggregatesFilter<"User"> | string | null
    resumeUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    isVerified?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    socialProfile?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type InternshipWhereInput = {
    AND?: InternshipWhereInput | InternshipWhereInput[]
    OR?: InternshipWhereInput[]
    NOT?: InternshipWhereInput | InternshipWhereInput[]
    id?: StringFilter<"Internship"> | string
    title?: StringNullableFilter<"Internship"> | string | null
    companyName?: StringNullableFilter<"Internship"> | string | null
    duration?: StringNullableFilter<"Internship"> | string | null
    studentId?: StringNullableFilter<"Internship"> | string | null
    student?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type InternshipOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    student?: UserOrderByWithRelationInput
  }

  export type InternshipWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InternshipWhereInput | InternshipWhereInput[]
    OR?: InternshipWhereInput[]
    NOT?: InternshipWhereInput | InternshipWhereInput[]
    title?: StringNullableFilter<"Internship"> | string | null
    companyName?: StringNullableFilter<"Internship"> | string | null
    duration?: StringNullableFilter<"Internship"> | string | null
    studentId?: StringNullableFilter<"Internship"> | string | null
    student?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type InternshipOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    companyName?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    _count?: InternshipCountOrderByAggregateInput
    _max?: InternshipMaxOrderByAggregateInput
    _min?: InternshipMinOrderByAggregateInput
  }

  export type InternshipScalarWhereWithAggregatesInput = {
    AND?: InternshipScalarWhereWithAggregatesInput | InternshipScalarWhereWithAggregatesInput[]
    OR?: InternshipScalarWhereWithAggregatesInput[]
    NOT?: InternshipScalarWhereWithAggregatesInput | InternshipScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Internship"> | string
    title?: StringNullableWithAggregatesFilter<"Internship"> | string | null
    companyName?: StringNullableWithAggregatesFilter<"Internship"> | string | null
    duration?: StringNullableWithAggregatesFilter<"Internship"> | string | null
    studentId?: StringNullableWithAggregatesFilter<"Internship"> | string | null
  }

  export type AchievementWhereInput = {
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    id?: StringFilter<"Achievement"> | string
    title?: StringNullableFilter<"Achievement"> | string | null
    details?: StringNullableFilter<"Achievement"> | string | null
    time?: DateTimeNullableFilter<"Achievement"> | Date | string | null
    studentId?: StringFilter<"Achievement"> | string
    student?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AchievementOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    studentId?: SortOrder
    student?: UserOrderByWithRelationInput
  }

  export type AchievementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AchievementWhereInput | AchievementWhereInput[]
    OR?: AchievementWhereInput[]
    NOT?: AchievementWhereInput | AchievementWhereInput[]
    title?: StringNullableFilter<"Achievement"> | string | null
    details?: StringNullableFilter<"Achievement"> | string | null
    time?: DateTimeNullableFilter<"Achievement"> | Date | string | null
    studentId?: StringFilter<"Achievement"> | string
    student?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AchievementOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    details?: SortOrderInput | SortOrder
    time?: SortOrderInput | SortOrder
    studentId?: SortOrder
    _count?: AchievementCountOrderByAggregateInput
    _max?: AchievementMaxOrderByAggregateInput
    _min?: AchievementMinOrderByAggregateInput
  }

  export type AchievementScalarWhereWithAggregatesInput = {
    AND?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    OR?: AchievementScalarWhereWithAggregatesInput[]
    NOT?: AchievementScalarWhereWithAggregatesInput | AchievementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Achievement"> | string
    title?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    details?: StringNullableWithAggregatesFilter<"Achievement"> | string | null
    time?: DateTimeNullableWithAggregatesFilter<"Achievement"> | Date | string | null
    studentId?: StringWithAggregatesFilter<"Achievement"> | string
  }

  export type AdminWhereInput = {
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    id?: StringFilter<"Admin"> | string
    firstName?: StringFilter<"Admin"> | string
    lastName?: StringFilter<"Admin"> | string
    contactNo?: StringFilter<"Admin"> | string
    emailId?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
  }

  export type AdminOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
  }

  export type AdminWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    emailId?: string
    AND?: AdminWhereInput | AdminWhereInput[]
    OR?: AdminWhereInput[]
    NOT?: AdminWhereInput | AdminWhereInput[]
    firstName?: StringFilter<"Admin"> | string
    lastName?: StringFilter<"Admin"> | string
    contactNo?: StringFilter<"Admin"> | string
    password?: StringFilter<"Admin"> | string
  }, "id" | "emailId">

  export type AdminOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
    _count?: AdminCountOrderByAggregateInput
    _max?: AdminMaxOrderByAggregateInput
    _min?: AdminMinOrderByAggregateInput
  }

  export type AdminScalarWhereWithAggregatesInput = {
    AND?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    OR?: AdminScalarWhereWithAggregatesInput[]
    NOT?: AdminScalarWhereWithAggregatesInput | AdminScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Admin"> | string
    firstName?: StringWithAggregatesFilter<"Admin"> | string
    lastName?: StringWithAggregatesFilter<"Admin"> | string
    contactNo?: StringWithAggregatesFilter<"Admin"> | string
    emailId?: StringWithAggregatesFilter<"Admin"> | string
    password?: StringWithAggregatesFilter<"Admin"> | string
  }

  export type AlumniWhereInput = {
    AND?: AlumniWhereInput | AlumniWhereInput[]
    OR?: AlumniWhereInput[]
    NOT?: AlumniWhereInput | AlumniWhereInput[]
    id?: StringFilter<"Alumni"> | string
    placedBy?: StringFilter<"Alumni"> | string
    pastOrg?: StringNullableListFilter<"Alumni">
    currentOrg?: StringNullableListFilter<"Alumni">
    package?: StringFilter<"Alumni"> | string
    student?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type AlumniOrderByWithRelationInput = {
    id?: SortOrder
    placedBy?: SortOrder
    pastOrg?: SortOrder
    currentOrg?: SortOrder
    package?: SortOrder
    student?: UserOrderByWithRelationInput
  }

  export type AlumniWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AlumniWhereInput | AlumniWhereInput[]
    OR?: AlumniWhereInput[]
    NOT?: AlumniWhereInput | AlumniWhereInput[]
    placedBy?: StringFilter<"Alumni"> | string
    pastOrg?: StringNullableListFilter<"Alumni">
    currentOrg?: StringNullableListFilter<"Alumni">
    package?: StringFilter<"Alumni"> | string
    student?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type AlumniOrderByWithAggregationInput = {
    id?: SortOrder
    placedBy?: SortOrder
    pastOrg?: SortOrder
    currentOrg?: SortOrder
    package?: SortOrder
    _count?: AlumniCountOrderByAggregateInput
    _max?: AlumniMaxOrderByAggregateInput
    _min?: AlumniMinOrderByAggregateInput
  }

  export type AlumniScalarWhereWithAggregatesInput = {
    AND?: AlumniScalarWhereWithAggregatesInput | AlumniScalarWhereWithAggregatesInput[]
    OR?: AlumniScalarWhereWithAggregatesInput[]
    NOT?: AlumniScalarWhereWithAggregatesInput | AlumniScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Alumni"> | string
    placedBy?: StringWithAggregatesFilter<"Alumni"> | string
    pastOrg?: StringNullableListFilter<"Alumni">
    currentOrg?: StringNullableListFilter<"Alumni">
    package?: StringWithAggregatesFilter<"Alumni"> | string
  }

  export type UserCreateInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    alumni?: AlumniCreateNestedOneWithoutStudentInput
    internships?: InternshipCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    alumni?: AlumniUncheckedCreateNestedOneWithoutStudentInput
    internships?: InternshipUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    alumni?: AlumniUpdateOneWithoutStudentNestedInput
    internships?: InternshipUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    alumni?: AlumniUncheckedUpdateOneWithoutStudentNestedInput
    internships?: InternshipUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternshipCreateInput = {
    id?: string
    title?: string | null
    companyName?: string | null
    duration?: string | null
    student?: UserCreateNestedOneWithoutInternshipsInput
  }

  export type InternshipUncheckedCreateInput = {
    id?: string
    title?: string | null
    companyName?: string | null
    duration?: string | null
    studentId?: string | null
  }

  export type InternshipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    student?: UserUpdateOneWithoutInternshipsNestedInput
  }

  export type InternshipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternshipCreateManyInput = {
    id?: string
    title?: string | null
    companyName?: string | null
    duration?: string | null
    studentId?: string | null
  }

  export type InternshipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternshipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    studentId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AchievementCreateInput = {
    id?: string
    title?: string | null
    details?: string | null
    time?: Date | string | null
    student?: UserCreateNestedOneWithoutAchievementsInput
  }

  export type AchievementUncheckedCreateInput = {
    id?: string
    title?: string | null
    details?: string | null
    time?: Date | string | null
    studentId: string
  }

  export type AchievementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    student?: UserUpdateOneWithoutAchievementsNestedInput
  }

  export type AchievementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: StringFieldUpdateOperationsInput | string
  }

  export type AchievementCreateManyInput = {
    id?: string
    title?: string | null
    details?: string | null
    time?: Date | string | null
    studentId: string
  }

  export type AchievementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AchievementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateInput = {
    id?: string
    firstName: string
    lastName: string
    contactNo: string
    emailId: string
    password: string
  }

  export type AdminUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    contactNo: string
    emailId: string
    password: string
  }

  export type AdminUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    contactNo?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    contactNo?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type AdminCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    contactNo: string
    emailId: string
    password: string
  }

  export type AdminUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    contactNo?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type AdminUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    contactNo?: StringFieldUpdateOperationsInput | string
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type AlumniCreateInput = {
    placedBy: string
    pastOrg?: AlumniCreatepastOrgInput | string[]
    currentOrg?: AlumniCreatecurrentOrgInput | string[]
    package: string
    student?: UserCreateNestedOneWithoutAlumniInput
  }

  export type AlumniUncheckedCreateInput = {
    id?: string
    placedBy: string
    pastOrg?: AlumniCreatepastOrgInput | string[]
    currentOrg?: AlumniCreatecurrentOrgInput | string[]
    package: string
  }

  export type AlumniUpdateInput = {
    placedBy?: StringFieldUpdateOperationsInput | string
    pastOrg?: AlumniUpdatepastOrgInput | string[]
    currentOrg?: AlumniUpdatecurrentOrgInput | string[]
    package?: StringFieldUpdateOperationsInput | string
    student?: UserUpdateOneWithoutAlumniNestedInput
  }

  export type AlumniUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    placedBy?: StringFieldUpdateOperationsInput | string
    pastOrg?: AlumniUpdatepastOrgInput | string[]
    currentOrg?: AlumniUpdatecurrentOrgInput | string[]
    package?: StringFieldUpdateOperationsInput | string
  }

  export type AlumniCreateManyInput = {
    id?: string
    placedBy: string
    pastOrg?: AlumniCreatepastOrgInput | string[]
    currentOrg?: AlumniCreatecurrentOrgInput | string[]
    package: string
  }

  export type AlumniUpdateManyMutationInput = {
    placedBy?: StringFieldUpdateOperationsInput | string
    pastOrg?: AlumniUpdatepastOrgInput | string[]
    currentOrg?: AlumniUpdatecurrentOrgInput | string[]
    package?: StringFieldUpdateOperationsInput | string
  }

  export type AlumniUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    placedBy?: StringFieldUpdateOperationsInput | string
    pastOrg?: AlumniUpdatepastOrgInput | string[]
    currentOrg?: AlumniUpdatecurrentOrgInput | string[]
    package?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type EnumUserAcademicYearNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAcademicYear | EnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    in?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUserAcademicYearNullableFilter<$PrismaModel> | $Enums.UserAcademicYear | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AchievementListRelationFilter = {
    every?: AchievementWhereInput
    some?: AchievementWhereInput
    none?: AchievementWhereInput
  }

  export type AlumniNullableScalarRelationFilter = {
    is?: AlumniWhereInput | null
    isNot?: AlumniWhereInput | null
  }

  export type InternshipListRelationFilter = {
    every?: InternshipWhereInput
    some?: InternshipWhereInput
    none?: InternshipWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AchievementOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InternshipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    legalName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
    cgpa?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    skills?: SortOrder
    profilePic?: SortOrder
    resumeUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    socialProfile?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    cgpa?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    legalName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
    cgpa?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    profilePic?: SortOrder
    resumeUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    socialProfile?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    legalName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
    cgpa?: SortOrder
    studentId?: SortOrder
    department?: SortOrder
    academicYear?: SortOrder
    profilePic?: SortOrder
    resumeUrl?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    socialProfile?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    cgpa?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type EnumUserAcademicYearNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAcademicYear | EnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    in?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUserAcademicYearNullableWithAggregatesFilter<$PrismaModel> | $Enums.UserAcademicYear | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumUserAcademicYearNullableFilter<$PrismaModel>
    _max?: NestedEnumUserAcademicYearNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InternshipCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    duration?: SortOrder
    studentId?: SortOrder
  }

  export type InternshipMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    duration?: SortOrder
    studentId?: SortOrder
  }

  export type InternshipMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    companyName?: SortOrder
    duration?: SortOrder
    studentId?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type AchievementCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    details?: SortOrder
    time?: SortOrder
    studentId?: SortOrder
  }

  export type AchievementMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    details?: SortOrder
    time?: SortOrder
    studentId?: SortOrder
  }

  export type AchievementMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    details?: SortOrder
    time?: SortOrder
    studentId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AdminCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
  }

  export type AdminMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
  }

  export type AdminMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    contactNo?: SortOrder
    emailId?: SortOrder
    password?: SortOrder
  }

  export type AlumniCountOrderByAggregateInput = {
    id?: SortOrder
    placedBy?: SortOrder
    pastOrg?: SortOrder
    currentOrg?: SortOrder
    package?: SortOrder
  }

  export type AlumniMaxOrderByAggregateInput = {
    id?: SortOrder
    placedBy?: SortOrder
    package?: SortOrder
  }

  export type AlumniMinOrderByAggregateInput = {
    id?: SortOrder
    placedBy?: SortOrder
    package?: SortOrder
  }

  export type UserCreateskillsInput = {
    set: string[]
  }

  export type AchievementCreateNestedManyWithoutStudentInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
  }

  export type AlumniCreateNestedOneWithoutStudentInput = {
    create?: XOR<AlumniCreateWithoutStudentInput, AlumniUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutStudentInput
    connect?: AlumniWhereUniqueInput
  }

  export type InternshipCreateNestedManyWithoutStudentInput = {
    create?: XOR<InternshipCreateWithoutStudentInput, InternshipUncheckedCreateWithoutStudentInput> | InternshipCreateWithoutStudentInput[] | InternshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InternshipCreateOrConnectWithoutStudentInput | InternshipCreateOrConnectWithoutStudentInput[]
    createMany?: InternshipCreateManyStudentInputEnvelope
    connect?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
  }

  export type AchievementUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
  }

  export type AlumniUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<AlumniCreateWithoutStudentInput, AlumniUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutStudentInput
    connect?: AlumniWhereUniqueInput
  }

  export type InternshipUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<InternshipCreateWithoutStudentInput, InternshipUncheckedCreateWithoutStudentInput> | InternshipCreateWithoutStudentInput[] | InternshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InternshipCreateOrConnectWithoutStudentInput | InternshipCreateOrConnectWithoutStudentInput[]
    createMany?: InternshipCreateManyStudentInputEnvelope
    connect?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumUserAcademicYearFieldUpdateOperationsInput = {
    set?: $Enums.UserAcademicYear | null
  }

  export type UserUpdateskillsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AchievementUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    upsert?: AchievementUpsertWithWhereUniqueWithoutStudentInput | AchievementUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    set?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    disconnect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    delete?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    update?: AchievementUpdateWithWhereUniqueWithoutStudentInput | AchievementUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AchievementUpdateManyWithWhereWithoutStudentInput | AchievementUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
  }

  export type AlumniUpdateOneWithoutStudentNestedInput = {
    create?: XOR<AlumniCreateWithoutStudentInput, AlumniUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutStudentInput
    upsert?: AlumniUpsertWithoutStudentInput
    disconnect?: AlumniWhereInput | boolean
    delete?: AlumniWhereInput | boolean
    connect?: AlumniWhereUniqueInput
    update?: XOR<XOR<AlumniUpdateToOneWithWhereWithoutStudentInput, AlumniUpdateWithoutStudentInput>, AlumniUncheckedUpdateWithoutStudentInput>
  }

  export type InternshipUpdateManyWithoutStudentNestedInput = {
    create?: XOR<InternshipCreateWithoutStudentInput, InternshipUncheckedCreateWithoutStudentInput> | InternshipCreateWithoutStudentInput[] | InternshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InternshipCreateOrConnectWithoutStudentInput | InternshipCreateOrConnectWithoutStudentInput[]
    upsert?: InternshipUpsertWithWhereUniqueWithoutStudentInput | InternshipUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: InternshipCreateManyStudentInputEnvelope
    set?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    disconnect?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    delete?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    connect?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    update?: InternshipUpdateWithWhereUniqueWithoutStudentInput | InternshipUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: InternshipUpdateManyWithWhereWithoutStudentInput | InternshipUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: InternshipScalarWhereInput | InternshipScalarWhereInput[]
  }

  export type AchievementUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput> | AchievementCreateWithoutStudentInput[] | AchievementUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AchievementCreateOrConnectWithoutStudentInput | AchievementCreateOrConnectWithoutStudentInput[]
    upsert?: AchievementUpsertWithWhereUniqueWithoutStudentInput | AchievementUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AchievementCreateManyStudentInputEnvelope
    set?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    disconnect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    delete?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    connect?: AchievementWhereUniqueInput | AchievementWhereUniqueInput[]
    update?: AchievementUpdateWithWhereUniqueWithoutStudentInput | AchievementUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AchievementUpdateManyWithWhereWithoutStudentInput | AchievementUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
  }

  export type AlumniUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<AlumniCreateWithoutStudentInput, AlumniUncheckedCreateWithoutStudentInput>
    connectOrCreate?: AlumniCreateOrConnectWithoutStudentInput
    upsert?: AlumniUpsertWithoutStudentInput
    disconnect?: AlumniWhereInput | boolean
    delete?: AlumniWhereInput | boolean
    connect?: AlumniWhereUniqueInput
    update?: XOR<XOR<AlumniUpdateToOneWithWhereWithoutStudentInput, AlumniUpdateWithoutStudentInput>, AlumniUncheckedUpdateWithoutStudentInput>
  }

  export type InternshipUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<InternshipCreateWithoutStudentInput, InternshipUncheckedCreateWithoutStudentInput> | InternshipCreateWithoutStudentInput[] | InternshipUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: InternshipCreateOrConnectWithoutStudentInput | InternshipCreateOrConnectWithoutStudentInput[]
    upsert?: InternshipUpsertWithWhereUniqueWithoutStudentInput | InternshipUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: InternshipCreateManyStudentInputEnvelope
    set?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    disconnect?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    delete?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    connect?: InternshipWhereUniqueInput | InternshipWhereUniqueInput[]
    update?: InternshipUpdateWithWhereUniqueWithoutStudentInput | InternshipUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: InternshipUpdateManyWithWhereWithoutStudentInput | InternshipUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: InternshipScalarWhereInput | InternshipScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInternshipsInput = {
    create?: XOR<UserCreateWithoutInternshipsInput, UserUncheckedCreateWithoutInternshipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInternshipsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneWithoutInternshipsNestedInput = {
    create?: XOR<UserCreateWithoutInternshipsInput, UserUncheckedCreateWithoutInternshipsInput>
    connectOrCreate?: UserCreateOrConnectWithoutInternshipsInput
    upsert?: UserUpsertWithoutInternshipsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInternshipsInput, UserUpdateWithoutInternshipsInput>, UserUncheckedUpdateWithoutInternshipsInput>
  }

  export type UserCreateNestedOneWithoutAchievementsInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutAchievementsNestedInput = {
    create?: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAchievementsInput
    upsert?: UserUpsertWithoutAchievementsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAchievementsInput, UserUpdateWithoutAchievementsInput>, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type AlumniCreatepastOrgInput = {
    set: string[]
  }

  export type AlumniCreatecurrentOrgInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutAlumniInput = {
    create?: XOR<UserCreateWithoutAlumniInput, UserUncheckedCreateWithoutAlumniInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlumniInput
    connect?: UserWhereUniqueInput
  }

  export type AlumniUpdatepastOrgInput = {
    set?: string[]
    push?: string | string[]
  }

  export type AlumniUpdatecurrentOrgInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneWithoutAlumniNestedInput = {
    create?: XOR<UserCreateWithoutAlumniInput, UserUncheckedCreateWithoutAlumniInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlumniInput
    upsert?: UserUpsertWithoutAlumniInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlumniInput, UserUpdateWithoutAlumniInput>, UserUncheckedUpdateWithoutAlumniInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumUserAcademicYearNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAcademicYear | EnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    in?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUserAcademicYearNullableFilter<$PrismaModel> | $Enums.UserAcademicYear | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedEnumUserAcademicYearNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserAcademicYear | EnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    in?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.UserAcademicYear[] | ListEnumUserAcademicYearFieldRefInput<$PrismaModel> | null
    not?: NestedEnumUserAcademicYearNullableWithAggregatesFilter<$PrismaModel> | $Enums.UserAcademicYear | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumUserAcademicYearNullableFilter<$PrismaModel>
    _max?: NestedEnumUserAcademicYearNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type AchievementCreateWithoutStudentInput = {
    id?: string
    title?: string | null
    details?: string | null
    time?: Date | string | null
  }

  export type AchievementUncheckedCreateWithoutStudentInput = {
    id?: string
    title?: string | null
    details?: string | null
    time?: Date | string | null
  }

  export type AchievementCreateOrConnectWithoutStudentInput = {
    where: AchievementWhereUniqueInput
    create: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput>
  }

  export type AchievementCreateManyStudentInputEnvelope = {
    data: AchievementCreateManyStudentInput | AchievementCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AlumniCreateWithoutStudentInput = {
    placedBy: string
    pastOrg?: AlumniCreatepastOrgInput | string[]
    currentOrg?: AlumniCreatecurrentOrgInput | string[]
    package: string
  }

  export type AlumniUncheckedCreateWithoutStudentInput = {
    placedBy: string
    pastOrg?: AlumniCreatepastOrgInput | string[]
    currentOrg?: AlumniCreatecurrentOrgInput | string[]
    package: string
  }

  export type AlumniCreateOrConnectWithoutStudentInput = {
    where: AlumniWhereUniqueInput
    create: XOR<AlumniCreateWithoutStudentInput, AlumniUncheckedCreateWithoutStudentInput>
  }

  export type InternshipCreateWithoutStudentInput = {
    id?: string
    title?: string | null
    companyName?: string | null
    duration?: string | null
  }

  export type InternshipUncheckedCreateWithoutStudentInput = {
    id?: string
    title?: string | null
    companyName?: string | null
    duration?: string | null
  }

  export type InternshipCreateOrConnectWithoutStudentInput = {
    where: InternshipWhereUniqueInput
    create: XOR<InternshipCreateWithoutStudentInput, InternshipUncheckedCreateWithoutStudentInput>
  }

  export type InternshipCreateManyStudentInputEnvelope = {
    data: InternshipCreateManyStudentInput | InternshipCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type AchievementUpsertWithWhereUniqueWithoutStudentInput = {
    where: AchievementWhereUniqueInput
    update: XOR<AchievementUpdateWithoutStudentInput, AchievementUncheckedUpdateWithoutStudentInput>
    create: XOR<AchievementCreateWithoutStudentInput, AchievementUncheckedCreateWithoutStudentInput>
  }

  export type AchievementUpdateWithWhereUniqueWithoutStudentInput = {
    where: AchievementWhereUniqueInput
    data: XOR<AchievementUpdateWithoutStudentInput, AchievementUncheckedUpdateWithoutStudentInput>
  }

  export type AchievementUpdateManyWithWhereWithoutStudentInput = {
    where: AchievementScalarWhereInput
    data: XOR<AchievementUpdateManyMutationInput, AchievementUncheckedUpdateManyWithoutStudentInput>
  }

  export type AchievementScalarWhereInput = {
    AND?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
    OR?: AchievementScalarWhereInput[]
    NOT?: AchievementScalarWhereInput | AchievementScalarWhereInput[]
    id?: StringFilter<"Achievement"> | string
    title?: StringNullableFilter<"Achievement"> | string | null
    details?: StringNullableFilter<"Achievement"> | string | null
    time?: DateTimeNullableFilter<"Achievement"> | Date | string | null
    studentId?: StringFilter<"Achievement"> | string
  }

  export type AlumniUpsertWithoutStudentInput = {
    update: XOR<AlumniUpdateWithoutStudentInput, AlumniUncheckedUpdateWithoutStudentInput>
    create: XOR<AlumniCreateWithoutStudentInput, AlumniUncheckedCreateWithoutStudentInput>
    where?: AlumniWhereInput
  }

  export type AlumniUpdateToOneWithWhereWithoutStudentInput = {
    where?: AlumniWhereInput
    data: XOR<AlumniUpdateWithoutStudentInput, AlumniUncheckedUpdateWithoutStudentInput>
  }

  export type AlumniUpdateWithoutStudentInput = {
    placedBy?: StringFieldUpdateOperationsInput | string
    pastOrg?: AlumniUpdatepastOrgInput | string[]
    currentOrg?: AlumniUpdatecurrentOrgInput | string[]
    package?: StringFieldUpdateOperationsInput | string
  }

  export type AlumniUncheckedUpdateWithoutStudentInput = {
    placedBy?: StringFieldUpdateOperationsInput | string
    pastOrg?: AlumniUpdatepastOrgInput | string[]
    currentOrg?: AlumniUpdatecurrentOrgInput | string[]
    package?: StringFieldUpdateOperationsInput | string
  }

  export type InternshipUpsertWithWhereUniqueWithoutStudentInput = {
    where: InternshipWhereUniqueInput
    update: XOR<InternshipUpdateWithoutStudentInput, InternshipUncheckedUpdateWithoutStudentInput>
    create: XOR<InternshipCreateWithoutStudentInput, InternshipUncheckedCreateWithoutStudentInput>
  }

  export type InternshipUpdateWithWhereUniqueWithoutStudentInput = {
    where: InternshipWhereUniqueInput
    data: XOR<InternshipUpdateWithoutStudentInput, InternshipUncheckedUpdateWithoutStudentInput>
  }

  export type InternshipUpdateManyWithWhereWithoutStudentInput = {
    where: InternshipScalarWhereInput
    data: XOR<InternshipUpdateManyMutationInput, InternshipUncheckedUpdateManyWithoutStudentInput>
  }

  export type InternshipScalarWhereInput = {
    AND?: InternshipScalarWhereInput | InternshipScalarWhereInput[]
    OR?: InternshipScalarWhereInput[]
    NOT?: InternshipScalarWhereInput | InternshipScalarWhereInput[]
    id?: StringFilter<"Internship"> | string
    title?: StringNullableFilter<"Internship"> | string | null
    companyName?: StringNullableFilter<"Internship"> | string | null
    duration?: StringNullableFilter<"Internship"> | string | null
    studentId?: StringNullableFilter<"Internship"> | string | null
  }

  export type UserCreateWithoutInternshipsInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    alumni?: AlumniCreateNestedOneWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutInternshipsInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    alumni?: AlumniUncheckedCreateNestedOneWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutInternshipsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInternshipsInput, UserUncheckedCreateWithoutInternshipsInput>
  }

  export type UserUpsertWithoutInternshipsInput = {
    update: XOR<UserUpdateWithoutInternshipsInput, UserUncheckedUpdateWithoutInternshipsInput>
    create: XOR<UserCreateWithoutInternshipsInput, UserUncheckedCreateWithoutInternshipsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInternshipsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInternshipsInput, UserUncheckedUpdateWithoutInternshipsInput>
  }

  export type UserUpdateWithoutInternshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    alumni?: AlumniUpdateOneWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutInternshipsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    alumni?: AlumniUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type UserCreateWithoutAchievementsInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    alumni?: AlumniCreateNestedOneWithoutStudentInput
    internships?: InternshipCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutAchievementsInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    alumni?: AlumniUncheckedCreateNestedOneWithoutStudentInput
    internships?: InternshipUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutAchievementsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
  }

  export type UserUpsertWithoutAchievementsInput = {
    update: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
    create: XOR<UserCreateWithoutAchievementsInput, UserUncheckedCreateWithoutAchievementsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAchievementsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAchievementsInput, UserUncheckedUpdateWithoutAchievementsInput>
  }

  export type UserUpdateWithoutAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    alumni?: AlumniUpdateOneWithoutStudentNestedInput
    internships?: InternshipUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutAchievementsInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    alumni?: AlumniUncheckedUpdateOneWithoutStudentNestedInput
    internships?: InternshipUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type UserCreateWithoutAlumniInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    achievements?: AchievementCreateNestedManyWithoutStudentInput
    internships?: InternshipCreateNestedManyWithoutStudentInput
  }

  export type UserUncheckedCreateWithoutAlumniInput = {
    id?: string
    fullName: string
    legalName?: string | null
    contactNo?: string | null
    emailId: string
    password: string
    cgpa?: number | null
    studentId: string
    department?: string | null
    academicYear?: $Enums.UserAcademicYear | null
    skills?: UserCreateskillsInput | string[]
    profilePic?: string | null
    resumeUrl?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    socialProfile?: string | null
    achievements?: AchievementUncheckedCreateNestedManyWithoutStudentInput
    internships?: InternshipUncheckedCreateNestedManyWithoutStudentInput
  }

  export type UserCreateOrConnectWithoutAlumniInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlumniInput, UserUncheckedCreateWithoutAlumniInput>
  }

  export type UserUpsertWithoutAlumniInput = {
    update: XOR<UserUpdateWithoutAlumniInput, UserUncheckedUpdateWithoutAlumniInput>
    create: XOR<UserCreateWithoutAlumniInput, UserUncheckedCreateWithoutAlumniInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlumniInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlumniInput, UserUncheckedUpdateWithoutAlumniInput>
  }

  export type UserUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AchievementUpdateManyWithoutStudentNestedInput
    internships?: InternshipUpdateManyWithoutStudentNestedInput
  }

  export type UserUncheckedUpdateWithoutAlumniInput = {
    id?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    legalName?: NullableStringFieldUpdateOperationsInput | string | null
    contactNo?: NullableStringFieldUpdateOperationsInput | string | null
    emailId?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    cgpa?: NullableFloatFieldUpdateOperationsInput | number | null
    studentId?: StringFieldUpdateOperationsInput | string
    department?: NullableStringFieldUpdateOperationsInput | string | null
    academicYear?: NullableEnumUserAcademicYearFieldUpdateOperationsInput | $Enums.UserAcademicYear | null
    skills?: UserUpdateskillsInput | string[]
    profilePic?: NullableStringFieldUpdateOperationsInput | string | null
    resumeUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    socialProfile?: NullableStringFieldUpdateOperationsInput | string | null
    achievements?: AchievementUncheckedUpdateManyWithoutStudentNestedInput
    internships?: InternshipUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type AchievementCreateManyStudentInput = {
    id?: string
    title?: string | null
    details?: string | null
    time?: Date | string | null
  }

  export type InternshipCreateManyStudentInput = {
    id?: string
    title?: string | null
    companyName?: string | null
    duration?: string | null
  }

  export type AchievementUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AchievementUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AchievementUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    details?: NullableStringFieldUpdateOperationsInput | string | null
    time?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type InternshipUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternshipUncheckedUpdateWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternshipUncheckedUpdateManyWithoutStudentInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}