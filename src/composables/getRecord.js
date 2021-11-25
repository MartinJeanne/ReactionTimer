import { projectFirestore } from "../firebase/config"
import { ref } from '@vue/reactivity'

function getRecord() {
    const record = ref([])

    async function load() {
        try {
            const res = await projectFirestore.collection('record').get()
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }
    return { record, load}
}

export default getRecord