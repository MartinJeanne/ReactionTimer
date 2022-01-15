import { projectFirestore } from "../firebase/config"
import { ref } from '@vue/reactivity'

function getRecords() {
    const records = ref([])

    async function load() {
        try {
            const res = await projectFirestore.collection('record').get()
            records.value = res.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            console.log(err)
        }
    }
    return { records, load}
}

export default getRecords