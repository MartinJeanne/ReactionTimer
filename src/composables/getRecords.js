import { projectFirestore } from "../firebase/config"
import { ref } from '@vue/reactivity'

function getRecords() {
    const records = ref([])

    async function load() {
        try {
            const response = await projectFirestore.collection('record')
            .orderBy('score')
            .get()
            records.value = response.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
            })
        } catch (err) {
            console.log(err)
        }
    }
    return { records, load}
}

export default getRecords