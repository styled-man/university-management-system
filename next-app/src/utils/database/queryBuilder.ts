import { snakeCase as lodashSnakeCase } from "lodash"

export class queryBuilder {
    static insert<T extends object>(data: T) {
        let columns = "("
        const values: string[] = []

        Object.entries(data).forEach(([key, value], index) => {
            if (index !== 0) {
                columns += ", "
            }

            columns += `"${key}"`
            values.push(value)
        })

        columns += ")"

        return {
            columns,
            values,
            parameters: [...Array(values.length)].map((_, i) => `$${i + 1}`).join(", "),
        }
    }

    static update<T extends object>(data: T) {
        let parameters: string = "",
            i: number = 1
        const values: Array<string> = []

        Object.entries(data).forEach(([key, value]) => {
            if (value) {
                if (i !== 1) {
                    parameters += ", "
                }

                parameters += `"${key}" = $${i}`
                values.push(value)
                i++
            }
        })

        return { parameters, values }
    }

    static get(data: Array<string>) {
        return data.map(f => `"${lodashSnakeCase(f)}"`).join(", ")
    }
}
