import { randomUUID } from "crypto"

export class DatabaseMemory{
#sups = new Map()

list(search){
    return Array.from(this.#sups.entries()).map((supsArray) =>{
   
        const id = supsArray[0]
        const data = supsArray[1]

        return{
            id,
            ...data
        }
    })
    .filter(sup => {
        if (search){
            return sup.marca.includes(search)
        }
        return true
    })
}
create(sup){
    const supId = randomUUID()
    this.#sups.set(supId, sup)
}
update(id, sup){
    this.#sups.set(id, sup)
}
delete(id, sup){
    this.#sups.delete(id, sup)
}
}