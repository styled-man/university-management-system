import { camelCase as lodashCamelCase, snakeCase as lodashSnakeCase } from "lodash"

export function toSnakeCase<T extends object>(obj: T) {
    let data = {} as T

    Object.entries(obj).forEach(([key, value]) => {
        data[lodashSnakeCase(key) as keyof T] = value
    })

    return data
}

export function toCamelCase<T extends object>(obj: T) {
    let data = {} as T

    Object.entries(obj).forEach(([key, value]) => {
        data[lodashCamelCase(key) as keyof T] = value
    })

    return data
}
