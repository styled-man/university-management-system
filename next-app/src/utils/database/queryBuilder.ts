export class queryBuilder {
    static columnsAndValues<T extends object>(data: T) {
        let columns = "("
        let values: string[] = []

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
}
